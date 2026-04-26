## Problème

Quand un nouvel article Sanity est publié après le build SSG, `/blog/<slug>` ne montre que le titre et la catégorie. La date affiche "1 janvier 1970" (timestamp 0 = `date` null) et le body est vide. Cause :

- Le SSG fetche au build : un article publié après le déploiement n'existe pas dans le HTML pré-rendu.
- Le hook `useBlogPost` est désactivé (`enabled: isBrowser`) tant qu'on n'est pas dans le navigateur, mais après hydratation il devrait re-fetcher — or l'état `placeholderData: null` masque l'absence de données réelles, et il n'y a pas de fallback déclenché côté client si le SSG a renvoyé null.
- `BlogPost.tsx` formate `post.date` même quand il est `undefined`, ce qui donne `new Date(undefined)` → "Invalid Date", ou `new Date(null)` → epoch (01/01/1970).
- `src/lib/sanity.ts` swallow les erreurs sans contexte exploitable au build.

## Correctifs (3 fichiers)

### 1. `src/hooks/useSanityContent.ts` — re-fetch côté client garanti

Modifier `useSanityQuery` pour que la query soit aussi exécutée côté client même quand un fallback null a été utilisé pendant le SSG :

- Garder `enabled: isBrowser` (déjà OK pour éviter le mismatch d'hydratation).
- Ajouter `refetchOnMount: "always"` et `staleTime: 0` **uniquement pour le hook `useBlogPost`** (les blog posts sont les seuls contenus susceptibles d'être ajoutés après build). Les autres pages gardent leur cache 5min.
- Concrètement : extraire une variante `useSanityQueryFresh` (ou ajouter un paramètre `options` au helper) et l'utiliser dans `useBlogPost` et `useBlogPosts`.

Cela garantit qu'à la première hydratation côté client, React Query déclenche un fetch frais vers Sanity, indépendamment de ce que le SSG a injecté.

### 2. `src/lib/sanity.ts` — logs explicites en dev

Ajouter un `console.warn` clair :
- Quand `result` est `null`/`undefined` (pas seulement quand `fetch` throw), avec un préfixe `[sanity SSG/SSR]` quand `typeof window === "undefined"`.
- Inclure le début de la query (premiers 80 chars) pour pouvoir identifier laquelle a échoué au build.
- Conditionner ce logging à `import.meta.env.DEV` ou `process.env.NODE_ENV !== "production"` pour ne pas polluer les logs prod du visiteur — mais le **garder actif côté Node** pendant le build SSG (toujours visible dans les logs Vercel/Lovable de build).

### 3. `src/pages/BlogPost.tsx` — fallback date + état de chargement

Deux ajustements minimes (zéro changement de design) :

**a. Date sûre :** remplacer le bloc actuel
```tsx
<time dateTime={post.date}>Publié le {new Date(post.date).toLocaleDateString(...)}</time>
```
par une vérification : si `post.date` est falsy ou si `new Date(post.date)` est invalide → ne rien rendre (masquer le bloc `<div className="flex items-center gap-2 text-muted-foreground">` complet). Pas de date du jour (préférable de ne rien afficher plutôt qu'une date trompeuse pour un article).

**b. État "fetch en cours" pour les nouveaux articles :** récupérer aussi `isLoading` et `isFetching` depuis `useBlogPost`. Si :
- pas de `localPost`,
- pas de `sanityPost`,
- et `isFetching === true` (re-fetch client en cours),

→ afficher un état de chargement minimal (le squelette existant de la page + un message simple "Chargement de l'article...") **au lieu de `Navigate to="/blog"`**. Le `Navigate` ne se déclenche que si la query est terminée (`isFetching === false`) ET qu'aucun post n'a été trouvé, pour éviter une redirection prématurée au moment où le client re-fetch un article que le SSG a raté.

## Notes / hors-scope

- Aucun changement de design.
- Pas de `HelmetProvider` (incompatible vite-react-ssg).
- Le rendu Markdown actuel via `ReactMarkdown` est conservé tel quel (le code utilise déjà ReactMarkdown, pas PortableText — on n'y touche pas).
- Le champ utilisé dans le schéma Sanity est `date` (pas `publishedAt`), confirmé dans `src/lib/sanityQueries.ts`. Le hook continue à mapper `date` correctement.
- Pas de modification du build SSG ni du sitemap.

## Vérification

- Lancer `npx vitest run src/test/ssg-seo.test.ts` pour vérifier qu'aucun test SEO/SSG ne régresse.
- Build local pour vérifier que les nouveaux warns Sanity apparaissent en clair dans les logs de build.
