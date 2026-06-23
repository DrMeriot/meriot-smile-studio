import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'parodontie',
  title: 'Parodontie',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero - Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero - Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'definitionTitre', title: 'Définition - Titre', type: 'string' }),
    defineField({ name: 'definitionTexte1', title: 'Définition - Paragraphe 1', type: 'text', rows: 4 }),
    defineField({ name: 'definitionTexte2', title: 'Définition - Paragraphe 2', type: 'text', rows: 4 }),
    defineField({ name: 'symptomesTitre', title: 'Symptômes - Titre', type: 'string' }),
    defineField({
      name: 'symptomesList', title: 'Symptômes', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'desc', title: 'Description', type: 'text', rows: 2 },
      ], preview: { select: { title: 'title' } } }]
    }),
    defineField({ name: 'approcheTitre', title: 'Approche - Titre', type: 'string' }),
    defineField({ name: 'approcheTexte', title: 'Approche - Texte (simple)', type: 'text', rows: 8 }),
    defineField({ name: 'approcheBody', title: 'Approche - Contenu (texte riche)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'zonesTitre', title: 'Zone d\'intervention - Titre', type: 'string' }),
    defineField({
      name: 'zonesList', title: 'Zone d\'intervention - Cartes', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'titre', title: 'Titre', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
      ], preview: { select: { title: 'titre' } } }]
    }),
    defineField({ name: 'maladiesTitre', title: 'Maladies - Titre', type: 'string' }),
    defineField({ name: 'maladiesIntro', title: 'Maladies - Intro', type: 'text', rows: 3 }),
    defineField({ name: 'gingiviteTitre', title: 'Gingivite - Titre', type: 'string' }),
    defineField({ name: 'gingiviteTexte', title: 'Gingivite - Texte', type: 'text', rows: 3 }),
    defineField({ name: 'gingiviteItems', title: 'Gingivite - Items', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'gingiviteNote', title: 'Gingivite - Note', type: 'text', rows: 2 }),
    defineField({ name: 'parodontiteTitre', title: 'Parodontite - Titre', type: 'string' }),
    defineField({ name: 'parodontiteTexte', title: 'Parodontite - Texte', type: 'text', rows: 3 }),
    defineField({ name: 'parodontiteItems', title: 'Parodontite - Items', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'parodontiteNote', title: 'Parodontite - Note', type: 'text', rows: 2 }),
    defineField({ name: 'traitementsTitre', title: 'Traitements - Titre', type: 'string' }),
    defineField({ name: 'traitementsIntro', title: 'Traitements - Intro', type: 'text', rows: 3 }),
    defineField({
      name: 'traitementsList', title: 'Traitements', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'step', title: 'N° étape', type: 'string' },
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'desc', title: 'Description', type: 'text', rows: 3 },
        { name: 'items', title: 'Sous-items', type: 'array', of: [{ type: 'string' }] },
        { name: 'note', title: 'Note', type: 'text', rows: 2 },
      ], preview: { select: { title: 'title', subtitle: 'step' } } }]
    }),
    defineField({ name: 'faqTitre', title: 'FAQ - Titre', type: 'string' }),
    defineField({
      name: 'faqList', title: 'FAQ', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'question', title: 'Question', type: 'string' },
        { name: 'answer', title: 'Réponse', type: 'text', rows: 4 },
      ], preview: { select: { title: 'question' } } }]
    }),
    defineField({ name: 'crosslinksTitre', title: 'Crosslinks - Titre', type: 'string' }),
    defineField({ name: 'ctaTitre', title: 'CTA - Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA - Texte', type: 'text', rows: 2 }),
    defineField({ name: 'seoTitle', title: 'SEO - Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO - Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: '🦷 Parodontie' }) }
})
