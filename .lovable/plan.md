

# Add react-snap for static pre-rendering

## Changes

### 1. `package.json`
- Add `"react-snap": "^1.23.0"` to `devDependencies`
- Change `"build"` script to `"vite build && npx react-snap"`
- Add `reactSnap` config block at root level with the 11 routes, puppeteer args, `renderAfterTime: 3000`, and `saveAs: "html"`

### 2. `src/main.tsx`
Replace current render call with hydration-aware logic:
```ts
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
```

This detects if react-snap has already rendered HTML into `#root` and hydrates instead of replacing it, preserving SEO content for crawlers.

