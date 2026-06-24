import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — route inexistante :", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-primary mb-4">404</p>
        <h1 className="text-2xl font-bold mb-3">Cette page n'existe pas</h1>
        <p className="text-muted-foreground mb-8">
          La page que vous cherchez a peut-être été déplacée ou n'existe plus.
          Retrouvez le cabinet du Dr Stéphanie Meriot via les liens ci-dessous.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button size="lg">Retour à l'accueil</Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline">Nous contacter</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
