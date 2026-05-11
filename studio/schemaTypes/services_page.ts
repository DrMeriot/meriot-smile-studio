import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'services_page',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero - Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero - Sous-titre', type: 'text', rows: 3 }),
    defineField({
      name: 'servicesList', title: 'Services', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        {
          name: 'details', title: 'Détails', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'subtitle', title: 'Sous-titre', type: 'string' },
            { name: 'text', title: 'Texte', type: 'text', rows: 2 },
          ], preview: { select: { title: 'subtitle' } } }]
        },
        { name: 'featured', title: 'Mis en avant ?', type: 'boolean' },
      ], preview: { select: { title: 'title' } } }]
    }),
    defineField({ name: 'ctaTitre', title: 'CTA - Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA - Texte', type: 'text', rows: 2 }),
    defineField({ name: 'seoTitle', title: 'SEO - Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO - Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: '📋 Services' }) }
})
