
# Plan SEO révisé — Priorité Parodontie (selon tes retours)

## Décisions actées

| Sujet | Décision |
|---|---|
| Titre Dr Meriot | **Garder "Chirurgien-dentiste"** + ajout possible : *"Spécialisée en parodontie"* ou *"Spécialiste des gencives"* |
| Page `/parodontologue-marseille` | **Abandonnée** — on capitalise sur la page `/parodontie` existante |
| Page "Pourquoi choisir un parodontologue" | **Abandonnée** |
| Tarifs parodontie | **Pas de page tarifs dédiée** |
| Témoignages parodontie | **OK** — créer mais **sans entrée dans la navigation** principale |
| Articles blog (Phase 2.1) | **Plus tard** |
| Pages géo (Aix, Aubagne…) | **Validation par les données Search Console avant création** |

---

## Phase 1 — Quick wins on-page (validés)

### 1.1 Optimisation de l'accueil — version recadrée
- **H1 Hero** (au lieu de la version "parodontologue") :  
  *"Dr Stéphanie Meriot — Chirurgien-dentiste, spécialisée en parodontie et implantologie à Marseille"*
- **Title `/`** :  
  *"Dr Meriot — Chirurgien-dentiste spécialiste des gencives | Marseille 4ème"*
- **Meta description** : intégrer "spécialiste des gencives", "traitement parodontite", "Marseille 4ème", CTA RDV.
- **Sous-titre Hero** : insister sur "Spécialiste des gencives — Parodontie & Implantologie".
- Texte praticien (`Practitioner.tsx`) : reformuler pour intégrer naturellement *"chirurgien-dentiste spécialisée en parodontie"*.

> Le mot-clé `parodontologue` reste utilisé dans les balises ALT, schémas `medicalSpecialty: Periodontics` et le contenu de `/parodontie`, mais **jamais comme titre** de Dr Meriot.

### 1.2 Maillage interne renforcé — OK
- **Footer** : nouvelle colonne "Parodontie" avec liens vers `/parodontie`, `/gingivite-marseille`, `/dechaussement-dentaire-marseille`, `/gencives-qui-saignent` + 1-2 articles blog parodontie phares.
- **QuickLinks** (home) : conserver les 2 cartes Parodontie/Implantologie en grand, ajouter une rangée secondaire avec les 3 sous-thématiques parodontie (gingivite / déchaussement / saignements).
- **Composant `RelatedParodontieLinks`** réutilisable, injecté en bas des articles blog catégorie "Parodontie" → liens vers `/parodontie` + landing pertinente.
- **Header mobile** : sous-groupe parodontie dans le menu (sans surcharger le desktop).

### 1.3 Schémas E-E-A-T — OK
- **`PersonSchema`** : Dr Stéphanie Meriot, `jobTitle: "Chirurgien-dentiste spécialisée en parodontie et implantologie"`, `medicalSpecialty: ["Periodontics", "Dentistry"]`, `worksFor: <Cabinet>`, `sameAs` (Doctolib, etc.).  
  Injecté sur `/`, `/a-propos`, `/parodontie`.
- **`LocalBusinessSchema` enrichi** : `availableService` listant les actes parodontaux comme `MedicalProcedure` (Bilan parodontal, Détartrage-surfaçage, Greffe gingivale, Régénération osseuse guidée, Suivi parodontal).

### 1.4 Nettoyage technique — OK
- Supprimer `public/sitemap.xml` statique (le plugin génère `dist/sitemap.xml` à chaque build → évite les divergences).
- Vérifier `canonical` cohérent sur toutes les pages parodontie.
- Audit images des landings parodontie : `loading="lazy"` (sauf hero LCP), `width`/`height`, `alt` enrichis ("Cabinet parodontie Marseille — Dr Meriot examine les gencives").

---

## Phase 2 — Adaptations sans nouvelles pages (réponse à ton refus de nouvelle page)

### 2.2 Alternative à la page pilier "Parodontologue Marseille"
**Au lieu de créer `/parodontologue-marseille`, on muscle la page `/parodontie` existante :**

