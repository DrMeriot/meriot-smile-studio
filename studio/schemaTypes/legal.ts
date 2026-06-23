import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legal',
  title: 'Mentions légales',
  type: 'document',
  fields: [
    defineField({ name: 'titre', title: 'Titre de la page', type: 'string' }),
    defineField({ name: 'rpps', title: 'Numéro RPPS', type: 'string' }),
    defineField({ name: 'diplomesList', title: 'Diplômes', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'conditionsTexte', title: 'Conditions générales', type: 'text', rows: 6 }),
    defineField({ name: 'hebergeur', title: 'Hébergeur', type: 'string' }),
    defineField({ name: 'body', title: 'Contenu (texte riche)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'seoTitle', title: 'SEO - Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO - Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: '📄 Mentions légales' }) }
})
