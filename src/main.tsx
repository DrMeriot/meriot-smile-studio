import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

const queryClient = new QueryClient();

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    // Custom setup - wrap with providers
  },
  ({ app }) => {
    return (
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {app}
        </QueryClientProvider>
      </HelmetProvider>
    );
  },
);
