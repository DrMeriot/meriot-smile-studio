import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "erxqaqoe",
  dataset: import.meta.env.VITE_SANITY_DATASET || "data",
  apiVersion: "2024-01-01",
  useCdn: true,
  timeout: 3000,
});
