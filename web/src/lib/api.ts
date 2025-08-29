// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return json<{ token: string }>(res);
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return json<{ token: string }>(res);
}

export async function getProgress() {
  const token = localStorage.getItem('token') ?? '';
  const res = await fetch(`${API_URL}/api/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return json<{ progress: any | null }>(res);
}

export async function putProgress(payload: { character: any; activityAt?: string }) {
  const token = localStorage.getItem('token') ?? '';
  const res = await fetch(`${API_URL}/api/progress`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return json<{ progress: any }>(res);
}
