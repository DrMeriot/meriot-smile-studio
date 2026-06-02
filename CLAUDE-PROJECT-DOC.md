# CLAUDE-PROJECT-DOC — Meriot Smile Studio

> Document de référence pour toute session Claude Code sur ce projet.
> Dernière mise à jour : 2026-06-03 (Sanity golden source + refonte contenu cluster paro, section 12 quater).

---

## 1. Vue d'ensemble

Site web du cabinet dentaire **Dr Stéphanie Meriot**, chirurgien-dentiste
spécialisée en parodontie et implantologie, Marseille 4ème.

| Info | Valeur |
|---|---|
| Site prod | https://www.dr-meriot-chirurgien-dentiste.fr |
| Studio Sanity (actif) | https://meriot-dentiste.sanity.studio |
| Studio Sanity (ancien, Lovable) | https://olfeypln9f2lk1f7o6i7j3z8.sanity.studio — à archiver |
| Repo GitHub | https://github.com/DrMeriot/meriot-smile-studio |
| Hébergement | Vercel (projet `drmeriots-projects/meriot-smile-studio`) |
| Sanity project ID | `6a2np8jy` |
| Sanity dataset | `production` |
| Doctolib | https://www.doctolib.fr/dentiste/marseille/stephanie-meriot |

---

## 2. Architecture technique

### Stack principale

| Couche | Technologie | Version |
|---|---|---|
| Framework UI | React | 18.3.x |
| Bundler / SSG | Vite + `vite-react-ssg` | 5.4.x / 0.9.1-beta |
| Language | TypeScript | 5.8.x |
| CSS | Tailwind CSS + shadcn/ui (Radix) | 3.4.x |
| Router | React Router v6 | 6.30.x |
| Data fetching | TanStack Query v5 | 5.83.x |
| CMS | Sanity v3 | 3.88.x |
| CMS client | `@sanity/client` | 7.20.x |
| Rich text | `@portabletext/react` | 6.0.x |
| Formulaires | React Hook Form + Zod | 7.x / 3.x |
| Tests | Vitest + Testing Library | 3.x |

### Flux de données

```
Sanity Studio (meriot-dentiste.sanity.studio)
        ↓ mutation API
Sanity dataset production (project 6a2np8jy)
        ↓ GROQ query via @sanity/client (useCdn: true, timeout: 3s)
src/lib/sanity.ts  →  sanityClient.fetch()  (hardened wrapper, retourne null si erreur)
        ↓
src/hooks/useSanityContent.ts  →  useSanityQuery() via TanStack Query (stale: 5min)
        ↓
Composants React  →  page?.field ?? defaultValue  (fallback JSX hardcodé)
        ↓
vite-react-ssg  →  build statique HTML par route
        ↓
Vercel CDN
```

**Principe clé :** chaque champ de chaque page a une valeur de fallback JSX
hardcodée. Si Sanity est vide ou indisponible, le site affiche quand même
le contenu par défaut. Zéro page blanche.

> ⚠️ **MAJ juin 2026 (voir § 12 quater) :** par défaut, les pages singleton ne
> fetchaient PAS Sanity au build (`enabled: isBrowser` dans `useSanityContent.ts`)
> → le HTML SSG indexé servait **toujours le fallback JSX** (Sanity invisible SEO).
> Désormais **/parodontie + spokes (gencives, gingivite, déchaussement) + `global`**
> fetchent Sanity **au build** via un **`loader`** (+ helper `useSeedSanity`) → Sanity
> est la **source indexée**. Les autres singletons restent fallback-only au build
> (pattern à étendre si besoin). Site statique ⇒ une édition Studio n'apparaît
> qu'au prochain build (webhook Sanity→Vercel à brancher).

---

## 3. Structure du repo

