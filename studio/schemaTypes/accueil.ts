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

    // Praticienne — Points forts (4 cartes)
    defineField({
      name: 'praticienHighlights',
      title: 'Praticienne — Points forts (4 cartes)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'titre' } },
      }],
    }),

    // Services (section accueil)
    defineField({ name: 'servicesTitre', title: 'Services — Titre', type: 'string' }),
    defineField({ name: 'servicesIntro', title: 'Services — Intro', type: 'text', rows: 3 }),
    defineField({
      name: 'servicesList',
      title: 'Services — Cartes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'lien', title: 'Lien (URL interne)', type: 'string' }),
        ],
        preview: { select: { title: 'titre' } },
      }],
    }),

    // QuickLinks (accès direct aux expertises)
    defineField({ name: 'quicklinksLabel', title: 'QuickLinks — Label (eyebrow)', type: 'string' }),
    defineField({ name: 'quicklinksTitle', title: 'QuickLinks — Titre', type: 'string' }),
    defineField({
      name: 'quicklinksSpecialites',
      title: 'QuickLinks — Spécialités (2 cartes)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'lien', title: 'Lien (URL interne)', type: 'string' }),
        ],
        preview: { select: { title: 'titre' } },
      }],
    }),
    defineField({
      name: 'quicklinksFocus',
      title: 'QuickLinks — Focus (3 sous-cartes)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titre', title: 'Titre', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'lien', title: 'Lien (URL interne)', type: 'string' }),
        ],
        preview: { select: { title: 'titre' } },
      }],
    }),

    // Contact (section accueil)
    defineField({ name: 'contactTitre', title: 'Contact — Titre', type: 'string' }),
    defineField({ name: 'contactIntro', title: 'Contact — Intro', type: 'text', rows: 3 }),
    defineField({
      name: 'zones',
      title: 'Contact — Zones d\'intervention',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'region', title: 'Région / Secteur', type: 'string' }),
          defineField({ name: 'villes', title: 'Villes (une par ligne)', type: 'text', rows: 4 }),
        ],
        preview: { select: { title: 'region' } },
      }],
    }),
    defineField({
      name: 'accesList',
      title: 'Contact — Accès (liste)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'item', title: 'Item', type: 'string' }),
        ],
        preview: { select: { title: 'item' } },
      }],
    }),
    defineField({ name: 'zonesTitre', title: 'Contact — Zones : Titre', type: 'string' }),
    defineField({ name: 'zonesTexte', title: 'Contact — Zones : Texte', type: 'text', rows: 3 }),
  ],
})
