

# Make all site content editable via Sanity

## Approach

For each page, replace every hardcoded text with `page?.fieldName ?? "current hardcoded text"`. Add `useSanityPage()` where missing. Arrays use `page?.field ?? defaultArray` pattern. No design or structure changes.

A new Sanity query is needed for `contact` page type (add to `sanityQueries.ts` and `useSanityContent.ts`).

## Files to modify

1. **src/lib/sanityQueries.ts** — add `contactQuery` and `confidentialiteQuery`
2. **src/hooks/useSanityContent.ts** — add `contact` and `confidentialite` to `queryMap`
3. **src/pages/Parodontie.tsx** — wire all sections to Sanity fields
4. **src/pages/Implantologie.tsx** — wire all sections to Sanity fields
5. **src/pages/Esthetique.tsx** — wire all sections to Sanity fields
6. **src/pages/Services.tsx** — add `useSanityPage("services_page")`, wire fields
7. **src/pages/Tarifs.tsx** — wire remaining hardcoded texts
8. **src/pages/About.tsx** — wire all sections to Sanity fields
9. **src/pages/ContactPage.tsx** — add `useSanityPage("contact")`, wire hero texts
10. **src/pages/MentionsLegales.tsx** — add `useSanityPage("legal")`, wire texts
11. **src/pages/Confidentialite.tsx** — add `useSanityPage("confidentialite")`, wire texts

---

## Complete field list per page

### PAGE: parodontie
- heroTitle (string): "Parodontie à Marseille"
- heroSubtitle (text): "Spécialiste en parodontie, je prends soin de la santé de vos gencives et des tissus de soutien de vos dents. Formation approfondie à l'Académie de paro à Aix-en-Provence."
- definitionTitre (string): "Qu'est-ce que la parodontie ?"
- definitionTexte1 (text): "La parodontie est la spécialité dentaire qui traite les maladies des gencives..."
- definitionTexte2 (text): "Sans traitement, les maladies parodontales peuvent entraîner..."
- symptomesTitre (string): "Symptômes à surveiller"
- symptomesList (array of {title, desc}): [{title: "Gencives qui saignent", desc: "Au brossage..."}, ...]
- maladiesTitre (string): "Les maladies parodontales : comprendre simplement"
- maladiesIntro (text): "Les maladies parodontales touchent les tissus..."
- gingiviteTitre (string): "La gingivite : le premier signe d'alerte"
- gingiviteTexte (text): "La gingivite est une inflammation de la gencive..."
- gingiviteItems (array of string): ["des gencives rouges, gonflées,", ...]
- gingiviteNote (text): "La bonne nouvelle : la gingivite est totalement réversible..."
- parodontiteTitre (string): "La parodontite : quand l'inflammation va plus loin"
- parodontiteTexte (text): "Si la gingivite n'est pas traitée..."
- parodontiteItems (array of string): ["un déchaussement des dents,", ...]
- parodontiteNote (text): "La parodontite entraîne une perte de l'os..."
- traitementsTitre (string): "Les traitements parodontaux : comment soigne-t-on les gencives ?"
- traitementsIntro (text): "Les maladies des gencives se soignent très bien..."
- traitementsList (array of {title, desc, items, note}): [{title: "Un diagnostic complet...", desc: "...", items: [...], note: "..."}, ...]
- faqTitre (string): "Questions fréquentes sur la parodontie"
- faqList (array of {question, answer}): [current defaultFAQs]
- crosslinksTitre (string): "Découvrez nos autres spécialités"
- ctaTitre (string): "Prenez soin de vos gencives"
- ctaTexte (text): "N'attendez pas que les symptômes s'aggravent..."
- seoTitle (string): "Parodontie Marseille & PACA | Dr Stéphanie Meriot..."
- seoDescription (text): "Spécialiste parodontie à Marseille..."

