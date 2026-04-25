## Objectif

Ajouter un test SSG qui garantit, après chaque build, que la page d'accueil (`/`) contient **exactement un seul** bloc JSON-LD `@graph` regroupant les entités `Dentist`, `Person` et `WebSite` — et qu'aucune de ces entités ne fuit dans un second `<script type="application/ld+json">` séparé.

## Pourquoi

Le `LocalBusinessSchema` actuel injecte un `@graph` unique avec trois entités liées par `@id` (`#dentist`, `#person`, `#website`). Si quelqu'un ajoute par mégarde un second schema Dentist (cf. décision précédente sur `#cabinet`), ou si un refactor casse la structure `@graph`, on perd la cohérence sémantique sans que rien ne le signale. Ce test bloque toute régression au build.

## Approche

Étendre la suite existante `src/test/ssg-seo.test.ts` (qui réutilise déjà `dist/`) avec un nouveau `describe("SSG JSON-LD — homepage")` qui :

1. Lit `dist/index.html` (build SSG déjà déclenché par la suite existante via `beforeAll`).
2. Parse tous les `<script type="application/ld+json">` du `<head>`.
3. Filtre ceux qui contiennent une entité `Dentist`, `Person` ou `WebSite` (LocalBusinessSchema). Les autres schemas globaux éventuels (FAQ, Breadcrumb, MedicalSchema…) sont ignorés.

## Assertions

Sur le bloc LocalBusinessSchema :

- **Un seul script** parmi tous les JSON-LD contient un `Dentist` (pas de doublon `#cabinet` vs `#dentist`).
- Ce script a `@context === "https://schema.org"` et un champ `@graph` qui est un tableau.
- Le `@graph` contient **exactement trois entités** avec les `@type` `Dentist`, `Person`, `WebSite` (un de chaque).
- Les `@id` correspondent au pattern attendu : `…/#dentist`, `…/#person`, `…/#website`.
- Aucune autre balise JSON-LD de la page ne contient `"@type": "Dentist"`, `"@type": "Person"` ou `"@type": "WebSite"` (anti-fuite).
- Le `Person` référence bien le `Dentist` via `worksFor.@id === Dentist["@id"]`, et le `WebSite` via `publisher.@id === Dentist["@id"]` (cohérence du graphe).
- Chaque script JSON-LD est un JSON valide (`JSON.parse` ne throw pas), pour éviter qu'un schema cassé passe inaperçu.

## Détails techniques

- Fichier : compléter `src/test/ssg-seo.test.ts` avec un second bloc `describe`. Pas de nouvelle dépendance, pas de modif de `vitest.config.ts`.
- Cible HTML : `path.resolve(__dirname, "../../dist/index.html")` (avec fallback `dist/index/index.html` par sécurité, comme déjà fait pour gingivite).
- Parsing : réutiliser `JSDOM`, puis `Array.from(doc.head.querySelectorAll('script[type="application/ld+json"]'))`.
- Le test `beforeAll` fait déjà tourner `npm run build` si `dist/` est absent — pas besoin de le redéclencher.
- Lancement : `npx vitest run` (déjà fonctionnel via la suite existante).

## Hors scope

- Pas de validation des autres schemas (FAQ, Breadcrumb, HowTo, Medical) — tests séparés si besoin un jour.
- Pas de modif de `LocalBusinessSchema.tsx` ni d'`Index.tsx`.
- Pas de test sur les autres pages (parodontie, implantologie, etc.) — le LocalBusinessSchema n'est rendu que sur `/`.
