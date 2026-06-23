import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'global',
  title: 'Paramètres globaux',
  type: 'document',
  fields: [
    defineField({ name: 'nom_praticien', title: 'Nom praticien', type: 'string' }),
    defineField({ name: 'phone', title: 'Téléphone', type: 'string' }),
    defineField({ name: 'adresse', title: 'Adresse', type: 'string' }),
    defineField({ name: 'doctolib', title: 'Lien Doctolib', type: 'url' }),
    defineField({
      name: 'horaires',
      title: 'Horaires d\'ouverture',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'jour', title: 'Jour', type: 'string' }),
          defineField({ name: 'heures', title: 'Heures', type: 'string' }),
        ],
        preview: { select: { title: 'jour', subtitle: 'heures' } },
      }],
    }),
    defineField({ name: 'maps_url', title: 'Google Maps — Lien', type: 'url' }),
    defineField({ name: 'maps_embed_url', title: 'Google Maps — URL d\'intégration (iframe)', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: '⚙️ Paramètres globaux' }) }
})
