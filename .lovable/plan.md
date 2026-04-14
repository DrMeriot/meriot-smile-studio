

# SEO avancé — Schemas médicaux + Pages long-tail éditables Sanity

## Résumé

Implémenter les schemas structurés `MedicalWebPage`, `MedicalCondition` et `HowTo` sur `/parodontie`, créer 3 pages long-tail géo-ciblées (`/gingivite-marseille`, `/dechaussement-dentaire-marseille`, `/gencives-qui-saignent`), le tout 100% éditable depuis Sanity Studio avec des balises HTML sémantiques pour une meilleure indexation.

## 1. Schemas structurés sur `/parodontie` (données tirées de Sanity)

### Nouveau composant : `src/components/MedicalSchema.tsx`
- Injecte via `react-helmet-async` un JSON-LD `@graph` contenant :
  - `MedicalWebPage` (type de page médicale, auteur = Dr Meriot)
  - `MedicalCondition` pour "Gingivite" et "Parodontite" (symptômes, traitements tirés de `page?.symptomesList`, `page?.gingiviteItems`, etc.)
- Les données viennent du hook `useSanityPage("parodontie")` existant — aucun nouveau champ Sanity nécessaire

### Nouveau composant : `src/components/HowToSchema.tsx`
- Injecte un schema `HowTo` avec les étapes tirées de `page?.traitementsList` (déjà structuré en steps dans Sanity)
- Aucun nouveau champ Sanity nécessaire

### Modification : `src/pages/Parodontie.tsx`
- Ajouter `<MedicalSchema />` et `<HowToSchema />` dans le JSX
- Améliorer le HTML sémantique : utiliser `<article>`, `<section>` avec `aria-labelledby`, `<dl>` pour le glossaire, `<details>/<summary>` pour les FAQ au lieu de `<div>`

## 2. Trois schemas Sanity pour les pages long-tail

### Nouveau fichier : `sanity/schemas/gingivite_marseille.ts`
Structure plate identique à `parodontie.ts` :
- `heroTitle`, `heroSubtitle`
- `definitionTitre`, `definitionTexte1`, `definitionTexte2`
- `causesTitre`, `causesList` (array `{title, desc}`)
- `traitementTitre`, `traitementTexte`
- `faqTitre`, `faqList` (array `{question, answer}`)
- `ctaTitre`, `ctaTexte`
- `seoTitle`, `seoDescription`

### Nouveau fichier : `sanity/schemas/dechaussement_dentaire.ts`
Même structure, adapté au déchaussement dentaire.

### Nouveau fichier : `sanity/schemas/gencives_qui_saignent.ts`
Même structure, adapté aux saignements de gencives.

### Modification : `sanity/schemas/index.ts`
Ajouter les 3 nouveaux schemas à `schemaTypes`.

## 3. Queries et hooks Sanity

### Modification : `src/lib/sanityQueries.ts`
Ajouter 3 queries :
```ts
export const gingiviteMarseilleQuery = `*[_type == "gingivite_marseille"][0]`;
export const dechaussementDentaireQuery = `*[_type == "dechaussement_dentaire"][0]`;
export const gencivesQuiSaignentQuery = `*[_type == "gencives_qui_saignent"][0]`;
```

### Modification : `src/hooks/useSanityContent.ts`
Ajouter les 3 nouveaux types dans `queryMap`.

## 4. Trois pages React avec HTML sémantique

### `src/pages/GingiviteMarseille.tsx`
- `useSanityPage("gingivite_marseille")` avec fallbacks hardcodés
- HTML sémantique : `<article>`, `<section aria-labelledby>`, `<h1>`-`<h3>` hiérarchiques, `<ul>` sémantiques
- Composants SEO : `SEOHead`, `FAQSchema`, `BreadcrumbSchema`, `MedicalSchema` (condition = Gingivite)
- Liens internes vers `/parodontie`, `/contact`, blog articles
- Contenu unique (300+ mots) ciblant "gingivite Marseille", "traitement gingivite"

### `src/pages/DechaussementDentaire.tsx`
Même pattern, ciblant "déchaussement dentaire Marseille", "récession gingivale"

### `src/pages/GencivesQuiSaignent.tsx`
Même pattern, ciblant "gencives qui saignent", "saignement gencives causes"

## 5. Routes et sitemap

### Modification : `src/App.tsx`
Ajouter 3 routes dans `children` :
```ts
{ path: 'gingivite-marseille', element: <GingiviteMarseille /> },
{ path: 'dechaussement-dentaire-marseille', element: <DechaussementDentaire /> },
{ path: 'gencives-qui-saignent', element: <GencivesQuiSaignent /> },
```

### Modification : `public/sitemap.xml`
Ajouter les 3 nouvelles URLs.

## 6. HTML sémantique amélioré sur `/parodontie`

- Remplacer les `<div>` de FAQ par `<details>`/`<summary>` (natif, accessible, indexé par Google)
- Ajouter `<article>` comme wrapper principal du contenu
- Ajouter `id` sur les `<h2>` et `aria-labelledby` sur les `<section>`
- Utiliser `<ul>` / `<ol>` correctement balisés partout

## Résultat

- **0 impact Sanity** sur l'existant — les 3 nouveaux schemas s'ajoutent sans toucher aux documents actuels
- **100% éditable** depuis Sanity Studio (titres, textes, FAQ, SEO)
- **HTML sémantique** pour une meilleure compréhension par Google
- **Schemas structurés** `MedicalCondition` + `HowTo` pour des rich snippets enrichis
- **Fallbacks hardcodés** pour chaque champ, garantissant un rendu même sans données Sanity

