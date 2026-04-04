import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalSettings } from "@/hooks/useSanityContent";

const FloatingCTA = () => {
  const { data: global } = useGlobalSettings();
  const doctolibUrl = global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <a href={doctolibUrl} target="_blank" rel="noopener noreferrer" className="block">
        <Button
          size="lg"
          className="gap-2 bg-primary hover:bg-primary-hover shadow-medium rounded-full px-6 py-6 animate-fade-in"
        >
          <Calendar className="h-5 w-5" />
          <span className="font-semibold">Prendre RDV</span>
        </Button>
      </a>
    </div>
  );
};

export default FloatingCTA;
