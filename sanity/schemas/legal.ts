import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legal',
  title: 'Mentions légales',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string' }),
    defineField({ name: 'rpps', title: 'Numéro RPPS', type: 'string' }),
    defineField({
      name: 'diplomesList',
      title: 'Diplômes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'conditionsTexte', title: 'Conditions d\'exercice', type: 'text', rows: 4 }),
    defineField({ name: 'hebergeur', title: 'Hébergeur', type: 'string' }),
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 3 }),
  ],
})
