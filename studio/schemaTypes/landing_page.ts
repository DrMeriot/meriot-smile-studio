import { defineType, defineField } from 'sanity'

// Source de vérité : schemaTypes/landing_page.ts du Studio déployé
export default defineType({
  name: 'landing_page',
  title: 'Pages locales SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Doit correspondre exactement à la route du site (ex: gingivite-marseille)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'body',
      title: 'Contenu enrichi (optionnel)',
      description: "Affiché entre l'intro et la FAQ. Laisser vide = page inchangée.",
      type: 'array',
      of: [{
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Titre H2', value: 'h2' },
          { title: 'Titre H3', value: 'h3' },
        ],
        marks: {
          decorators: [
            { title: 'Gras', value: 'strong' },
            { title: 'Italique', value: 'em' },
          ],
          annotations: [{
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [{
              name: 'href',
              type: 'url',
              title: 'URL',
              validation: (Rule: { uri: (opts: object) => unknown }) => Rule.uri({ allowRelative: true })
            }]
          }]
        }
      }]
    }),
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'slug' },
    prepare({ title }: { title?: { current?: string } }) {
      return { title: `/${title?.current ?? '...'}` }
    }
  }
})
