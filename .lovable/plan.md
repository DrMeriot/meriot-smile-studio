

## Diagnostic

**Problème observé** : Google Search Console signale `/gingivite-marseille` en **Soft 404**. Investigation via `curl` sur le HTML statique pré-rendu :

| Page | `<title>` retourné | `<link rel="canonical">` | `<meta description>` |
|---|---|---|---|
| `/` | "Dr Stéphanie Meriot - Chirurgien-Dentiste Marseille" | absent | absent |
| `/parodontie` | **idem (générique homepage)** | **absent** | **absent** |
| `/gingivite-marseille` | **idem (générique homepage)** | **absent** | **absent** |

**Tous les `<title>`, `canonical` et `description` spécifiques sont manquants** dans le HTML pré-rendu — seul reste celui figé dans `index.html`. Pour Google : toutes les pages ont le même titre/description que la homepage → contenu jugé dupliqué/vide → **Soft 404**.

Note secondaire : `https://www.dr-meriot...` redirige en 301 vers `https://dr-meriot...` (sans www). Ce n'est pas la cause du Soft 404 mais ça désaligne les URLs déclarées dans le sitemap (`www.`) avec celles réellement servies (apex).

## Cause racine

Conflit entre deux systèmes de gestion du `<head>` :
- `src/components/SEOHead.tsx` utilise `<Head>` de **`vite-react-ssg`** (wrapper React Helmet "classique").
- `src/App.tsx` enveloppe l'app avec `HelmetProvider` de **`react-helmet-async`**.

Les deux librairies sont incompatibles entre elles : `HelmetProvider` court-circuite la gestion de Helmet classique, et `vite-react-ssg` n'arrive pas à extraire les balises au moment du pré-rendu SSG. Résultat : aucune balise `<Head>` n'est injectée dans le HTML statique.

## Plan de correction

**1. Retirer `react-helmet-async` du wiring (`src/App.tsx`)**
Supprimer l'import et le `<HelmetProvider>` qui enveloppent `<Outlet />`. `vite-react-ssg`'s `<Head>` se suffit à lui-même.

**2. Ajouter le canonical absent dans `SEOHead.tsx`**
Le composant déclare déjà `<link rel="canonical" href={fullCanonical} />` — il sera réellement injecté une fois `HelmetProvider` retiré. Aucun changement ici.

**3. Aligner le domaine canonique sur le domaine effectivement servi**
Le DNS redirige `www.` → apex en 301. Deux options possibles (à confirmer) :
- (A) **Garder le domaine canonique avec `www.`** (statu quo dans `SEOHead.tsx`, `vite.config.ts` sitemap) et laisser Vercel gérer la redirection.
- (B) **Changer toutes les références canoniques vers le domaine apex** (sans `www.`) pour éviter le saut 301 sur chaque crawl Google.

L'option (A) est standard et acceptée par Google ; l'option (B) est marginalement plus performante. Je recommande (A) — aucune action requise sur ce point.

**4. Vérification après déploiement**
Re-tester avec curl que `/parodontie`, `/gingivite-marseille`, `/implantologie` retournent désormais leur propre `<title>`, `<meta description>` et `<link rel="canonical">` dans le HTML statique. Puis dans Search Console : "Demander une indexation" pour les pages prioritaires.

## Fichiers modifiés

- `src/App.tsx` : retirer `import { HelmetProvider } from "react-helmet-async"` et l'usage du provider.

C'est tout. Une seule correction chirurgicale, qui devrait débloquer l'extraction `<Head>` par `vite-react-ssg` pour toutes les pages.

