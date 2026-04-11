import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Polyfill browser globals for SSR/SSG builds
function ssrGlobalsPlugin(): Plugin {
  return {
    name: 'ssr-globals-polyfill',
    enforce: 'pre',
    config(_, { isSsrBuild }) {
      if (isSsrBuild) {
        // Polyfill before any module code runs
        if (typeof globalThis.localStorage === 'undefined') {
          const storage: Record<string, string> = {};
          (globalThis as any).localStorage = {
            getItem: (key: string) => storage[key] ?? null,
            setItem: (key: string, value: string) => { storage[key] = value; },
            removeItem: (key: string) => { delete storage[key]; },
            clear: () => { Object.keys(storage).forEach(k => delete storage[k]); },
            get length() { return Object.keys(storage).length; },
            key: (index: number) => Object.keys(storage)[index] ?? null,
          };
        }
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    ssrGlobalsPlugin(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
}));
