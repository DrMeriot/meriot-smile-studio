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
import { Save, Loader2 } from 'lucide-react';

interface PageSection {
  id: string;
  page_name: string;
  section_key: string;
  content: Record<string, unknown>;
}

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
      toast.success('Section mise à jour');
    },
    onError: () => {
      toast.error('Erreur lors de la mise à jour');
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

  const renderField = (
    sectionId: string, 
    fieldKey: string, 
    value: unknown
  ) => {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    const isLongText = stringValue.length > 100 || stringValue.includes('\n');

    return (
      <div key={fieldKey} className="space-y-2">
        <Label htmlFor={`${sectionId}-${fieldKey}`} className="capitalize">
          {fieldKey.replace(/_/g, ' ')}
        </Label>
        {isLongText ? (
          <Textarea
            id={`${sectionId}-${fieldKey}`}
            value={stringValue}
            onChange={(e) => handleFieldChange(sectionId, fieldKey, e.target.value)}
            rows={4}
          />
        ) : (
          <Input
            id={`${sectionId}-${fieldKey}`}
            value={stringValue}
            onChange={(e) => handleFieldChange(sectionId, fieldKey, e.target.value)}
          />
        )}
      </div>
    );
  };

  return (
    <AdminLayout title="Gestion des Pages">
      <Card>
        <CardHeader>
          <CardTitle>Sections de pages</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : groupedSections && Object.keys(groupedSections).length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(groupedSections).map(([pageName, pageSections]) => (
                <AccordionItem key={pageName} value={pageName}>
                  <AccordionTrigger className="text-lg font-semibold capitalize">
                    {pageName.replace(/_/g, ' ')}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      {pageSections.map((section) => (
                        <div key={section.id} className="border rounded-lg p-4 bg-muted/30">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium capitalize">
                              {section.section_key.replace(/_/g, ' ')}
                            </h4>
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
                              <span className="ml-2">Sauvegarder</span>
                            </Button>
                          </div>
                          <div className="space-y-4">
                            {editedSections[section.id] &&
                              Object.entries(editedSections[section.id]).map(
                                ([fieldKey, fieldValue]) =>
                                  renderField(section.id, fieldKey, fieldValue)
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucune section de page configurée pour le moment.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Les sections de pages permettent de modifier le contenu textuel des différentes pages du site.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default PageManager;
