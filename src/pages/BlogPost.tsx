import { useParams, Link, Navigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SEOHead from "@/components/SEOHead";
import { getBlogPostBySlug } from "@/data/blogData";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useGlobalSettings, useBlogPost } from "@/hooks/useSanityContent";

// ---------------------------------------------------------------------------
// FAQ extraction from PortableText body.
// ---------------------------------------------------------------------------
// Detects a FAQ section inside a PortableText `body` array and returns the
// list of { question, answer } pairs so we can inject a JSON-LD FAQPage
// schema in the document head.
//
// Heuristic:
//   1. Find an h2 block whose text matches "Foire aux questions", "FAQ",
//      or "Questions fréquentes" (case/diacritics-insensitive).
//   2. After that anchor, every h3 block is a question.
//   3. Every following `normal` block (until the next h2 or h3) is part of
//      the answer; their plain text is concatenated with spaces.
//   4. Stops at the next h2 (end of FAQ section).
type PortableBlock = {
  _type?: string;
  style?: string;
  children?: Array<{ _type?: string; text?: string }>;
};

const blockText = (block: PortableBlock): string =>
  (block.children ?? [])
    .filter((c) => c?._type === "span" && typeof c.text === "string")
    .map((c) => c.text as string)
    .join("")
    .trim();

const normalize = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const isFaqHeading = (text: string): boolean => {
  const n = normalize(text);
  return (
    n.includes("foire aux questions") ||
    n.includes("questions frequentes") ||
    /\bfaq\b/.test(n)
  );
};

export const extractFAQFromPortableText = (
  body: unknown
): Array<{ question: string; answer: string }> => {
  if (!Array.isArray(body)) return [];

  const blocks = body.filter(
    (b): b is PortableBlock => !!b && (b as PortableBlock)._type === "block"
  );

  // Find FAQ anchor (an h2 whose text matches the FAQ heading patterns).
  const anchorIdx = blocks.findIndex(
    (b) => b.style === "h2" && isFaqHeading(blockText(b))
  );
  if (anchorIdx === -1) return [];

  const faqs: Array<{ question: string; answer: string }> = [];
  let current: { question: string; answerParts: string[] } | null = null;

  for (let i = anchorIdx + 1; i < blocks.length; i++) {
    const block = blocks[i];
    const style = block.style ?? "normal";

    // End of FAQ section when we hit another h2.
    if (style === "h2") break;

    if (style === "h3") {
      if (current && current.question) {
        faqs.push({
          question: current.question,
          answer: current.answerParts.join(" ").trim(),
        });
      }
      current = { question: blockText(block), answerParts: [] };
      continue;
    }

    if (current && (style === "normal" || style === "blockquote")) {
      const text = blockText(block);
      if (text) current.answerParts.push(text);
    }
  }

  if (current && current.question) {
    faqs.push({
      question: current.question,
      answer: current.answerParts.join(" ").trim(),
    });
  }

  return faqs.filter((f) => f.question && f.answer);
};