### PAGE: implantologie
- heroTitle (string): "Implantologie à Marseille"
- heroSubtitle (text): "Solution moderne et durable pour remplacer vos dents manquantes..."
- definitionTitre (string): "Qu'est-ce qu'un implant dentaire ?"
- definitionTexte1 (text): "Un implant dentaire est une racine artificielle en titane..."
- definitionTexte2 (text): "Le titane est un matériau biocompatible..."
- avantagesTitre (string): "Les avantages des implants dentaires"
- avantagesList (array of {title, desc}): [{title: "Solution durable", desc: "..."}, ...]
- etapesTitre (string): "Les étapes de la pose d'implant dentaire"
- etapesList (array of {step, title, desc}): [{step: "1", title: "Consultation et bilan implantaire", desc: "..."}, ...]
- infosTitre (string): "Informations pratiques sur les implants"
- infosList (array of {title, desc}): [{title: "Douleur et confort", desc: "..."}, ...]
- lienParoTitre (string): "Parodontie et implantologie : un duo essentiel"
- lienParoTexte (text): "La réussite d'un implant dépend directement..."
- faqTitre (string): "Questions fréquentes sur les implants"
- faqList (array of {question, answer}): [current defaultFAQs]
- ctaTitre (string): "Retrouvez votre sourire complet"
- ctaTexte (text): "Prenez rendez-vous pour un bilan implantaire complet..."
- seoTitle (string): "Implants Dentaires Marseille | Dr Stéphanie Meriot..."
- seoDescription (text): "Pose d'implants dentaires à Marseille 4ème..."

### PAGE: esthetique
- heroTitle (string): "Esthétique dentaire à Marseille"
- heroSubtitle (text): "Retrouvez un sourire éclatant et harmonieux..."
- introTitre (string): "Un sourire qui vous ressemble"
- introTexte1 (text): "L'esthétique dentaire ne se limite pas à avoir des dents blanches..."
- introTexte2 (text): "Mon approche est naturelle et respectueuse..."
- solutionsTitre (string): "Nos solutions d'esthétique dentaire"
- solutionsList (array of {title, desc, items}): [{title: "Blanchiment dentaire professionnel", desc: "...", items: [...]}, ...]
- approcheTitre (string): "Une approche esthétique naturelle et respectueuse"
- approcheTexte1 (text): "Je crois en une esthétique naturelle..."
- approcheTexte2 (text): "Ma philosophie : dentisterie à minima..."
- crosslinksTitre (string): "Découvrez nos autres spécialités"
- ctaTitre (string): "Osez le sourire dont vous rêvez"
- ctaTexte (text): "Prenez rendez-vous pour une consultation esthétique..."
- seoTitle (string): "Esthétique Dentaire Marseille | Blanchiment & Facettes..."
- seoDescription (text): "Blanchiment dentaire, facettes et composites esthétiques..."

### PAGE: services_page
- heroTitle (string): "Nos services dentaires"
- heroSubtitle (text): "Du simple détartrage à la chirurgie implantaire..."
- servicesList (array of {title, description, details: [{subtitle, text}], featured}): [current servicesDetails array]
- ctaTitre (string): "Besoin d'un rendez-vous ?"
- ctaTexte (text): "Je serai ravie de vous accueillir dans mon cabinet."
- seoTitle (string): "Services Dentaires Marseille & PACA | Dr Stéphanie Meriot"
- seoDescription (text): "Services dentaires à Marseille..."

