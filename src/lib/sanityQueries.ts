// Global singleton — phone, address, doctolib, hours, geo
export const globalQuery = `*[_type == "global"][0]`;

// Homepage singleton
export const accueilQuery = `*[_type == "accueil"][0]`;

// Specialty singletons
export const parodontieQuery = `*[_type == "parodontie"][0]`;
export const implantologieQuery = `*[_type == "implantologie"][0]`;

export const tarifsQuery = `*[_type == "tarifs"][0]`;
export const aboutQuery = `*[_type == "about"][0]`;
export const servicesPageQuery = `*[_type == "services_page"][0]`;
export const legalQuery = `*[_type == "legal"][0]`;
export const contactQuery = `*[_type == "contact"][0]`;
export const confidentialiteQuery = `*[_type == "confidentialite"][0]`;

// Generic landing page (by slug) — PortableText body + SEO
export const landingPageBySlugQuery = `*[_type == "landing_page" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  body,
  seoTitle,
  seoDescription
}`;

// Long-tail pages
export const gingiviteMarseilleQuery = `*[_type == "gingivite_marseille"][0]`;
export const dechaussementDentaireQuery = `*[_type == "dechaussement_dentaire"][0]`;
export const gencivesQuiSaignentQuery = `*[_type == "gencives_qui_saignent"][0]`;

export const blogPageQuery = `*[_type == "blog_page"][0]`;

// Blog
// NOTE: aligned with the real Sanity `blog_post` schema:
//  - body (PortableText array) — NOT `content`
//  - publishedAt (datetime ISO) — NOT `date`
//  - seoTitle / seoDescription (flat strings) — NOT a `seo` sub-object
//  - mainImage (Sanity image with asset + alt)
// Blog posts whose URL now 301-redirects elsewhere (see vercel.json). Kept out
// of the blog list, SSG paths and sitemap so Google never sees a redirecting URL.
export const REDIRECTED_BLOG_SLUGS = ["gencives-qui-saignent-quand-consulter"];
const notRedirected = `!(slug.current in [${REDIRECTED_BLOG_SLUGS.map((s) => `"${s}"`).join(",")}])`;

export const blogPostsQuery = `*[_type == "blog_post" && defined(slug.current) && ${notRedirected}] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  category,
  keywords,
  seoTitle,
  seoDescription,
  mainImage {
    asset->{ _id, url },
    alt
  }
}`;

export const blogPostBySlugQuery = `*[_type == "blog_post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  publishedAt,
  category,
  keywords,
  seoTitle,
  seoDescription,
  mainImage {
    asset->{ _id, url },
    alt
  }
}`;
