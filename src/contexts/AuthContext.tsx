import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  isCheckingAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  recheckAdmin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CHECK_TIMEOUT_MS = 8000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);

  const checkAdminRole = async (userId: string, attempt: number = 1): Promise<boolean> => {
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('ADMIN_CHECK_TIMEOUT')), ADMIN_CHECK_TIMEOUT_MS);
      });

      const rpcPromise = supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });

      const { data, error } = await Promise.race([rpcPromise, timeoutPromise]) as any;

      if (error) {
        if (import.meta.env.DEV) console.error('[AuthContext] Admin check error:', error.message);
        return false;
      }

      return data === true;
    } catch (err: any) {
      if (import.meta.env.DEV) {
        if (err.message === 'ADMIN_CHECK_TIMEOUT') {
          console.warn('[AuthContext] Admin check timed out');
        } else {
          console.error('[AuthContext] Admin check exception:', err.message);
        }
      }
      return false;
    }
  };

  const checkAdminWithRetry = async (userId: string, maxAttempts: number = 3): Promise<boolean> => {
    setIsCheckingAdmin(true);
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (attempt > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
      
      const result = await checkAdminRole(userId, attempt);
      if (result) {
        setIsCheckingAdmin(false);
        return true;
      }
    }
    
    setIsCheckingAdmin(false);
    return false;
  };

  const recheckAdmin = async () => {
    if (!user) return;
    const adminStatus = await checkAdminWithRetry(user.id, 2);
    setIsAdmin(adminStatus);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsLoading(false);

        if (newSession?.user) {
          checkAdminWithRetry(newSession.user.id).then(adminStatus => {
            setIsAdmin(adminStatus);
          });
        } else {
          setIsAdmin(false);
        }
      }
    );

    const initializeAuth = async () => {
      try {
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          if (import.meta.env.DEV) console.error('[AuthContext] Get session error:', error.message);
          setIsLoading(false);
          return;
        }

        if (existingSession?.user) {
          setSession(existingSession);
          setUser(existingSession.user);
          
          const adminStatus = await checkAdminWithRetry(existingSession.user.id);
          setIsAdmin(adminStatus);
        }
        
        setIsLoading(false);
      } catch (err) {
        if (import.meta.env.DEV) console.error('[AuthContext] Initialize auth exception:', err);
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isLoading, isCheckingAdmin, signIn, signOut, recheckAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
