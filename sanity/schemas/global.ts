import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'global',
  title: 'Paramètres globaux',
  type: 'document',
  fields: [
    defineField({ name: 'nom_praticien', title: 'Nom du praticien', type: 'string' }),
    defineField({ name: 'phone', title: 'Téléphone', type: 'string' }),
    defineField({ name: 'adresse', title: 'Adresse', type: 'string' }),
    defineField({ name: 'doctolib', title: 'Lien Doctolib', type: 'url' }),
  ],
})
