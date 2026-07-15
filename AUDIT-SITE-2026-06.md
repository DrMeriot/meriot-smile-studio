# AUDIT TECHNIQUE — Site Dr Stéphanie Meriot (meriot-smile-studio)

**Date :** 2026-06-24
**Périmètre :** audit en lecture seule. Aucune modification de code. Livrable = ce rapport.
**Méthode :** lecture de `CLAUDE-PROJECT-DOC.md` (963 lignes) + configs + arbre `src/`, `studio/`, `scripts/` ; vérifications empiriques (`tsc`, `eslint`, `npm audit`, `git`, greps d'usage).
**Branche analysée :** `main` (= `origin/main`, dernier build prod connu `7e57ea4` « Ready »).

---

## 0. Synthèse exécutive

Le projet est **sain sur le fond** : TypeScript compile sans erreur (`tsc --noEmit -p tsconfig.app.json` = **0**), l'architecture « Sanity golden + fallback JSX » est cohérente, le webhook Sanity→Vercel fonctionne, et le contenu est largement éditable no-code. La doc projet est exceptionnellement riche.

Les vrais problèmes ne sont **pas dans le code applicatif** mais dans la **chaîne de fabrication et l'hygiène du dépôt** :

1. **Fiabilité build/déploiement (AXE PRIORITAIRE).** La seule barrière contre la catastrophe « fichier tronqué par OneDrive → 7 builds Vercel échoués en silence » est **un humain qui n'oublie pas de lancer `tsc` à la main**. Il n'y a **aucun CI** : ni gate `tsc`, ni gate `eslint`, ni vérification automatique du statut Vercel. C'est le risque n°1 du projet et il est entièrement adressable. **Recommandation forte détaillée en §3 et §11.**
2. **`npm run lint` est rouge** (22 erreurs) alors que la doc le croit vert — il n'est vert que « sur les fichiers touchés », jamais sur le dépôt entier.
3. **Cruft commité** : `esb.err` (log d'erreur d'une autre session), `test-root.txt` (vide), 6 scripts `.bat` dont 2 explicitement marqués « à supprimer », 24 refs de branches Git.
4. **Tests présents mais inexécutables** : `src/test/ssg-seo.test.ts` + config Vitest existent, mais `package.json` n'a **pas** de script `test`.
5. **Petites dettes** : asset mort de 1,8 Mo, claims marketing non justifiés (« 5/5 étoiles »), bug mineur de `lastmod` sitemap, type Sanity `landing_page` à moitié câblé, page 404 Vercel en anglais.

Aucun de ces points ne casse le site en production aujourd'hui. Mais ensemble ils rendent le projet **fragile à faire évoluer** : chaque déploiement repose sur une discipline manuelle sans filet.

**Quick wins à fort impact (½ journée) :** CI minimal (tsc+lint+build) ; sortir le code mort/cruft ; ajouter le script `test` ; nettoyer les branches.
**Chantier structurel n°1 :** sortir le dépôt de OneDrive (voir §3).

---

## 1. AXE 1 — Architecture & code mort / dupliqué

### Constats

**Architecture (solide).** Le flux est clair et bien documenté : `sanityClient` (wrapper qui avale les erreurs et renvoie `null`) → `loader` SSG au build pour les pages « golden » (`global`, `parodontie`, 3 spokes, blog) → `useSeedSanity` qui ré-hydrate React Query → composants en `page?.champ ?? défaut`. Les autres singletons restent fallback-only (assumé). Le découpage `src/lib` (sanity, queries, image, portableText, utils) et `src/hooks` est propre.

**Code mort confirmé :**

- `src/components/About.tsx` (117 lignes) — **non importé nulle part** (`grep -rn "components/About" src/` → 0). La page « À propos » utilise `src/pages/About.tsx`, pas ce composant. La doc le notait déjà (« code mort, à ignorer ») — autant le supprimer.
- `src/assets/dr-meriot-photo.png` — **1,86 Mo**, **0 référence** dans `src/`. La doc (session 23 juin) confirme qu'il n'est plus référencé depuis le passage à `urlFor()`. Poids mort dans le repo.
- `src/assets/hero-dentist.jpg` (128 Ko) — **0 référence** dans `src/`.
- `test-root.txt` (0 octet, racine) et `esb.err` (log d'erreur pointant vers une autre session `keen-elegant-mayer`) — **commités**, sans objet.

**Pas de duplication grave.** Le gros nettoyage Lovable/Supabase (~5 700 lignes) a déjà été fait. Les 3 pages spokes (gingivite / déchaussement / gencives) partagent une structure très proche (hero → auto-diagnostic → causes → FAQ → CTA) mais avec du contenu distinct — duplication de *forme* acceptable, pas urgente à factoriser.

**Note d'usage :** `src/components/ui/` ne contient plus que 3 composants shadcn (accordion, button, card) réellement utilisés — bon.

### Recommandations
| Action | Effort | Impact | Risque |
|---|---|---|---|
| Supprimer `components/About.tsx`, `dr-meriot-photo.png`, `hero-dentist.jpg` | XS | Moyen (repo + clarté) | Très faible (0 import) |
| Supprimer `test-root.txt` et `esb.err` du dépôt + gitignore `*.err` | XS | Faible | Nul |

---

## 2. AXE 2 — Modèle de contenu Sanity

### Constats

**Schémas (16 types) cohérents** avec le routing et les queries. Pattern fallback bien appliqué.

**`landing_page` : type à moitié câblé (piège).**
- Le type existe (`studio/schemaTypes/landing_page.ts`), est exporté, et `landingPageBySlugQuery` + `useLandingPage()` existent.
- **MAIS la route `/:slug` n'existe pas dans `src/App.tsx`** (seul `*` → NotFound). La doc le signale (§12 ter). Donc on ne peut PAS créer une page autonome via `landing_page`.
- En réalité `useLandingPage()` **est utilisé**, mais comme **overlay** : les 3 spokes (`GingiviteMarseille`, `DechaussementDentaire`, `GencivesQuiSaignent`) appellent `useLandingPage("<slug>")` pour injecter un `body` PortableText optionnel dans une page déjà routée par ailleurs. Usage légitime mais **contre-intuitif** : un éditeur qui crée un doc `landing_page` avec un slug arbitraire ne verra **rien** s'afficher. À documenter ou à clarifier (renommer en `spoke_overlay` ?).

**Incohérences entre la doc et la réalité (à corriger dans la doc, pas le code) :**
- **§6 de la doc affirme que `.env` contient `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.** **Faux** : `.env` ne contient que les 2 variables Sanity (vérifié). Plus aucune référence Supabase dans `src/`. La doc est périmée sur ce point.
- **§4 de la doc** liste la route déchaussement comme `/dechaussement-dentaire` ; la route réelle (App.tsx + vite.config + vercel.json) est `/dechaussement-dentaire-marseille`. La doc se contredit elle-même ailleurs (§12 bis le note). Risque réel de lien interne cassé si on se fie au tableau §4.

**Contenu « éditable » ≠ « rempli ».** Le pattern fallback fait que beaucoup de champs Sanity sont vides et c'est le défaut JSX qui s'affiche/s'indexe. Restent volontairement **non éditables** (aucun champ) : glossaire parodontie (21 termes), cartes « En savoir plus », `keywords` SEO de toutes les pages, page 404, micro-labels. C'est un choix assumé (anti sur-ingénierie) — OK, mais à garder en tête : éditer ces contenus = toucher au code = redéployer.

**Champs orphelins / lecture sans schéma.** La doc mentionne (Lot 2) des champs lus côté composant mais historiquement absents des schémas (`global.horaires`, `maps_embed_url`, etc.) — aujourd'hui ajoutés et seedés (session 24 juin). À revérifier ponctuellement qu'aucun `page?.champ` ne lit un nom de champ qui n'existe dans aucun schéma (le fallback masque ce genre d'erreur silencieusement).

### Recommandations
| Action | Effort | Impact | Risque |
|---|---|---|---|
| Mettre la doc à jour (§4 route déchaussement, §6 Supabase périmé) | XS | Moyen (évite erreurs futures) | Nul |
| Décider du sort de `landing_page` : soit câbler `/:slug`, soit renommer/documenter comme overlay de spoke | S | Moyen | Faible |
| Script de cohérence « champs lus dans le code mais absents des schémas » | M | Moyen | Faible |

---

## 3. AXE 3 — Fiabilité build & déploiement + fragilité OneDrive ⭐ PRIORITAIRE

### Constats (preuves)

**a) Aucune barrière automatique. C'est le cœur du problème.**
- **Pas de CI** : `ls .github/workflows` → inexistant. Donc ni `tsc`, ni `eslint`, ni `build` ne sont vérifiés automatiquement avant la mise en prod.
- Le déploiement = `deploy.bat` : `git checkout main` → `git add -A` → `git commit -m "Mise a jour du site"` → `git push origin main`. **Le script ne lance ni `tsc` ni `build` avant de pousser.**
- Conséquence : la seule protection contre le scénario déjà vécu (fichier `Parodontie.tsx` tronqué par OneDrive → `vite-react-ssg build` plante → **7 déploiements Vercel « Error » d'affilée, en silence**, site figé sur l'ancienne version) est **la mémoire de l'opérateur** qui doit penser à lancer `tsc` puis aller regarder le dashboard Vercel. C'est exactement le type de garde-fou qui saute un jour de fatigue.

**b) La fragilité OneDrive est réelle et documentée à répétition.**
- Verrou `.git\index.lock` fantôme → script dédié `debloquer-git.bat`.
- Troncature de fichiers lors d'éditions (« 6 fichiers tronqués d'un coup », 24 juin). `tsc` ne voit la troncature que si elle casse la syntaxe TS — une troncature « propre » (sur une frontière valide) passerait inaperçue.
- Le build Vite **ne peut pas tourner dans cet environnement sandbox** : `node_modules` ne contient que les binaires Rollup Windows (`rollup-win32-x64-gnu`, `rollup-win32-x64-msvc`), pas de binaire Linux. Donc **la seule vérification de build réelle aujourd'hui = Vercel lui-même**, a posteriori.

**c) Le piège qui masque les pannes.** Le contenu Sanity est lu côté client : il s'affiche même quand le build est cassé. Un build cassé peut donc rester invisible longtemps ; seules les modifs de **code** révèlent qu'aucun nouveau build n'aboutit. (Bien identifié dans la doc.)

**d) `deploy.bat` — défauts mineurs.** Message de commit toujours identique (« Mise a jour du site ») → historique Git illisible. `git add -A` capture aussi le cruft (esb.err, etc.).

### ⭐ Recommandation forte argumentée

**Le problème n'est pas « OneDrive est mauvais » ; c'est « la prod dépend d'un humain qui n'oublie jamais une étape manuelle, sur un système de fichiers qui corrompt activement les écritures ». Il faut un filet automatique, et idéalement retirer la cause racine.**

Deux niveaux, **non exclusifs** — je recommande de faire les deux, dans cet ordre :

**Niveau 1 (quick win, ½ journée) — Mettre un filet AVANT la prod, sans rien changer au workflow de Stéphanie.**
Ajouter un workflow GitHub Actions sur push `main` qui, sur un runner Linux **propre** (donc immunisé contre la troncature OneDrive locale), exécute :
1. `npm ci`
2. `npx tsc --noEmit -p tsconfig.app.json` (doit être 0)
3. `npm run build` (le vrai `vite-react-ssg build`)
4. `npm run lint` (en `--max-warnings` souple au début)

Si l'un échoue, le commit est marqué rouge sur GitHub et **on sait immédiatement** qu'il ne faut pas se fier à la prod — au lieu de découvrir 7 builds Error plus tard. C'est précisément le contrôle qui aurait coupé court à l'incident du 24 juin. Coût : un fichier YAML. Bénéfice : la cause n°1 d'incident devient visible en < 2 min.
*Variante encore plus robuste :* configurer le projet Vercel pour que le build échoue bloque réellement (Vercel garde l'ancienne version live — c'est déjà le cas — mais ajouter une **notification** d'échec par email/Slack, native côté Vercel, pour ne plus jamais « rater » un build Error).

**Niveau 2 (chantier structurel, recommandé) — Sortir le dépôt de OneDrive.**
La fragilité (troncature, `.git` verrouillé, races d'écriture) **vient de OneDrive qui synchronise un dossier de travail Git**. La cure définitive : déplacer le clone hors du périmètre synchronisé, p. ex. `C:\dev\meriot-smile-studio` (dossier local non-OneDrive). Le code « source de vérité » est déjà sur GitHub + Vercel ; OneDrive n'apporte aucune sécurité ici (il en retire). Les seuls artefacts qui ont leur place dans OneDrive sont les **données non versionnées** (exports GSC, photos sources HD). Bénéfice : suppression de `debloquer-git.bat`, fin des troncatures, build local Windows redevient fiable. Coût : un `git clone` ailleurs + rappel à Stéphanie d'ouvrir le projet depuis le nouveau chemin. **C'est le meilleur rapport impact/risque du projet.**

| Action | Effort | Impact | Risque |
|---|---|---|---|
| **CI GitHub Actions (tsc+build+lint) sur `main`** | S (½ j) | **Très élevé** | Très faible |
| **Activer notification d'échec de build Vercel** | XS | Élevé | Nul |
| **Déplacer le clone hors OneDrive** | S | **Très élevé** (supprime la cause racine) | Faible (à coordonner avec Stéphanie) |
| Messages de commit datés/parlants dans `deploy.bat` | XS | Faible | Nul |

---

## 4. AXE 4 — Santé TypeScript

### Constats
- **`npx tsc --noEmit -p tsconfig.app.json` → exit 0.** ✅ Aucune erreur. La règle anti-récidive de la doc (tsc = 0 obligatoire) est respectée à ce jour.
- Typage volontairement lâche à la frontière Sanity : `type SanityData = Record<string, any>` (documenté). Compromis assumé et raisonnable vu le pattern fallback ; le prix est l'absence de sécurité de type sur les noms de champs (`page?.champTypo` ne lèvera jamais d'erreur). Sanity TypeGen permettrait de générer des types depuis les schémas — amélioration possible mais non prioritaire.
- 3 configs TS séparées (app/node/base) cohérentes.

### Recommandations
| Action | Effort | Impact | Risque |
|---|---|---|---|
| (Optionnel) Sanity TypeGen pour typer les documents | M | Moyen (attrape les typos de champ) | Faible |

---

## 5. AXE 5 — Tests

### Constats
- **Contradiction.** La doc affirme « Vitest retiré, pas de `npm test` » (§12 quater). **Faux** : `vitest` est dans `dependencies`, `vitest.config.ts` existe, `src/test/setup.ts` et **`src/test/ssg-seo.test.ts`** existent.
- **MAIS `package.json` n'a aucun script `test`.** Les tests existent et ne sont **jamais exécutés** (ni en local, ni en CI puisqu'il n'y a pas de CI). Ils pourrissent.
- Pire : ce fichier de test est responsable de la **majorité des 22 erreurs eslint** (voir §8) — donc non seulement il ne tourne pas, mais il pollue le lint.
- Couverture réelle = **0** (rien n'est lancé).

### Recommandations
| Action | Effort | Impact | Risque |
|---|---|---|---|
| Décider : soit réactiver les tests (`"test": "vitest run"` + les inclure dans la CI), soit supprimer proprement `src/test/` + `vitest` des deps | S | Moyen | Faible |
| Si conservés : le test `ssg-seo` (vérifie le HTML SSG) est précieux pour ce projet — le brancher en CI serait un excellent garde-fou anti-régression SEO | S | Élevé | Faible |

---

## 6. AXE 6 — SEO / AEO + 404

### Constats
- **SSG correct** : `SEOHead` (react-helmet via `vite-react-ssg`) injecte title/description/canonical/OG/Twitter/JSON-LD par route. Canonical pointe vers `www` partout (consolidation OK). `robots.txt` + sitemap dynamique présents.
- **Sitemap — bug mineur confirmé.** Dans `vite.config.ts`, `fetchBlogSlugs()` lit le champ `date` (`{ "slug": slug.current, date }`), mais le schéma `blog_post` n'a **pas** de champ `date` — il a `publishedAt`. Résultat : `p.date` est toujours `undefined` → `lastmod` des articles = **toujours la date du jour du build**, jamais la vraie date de publication. Sans gravité SEO majeure, mais incorrect.
- **404 — problème connu non résolu.** `NotFound.tsx` a été traduit en FR, **mais** `vercel.json` ne fait un rewrite vers `/index.html` que pour `/blog/:slug`. Toute autre URL inexistante reçoit la **page 404 native de Vercel (en anglais « 404: NOT_FOUND »)**, pas le composant FR. Le correctif texte est donc « masqué ». Fix : soit une vraie `404.html` générée par `vite-react-ssg`, soit un rewrite SPA catch-all maîtrisé.
- **AEO** : présence de `FAQSchema`, `HowToSchema`, `MedicalSchema`, `LocalBusinessSchema`, `BreadcrumbSchema` — bon pour les moteurs de réponse. À vérifier que chaque page injecte le bon (audit JSON-LD live recommandé, hors périmètre lecture seule).
- Travail SEO de fond (titles raccourcis, cluster gencives, voix « je ») déjà largement traité par les sessions précédentes.

### Recommandations
| Action | Effort | Impact | Risque |
|---|---|---|---|
| Corriger le champ sitemap `date` → `publishedAt` | XS | Faible | Nul |
| Régler le 404 (404.html SSG ou rewrite catch-all) | S | Moyen (UX + image pro) | Faible (tester que ça ne casse pas les routes SSG) |
| Audit JSON-LD live (Rich Results Test) par page | S | Moyen | Nul |

---

## 7. AXE 7 — Accessibilité & performance

### Constats
- **Perf — assets non optimaux.** `dr-meriot-photo.png` (1,8 Mo) et `implanto-logo.png` (811 Ko) / `paro-logo.png` (296 Ko) sont des PNG lourds. Le 1,8 Mo est mort (cf. §1) ; les logos, s'ils sont affichés, gagneraient à être en SVG/WebP. Les photos récentes (hero/praticienne/équipe) ont bien été optimisées (~90–160 Ko). Images Sanity servies via `urlFor().width()` → bon.
- **Polices** : Poppins chargée depuis Google Fonts avec `preconnect` — OK ; un `font-display:swap` est présent (`&display=swap`).
- **A11y — points à vérifier :** les emojis « 🇫🇷 🇬🇧 🇪🇸 Trilingue » et « ⭐⭐⭐⭐⭐ » dans `Hero.tsx` sont du texte décoratif lu tel quel par les lecteurs d'écran (verbeux). Les CTA Doctolib ont des `aria-label` (bon). Contraste de la couleur primaire `#e07b91` sur fond clair à vérifier (probablement limite pour WCAG AA sur petit texte).
- Pas d'analyse Lighthouse possible en lecture seule ; recommandé en suivi.

### Recommandations
| Action | Effort | Impact | Risque |
|---|---|---|---|
| Convertir logos PNG → SVG/WebP ; supprimer le PNG mort | S | Moyen (LCP) | Faible |
| Audit Lighthouse + contraste couleur primaire | S | Moyen | Nul |
| Revoir les emojis décoratifs (a11y) | XS | Faible | Nul |

---

## 8. AXE 8 — Sécurité & dépendances

### Constats
- **`npm run lint` est ROUGE** : `eslint .` → exit 1, **22 erreurs + 4 warnings**. Répartition :
  - ~20 erreurs `no-explicit-any` dans **`src/test/ssg-seo.test.ts`** (le test qui ne tourne pas).
  - 1 erreur `no-require-imports` dans `tailwind.config.ts:88`.
  - 1 erreur `no-explicit-any` dans `vite.config.ts:115` (le polyfill localStorage SSR).
  La doc qui dit « lint 0 erreur » ne vaut que pour les *fichiers touchés* d'une session, jamais pour le dépôt. Un `npm run lint` global échoue aujourd'hui.
- **`npm audit` : 18 vulnérabilités (1 critique, 11 high, 6 moderate).** Les plus notables : `vitest` < 3.2.6 (critique, mais surface = UI server de dev uniquement), `ws` (high), `yaml` (moderate). **Ce sont des dépendances de dev/build** : surface d'attaque quasi nulle pour un site statique livré sur CDN, mais à traiter par hygiène (`npm audit fix`).
- **En-têtes de sécurité présents** dans `vercel.json` : HSTS (preload), X-Content-Type-Options, X-Frame-Options, Referrer-Policy. Bon. Il manque éventuellement une `Content-Security-Policy` (non triviale à poser, optionnel).
- **Secrets** : `.env` (commité) ne contient que des identifiants publics Sanity. `SANITY_TOKEN` (Editor) est en `.env.local` gitignoré. ✅ Pas de fuite détectée.
- **`react-is` en `^19.2.7` dans `studio/` alors que React y est en 18.3.1** — désalignement de major (ajouté pour débloquer `sanity deploy`). Fonctionne mais fragile aux upgrades ; à surveiller.

### Recommandations
| Action | Effort | Impact | Risque |
|---|---|---|---|
| Rendre `npm run lint` vert (corriger/retirer le test, fixer les 2 configs) | S | Élevé (débloque un gate CI) | Faible |
| `npm audit fix` (dev deps) | XS | Moyen | Faible (tester build après) |
| Aligner `react-is` sur React 18 dans `studio/` | XS | Faible | Faible |

---

## 9. AXE 9 — Dette (scripts, docs, branches, typos)

### Constats
- **Scripts `.bat` (6 commités).** `deploy.bat` + `deploy-studio.bat` sont les 2 légitimes (workflow consolidé). **À supprimer (déjà décidé dans la doc, jamais fait)** : `pousser-main.bat`, `restaurer-photos.bat`. `debloquer-git.bat` et `remplir-textes.bat` sont des rustines (le 1er disparaît si on sort de OneDrive — §3).
- **Branches Git : 24 refs.** 6 branches locales déjà mergées dans `main` traînent (`feat/gencives-...`, `fix/remove-assurance-maladie-claim`, `fix/studio-react-is`, `docs/...`, `claude/admiring-snyder-...`). Idem côté `origin` (~13 branches `feat/`/`fix/`/`docs/`). Bruit qui complique la lecture de l'historique.
- **Docs SEO sur branche feature, jamais rapatriées** : `AUDIT-360-2026-06.md`, `NETLINKING-KIT.md`, `EMAIL-VALIDATION-DR-MERIOT.md` n'ont pas pu être écrits sur `main` (échecs d'écriture OneDrive). Reliquat connu.
- **Cruft racine commité** : `esb.err`, `test-root.txt` (cf. §1).
- **Typos / claims connus** : `services_page.heroSubtitle` « adaptés à a vos besoins » (éditable Studio) ; **claims non justifiés** « ⭐⭐⭐⭐⭐ 5/5 étoiles » et « Conventionnée Secteur 1 • Carte Vitale » en dur dans `Hero.tsx` — le premier surtout est un **risque de conformité** (publicité santé / avis non vérifiables) à justifier par de vrais avis ou retirer.
- **`PROMPT-NOUVELLE-SESSION-AUDIT.md`** + `.claude/` non suivis (normal pour une session d'audit).

### Recommandations
| Action | Effort | Impact | Risque |
|---|---|---|---|
| Supprimer `pousser-main.bat`, `restaurer-photos.bat` | XS | Faible | Nul |
| Élaguer les branches mergées (local + origin) | XS | Moyen (clarté) | Faible |
| Retirer/justifier le claim « 5/5 étoiles » | XS | Moyen (conformité) | Nul |
| Corriger la typo `heroSubtitle` (Studio) | XS | Faible | Nul |
| Rapatrier ou archiver proprement les 3 docs SEO | S | Faible | Nul |

---

## 10. Tableau de bord — priorisation globale

### Quick wins (faire en premier — ½ à 1 journée, risque faible, impact fort)
1. **CI GitHub Actions `tsc` + `build` + `lint`** sur `main` (AXE 3) — *le plus important.*
2. **Notification d'échec de build Vercel** (AXE 3).
3. **Rendre `npm run lint` vert** + ajouter le script `test` ou retirer Vitest (AXE 5/8).
4. **Supprimer code mort & cruft** : `components/About.tsx`, `dr-meriot-photo.png`, `hero-dentist.jpg`, `esb.err`, `test-root.txt`, 2 `.bat` obsolètes (AXE 1/9).
5. **Élaguer les branches Git** mergées (AXE 9).
6. **Corriger le bug sitemap `date`→`publishedAt`** et le claim « 5/5 » (AXE 6/9).
7. **Mettre la doc à jour** (Supabase périmé, route déchaussement) (AXE 2).

### Chantiers structurels (planifier — impact fort, à cadrer)
- **A. Sortir le dépôt de OneDrive** (AXE 3) — supprime la cause racine de toute la fragilité. *Recommandation forte.*
- **B. Régler le 404** (404.html SSG ou rewrite catch-all maîtrisé) (AXE 6).
- **C. Décider du sort de `landing_page`** : câbler `/:slug` ou clarifier l'usage overlay (AXE 2).
- **D. (Optionnel) Sanity TypeGen** pour typer les documents et attraper les typos de champ (AXE 4).

### Matrice effort × impact (chantiers majeurs)
| Item | Effort | Impact | Risque | Priorité |
|---|---|---|---|---|
| CI (tsc+build+lint) | S | Très élevé | Très faible | **1** |
| Sortir de OneDrive | S | Très élevé | Faible | **2** |
| Notif build Vercel | XS | Élevé | Nul | **3** |
| Lint vert + tests | S | Élevé | Faible | **4** |
| Nettoyage mort/cruft/branches | XS–S | Moyen | Faible | **5** |
| 404 | S | Moyen | Faible | 6 |
| landing_page | S | Moyen | Faible | 7 |

---

## 11. Reco forte sur l'AXE 3 (synthèse en une phrase)

> **La production de ce site repose aujourd'hui sur une chaîne manuelle (éditer → `tsc` à la main → `deploy.bat` → aller vérifier Vercel) opérée sur un système de fichiers (OneDrive) qui corrompt activement les écritures. Le correctif à plus fort levier du projet est de poser un filet automatique (CI `tsc`+`build`+`lint` sur runner Linux propre + notification d'échec Vercel) ET de déplacer le clone hors de OneDrive. Les deux ensemble transforment le risque n°1 (« build cassé en silence ») en un signal rouge immédiat, et suppriment sa cause racine — pour un coût d'une demi-journée.**

---

## 12. Plan proposé (pour validation avant toute implémentation)

**Étape 0 — Validation (maintenant).** Tu choisis ce qu'on attaque et dans quel ordre. Rien n'est modifié tant que tu n'as pas tranché.

**Lot A — Filet de sécurité (priorité absolue).**
1. Ajouter `.github/workflows/ci.yml` (npm ci → tsc → build → lint).
2. Activer les notifications d'échec de build côté Vercel.
3. (Décision requise) Déplacer le clone hors OneDrive — à coordonner avec Stéphanie.

**Lot B — Hygiène dépôt (rapide, faible risque).**
4. Supprimer code mort + cruft + 2 `.bat` obsolètes.
5. Élaguer les branches mergées.
6. Rendre `npm run lint` vert ; trancher le sort des tests.

**Lot C — Correctifs ciblés.**
7. Sitemap `date`→`publishedAt`.
8. 404 (404.html ou rewrite).
9. Claim « 5/5 étoiles » + typo Studio.
10. Mise à jour de la doc projet.

**Lot D — Optionnel / fond.**
11. `landing_page` : câbler ou clarifier.
12. Sanity TypeGen.

Chaque lot = une branche + une PR séparée, validation `tsc` (=0) + `build` avant merge, et vérification du statut Vercel « Ready » après merge (conformément aux règles anti-récidive de la doc).

---

## 13. Questions avant implémentation

1. **OneDrive (AXE 3, chantier structurel A).** Es-tu d'accord pour qu'on planifie le déplacement du dépôt hors OneDrive (ex. `C:\dev\`) ? C'est le correctif racine — mais il faut que Stéphanie et toi ouvriez désormais le projet depuis le nouveau chemin. Ou préfères-tu d'abord seulement le filet CI et garder OneDrive pour l'instant ?
2. **CI GitHub Actions (A).** OK pour que j'ajoute un workflow qui bloque/alerte sur `tsc`/`build`/`lint` rouge ? (Aucun impact sur `deploy.bat`, qui continue de fonctionner.)
3. **Tests (AXE 5).** On *réactive* `src/test/ssg-seo.test.ts` (et on le branche en CI), ou on *supprime* Vitest et le dossier `test/` ? (Réactiver = meilleur garde-fou SEO, mais un peu plus de travail pour rendre le test vert.)
4. **Claim « 5/5 étoiles » (AXE 9).** Le retirer, ou tu as une source d'avis vérifiables (Google/Doctolib) à afficher à la place ?
5. **Périmètre de cette session.** Une fois tes réponses reçues, tu veux que j'attaque directement le Lot A + Lot B, ou seulement te livrer un plan d'implémentation détaillé d'abord ?

---

*Fin du rapport. Audit en lecture seule — aucun fichier de code modifié.*
