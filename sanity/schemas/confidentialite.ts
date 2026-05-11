import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'confidentialite',
  title: 'Politique de confidentialité',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre de la page', type: 'string' }),
    defineField({ name: 'introTexte', title: 'Texte d\'introduction', type: 'text', rows: 5 }),
    defineField({ name: 'seoTitle', title: 'SEO - Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO - Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: '🔒 Confidentialité' }) }
})
