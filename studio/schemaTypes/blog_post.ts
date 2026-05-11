import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blog_post',
  title: 'Article de blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Slug (URL)', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt', title: 'Date de publication', type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({ name: 'excerpt', title: 'Extrait', type: 'text', rows: 3 }),
    defineField({
      name: 'mainImage', title: 'Image principale', type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Texte alternatif', type: 'string' }],
    }),
    defineField({
      name: 'category', title: 'Catégorie', type: 'string',
      options: {
        list: [
          { title: 'Parodontie', value: 'parodontie' },
          { title: 'Implantologie', value: 'implantologie' },
          { title: 'Hygiène bucco-dentaire', value: 'hygiene' },
          { title: 'Actualités du cabinet', value: 'actualites' },
          { title: 'Conseils patients', value: 'conseils' },
        ],
      },
    }),
    // Champ conservé du repo — utile pour SEO (meta keywords ou usage interne)
    defineField({ name: 'keywords', title: 'Mots-clés SEO', type: 'string' }),
    defineField({
      name: 'body', title: 'Contenu', type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image', options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Texte alternatif', type: 'string' },
            { name: 'caption', title: 'Légende', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'seoTitle', title: 'SEO - Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO - Description', type: 'text', rows: 3 }),
  ],
  orderings: [{ title: 'Date (récent)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'mainImage' } },
})
