// Global singleton — phone, address, doctolib, hours, geo
export const globalQuery = `*[_type == "global"][0]`;

// Homepage singleton
export const accueilQuery = `*[_type == "accueil"][0]`;

// Specialty singletons
export const parodontieQuery = `*[_type == "parodontie"][0]`;
export const implantologieQuery = `*[_type == "implantologie"][0]`;
export const esthetiqueQuery = `*[_type == "esthetique"][0]`;
export const tarifsQuery = `*[_type == "tarifs"][0]`;
export const aboutQuery = `*[_type == "about"][0]`;
export const servicesPageQuery = `*[_type == "services_page"][0]`;
export const legalQuery = `*[_type == "legal"][0]`;
export const contactQuery = `*[_type == "contact"][0]`;
export const confidentialiteQuery = `*[_type == "confidentialite"][0]`;

// Blog
export const blogPostsQuery = `*[_type == "blog_post"] | order(date desc) {
  _id, slug, title, excerpt, category, date, keywords,
  "seo": seo { title, description }
}`;

export const blogPostBySlugQuery = `*[_type == "blog_post" && slug.current == $slug][0] {
  _id, slug, title, excerpt, content, category, date, keywords,
  "seo": seo { title, description }
}`;
