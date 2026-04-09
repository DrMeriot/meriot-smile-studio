import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tarifs',
  title: 'Tarifs',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero — Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'secteurTitre', title: 'Secteur — Titre', type: 'string' }),
    defineField({
      name: 'secteurItems',
      title: 'Secteur — Éléments',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'tarifsTitre', title: 'Tarifs — Titre', type: 'string' }),
    defineField({ name: 'consultation', title: 'Tarif consultation', type: 'string' }),
    defineField({ name: 'implant', title: 'Tarif implant', type: 'string' }),
    defineField({ name: 'blanchiment', title: 'Tarif blanchiment', type: 'string' }),
    defineField({ name: 'parodontieInfo', title: 'Info parodontie', type: 'string' }),
    defineField({ name: 'devisTitre', title: 'Devis — Titre', type: 'string' }),
    defineField({ name: 'devisTexte', title: 'Devis — Texte', type: 'text', rows: 4 }),
    defineField({ name: 'remboursementsTitre', title: 'Remboursements — Titre', type: 'string' }),
    defineField({
      name: 'remboursementsList',
      title: 'Remboursements — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
        ],
      }],
    }),
    defineField({ name: 'ctaTitre', title: 'CTA — Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA — Texte', type: 'text', rows: 3 }),
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 3 }),
  ],
})