// Custom rendering for PortableText: Tailwind styling + react-router <Link>
// for internal links (so SPA navigation isn't broken with full reloads).
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="text-3xl font-bold text-foreground mt-8 mb-4">{children}</h2>
    ),
    h2: ({ children }) => (
      <h3 className="text-2xl font-bold text-foreground mt-6 mb-3">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-xl font-semibold text-foreground mt-4 mb-2">{children}</h4>
    ),
    h4: ({ children }) => (
      <h5 className="text-lg font-semibold text-foreground mt-4 mb-2">{children}</h5>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return (
          <Link to={href} className="text-primary hover:underline font-medium">
            {children}
          </Link>
        );
      }
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-primary hover:underline font-medium"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "nofollow noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: global } = useGlobalSettings();
  const { data: sanityPost, isFetching: isFetchingPost } = useBlogPost(slug ?? "");

  const tel = global?.phone ?? global?.telephone ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";

  // Sanity post or fallback to local. The Sanity schema fields are flat:
  //   body / publishedAt / seoTitle / seoDescription / mainImage.
  // Local posts use `content` (Markdown string) and `date`.
  const localPost = slug ? getBlogPostBySlug(slug) : undefined;
  const post = sanityPost
    ? {
        slug:
          typeof sanityPost.slug === "string"
            ? sanityPost.slug
            : sanityPost.slug?.current,
        title: sanityPost.title,
        excerpt: sanityPost.excerpt,
        body: sanityPost.body, // PortableText array (Sanity)
        content: undefined as string | undefined, // no Markdown from Sanity
        category: sanityPost.category,
        date: sanityPost.publishedAt,
        keywords: sanityPost.keywords ?? "",
        seoTitle: sanityPost.seoTitle as string | undefined,
        seoDescription: sanityPost.seoDescription as string | undefined,
        mainImage: sanityPost.mainImage as
          | { asset?: { url?: string }; alt?: string }
          | undefined,
      }
    : localPost
    ? {
        slug: localPost.slug,
        title: localPost.title,
        excerpt: localPost.excerpt,
        body: undefined,
        content: localPost.content, // Markdown string (local fallback)
        category: localPost.category,
        date: localPost.date,
        keywords: localPost.keywords ?? "",
        seoTitle: undefined,
        seoDescription: undefined,
        mainImage: undefined,
      }
    : undefined;

  // While the client is re-fetching (e.g. an article published after the
  // last SSG build), don't redirect to /blog — show a minimal loading state.
  if (!post) {
    if (isFetchingPost) {
      return (
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-16 mt-20">
            <p className="text-center text-muted-foreground">Chargement de l'article…</p>
          </main>
          <Footer />
        </div>
      );
    }
    return <Navigate to="/blog" replace />;
  }

  // Safe date: avoid rendering "1 janvier 1970" when post.date is null/undefined
  // or otherwise invalid.
  const parsedDate = post.date ? new Date(post.date) : null;
  const hasValidDate = parsedDate !== null && !Number.isNaN(parsedDate.getTime());

  const seoTitle = post.seoTitle ?? `${post.title} | Dr Stéphanie Meriot`;
  const seoDescription = post.seoDescription ?? post.excerpt;
  const mainImageUrl = post.mainImage?.asset?.url;
  const mainImageAlt = post.mainImage?.alt ?? post.title;

  // Choose the right renderer:
  //   - Sanity articles use PortableText (`body` array)
  //   - Local fallback articles use Markdown (`content` string)
  const hasPortableBody = Array.isArray(post.body) && post.body.length > 0;
  const hasMarkdownContent = typeof post.content === "string" && post.content.length > 0;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`/blog/${post.slug}`}
        keywords={post.keywords}
        ogTitle={post.title}
        ogDescription={post.excerpt}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <FloatingCTA />

        <main className="container mx-auto px-4 py-16 mt-20">
          <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-8 animate-fade-in">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour au blog
          </Link>

          <article className="max-w-4xl mx-auto">
            <header className="mb-12 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <Tag className="w-5 h-5 text-primary" />
                <span className="text-lg font-medium text-primary">{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{post.title}</h1>
              {hasValidDate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <time dateTime={post.date}>
                    Publié le {parsedDate!.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
              )}
            </header>

            {mainImageUrl && (
              <figure className="mb-10 animate-fade-in">
                <img
                  src={mainImageUrl}
                  alt={mainImageAlt}
                  className="w-full h-auto rounded-xl shadow-lg object-cover"
                  loading="lazy"
                />
              </figure>
            )}

            <div
              className="prose prose-lg max-w-none animate-fade-in"
              style={{ animationDelay: '100ms' }}
            >
              {hasPortableBody ? (
                <PortableText value={post.body} components={portableTextComponents} />
              ) : hasMarkdownContent ? (
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
                    a: ({node, href, ...props}) => {
                      const isExternal = href?.startsWith('http');
                      return <a className="text-primary hover:underline font-medium" href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "nofollow noopener noreferrer" : undefined} {...props} />;
                    },
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />,
                    table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="min-w-full border-collapse border border-border" {...props} /></div>,
                    thead: ({node, ...props}) => <thead className="bg-muted" {...props} />,
                    th: ({node, ...props}) => <th className="border border-border px-4 py-2 text-left font-semibold" {...props} />,
                    td: ({node, ...props}) => <td className="border border-border px-4 py-2" {...props} />,
                  }}
                >
                  {post.content!}
                </ReactMarkdown>
              ) : (
                <p className="text-muted-foreground">Contenu en cours de chargement…</p>
              )}
            </div>

            <footer className="mt-12 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">À propos de l'auteur</h3>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Dr Stéphanie Meriot</strong> est chirurgien-dentiste spécialisée en parodontologie et implantologie à Marseille 4ème.
                </p>
                <Link to="/a-propos" className="inline-flex items-center text-primary font-medium hover:underline">
                  En savoir plus sur le Dr Meriot <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </footer>

            <section className="mt-12 bg-primary/5 rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">Besoin d'un Rendez-vous ?</h2>
              <p className="text-muted-foreground mb-6">Prenez rendez-vous pour un bilan personnalisé</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={doctolibUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">Prendre RDV en Ligne</a>
                <a href={telHref} className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors">Appeler le {tel}</a>
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