```
meriot-smile-studio/
├── src/
│   ├── pages/              # Une page par route (Index.tsx, Parodontie.tsx, etc.)
│   ├── components/         # Composants partagés (Header, Footer, QuickLinks, etc.)
│   │   └── ui/             # 3 composants shadcn utilisés : accordion, button, card
│   ├── lib/
│   │   ├── sanity.ts       # Client Sanity hardenisé + getSanityStaticPaths (SSG)
│   │   ├── sanityQueries.ts # Toutes les requêtes GROQ
│   │   ├── sanityImage.ts  # Helper @sanity/image-url
│   │   ├── portableTextComponents.tsx  # Renderers PortableText custom
│   │   └── utils.ts        # Utilitaires (cn, etc.)
│   └── hooks/
│       └── useSanityContent.ts  # Hook central — tous les useSanityPage()
├── studio/                 # Sanity Studio v3 (sous-projet autonome)
│   ├── schemaTypes/        # Source de vérité des schemas Sanity (16 fichiers)
│   │   ├── index.ts        # Export centralisé des 15 types
│   │   ├── global.ts
│   │   ├── accueil.ts
│   │   ├── parodontie.ts
│   │   ├── implantologie.ts
│   │   ├── gingivite_marseille.ts
│   │   ├── dechaussement_dentaire.ts
│   │   ├── gencives_qui_saignent.ts
│   │   ├── services_page.ts
│   │   ├── tarifs.ts
│   │   ├── about.ts
│   │   ├── contact.ts
│   │   ├── legal.ts
│   │   ├── confidentialite.ts
│   │   ├── blog_post.ts
│   │   └── landing_page.ts
│   ├── sanity.config.ts    # Config Studio (desk structure, plugins)
│   ├── sanity.cli.ts       # Config CLI (projectId, studioHost)
│   ├── package.json        # Dépendances Studio (sanity, react, styled-components)
│   └── tsconfig.json       # ⚠️ include ./schemaTypes/**/*.ts (post-migration)
├── scripts/
│   ├── seed-sanity.mjs         # Seed initial du dataset (global, accueil, pages SEO)
│   └── patch-blog-categories.mjs  # Patch normalisation casse category blog_post
├── public/                 # Assets statiques
├── .env                    # VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET (commité)
├── .env.local              # SANITY_TOKEN (Editor, NON commité — gitignored)
├── vercel.json             # Redirects (dont /esthetique → /services)
├── vite.config.ts
└── CLAUDE-PROJECT-DOC.md   # Ce fichier
```

---

## 4. Pages et routes

| Route | Composant | Type Sanity | Singleton ID |
|---|---|---|---|
| `/` | `Index.tsx` | `accueil` | `singleton-accueil` |
| `/parodontie` | `Parodontie.tsx` | `parodontie` | auto |
| `/implantologie` | `Implantologie.tsx` | `implantologie` | auto |
| `/gingivite-marseille` | `GingiviteMarseille.tsx` | `gingivite_marseille` | `singleton-gingivite-marseille` |
| `/dechaussement-dentaire` | `DechaussementDentaire.tsx` | `dechaussement_dentaire` | `singleton-dechaussement-dentaire` |
| `/gencives-qui-saignent` | `GencivesQuiSaignent.tsx` | `gencives_qui_saignent` | `singleton-gencives-qui-saignent` |
| `/services` | `Services.tsx` | `services_page` | auto |
| `/tarifs` | `Tarifs.tsx` | `tarifs` | auto |
| `/a-propos` | `About.tsx` | `about` | auto |
| `/contact` | `ContactPage.tsx` | `contact` | auto |
| `/mentions-legales` | `MentionsLegales.tsx` | `legal` | auto |
| `/confidentialite` | `Confidentialite.tsx` | `confidentialite` | auto |
| `/blog` | `Blog.tsx` | `blog_post[]` | — |
| `/blog/:slug` | `BlogPost.tsx` | `blog_post` | par slug |
| `/:slug` | landing page SEO | `landing_page` | par slug |
| `/esthetique` | — | SUPPRIMÉ | 301 → `/services` |

---

## 5. Sanity — Schemas (source de vérité : `studio/schemaTypes/`)

### Types singleton (un seul document par type)

Les types singleton sont déclarés dans `singletonTypes` dans `studio/sanity.config.ts`.
Ils n'ont pas de bouton "Créer un nouveau document" dans le Studio.

| Type | Rôle |
|---|---|
| `global` | Paramètres globaux : nom praticien, téléphone, adresse, lien Doctolib |
| `accueil` | Page d'accueil complète (hero, praticienne, philosophie, témoignages, FAQ) |
| `parodontie` | Page Parodontie |
| `implantologie` | Page Implantologie |
| `gingivite_marseille` | Page SEO locale Gingivite Marseille |
| `dechaussement_dentaire` | Page SEO locale Déchaussement dentaire |
| `gencives_qui_saignent` | Page SEO locale Gencives qui saignent |
| `services_page` | Page Services |
| `tarifs` | Page Tarifs |
| `about` | Page À propos |
| `contact` | Page Contact |
| `legal` | Mentions légales |
| `confidentialite` | Politique de confidentialité |

### Types avec plusieurs documents

