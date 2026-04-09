import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'parodontie',
  title: 'Parodontie',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'heroTitle', title: 'Hero — Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    // Définition
    defineField({ name: 'definitionTitre', title: 'Définition — Titre', type: 'string' }),
    defineField({ name: 'definitionTexte1', title: 'Définition — Texte 1', type: 'text', rows: 4 }),
    defineField({ name: 'definitionTexte2', title: 'Définition — Texte 2', type: 'text', rows: 4 }),
    // Symptômes
    defineField({ name: 'symptomesTitre', title: 'Symptômes — Titre', type: 'string' }),
    defineField({
      name: 'symptomesList',
      title: 'Symptômes — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
        ],
      }],
    }),
    // Maladies
    defineField({ name: 'maladiesTitre', title: 'Maladies — Titre', type: 'string' }),
    defineField({ name: 'maladiesIntro', title: 'Maladies — Introduction', type: 'text', rows: 3 }),
    // Gingivite
    defineField({ name: 'gingiviteTitre', title: 'Gingivite — Titre', type: 'string' }),
    defineField({ name: 'gingiviteTexte', title: 'Gingivite — Texte', type: 'text', rows: 4 }),
    defineField({
      name: 'gingiviteItems',
      title: 'Gingivite — Symptômes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'gingiviteNote', title: 'Gingivite — Note', type: 'text', rows: 3 }),
    // Parodontite
    defineField({ name: 'parodontiteTitre', title: 'Parodontite — Titre', type: 'string' }),
    defineField({ name: 'parodontiteTexte', title: 'Parodontite — Texte', type: 'text', rows: 4 }),
    defineField({
      name: 'parodontiteItems',
      title: 'Parodontite — Conséquences',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'parodontiteNote', title: 'Parodontite — Note', type: 'text', rows: 3 }),
    // Traitements
    defineField({ name: 'traitementsTitre', title: 'Traitements — Titre', type: 'string' }),
    defineField({ name: 'traitementsIntro', title: 'Traitements — Introduction', type: 'text', rows: 3 }),
    defineField({
      name: 'traitementsList',
      title: 'Traitements — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'items', title: 'Détails', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'note', title: 'Note', type: 'text', rows: 2 }),
        ],
      }],
    }),
    // FAQ
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
    // Crosslinks & CTA
    defineField({ name: 'crosslinksTitre', title: 'Crosslinks — Titre', type: 'string' }),
    defineField({ name: 'ctaTitre', title: 'CTA — Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA — Texte', type: 'text', rows: 3 }),
    // SEO
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 3 }),
  ],
})
