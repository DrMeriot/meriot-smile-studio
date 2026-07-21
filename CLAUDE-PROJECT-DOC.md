# CLAUDE-PROJECT-DOC — Meriot Smile Studio

> Document de référence pour toute session Claude Code sur ce projet.
> Dernière mise à jour : 2026-06-15 (audit 360° + hygiène code + cas fréquents + maillage/netlinking — section 12 septies ; 3 PR ouvertes #10/#11/#12, email validation Dr Meriot, `NETLINKING-KIT.md`).

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
| ✅ 4 | ~~**Fix NAP** : adresse incohérente~~ — **RÉSOLU/périmé** : le doc `global` Sanity contient déjà la bonne rue (« 23 Bd de la Fédération »), pas « 31 Rue des Chartreux ». Adresse + tél confirmés par Dr Meriot le 2026-06-03. Reste juste une normalisation cosmétique (espace avant virgule) → voir § 12 quinquies. | hygiène SEO local |
| ✅ 5 | ~~**Spokes restants en conversion-first** : refondre gingivite + déchaussement comme /gencives~~ — **FAIT 14 juin** | contenu |
| 🟡 6 | P2 : réécrire title+meta **/a-propos** (105 imp, pos 8, 0 clic) | rapide |
| 🟡 7 | P3 : **301 /parodontie/temoignages → /parodontie** (`vercel.json`) | rapide |
| 🟡 8 | Étendre le **pattern loader** aux singletons restants (Sanity golden partout) | code |
| ⚪ 9 | P4 page « explorée non indexée » · P7 confirmer 308 non-www→www | divers |

---

## 12 quinquies. 🛠️ Session 3 juin 2026 — exécution SEO conversion-first (P2/P3, voix « je », NAP)

> Exécution « tout ce qui peut être fait sans Dr Meriot » du plan § 12 quater.
> ⚠️ **Session interrompue avant de lancer les patchs Sanity et avant tout commit.**
> Lire l'état working tree ci-dessous AVANT de reprendre.

### ✅ Fait et vérifié (code, build OK)
- **P3 — 301 `/parodontie/temoignages` → `/parodontie`** ajouté dans `vercel.json`.
- **P2 — title+meta `/a-propos`** : valeurs `default` réécrites dans `About.tsx`
  (c'est le fallback JSX qui est indexé — /a-propos n'est pas en loader). Vérifié sur
  le HTML buildé : title = « Dr Stéphanie Meriot, parodontologue à Marseille 4e » (50 car.),
  desc = 158 car. (cible ≤ 160). ✓
- **Voix « je » sur /parodontie** :
  - Sections **JSX hardcodées** (toujours indexées, PAS de champ Sanity) : « Notre approche »
    → « Mon approche », « Notre zone d'intervention » → « Ma zone… », « Nous accueillons »
    → « J'accueille », etc. (`Parodontie.tsx`). **Adresse laissée intacte.**
  - Valeurs `default` JSX (filet) + **`scripts/patch-parodontie.mjs`** synchronisés :
    traitements « nous réalisons » → « je réalise » (étapes 1 & 3), 3 réponses FAQ qui
    parlaient du « Dr Meriot » à la 3e pers. → « je » (style /gencives), crosslinks
    « nos autres spécialités » → « mes autres spécialités ».
  - ⚠️ Le **hero subtitle** parodontie reste en 3e pers. nommée (intro entité, OK AEO/SEO).
- **NAP — diagnostic corrigé** : le doc `global` Sanity contient **déjà** « 23 Bd de la
  Fédération , 13004 Marseille » (la note § 12 quater #4 « 31 Rue des Chartreux » était
  **périmée/fausse**). Seul défaut réel = **espace parasite avant la virgule** (le Footer
  indexé l'affiche tel quel ; le schéma JSON-LD s'en sort via `.trim()`). Adresse + tél
  (`09 83 43 96 21`) **confirmés par Dr Meriot**. → Script de normalisation créé :
  **`scripts/patch-global-nap.mjs`** (set `adresse`/`phone`/`nom_praticien` propres).

### ✅ FAIT à la reprise (session 14 juin 2026)
1. **2 patchs Sanity lancés** (token `.env.local`) → en réalité **no-ops idempotents** :
   le contenu avait **déjà été appliqué par des sessions antérieures** (vérifié via timestamps
   serveur Sanity, autoritaires) :
   - `parodontie` : `_rev OSMPQ20vSkL3vuu25g8PG4`, `_updatedAt` **3 juin 13:38** (pas aujourd'hui).
   - `global` : `_rev gk7s2QwuRCVFwnmTAy0kVr`, `_updatedAt` **4 juin 12:29** (pas aujourd'hui).
   - ⇒ mes runs ont retourné les revs **déjà en base** → **aucune nouvelle révision, aucun
     nouveau build déclenché**. Les revs ci-dessus sont les bonnes (contenu live correct).
2. **`npm run build`** ✅ (21 pages). Vérifié sur le HTML buildé : `dist/parodontie.html` sert
   la voix « je » (4 occ., 0 « nous » résiduel) ; `dist/index.html` adresse propre (0 espace parasite).
3. **Commit + push + PR #6** (lot P2/P3/voix-je/NAP — code uniquement, séparé du lot gingivite).
   ⚠️ Le merge de #6 = deploy git Vercel → prod récupère les bouts de **code** (301, meta /a-propos,
   sections JSX voix-je). Le **contenu Sanity** est déjà en prod (buildé au webhook du 4 juin).

### 🔌 Webhook Sanity → Vercel — DÉJÀ EN PLACE (découvert 14 juin, créé le 26 avril)
Contrairement à ce que disait la doc, le webhook **existe et fonctionne depuis le 26 avril 2026**.
Vérifié via l'API admin Sanity (`/v2021-10-04/hooks/projects/6a2np8jy`) :
- Nom « Vercel rebuild » · dataset `production` · `POST` vers le Deploy Hook
  `prj_5SyJ3JDctJNDgXCnknPKhyaFJGhV/qRHbpwFUkP` · `isDisabled: false`.
- Triggers `create/update/delete` · **`includeDrafts: false`** (pas de build sur autosave brouillon —
  rend le filtre GROQ anti-drafts inutile) · `filter: null`.
- Livraisons en **status 201** (Vercel accepte) — les changements contenu du 3-4 juin sont déjà buildés.
- ⇒ **Aucune action requise.** Éditer + **publier** un doc loader-câblé (`parodontie`, spokes, `global`)
  rebuild la prod automatiquement. Lire la config : `cd studio && npx sanity hook list`.

### 🌳 État working tree à la reprise (dernier commit : `b8311e1`, merge PR #5 docs)
Modifs **de cette session** : `vercel.json`, `src/pages/About.tsx`, `src/pages/Parodontie.tsx`,
`scripts/patch-parodontie.mjs`, + nouveau `scripts/patch-global-nap.mjs`.

⚠️ **Modifs PRÉ-EXISTANTES non commitées, PAS de cette session** (refonte spoke **gingivite**
commencée par une session antérieure, **incomplète**) :
- `src/pages/GingiviteMarseille.tsx` (modifié), `studio/schemaTypes/gingivite_marseille.ts`
  + `studio/schemaTypes/dechaussement_dentaire.ts` (champs `diagnostic*` ajoutés),
  nouveau `scripts/patch-gingivite.mjs`.
- **Reste à faire pour ce spoke** : `npx sanity deploy` (schéma diagnostic), lancer
  `node scripts/patch-gingivite.mjs`, faire la page **déchaussement** au même modèle,
  vérifier build. → c'est le **step 🟡 5** de § 12 quater, à finir proprement (idéalement
  dans un commit/PR séparé du lot P2/P3/voix-je/NAP).

### 🎯 Next steps mis à jour (priorité conversion-first / local)
| Prio | Action | État |
|---|---|---|
| 🔴 1 | **GBP** : récupérer la fiche + collecte d'avis | hors-code (Dr Meriot) — toujours le + gros levier |
| ✅ 2 | ~~Lancer patchs Sanity (parodontie + global-nap) + build + commit/push~~ | **FAIT (14 juin 2026)** |
| ✅ 3 | ~~Finir refonte spoke **gingivite** + faire **déchaussement**~~ | **FAIT (14 juin)** — voix « je », auto-diagnostic, FAQ spécialiste E-E-A-T, titles raccourcis, patchs Sanity appliqués (gingivite rev `xsSQgeoVafjQU53fmvYI2S`, déchaussement rev `xsSQgeoVafjQU53fmvYIDO`), schéma déployé. PR séparée. |
| ✅ 4 | ~~**Webhook Sanity → Vercel Deploy Hook**~~ | **DÉJÀ EN PLACE depuis le 26 avril** (vérifié 14 juin) |
| ✅ 5 | ~~Harmoniser voix « je » sur **accueil** + **about**~~ | **FAIT (14 juin)** — /a-propos l'était déjà ; accueil : FAQ/Contact/Services/Hero/QuickLinks/Testimonials passés en « je » (JSX = indexé) + doc Sanity `accueil` patché (rev `2wkVDfxQDLSQPJv8P9cTwU`, anti split-brain). Bio praticienne/philosophie déjà en « je ». |
| 🟡 6 | Étendre le **pattern loader** aux singletons restants | code |
| ⚪ 7 | P4 page « explorée non indexée » · P7 confirmer 308 non-www→www | divers |

---

## 12 sexies. ✅ Session 14 juin 2026 — exécution du reliquat conversion-first (P2/P3, NAP, spokes, voix « je »)

> Session de finalisation : tout le plan « conversion-first / local » réalisable sans
> Dr Meriot a été exécuté, vérifié en prod et mergé. 3 PR livrées + 1 PR docs.

### Livré (mergé sur `main`, déployé et vérifié en prod)
- **PR #6** (`aad9f0c`) — lot **P2/P3/voix-je-parodontie/NAP** : 301 `/parodontie/temoignages`
  → `/parodontie` (308 confirmé prod), title+meta `/a-propos` (50 car.), voix « je » JSX
  /parodontie, normalisation NAP. Patchs Sanity parodontie + global étaient des **no-ops**
  (contenu déjà appliqué les 3-4 juin ; revs `OSMPQ20…` / `gk7s2Qw…`).
- **PR #7** (`bbadb37`) — refonte **spokes gingivite + déchaussement** (conversion-first/local) :
  bloc auto-diagnostic (champs `diagnostic*` déployés), voix « je », FAQ spécialiste E-E-A-T,
  coût parodontal honnête, titles 76→62 / 64 car., maillage hub. Patchs Sanity golden :
  gingivite rev `xsSQgeoVafjQU53fmvYI2S`, déchaussement rev `xsSQgeoVafjQU53fmvYIDO`.
- **PR #8** (`f2cea6a`) — voix « je » **accueil** : composants FAQ/Contact/Services/Hero/
  QuickLinks/Testimonials (JSX = indexé) + doc Sanity `accueil` patché anti split-brain
  (rev `2wkVDfxQDLSQPJv8P9cTwU`). `/a-propos` était déjà en « je ».

### Découvertes / corrections de doc
- **Webhook Sanity → Vercel : déjà en place depuis le 26 avril** (la doc le listait à tort comme
  à faire). Hook « Vercel rebuild », triggers create/update/delete, `includeDrafts:false`,
  POST deploy hook `prj_5SyJ3JDctJNDgXCnknPKhyaFJGhV/qRHbpwFUkP`, livraisons 201. Rien à brancher.
- Gestion des hooks via l'API Sanity = token **admin** requis (le token Editor `.env.local` → 401) ;
  la session CLI `sanity` connectée (compte DrMeriot) a les droits. Token CLI : `sanity debug --secrets`.
- Voix « je » : **TERMINÉE** sur tout le parcours (hub + 3 spokes + about + accueil).

### 🎯 Next steps restants (priorité conversion-first / local)
| Prio | Action | Nature |
|---|---|---|
| 🔴 1 | **GBP** : récupérer la fiche (23 Bd de la Fédération) + lancer la **collecte d'avis** | hors-code (Dr Meriot) — **plus gros levier non activé** |
| 🟡 2 | Étendre le **pattern loader** (« Sanity golden ») aux singletons restants (accueil, services, tarifs, about, contact, implantologie, mentions, confidentialité) | code |
| ⚪ 3 | P4 : identifier + étoffer la page « explorée, non indexée » (GSC) | contenu |
| ⚪ 4 | P7 : confirmer le 308 non-www → www (Vercel Domains) | hygiène |
| ⚪ 5 | Mesure conversions (clics Doctolib/tel) si le trafic grossit — Vercel Pro / Plausible / GA4+bannière | analytics |

---

## 12 septies. 🔬 Session 15 juin 2026 — audit 360° + hygiène code + cas fréquents + maillage/netlinking

> Audit 360° multi-agents (read-only, phase 1) puis exécution. **3 PR ouvertes** (non mergées),
> 1 email de validation médicale préparé pour Dr Meriot, 1 kit netlinking.

### 🔎 Audit 360° (diagnostic, read-only)
**📄 Rapport complet durable : `AUDIT-360-2026-06.md`** (racine) — 55 findings calibrés par dimension
(A→L), statut (✅ fait / ⏸️ gated / ⏳ à faire / 🔵 hors-code / ⏭️ écarté), tableau intent→page, matrice
concurrentielle + plan de dépassement, **backlog priorisé**. C'est la référence pour reprendre les chantiers.
8 dimensions (SEO local/technique/AEO, contenu/YMYL, perf/a11y, code/sécu, CRO) + concurrence live,
chaque finding critique/high **vérifié de façon adversariale**. Conclusions clés :
- Site **techniquement sain** (~7,5/10) : meta/Hn/canonical/sitemap OK, 0 lien 404, NAP cohérente.
- **Le frein n°1 est HORS code** : GBP + **avis Google** quasi inexistants (~quelques avis vs 30-142
  chez les concurrents paro). Aucun clic non-marque sur 634 imp / 3 mois.
- **Garde-fou** : `/gencives-qui-saignent` (250 imp, pos 49) **n'est PAS un manque de contenu** (toutes
  les sous-intentions sont couvertes) → ne pas réécrire ; le frein est l'autorité + la cannibalisation.