| Type | Rôle | Clés notables |
|---|---|---|
| `blog_post` | Articles de blog | `title`* `slug`* `publishedAt` `excerpt` `mainImage{alt}` `category`(enum 5 valeurs) `keywords` `body`(PortableText+image+caption) `seoTitle` `seoDescription` |
| `landing_page` | Pages locales SEO dynamiques | `slug`* `body`(PortableText riche H2/H3/link) `seoTitle` `seoDescription` |

*champs avec `validation: r.required()`

### Enum `blog_post.category` — 5 valeurs

| Libellé Studio | Valeur JSON |
|---|---|
| Parodontie | `parodontie` |
| Implantologie | `implantologie` |
| Hygiène bucco-dentaire | `hygiene` |
| Actualités du cabinet | `actualites` |
| Conseils patients | `conseils` |

> `'esthetique'` définitivement exclu — Dr Meriot ne pratique pas la
> dentisterie esthétique. Ne pas le rajouter.

### Champs spéciaux `accueil` — section Praticienne (ajoutés migration)

`praticienNom`, `praticienPhoto` (image + alt requis), `praticienDescription`,
`praticienParcours`, `praticienCitation`, `philosophieTitle`,
`philosophieDescription`, `philosophieCitation`,
`philosophieValeurs` (array : `{titre, description}[]`)

---

## 6. Variables d'environnement

### `.env` (commité, valeurs publiques)

```
VITE_SANITY_PROJECT_ID=6a2np8jy
VITE_SANITY_DATASET=production
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

### `.env.local` (NON commité — à créer manuellement après clone)

```
SANITY_TOKEN=skYeXdK3...   # Token Editor — requis pour seed et patch scripts
```

Le client Sanity front (`src/lib/sanity.ts`) utilise `useCdn: true` et ne
nécessite pas de token (lecture publique du dataset).

### Vercel — variables de production

Ajoutées via `npx vercel env add` :
- `VITE_SANITY_PROJECT_ID` (production)
- `VITE_SANITY_DATASET` (production)

---

## 7. Commandes utiles

### Site web

```bash
# Dev local
npm run dev

# Build statique (SSG)
npm run build

# Preview du build
npm run preview

# Tests
npm run test
```

### Sanity Studio

```bash
cd studio

# Dev local (Studio à http://localhost:3333)
npx sanity dev

# Deploy Studio sur meriot-dentiste.sanity.studio
npx sanity deploy
# → studioHost configuré dans sanity.cli.ts : 'meriot-dentiste'
```

### Scripts utilitaires

```bash
# Seed initial du dataset (à lancer une seule fois sur dataset vide)
node scripts/seed-sanity.mjs

# Normaliser la casse des catégories blog (déjà exécuté — conservé en archive)
node scripts/patch-blog-categories.mjs
```

### Vercel

```bash
# Lister les déploiements
npx vercel ls --scope drmeriots-projects

# Ajouter une variable d'environnement
npx vercel env add VARIABLE_NAME production --scope drmeriots-projects
```

---

## 8. Patterns de code importants

### Pattern `useSanityPage(type)`

Chaque page utilise un hook qui requête Sanity et expose le document :

```tsx
// Dans useSanityContent.ts
export function useSanityAccueil() {
  return useSanityQuery(accueilQuery)
}

// Dans Index.tsx
const { data: page } = useSanityAccueil()
const title = page?.heroTitle ?? "Votre sourire entre de bonnes mains"
```

**Règle :** toujours `page?.field ?? defaultValue`. Ne jamais supposer que
`page` est non-null — Sanity peut être indisponible ou le document vide.

### Pattern `sanityClient.fetch()` hardenisé

Le client dans `src/lib/sanity.ts` swallow toutes les erreurs et retourne
`null`. Ne jamais utiliser `baseClient` directement — toujours `sanityClient`.

### Pattern singleton dans le Studio

Les singletons sont configurés dans `studio/sanity.config.ts` :
- Listés dans `singletonTypes` (Set) → exclus du menu "Nouveau document"
- Chaque singleton a son propre item dans la desk structure avec `documentId`
  hardcodé pour `global` et `accueil`, auto pour les autres

### PortableText

Les pages qui ont un champ `body` (PortableText) utilisent :
```tsx
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/lib/portableTextComponents'

