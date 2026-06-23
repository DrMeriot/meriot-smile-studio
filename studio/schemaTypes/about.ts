import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'À propos',
  type: 'document',
  fields: [
    // ===== Section Équipe (haut de la page) =====
    defineField({ name: 'equipePhoto', title: 'Équipe - Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'equipeDescription', title: 'Équipe - Description', type: 'text', rows: 5 }),

    // ===== Dr Stéphanie Meriot (praticienne principale) =====
    defineField({ name: 'meriotPhoto', title: 'Dr Meriot - Photo', type: 'image', options: { hotspot: true } }),
    // heroSubtitle conservé en type 'text' (version repo — plus flexible que string)
    defineField({ name: 'heroSubtitle', title: 'Hero - Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'heroDescription', title: 'Hero - Description', type: 'text', rows: 4 }),
    defineField({ name: 'formationsTitre', title: 'Formations - Titre', type: 'string' }),
    defineField({
      name: 'formationsList', title: 'Formations', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        // desc conservé en type 'text' (plus flexible pour descriptions longues)
        { name: 'desc', title: 'Description', type: 'text', rows: 2 },
      ], preview: { select: { title: 'title' } } }]
    }),
    defineField({ name: 'confianceTitre', title: 'Confiance - Titre', type: 'string' }),
    defineField({
      name: 'confianceList', title: 'Éléments de confiance', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'desc', title: 'Description', type: 'text', rows: 2 },
      ], preview: { select: { title: 'title' } } }]
    }),
    defineField({ name: 'philosophieTitre', title: 'Philosophie - Titre', type: 'string' }),
    defineField({
      name: 'philosophieList', title: 'Valeurs / Philosophie', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'desc', title: 'Description', type: 'text', rows: 2 },
      ], preview: { select: { title: 'title' } } }]
    }),
    defineField({ name: 'citation', title: 'Citation', type: 'text', rows: 3 }),

    // ===== Dr Patrick Mateo (2e praticien) =====
    defineField({ name: 'mateoNom', title: 'Dr Mateo - Nom', type: 'string' }),
    defineField({ name: 'mateoPhoto', title: 'Dr Mateo - Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'mateoDescription', title: 'Dr Mateo - Description', type: 'text', rows: 6 }),

    // ===== Claire (assistante) =====
    defineField({ name: 'claireNom', title: 'Claire - Nom', type: 'string' }),
    defineField({ name: 'clairePhoto', title: 'Claire - Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'claireDescription', title: 'Claire - Description', type: 'text', rows: 6 }),

    // ===== SEO =====
    defineField({ name: 'seoTitle', title: 'SEO - Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO - Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: '👩‍⚕️ À propos' }) }
})
