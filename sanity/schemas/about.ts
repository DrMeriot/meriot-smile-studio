import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'À propos',
  type: 'document',
  fields: [
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'heroDescription', title: 'Hero — Description', type: 'text', rows: 4 }),
    defineField({ name: 'formationsTitre', title: 'Formations — Titre', type: 'string' }),
    defineField({
      name: 'formationsList',
      title: 'Formations — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'string' }),
        ],
      }],
    }),
    defineField({ name: 'confianceTitre', title: 'Confiance — Titre', type: 'string' }),
    defineField({
      name: 'confianceList',
      title: 'Confiance — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
        ],
      }],
    }),
    defineField({ name: 'philosophieTitre', title: 'Philosophie — Titre', type: 'string' }),
    defineField({
      name: 'philosophieList',
      title: 'Philosophie — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
        ],
      }],
    }),
    defineField({ name: 'citation', title: 'Citation', type: 'text', rows: 3 }),
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 3 }),
  ],
})
