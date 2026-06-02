/**
 * Refonte contenu /gencives-qui-saignent (conversion-first + local, voix « je »,
 * philosophie dentisterie à minima). Met le doc Sanity (golden source) à niveau
 * avec le fallback JSX harmonisé + le nouveau bloc auto-diagnostic.
 *
 * Idempotent : `.set()` remplace les champs ciblés, conserve _id/_type.
 * Cible le doc par TYPE (l'_id des singletons n'est pas standardisé).
 * Lancer : node scripts/patch-gencives.mjs   (requiert SANITY_TOKEN dans .env.local)
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
  // SEO (inchangé — 3e pers. nommée pour l'entité)
  seoTitle: `Gencives qui saignent : causes et traitement | Dr Meriot Marseille`,
  seoDescription: `Vos gencives saignent au brossage ? Découvrez les causes du saignement gingival et les solutions. Dr Meriot, spécialiste parodontie à Marseille.`,

  // Hero (je)
  heroTitle: `Gencives qui saignent : que faire ?`,
  heroSubtitle: `Vos gencives saignent au brossage ? Ce n'est pas normal — mais c'est souvent réversible quand on agit tôt. Spécialiste en parodontie à Marseille, j'identifie la cause et, fidèle à la dentisterie à minima, je privilégie les soins les plus doux pour préserver vos tissus naturels et vos dents.`,

  // Auto-diagnostic (nouveau)
  diagnosticTitre: `Vos gencives saignent : faut-il consulter ?`,
  diagnosticIntro: `Un saignement isolé et passager n'a rien d'alarmant. Mais s'il se répète ou s'accompagne d'autres signes, il peut révéler une maladie des gencives — qui se soigne d'autant plus simplement qu'elle est prise tôt. Quelques signes qui méritent l'avis d'un parodontologue :`,
  diagnosticSignes: [
    `Saignements répétés ou persistants (plus de 2 semaines)`,
    `Gencives rouges, gonflées ou douloureuses`,
    `Mauvaise haleine persistante`,
    `Déchaussement, ou dents qui bougent ou paraissent plus longues`,
    `Saignements spontanés, sans brossage`,
  ],
  diagnosticConclusion: `Bonne nouvelle : prise tôt, l'inflammation des gencives se traite simplement — un détartrage et de bons gestes d'hygiène suffisent souvent. Fidèle à ma philosophie de dentisterie à minima, je vous accompagne à votre rythme pour préserver au maximum vos tissus naturels, sans sur-traitement.`,

  // Définition (faits, neutre)
  definitionTitre: `Pourquoi les gencives saignent-elles ?`,
  definitionTexte1: `Les gencives saines sont roses, fermes et ne saignent pas. Quand elles saignent, c'est le signe que quelque chose ne va pas. Le plus souvent, le saignement est causé par une accumulation de plaque dentaire qui provoque une inflammation de la gencive : c'est la gingivite.`,
  definitionTexte2: `Le saignement gingival est le premier signal d'alarme que votre corps vous envoie. Si vous l'ignorez, l'inflammation peut progresser vers les tissus plus profonds (os, ligament) et devenir une parodontite, avec un risque de déchaussement et de perte des dents.`,

  // Causes (+ stress)
  causesTitre: `Les causes du saignement des gencives`,
  causesList: keyed([
    { title: `Plaque dentaire et tartre`, desc: `La cause la plus fréquente : l'accumulation de bactéries sur les dents provoque une inflammation de la gencive qui réagit en saignant.` },
    { title: `Brossage inadapté`, desc: `Un brossage trop vigoureux, une brosse à dents trop dure ou une technique incorrecte peuvent irriter les gencives et provoquer des saignements.` },
    { title: `Tabac`, desc: `Le tabac masque les saignements en réduisant la circulation sanguine, ce qui peut retarder le diagnostic d'un problème gingival.` },
    { title: `Grossesse`, desc: `Les changements hormonaux pendant la grossesse augmentent la sensibilité des gencives et les rendent plus sujettes aux saignements.` },
    { title: `Médicaments`, desc: `Certains médicaments (anticoagulants, antihypertenseurs) peuvent favoriser les saignements gingivaux.` },
    { title: `Carences nutritionnelles`, desc: `Un manque de vitamine C ou K peut fragiliser les gencives et augmenter les saignements.` },
    { title: `Stress`, desc: `Le stress affaiblit les défenses immunitaires et favorise l'inflammation des gencives.` },
  ]),

  // Quand consulter (faits)
  quandConsulterTitre: `Quand consulter un dentiste ?`,
  quandConsulterList: [
    `Saignements persistants depuis plus de 2 semaines`,
    `Gencives très rouges, gonflées ou douloureuses`,
    `Mauvaise haleine qui ne disparaît pas`,
    `Impression que les dents bougent ou se déchaussent`,
    `Saignements spontanés (sans brossage)`,
    `Apparition de pus entre les dents et la gencive`,
  ],

  // Traitement (je + dentisterie à minima)
  traitementTitre: `Comment traiter les saignements de gencives ?`,
  traitementTexte: `Le traitement commence toujours par un diagnostic précis : j'examine vos gencives, je mesure les poches parodontales si nécessaire et j'identifie la cause du saignement. Le traitement de base — un détartrage complet et des conseils d'hygiène personnalisés — suffit le plus souvent. Si une parodontite est présente, un surfaçage radiculaire peut compléter les soins pour nettoyer en profondeur sous la gencive. Fidèle à la dentisterie à minima, j'adopte une approche douce et progressive : je commence par le geste le moins invasif et je vous explique chaque étape avec clarté, pour préserver vos dents naturelles.`,

  // Conseils (je)
  conseilsTitre: `Mes conseils pour des gencives saines`,
  conseilsList: keyed([
    { title: `Brosse à dents souple`, desc: `Utilisez une brosse à dents souple et changez-la tous les 3 mois. Brossez-vous les dents 2 fois par jour pendant 2 minutes.` },
    { title: `Fil dentaire ou brossettes`, desc: `Nettoyez les espaces interdentaires une fois par jour avec du fil dentaire ou des brossettes adaptées à la taille de vos espaces.` },
    { title: `Technique de brossage`, desc: `Brossez du rose vers le blanc (de la gencive vers la dent) avec des mouvements doux et roulés, sans appuyer trop fort.` },
    { title: `Détartrage régulier`, desc: `Faites réaliser un détartrage professionnel au moins une fois par an, ou tous les 6 mois si vous êtes sujet aux problèmes de gencives.` },
  ]),

  // FAQ (5 + 3 nouvelles)
  faqTitre: `Questions fréquentes sur les saignements de gencives`,
  faqList: keyed([
    { question: `Pourquoi mes gencives saignent au brossage ?`, answer: `Le saignement au brossage est le signe le plus fréquent de la gingivite, une inflammation causée par l'accumulation de plaque dentaire. Un détartrage professionnel et une amélioration de l'hygiène bucco-dentaire suffisent généralement à résoudre le problème.` },
    { question: `Est-ce normal que les gencives saignent ?`, answer: `Non, des gencives saines ne saignent pas. Le saignement gingival est toujours un signe d'inflammation qu'il faut prendre au sérieux. Même léger, il indique une réaction de la gencive à la présence de bactéries.` },
    { question: `Dois-je arrêter de me brosser les dents si mes gencives saignent ?`, answer: `Non, au contraire ! Le saignement indique que la zone a besoin d'être mieux nettoyée. Utilisez une brosse à dents souple et brossez doucement mais régulièrement les zones qui saignent. Le saignement devrait diminuer en quelques jours.` },
    { question: `Quand faut-il consulter pour des gencives qui saignent ?`, answer: `Consultez si les saignements persistent au-delà de 2 semaines malgré une bonne hygiène, s'ils s'accompagnent de douleurs, de gonflements importants, de mauvaise haleine ou si vous constatez un déchaussement des dents.` },
    { question: `Les gencives qui saignent peuvent-elles entraîner la perte des dents ?`, answer: `Si le saignement est le signe d'une gingivite non traitée, celle-ci peut évoluer en parodontite, qui détruit l'os de soutien des dents et peut effectivement mener à leur perte. D'où l'importance de consulter dès les premiers signes.` },
    { question: `Quel spécialiste consulter pour des gencives qui saignent à Marseille ?`, answer: `Un parodontologue, chirurgien-dentiste spécialisé dans les maladies des gencives. Diplômée de la Faculté d'odontologie de Marseille et formée en parodontologie (IFPIO Marseille, Académie de paro d'Aix-en-Provence), je prends en charge les saignements gingivaux à mon cabinet de Marseille 4e. Vous pouvez me consulter directement, sans ordonnance.` },
    { question: `Mes gencives saignent le matin ou la nuit, est-ce grave ?`, answer: `Des saignements constatés au réveil ou sur l'oreiller traduisent souvent une inflammation installée (gingivite, parfois parodontite). C'est un signe à ne pas banaliser. Rassurez-vous : pris à temps, cela se traite généralement simplement. Prenez rendez-vous pour un bilan.` },
    { question: `Mes gencives saignent pendant ma grossesse, que faire ?`, answer: `Les variations hormonales rendent les gencives plus sensibles : c'est fréquent et réversible. Un détartrage et un suivi doux pendant la grossesse suffisent souvent. J'accompagne les femmes enceintes en toute sécurité, à leur rythme.` },
  ]),

  // CTA (je)
  ctaTitre: `Vos gencives saignent ?`,
  ctaTexte: `Le saignement des gencives n'est pas à banaliser, mais il se traite d'autant plus simplement qu'on agit tôt. Prenons le temps d'un bilan : je vous propose la solution la plus douce pour préserver vos gencives et vos dents.`,
}

const id = await client.fetch('*[_type=="gencives_qui_saignent"][0]._id')
if (!id) { console.error('❌  doc gencives_qui_saignent introuvable'); process.exit(1) }
const res = await client.patch(id).set(content).commit()
console.log(`✅  Doc « ${res._id} » mis à jour (rev ${res._rev}).`)
console.log(`   FAQ: ${content.faqList.length} · causes: ${content.causesList.length} · signes diagnostic: ${content.diagnosticSignes.length}`)
