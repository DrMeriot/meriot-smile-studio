import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'accueil',
  title: 'Page d\'accueil',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'heroTitle', title: 'Hero — Titre', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — Sous-titre', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Hero — Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroCtaText', title: 'Hero — Texte du bouton', type: 'string' }),
    defineField({ name: 'heroCtaUrl', title: 'Hero — Lien du bouton', type: 'url' }),

    // Praticienne
    defineField({ name: 'praticienNom', title: 'Praticienne — Nom', type: 'string' }),
    defineField({ name: 'praticienPhoto', title: 'Praticienne — Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'praticienDescription', title: 'Praticienne — Description courte', type: 'text', rows: 4 }),
    defineField({ name: 'praticienParcours', title: 'Praticienne — Parcours / thèse', type: 'text', rows: 4 }),
    defineField({ name: 'praticienCitation', title: 'Praticienne — Citation', type: 'text', rows: 3 }),

    // Philosophie
    defineField({ name: 'philosophieTitle', title: 'Philosophie — Titre', type: 'string' }),
    defineField({ name: 'philosophieDescription', title: 'Philosophie — Description', type: 'text', rows: 3 }),
    defineField({ name: 'philosophieCitation', title: 'Philosophie — Citation', type: 'text', rows: 3 }),
    defineField({
      name: 'philosophieValeurs',
      title: 'Philosophie — Valeurs (4 piliers)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        ],
      }],
    }),

    // Témoignages
    defineField({ name: 'temoignagesTitle', title: 'Témoignages — Titre', type: 'string' }),
    defineField({
      name: 'temoignages',
      title: 'Témoignages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'nom', title: 'Nom', type: 'string' }),
          defineField({ name: 'rating', title: 'Note (1-5)', type: 'number', validation: r => r.min(1).max(5) }),
          defineField({ name: 'texte', title: 'Texte', type: 'text', rows: 3 }),
          defineField({ name: 'date', title: 'Date', type: 'string' }),
        ],
      }],
    }),

    // FAQ
    defineField({ name: 'faqTitle', title: 'FAQ — Titre', type: 'string' }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'reponse', title: 'Réponse', type: 'text', rows: 4 }),
        ],
      }],
    }),
  ],
})
