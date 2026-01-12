import { useState, useEffect } from 'react';
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

const LOGIN_TIMEOUT_MS = 15000; // 15 seconds timeout

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

  // Redirect if already logged in and admin
  useEffect(() => {
    if (!authLoading && user) {
      // Rediriger vers /admin, ProtectedRoute gérera les permissions
      console.log('[Login] User authenticated, redirecting to /admin...', { user: !!user, isAdmin, authLoading });
      navigate('/admin');
    }
  }, [user, authLoading, navigate, isAdmin]);

  // Loading timer for UX feedback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingSeconds(0);
      interval = setInterval(() => {
        setLoadingSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    console.log(`[Login] Starting ${isSignUp ? 'signup' : 'login'} for ${email.substring(0, 3)}***`);

    try {
      if (isSignUp) {
        // Sign up with timeout
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
          console.error('[Login] Signup error:', signUpError.message);
          setError(signUpError.message);
          return;
        }

        console.log('[Login] Signup successful');
        setSuccess("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        setIsSignUp(false);
      } else {
        // Sign in with timeout
        const signInPromise = signIn(email, password);

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('TIMEOUT')), LOGIN_TIMEOUT_MS);
        });

        const { error: signInError } = await Promise.race([signInPromise, timeoutPromise]) as any;

        if (signInError) {
          console.error('[Login] SignIn error:', signInError.message);
          // Show the actual error message
          if (signInError.message.includes('Invalid login credentials')) {
            setError("Email ou mot de passe incorrect");
          } else if (signInError.message.includes('Email not confirmed')) {
            setError("Veuillez confirmer votre email avant de vous connecter");
          } else {
            setError(signInError.message);
          }
          return;
        }

        console.log('[Login] SignIn successful, waiting for auth state...');
        // Navigation is handled by useEffect when user/isAdmin changes
      }
    } catch (err: any) {
      console.error('[Login] Exception:', err);
      if (err.message === 'TIMEOUT') {
        setError("La connexion prend trop de temps. Vérifiez votre connexion internet et réessayez. Si vous utilisez un bloqueur de publicités, désactivez-le temporairement.");
      } else {
        setError(err.message || "Une erreur inattendue s'est produite");
      }
    } finally {
      setIsLoading(false);
      setLoadingSeconds(0);
    }
  };

  const handleResetSession = async () => {
    console.log('[Login] Resetting session...');
    try {
      await supabase.auth.signOut();
      setError(null);
      setSuccess("Session réinitialisée. Vous pouvez réessayer de vous connecter.");
    } catch (err) {
      console.error('[Login] Reset session error:', err);
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
