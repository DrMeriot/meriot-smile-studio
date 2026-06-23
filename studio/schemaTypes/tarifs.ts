import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tarifs',
  title: 'Tarifs',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Hero - Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero - Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'secteurTitre', title: 'Secteur - Titre', type: 'string' }),
    defineField({ name: 'secteurItems', title: 'Secteur - Items', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'tarifsTitre', title: 'Tarifs - Titre section', type: 'string' }),
    defineField({ name: 'soinsCourantsLabel', title: 'Tarifs - Label Soins courants', type: 'string' }),
    defineField({ name: 'soinsSpecialisesLabel', title: 'Tarifs - Label Soins spécialisés', type: 'string' }),
    defineField({ name: 'consultation', title: 'Tarif - Consultation', type: 'string' }),
    defineField({ name: 'implant', title: 'Tarif - Implant', type: 'string' }),
    defineField({ name: 'blanchiment', title: 'Tarif - Blanchiment', type: 'string' }),
    defineField({ name: 'parodontieInfo', title: 'Tarif - Parodontie info', type: 'string' }),
    defineField({ name: 'devisTitre', title: 'Devis - Titre', type: 'string' }),
    defineField({ name: 'devisTexte', title: 'Devis - Texte', type: 'text', rows: 3 }),
    defineField({ name: 'remboursementsTitre', title: 'Remboursements - Titre', type: 'string' }),
    defineField({
      name: 'remboursementsList', title: 'Remboursements', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'desc', title: 'Description', type: 'text', rows: 2 },
      ], preview: { select: { title: 'title' } } }]
    }),
    defineField({ name: 'ctaTitre', title: 'CTA - Titre', type: 'string' }),
    defineField({ name: 'ctaTexte', title: 'CTA - Texte', type: 'text', rows: 2 }),
    defineField({ name: 'seoTitle', title: 'SEO - Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO - Description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: '💶 Tarifs' }) }
})
