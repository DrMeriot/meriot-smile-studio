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

const ADMIN_CHECK_TIMEOUT_MS = 8000; // 8 seconds timeout for admin check

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);

  const checkAdminRole = async (userId: string, attempt: number = 1): Promise<boolean> => {
    console.log(`[AuthContext] Checking admin role for user: ${userId.substring(0, 8)}... (attempt ${attempt})`);
    
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('ADMIN_CHECK_TIMEOUT')), ADMIN_CHECK_TIMEOUT_MS);
      });

      // Create the RPC call promise
      const rpcPromise = supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });

      // Race between the RPC call and timeout
      const { data, error } = await Promise.race([rpcPromise, timeoutPromise]) as any;

      if (error) {
        console.error('[AuthContext] Admin check error:', error.message);
        return false;
      }

      console.log('[AuthContext] Admin check result:', data);
      return data === true;
    } catch (err: any) {
      if (err.message === 'ADMIN_CHECK_TIMEOUT') {
        console.warn('[AuthContext] Admin check timed out after', ADMIN_CHECK_TIMEOUT_MS, 'ms');
      } else {
        console.error('[AuthContext] Admin check exception:', err.message);
      }
      return false;
    }
  };

  const checkAdminWithRetry = async (userId: string, maxAttempts: number = 3): Promise<boolean> => {
    setIsCheckingAdmin(true);
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      // Small delay before each attempt to ensure session is stable
      if (attempt > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
      
      const result = await checkAdminRole(userId, attempt);
      if (result) {
        setIsCheckingAdmin(false);
        return true;
      }
      
      console.log(`[AuthContext] Admin check attempt ${attempt}/${maxAttempts} failed`);
    }
    
    setIsCheckingAdmin(false);
    return false;
  };

  const recheckAdmin = async () => {
    if (!user) return;
    console.log('[AuthContext] Manual recheck admin triggered');
    const adminStatus = await checkAdminWithRetry(user.id, 2);
    setIsAdmin(adminStatus);
  };

  useEffect(() => {
    console.log('[AuthContext] Setting up auth state listener...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('[AuthContext] Auth state changed:', event, newSession?.user?.email?.substring(0, 5) + '...');
        
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Set isLoading to false immediately to unblock UI
        setIsLoading(false);

        if (newSession?.user) {
          // Check admin role with retry in background (non-blocking)
          checkAdminWithRetry(newSession.user.id).then(adminStatus => {
            setIsAdmin(adminStatus);
            console.log('[AuthContext] Admin check complete:', adminStatus);
          });
        } else {
          setIsAdmin(false);
          console.log('[AuthContext] No user session');
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      console.log('[AuthContext] Getting initial session...');
      try {
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[AuthContext] Get session error:', error.message);
          setIsLoading(false);
          return;
        }

        if (existingSession?.user) {
          console.log('[AuthContext] Found existing session for:', existingSession.user.email?.substring(0, 5) + '...');
          setSession(existingSession);
          setUser(existingSession.user);
          
          const adminStatus = await checkAdminWithRetry(existingSession.user.id);
          setIsAdmin(adminStatus);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('[AuthContext] Initialize auth exception:', err);
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      console.log('[AuthContext] Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('[AuthContext] SignIn called for:', email.substring(0, 5) + '...');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    console.log('[AuthContext] SignOut called');
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
