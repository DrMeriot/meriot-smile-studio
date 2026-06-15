/**
 * Refonte contenu /dechaussement-dentaire-marseille (conversion-first + local,
 * voix « je », philosophie dentisterie à minima / conservation des dents).
 * Met le doc Sanity (golden source, loader-câblé) à niveau avec le fallback JSX
 * harmonisé + le nouveau bloc auto-diagnostic.
 *
 * Idempotent : `.set()` remplace les champs ciblés, conserve _id/_type.
 * Cible le doc par TYPE (l'_id des singletons n'est pas standardisé).
 * Lancer : node scripts/patch-dechaussement.mjs   (requiert SANITY_TOKEN dans .env.local)
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
  // SEO (3e pers. nommée pour l'entité ; titre raccourci ≤ 65 car.)
  seoTitle: `Déchaussement dentaire à Marseille — Dr Meriot, parodontologue`,
  seoDescription: `Traitement du déchaussement dentaire à Marseille. Dents qui se déchaussent, racines exposées ? Le Dr Meriot, spécialiste parodontie, traite la récession gingivale.`,

  // Hero (je)
  heroTitle: `Déchaussement dentaire à Marseille`,
  heroSubtitle: `Vos dents paraissent plus longues ? Vos racines sont visibles ? Le déchaussement dentaire (récession gingivale) est souvent le signe d'une parodontite. Spécialiste en parodontie à Marseille, je pose le diagnostic et, fidèle à la dentisterie à minima, je privilégie les soins les plus doux pour stabiliser et conserver vos dents.`,

  // Auto-diagnostic (nouveau)
  diagnosticTitre: `Vos dents se déchaussent : faut-il consulter ?`,
  diagnosticIntro: `Une racine qui devient visible ou une dent qui paraît plus longue n'est pas qu'un détail esthétique : c'est souvent le signe d'une parodontite qui détruit, en silence, l'os qui soutient la dent. Plus on agit tôt, plus on préserve ce qui peut l'être. Quelques signes qui méritent l'avis d'un parodontologue :`,
  diagnosticSignes: [
    `Une ou plusieurs dents qui paraissent plus longues`,
    `Des racines visibles ou des collets sensibles au froid`,
    `Des espaces qui s'élargissent entre les dents`,
    `Une dent qui bouge, même légèrement`,
    `Des tassements alimentaires fréquents entre les dents`,
  ],
  diagnosticConclusion: `La perte osseuse déjà installée ne se rattrape pas entièrement, mais on peut stopper son évolution et stabiliser vos dents — d'autant mieux qu'on intervient tôt. Fidèle à ma philosophie de dentisterie à minima, mon objectif premier est de conserver vos dents naturelles, sans geste inutile.`,

  // Définition (faits, neutre)
  definitionTitre: `Qu'est-ce que le déchaussement dentaire ?`,
  definitionTexte1: `Le déchaussement dentaire, ou récession gingivale, désigne la rétraction progressive de la gencive qui entoure les dents. Ce phénomène expose la racine dentaire, normalement protégée par la gencive, et peut entraîner une sensibilité accrue, des problèmes esthétiques et, dans les cas avancés, une mobilité des dents.`,
  definitionTexte2: `Le déchaussement dentaire peut toucher une seule dent ou plusieurs. Il évolue souvent lentement et sans douleur, ce qui le rend difficile à détecter sans un examen professionnel. C'est pourquoi un bilan parodontal régulier est essentiel pour le dépister à temps.`,

  // Causes (faits)
  causesTitre: `Les causes du déchaussement dentaire`,
  causesList: keyed([
    { title: `Parodontite`, desc: `La cause principale du déchaussement dentaire est la parodontite, une infection bactérienne qui détruit progressivement l'os et la gencive autour des dents.` },
    { title: `Brossage trop agressif`, desc: `Un brossage trop vigoureux ou une brosse à dents dure peuvent provoquer une récession gingivale mécanique.` },
    { title: `Tabac`, desc: `Le tabac accélère la perte osseuse et masque les signes d'inflammation, retardant le diagnostic.` },
    { title: `Bruxisme`, desc: `Le grincement ou le serrement des dents exerce des forces excessives qui peuvent fragiliser le parodonte.` },
    { title: `Génétique`, desc: `Certaines personnes ont une prédisposition génétique à la perte d'attache parodontale.` },
    { title: `Malocclusion`, desc: `Un alignement anormal des dents peut créer des zones de surcharge favorisant le déchaussement.` },
    { title: `Variations hormonales`, desc: `Les bouleversements hormonaux — ménopause, mais aussi grossesse — fragilisent les gencives et peuvent favoriser leur rétraction.` },
  ]),

  // Symptômes (faits)
  symptomesTitre: `Les signes du déchaussement dentaire`,
  symptomesList: [
    `Dents qui paraissent plus longues (racines visibles)`,
    `Sensibilité au froid et au chaud au niveau des collets`,
    `Espaces entre les dents qui s'élargissent`,
    `Mobilité des dents`,
    `Tassements alimentaires fréquents entre les dents`,
    `Gencives rétractées ou asymétriques`,
  ],

  // Traitement (je + dentisterie à minima)
  traitementTitre: `Comment traiter le déchaussement dentaire ?`,
  traitementTexte: `Le traitement du déchaussement dentaire dépend de sa cause et de sa sévérité. Je commence toujours par stabiliser la maladie avec les gestes les moins invasifs, et je ne propose une chirurgie reconstructrice que lorsqu'elle apporte un réel bénéfice. Fidèle à la dentisterie à minima, mon objectif reste de conserver vos dents naturelles.`,
  traitementsList: keyed([
    { title: `Surfaçage radiculaire`, desc: `Nettoyage en profondeur des racines sous la gencive pour éliminer les bactéries et le tartre, réalisé sous anesthésie locale.` },
    { title: `Greffe gingivale`, desc: `Technique chirurgicale qui permet de recouvrir les racines exposées en déplaçant ou en greffant du tissu gingival.` },
    { title: `Régénération osseuse guidée`, desc: `Technique avancée qui stimule la reformation de l'os perdu autour des dents à l'aide de biomatériaux.` },
    { title: `Suivi parodontal`, desc: `Visites régulières tous les 3 à 6 mois pour maintenir les résultats et prévenir toute récidive.` },
  ]),

  // FAQ (voix « je », spécialiste local + transparence coût)
  faqTitre: `Questions fréquentes sur le déchaussement dentaire`,
  faqList: keyed([
    { question: `Le déchaussement dentaire est-il irréversible ?`, answer: `La perte osseuse causée par la parodontite est irréversible, mais le traitement permet d'en stopper l'évolution. La greffe gingivale peut recouvrir les racines exposées et les techniques de régénération osseuse peuvent restaurer partiellement le tissu perdu. Fidèle à la dentisterie à minima, mon objectif est de conserver vos dents naturelles le plus longtemps possible.` },
    { question: `Comment savoir si mes dents se déchaussent ?`, answer: `Les signes incluent : des dents qui paraissent plus longues, des racines visibles, une sensibilité au froid et au chaud au niveau des collets, des espaces qui apparaissent entre les dents, et une mobilité dentaire. Un bilan parodontal au cabinet permet un diagnostic précis.` },
    { question: `Quel spécialiste consulter pour un déchaussement dentaire à Marseille ?`, answer: `Un parodontologue, chirurgien-dentiste spécialisé dans les maladies des gencives et de l'os de soutien des dents. Diplômée de la Faculté d'odontologie de Marseille et formée en parodontologie (IFPIO Marseille, Académie de paro d'Aix-en-Provence), je prends en charge le déchaussement dentaire à mon cabinet de Marseille 4e. Vous pouvez me consulter directement, sans ordonnance.` },
    { question: `Combien coûte le traitement du déchaussement dentaire ?`, answer: `Le coût dépend de la sévérité du déchaussement et du traitement nécessaire. Une partie des soins parodontaux n'est pas prise en charge par l'Assurance Maladie : je vous remets toujours un devis détaillé et transparent après le bilan, avant tout traitement.` },
    { question: `Peut-on prévenir le déchaussement dentaire ?`, answer: `Oui, une hygiène bucco-dentaire rigoureuse, l'arrêt du tabac et des visites régulières chez le dentiste permettent de prévenir le déchaussement. Un détartrage professionnel régulier élimine le tartre que le brossage ne peut pas atteindre.` },
    { question: `Le déchaussement dentaire fait-il mal ?`, answer: `Le déchaussement est souvent indolore dans les premiers stades, ce qui le rend sournois. La sensibilité au froid et au chaud apparaît quand les racines sont exposées. Une douleur peut survenir en cas d'infection ou d'abcès parodontal.` },
    { question: `Une dent qui bouge, est-ce un déchaussement ?`, answer: `Chez l'adulte, une dent qui bouge est rarement anodine : c'est souvent le signe que l'os qui la soutient a été détruit par une parodontite. Il ne faut pas attendre — plus on consulte tôt, plus il existe de solutions douces pour stabiliser la dent et éviter de la perdre. Je réalise un bilan parodontal pour évaluer précisément la mobilité.` },
    { question: `La gencive repousse-t-elle après un surfaçage ou une greffe ?`, answer: `Une gencive rétractée ne repousse pas spontanément. En revanche, après un surfaçage, l'inflammation régresse et la gencive se raffermit. Quand la racine est très exposée, une greffe gingivale permet de la recouvrir. Après le bilan, je vous explique ce qui est réaliste et utile dans votre situation.` },
    { question: `Je fume : puis-je faire soigner mon déchaussement ?`, answer: `Oui, et c'est important : le tabac multiplie par 3 à 6 le risque de déchaussement sévère. Le traitement de base (surfaçage, hygiène) reste possible, mais les greffes de gencive cicatrisent mal chez le fumeur et sont déconseillées tant que le tabac n'est pas réduit. Réduire ou arrêter, même progressivement, améliore nettement le pronostic. Je vous accompagne sans jugement, à votre rythme.` },
    { question: `La ménopause peut-elle aggraver le déchaussement ?`, answer: `Oui. La baisse hormonale de la ménopause fragilise les gencives et peut accélérer la récession et la perte osseuse. Un suivi parodontal régulier permet de surveiller et de protéger vos gencives pendant cette période — n'hésitez pas à consulter dès les premiers signes.` },
  ]),

  // CTA (je)
  ctaTitre: `Vos dents se déchaussent ?`,
  ctaTexte: `Plus le diagnostic est précoce, plus les solutions sont simples et efficaces. Je réalise un bilan parodontal complet pour évaluer votre situation et vous proposer le traitement le plus doux et le plus adapté.`,
}

const id = await client.fetch('*[_type=="dechaussement_dentaire"][0]._id')
if (!id) { console.error('❌  doc dechaussement_dentaire introuvable'); process.exit(1) }
const res = await client.patch(id).set(content).commit()
console.log(`✅  Doc « ${res._id} » mis à jour (rev ${res._rev}).`)
console.log(`   FAQ: ${content.faqList.length} · causes: ${content.causesList.length} · traitements: ${content.traitementsList.length} · signes diagnostic: ${content.diagnosticSignes.length}`)
