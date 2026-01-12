import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, RefreshCw, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, isLoading, isCheckingAdmin, recheckAdmin, signOut } = useAuth();
  const [adminCheckComplete, setAdminCheckComplete] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Give admin check up to 8 seconds to complete
    if (user && !isLoading && !isCheckingAdmin) {
      const timer = setTimeout(() => {
        setAdminCheckComplete(true);
      }, 8000);

      // If isAdmin becomes true, mark as complete immediately
      if (isAdmin) {
        setAdminCheckComplete(true);
      }

      return () => clearTimeout(timer);
    }
  }, [user, isLoading, isAdmin, isCheckingAdmin]);

  // Also mark complete when isAdmin changes to true
  useEffect(() => {
    if (isAdmin) {
      setAdminCheckComplete(true);
    }
  }, [isAdmin]);

  // Mark complete when checking finishes
  useEffect(() => {
    if (!isCheckingAdmin && user && !isLoading) {
      setAdminCheckComplete(true);
    }
  }, [isCheckingAdmin, user, isLoading]);

  const handleRetry = async () => {
    setIsRetrying(true);
    setAdminCheckComplete(false);
    await recheckAdmin();
    setIsRetrying(false);
    setAdminCheckComplete(true);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // If admin, show content immediately
  if (isAdmin) {
    return <>{children}</>;
  }

  // If admin check not complete yet or retrying, show verification message
  if (!adminCheckComplete || isCheckingAdmin || isRetrying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Vérification des droits d'administration...</p>
        </div>
      </div>
    );
  }

  // Admin check complete but not admin
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Accès refusé</h1>
        <p className="text-muted-foreground">Vous n'avez pas les droits d'administration.</p>
        <p className="text-sm text-muted-foreground">
          Si vous pensez que c'est une erreur, essayez de réessayer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Button 
            onClick={handleRetry} 
            variant="default"
            disabled={isRetrying}
          >
            {isRetrying ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Réessayer
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="outline"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Se reconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;