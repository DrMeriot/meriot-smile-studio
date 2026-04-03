import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const LOGIN_TIMEOUT_MS = 15000;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loadingSeconds, setLoadingSeconds] = useState(0);
  const { signIn, user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const loadingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (justLoggedIn) return;
    if (!authLoading && user) {
      navigate('/admin');
    }
  }, [user, authLoading, navigate, justLoggedIn]);

  useEffect(() => {
    if (isLoading) {
      setLoadingSeconds(0);
      loadingIntervalRef.current = setInterval(() => {
        setLoadingSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
    };
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const signUpPromise = supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('TIMEOUT')), LOGIN_TIMEOUT_MS);
        });

        const { error: signUpError } = await Promise.race([signUpPromise, timeoutPromise]) as any;

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        setSuccess("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        setIsSignUp(false);
      } else {
        const signInPromise = signIn(email, password);

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('TIMEOUT')), LOGIN_TIMEOUT_MS);
        });

        const { error: signInError } = await Promise.race([signInPromise, timeoutPromise]) as any;

        if (signInError) {
          if (signInError.message.includes('Invalid login credentials')) {
            setError("Email ou mot de passe incorrect");
          } else if (signInError.message.includes('Email not confirmed')) {
            setError("Veuillez confirmer votre email avant de vous connecter");
          } else {
            setError("Une erreur est survenue lors de la connexion");
          }
          return;
        }
      }
    } catch (err: any) {
      if (err.message === 'TIMEOUT') {
        setError("La connexion prend trop de temps. Vérifiez votre connexion internet et réessayez.");
      } else {
        setError("Une erreur inattendue s'est produite");
      }
    } finally {
      setIsLoading(false);
      setLoadingSeconds(0);
    }
  };

  const handleResetSession = async () => {
    try {
      await supabase.auth.signOut();
      setError(null);
      setSuccess("Session réinitialisée. Vous pouvez réessayer de vous connecter.");
    } catch (err) {
      // Silent failure for session reset
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isSignUp ? 'Créer un compte' : 'Administration'}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Créez votre compte administrateur'
              : 'Connectez-vous pour accéder au tableau de bord'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="border-green-500 bg-green-50 text-green-800">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {loadingSeconds > 3 
                    ? `Connexion en cours (${loadingSeconds}s)...`
                    : 'Connexion...'}
                </>
              ) : isSignUp ? (
                "Créer le compte"
              ) : (
                "Se connecter"
              )}
            </Button>
            
            {isLoading && loadingSeconds > 5 && (
              <p className="text-xs text-muted-foreground text-center">
                Si cela prend trop de temps, vérifiez votre connexion ou désactivez votre bloqueur de publicités.
              </p>
            )}

            <Button
              type="button"
              variant="ghost"
              className="w-full text-sm"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setSuccess(null);
              }}
              disabled={isLoading}
            >
              {isSignUp
                ? 'Déjà un compte ? Se connecter'
                : 'Pas encore de compte ? Créer un compte'}
            </Button>

            <Button
              type="button"
              variant="link"
              className="text-xs text-muted-foreground"
              onClick={handleResetSession}
              disabled={isLoading}
            >
              Problème de connexion ? Réinitialiser la session
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
