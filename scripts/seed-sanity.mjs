/**
 * Seed Sanity with all hardcoded default content from the React components.
 * Run once after cloning: node scripts/seed-sanity.mjs
 * Requires SANITY_TOKEN env var (Editor permissions).
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load token from .env.local if not already in environment
function loadEnvLocal() {
  try {
    const envPath = resolve(__dirname, '../.env.local')
    const content = readFileSync(envPath, 'utf8')
    for (const line of content.split('\n')) {
      const [key, ...rest] = line.split('=')
      if (key && rest.length && !process.env[key.trim()]) {
        process.env[key.trim()] = rest.join('=').trim()
      }
    }
  } catch {
    // .env.local not found, rely on environment variables
  }
}

loadEnvLocal()

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  SANITY_TOKEN is not set. Add it to .env.local or pass it as an env var.')
  process.exit(1)
}

const client = createClient({
  projectId: '6a2np8jy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Helper: add _key to array items (required by Sanity for object arrays)
function keyed(arr) {
  return arr.map((item, i) => ({ ...item, _key: `item${i}` }))
}

const documents = [
  // ─── Global ──────────────────────────────────────────────────────────────
  {
    _id: 'singleton-global',
    _type: 'global',
    nom_praticien: 'Dr Stéphanie Meriot',
    phone: '09 83 43 96 21',
    adresse: '31 Rue des Chartreux, 13004 Marseille',
    doctolib: 'https://www.doctolib.fr/dentiste/marseille/stephanie-meriot',
  },

  // ─── Accueil ─────────────────────────────────────────────────────────────
  {
    _id: 'singleton-accueil',
    _type: 'accueil',
    heroTitle: 'Votre sourire entre de bonnes mains',
    heroSubtitle: 'Dr Stéphanie Meriot — Chirurgien-dentiste, spécialiste des gencives à Marseille 4ème. Traitement de la gingivite, parodontite, déchaussement et pose d\'implants.',
    heroCtaText: 'Prendre rendez-vous',
    heroCtaUrl: 'https://www.doctolib.fr/dentiste/marseille/stephanie-meriot',
    praticienNom: 'Dr Stéphanie Meriot',
    praticienDescription: 'Diplômée de la Faculté d\'odontologie de Marseille, je suis chirurgien-dentiste spécialisée en parodontie et implantologie. Mon approche repose sur l\'écoute, la douceur et le respect du rythme de chaque patient.',
    praticienParcours: 'Ma thèse sur la dentisterie à minima reflète ma philosophie : préserver au maximum vos tissus naturels tout en vous offrant des soins de qualité. Chaque traitement est personnalisé et expliqué avec clarté.',
    praticienCitation: 'Je prends le temps d\'expliquer chaque étape de vos soins, pour que vous vous sentiez en confiance et acteur de votre santé bucco-dentaire.',
    philosophieTitle: 'Une dentisterie à l\'écoute et respectueuse',
    philosophieDescription: 'Mon approche repose sur quatre piliers fondamentaux pour vous offrir des soins de qualité dans un climat de confiance.',
    philosophieCitation: 'Votre sourire mérite une attention particulière. Je m\'engage à vous offrir des soins de qualité dans un environnement chaleureux et rassurant.',
    philosophieValeurs: keyed([
      { titre: 'Écoute et bienveillance', description: 'Chaque patient est unique. Je prends le temps de comprendre vos besoins et vos préoccupations pour vous proposer des soins adaptés.' },
      { titre: 'Explications claires', description: 'Je vous explique chaque étape de vos soins avec des mots simples, pour que vous soyez pleinement informé et rassuré.' },
      { titre: 'Dentisterie à minima', description: 'Ma philosophie : préserver au maximum vos tissus naturels tout en garantissant des soins efficaces et durables.' },
      { titre: 'Approche personnalisée', description: 'Je respecte votre rythme et prends en compte votre anxiété éventuelle. Votre confort est ma priorité.' },
    ]),
    temoignagesTitle: 'Ils nous font confiance',
    temoignages: [],
    faqTitle: 'Vos questions, nos réponses',
    faq: keyed([
      { question: 'Le cabinet accepte-t-il la carte vitale ?', reponse: 'Oui, le cabinet est conventionné secteur 1 et accepte la carte vitale ainsi que le tiers payant pour la part Sécurité sociale. Vous n\'avancez donc pas les frais correspondant à la part remboursée par l\'Assurance Maladie.' },
      { question: 'Comment prendre rendez-vous ?', reponse: 'Vous pouvez prendre rendez-vous facilement sur Doctolib 24h/24, ou nous appeler directement au 09 83 43 96 21 pendant nos horaires d\'ouverture.' },
      { question: 'Le cabinet est-il accessible aux personnes à mobilité réduite ?', reponse: 'Oui, le cabinet se trouve au rez-de-chaussée avec une entrée accessible PMR. L\'accès est donc facilité pour les personnes en fauteuil roulant ou avec des difficultés de mobilité.' },
      { question: 'Quelles langues sont parlées au cabinet ?', reponse: 'Le Dr Meriot parle français, anglais et espagnol. Vous pouvez donc consulter dans la langue avec laquelle vous êtes le plus à l\'aise.' },
      { question: 'La parodontie, qu\'est-ce que c\'est ?', reponse: 'La parodontie est la spécialité qui traite les maladies des gencives et des tissus de soutien des dents (parodonte). Elle permet de soigner les gingivites, parodontites, et de prévenir le déchaussement dentaire. Le Dr Meriot est spécialisée en parodontie grâce à ses formations à l\'IFPIO de Marseille et à l\'Académie de paro d\'Aix-en-Provence.' },
      { question: 'Qu\'est-ce qu\'un implant dentaire ?', reponse: 'Un implant dentaire est une racine artificielle en titane qui est placée dans l\'os de la mâchoire pour remplacer une dent manquante. Il sert de support à une couronne dentaire et permet de retrouver une fonction masticatoire optimale de façon durable.' },
      { question: 'J\'ai peur du dentiste, comment cela se passe ?', reponse: 'L\'anxiété dentaire est très courante et nous la prenons en compte. Le Dr Meriot adopte une approche douce et bienveillante : elle prend le temps d\'expliquer chaque étape, respecte votre rythme et s\'assure de votre confort tout au long des soins. N\'hésitez pas à exprimer vos craintes lors de la consultation.' },
      { question: 'Combien coûte une consultation ?', reponse: 'Une consultation de base coûte 23€ (tarif conventionné secteur 1). Les autres actes varient selon les soins nécessaires. Nous vous informons toujours du coût avant de débuter un traitement, et établissons un devis détaillé pour les soins plus complexes.' },
      { question: 'Le cabinet pratique-t-il la dentisterie conservatrice ?', reponse: 'Oui, c\'est même une philosophie centrale du Dr Meriot. Sa thèse porte sur la dentisterie à minima, ce qui signifie qu\'elle privilégie les techniques permettant de conserver au maximum vos tissus naturels (émail, dentine) tout en assurant des soins efficaces et durables.' },
    ]),
  },

  // ─── Gingivite Marseille ──────────────────────────────────────────────────
  {
    _id: 'singleton-gingivite-marseille',
    _type: 'gingivite_marseille',
    seoTitle: 'Gingivite Marseille | Traitement gencives inflammées — Dr Meriot',
    seoDescription: 'Traitement de la gingivite à Marseille. Gencives qui saignent, rouges, gonflées ? Le Dr Meriot, spécialiste parodontie, soigne vos gencives. Consultation rapide.',
    heroTitle: 'Traitement de la gingivite à Marseille',
    heroSubtitle: 'Vos gencives saignent, sont rouges ou gonflées ? La gingivite est une inflammation fréquente et réversible. Au cabinet du Dr Meriot, nous diagnostiquons et traitons la gingivite pour préserver la santé de vos gencives.',
    definitionTitre: 'Qu\'est-ce que la gingivite ?',
    definitionTexte1: 'La gingivite est une inflammation de la gencive, le plus souvent causée par l\'accumulation de plaque dentaire à la base des dents. C\'est la forme la plus courante des maladies parodontales et elle touche une grande partie de la population à un moment ou un autre de sa vie.',
    definitionTexte2: 'Contrairement à la parodontite, la gingivite ne touche que la gencive superficielle et n\'endommage pas l\'os. C\'est pourquoi elle est totalement réversible avec un traitement adapté. Cependant, sans prise en charge, elle peut évoluer vers une parodontite, maladie plus grave qui entraîne la perte de l\'os de soutien des dents.',
    causesTitre: 'Les causes de la gingivite',
    causesList: keyed([
      { title: 'Plaque dentaire', desc: 'L\'accumulation de bactéries sur les dents et le long de la gencive est la cause principale de la gingivite.' },
      { title: 'Tartre', desc: 'La plaque non éliminée se calcifie en tartre, impossible à retirer par le brossage seul.' },
      { title: 'Tabac', desc: 'Le tabac réduit la circulation sanguine dans les gencives et masque les signes d\'inflammation.' },
      { title: 'Changements hormonaux', desc: 'Grossesse, puberté et ménopause peuvent favoriser l\'inflammation des gencives.' },
      { title: 'Diabète', desc: 'Un diabète mal équilibré augmente le risque d\'infections gingivales.' },
      { title: 'Stress', desc: 'Le stress affaiblit le système immunitaire et favorise l\'inflammation.' },
    ]),
    symptomesTitre: 'Reconnaître les symptômes de la gingivite',
    symptomesList: [
      'Gencives rouges et gonflées',
      'Saignements au brossage ou au passage du fil dentaire',
      'Mauvaise haleine persistante (halitose)',
      'Gencives sensibles au toucher',
      'Gencives qui se rétractent légèrement',
    ],
    traitementTitre: 'Comment traiter la gingivite au cabinet ?',
    traitementTexte: 'Le traitement de la gingivite repose sur un détartrage professionnel complet réalisé au cabinet, associé à des conseils d\'hygiène bucco-dentaire personnalisés. Le Dr Meriot évalue l\'état de vos gencives et adapte le plan de soin à votre situation. Dans la plupart des cas, une seule séance de détartrage et l\'adoption d\'une bonne routine de brossage suffisent à retrouver des gencives saines en quelques semaines. Un suivi régulier est recommandé pour prévenir toute récidive.',
    preventionTitre: 'Prévenir la gingivite au quotidien',
    preventionTexte: 'La prévention de la gingivite passe par une hygiène bucco-dentaire rigoureuse : brossage deux fois par jour avec une brosse à dents souple, utilisation quotidienne du fil dentaire ou de brossettes interdentaires, et visites régulières chez votre dentiste. Arrêter le tabac, équilibrer un diabète éventuel et gérer le stress contribuent également à préserver la santé de vos gencives.',
    faqTitre: 'Questions fréquentes sur la gingivite',
    faqList: keyed([
      { question: 'La gingivite est-elle grave ?', answer: 'La gingivite est une inflammation réversible des gencives. Sans traitement, elle peut évoluer en parodontite, une maladie plus grave qui entraîne la perte de l\'os de soutien des dents. C\'est pourquoi il est important de la traiter dès les premiers signes.' },
      { question: 'Comment soigner une gingivite à Marseille ?', answer: 'Le traitement commence par un détartrage professionnel au cabinet, suivi de conseils d\'hygiène personnalisés. Le Dr Meriot réalise un bilan complet de vos gencives et adapte le traitement à votre situation. Prenez rendez-vous pour un diagnostic.' },
      { question: 'Combien de temps dure le traitement d\'une gingivite ?', answer: 'Avec un traitement adapté et une bonne hygiène bucco-dentaire, la gingivite peut guérir en 2 à 3 semaines. Un suivi régulier est recommandé pour prévenir les récidives.' },
      { question: 'Quels sont les premiers signes de la gingivite ?', answer: 'Les premiers signes sont des gencives qui saignent au brossage, des gencives rouges ou gonflées, et parfois une mauvaise haleine. Si vous observez ces symptômes, consultez rapidement.' },
      { question: 'La gingivite peut-elle revenir après traitement ?', answer: 'Oui, sans une hygiène bucco-dentaire rigoureuse et des visites régulières chez le dentiste, la gingivite peut récidiver. Un suivi parodontal tous les 3 à 6 mois est recommandé.' },
    ]),
    ctaTitre: 'Vos gencives sont inflammées ?',
    ctaTexte: 'N\'attendez pas que la gingivite évolue. Un diagnostic rapide et un traitement adapté permettent de retrouver des gencives saines en quelques semaines.',
  },

  // ─── Déchaussement dentaire ───────────────────────────────────────────────
  {
    _id: 'singleton-dechaussement-dentaire',
    _type: 'dechaussement_dentaire',
    seoTitle: 'Déchaussement dentaire Marseille | Traitement récession gingivale — Dr Meriot',
    seoDescription: 'Traitement du déchaussement dentaire à Marseille. Dents qui se déchaussent, racines exposées ? Le Dr Meriot, spécialiste parodontie, traite la récession gingivale.',
    heroTitle: 'Déchaussement dentaire à Marseille',
    heroSubtitle: 'Vos dents paraissent plus longues ? Vos racines sont visibles ? Le déchaussement dentaire (récession gingivale) est un problème fréquent que le Dr Meriot traite avec expertise grâce à des techniques modernes et douces.',
    definitionTitre: 'Qu\'est-ce que le déchaussement dentaire ?',
    definitionTexte1: 'Le déchaussement dentaire, ou récession gingivale, désigne la rétraction progressive de la gencive qui entoure les dents. Ce phénomène expose la racine dentaire, normalement protégée par la gencive, et peut entraîner une sensibilité accrue, des problèmes esthétiques et, dans les cas avancés, une mobilité des dents.',
    definitionTexte2: 'Le déchaussement dentaire peut toucher une seule dent ou plusieurs. Il évolue souvent lentement et sans douleur, ce qui le rend difficile à détecter sans un examen professionnel. C\'est pourquoi un bilan parodontal régulier est essentiel pour le dépister à temps.',
    causesTitre: 'Les causes du déchaussement dentaire',
    causesList: keyed([
      { title: 'Parodontite', desc: 'La cause principale du déchaussement dentaire est la parodontite, une infection bactérienne qui détruit progressivement l\'os et la gencive autour des dents.' },
      { title: 'Brossage trop agressif', desc: 'Un brossage trop vigoureux ou une brosse à dents dure peuvent provoquer une récession gingivale mécanique.' },
      { title: 'Tabac', desc: 'Le tabac accélère la perte osseuse et masque les signes d\'inflammation, retardant le diagnostic.' },
      { title: 'Bruxisme', desc: 'Le grincement ou le serrement des dents exerce des forces excessives qui peuvent fragiliser le parodonte.' },
      { title: 'Génétique', desc: 'Certaines personnes ont une prédisposition génétique à la perte d\'attache parodontale.' },
      { title: 'Malocclusion', desc: 'Un alignement anormal des dents peut créer des zones de surcharge favorisant le déchaussement.' },
    ]),
    symptomesTitre: 'Les signes du déchaussement dentaire',
    symptomesList: [
      'Dents qui paraissent plus longues (racines visibles)',
      'Sensibilité au froid et au chaud au niveau des collets',
      'Espaces entre les dents qui s\'élargissent',
      'Mobilité des dents',
      'Tassements alimentaires fréquents entre les dents',
      'Gencives rétractées ou asymétriques',
    ],
    traitementTitre: 'Comment traiter le déchaussement dentaire ?',
    traitementTexte: 'Le traitement du déchaussement dentaire dépend de sa cause et de sa sévérité. Le Dr Meriot propose des solutions adaptées, allant du traitement non chirurgical à la chirurgie reconstructrice.',
    traitementsList: keyed([
      { title: 'Surfaçage radiculaire', desc: 'Nettoyage en profondeur des racines sous la gencive pour éliminer les bactéries et le tartre, réalisé sous anesthésie locale.' },
      { title: 'Greffe gingivale', desc: 'Technique chirurgicale qui permet de recouvrir les racines exposées en déplaçant ou en greffant du tissu gingival.' },
      { title: 'Régénération osseuse guidée', desc: 'Technique avancée qui stimule la reformation de l\'os perdu autour des dents à l\'aide de biomatériaux.' },
      { title: 'Suivi parodontal', desc: 'Visites régulières tous les 3 à 6 mois pour maintenir les résultats et prévenir toute récidive.' },
    ]),
    faqTitre: 'Questions fréquentes sur le déchaussement dentaire',
    faqList: keyed([
      { question: 'Le déchaussement dentaire est-il irréversible ?', answer: 'La perte osseuse causée par la parodontite est irréversible, mais le traitement permet de stopper son évolution. La greffe gingivale peut recouvrir les racines exposées et les techniques de régénération osseuse peuvent restaurer partiellement le tissu perdu.' },
      { question: 'Comment savoir si mes dents se déchaussent ?', answer: 'Les signes incluent : des dents qui paraissent plus longues, des racines visibles, une sensibilité au froid et au chaud au niveau des collets, des espaces qui apparaissent entre les dents, et une mobilité dentaire. Un bilan parodontal au cabinet permet un diagnostic précis.' },
      { question: 'Combien coûte le traitement du déchaussement dentaire ?', answer: 'Le coût dépend de la sévérité du déchaussement et du traitement nécessaire. Le Dr Meriot est conventionnée secteur 1. Un devis détaillé est remis après le bilan parodontal.' },
      { question: 'Peut-on prévenir le déchaussement dentaire ?', answer: 'Oui, une hygiène bucco-dentaire rigoureuse, l\'arrêt du tabac et des visites régulières chez le dentiste permettent de prévenir le déchaussement. Un détartrage professionnel régulier élimine le tartre que le brossage ne peut pas atteindre.' },
      { question: 'Le déchaussement dentaire fait-il mal ?', answer: 'Le déchaussement est souvent indolore dans les premiers stades, ce qui le rend sournois. La sensibilité au froid et au chaud apparaît quand les racines sont exposées. Une douleur peut survenir en cas d\'infection ou d\'abcès parodontal.' },
    ]),
    ctaTitre: 'Vos dents se déchaussent ?',
    ctaTexte: 'Plus le diagnostic est précoce, plus les solutions sont simples et efficaces. Le Dr Meriot réalise un bilan parodontal complet pour évaluer votre situation et vous proposer un traitement adapté.',
  },

  // ─── Gencives qui saignent ────────────────────────────────────────────────
  {
    _id: 'singleton-gencives-qui-saignent',
    _type: 'gencives_qui_saignent',
    seoTitle: 'Gencives qui saignent : causes et traitement | Dr Meriot Marseille',
    seoDescription: 'Vos gencives saignent au brossage ? Découvrez les causes du saignement gingival et les solutions. Dr Meriot, spécialiste parodontie à Marseille.',
    heroTitle: 'Gencives qui saignent : que faire ?',
    heroSubtitle: 'Vos gencives saignent quand vous vous brossez les dents ? Ce n\'est pas normal. Le saignement gingival est un signe d\'inflammation qu\'il ne faut pas ignorer. Au cabinet du Dr Meriot à Marseille, nous identifions la cause et vous proposons un traitement adapté.',
    definitionTitre: 'Pourquoi les gencives saignent-elles ?',
    definitionTexte1: 'Les gencives saines sont roses, fermes et ne saignent pas. Quand elles saignent, c\'est le signe que quelque chose ne va pas. Le plus souvent, le saignement est causé par une accumulation de plaque dentaire qui provoque une inflammation de la gencive : c\'est la gingivite.',
    definitionTexte2: 'Le saignement gingival est le premier signal d\'alarme que votre corps vous envoie. Si vous l\'ignorez, l\'inflammation peut progresser vers les tissus plus profonds (os, ligament) et devenir une parodontite, avec un risque de déchaussement et de perte des dents.',
    causesTitre: 'Les causes du saignement des gencives',
    causesList: keyed([
      { title: 'Plaque dentaire et tartre', desc: 'La cause la plus fréquente : l\'accumulation de bactéries sur les dents provoque une inflammation de la gencive qui réagit en saignant.' },
      { title: 'Brossage inadapté', desc: 'Un brossage trop vigoureux, une brosse à dents trop dure ou une technique incorrecte peuvent irriter les gencives et provoquer des saignements.' },
      { title: 'Tabac', desc: 'Le tabac masque les saignements en réduisant la circulation sanguine, ce qui peut retarder le diagnostic d\'un problème gingival.' },
      { title: 'Grossesse', desc: 'Les changements hormonaux pendant la grossesse augmentent la sensibilité des gencives et les rendent plus sujettes aux saignements.' },
      { title: 'Médicaments', desc: 'Certains médicaments (anticoagulants, antihypertenseurs) peuvent favoriser les saignements gingivaux.' },
      { title: 'Carences nutritionnelles', desc: 'Un manque de vitamine C ou K peut fragiliser les gencives et augmenter les saignements.' },
    ]),
    quandConsulterTitre: 'Quand consulter un dentiste ?',
    quandConsulterList: [
      'Saignements persistants depuis plus de 2 semaines',
      'Gencives très rouges, gonflées ou douloureuses',
      'Mauvaise haleine qui ne disparaît pas',
      'Impression que les dents bougent ou se déchaussent',
      'Saignements spontanés (sans brossage)',
      'Apparition de pus entre les dents et la gencive',
    ],
    traitementTitre: 'Comment traiter les saignements de gencives ?',
    traitementTexte: 'Le traitement des saignements de gencives commence par un diagnostic précis. Le Dr Meriot examine l\'état de vos gencives, mesure les poches parodontales si nécessaire, et identifie la cause du saignement. Le traitement de base consiste en un détartrage professionnel complet, complété par des conseils d\'hygiène personnalisés. Si une parodontite est diagnostiquée, un surfaçage radiculaire pourra être proposé pour nettoyer en profondeur sous la gencive.',
    conseilsTitre: 'Nos conseils pour des gencives saines',
    conseilsList: keyed([
      { title: 'Brosse à dents souple', desc: 'Utilisez une brosse à dents souple et changez-la tous les 3 mois. Brossez-vous les dents 2 fois par jour pendant 2 minutes.' },
      { title: 'Fil dentaire ou brossettes', desc: 'Nettoyez les espaces interdentaires une fois par jour avec du fil dentaire ou des brossettes adaptées à la taille de vos espaces.' },
      { title: 'Technique de brossage', desc: 'Brossez du rose vers le blanc (de la gencive vers la dent) avec des mouvements doux et roulés, sans appuyer trop fort.' },
      { title: 'Détartrage régulier', desc: 'Faites réaliser un détartrage professionnel au moins une fois par an, ou tous les 6 mois si vous êtes sujet aux problèmes de gencives.' },
    ]),
    faqTitre: 'Questions fréquentes sur les saignements de gencives',
    faqList: keyed([
      { question: 'Pourquoi mes gencives saignent au brossage ?', answer: 'Le saignement au brossage est le signe le plus fréquent de la gingivite, une inflammation causée par l\'accumulation de plaque dentaire. Un détartrage professionnel et une amélioration de l\'hygiène bucco-dentaire suffisent généralement à résoudre le problème.' },
      { question: 'Est-ce normal que les gencives saignent ?', answer: 'Non, des gencives saines ne saignent pas. Le saignement gingival est toujours un signe d\'inflammation qu\'il faut prendre au sérieux. Même léger, il indique une réaction de la gencive à la présence de bactéries.' },
      { question: 'Dois-je arrêter de me brosser les dents si mes gencives saignent ?', answer: 'Non, au contraire ! Le saignement indique que la zone a besoin d\'être mieux nettoyée. Utilisez une brosse à dents souple et brossez doucement mais régulièrement les zones qui saignent. Le saignement devrait diminuer en quelques jours.' },
      { question: 'Quand faut-il consulter pour des gencives qui saignent ?', answer: 'Consultez si les saignements persistent au-delà de 2 semaines malgré une bonne hygiène, s\'ils s\'accompagnent de douleurs, de gonflements importants, de mauvaise haleine ou si vous constatez un déchaussement des dents.' },
      { question: 'Les gencives qui saignent peuvent-elles entraîner la perte des dents ?', answer: 'Si le saignement est le signe d\'une gingivite non traitée, celle-ci peut évoluer en parodontite, qui détruit l\'os de soutien des dents et peut effectivement mener à leur perte. D\'où l\'importance de consulter dès les premiers signes.' },
    ]),
    ctaTitre: 'Vos gencives saignent ?',
    ctaTexte: 'Le saignement des gencives est un signal qu\'il ne faut pas ignorer. Un diagnostic rapide permet de traiter le problème simplement, avant qu\'il ne s\'aggrave.',
  },
]

async function seed() {
  console.log(`🌱 Seeding ${documents.length} documents into Sanity (project 6a2np8jy / production)...\n`)

  for (const doc of documents) {
    const { _id, ...docWithoutId } = doc
    try {
      // Check if a document of this type already exists
      const existing = await client.fetch(`*[_type == $type][0]._id`, { type: doc._type })
      if (existing) {
        // Patch existing document
        await client.patch(existing).set(docWithoutId).commit()
        console.log(`  ✅  ${doc._type} — patched existing (${existing})`)
      } else {
        // Create new document (let Sanity generate the ID)
        const created = await client.create(docWithoutId)
        console.log(`  ✅  ${doc._type} — created (${created._id})`)
      }
    } catch (err) {
      console.error(`  ❌  ${doc._type}:`, err.message)
    }
  }

  console.log('\n✨ Done. Open your Sanity Studio to verify and edit the content.')
}

seed()