<PortableText value={page.body} components={portableTextComponents} />
```

---

## 9. État du dataset Sanity (2026-05-11)

| Type | Documents | Notes |
|---|---|---|
| `global` | 1 publié | Paramètres cabinet |
| `accueil` | 1 publié | Contenu complet seedé |
| `gingivite_marseille` | 1 publié | Seedé |
| `dechaussement_dentaire` | 1 publié | Seedé |
| `gencives_qui_saignent` | 1 publié | Seedé |
| `blog_post` | 3 publiés + 5 drafts | 9 docs API (8 affichés Studio — 1 fork) |
| `parodontie` à `confidentialite` | 0 ou vides | À remplir dans le Studio |
| `landing_page` | 0 | À créer selon besoins SEO |

**Backup disponible :** `meriot-backup-2026-05-11.tar.gz` (OneDrive Desktop)

---

## 10. Décisions architecturales clés

| Décision | Choix | Raison |
|---|---|---|
| Type `esthetique` | Supprimé définitivement | Dr Meriot ne pratique pas la dentisterie esthétique. Redirect 301 `/esthetique → /services` conservé dans `vercel.json`. |
| Schémas collocalisés | `studio/schemaTypes/` (pas `sanity/schemas/`) | Convention Sanity v3 : schema colocalisé avec le Studio |
| Source de vérité | `studio/schemaTypes/` = seul endroit | Les schémas du Studio Lovable (`Site Steph/schemaTypes/`) ne sont pas maintenus |
| `about.heroSubtitle` + `formationsList[].desc` | `type: 'text'` (multiline) | Plus flexible pour des descriptions longues (décision Dr Meriot) |
| `blog_post.category` | Enum dropdown 5 valeurs | Évite les typos, UX Studio nettement meilleure |
| `blog_post.keywords` | Conservé (extra-repo vs Site Steph) | Utile pour SEO, aucune donnée en base |
| `contact/legal/confidentialite` | 3 fichiers séparés | Plus lisible que `misc.ts` groupé (Lovable) |
| Fallback contenu | JSX hardcodé `?? defaultValue` | Zéro page blanche si Sanity indisponible |
| `useCdn: true` + `timeout: 3s` | Activé en prod | Performance CDN, timeout court pour ne pas bloquer le SSG |
| Stack admin Supabase | **Supprimée** | Remplacée 100% par Sanity Studio. ~5 700 lignes retirées (admin/, AuthContext, supabase, blogData.ts, 46 composants UI inutilisés, double système de toast). |
| Édition de contenu | Sanity Studio **uniquement** | Plus d'admin custom dans le repo. Tout passe par `meriot-dentiste.sanity.studio`. |
| `getSanityStaticPaths()` | Helper partagé dans `sanity.ts` | Mutualise l'énumération de slugs pour les `getStaticPaths` SSG (avant : `fetch` dupliqué dans App.tsx). |

---

## 11. Décisions à NE PAS annuler

- **Ne jamais recréer le type `esthetique`** dans les schemas.
- **Ne jamais ajouter `'esthetique'` à l'enum `blog_post.category`.**
- **Ne pas supprimer le redirect `vercel.json`** `/esthetique → /services`.
- **Ne pas utiliser `baseClient` directement** — toujours `sanityClient.fetch()`.
- **Ne pas ajouter de token dans `.env`** (commité) — seulement dans `.env.local`.
- **Ne pas réintroduire Supabase ni d'admin custom** — l'édition passe exclusivement par Sanity Studio.
- **Ne pas réintroduire `blogData.ts`** — les articles viennent uniquement de Sanity (`blog_post`).

---

## 12. Tâches en suspens

| Priorité | Tâche | Notes |
|---|---|---|
| Haute | Remplir les champs praticien/philosophie dans l'Accueil | Studio → Accueil |
| Haute | Remplir `parodontie.traitementsList[].step` | Champ ajouté en migration, vide en base |
| Moyenne | Remplir les autres singletons vides | Services, Tarifs, À propos, Contact, etc. |
| Basse | Archiver `Site Steph/meriot-smile-studio-main/` | Session séparée, 24h après validation prod |
| Basse | Désactiver l'ancien Studio Lovable | Sanity dashboard → `olfeypln9f2lk1f7o6i7j3z8.sanity.studio` |
| Basse | Créer des `landing_page` pour nouvelles pages SEO | Slug-based, body PortableText |

---

## 12 bis. 🔖 REPRISE — Audit technique SEO (en cours, 28 mai 2026)

> Audit demandé : balises meta manquantes/dupliquées, liens internes 404,
> hiérarchie Hn, images sans `alt`, pages lentes, puis test responsive
> laptop / mobile / tablette. **Interrompu après l'étape 1 (meta).**

### Méthode
- L'audit se fait sur le **HTML généré** (`dist/`) = surface SEO réelle (les
  balises sont injectées par react-helmet via `<Head>` de vite-react-ssg,
  attribut `data-rh="true"`).
- Avant de relancer : `npm run build` pour régénérer `dist/`.
- Script réutilisable : **`scripts/seo-audit.mjs`** (titres/desc/canonical/H1/OG
  + détection doublons). ⚠️ Non commité. `scripts/seo-values.mjs` = jetable.
- Piège regex : matcher le **même** guillemet ouvrant pour `content="…"`, sinon
  une apostrophe dans le texte (`Pose d'implants`) tronque la valeur → faux
  `DESC-LEN` courts. Déjà corrigé dans `seo-audit.mjs`.

