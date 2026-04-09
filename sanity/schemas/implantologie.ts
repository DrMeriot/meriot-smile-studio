import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'implantologie',
  title: 'Implantologie',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero — Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'definitionTitre', title: 'Définition — Titre', type: 'string' }),
    defineField({ name: 'definitionTexte1', title: 'Définition — Texte 1', type: 'text', rows: 4 }),
    defineField({ name: 'definitionTexte2', title: 'Définition — Texte 2', type: 'text', rows: 4 }),
    defineField({ name: 'avantagesTitre', title: 'Avantages — Titre', type: 'string' }),
    defineField({
      name: 'avantagesList',
      title: 'Avantages — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
        ],
      }],
    }),
    defineField({ name: 'etapesTitre', title: 'Étapes — Titre', type: 'string' }),
    defineField({
      name: 'etapesList',
      title: 'Étapes — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'step', title: 'Numéro', type: 'string' }),
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
        ],
      }],
    }),
    defineField({ name: 'infosTitre', title: 'Infos pratiques — Titre', type: 'string' }),
    defineField({
      name: 'infosList',
      title: 'Infos pratiques — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
        ],
      }],
    }),
    defineField({ name: 'lienParoTitre', title: 'Lien parodontie — Titre', type: 'string' }),
    defineField({ name: 'lienParoTexte', title: 'Lien parodontie — Texte', type: 'text', rows: 4 }),
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
