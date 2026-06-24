import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blog_page',
  title: 'Page Blog',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitre', title: 'Hero — Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    defineField({
      name: 'specialitesList',
      title: 'Spécialités (cartes)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'lien', title: 'Lien (URL interne)', type: 'string' }),
        ],
        preview: { select: { title: 'titre' } },
      }],
    }),
    defineField({ name: 'ctaTitre', title: 'CTA (index) — Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA (index) — Texte', type: 'text', rows: 2 }),
    defineField({ name: 'auteurBio', title: 'Article — Bio auteur', type: 'text', rows: 3 }),
    defineField({ name: 'articleCtaTitre', title: 'Article — CTA Titre', type: 'string' }),
    defineField({ name: 'articleCtaTexte', title: 'Article — CTA Texte', type: 'text', rows: 2 }),

    // SEO (référencement Google de la page Blog)
    defineField({ name: 'seoTitle', title: 'SEO — Titre (Google)', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description (Google)', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: '📰 Page Blog' }) }
})
