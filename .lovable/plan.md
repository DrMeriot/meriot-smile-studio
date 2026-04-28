## Problème

Les pages `/blog/:slug` sont pré-rendues mais font ~0.91 KiB (coquille vide en état "loading") au lieu de ~35 KiB. Cause : pendant le build SSG en Node, `useBlogPost` (React Query) retourne `null` car `enabled: isBrowser` bloque la requête, et même sans ça React Query ne fait pas d'appel synchrone pendant le render SSG.

## Solution

Utiliser le mécanisme officiel `loader` de react-router-dom supporté par `vite-react-ssg`. Au build, le `loader` s'exécute en Node, fetch Sanity, et la donnée est sérialisée dans le HTML statique. Au render du composant, on lit `useLoaderData()` et on **seed le cache React Query** avec la même clé que `useBlogPost`. Résultat : SSG produit du HTML complet (~35 KiB), et le re-fetch client `alwaysFresh` continue de fonctionner pour les nouveaux articles.

## Changements

### 1. `src/App.tsx` — ajouter `loader` + `getStaticPaths` sur la route `blog/:slug`

Importer `sanityClient` et `blogPostBySlugQuery`. Remplacer la route :

```tsx
{
  path: 'blog/:slug',
  element: <BlogPost />,
  loader: async ({ params }) => {
    const slug = params.slug;
    if (!slug) return { post: null };
    try {
      const post = await sanityClient.fetch(blogPostBySlugQuery, { slug });
      return { post: post ?? null };
    } catch {
      return { post: null };
    }
  },
  getStaticPaths: async () => {
    // Réutiliser le même fetch slugs que le sitemap. Retourner les
    // chemins relatifs au pattern (ex: "blog/dent-qui-bouge-…").
    const projectId = import.meta.env?.VITE_SANITY_PROJECT_ID || '6a2np8jy';
    const dataset = import.meta.env?.VITE_SANITY_DATASET || 'production';
    const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(`*[_type=="blog_post" && defined(slug.current)]{"slug": slug.current}`)}`;
    const res = await fetch(url);
    const json = await res.json();
    return (json.result ?? []).map((p: { slug: string }) => `blog/${p.slug}`);
  },
}
```

`getStaticPaths` est l'API officielle vite-react-ssg pour énumérer les routes dynamiques (cf. README "Extra route options"). Combinée à `includedRoutes` actuel, elle garantit que vite-react-ssg pré-rend chaque slug **et** déclenche le `loader` pour chacun.

### 2. `src/pages/BlogPost.tsx` — lire le loader + seed React Query

En haut du composant, ajouter :

```tsx
import { useLoaderData } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const loaderData = useLoaderData() as { post: any } | undefined;
const queryClient = useQueryClient();

// Seed le cache React Query AVANT que useBlogPost ne s'exécute, avec
// la même clé : ['sanity', `blogPost-${slug}`, { slug }]
if (loaderData?.post && slug) {
  const key = ['sanity', `blogPost-${slug}`, { slug }];
  if (queryClient.getQueryData(key) === undefined) {
    queryClient.setQueryData(key, loaderData.post);
  }
}
```

Le `setQueryData` synchrone garantit que `useBlogPost` ci-dessous récupère immédiatement les données pendant le render SSG. Au runtime client, `alwaysFresh: true` déclenchera quand même un re-fetch comme avant (pas de régression pour les articles publiés après le dernier build).

### 3. Aucune autre modification

- `src/hooks/useSanityContent.ts` : pas touché (`enabled: isBrowser` reste, mais le seed du cache contourne cette contrainte côté SSG).
- `vite.config.ts` : `includedRoutes` + `fetchBlogSlugs` restent inchangés (double sécurité avec `getStaticPaths`).
- `src/lib/sanity.ts`, `src/lib/sanityQueries.ts` : inchangés.

## Vérification post-déploiement

Build logs Vercel attendus :
```
dist/blog/dent-qui-bouge-adulte-que-faire.html  ~35 KiB
dist/blog/gingivite-vs-parodontite.html          ~35 KiB
dist/blog/implants-idees-recues.html             ~35 KiB
```

`view-source:` sur l'URL doit montrer le titre, la date, le body PortableText complet, et les deux blocs `<script type="application/ld+json">` (Article + FAQPage) déjà mis en place.
