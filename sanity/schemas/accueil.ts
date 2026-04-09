import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'accueil',
  title: 'Page d\'accueil',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero — Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Hero — Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroCtaText', title: 'Hero — Texte du bouton', type: 'string' }),
    defineField({ name: 'heroCtaUrl', title: 'Hero — Lien du bouton', type: 'url' }),
    defineField({ name: 'temoignagesTitle', title: 'Témoignages — Titre', type: 'string' }),
    defineField({
      name: 'temoignages',
      title: 'Témoignages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'nom', title: 'Nom', type: 'string' }),
          defineField({ name: 'rating', title: 'Note (1-5)', type: 'number', validation: r => r.min(1).max(5) }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
          defineField({ name: 'date', title: 'Date', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'faqTitle', title: 'FAQ — Titre', type: 'string' }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 4 }),
        ],
      }],
    }),
  ],
})
