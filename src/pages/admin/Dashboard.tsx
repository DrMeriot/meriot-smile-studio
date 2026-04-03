import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Eye, Edit, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { data: blogStats } = useQuery({
    queryKey: ['admin-blog-stats'],
    queryFn: async () => {
      const { data: all, error: allError } = await supabase
        .from('blog_posts')
        .select('id, published', { count: 'exact' });

      if (allError) throw allError;

      const total = all?.length || 0;
      const published = all?.filter(p => p.published).length || 0;
      const drafts = total - published;

      return { total, published, drafts };
    },
  });

  const { data: recentPosts } = useQuery({
    queryKey: ['admin-recent-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, published, created_at, category')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogStats?.total || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Publiés
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{blogStats?.published || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Brouillons
            </CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{blogStats?.drafts || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* How-To Guide */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">📖 Comment modifier le contenu du site ?</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <span>Allez dans <strong>"Gestion des Pages"</strong> dans le menu à gauche</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <span>Cliquez sur la page que vous souhaitez modifier (ex: Page d'accueil, Parodontie...)</span>
            </li>
            <li className="flex gap-3">
              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <span>Modifiez les textes dans les champs et cliquez sur <strong>"Enregistrer"</strong>. C'est tout ! ✨</span>
            </li>
          </ol>
          <div className="mt-4">
            <Link to="/admin/pages">
              <Button variant="outline" size="sm">
                Modifier le contenu du site →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="flex gap-4 flex-wrap">
          <Link to="/admin/blog/new">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Nouvel article
            </Button>
          </Link>
          <Link to="/admin/blog">
            <Button variant="outline">
              Gérer les articles
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Articles récents</CardTitle>
        </CardHeader>
        <CardContent>
          {recentPosts && recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{post.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.created_at!).toLocaleDateString('fr-FR')}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {post.published ? 'Publié' : 'Brouillon'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <Link to={`/admin/blog/edit/${post.id}`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Aucun article pour le moment. Créez votre premier article !
            </p>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Dashboard;
