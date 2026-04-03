import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import TipTapEditor from '@/components/admin/TipTapEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2, Save, ArrowLeft, Eye } from 'lucide-react';
import { z } from 'zod';
import { sanitizeHtml } from '@/lib/sanitize';

const blogPostSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis").max(200, "Le titre est trop long"),
  slug: z.string().trim().min(1, "Le slug est requis").max(200, "Le slug est trop long"),
  excerpt: z.string().trim().max(500, "L'extrait est trop long").optional(),
  content: z.string().min(1, "Le contenu est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  keywords: z.string().trim().max(500, "Les mots-clés sont trop longs").optional(),
  image_url: z.string().url("URL d'image invalide").optional().or(z.literal('')),
  published: z.boolean(),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

const categories = ['Parodontie', 'Implantologie', 'Soins Dentaires'];

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Parodontie',
    keywords: '',
    image_url: '',
    published: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch existing post if editing
  const { data: existingPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ['admin-blog-post', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  // Populate form when editing
  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt || '',
        content: existingPost.content,
        category: existingPost.category,
        keywords: existingPost.keywords || '',
        image_url: existingPost.image_url || '',
        published: existingPost.published ?? false,
      });
    }
  }, [existingPost]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (data: BlogPostFormData) => {
      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || null,
            content: data.content,
            category: data.category,
            keywords: data.keywords || null,
            image_url: data.image_url || null,
            published: data.published,
          })
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || null,
            content: data.content,
            category: data.category,
            keywords: data.keywords || null,
            image_url: data.image_url || null,
            published: data.published,
            author_id: user?.id,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success(isEditing ? 'Article mis à jour' : 'Article créé');
      navigate('/admin/blog');
    },
    onError: (error: Error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = blogPostSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    saveMutation.mutate({
      ...formData,
      content: sanitizeHtml(formData.content),
    });
  };

  if (isEditing && isLoadingPost) {
    return (
      <AdminLayout title="Chargement...">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditing ? 'Modifier l\'article' : 'Nouvel article'}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4 mb-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/admin/blog')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div className="flex-1" />
          {formData.slug && (
            <a
              href={`/blog/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <Eye className="h-4 w-4" />
              Prévisualiser
            </a>
          )}
          <Button type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isEditing ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Titre de l'article"
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="titre-de-larticle"
                    className={errors.slug ? 'border-destructive' : ''}
                  />
                  {errors.slug && (
                    <p className="text-sm text-destructive">{errors.slug}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    URL: /blog/{formData.slug || 'slug'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Extrait</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Court résumé de l'article (affiché dans les listes)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contenu de l'article *</Label>
                  <TipTapEditor
                    content={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    placeholder="Rédigez votre article ici..."
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">{errors.content}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Publier</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, published: checked }))
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {formData.published 
                    ? 'L\'article sera visible sur le site' 
                    : 'L\'article restera en brouillon'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramètres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Mots-clés SEO</Label>
                  <Input
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                    placeholder="mot-clé1, mot-clé2, ..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Image de couverture (URL)</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://..."
                    className={errors.image_url ? 'border-destructive' : ''}
                  />
                  {errors.image_url && (
                    <p className="text-sm text-destructive">{errors.image_url}</p>
                  )}
                  {formData.image_url && (
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg mt-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default BlogEditor;
