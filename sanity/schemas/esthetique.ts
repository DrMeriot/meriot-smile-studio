import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'esthetique',
  title: 'Esthétique dentaire',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero — Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'introTitre', title: 'Introduction — Titre', type: 'string' }),
    defineField({ name: 'introTexte1', title: 'Introduction — Texte 1', type: 'text', rows: 4 }),
    defineField({ name: 'introTexte2', title: 'Introduction — Texte 2', type: 'text', rows: 4 }),
    defineField({ name: 'solutionsTitre', title: 'Solutions — Titre', type: 'string' }),
    defineField({
      name: 'solutionsList',
      title: 'Solutions — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'items', title: 'Détails', type: 'array', of: [{ type: 'string' }] }),
        ],
      }],
    }),
    defineField({ name: 'approcheTitre', title: 'Approche — Titre', type: 'string' }),
    defineField({ name: 'approcheTexte1', title: 'Approche — Texte 1', type: 'text', rows: 4 }),
    defineField({ name: 'approcheTexte2', title: 'Approche — Texte 2', type: 'text', rows: 4 }),
    defineField({ name: 'crosslinksTitre', title: 'Crosslinks — Titre', type: 'string' }),
    defineField({ name: 'ctaTitre', title: 'CTA — Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA — Texte', type: 'text', rows: 3 }),
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 3 }),
  ],
})
