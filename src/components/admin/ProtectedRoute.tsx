import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, isLoading } = useAuth();
  const [adminCheckComplete, setAdminCheckComplete] = useState(false);

  useEffect(() => {
    // Give admin check up to 5 seconds to complete
    if (user && !isLoading) {
      const timer = setTimeout(() => {
        setAdminCheckComplete(true);
      }, 5000);

      // If isAdmin becomes true, mark as complete immediately
      if (isAdmin) {
        setAdminCheckComplete(true);
      }

      return () => clearTimeout(timer);
    }
  }, [user, isLoading, isAdmin]);

  // Also mark complete when isAdmin changes to true
  useEffect(() => {
    if (isAdmin) {
      setAdminCheckComplete(true);
    }
  }, [isAdmin]);

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

  // If admin check not complete yet, show verification message
  if (!adminCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Vérification des droits...</p>
        </div>
      </div>
    );
  }

  // Admin check complete but not admin
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Accès refusé</h1>
        <p className="text-muted-foreground">Vous n'avez pas les droits d'administration.</p>
      </div>
    </div>
  );
};

export default ProtectedRoute;