### ✅ Étape 1 — Balises meta (FAIT)
- **Aucun titre manquant, aucun doublon** de title ni de description. ✓
- **Title trop longs (>65 car.)** à raccourcir : `blog` (77), `blog/dent-qui-bouge`
  (74), `dechaussement-dentaire-marseille` (77), `tarifs` (73), `gencives-qui-saignent`
  (66), `implantologie` (66). *(Le `&amp;` dans blog/tarifs = encodage correct, OK.)*
- **Description `index` trop longue** : 191 car. (cible ≤ 160) → à resserrer.
- **Description `blog/implants-idees-recues`** : 50 car. (courte, vient de l'`excerpt`
  Sanity — corriger côté contenu, pas code).
- Les title/desc viennent de `<SEOHead>` (props par page) sauf blog (excerpt Sanity).

### ⏳ Étapes restantes (À FAIRE demain)
1. **Liens internes 404** — extraire tous les `to=`/`href=` internes et croiser
   avec les routes de `src/App.tsx`. Routes valides actuelles : `/`, `/services`,
   `/a-propos`, `/tarifs`, `/contact`, `/parodontie`, `/implantologie`, `/blog`,
   `/blog/:slug`, `/gingivite-marseille`, `/dechaussement-dentaire-marseille`,
   `/gencives-qui-saignent`, `/mentions-legales`, `/confidentialite`.
   ⚠️ Point de vigilance déjà repéré : la route est `dechaussement-dentaire-marseille`
   (avec `-marseille`) — vérifier que tous les liens internes pointent bien dessus.
2. **Hiérarchie Hn** — H1 OK (exactement 1 par page, déjà vérifié). Reste à
   contrôler l'enchaînement H2→H3 (pas de saut H2→H4) page par page.
3. **Images sans `alt`** — grep `<img` dans `src/` + vérifier le rendu `dist/`.
   Penser aux images Sanity (`mainImage.alt`, `praticienPhoto.alt`).
4. **Pages lentes / poids** — le build liste le poids HTML par page (les plus
   lourdes : `index` 71 KiB, `parodontie` 67 KiB, `blog/dent-qui-bouge` 71 KiB).
   Analyser le bundle JS (`dist/assets/`) + images non optimisées.
5. **Responsive laptop / mobile / tablette** — nécessite le site lancé
   (`npm run preview`) + navigateur. ⚠️ L'extension **Claude in Chrome n'était pas
   connectée** lors de la dernière tentative — à reconnecter avant ce test, ou
   utiliser le MCP Preview. Breakpoints Tailwind : `sm` 640, `md` 768, `lg` 1024.

### Données SEO externes disponibles (déposées par l'utilisateur, non commitées)
- `GSC CSV/` + exports `.zip` Google Search Console (Performance + Coverage).
  ⚠️ Ne pas commiter (données analytics). `.gitignore` couvre `GSC CSV/`,
  `dr-meriot-chirurgien-dentiste.fr-*.zip`, `*-Performance-on-Search-*.zip`,
  `*-Coverage-*.zip`.
- **Analyse exploitée le 29 mai 2026 → voir section 12 ter.**

### État working tree à la reprise
- Dernier commit poussé : `560b16b` (refactor cleanup Lovable/Supabase).
- Non commité : `scripts/seo-audit.mjs` (à garder), `scripts/seo-values.mjs`
  (jetable), `GSC CSV/`, le `.zip` GSC (à gitignore).

---

## 12 ter. 📊 Analyse Google Search Console + priorisation SEO (29 mai 2026)

> Exploitation des exports GSC **Performance (3 mois : 5 avr → 27 mai)** et
> **Coverage/Indexation**. Remplace l'analyse 7 jours initiale. Données dans
> `GSC CSV/29 mai (3 mois)/` et `GSC CSV/29 mai (indexation)/` (non commitées).

### Chiffres clés (3 mois)
- ~**417 impressions, 10 clics**, position moyenne ~23. France = 317 imp / 10 clics.
- **Tous les clics viennent de la marque** ("stephanie meriot" pos 3,8 ; "dr meriot"
  pos 4) + accueil/tarifs. **Zéro clic sur une requête informationnelle ou commerciale.**

