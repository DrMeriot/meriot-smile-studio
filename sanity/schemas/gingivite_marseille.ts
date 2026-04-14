import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gingivite_marseille',
  title: 'Gingivite Marseille',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero — Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'definitionTitre', title: 'Définition — Titre', type: 'string' }),
    defineField({ name: 'definitionTexte1', title: 'Définition — Texte 1', type: 'text', rows: 4 }),
    defineField({ name: 'definitionTexte2', title: 'Définition — Texte 2', type: 'text', rows: 4 }),
    defineField({ name: 'causesTitre', title: 'Causes — Titre', type: 'string' }),
    defineField({
      name: 'causesList',
      title: 'Causes — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
        ],
      }],
    }),
    defineField({ name: 'symptomesTitre', title: 'Symptômes — Titre', type: 'string' }),
    defineField({
      name: 'symptomesList',
      title: 'Symptômes — Liste',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'traitementTitre', title: 'Traitement — Titre', type: 'string' }),
    defineField({ name: 'traitementTexte', title: 'Traitement — Texte', type: 'text', rows: 4 }),
    defineField({ name: 'preventionTitre', title: 'Prévention — Titre', type: 'string' }),
    defineField({ name: 'preventionTexte', title: 'Prévention — Texte', type: 'text', rows: 4 }),
    defineField({ name: 'faqTitre', title: 'FAQ — Titre', type: 'string' }),
    defineField({
      name: 'faqList',
      title: 'FAQ — Questions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Réponse', type: 'text', rows: 4 }),
        ],
      }],
    }),
    defineField({ name: 'ctaTitre', title: 'CTA — Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA — Texte', type: 'text', rows: 3 }),
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 3 }),
  ],
})
