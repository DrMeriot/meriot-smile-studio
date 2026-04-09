import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'confidentialite',
  title: 'Politique de confidentialité',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre', type: 'string' }),
    defineField({ name: 'introTexte', title: 'Texte d\'introduction', type: 'text', rows: 4 }),
    defineField({ name: 'seoTitle', title: 'SEO — Titre', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO — Description', type: 'text', rows: 3 }),
  ],
})
