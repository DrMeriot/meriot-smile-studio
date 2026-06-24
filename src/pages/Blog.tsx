import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SEOHead from "@/components/SEOHead";
import { Calendar, Tag } from "lucide-react";
import { useGlobalSettings, useBlogPosts, useSanityPage } from "@/hooks/useSanityContent";

const defaultSpecialites = [
  { titre: "Parodontie", description: "Traitement des gencives par le Dr Meriot.", lien: "/parodontie" },
  { titre: "Implantologie", description: "Pose d'implants dentaires durables.", lien: "/implantologie" },
];

const Blog = () => {
  // Sanity blog posts. Fields are flat: publishedAt, mainImage{asset,alt}.
  type SanityPost = {
    _id: string;
    slug: { current: string } | string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt?: string;
    mainImage?: { asset?: { url?: string }; alt?: string };
  };
  type CardPost = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date?: string;
    imageUrl?: string;
    imageAlt?: string;
  };

  const { data: global } = useGlobalSettings();
  const { data: sanityPosts } = useBlogPosts<SanityPost>();
  const { data: blogPage } = useSanityPage("blog_page");

  const tel = global?.phone ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const doctolibUrl = global?.doctolib ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";

  const heroTitre = blogPage?.heroTitre ?? "Blog & Conseils Dentaires";
  const heroSubtitle = blogPage?.heroSubtitle ?? "Découvrez nos articles sur la parodontie, l'implantologie et la santé bucco-dentaire.";
  const ctaTitre = blogPage?.ctaTitre ?? "Une Question sur Votre Santé Dentaire ?";
  const ctaTexte = blogPage?.ctaTexte ?? "Le Dr Stéphanie Meriot est à votre écoute.";
  const cmsSpecs = blogPage?.specialitesList as Array<{ titre?: string; description?: string; lien?: string }> | undefined;
  const specialites = (cmsSpecs && cmsSpecs.length > 0) ? cmsSpecs : defaultSpecialites;

  const posts: CardPost[] = (sanityPosts ?? []).map((p) => ({
    slug: typeof p.slug === "string" ? p.slug : p.slug?.current,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.publishedAt,
    imageUrl: p.mainImage?.asset?.url,
    imageAlt: p.mainImage?.alt ?? p.title,
  }));

  return (
    <>
      <SEOHead
        title={blogPage?.seoTitle ?? "Blog Dentaire | Conseils Parodontie & Implantologie - Dr Meriot Marseille"}
        description={blogPage?.seoDescription ?? "Articles et conseils d'experts sur la parodontie, l'implantologie et les soins dentaires par le Dr Stéphanie Meriot."}
        canonical="/blog"
        keywords="blog dentaire, conseils parodontie, implants dentaires, santé bucco-dentaire, marseille"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <FloatingCTA />

        <main className="container mx-auto px-4 py-16 mt-20">
          <section className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{heroTitre}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {heroSubtitle}
            </p>
          </section>

          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post, index) => {
              const parsed = post.date ? new Date(post.date) : null;
              const validDate = parsed !== null && !Number.isNaN(parsed.getTime());
              return (
                <article key={post.slug} className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in flex flex-col" style={{ animationDelay: `${index * 100}ms` }}>
                  {post.imageUrl && (
                    <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden bg-muted">
                      <img
                        src={post.imageUrl}
                        alt={post.imageAlt ?? post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  )}
                  <div className="p-6 pb-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{post.category}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-card-foreground mb-3 hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    {validDate && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.date}>{parsed!.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      </div>
                    )}
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-primary font-medium hover:underline mt-auto">
                      Lire l'article <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Nos spécialités</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {specialites.map((s: { titre?: string; title?: string; description?: string; lien?: string; href?: string }, i: number) => (
                <Link key={i} to={s.lien ?? s.href ?? "/services"} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border">
                  <h3 className="font-semibold text-lg mb-2 text-primary">{s.titre ?? s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">{ctaTitre}</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">{ctaTexte}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={doctolibUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">Prendre RDV en Ligne</a>
              <a href={telHref} className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors">Appeler le {tel}</a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
