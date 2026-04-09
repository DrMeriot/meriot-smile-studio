import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'services_page',
  title: 'Page Services',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero — Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    defineField({
      name: 'servicesList',
      title: 'Services — Liste',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'featured', title: 'Mis en avant', type: 'boolean' }),
          defineField({
            name: 'details',
            title: 'Détails',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'subtitle', title: 'Sous-titre', type: 'string' }),
                defineField({ name: 'text', title: 'Texte', type: 'text', rows: 3 }),
              ],
            }],
          }),
        ],
      }],
    }),
    defineField({ name: 'ctaTitre', title: 'CTA — Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA — Texte', type: 'text', rows: 3 }),
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 3 }),
  ],
})