### Constats majeurs
1. **Demande n°1 non captée — cluster « saignement de gencives »** : ~35 % de toutes
   les impressions (≈140 réparties sur 30+ requêtes). La page `/gencives-qui-saignent`
   est la **page la plus vue (162 imp)** mais en **position 50,8 (page 5), 0 clic.**
   → Plus gros levier du site.
2. **`/a-propos`** : 105 imp, **pos 7,9, 0 clic en 3 mois** → pur problème de CTR (title/meta).
3. **Clusters secondaires mal classés** : « dent qui bouge / dents qui bougent »
   (→ `/dechaussement-dentaire-marseille` + blog `dent-qui-bouge`), local commercial
   « parodontologue/parodontiste marseille » (→ `/parodontie`, pos 11-37),
   « prix implant marseille » (→ `/implantologie`, pos 12,6).

### Indexation (Coverage) — saine
- **12 pages indexées, 6 non indexées** (au 25 mai). Maturation normale (15 → 6 depuis avril).
- 6 non-indexées = **5 « Page avec redirection »** (attendu : `/esthetique`,
  `/acces-cabinet`, non-www) **+ 1 « Explorée, actuellement non indexée »** (page jugée
  trop maigre par Google — **à identifier dans GSC → Indexation → Pages**).
- Sitemap OK, **zéro erreur d'exploration, aucun blocage critique**.

### Points techniques tranchés
- **www / non-www : NON critique.** La balise `canonical` pointe correctement vers
  **www** sur toutes les pages (injectée par `SEOHead`) → Google consolide de lui-même.
  Reste optionnel : confirmer dans *Vercel → Domains* que non-www fait un 308 → www.
- **`/parodontie/temoignages` = 404 live confirmé** mais ranke **pos 10** (10 imp).
  URL fantôme (l'ancre `#temoignages` de l'accueil mal interprétée). → 301 à ajouter.
- ⚠️ **La route `/:slug` (landing_page) listée en section 4 n'existe PAS dans
  `src/App.tsx`** (seul `*` → NotFound). Type Sanity non câblé au routing (0 doc, sans
  impact immédiat, mais à savoir avant de créer des `landing_page`).

### Plan SEO priorisé (piloté par les données)
| Prio | Action | Justification GSC |
|---|---|---|
| 🔴 P1 | Refonte on-page `/gencives-qui-saignent` (contenu, Hn, intentions pourquoi/comment/la nuit, maillage) | page n°1 en imp (162), pos 51, 0 clic |
| 🟠 P2 | Réécrire title + meta `/a-propos` | 105 imp, pos 8, 0 clic |
| 🟠 P3 | 301 `/parodontie/temoignages` → `/parodontie` (`vercel.json`) | 404 qui ranke pos 10 |
| 🟠 P4 | Identifier + étoffer la page « explorée, non indexée » | 1 page trop maigre |
| 🟡 P5 | Optimiser `/parodontie` pour « parodontologue marseille » (pos 11) | intention commerciale locale |
| 🟡 P6 | Renforcer cluster « dent qui bouge » (dechaussement + blog) | demande émergente |
| ⚪ P7 | Confirmer 308 non-www → www (Vercel) | hygiène, non urgent |

### Analytics — état & manque
- **Aucun Google Analytics installé** (vérifié 29 mai : pas de snippet dans
  `index.html`, pas de `gtag`/GTM dans le HTML livré, aucune dépendance analytics).
- GSC dit « qui arrive depuis Google » ; **il manque la mesure du comportement
  on-site et des conversions** (clics Doctolib/téléphone). → Installer **GA4**
  (voir procédure transmise en session, ou un équivalent privacy-friendly type Plausible).

---

## 12 quater. 🚀 Session juin 2026 — Sanity golden source + refonte contenu (cluster paro)

> Exécution du plan SEO (§ 12 ter) sous un angle **conversion-first / local**
> (mémoire `seo-goal-local-parodontie`). Surtout : correction d'un défaut
> d'architecture qui rendait Sanity invisible au SEO, puis refonte de contenu.

### 🔑 Découverte d'architecture
Les pages **singleton** utilisaient `enabled: isBrowser` (`useSanityContent.ts`) → la
requête Sanity **ne tournait pas au build** → le HTML SSG servait **toujours le fallback
JSX**, et **Sanity était invisible pour Google** (seul le blog faisait un prefetch correct).

