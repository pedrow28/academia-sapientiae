console.log("Booting API...");

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());

// Rota de saúde (útil pra monitorar se está de pé)
app.get('/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Exemplo de rota com validação Zod (só pra demonstrar)
const echoSchema = z.object({ msg: z.string().min(1) });
app.post('/echo', (req, res) => {
  const parse = echoSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.format() });
  res.json({ youSaid: parse.data.msg });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
