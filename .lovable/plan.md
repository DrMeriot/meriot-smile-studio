## Contexte

La carte « Esthétique dentaire » visible dans la section « Accès direct à nos expertises » (composant `QuickLinks`) est injectée par le CMS Sanity (`accueil.specialites`), pas par le code. Le code par défaut ne contient déjà que Parodontie + Implantologie, mais le hook `useSanityPage("accueil")` remonte un troisième élément stocké dans Sanity, qui s'affiche en priorité (`accueil?.specialites ?? defaultSpecialties`).

Trois autres résidus « esthétique » ont été oubliés lors du nettoyage précédent :
- `src/pages/Services.tsx` : carte service par défaut « Esthétique dentaire » (ligne 52-59) + mot « esthétique » dans la SEO description fallback (ligne 84).
- `src/pages/Tarifs.tsx` : bloc tarif « Esthétique » (ligne 110-113).

## Modifications

### 1. Forcer la liste des spécialités (`src/components/QuickLinks.tsx`)
Ignorer le champ Sanity `specialites` et utiliser uniquement `defaultSpecialties` (Parodontie + Implantologie), pour neutraliser l'entrée CMS résiduelle sans toucher au studio Sanity. Garder le titre/label Sanity (`quicklinksLabel`, `quicklinksTitle`) qui restent valides.

### 2. Nettoyer la page Services (`src/pages/Services.tsx`)
- Retirer entièrement l'objet `Esthétique dentaire` des `defaultServicesDetails`.
- Retirer `Sparkles` de l'`iconMap` et de l'import `lucide-react` s'il n'est plus utilisé ailleurs dans le fichier.
- Retirer le mot « esthétique » de `seoDesc` fallback (remplacer par « parodontie, implantologie, soins, prévention. Secteur 1. »).

### 3. Nettoyer la page Tarifs (`src/pages/Tarifs.tsx`)
- Supprimer le bloc « Esthétique » (h4 + p, lignes ~110-113) dans la carte « Soins spécialisés ».
- Vérifier et retirer la variable `blanchiment` si elle n'est plus utilisée ailleurs.

### 4. Vérification
Lancer `npx vitest run src/test/ssg-seo.test.ts` pour confirmer que les 46 tests passent toujours et que l'accueil ne propose plus que les deux spécialités attendues.

## Hors scope

- Aucune modification du schéma Sanity (`accueil.ts` ne déclare pas `specialites`, donc rien à nettoyer côté schéma).
- Pas de changement dans `blogData.ts` : les occurrences « esthétique » y sont des termes médicaux légitimes (matériaux esthétiques, profil de gencive esthétique), pas des renvois vers la page supprimée.
- Pas de touche au studio Sanity en ligne : le forçage côté front suffit à masquer la donnée résiduelle.
