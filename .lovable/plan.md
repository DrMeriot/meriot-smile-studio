

# Create Sanity Studio schemas for all pages

## Context

The frontend already reads flat Sanity fields with fallbacks. Now we need to create the corresponding Sanity Studio schema files so the practitioner can edit content.

These schemas will be created in a `sanity/schemas/` directory at the project root. They can be copied into the Sanity Studio project.

## Schema files to create

### 1. `sanity/schemas/global.ts` — Singleton
Fields from `useGlobalSettings()` across all components:
- `nom_praticien` (string)
- `phone` (string)
- `adresse` (string)
- `doctolib` (url)

### 2. `sanity/schemas/accueil.ts` — Singleton
Fields from Hero.tsx, Testimonials.tsx, FAQ.tsx, Services component:
- `heroTitle` (string)
- `heroSubtitle` (text)
- `heroImage` (image)
- `heroCtaText` (string)
- `heroCtaUrl` (url)
- `temoignagesTitle` (string)
- `temoignages` (array of object: `{nom, rating, texte, date}`) — **exception: keeps `titre`/`description` naming from legacy**
- `faqTitle` (string)
- `faq` (array of object: `{question, reponse}`)

### 3. `sanity/schemas/parodontie.ts` — Singleton
All 26 fields from Parodontie.tsx:
- `heroTitle`, `heroSubtitle` (string/text)
- `definitionTitre`, `definitionTexte1`, `definitionTexte2` (string/text)
- `symptomesTitre` (string), `symptomesList` (array of `{title, desc}`)
- `maladiesTitre`, `maladiesIntro` (string/text)
- `gingiviteTitre`, `gingiviteTexte`, `gingiviteItems` (array of string), `gingiviteNote` (text)
- `parodontiteTitre`, `parodontiteTexte`, `parodontiteItems` (array of string), `parodontiteNote` (text)
- `traitementsTitre`, `traitementsIntro` (string/text), `traitementsList` (array of `{title, desc, items, note}`)
- `faqTitre` (string), `faqList` (array of `{question, answer}`)
- `crosslinksTitre`, `ctaTitre`, `ctaTexte` (string/text)
- `seoTitle`, `seoDescription` (string/text)

### 4. `sanity/schemas/implantologie.ts` — Singleton
18 fields from Implantologie.tsx:
- `heroTitle`, `heroSubtitle`
- `definitionTitre`, `definitionTexte1`, `definitionTexte2`
- `avantagesTitre`, `avantagesList` (array of `{title, desc}`)
- `etapesTitre`, `etapesList` (array of `{step, title, desc}`)
- `infosTitre`, `infosList` (array of `{title, desc}`)
- `lienParoTitre`, `lienParoTexte`
- `faqTitre`, `faqList` (array of `{question, answer}`)
- `ctaTitre`, `ctaTexte`
- `seoTitle`, `seoDescription`

### 5. `sanity/schemas/esthetique.ts` — Singleton
14 fields from Esthetique.tsx:
- `heroTitle`, `heroSubtitle`
- `introTitre`, `introTexte1`, `introTexte2`
- `solutionsTitre`, `solutionsList` (array of `{title, desc, items}`)
- `approcheTitre`, `approcheTexte1`, `approcheTexte2`
- `crosslinksTitre`, `ctaTitre`, `ctaTexte`
- `seoTitle`, `seoDescription`

### 6. `sanity/schemas/services_page.ts` — Singleton
- `heroTitle`, `heroSubtitle`
- `servicesList` (array of `{title, description, details: [{subtitle, text}], featured}`)
- `ctaTitre`, `ctaTexte`
- `seoTitle`, `seoDescription`

### 7. `sanity/schemas/tarifs.ts` — Singleton
- `heroTitle`, `heroSubtitle`
- `secteurTitre`, `secteurItems` (array of string)
- `tarifsTitre`, `consultation`, `implant`, `blanchiment`, `parodontieInfo`
- `devisTitre`, `devisTexte`
- `remboursementsTitre`, `remboursementsList` (array of `{title, desc}`)
- `ctaTitre`, `ctaTexte`
- `seoTitle`, `seoDescription`

### 8. `sanity/schemas/about.ts` — Singleton
- `heroSubtitle`, `heroDescription`
- `formationsTitre`, `formationsList` (array of `{title, desc}`)
- `confianceTitre`, `confianceList` (array of `{title, desc}`)
- `philosophieTitre`, `philosophieList` (array of `{title, desc}`)
- `citation`
- `seoTitle`, `seoDescription`

### 9. `sanity/schemas/contact.ts` — Singleton
- `heroTitle`, `heroSubtitle`
- `seoTitle`, `seoDescription`

### 10. `sanity/schemas/legal.ts` — Singleton
- `titre`, `rpps`, `diplomesList` (array of string), `conditionsTexte`, `hebergeur`
- `seoTitle`, `seoDescription`

### 11. `sanity/schemas/confidentialite.ts` — Singleton
- `titre`, `introTexte`
- `seoTitle`, `seoDescription`

### 12. `sanity/schemas/index.ts` — Barrel export

## Conventions applied
- All fields flat — no nested objects
- Array fields use `List` suffix
- Array items use `title` and `desc` (not `titre`/`description`)
- **Exception**: `accueil.temoignages` keeps `nom`/`texte` and `accueil.faq` keeps `question`/`reponse` (legacy)
- French labels throughout for the Studio UI
- Each schema is a Sanity `document` type with singleton pattern
- SEO fields grouped at the bottom of each schema

