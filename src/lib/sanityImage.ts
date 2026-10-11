import imageUrlBuilder from "@sanity/image-url";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

const builder = imageUrlBuilder({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "6a2np8jy",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Turn a raw Sanity CDN asset URL into a browser-safe, resized URL.
 * Raw assets can be HEIF/HEIC (iPhone photos), which Chrome/Firefox can't
 * display. `auto=format` lets the CDN serve WebP/AVIF; `fm=jpg` forces JPEG
 * (for og:image / JSON-LD, read by crawlers that ignore Accept headers).
 */
export function sanityImg(
  url: string | undefined,
  opts: { w?: number; fm?: "jpg" } = {},
): string | undefined {
  if (!url) return undefined;
  if (!url.includes("cdn.sanity.io")) return url;
  const params = new URLSearchParams();
  if (opts.w) params.set("w", String(opts.w));
  params.set("fit", "max");
  if (opts.fm) params.set("fm", opts.fm);
  else params.set("auto", "format");
  params.set("q", "80");
  return `${url.split("?")[0]}?${params.toString()}`;
}