### PAGE: tarifs
- heroTitle (string): "Tarifs et remboursements"
- heroSubtitle (text): "Transparence et clarté sur nos honoraires..."
- secteurTitre (string): "Conventionnée Secteur 1"
- secteurItems (array of string): ["Carte Vitale acceptée", "Tiers payant Sécurité sociale", "Tarifs conventionnés", "Mutuelle"]
- tarifsTitre (string): "Tarifs indicatifs"
- consultation (string): "23€"
- implant (string): "950€"
- blanchiment (string): "400€"
- parodontieInfo (string): "Devis personnalisé selon la complexité"
- devisTitre (string): "Devis détaillés gratuits"
- devisTexte (text): "Pour tous les soins complexes, je vous remets un devis détaillé..."
- remboursementsTitre (string): "Remboursements et prise en charge"
- remboursementsList (array of {title, desc}): [{title: "Assurance Maladie", desc: "..."}, ...]
- ctaTitre (string): "Une question sur les tarifs ?"
- ctaTexte (text): "N'hésitez pas à me poser vos questions..."
- seoTitle (string): "Tarifs Dentiste Marseille & PACA | Secteur 1..."
- seoDescription (text): "Tarifs transparents cabinet Dr Meriot..."

### PAGE: about
- heroSubtitle (text): "Chirurgien-dentiste à Marseille 4ème, spécialisée en parodontie et implantologie."
- heroDescription (text): "Mon approche repose sur l'écoute, la douceur..."
- formationsTitre (string): "Parcours et formations"
- formationsList (array of {title, desc}): [{title: "Diplôme de chirurgien-dentiste", desc: "Faculté d'odontologie de Marseille"}, ...]
- confianceTitre (string): "Pourquoi me faire confiance ?"
- confianceList (array of {title, desc}): [{title: "Inscrite à l'Ordre", desc: "..."}, ...]
- philosophieTitre (string): "Ma philosophie de soins"
- philosophieList (array of {title, desc}): [{title: "Écoute et bienveillance", desc: "..."}, ...]
- citation (text): "Je crois en une dentisterie humaine et bienveillante..."
- seoTitle (string): "Dr Stéphanie Meriot | Dentiste Parodontie Implantologie Marseille"
- seoDescription (text): "Dr Stéphanie Meriot, chirurgien-dentiste à Marseille..."

### PAGE: contact
- heroTitle (string): "Contact & Accès"
- heroSubtitle (text): "Le cabinet du Dr Stéphanie Mériot est situé à Marseille 4ème..."
- seoTitle (string): "Contact & Accès | Cabinet Dentaire Dr Meriot Marseille 4ème"
- seoDescription (text): "Cabinet dentaire Dr Stéphanie Meriot à Marseille 4ème..."

### PAGE: legal
- titre (string): "Mentions légales"
- rpps (string): "10100720993"
- diplomesList (array of string): ["Docteur en chirurgie dentaire...", ...]
- conditionsTexte (text): "Le Dr Meriot exerce en secteur 1..."
- hebergeur (string): "Lovable.dev"
- seoTitle (string): "Mentions Légales | Cabinet Dentaire Dr Meriot Marseille"
- seoDescription (text): "Mentions légales du cabinet dentaire..."

### PAGE: confidentialite
- titre (string): "Politique de confidentialité"
- introTexte (text): "Le Dr Stéphanie Meriot accorde une grande importance..."
- sections (array of {titre, contenu}): [{titre: "Responsable du traitement", contenu: "..."}, ...] — or individual flat fields per section
- seoTitle (string): "Politique de Confidentialité RGPD | Dr Stéphanie Meriot Marseille"
- seoDescription (text): "Politique de confidentialité et protection des données..."

---

## Implementation notes

- For `Parodontie.tsx`: rename existing `page?.introTitle`/`page?.introText` to `page?.heroTitle`/`page?.heroSubtitle` for consistency, then add all other fields
- For `Implantologie.tsx`: same rename pattern, plus extract all inline arrays to `const defaultX = [...]` then use `page?.fieldName ?? defaultX`
- For `Services.tsx`: add `useSanityPage("services_page")`, extract `servicesDetails` to a default constant
- For `ContactPage.tsx` and `Confidentialite.tsx`: add `useSanityPage` imports and queries
- The `sanityQueries.ts` needs two new queries: `contactQuery` and `confidentialiteQuery`
- No changes to design, layout, icons, or component structure

