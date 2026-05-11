import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'landing_page',
  title: 'Pages locales SEO',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre interne', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Doit correspondre exactement à la route du site (ex: gingivite-marseille)',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'body',
      title: 'Contenu enrichi (optionnel)',
      description: "Affiché entre l'intro et la FAQ. Laisser vide = page inchangée.",
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Texte alternatif', type: 'string' })],
        },
      ],
    }),
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
    prepare({ title, subtitle }) {
      return { title: title || subtitle, subtitle: `/${subtitle}` }
    },
  },
})
