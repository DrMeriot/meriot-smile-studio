

# Intégration Sanity CMS — Plan d'exécution

## Résumé

Installer `@sanity/client` et `@sanity/image-url`, créer la couche Sanity (client, queries GROQ, hooks React Query), puis migrer tous les composants pour centraliser le contenu. Créer les schémas de référence et les fichiers de données initiales pour import dans Sanity.

## Étapes

### 1. Installation des packages
- `@sanity/client` et `@sanity/image-url`
- `@tanstack/react-query` est déjà installé

### 2. Fichiers infrastructure Sanity
- **`src/lib/sanity.ts`** — Client Sanity (`projectId: "6a2np8jy"`, `dataset: "production"`, `useCdn: true`)
- **`src/lib/sanityImage.ts`** — Helper `urlFor()` pour les images Sanity
- **`src/lib/sanityQueries.ts`** — Toutes les queries GROQ (global, accueil, parodontie, implantologie, esthetique, tarifs, about, services, legal, blogPosts, blogPostBySlug)

### 3. Hooks React Query
- **`src/hooks/useSanityContent.ts`** — Hooks : `useGlobalSettings()`, `useSanityPage(type)`, `useBlogPosts()`, `useBlogPost(slug)`
- `staleTime: 5 min`, fallback pattern avec `??`

### 4. Migration composants globaux (priorité haute)
Remplacer les 40+ doublons (téléphone, adresse, doctolib_url, nom) par `useGlobalSettings()` :

| Fichier | Données centralisées |
|---------|---------------------|
| `Header.tsx` | nom_praticien, titre_praticien, telephone, doctolib_url |
| `Footer.tsx` | nom_praticien, adresse, telephone, doctolib_url, horaires |
| `FloatingCTA.tsx` | doctolib_url |
| `Contact.tsx` | telephone, adresse, horaires, maps_url, doctolib_url, zones |
| `LocalBusinessSchema.tsx` | Toutes les données globales |

### 5. Migration page d'accueil
Remplacer `usePageContent` (Supabase) par `useSanityPage('accueil')` + `useGlobalSettings()` :

| Composant | Sections Sanity |
|-----------|----------------|
| `Hero.tsx` | accueil.hero + global |
| `Practitioner.tsx` | accueil.praticien |
| `QuickLinks.tsx` | accueil.quicklinks |
| `Services.tsx` (composant) | accueil.services |
| `Philosophy.tsx` | accueil.philosophie |
| `Testimonials.tsx` | accueil.temoignages |
| `FAQ.tsx` | accueil.faq |

### 6. Migration pages spécialités
Chaque page utilise `useSanityPage('parodontie')` etc. avec fallback hardcodé :
- `Parodontie.tsx` — intro, symptomes, traitements, faq, glossaire
- `Implantologie.tsx` — intro, avantages, etapes, tarifs, faq
- `Esthetique.tsx` — intro, services, approche
- `Tarifs.tsx` — prix, remboursements
- `Services.tsx` (page) — liste services détaillés
- `About.tsx` (page) — bio, formations, philosophie
- `MentionsLegales.tsx` — rpps, diplomes
- `Blog.tsx` + `BlogPost.tsx` — articles depuis Sanity avec fallback sur `blogData.ts`

### 7. Fichiers de référence Sanity
- **`sanity/schemas/`** — 10 fichiers de schémas (global, accueil, parodontie, implantologie, esthetique, tarifs, about, services_page, legal, blog_post)
- **`sanity/data/`** — JSON avec tout le contenu hardcodé actuel pour import via `sanity dataset import`

### 8. Configuration
- **`.env.local.example`** avec `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_TOKEN`

## CORS — Action utilisateur requise
Ajouter dans Sanity (sanity.io/manage → API → CORS origins) :
- `https://*.lovableproject.com`
- `https://*.lovable.app`
- Le domaine de production

## Ce qui ne change pas
- Tous les styles, animations, structure HTML
- Routing React Router
- Admin Supabase (`/admin/*`) pour le blog
- Composants UI shadcn

## Fichiers créés (~15)
`src/lib/sanity.ts`, `sanityImage.ts`, `sanityQueries.ts`, `src/hooks/useSanityContent.ts`, `.env.local.example`, 10 fichiers `sanity/schemas/`, fichiers `sanity/data/`

## Fichiers modifiés (~20)
Header, Footer, FloatingCTA, Hero, Practitioner, QuickLinks, Services (composant), Philosophy, Testimonials, FAQ, Contact, LocalBusinessSchema, Parodontie, Implantologie, Esthetique, Tarifs, Services (page), About, MentionsLegales, Blog, BlogPost

