import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Loader2, ExternalLink, Home, Stethoscope, Sparkles, CreditCard } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface PageSection {
  id: string;
  page_name: string;
  section_key: string;
  content: Record<string, unknown>;
}

// French-friendly labels and help text for each field
const fieldLabels: Record<string, Record<string, { label: string; help: string }>> = {
  hero: {
    titre: { label: "Titre principal", help: "Le grand titre affiché en haut de la page d'accueil" },
    sous_titre: { label: "Sous-titre", help: "Le texte juste en dessous du titre principal" },
    description: { label: "Description", help: "Le paragraphe de présentation sous le sous-titre" },
  },
  praticien: {
    nom: { label: "Nom du praticien", help: "Le nom affiché dans la section praticien" },
    photo_url: { label: "📷 Photo du praticien", help: "La photo affichée dans la section praticien sur la page d'accueil" },
    description: { label: "Présentation", help: "Le premier paragraphe de présentation" },
    parcours: { label: "Parcours", help: "Le deuxième paragraphe sur la formation et la philosophie" },
    citation: { label: "Citation", help: "La phrase en italique dans l'encadré" },
  },
  philosophie: {
    titre: { label: "Titre de la section", help: "Le titre de la section philosophie" },
    description: { label: "Description", help: "Le texte d'introduction sous le titre" },
    citation: { label: "Citation", help: "La grande citation en bas de la section" },
  },
  horaires: {
    lundi: { label: "Lundi", help: "Horaires du lundi (ex: 09h-12h, 14h-17h)" },
    mardi: { label: "Mardi", help: "Horaires du mardi" },
    mercredi: { label: "Mercredi", help: "Écrire 'Fermé' si le cabinet est fermé" },
    jeudi: { label: "Jeudi", help: "Horaires du jeudi" },
    vendredi: { label: "Vendredi", help: "Horaires du vendredi" },
    samedi_dimanche: { label: "Samedi-Dimanche", help: "Écrire 'Fermé' si le cabinet est fermé" },
    telephone: { label: "Téléphone", help: "Le numéro de téléphone du cabinet" },
    adresse: { label: "Adresse", help: "L'adresse complète du cabinet" },
  },
  intro: {
    titre: { label: "Titre de la page", help: "Le grand titre en haut de la page" },
    description: { label: "Description d'introduction", help: "Le paragraphe d'introduction sous le titre" },
  },
};

const pageNames: Record<string, { label: string; icon: typeof Home; url: string }> = {
  accueil: { label: "🏠 Page d'accueil", icon: Home, url: "/" },
  parodontie: { label: "🦷 Parodontie", icon: Stethoscope, url: "/parodontie" },
  implantologie: { label: "🔩 Implantologie", icon: Stethoscope, url: "/implantologie" },
  esthetique: { label: "✨ Esthétique", icon: Sparkles, url: "/esthetique" },
  tarifs: { label: "💰 Tarifs", icon: CreditCard, url: "/tarifs" },
};

const sectionNames: Record<string, string> = {
  hero: "🎯 Bannière principale",
  praticien: "👩‍⚕️ Présentation du praticien",
  philosophie: "💡 Philosophie",
  horaires: "🕐 Horaires et contact",
  intro: "📝 Introduction de la page",
};

