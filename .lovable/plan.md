

## Diagnostic

L'utilisateur signale que `/implantologie` n'a pas de SEO. Vérification curl sur la production révèle un problème **généralisé à toutes les pages** :

| Page | Body HTML pré-rendu | `<title>` | `<meta description>` | `<link canonical>` |
|---|---|---|---|---|
| `/implantologie` | ✓ 29 KB (h1 correct) | ❌ générique homepage | ❌ absent | ❌ absent |
| `/parodontie` | ✓ 52 KB (h1 correct) | ❌ générique homepage | ❌ absent | ❌ absent |
| `/gingivite-marseille` | ✓ 32 KB (h1 correct) | ❌ générique homepage | ❌ absent | ❌ absent |

**Le contenu des pages EST bien pré-rendu en SSG** (chaque page a son `<h1>` propre). Seul le `<head>` reste figé sur le placeholder de `index.html`. Le diagnostic initial ("la page ne rend qu'un titre générique") est partiellement vrai : c'est le `<head>` qui est cassé, pas le `<body>`.

## Cause racine

Inspection de `node_modules/vite-react-ssg/package.json` :

```json
"dependencies": {
  "react-helmet-async": "^1.3.0",
  ...
}
```

Et `node_modules/vite-react-ssg/dist/client/single-page.mjs` contient :
```js
import 'react-helmet-async';
```

**`vite-react-ssg` dépend de `react-helmet-async` en interne** : le composant `<Head>` qu'on importe depuis `vite-react-ssg` est un wrapper autour de `react-helmet-async`.

Or, dans le tour précédent, on a désinstallé `react-helmet-async` de `package.json` en pensant qu'il n'était plus utilisé. Résultat :
- Le dossier `node_modules/react-helmet-async` n'existe plus.
- `<Head>` échoue silencieusement à extraire les balises au build SSG.
- Tous les `<title>`, `<meta>`, `<link rel="canonical">` disparaissent du HTML statique.
- Google voit toutes les pages avec le titre générique de `index.html` → Soft 404 partout.

C'est une **régression introduite lors du nettoyage des dépendances**.

## Plan de correction

**Réinstaller `react-helmet-async` comme dépendance directe.**

C'est une dépendance peer requise par `vite-react-ssg` même si on ne l'importe pas directement dans le code applicatif. La règle est : les dépendances transitives utilisées par le pipeline de build doivent être déclarées explicitement dans `package.json` pour que le résolveur de modules les trouve.

### Étapes

1. **Réinstaller le paquet** : `npm install react-helmet-async@^1.3.0` (version compatible avec `vite-react-ssg@0.9.1-beta.1`).

2. **Ne PAS réintroduire `<HelmetProvider>` dans `App.tsx`**. Le wiring actuel (sans provider explicite) est correct : `vite-react-ssg` gère son propre provider en interne au build SSG. L'erreur précédente était d'avoir un `<HelmetProvider>` au niveau de `App.tsx` qui rentrait en conflit. La correction d'aujourd'hui est uniquement de remettre le paquet présent en `node_modules`.

3. **Aucun changement de code applicatif requis.** `SEOHead.tsx` utilise déjà `<Head>` de `vite-react-ssg` correctement. La page `/implantologie` est correctement câblée (route SSG, hook Sanity avec fallback, `SEOHead` avec `seoTitle`/`seoDesc`/`canonical`).

### Vérification post-build

Après redéploiement, re-tester via curl sur les 3 URLs :

```bash
curl -sL https://www.dr-meriot-chirurgien-dentiste.fr/implantologie | grep -E '<title>|<meta name="description"|canonical'
```

Résultat attendu pour `/implantologie` :
- `<title>Implants Dentaires Marseille | Dr Stéphanie Meriot - Implantologie</title>`
- `<meta name="description" content="Pose d'implants dentaires à Marseille 4ème...">`
- `<link rel="canonical" href="https://www.dr-meriot-chirurgien-dentiste.fr/implantologie">`

Une fois confirmé, demander la réindexation dans Search Console pour `/implantologie`, `/parodontie`, `/gingivite-marseille`, `/dechaussement-dentaire-marseille`, `/gencives-qui-saignent`, `/esthetique`, `/a-propos`, `/tarifs`, `/contact`, `/services`, `/blog`.

## Fichier modifié

- `package.json` : ajouter `"react-helmet-async": "^1.3.0"` dans `dependencies`.

## Note sur le périmètre

Ce fix répare le SEO de **toutes les pages du site**, pas seulement `/implantologie`. C'est un seul bug racine qui se manifestait sur l'ensemble du site. Le problème de Soft 404 que Search Console remontait pour `/gingivite-marseille` quelques messages plus tôt n'avait jamais été réellement corrigé : la suppression de `<HelmetProvider>` était la moitié du fix, mais la désinstallation accidentelle de `react-helmet-async` qui a suivi a annulé tout le bénéfice.

