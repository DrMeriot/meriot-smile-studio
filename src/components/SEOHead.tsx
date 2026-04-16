import { Head } from "vite-react-ssg";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  keywords?: string;
  articlePublishedTime?: string;
  articleAuthor?: string;
}

const SEOHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  keywords,
  articlePublishedTime,
  articleAuthor,
}: SEOHeadProps) => {
  const siteUrl = "https://www.dr-meriot-chirurgien-dentiste.fr";
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : `${siteUrl}/`;
  const defaultOgImage = `${siteUrl}/og-image.jpg`;
  const siteName = "Dr Stéphanie Meriot - Dentiste Marseille";

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Dr Stéphanie Meriot - Cabinet dentaire spécialisé en parodontie à Marseille" />
      <meta property="og:locale" content="fr_FR" />

      {/* Article specific Open Graph */}
      {ogType === "article" && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === "article" && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@DrMeriotDentist" />
      <meta name="twitter:creator" content="@DrMeriotDentist" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />
      <meta name="twitter:image:alt" content="Dr Stéphanie Meriot - Cabinet dentaire spécialisé en parodontie à Marseille" />

      {/* Additional Meta */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="fr" />
      <meta name="geo.region" content="FR-13" />
      <meta name="geo.placename" content="Marseille" />
      <meta name="geo.position" content="43.3117;5.3947" />
      <meta name="ICBM" content="43.3117, 5.3947" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Dr Stéphanie Meriot" />
      
      {/* Mobile & App */}
      <meta name="theme-color" content="#e07b91" />
      <meta name="apple-mobile-web-app-title" content="Dr Meriot Dentiste" />
    </Head>
  );
};

export default SEOHead;
