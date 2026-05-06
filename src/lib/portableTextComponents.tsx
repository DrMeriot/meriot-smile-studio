import { Link } from "react-router-dom";
import { type PortableTextComponents } from "@portabletext/react";

// Shared PortableText rendering: Tailwind styling + react-router <Link>
// for internal links. Used by BlogPost and Sanity-driven landing pages.
export const portableTextComponents: PortableTextComponents = {
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
