/**
 * Refonte contenu /gingivite-marseille (conversion-first + local, voix « je »,
 * philosophie dentisterie à minima). Met le doc Sanity (golden source) à niveau
 * avec le fallback JSX harmonisé + le nouveau bloc auto-diagnostic.
 *
 * Idempotent : `.set()` remplace les champs ciblés, conserve _id/_type.
 * Cible le doc par TYPE (l'_id des singletons n'est pas standardisé).
 * Lancer : node scripts/patch-gingivite.mjs   (requiert SANITY_TOKEN dans .env.local)
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
try {
  const c = readFileSync(resolve(__dirname, '../.env.local'), 'utf8')
  for (const l of c.split('\n')) { const [k, ...r] = l.split('='); if (k && r.length && !process.env[k.trim()]) process.env[k.trim()] = r.join('=').trim() }
} catch {}

const token = process.env.SANITY_TOKEN
if (!token) { console.error('❌  SANITY_TOKEN manquant (.env.local).'); process.exit(1) }

const client = createClient({ projectId: '6a2np8jy', dataset: 'production', apiVersion: '2024-01-01', token, useCdn: false })
const keyed = (arr) => arr.map((item, i) => ({ ...item, _key: `item${i}` }))

const content = {
  // SEO (3e pers. nommée pour l'entité)
  seoTitle: `Gingivite Marseille | Traitement gencives inflammées — Dr Meriot`,
  seoDescription: `Traitement de la gingivite à Marseille. Gencives qui saignent, rouges, gonflées ? Le Dr Meriot, spécialiste parodontie, soigne vos gencives. Consultation rapide.`,

  // Hero (je)
  heroTitle: `Traitement de la gingivite à Marseille`,
  heroSubtitle: `Vos gencives saignent, sont rouges ou gonflées ? La gingivite est une inflammation fréquente et réversible quand on agit tôt. Spécialiste en parodontie à Marseille, je diagnostique la cause et, fidèle à la dentisterie à minima, je privilégie les soins les plus doux pour préserver vos gencives et vos dents.`,

  // Auto-diagnostic (nouveau)
  diagnosticTitre: `Vos gencives sont enflammées : faut-il consulter ?`,
  diagnosticIntro: `Une gencive légèrement irritée après un brossage appuyé peut rentrer dans l'ordre en quelques jours. Mais si l'inflammation persiste ou s'accompagne d'autres signes, c'est souvent une gingivite — qui se soigne d'autant plus simplement qu'on la prend tôt. Quelques signes qui méritent l'avis d'un parodontologue :`,
  diagnosticSignes: [
    `Gencives rouges ou gonflées depuis plus de 2 semaines`,
    `Saignements au brossage ou au fil dentaire`,
    `Mauvaise haleine persistante`,
    `Gencives sensibles ou douloureuses au toucher`,
    `Gencives qui commencent à se rétracter`,
  ],
  diagnosticConclusion: `Bonne nouvelle : prise tôt, la gingivite est totalement réversible — un détartrage et de bons gestes d'hygiène suffisent le plus souvent. Fidèle à ma philosophie de dentisterie à minima, je vous accompagne à votre rythme pour préserver vos tissus naturels, sans sur-traitement.`,

  // Définition (faits, neutre)
  definitionTitre: `Qu'est-ce que la gingivite ?`,
  definitionTexte1: `La gingivite est une inflammation de la gencive, le plus souvent causée par l'accumulation de plaque dentaire à la base des dents. C'est la forme la plus courante des maladies parodontales et elle touche une grande partie de la population à un moment ou un autre de sa vie.`,
  definitionTexte2: `Contrairement à la parodontite, la gingivite ne touche que la gencive superficielle et n'endommage pas l'os. C'est pourquoi elle est totalement réversible avec un traitement adapté. Cependant, sans prise en charge, elle peut évoluer vers une parodontite, maladie plus grave qui entraîne la perte de l'os de soutien des dents.`,

  // Causes (faits)
  causesTitre: `Les causes de la gingivite`,
  causesList: keyed([
    { title: `Plaque dentaire`, desc: `L'accumulation de bactéries sur les dents et le long de la gencive est la cause principale de la gingivite.` },
    { title: `Tartre`, desc: `La plaque non éliminée se calcifie en tartre, impossible à retirer par le brossage seul.` },
    { title: `Tabac`, desc: `Le tabac réduit la circulation sanguine dans les gencives et masque les signes d'inflammation.` },
    { title: `Changements hormonaux`, desc: `Grossesse, puberté et ménopause peuvent favoriser l'inflammation des gencives.` },
    { title: `Diabète`, desc: `Un diabète mal équilibré augmente le risque d'infections gingivales.` },
    { title: `Stress`, desc: `Le stress affaiblit le système immunitaire et favorise l'inflammation.` },
  ]),

  // Symptômes (faits)
  symptomesTitre: `Reconnaître les symptômes de la gingivite`,
  symptomesList: [
    `Gencives rouges et gonflées`,
    `Saignements au brossage ou au passage du fil dentaire`,
    `Mauvaise haleine persistante (halitose)`,
    `Gencives sensibles au toucher`,
    `Gencives qui se rétractent légèrement`,
  ],

  // Traitement (je + dentisterie à minima)
  traitementTitre: `Comment traiter la gingivite au cabinet ?`,
  traitementTexte: `Le traitement de la gingivite repose sur un détartrage professionnel complet réalisé au cabinet, associé à des conseils d'hygiène bucco-dentaire personnalisés. J'évalue l'état de vos gencives et j'adapte le plan de soin à votre situation. Dans la plupart des cas, une seule séance de détartrage et l'adoption d'une bonne routine de brossage suffisent à retrouver des gencives saines en quelques semaines. Fidèle à la dentisterie à minima, je privilégie toujours le geste le moins invasif, et un suivi régulier prévient les récidives.`,

  // Prévention (faits)
  preventionTitre: `Prévenir la gingivite au quotidien`,
  preventionTexte: `La prévention de la gingivite passe par une hygiène bucco-dentaire rigoureuse : brossage deux fois par jour avec une brosse à dents souple, utilisation quotidienne du fil dentaire ou de brossettes interdentaires, et visites régulières chez votre dentiste. Arrêter le tabac, équilibrer un diabète éventuel et gérer le stress contribuent également à préserver la santé de vos gencives.`,

  // FAQ (4 + 1 spécialiste local, voix « je »)
  faqTitre: `Questions fréquentes sur la gingivite`,
  faqList: keyed([
    { question: `La gingivite est-elle grave ?`, answer: `La gingivite est une inflammation réversible des gencives. Sans traitement, elle peut évoluer en parodontite, une maladie plus grave qui entraîne la perte de l'os de soutien des dents. C'est pourquoi il est important de la traiter dès les premiers signes.` },
    { question: `Comment soigner une gingivite à Marseille ?`, answer: `Le traitement commence par un détartrage professionnel au cabinet, suivi de conseils d'hygiène personnalisés. Je réalise un bilan complet de vos gencives et j'adapte le traitement à votre situation. Fidèle à la dentisterie à minima, je privilégie le geste le plus doux. Prenez rendez-vous pour un diagnostic.` },
    { question: `Combien de temps dure le traitement d'une gingivite ?`, answer: `Avec un traitement adapté et une bonne hygiène bucco-dentaire, la gingivite peut guérir en 2 à 3 semaines. Un suivi régulier est recommandé pour prévenir les récidives.` },
    { question: `Quels sont les premiers signes de la gingivite ?`, answer: `Les premiers signes sont des gencives qui saignent au brossage, des gencives rouges ou gonflées, et parfois une mauvaise haleine. Si vous observez ces symptômes, consultez rapidement.` },
    { question: `La gingivite peut-elle revenir après traitement ?`, answer: `Oui, sans une hygiène bucco-dentaire rigoureuse et des visites régulières chez le dentiste, la gingivite peut récidiver. Un suivi parodontal tous les 3 à 6 mois est recommandé.` },
    { question: `Quel spécialiste consulter pour une gingivite à Marseille ?`, answer: `Un parodontologue, chirurgien-dentiste spécialisé dans les maladies des gencives. Diplômée de la Faculté d'odontologie de Marseille et formée en parodontologie (IFPIO Marseille, Académie de paro d'Aix-en-Provence), je prends en charge la gingivite à mon cabinet de Marseille 4e. Vous pouvez me consulter directement, sans ordonnance.` },
  ]),

  // CTA (je)
  ctaTitre: `Vos gencives sont inflammées ?`,
  ctaTexte: `N'attendez pas que la gingivite évolue. Prise tôt, elle se traite en quelques semaines. Prenons le temps d'un bilan : je vous propose la solution la plus douce pour retrouver des gencives saines.`,
}

const id = await client.fetch('*[_type=="gingivite_marseille"][0]._id')
if (!id) { console.error('❌  doc gingivite_marseille introuvable'); process.exit(1) }
const res = await client.patch(id).set(content).commit()
console.log(`✅  Doc « ${res._id} » mis à jour (rev ${res._rev}).`)
console.log(`   FAQ: ${content.faqList.length} · causes: ${content.causesList.length} · signes diagnostic: ${content.diagnosticSignes.length}`)
