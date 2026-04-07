import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "6a2np8jy",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  timeout: 3000,
});

// Debug: test client connectivity directly
sanityClient.fetch('*[_type=="global"][0]').then(d => console.log("DIRECT SANITY TEST:", d)).catch(e => console.error("DIRECT SANITY ERROR:", e));