- Concurrents nommés : Mattout/GEPI (E-E-A-T fort), Dr Audrey Moreau/endo-paro.fr (rival direct, cert
  TLS cassé), Margossian (4,8★ 60+ avis), Tourrolier (généralistes, pages template), CIPE (~59 avis),
  Tholozan (occupe l'angle « douceur »).

### ✅ PR #10 — `chore/code-hygiene` (code only, effet immédiat au merge)
Dead code `landing_page` (CSR-only, 0 doc, jamais SSG) supprimé ; `npm audit fix` (14→2 vulns,
critique react-router-dom corrigée ; reste = esbuild/vite **dev-only**) ; lint 22 erreurs → 0 ;
meta geo alignée sur le schéma (43.3047/5.3964) ; champ `logo` (→ /logo.png **404**) retiré du schéma ;
faux badge « 5/5 étoiles » (Hero) → « DU de Parodontologie » (YMYL/Ordre) ; a11y (bouton menu) ;
classe morte `font-playfair` ; `.gitignore .env*.local` + `.env.local.example` token non-VITE.
⚠️ Schéma Studio `landing_page` **laissé en place** (référencé `sanity.config.ts:84` → retrait =
`sanity deploy`, hors scope no-deploy).

### ✅ PR #11 — `feat/seo-cas-frequents` (contenu, **mise en ligne GATED**)
Intentions « cas fréquents » à forte conversion, en **parité filet JSX + script patch Sanity** :
- `/gencives` : grossesse enrichie (crochet honnête « examen prénatal 100 % dès le 4e mois ») + FAQ fumeur.
- `/dechaussement` : cause hormonale (ménopause) + 4 FAQ (dent qui bouge, repousse post-surfaçage, fumeur, ménopause) + FAQ post-orthodontie.
- `/parodontie` : FAQ diabète + sync de la FAQ « facteurs de risque » (était dans le filet, absente du
  doc Sanity = non indexée) + **FAQ coût reformulée** (honnêteté remboursement, correctif YMYL).
- ⚠️ **Pages loader-câblées** → le contenu n'arrive en PROD qu'après `node scripts/patch-gencives.mjs`,
  `patch-dechaussement.mjs`, `patch-parodontie.mjs` (rebuild via webhook). **À lancer après validation
  de Dr Meriot** (email préparé).

### ✅ PR #12 — `feat/seo-maillage-citations` (maillage + dédup + sécurité + kit + docs)
- **Cannibalisation `/a-propos` vs `/parodontie`** (audit : `/a-propos` pos 7,9 vole « parodontologue
  marseille » à `/parodontie` pos 16) → ancres internes **exact-match « Parodontologue à Marseille »**
  ajoutées depuis `/a-propos`, le Footer (sitewide) et QuickLinks (accueil). Les 3 spokes l'utilisaient déjà.
- **301 dédup blog gencives [F6]** : `vercel.json` redirige `/blog/gencives-qui-saignent-quand-consulter`
  → `/gencives-qui-saignent` (consolide le signal sur le spoke ; article ~0 imp). ⚠️ à finir : **dépublier
  l'article dans Sanity** (sinon HTML orphelin + entrée sitemap restants).
- **En-têtes de sécurité [F10]** : 4 en-têtes sûrs dans `vercel.json` (HSTS, X-Content-Type-Options nosniff,
  X-Frame-Options SAMEORIGIN, Referrer-Policy). ⏳ **CSP laissée à part** (à tester : fonts Google, Doctolib,
  CDN Sanity, iframe Maps `/contact`, Vercel insights).
- **`NETLINKING-KIT.md`** (racine) : NAP normalisé, checklist GBP, citations Tier 1-2, partenaires locaux
  Tier 3 (gynéco→grossesse, diabéto→diabète, tabaco→fumeur, ortho→post-ortho) + modèle de message, règles
  Ordre/white-hat.
- **`AUDIT-360-2026-06.md`** (racine) : rapport d'audit complet + backlog priorisé (référence des chantiers).

### 📧 Validation médicale (Dr Meriot)
Email prêt à envoyer : **`EMAIL-VALIDATION-DR-MERIOT.md`** (racine) — intro « pourquoi » + 10 blocs de
contenu (PR #10 badge + PR #11). Points à confirmer par elle : intitulé exact du **diplôme**, **examen
prénatal 100 %**, formulation **tabac/greffe**, reformulation **coût paro**, mention **diabète/médecin**.
**Mise en ligne du contenu = après son retour** ; toute correction se répercute dans le script de patch
Sanity **ET** le filet JSX (parité).

### 🎯 Next steps
| Prio | Action | Nature |
|---|---|---|
| 🔴 1 | **GBP + avis** (cf. `NETLINKING-KIT.md`) — toujours le plus gros levier | hors-code (Dr Meriot/Guillaume) |
| 🔴 2 | **Valider le contenu avec Dr Meriot** puis lancer les 3 patchs Sanity + merger #11 | contenu |
| 🟠 3 | Merger #10 (hygiène) et #12 (maillage) | code |
| 🟠 3b | Étoffer `/a-propos` (prose « je ») → lève « exploré non indexé » [F3] ; voix « je » services/contact/tarifs [F13] ; CTA hero + click-to-call mobile [F14, F15] | code/contenu |
| 🟡 4 | Perf images (~3 Mo de PNG sur l'accueil → webp + dimensions) [F5, F17] — non fait | code |
| 🟡 5 | Contraste WCAG AA (palette « douce » sous 4.5:1) — **à valider visuellement** avant de toucher [F16] | a11y/design |
| ⚪ 6 | CSP (à tester en preview) [F10] ; schéma `LocalBusiness` multi-pages [F9] ; `sameAs`/`site_url` www/email (Sanity) [F19/F22/F26] ; page « non indexée » [F3] | divers |
| ⚪ 7 | Dépublier dans Sanity l'article blog redirigé `gencives-qui-saignent-quand-consulter` [F6 cleanup] | Studio |

> 📄 **Backlog complet et priorisé : `AUDIT-360-2026-06.md`** (statut de chaque finding A→L).

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

### Session photos accueil (23 juin 2026)

Remplacement des deux photos de la page d'accueil et correction du rendu des
images Sanity.

- **Nouvelles photos** : `src/assets/hero-meriot.jpg` (fond du Hero) et
  `src/assets/praticienne-meriot.jpg` (section « Votre praticienne »). Sources
  originales haute résolution conservées dans `/Photos`. Versions web optimisées :
  1400 px / 138 Ko et 1100 px / 92 Ko (les sources faisaient 3072×4080, jusqu'à 3,3 Mo).
- **Bug corrigé** — `Hero.tsx` et `Practitioner.tsx` passaient l'objet image Sanity
  brut à `<img src>` (jamais converti en URL via `urlFor`) → toute photo uploadée
  dans le Studio ne s'affichait pas. Désormais :
  `urlFor(accueil.heroImage).width(1400).url()` et
  `urlFor(accueil.praticienPhoto).width(1100).url()`, avec les nouveaux assets en
  fallback. Conséquence : les champs `heroImage` / `praticienPhoto` du singleton
  `accueil` sont enfin pilotables **no-code depuis le Studio**.
- L'ancien fallback `src/assets/dr-meriot-photo.png` n'est plus référencé par ces
  deux composants.
- Vérif : `tsc --noEmit` 0 erreur sur les fichiers touchés. (`npm run build` non
  testable dans l'env sandbox : binaire natif `rollup` absent car `node_modules`
  installé sous Windows — non bloquant pour la prod.)
- **Déploiement prod = push sur `main`** (Vercel rebuild auto). Rappel : un push sur
  une branche feature ne déclenche qu'un déploiement *preview*, pas la production.

### Session 23 juin 2026 (soir) — Refonte « À propos », SEO en prod, workflow déploiement, audit contenu éditable

Grosse session. Récap de tout ce qui a été fait + état d'avancement + prochaines étapes.

#### 1. Refonte de la page « À propos » (`/a-propos`) — LIVRÉ
Nouvelle structure (haut → bas) : **Équipe** → **Dr Stéphanie Meriot** → Pourquoi me
faire confiance → Philosophie + citation → **Dr Patrick Mateo** (2e praticien) →
**Claire (assistante)**.
- `studio/schemaTypes/about.ts` — champs ajoutés : `equipePhoto`, `equipeDescription`,
  `meriotPhoto`, `mateoNom`, `mateoPhoto`, `mateoDescription`, `claireNom`,
  `clairePhoto`, `claireDescription`.
- `src/pages/About.tsx` réécrit avec ces sections. Pattern : photos via `urlFor()` +
  **fallback asset** ; textes via `?? défaut`.
- Photos optimisées dans `src/assets/` : `equipe.jpg`, `a-propos.jpg`, `patrick.jpg`,
  `claire.jpg` (sources HD dans `/Photos`).
- Studio redéployé (`npx sanity deploy`) → les nouveaux champs sont visibles sur
  meriot-dentiste.sanity.studio. **Textes à remplir par le client** (vides = défauts
  neutres affichés). Rappel : photos = fallback code, champ Studio vide = normal.

#### 2. SEO rapatrié sur `main` — LIVRÉ
Du travail SEO était resté bloqué sur la branche `feat/seo-maillage-citations`, jamais
passé en prod. Rapatrié chirurgicalement sur `main` (sans conflit) :
- `vercel.json` : 4 redirections **301** + **en-têtes de sécurité** (HSTS,
  X-Content-Type-Options, X-Frame-Options, Referrer-Policy).
- `Footer.tsx` + `QuickLinks.tsx` : ancre exact-match « Parodontologue à Marseille » → `/parodontie`.
- `About.tsx` : lien de maillage réinjecté dans la nouvelle page.
- ⚠️ **Reste à faire** : les docs SEO `AUDIT-360-2026-06.md`, `NETLINKING-KIT.md`,
  `EMAIL-VALIDATION-DR-MERIOT.md` n'ont PAS pu être rapatriés (échec d'écriture OneDrive,
  fichiers fantômes) — à refaire (non bloquant, ce sont des notes).

#### 3. Workflow de déploiement consolidé — LIVRÉ
Cause des bugs à répétition : branches divergentes (`main` vs `feat/seo-maillage-citations`).
**Décision : tout se passe sur `main`.**
- **`deploy.bat`** = SEUL script de déploiement (checkout main → add -A → commit → push origin main → Vercel).
- **`deploy-studio.bat`** = `npx sanity deploy` (publie les nouveaux champs de schéma dans le Studio en ligne — à lancer après toute modif de schéma).
- Anciens scripts à supprimer : `deploy-photos.bat`, `deploy-to-prod.bat`, `deploy-apropos.bat`, `pousser-main.bat`, `restaurer-photos.bat`.
- ⚠️ **Contrainte d'env** : OneDrive verrouille `.git` (corruption d'index récurrente) et
  provoque des races d'écriture sur certains fichiers/dossiers (ex. `Photos/`). Toujours
  écrire via script + **vérifier** que le contenu a bien persisté (re-grep), réessayer sinon.

#### 4. Audit « contenu hardcodé non éditable » — FAIT — implémentation LIVRÉE le 24/06 (voir « Session 24 juin 2026 » en fin de doc)
Audit complet de 100% des pages/composants. La majorité des pages spécialités sont déjà
bien câblées (le « défaut » dans le code n'est qu'un fallback). Vrais trous identifiés
(contenu sans aucun champ Sanity).
- **Périmètre validé avec le client** : « contenu réel » (on laisse les micro-labels de
  design : badges, accroches, 404). **Pages légales = un seul champ texte riche (Portable Text)** par page.
- **Plan en 4 lots** (à implémenter) :
  - **Lot 1 — Accueil** : `components/Services.tsx` (5 cartes, 100% statique, à câbler à `accueil`),
    points forts praticien (`defaultHighlights` → champ `praticienHighlights`),
    `QuickLinks.tsx` (cartes spécialités/focus + champs cassés `quicklinksLabel`/`quicklinksTitle` à créer).
    Note : `components/About.tsx` = **code mort** (non importé), à ignorer.
  - **Lot 2 — Contact** (`components/Contact.tsx`) : `accueil.zones` (~60 villes), `global.horaires`,
    `global.maps_url`/`maps_embed_url`, liste accès (métro/bus/parking), titres/intro. Champs lus mais
    absents des schémas aujourd'hui.
  - **Lot 3 — Pages légales** : champ `body` Portable Text sur `confidentialite.ts` et `legal.ts`,
    rendu via `@portabletext/react` + `src/lib/portableTextComponents.tsx` (déjà existant), fallback = JSX actuel.
  - **Lot 4 — Blog / Tarifs / Parodontie** : nouveau singleton `blog_page` (titre/CTA index + bio auteur/CTA
    article — plumbing : config + structure + index + query + hook) ; labels Tarifs ; **Parodontie** section
    « Mon approche » + « zone d'intervention » (texte riche, contient du gras → Portable Text).
- **Principe d'implémentation (zéro casse)** : chaque texte codé en dur devient
  `page?.champ ?? texte_actuel`. Le site reste identique tant que le Studio n'est pas rempli.

#### ▶️ Prochaines étapes (reprise demain)
1. Implémenter les Lots 1 → 4 ci-dessus (commencer par Lot 1).
2. `npx tsc --noEmit -p tsconfig.app.json` pour valider — doit afficher **0 erreur**. ⚠️ NOTE CORRIGÉE le 24/06 : NE PAS « ignorer » les erreurs TS1002/TS1005/TS17008/TS17014/TS1127 — ce n'est PAS du bruit d'encodage mais le signe d'un fichier corrompu/tronqué qui CASSE le build Vercel (voir « Session 24 juin (suite) »).
3. Déployer : **`deploy.bat`** (site) + **`deploy-studio.bat`** (nouveaux champs dans le Studio).
4. Optionnel : rapatrier les 3 docs SEO restées sur la branche feature ; supprimer les anciens scripts .bat.

### Session 24 juin 2026 — Vérification chantier « contenu éditable » : les 4 lots étaient déjà LIVRÉS

Reprise du chantier « rendre éditable le contenu codé en dur ». **Constat : le plan en 4 lots
décrit dans la session du 23 juin (soir) avait en réalité déjà été entièrement implémenté et
committé** dans `01b7c8c` (« Mise a jour du site »), en toute fin de cette session — seule la doc
n'avait pas été mise à jour (elle indiquait encore « EN ATTENTE »). Aucun code nouveau à écrire.

État vérifié, lot par lot (composants câblés `page?.champ ?? défaut` + champs schéma présents) :
- **Lot 1 — Accueil** : `Services.tsx`, `Practitioner.tsx`, `QuickLinks.tsx`. Champs `accueil` :
  `servicesTitre/Intro/List`, `praticienHighlights`, `quicklinksLabel/Title/Specialites/Focus`.
- **Lot 2 — Contact** : `Contact.tsx`. Champs `accueil` (`contactTitre/Intro`, `zones`, `accesList`,
  `zonesTitre/Texte`) et `global` (`phone`, `adresse`, `horaires`, `maps_url`, `maps_embed_url`, `doctolib`).
- **Lot 3 — Légales** : `confidentialite.ts` + `legal.ts` ont le champ `body` (Portable Text) ;
  `Confidentialite.tsx` / `MentionsLegales.tsx` rendent via `@portabletext/react` avec fallback JSX (`hasBody`).
- **Lot 4 — Blog/Tarifs/Parodontie** : singleton `blog_page` enregistré (index + queryMap) et câblé
  (`Blog.tsx`, `BlogPost.tsx`) ; labels `tarifs` ; `parodontie.approcheTitre/approcheBody/zonesTitre/zonesList`.

Validations réalisées :
- `npx sanity deploy` relancé → « Deployed 1/1 schemas » : tous les champs sont éditables sur meriot-dentiste.sanity.studio.
- `git` : local `main` == `origin/main` == `01b7c8c` → code en production.
- `tsc` : 0 erreur. ⚠️ CORRECTION (24 juin suite) : les erreurs TS17014/TS1002 de `Parodontie.tsx` n'étaient PAS du bruit — le fichier était tronqué et cassait le build Vercel. Réparé ; tsc doit désormais toujours être à 0.
- **Contrôle visuel prod (zéro casse confirmé)** : `/` (Services, Practitioner, QuickLinks, Contact),
  `/contact`, `/confidentialite`, `/blog`, `/tarifs`, `/parodontie` — toutes rendent le contenu actuel
  via les défauts (Studio non encore rempli).

**Reste à faire (côté client)** : Stéphanie remplit / publie les champs dans le Studio (À propos, Accueil…),
puis relancer `deploy.bat` au besoin. Champ Studio vide = défaut neutre affiché (normal).

Reliquat inchangé depuis le 23 juin : rapatrier les 3 docs SEO restées sur la branche feature ; supprimer les anciens scripts .bat.

### Session 24 juin 2026 (suite) — Remplissage du contenu Sanity + ⚠️ build Vercel cassé (corrigé)

Deux choses dans cette session.

**1. Remplissage des champs Sanity restés vides.** Les champs créés au chantier « rendre éditable »
existaient mais étaient VIDES dans Sanity (le site affichait le contenu via les fallbacks `?? défaut`).
Créé `scripts/seed-champs-vides.mjs` (+ `remplir-textes.bat` pour lancer en double-clic) : il remplit
UNIQUEMENT les champs vides avec le texte d'origine, sans jamais écraser ce qui est déjà saisi. Écrit
sur les documents publiés. 27 champs remplis : accueil (services, points forts, quicklinks, contact/zones),
parodontie (approche en Portable Text + zones), tarifs (libellés), `blog_page` (créé), et `legal` +
`confidentialite` en Portable Text. Hébergeur des mentions légales corrigé : Lovable.dev → Vercel Inc.

**2. ⚠️⚠️ CAUSE RACINE d'un bug majeur : les builds Vercel échouaient en silence depuis le 23 juin.**
`src/pages/Parodontie.tsx` était **tronqué** (coupé à la ligne 423, en plein attribut `className`, chaîne
non terminée) — corruption introduite par une race d'écriture OneDrive lors du commit `01b7c8c`.
Conséquence : `vite-react-ssg build` plantait → **7 déploiements de production Vercel en « Error »**
d'affilée → Vercel gardait en ligne la dernière version saine (`e108246`). Le site semblait « ne pas se
mettre à jour » alors que `git push` réussissait. Réparé : fin du fichier reconstruite depuis `e108246`
(en gardant le câblage Sanity), `tsc` repassé **100% clean**, build `461999f` **« Ready »**, contenu en ligne.

#### 🛑 RÈGLES anti-récidive (CORRIGENT des notes erronées plus haut dans ce doc)
- **NE PLUS JAMAIS « ignorer » les erreurs `tsc`** TS1002 / TS1005 / TS17008 / TS17014 / TS1127. Les notes
  précédentes les qualifiant de « bruit d'encodage/emoji sans impact sur le build Vite » étaient **FAUSSES** :
  c'était un fichier réellement tronqué qui cassait le build. Une « unterminated string literal » ou une
  cascade « JSX element has no corresponding closing tag » = **vraie corruption à réparer**.
  Règle simple : avant tout déploiement, `npx tsc --noEmit -p tsconfig.app.json` doit afficher **0 erreur**.
- **Après CHAQUE `deploy.bat`, vérifier le statut du build sur Vercel** : vercel.com → projet
  `meriot-smile-studio` → Deployments (branche `main`). Il doit passer **« Ready »**. Si **« Error »**,
  le site reste figé sur l'ancienne version même si le push a réussi → ouvrir le « Build Log » et corriger.
- **Piège qui masque le problème** : le contenu Sanity est lu côté client → il s'affiche même quand le
  build est cassé. Un build cassé peut donc passer inaperçu longtemps ; seules les modifs de **code**
  (composants) révèlent qu'aucun nouveau build ne sort.
- **OneDrive tronque les fichiers** lors d'écritures via éditeur. Toujours écrire via script et re-vérifier
  (nombre de lignes + dernière ligne attendue) que le fichier n'a pas été coupé.

Nouveaux fichiers utilitaires : `remplir-textes.bat` (seed du contenu vide), `debloquer-git.bat`
(supprime `.git\index.lock` quand OneDrive bloque `deploy.bat`).

### Session 24 juin 2026 (fin) — Lot SEO/Services/404 + double-audit éditabilité

**Double-vérif demandée : « 100% du contenu éditable ET rempli dans Sanity ? » → NON (et c'est en partie voulu).**
Audit code (sous-agent) + interrogation directe de la base. Conclusions :
- Le site repose sur un pattern de **fallback** (`sanity?.champ ?? "défaut codé"`) : « éditable » ≠ « rempli ».
- Restent **non éditables** (aucun champ Sanity) : glossaire parodontie (21 termes), cartes « En savoir plus »
  (parodontie/gingivite/déchaussement/gencives), `keywords` SEO de toutes les pages, page 404, quelques
  micro-textes (badge hero, tagline footer, sous-titres). + un grand ensemble de **micro-labels** laissés
  en dur volontairement (boutons, nav, badges).
- Étaient **éditables mais vides** (montraient le défaut) : `services_page.servicesList`, `global.maps_embed_url`,
  sections Mateo/Claire de `about` (à remplir par la cliente).

**Lot « priorité haute » livré (recommandé contre le 100% littéral = sur-ingénierie) :**
- SEO **Accueil** + **Blog** : champs `seoTitle`/`seoDescription` ajoutés (`accueil.ts`, `blog_page.ts`),
  câblés (`Index.tsx`, `Blog.tsx`), seedés. Vérifié en ligne (titre Google lu depuis Sanity).
- **`services_page.servicesList`** seedé (5 services détaillés) → /services éditable et vérifié.
- **`global.maps_embed_url`** seedé (vraie carte Google de l'adresse, format `?q=...&output=embed`).
- **Page 404** réécrite en français (`NotFound.tsx`).
- Script `scripts/seed-champs-vides.mjs` étendu (services_page, global, SEO accueil/blog) — relançable.
- `tsc` final = **0 erreur**. Build Vercel `7e57ea4` **Ready**.

**⚠️ Restes ouverts (non traités, décision cliente) :**
- **404 routage** : le texte FR est en place mais Vercel sert sa propre page « 404: NOT_FOUND » (anglais) pour
  les URL inexistantes — il manque un fallback SPA (`vercel.json` rewrite vers `/index.html`) OU une vraie
  `404.html` générée par vite-react-ssg. La correction texte est donc « masquée » tant que ce n'est pas fait.
- **« ⭐⭐⭐⭐⭐ 5/5 étoiles »** en dur dans le hero accueil : affirmation à justifier (vrais avis) ou à retirer.
- Typo repérée dans `services_page.heroSubtitle` (« adaptés à a vos besoins ») — éditable dans le Studio.
- about : Mateo/Claire à remplir par la cliente.

**⚠️⚠️ Rappel environnement (récidive ce jour) :** une rafale d'éditions via l'outil éditeur a **tronqué 6
fichiers d'un coup** (OneDrive). Reconstruits depuis git (`git show HEAD:…`) + ré-application des modifs via
script, copie avec boucle de vérification (nb lignes + dernière ligne), puis `tsc`. **Règle : pour toute
série d'éditions, écrire via script vers /tmp, valider, copier avec vérification, et finir par `tsc` = 0.**