const PageManager = () => {
  const queryClient = useQueryClient();
  const [editedSections, setEditedSections] = useState<Record<string, Record<string, unknown>>>({});

  const { data: sections, isLoading } = useQuery({
    queryKey: ['admin-page-sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .order('page_name', { ascending: true });

      if (error) throw error;
      return data as PageSection[];
    },
  });

  useEffect(() => {
    if (sections) {
      const initial: Record<string, Record<string, unknown>> = {};
      sections.forEach((section) => {
        initial[section.id] = section.content;
      });
      setEditedSections(initial);
    }
  }, [sections]);

  const saveMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: Record<string, unknown> }) => {
      const { error } = await supabase
        .from('page_sections')
        .update({ content: content as unknown as Json })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-page-sections'] });
      toast.success('✅ Modifications enregistrées ! Les changements sont visibles sur le site.');
    },
    onError: () => {
      toast.error('❌ Erreur lors de la sauvegarde. Réessayez.');
    },
  });

  const handleFieldChange = (sectionId: string, field: string, value: unknown) => {
    setEditedSections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value,
      },
    }));
  };

  const handleSave = (sectionId: string) => {
    const content = editedSections[sectionId];
    if (content) {
      saveMutation.mutate({ id: sectionId, content });
    }
  };

  // Group sections by page
  const groupedSections = sections?.reduce((acc, section) => {
    if (!acc[section.page_name]) {
      acc[section.page_name] = [];
    }
    acc[section.page_name].push(section);
    return acc;
  }, {} as Record<string, PageSection[]>);

  const getFieldMeta = (sectionKey: string, fieldKey: string) => {
    return fieldLabels[sectionKey]?.[fieldKey] ?? {
      label: fieldKey.replace(/_/g, ' '),
      help: '',
    };
  };

  const renderField = (
    sectionId: string,
    sectionKey: string,
    fieldKey: string,
    value: unknown
  ) => {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    const isLongText = stringValue.length > 80 || stringValue.includes('\n');
    const meta = getFieldMeta(sectionKey, fieldKey);

    return (
      <div key={fieldKey} className="space-y-1.5">
        <Label htmlFor={`${sectionId}-${fieldKey}`} className="text-sm font-semibold">
          {meta.label}
        </Label>
        {meta.help && (
          <p className="text-xs text-muted-foreground">{meta.help}</p>
        )}
        {isLongText ? (
          <Textarea
            id={`${sectionId}-${fieldKey}`}
            value={stringValue}
            onChange={(e) => handleFieldChange(sectionId, fieldKey, e.target.value)}
            rows={3}
            className="mt-1"
          />
        ) : (
          <Input
            id={`${sectionId}-${fieldKey}`}
            value={stringValue}
            onChange={(e) => handleFieldChange(sectionId, fieldKey, e.target.value)}
            className="mt-1"
          />
        )}
      </div>
    );
  };

  // Order pages consistently
  const pageOrder = ['accueil', 'parodontie', 'implantologie', 'esthetique', 'tarifs'];

  return (
    <AdminLayout title="Modifier le contenu du site">
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Astuce :</strong> Modifiez les textes ci-dessous puis cliquez sur "Enregistrer". 
          Les changements apparaissent immédiatement sur le site. Si un champ est vide, le texte par défaut s'affiche.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sections modifiables</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : groupedSections && Object.keys(groupedSections).length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {pageOrder
                .filter((p) => groupedSections[p])
                .map((pageName) => {
                  const pageSections = groupedSections[pageName];
                  const pageMeta = pageNames[pageName] ?? { label: pageName, url: '/' };

                  return (
                    <AccordionItem key={pageName} value={pageName}>
                      <AccordionTrigger className="text-lg font-semibold">
                        {pageMeta.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          {pageSections.map((section) => (
                            <div key={section.id} className="border rounded-lg p-5 bg-muted/30">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-base">
                                  {sectionNames[section.section_key] ?? section.section_key}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <a
                                    href={pageMeta.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    Voir sur le site
                                  </a>
                                  <Button
                                    size="sm"
                                    onClick={() => handleSave(section.id)}
                                    disabled={saveMutation.isPending}
                                  >
                                    {saveMutation.isPending ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Save className="h-4 w-4" />
                                    )}
                                    <span className="ml-2">Enregistrer</span>
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-4">
                                {editedSections[section.id] &&
                                  Object.entries(editedSections[section.id]).map(
                                    ([fieldKey, fieldValue]) =>
                                      renderField(section.id, section.section_key, fieldKey, fieldValue)
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucune section de page configurée pour le moment.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default PageManager;
