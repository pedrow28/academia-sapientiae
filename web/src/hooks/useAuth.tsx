// src/hooks/useAuth.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '@/lib/api';

type User = { email: string } | null;
interface AuthCtx {
  user: User; loading: boolean;
  signIn(e:string,p:string): Promise<void>;
  signUp(e:string,p:string): Promise<void>;
  signOut(): void;
}
const Ctx = createContext<AuthCtx>({ user:null, loading:true, async signIn(){}, async signUp(){}, signOut(){} });
export const useAuth = () => useContext(Ctx);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('token');
    setUser(t ? { email: 'logged' } : null);
    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    const { token } = await apiLogin(email, password);
    localStorage.setItem('token', token);
    setUser({ email });
  }

  async function signUp(email: string, password: string) {
    const { token } = await apiRegister(email, password);
    localStorage.setItem('token', token);
    setUser({ email });
  }

  function signOut() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <Ctx.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </Ctx.Provider>
  );
};
