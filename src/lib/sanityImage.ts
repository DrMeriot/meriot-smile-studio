import imageUrlBuilder from "@sanity/image-url";

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

const builder = imageUrlBuilder({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "6a2np8jy",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
});

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
