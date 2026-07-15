# Prompt — Nouvelle session : audit complet du site + recos « rendre plus propre à travailler »

> À copier-coller tel quel au début d'une nouvelle session Cowork sur le projet `meriot-smile-studio`.

---

Reprends le projet **meriot-smile-studio** (dossier connecté). **Commence par lire `CLAUDE-PROJECT-DOC.md` en entier** : il contient tout l'historique, l'architecture, les pièges et les décisions. Lis aussi `package.json`, `vite.config.ts`, `vercel.json`, `src/App.tsx`, le dossier `studio/schemaTypes/`, et survole `src/pages` et `src/components`.

## Objectif
Faire une **analyse complète du site et du code**, puis produire des **recommandations priorisées pour rendre le projet beaucoup plus propre, fiable et agréable à faire évoluer** (maintenabilité, robustesse des déploiements, cohérence du contenu). 

**Cette session est d'abord un AUDIT en lecture seule : ne modifie rien sans me demander.** Le livrable est un rapport écrit ; l'implémentation viendra après, lot par lot, sur ma validation.

## Contexte technique (à vérifier, pas à supposer)
- Stack : React + TypeScript, **Vite + vite-react-ssg** (rendu statique SSG), Tailwind + shadcn/ui, CMS **Sanity** (projet `6a2np8jy`, dataset `production`), déploiement **Vercel** via `deploy.bat` (push `main` → build Vercel).
- Pattern de contenu : `sanity?.champ ?? "défaut codé en dur"` partout (fallback). Donc « éditable » ≠ « rempli ».
- ⚠️ **Environnement fragile** : le dossier est sur **OneDrive**, qui **tronque des fichiers** lors d'écritures via éditeur et **verrouille `.git`** (`debloquer-git.bat` existe pour ça). Toute écriture doit se faire via script vers /tmp → validation → copie avec vérification (nb lignes + dernière ligne) → `tsc`.
- ⚠️ **Piège déjà vécu** : un fichier tronqué (`Parodontie.tsx`) a fait **échouer silencieusement 7 builds Vercel** ; le site restait figé sur une vieille version pendant que `git push` réussissait. Donc : `tsc --noEmit -p tsconfig.app.json` doit être à **0 erreur**, et **vérifier le statut du build sur Vercel** (doit être « Ready », pas « Error ») fait partie de toute validation.

## Axes à auditer (au minimum)
1. **Architecture & structure** : organisation des dossiers, cohérence des composants/pages, code mort ou dupliqué (ex. `components/About.tsx` signalé comme non importé), composants trop gros.
2. **Modèle de contenu Sanity** : cohérence schémas ↔ composants, champs orphelins (lus mais absents / définis mais jamais lus), doublons, le pattern fallback (faut-il le garder, le rationaliser ?), contenu encore en dur qui devrait être éditable vs micro-labels à laisser.
3. **Fiabilité du build & déploiement** : pourquoi les builds cassent, comment rendre ça robuste (CI/检查 avant push ? `tsc` en pre-commit ? un check Vercel ?), revoir le workflow `.bat` et la fragilité OneDrive (faut-il sortir le repo de OneDrive ?).
4. **Santé TypeScript** : config tsc, erreurs réelles vs bruit, typage du boundary Sanity (actuellement `any`).
5. **Tests** : y en a-t-il ? (`vitest.config.ts` existe) Que faudrait-il de minimal pour sécuriser les refactors ?
6. **SEO / AEO** : métadonnées, sitemap, redirections, données structurées (JSON-LD), maillage interne, cohérence des canonicals, la 404 (actuellement Vercel renvoie une 404 générique en anglais).
7. **Accessibilité & performance** : images, contrastes, tailles de cibles, poids des bundles.
8. **Sécurité & config** : en-têtes (`vercel.json`), gestion des secrets (`.env.local`, token Sanity), dépendances obsolètes.
9. **Dette diverse** : scripts `.bat` obsolètes à supprimer, docs SEO restées sur une branche feature, typos de contenu.

## Livrable attendu
Un rapport `AUDIT-SITE-2026-06.md` (écris-le via script + vérifie qu'il n'est pas tronqué), structuré ainsi :
- **Synthèse** (3-5 points clés) ;
- **Constats par axe**, avec preuves (fichiers/lignes concrets) ;
- **Recommandations priorisées** en deux groupes : **quick wins** (faible effort / fort impact) et **chantiers structurels**, chacun avec effort estimé, impact, et risque ;
- **Une recommandation forte et argumentée** sur le point n°3 (fiabilité build/OneDrive), car c'est le sujet qui m'a le plus coûté.

Termine par une **proposition de plan** (par quoi commencer) et **pose-moi les questions** nécessaires avant toute implémentation.
