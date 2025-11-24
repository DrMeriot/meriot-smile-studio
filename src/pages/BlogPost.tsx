import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SEOHead from "@/components/SEOHead";
import { getBlogPostBySlug } from "@/data/blogData";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | Dr Stéphanie Meriot`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        keywords={post.keywords}
        ogTitle={post.title}
        ogDescription={post.excerpt}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <FloatingCTA />
        
        <main className="container mx-auto px-4 py-16 mt-20">
          {/* Back to Blog */}
          <Link 
            to="/blog"
            className="inline-flex items-center text-primary hover:underline mb-8 animate-fade-in"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au blog
          </Link>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-12 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="w-5 h-5 text-primary" />
                <span className="text-lg font-medium text-primary">{post.category}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5" />
                <time dateTime={post.date}>
                  Publié le {new Date(post.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none animate-fade-in" style={{ animationDelay: '100ms' }}>
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h2 className="text-3xl font-bold text-foreground mt-8 mb-4" {...props} />,
                  h2: ({node, ...props}) => <h3 className="text-2xl font-bold text-foreground mt-6 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h4 className="text-xl font-semibold text-foreground mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="text-muted-foreground mb-4 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                  a: ({node, ...props}) => <a className="text-primary hover:underline font-medium" {...props} />,
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />
                  ),
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-border" {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-muted" {...props} />,
                  th: ({node, ...props}) => <th className="border border-border px-4 py-2 text-left font-semibold" {...props} />,
                  td: ({node, ...props}) => <td className="border border-border px-4 py-2" {...props} />,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Author Info */}
            <footer className="mt-12 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">À propos de l'auteur</h3>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Dr Stéphanie Meriot</strong> est chirurgien-dentiste 
                  spécialisée en parodontologie et implantologie, diplômée de l'IFPIO Marseille et de 
                  l'Académie de Parodontologie d'Aix-en-Provence. Elle exerce à Marseille 4ème et propose 
                  une approche douce et personnalisée des soins dentaires.
                </p>
                <Link 
                  to="/a-propos"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  En savoir plus sur le Dr Meriot
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </footer>

            {/* CTA Section */}
            <section className="mt-12 bg-primary/5 rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Besoin d'un Rendez-vous ?
              </h2>
              <p className="text-muted-foreground mb-6">
                Prenez rendez-vous avec le Dr Meriot pour un bilan personnalisé
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Prendre RDV en Ligne
                </a>
                <a
                  href="tel:0983439621"
                  className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Appeler le 09 83 43 96 21
                </a>
              </div>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