### ✅ Fix livré — « Sanity golden » (pattern loader)
Généralisation du pattern blog : **`loader` au build** (fetch Sanity) + **`useSeedSanity`**
(seed React Query avant les hooks) → le HTML SSG porte le contenu **Sanity**, indexable ;
le fallback JSX redevient un simple filet.
- Appliqué à : **/parodontie + spokes (gencives, gingivite, déchaussement) + `global`**.
- Helper : `src/hooks/useSeedSanity.ts` · loaders dans `src/App.tsx` (loader racine pour `global`, seedé dans `Layout`).
- Singletons restants (accueil, services, tarifs, about, contact, implantologie, mentions,
  confidentialité) = **fallback-only au build** (pattern à étendre si besoin).

### ✅ Réconciliation contenu Sanity (anti-régression)
- **parodontie** : doc Sanity = brouillon V0 (fautes, 3 FAQ) → réécrit (contenu poli + deltas
  SEO : title/H1 « Parodontologue à Marseille », 8 FAQ, 5 symptômes, 5 étapes) via
  `scripts/patch-parodontie.mjs`.
- **spokes** : docs == fallback (jamais édités depuis le seed) → aucune réconciliation.

### ✅ Refonte /gencives-qui-saignent (P1, conversion-first/local)
- 🆕 Bloc **auto-diagnostic** (« faut-il consulter ? ») = entonnoir signe → maladie
  parodontale → parodontologue Marseille → RDV. Champs Sanity **éditables** : `diagnosticTitre`,
  `diagnosticIntro`, `diagnosticSignes`, `diagnosticConclusion` (schéma déployé via `sanity deploy`).
- FAQ **5 → 8** (spécialiste à Marseille, saignements la nuit, grossesse) · cause **Stress**.
- Maillage hub-and-spoke : ancre /parodontie → « Parodontologue à Marseille » + lien /dechaussement.
- Contenu via `scripts/patch-gencives.mjs`.

### ✅ Voix éditoriale (décidée)
Site à la **1ère personne « je »**, ton **doux**, philosophie **« dentisterie à minima » /
conservation des dents** (thèse de Dr Meriot). Faits médicaux laissés neutres ; meta/title/schema
en 3e pers. nommée (entité/AEO). /gencives déjà refait ainsi.
⚠️ **À harmoniser** : /parodontie (hardcodé) encore en « nous », + accueil/about.

