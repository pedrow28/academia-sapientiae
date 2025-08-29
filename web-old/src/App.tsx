import { useEffect, useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register, getProgress, putProgress } from './api';

type Progress = {
  progress: {
    id: string;
    userId: string;
    character: any;
    streak: number;
    lastActivityAt: string | null;
  } | null;
};

function isoNowUtcMidday() {
  const now = new Date();
  const utc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0));
  return utc.toISOString();
}

export default function App() {
  const qc = useQueryClient();
  const [email, setEmail] = useState('pedro@example2.com'); // pode trocar
  const [password, setPassword] = useState('123456');
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  // guarda/restaura token
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  // busca progresso (só quando logado)
  const { data: progressData, isFetching } = useQuery<Progress>({
    queryKey: ['progress'],
    queryFn: () => getProgress(token!),
    enabled: !!token,
  });

  // mutations
  const mRegister = useMutation({
    mutationFn: () => register(email, password),
    onSuccess: (r) => setToken(r.token),
  });

  const mLogin = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (r) => setToken(r.token),
  });

  const mStudy = useMutation({
    mutationFn: () =>
      putProgress(token!, {
        character: { PES: ((progressData?.progress?.character?.PES || 0) + 5) },
        activityAt: isoNowUtcMidday(),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['progress'] }),
  });

  const loggedIn = useMemo(() => !!token, [token]);

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', fontFamily: 'Inter, system-ui, Arial' }}>
      <h1>Academia Sapientiae — Demo</h1>

      {!loggedIn ? (
        <section style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => mRegister.mutate()} disabled={mRegister.isPending}>
              {mRegister.isPending ? 'Registrando…' : 'Registrar'}
            </button>
            <button onClick={() => mLogin.mutate()} disabled={mLogin.isPending}>
              {mLogin.isPending ? 'Entrando…' : 'Login'}
            </button>
          </div>
          {(mRegister.error as any) && <p style={{ color: 'crimson' }}>Erro no registro</p>}
          {(mLogin.error as any) && <p style={{ color: 'crimson' }}>Erro no login</p>}
        </section>
      ) : (
        <section style={{ display: 'grid', gap: 12, marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Autenticado</strong>
            <button onClick={() => setToken(null)}>Sair</button>
          </div>

          <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
            <h3>Progresso</h3>
            {isFetching ? (
              <p>Carregando…</p>
            ) : (
              <>
                <p><b>Streak:</b> {progressData?.progress?.streak ?? 0}</p>
                <p><b>PES:</b> {progressData?.progress?.character?.PES ?? 0}</p>
                <p><b>Última atividade:</b> {progressData?.progress?.lastActivityAt ?? '—'}</p>
              </>
            )}
          </div>

          <button onClick={() => mStudy.mutate()} disabled={mStudy.isPending}>
            {mStudy.isPending ? 'Atualizando…' : 'Estudar hoje (incrementa regra)'}
          </button>

          {(mStudy.error as any) && <p style={{ color: 'crimson' }}>Erro ao atualizar progresso</p>}
        </section>
      )}
    </div>
  );
}
