import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// Types with a single document (no "create new" button)
const singletonTypes = new Set([
  'global',
  'accueil',
  'parodontie',
  'implantologie',
  'gingivite_marseille',
  'dechaussement_dentaire',
  'gencives_qui_saignent',
  'services_page',
  'tarifs',
  'about',
  'contact',
  'legal',
  'confidentialite',
])

// Helper: singleton list item pointing to one specific document
function singleton(
  S: Parameters<Parameters<typeof structureTool>[0]['structure']>[0],
  type: string,
  title: string,
  docId?: string,
) {
  return S.listItem()
    .title(title)
    .schemaType(type)
    .child(
      docId
        ? S.document().schemaType(type).documentId(docId)
        : S.documentTypeList(type).title(title),
    )
}

export default defineConfig({
  name: 'meriot-smile-studio',
  title: 'Dr Meriot — Smile Studio',
  projectId: '6a2np8jy',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu du site')
          .items([
            singleton(S, 'global', 'Reglages globaux', 'global'),

            S.divider(),

            singleton(S, 'accueil', 'Accueil', 'accueil'),
            singleton(S, 'parodontie', 'Parodontie'),
            singleton(S, 'implantologie', 'Implantologie'),

            S.divider(),

            singleton(S, 'gingivite_marseille', 'Gingivite Marseille'),
            singleton(S, 'dechaussement_dentaire', 'Dechaussement dentaire'),
            singleton(S, 'gencives_qui_saignent', 'Gencives qui saignent'),

            S.divider(),

            singleton(S, 'services_page', 'Services'),
            singleton(S, 'tarifs', 'Tarifs'),
            singleton(S, 'about', 'A propos'),
            singleton(S, 'contact', 'Contact'),
            singleton(S, 'legal', 'Mentions legales'),
            singleton(S, 'confidentialite', 'Confidentialite'),

            S.divider(),

            S.listItem()
              .title('Articles de blog')
              .schemaType('blog_post')
              .child(S.documentTypeList('blog_post').title('Articles de blog')),

            S.listItem()
              .title('Pages locales SEO')
              .child(S.documentTypeList('landing_page').title('Pages locales SEO')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Remove singleton types from the "new document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
})
