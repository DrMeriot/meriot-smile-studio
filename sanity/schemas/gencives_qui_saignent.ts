import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gencives_qui_saignent',
  title: 'Gencives qui saignent',
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
    defineField({ name: 'quandConsulterTitre', title: 'Quand consulter — Titre', type: 'string' }),
    defineField({
      name: 'quandConsulterList',
      title: 'Quand consulter — Liste',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'traitementTitre', title: 'Traitement — Titre', type: 'string' }),
    defineField({ name: 'traitementTexte', title: 'Traitement — Texte', type: 'text', rows: 4 }),
    defineField({ name: 'conseilsTitre', title: 'Conseils — Titre', type: 'string' }),
    defineField({
      name: 'conseilsList',
      title: 'Conseils — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
        ],
      }],
    }),
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
