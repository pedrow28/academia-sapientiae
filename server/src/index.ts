// Carrega variáveis de ambiente do arquivo .env automaticamente ao iniciar o processo
import 'dotenv/config';

// Framework HTTP minimalista
import express from 'express';

// Middleware para habilitar CORS (acesso entre origens diferentes)
import cors from 'cors';

// Zod: validação e parsing de dados
import { z } from 'zod';

// Bcrypt: hash e verificação de senhas
import bcrypt from 'bcryptjs';

// JWT: geração e verificação de tokens de autenticação
import jwt from 'jsonwebtoken';

// Prisma ORM: cliente para acessar o banco (deve existir um schema.prisma)
import { PrismaClient } from '@prisma/client';

// Instancia a aplicação Express
const app = express();

// Instancia o cliente do Prisma (cuida da conexão com o BD)
const prisma = new PrismaClient();

// Lê configurações básicas das variáveis de ambiente, com defaults de desenvolvimento
const PORT = parseInt(process.env.PORT || '3001', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// Aplica middlewares globais:
// - CORS: permite que o front-end na origem informada chame esta API e envie cookies/autorização
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
// - express.json: faz o parsing automático de JSON no corpo das requisições
app.use(express.json());

function toStartOfUtcDay(date: Date) {
  // zera hora/min/seg/ms em UTC
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function daysBetweenUtc(a: Date, b: Date) {
  // diferença inteira em dias entre inícios de dia UTC
  const A = toStartOfUtcDay(a).getTime();
  const B = toStartOfUtcDay(b).getTime();
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.round((B - A) / MS_PER_DAY);
}

function nextStreak(prevLastActivityAt: Date | null, now: Date, prevStreak: number) {
  if (!prevLastActivityAt) return 1;         // primeira atividade
  const diff = daysBetweenUtc(prevLastActivityAt, now);
  if (diff <= 0) return prevStreak;          // mesma data (hoje) ou data passada → não incrementa
  if (diff === 1) return prevStreak + 1;     // ontem → incrementa
  return 1;                                  // gap maior → reinicia
}


// -------- utils ----------

// Define o “shape” (formato) do payload do JWT
type JWTPayload = { sub: string; email: string };

// Função utilitária para assinar (criar) um token JWT para um usuário
function signToken(userId: string, email: string) {
  const payload: JWTPayload = { sub: userId, email };
  // Cria um token que expira em 7 dias
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Middleware de autenticação por Bearer Token (JWT)
// - Extrai o token do header Authorization
// - Verifica o token
// - Em caso de sucesso, injeta req.userId e segue adiante
function auth(req: any, res: any, next: any) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.userId = decoded.sub; // guarda o id do usuário para uso nas rotas
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// -------- health ----------

// Rota simples de “healthcheck” para saber se a API está de pé
app.get('/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// -------- auth ----------

// Esquema zod para validar credenciais de login/registro
const credSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Senha precisa ter pelo menos 6 caracteres'),
});

// Registro de usuário:
// 1) Valida corpo com zod
// 2) Verifica se email já existe
// 3) Faz hash da senha
// 4) Cria usuário no banco
// 5) Retorna um JWT
app.post('/auth/register', async (req, res) => {
  const parse = credSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.format() });

  const { email, password } = parse.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email já está em uso' });

  const hash = await bcrypt.hash(password, 10); // 10 = custo do salt
  const user = await prisma.user.create({ data: { email, password: hash } });

  const token = signToken(user.id, user.email);
  return res.status(201).json({ token });
});

// Login:
// 1) Valida entrada
// 2) Busca usuário por email
// 3) Compara senha enviada com o hash no BD
// 4) Em caso de sucesso, retorna JWT
app.post('/auth/login', async (req, res) => {
  const parse = credSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.format() });

  const { email, password } = parse.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = signToken(user.id, user.email);
  return res.json({ token });
});

// -------- progress ----------

// Esquema zod para o “progresso” do usuário (ex.: dados de um personagem de jogo)
// character é flexível (z.any), mas pode evoluir para schema mais estrito
const progressSchema = z.object({
  character: z.any(), // depois podemos apertar esse tipo
  activityAt: z.string().datetime().optional(), // momento da atividade (ISO). Default=agora(UTC)
});


// Busca o progresso do usuário autenticado
app.get('/api/progress', auth, async (req: any, res) => {
  const prog = await prisma.characterProgress.findUnique({
    where: { userId: req.userId },
  });
  return res.json({ progress: prog || null });
});

app.put('/api/progress', auth, async (req: any, res) => {
  const parse = progressSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.format() });
  const { character, activityAt } = parse.data;

  // instante considerado da atividade (default: agora em UTC)
  const now = activityAt ? new Date(activityAt) : new Date();
  if (Number.isNaN(now.getTime())) {
    return res.status(400).json({ error: 'activityAt inválido' });
  }

  // pega progresso atual
  const current = await prisma.characterProgress.findUnique({
    where: { userId: req.userId },
  });

  // calcula novo streak
  const computedStreak = nextStreak(current?.lastActivityAt ?? null, now, current?.streak ?? 0);

  // regra de “uma atualização por dia”:
  // se a última atividade já foi hoje (em UTC), não incrementa; apenas atualiza character e carimba lastActivityAt (mantendo hoje)
  const last = current?.lastActivityAt ?? null;
  const alreadyToday = last ? (daysBetweenUtc(last, now) <= 0) : false;

  const up = await prisma.characterProgress.upsert({
    where: { userId: req.userId },
    create: {
      userId: req.userId,
      character,
      streak: computedStreak || 1,
      lastActivityAt: now,
    },
    update: {
      character,
      // se já teve atividade hoje, mantemos o streak atual; senão aplicamos o novo cálculo
      streak: alreadyToday ? current!.streak : computedStreak,
      lastActivityAt: now,
    },
  });

  return res.json({ progress: up });
});


// Sobe o servidor HTTP na porta definida e loga a URL
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