- **Renforcer le H1** : *"Parodontie à Marseille — Dr Meriot, chirurgien-dentiste spécialiste des gencives"*.
- Ajouter une **section "Notre approche & expertise"** intégrant le mot-clé `parodontologue` dans le corps du texte (sans l'utiliser comme titre du praticien).
- Ajouter une **section "Zone d'intervention"** : Marseille 4e/6e/7e/8e + mention PACA (Pays d'Aix, Aubagne, La Ciotat, Côte Bleue, Étang de Berre) → couvre la longue traîne géo sans créer de pages.
- **FAQ enrichie** avec 2-3 questions ciblées : *"Quelle différence entre dentiste et parodontologue ?"*, *"Quand consulter un spécialiste des gencives ?"*, *"Faut-il une ordonnance pour voir un parodontologue ?"*.
- **Title /parodontie** retravaillé : *"Parodontie Marseille — Spécialiste des gencives | Dr Meriot"*.

→ On capte les requêtes `parodontologue Marseille`, `spécialiste gencives Marseille` sur la page existante, sans inflation de pages.

### 2.4 Page témoignages parodontie (créée, mais cachée de la navigation)
- **Route** : `/parodontie/temoignages` (sous-chemin sémantique) — ajoutée à `STATIC_ROUTES` du sitemap (priority 0.6) mais **absente du Header et du menu mobile**.
- **Accès** : 
  - Lien depuis la section "Témoignages" de la home (composant `Testimonials` existant) → "Voir tous les témoignages parodontie".
  - Lien depuis la page `/parodontie` (encart en bas).
  - Lien depuis le footer dans la colonne Parodontie.
- **Contenu** : 6–10 témoignages anonymisés (avec accord patient), structurés en `Review` + `aggregateRating` schema.org → renforce E-E-A-T (critère YMYL santé) et peut générer des étoiles dans les SERP.
- **Garde-fou** : la page a `noindex` désactivé (donc indexée), mais la nav reste épurée comme demandé.

---

## Phase 3 — Géo & longue traîne (validation par données)

### 3.1 Pages géo : critères de déclenchement avant création
**Avant de créer une page locale**, on valide via Search Console :
- **Seuil minimum** : ≥ **30 impressions/mois** sur la requête géo cible (ex: "parodontologue Aix") **OU** position moyenne **< 30** (signal d'intérêt latent).
- **Volume estimé** (ordres de grandeur, à confirmer avec un outil type Ahrefs/Semrush quand dispo) :
  - `parodontologue Aix-en-Provence` : ~50–80 recherches/mois
  - `parodontologue Aubagne` : ~20–30/mois  
  - `parodontologue La Ciotat` : ~10–20/mois
  - `parodontologue 13006` / `13008` : volume faible mais intention haute
- **Décision** :
  - **Phase d'observation 4-6 semaines** après mise en ligne des optimisations Phase 1+2 → relevé Search Console.
  - Création d'une page géo **uniquement si seuil atteint** + concurrence locale réaliste (pas plus de 2-3 cabinets bien positionnés).
  - Sinon, on enrichit simplement la section "Zone d'intervention" de `/parodontie` (Phase 2.2).

→ **Action immédiate** : configurer le suivi Search Console des 8-10 requêtes géo cibles dès la mise en ligne.

### 3.2 Mini-glossaire parodontie SEO — OK
- Étendre `ParoGlossary` avec **8-10 termes** : poche parodontale, parodonte, surfaçage, lambeau, récession, biotype gingival, sondage parodontal, bactéries anaérobies…
- Chaque entrée : ancre `#terme`, structure `<dl><dt><dd>`, schema `DefinedTerm` + `DefinedTermSet`.
- Liens depuis le glossaire vers les sections concernées de `/parodontie` et les landings.
- Bonus : capture des featured snippets sur "qu'est-ce que [terme parodontaire]".

---

## Phase 4 — Mesure & itération (inchangé)

- **Search Console** : suivi mensuel des positions sur 20 requêtes parodontie cibles.
- **Reporting trimestriel** : Core Web Vitals (LCP du Hero), CTR sur les pages parodontie, conversions Doctolib (si tracking en place).
- **Itération contenu** : déclencher Phase 2.1 (articles blog) quand tu seras prêt — priorité à *"Parodontite : 5 signes à ne jamais ignorer"* et *"Surfaçage radiculaire : tout savoir"*.

---

## Détails techniques (ordre d'exécution)

1. Suppression `public/sitemap.xml`.
2. `src/components/Hero.tsx` + `src/pages/Index.tsx` : nouveau H1 / title / meta description.
3. `src/components/Practitioner.tsx` : reformulation intégrant "spécialisée en parodontie".
4. `src/pages/Parodontie.tsx` : nouveau H1, ajout section "Notre approche", section "Zone d'intervention", FAQ enrichie (3 nouvelles questions).
5. `src/components/PersonSchema.tsx` : nouveau composant + injection `/`, `/a-propos`, `/parodontie`.
6. `src/components/LocalBusinessSchema.tsx` : enrichissement `availableService` (5 actes parodontaux).
7. `src/components/Footer.tsx` : nouvelle colonne "Parodontie" (4 landings + 1 lien témoignages).
8. `src/components/QuickLinks.tsx` : rangée secondaire avec 3 sous-thématiques parodontie.
9. `src/components/RelatedParodontieLinks.tsx` (nouveau) + intégration dans `BlogPost.tsx` (catégorie "Parodontie").
10. `src/pages/TemoignagesParodontie.tsx` (nouveau) + route `/parodontie/temoignages` dans `App.tsx` + `STATIC_ROUTES` (priority 0.6) — **non ajoutée au Header**. Liens depuis Home (`Testimonials`), `/parodontie`, Footer.
11. `src/components/ParoGlossary.tsx` : extension à 8-10 termes + ancres + schema `DefinedTerm`.
12. Audit images : `loading="lazy"`, `width/height`, alt enrichis (Hero, Practitioner, 3 landings parodontie).
13. Tests : `vitest run src/test/ssg-seo.test.ts` + ajout tests (présence `PersonSchema`, route `/parodontie/temoignages` pré-rendue, glossaire ≥ 8 entrées).

---

## Question avant exécution

Je propose de tout exécuter en **un seul build** (Phases 1 + 2.2 + 2.4 + 3.2). Estimation : ~15 modifications de fichiers, 2 créations, ~30 min de travail.

Confirmes-tu **« go »** sur ce plan révisé ?  
(Le suivi Phase 3.1 — pages géo — sera déclenché plus tard, sur la base des données Search Console après 4-6 semaines.)