### Correctifs
- **« Assurance Maladie »** : retiré l'affirmation erronée « Une partie des soins est prise en
  charge… » (la paro n'est PAS remboursée) des FAQ coût parodontie + déchaussement (Sanity + JSX + scripts).
- **`studio` : ajout de `react-is`** (peer-dep manquante de `@sanity/ui`) qui bloquait `sanity deploy`.

### Analytics — état réel (corrige § 12 ter)
- **Vercel Web Analytics** installé (commit `0ed1ac4`) + code conversions (`doctolib_click`,
  `phone_click` dans `App.tsx`).
- ⚠️ **Custom events = plan Vercel Pro requis** → en Hobby, **no-op silencieux** : les clics ne
  sont PAS mesurés.
- **Décision : pas de GA4** (bannière RGPD, trafic trop faible). La **vraie conversion (RDV) se lit
  dans Doctolib** (gratuit). À rouvrir si le trafic grossit (Vercel Pro / Plausible cookieless / GA4+bannière).

### Notes techniques
- **IDs Sanity non standardisés** : `parodontie` a `_id="parodontie"`, mais les autres singletons
  ont un **_id auto-généré** → dans les scripts de patch, cibler **par type**, pas par _id deviné.
- **`gh` CLI** installé + authentifié (compte **DrMeriot**) → PR/merge en autonomie.
- Pas de `npm test` (Vitest retiré) ; vérifs = `npm run build` + `npx tsc --noEmit` + `npx eslint`.

### 🎯 Next steps (priorisés — conversion-first / local)
| Prio | Action | Nature |
|---|---|---|
| 🔴 1 | **GBP : reprise de la fiche** + lancer la **collecte d'avis** | hors-code (action Dr Meriot ; process outillable) |
| 🟠 2 | **Webhook Sanity → Vercel Deploy Hook** (édition Studio → rebuild auto) | infra (conf préparable + activation dashboard) |
| 🟠 3 | **Harmoniser la voix « je »** (/parodontie, accueil, about…) | contenu/code |
| 🟠 4 | **Fix NAP** : adresse incohérente (« 23 Bd de la Fédération » page vs « 31 Rue des Chartreux » dans `global` Sanity) — confirmer la bonne | hygiène SEO local |
| 🟡 5 | **Spokes restants en conversion-first** : refondre gingivite + déchaussement comme /gencives | contenu |
| 🟡 6 | P2 : réécrire title+meta **/a-propos** (105 imp, pos 8, 0 clic) | rapide |
| 🟡 7 | P3 : **301 /parodontie/temoignages → /parodontie** (`vercel.json`) | rapide |
| 🟡 8 | Étendre le **pattern loader** aux singletons restants (Sanity golden partout) | code |
| ⚪ 9 | P4 page « explorée non indexée » · P7 confirmer 308 non-www→www | divers |

---

## 13. Historique migration (sessions Claude Code)

### Session précédente (mai 2026) — `1c692d3`

- Connexion Sanity + `.env` configuré
- Token Editor `SANITY_TOKEN` créé et ajouté à `.env.local`
- `src/lib/sanity.ts` hardenisé (wrapper try/catch)
- Schemas gingivite / dechaussement / gencives ajoutés au repo
- Studio `meriot-dentiste.sanity.studio` déployé
- Script `seed-sanity.mjs` créé et exécuté (global, accueil, 3 pages locales)
- `studio/sanity.cli.ts` créé avec `studioHost: 'meriot-dentiste'`

### Session migration Option B (11 mai 2026)

**Phase 1 — Audit (lecture seule)**
- Comparaison exhaustive `Site Steph/schemaTypes/` vs `repo/sanity/schemas/`
- Audit complet des références `esthetique`
- Livrable Phase 1 : tableau de toutes les divergences + décisions

**Phase 2 — Alignement schemas** — commit `7859094`
- 10 fichiers schemas alignés sur la source de vérité
- Ajout `step` dans `parodontie.traitementsList[]`
- Enum `blog_post.category` (5 valeurs, sans esthetique)
- Previews arrays, rows, validations, orderings, initialValue

**Patch catégories blog** — commit `4a00c7e`
- Script `patch-blog-categories.mjs` créé et exécuté
- 5 drafts normalisés (`"Parodontie"` → `"parodontie"`, etc.)

**Phase 3 — Réorganisation monorepo** — commit `e519e04`
- `sanity/schemas/` → `studio/schemaTypes/` (16 fichiers)
- `studio/sanity.config.ts` import mis à jour
- `sanity/` supprimé
- CP2 local validé (`npx sanity dev` → http://localhost:3333)

**Phase 4 — Deploy Studio** — aucun commit
- `npx sanity deploy` → `https://meriot-dentiste.sanity.studio`
- CP3 visuel validé par Dr Meriot

**Phase 5 — Push + vérification**
- `git push origin main`
- Vercel build : `Ready` en 42s, zéro régression
- Site prod `200 OK`, Studio `302 Found` (redirect login attendu)

**Fix post-migration** — commit `915e973`
- `studio/tsconfig.json` : `include` stale `../sanity/schemas/**` → `./schemaTypes/**`

### Session nettoyage code (28 mai 2026)

Suppression de toute l'infrastructure Lovable/Supabase devenue morte après
le passage à Sanity comme source unique de contenu. ~5 700 lignes retirées,
254 packages npm élagués.

- **Stack admin Supabase supprimée** : `src/pages/admin/`, `src/components/admin/`,
  `src/contexts/AuthContext.tsx`, `src/integrations/supabase/`, `src/hooks/usePageContent.ts`,
  `src/lib/sanitize.ts` + routes `/admin/*` retirées de `App.tsx`
- **`src/data/blogData.ts` supprimé** (1 232 lignes) — articles hardcodés en doublon de Sanity.
  `Blog.tsx`/`BlogPost.tsx` simplifiés, `ReactMarkdown` retiré (seul PortableText subsiste)
- **46 composants `src/components/ui/` inutilisés supprimés** (gardés : accordion, button, card)
- **Hooks morts supprimés** : `use-toast.ts`, `use-mobile.tsx`, `useIsClient.ts`
- **Double système de toast retiré** — aucune page publique n'en utilisait
- **`getSanityStaticPaths()`** extrait dans `sanity.ts` (mutualise les `getStaticPaths` SSG)
- **`/acces-cabinet`** → redirect 301 vers `/contact` dans `vercel.json` (était un alias dupliqué)
- **`useSanityContent.ts`** : 5 `eslint-disable any` → 1 type `SanityData` documenté
- **`package.json`** : 40 dépendances retirées (tiptap, supabase, react-hook-form, zod,
  react-markdown, recharts, embla, vaul, cmdk, next-themes, date-fns, react-helmet-async, etc.)
- Vérifs : build SSG 21 pages OK, `tsc --noEmit` exit 0, 46/46 tests OK, lint 0 erreur sur fichiers touchés
