## Objectif

Ajouter un hook `useLandingPage(slug)` qui récupère un document Sanity de type `landing_page` par slug, puis l'utiliser dans les 3 pages paro pour afficher (en plus de l'existant) un `body` PortableText optionnel. Tout le contenu structuré actuel (hero, causes, FAQ…) et les fallbacks restent intacts.

## Étapes

### 1. `src/lib/sanityQueries.ts`
Ajouter une query GROQ paramétrée :
```ts
export const landingPageBySlugQuery = `*[_type == "landing_page" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, body, seoTitle, seoDescription
}`;
```

### 2. `src/hooks/useSanityContent.ts`
- Importer `landingPageBySlugQuery`.
- Exporter :
```ts
export function useLandingPage<T = any>(slug: string) {
  return useSanityQuery<T>(`landingPage-${slug}`, landingPageBySlugQuery, { slug });
}
```
(Pas de `alwaysFresh` — comportement standard, comme `useSanityPage`.)

### 3. Extraction des `portableTextComponents`
Dans `src/pages/BlogPost.tsx`, l'objet `portableTextComponents` est local. Le déplacer vers un module partagé `src/lib/portableTextComponents.tsx` et l'importer depuis `BlogPost.tsx` (zéro changement de comportement) ainsi que depuis les 3 landing pages.

### 4. `GingiviteMarseille.tsx`, `GencivesQuiSaignent.tsx`, `DechaussementDentaire.tsx`
Pour chacune :
- Importer `useLandingPage` et `PortableText` + `portableTextComponents`.
- Appeler `useLandingPage("gingivite-marseille")` / `"gencives-qui-saignent"` / `"dechaussement-dentaire-marseille"`.
- Insérer une nouvelle section conditionnelle entre la section « Définition » et « Causes » :
```tsx
{Array.isArray(landing?.body) && landing.body.length > 0 && (
  <section className="py-12">
    <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
      <PortableText value={landing.body} components={portableTextComponents} />
    </div>
  </section>
)}
```
- Tous les `useSanityPage(...)`, fallbacks `defaultFAQs` / `defaultCauses` / etc. restent inchangés.
- Les SEO (`seoTitle`, `seoDescription`) continuent de venir de `useSanityPage` (priorité au schéma typé existant) — pas de modification du `<SEOHead />`.

## Notes techniques

- Le type `landing_page` n'existe pas encore côté Sanity ; tant qu'aucun document n'est créé, la query renverra `null` et seuls les fallbacks JSX s'afficheront — comportement attendu.
- Aucune modification des schémas Sanity dans ce lot ; ajout du schéma `landing_page` côté Sanity Studio = étape ultérieure si souhaité.
- Aucun changement dans `App.tsx`, `vite.config.ts`, ni dans les schémas SEO/Medical.
