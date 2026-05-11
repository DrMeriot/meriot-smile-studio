import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'À propos',
  type: 'document',
  fields: [
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
    defineField({ name: 'seoTitle', title: 'SEO - Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO - Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: '👩‍⚕️ À propos' }) }
})
