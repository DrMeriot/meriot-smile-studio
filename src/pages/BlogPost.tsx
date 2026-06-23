import { useParams, Link, Navigate, useLoaderData } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SEOHead from "@/components/SEOHead";
import RelatedParodontieLinks from "@/components/RelatedParodontieLinks";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents";
import { useGlobalSettings, useBlogPost, useSanityPage } from "@/hooks/useSanityContent";

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



const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: global } = useGlobalSettings();
  const { data: blogPage } = useSanityPage("blog_page");

  // SSG: the route loader (src/App.tsx) prefetches the article from Sanity at
  // build time. We seed it into React Query BEFORE useBlogPost runs so that
  // the SSG-rendered HTML contains the full article content (not a loading
  // shell). On the client, `alwaysFresh: true` will still re-fetch on mount,
  // so newly published posts remain visible without rebuild.
  const loaderData = useLoaderData() as { post: unknown } | undefined;
  const queryClient = useQueryClient();
  if (loaderData?.post && slug) {
    const key = ["sanity", `blogPost-${slug}`, { slug }];
    if (queryClient.getQueryData(key) === undefined) {
      queryClient.setQueryData(key, loaderData.post);
    }
  }

  const { data: sanityPost, isFetching: isFetchingPost } = useBlogPost(slug ?? "");

  const tel = global?.phone ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const doctolibUrl = global?.doctolib ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";

  const auteurBio = blogPage?.auteurBio ?? "est chirurgien-dentiste spécialisée en parodontologie et implantologie à Marseille 4ème.";
  const articleCtaTitre = blogPage?.articleCtaTitre ?? "Besoin d'un Rendez-vous ?";
  const articleCtaTexte = blogPage?.articleCtaTexte ?? "Prenez rendez-vous pour un bilan personnalisé";

  // Sanity post. Schema fields are flat:
  //   body / publishedAt / seoTitle / seoDescription / mainImage.
  const post = sanityPost
    ? {
        slug:
          typeof sanityPost.slug === "string"
            ? sanityPost.slug
            : sanityPost.slug?.current,
        title: sanityPost.title,
        excerpt: sanityPost.excerpt,
        body: sanityPost.body, // PortableText array
        category: sanityPost.category,
        date: sanityPost.publishedAt,
        keywords: sanityPost.keywords ?? "",
        seoTitle: sanityPost.seoTitle as string | undefined,
        seoDescription: sanityPost.seoDescription as string | undefined,
        mainImage: sanityPost.mainImage as
          | { asset?: { url?: string }; alt?: string }
          | undefined,
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

  // Sanity articles render via PortableText (`body` array).
  const hasPortableBody = Array.isArray(post.body) && post.body.length > 0;

  // Auto-extracted FAQ for FAQPage JSON-LD schema (PortableText only).
  const faqs = hasPortableBody ? extractFAQFromPortableText(post.body) : [];

  // Article JSON-LD: only emitted when we have a real title (skip loading
  // states). Date is normalized to ISO 8601 when available.
  const articleSchema = post.title
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        ...(mainImageUrl ? { image: mainImageUrl } : {}),
        ...(hasValidDate
          ? {
              datePublished: parsedDate!.toISOString(),
              dateModified: parsedDate!.toISOString(),
            }
          : {}),
        author: {
          "@type": "Person",
          name: "Dr Stéphanie Meriot",
          url: "https://www.dr-meriot-chirurgien-dentiste.fr/a-propos",
        },
        publisher: {
          "@type": "Organization",
          name: "Cabinet Dr Stéphanie Meriot",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.dr-meriot-chirurgien-dentiste.fr/blog/${post.slug}`,
        },
      }
    : null;

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }
      : null;

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
      {(articleSchema || faqSchema) && (
        <Head>
          {articleSchema && (
            <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
          )}
          {faqSchema && (
            <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
          )}
        </Head>
      )}
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
              ) : (
                <p className="text-muted-foreground">Contenu en cours de chargement…</p>
              )}
            </div>

            {typeof post.category === "string" && /parodont/i.test(post.category) && (
              <RelatedParodontieLinks />
            )}

            <footer className="mt-12 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">À propos de l'auteur</h3>
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Dr Stéphanie Meriot</strong> {auteurBio}
                </p>
                <Link to="/a-propos" className="inline-flex items-center text-primary font-medium hover:underline">
                  En savoir plus sur le Dr Meriot <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </footer>

            <section className="mt-12 bg-primary/5 rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">{articleCtaTitre}</h2>
              <p className="text-muted-foreground mb-6">{articleCtaTexte}</p>
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
