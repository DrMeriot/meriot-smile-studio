import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'implantologie',
  title: 'Implantologie',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero - Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero - Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'definitionTitre', title: 'Définition - Titre', type: 'string' }),
    defineField({ name: 'definitionTexte1', title: 'Définition - Paragraphe 1', type: 'text', rows: 4 }),
    defineField({ name: 'definitionTexte2', title: 'Définition - Paragraphe 2', type: 'text', rows: 4 }),
    defineField({ name: 'avantagesTitre', title: 'Avantages - Titre', type: 'string' }),
    defineField({
      name: 'avantagesList', title: 'Avantages', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'desc', title: 'Description', type: 'text', rows: 2 },
      ], preview: { select: { title: 'title' } } }]
    }),
    defineField({ name: 'etapesTitre', title: 'Étapes - Titre', type: 'string' }),
    defineField({
      name: 'etapesList', title: 'Étapes', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'step', title: 'N° étape', type: 'string' },
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'desc', title: 'Description', type: 'text', rows: 3 },
      ], preview: { select: { title: 'title', subtitle: 'step' } } }]
    }),
    defineField({ name: 'infosTitre', title: 'Infos pratiques - Titre', type: 'string' }),
    defineField({
      name: 'infosList', title: 'Infos pratiques', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'desc', title: 'Description', type: 'text', rows: 2 },
      ], preview: { select: { title: 'title' } } }]
    }),
    defineField({ name: 'lienParoTitre', title: 'Lien Paro - Titre', type: 'string' }),
    defineField({ name: 'lienParoTexte', title: 'Lien Paro - Texte', type: 'text', rows: 3 }),
    defineField({ name: 'faqTitre', title: 'FAQ - Titre', type: 'string' }),
    defineField({
      name: 'faqList', title: 'FAQ', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'question', title: 'Question', type: 'string' },
        { name: 'answer', title: 'Réponse', type: 'text', rows: 4 },
      ], preview: { select: { title: 'question' } } }]
    }),
    defineField({ name: 'ctaTitre', title: 'CTA - Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA - Texte', type: 'text', rows: 2 }),
    defineField({ name: 'seoTitle', title: 'SEO - Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO - Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: '🔩 Implantologie' }) }
})
