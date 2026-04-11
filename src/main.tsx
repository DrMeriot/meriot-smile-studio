// Polyfill localStorage for SSG (Node.js environment)
if (typeof window === 'undefined') {
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

import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';
import './index.css';

export const createRoot = ViteReactSSG({ routes });
