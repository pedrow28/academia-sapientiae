// =========================
// CONFIGURAÇÃO BÁSICA
// =========================

// Esta constante guarda o endereço do nosso servidor (a "API").
// "API" é só um programa que fica esperando pedidos (requisições) e devolve respostas.
// Aqui está apontando para o computador local (seu próprio PC) na porta 3001.
// Em produção normalmente seria algo como 'https://minhaapi.com'.
export const API_URL = 'http://localhost:3001';


// =========================
// REGISTRAR (CRIAR CONTA)
// =========================

/**
 * Registra um novo usuário informando email e senha.
 * Retorna uma "Promise" que, quando resolvida, entrega um objeto com { token }.
 * "token" é um texto que prova para o servidor que você está autenticado.
 */
export async function register(email: string, password: string) {
  // `fetch` é a função que faz a chamada HTTP para outro lugar (a nossa API).
  // Usamos o caminho /auth/register para criar a conta.
  const r = await fetch(`${API_URL}/auth/register`, {
    // method: 'POST' significa que estamos ENVIANDO dados para criar algo.
    method: 'POST',
    // headers (cabeçalhos) dizem ao servidor como interpretar os dados.
    // Aqui informamos que estamos mandando um texto em formato JSON.
    headers: { 'Content-Type': 'application/json' },
    // body (corpo) é o conteúdo que de fato enviamos.
    // JSON.stringify transforma o objeto { email, password } em texto.
    body: JSON.stringify({ email, password }),
  });

  // r.ok é "true" quando a resposta vem com status 200-299 (sucesso).
  // Se não for ok, jogamos um erro para avisar quem chamou a função.
  if (!r.ok) throw new Error('Falha no registro');

  // r.json() lê a resposta do servidor (que veio em JSON) e vira um objeto JS.
  // Aqui dizemos ao TypeScript que esperamos { token: string }.
  return r.json() as Promise<{ token: string }>;
}


// =========================
// FAZER LOGIN (ENTRAR)
// =========================

/**
 * Faz login com email e senha.
 * Se der certo, retorna { token } para ser usado nas próximas chamadas.
 */
export async function login(email: string, password: string) {
  const r = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!r.ok) throw new Error('Falha no login');

  return r.json() as Promise<{ token: string }>;
}


// =========================
// BUSCAR PROGRESSO
// =========================

/**
 * Busca o "progresso" do usuário já logado.
 * Para provar que estamos logados, enviamos o "token" no cabeçalho Authorization.
 * "Bearer <token>" é um formato padrão para mandar esse token.
 */
export async function getProgress(token: string) {
  const r = await fetch(`${API_URL}/api/progress`, {
    // headers aqui não tem Content-Type porque não estamos enviando corpo (só lendo).
    // Authorization é como mostramos nosso crachá (token) para a API.
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!r.ok) throw new Error('Falha ao buscar progresso');

  // O servidor deve responder algo como { progress: ... }.
  // Pode ser null se não existir progresso ainda.
  return r.json() as Promise<{ progress: any | null }>;
}


// =========================
// ATUALIZAR PROGRESSO
// =========================

/**
 * Envia (atualiza) o progresso do usuário.
 * `payload` é qualquer objeto com os dados do progresso (por isso o tipo `any`).
 */
export async function putProgress(token: string, payload: any) {
  const r = await fetch(`${API_URL}/api/progress`, {
    // PUT é o método padrão para atualizar/guardar algo existente.
    method: 'PUT',
    headers: {
      // Como estamos enviando um corpo em JSON, avisamos isso:
      'Content-Type': 'application/json',
      // E novamente mostramos nosso token para a API saber quem somos.
      Authorization: `Bearer ${token}`,
    },
    // Transformamos o objeto `payload` em texto JSON para envio.
    body: JSON.stringify(payload),
  });

  if (!r.ok) throw new Error('Falha ao atualizar progresso');

  // A API deve devolver o progresso atualizado.
  return r.json() as Promise<{ progress: any }>;
}



/* =========================================================
   EXEMPLOS DE USO (apenas para entender — não precisam rodar)
   =========================================================

   (1) Registrar e depois salvar o token:
       const { token } = await register('fulano@email.com', 'minhasenha');

   (2) Fazer login e guardar o token:
       const { token } = await login('fulano@email.com', 'minhasenha');

   (3) Buscar o progresso de quem está logado:
       const { progress } = await getProgress(token);

   (4) Atualizar o progresso:
       const novoProgresso = { etapa: 3, concluido: false };
       const { progress } = await putProgress(token, novoProgresso);

   DICAS:
   - Sempre trate erros em quem chama, por exemplo:
       try {
         const { token } = await login(email, senha);
       } catch (e) {
         alert('Não foi possível entrar. Confira email/senha.');
       }

   - Em produção, substitua o API_URL por um endereço HTTPS real.
*/
