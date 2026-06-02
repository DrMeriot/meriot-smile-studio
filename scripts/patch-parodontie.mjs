/**
 * Réconciliation du doc Sanity `parodontie` (P0-infra « Sanity golden »).
 *
 * Contexte : le doc Sanity live est un brouillon V0 (fautes, 3 FAQ, 4 étapes),
 * inférieur au fallback JSX poli. Maintenant que /parodontie lit Sanity au build
 * (loader SSG), ce doc deviendrait le contenu indexé → régression. Ce script
 * écrase les champs avec le contenu poli du fallback JSX + les améliorations SEO
 * validées (titres exact-match « parodontologue/parodontiste à Marseille »,
 * 8 FAQ, 5 symptômes, description géo).
 *
 * Idempotent : `.set()` remplace les champs ciblés, conserve _id/_type.
 * Lancer : node scripts/patch-parodontie.mjs   (requiert SANITY_TOKEN dans .env.local)
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnvLocal() {
  try {
    const content = readFileSync(resolve(__dirname, '../.env.local'), 'utf8')
    for (const line of content.split('\n')) {
      const [key, ...rest] = line.split('=')
      if (key && rest.length && !process.env[key.trim()]) {
        process.env[key.trim()] = rest.join('=').trim()
      }
    }
  } catch {
    // .env.local absent → on compte sur l'environnement
  }
}

loadEnvLocal()

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  SANITY_TOKEN manquant. Ajoute-le dans .env.local.')
  process.exit(1)
}

const client = createClient({
  projectId: '6a2np8jy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Ajoute _key aux items d'array d'objets (requis par Sanity).
function keyed(arr) {
  return arr.map((item, i) => ({ ...item, _key: `item${i}` }))
}

// ─── Contenu réconcilié (fallback JSX poli + deltas SEO validés) ──────────────
const content = {
  // ── SEO (deltas validés) ──
  seoTitle: `Parodontologue à Marseille — Dr Meriot, spécialiste gencives`,
  seoDescription: `Dr Stéphanie Meriot, parodontologue à Marseille 4e : gencives, gingivite, parodontite, déchaussement. Conventionné secteur 1. Prenez rendez-vous.`,

  // ── Hero ──
  heroTitle: `Parodontie à Marseille — votre spécialiste des gencives`,
  heroSubtitle: `Dr Stéphanie Meriot, chirurgien-dentiste spécialisée en parodontie (parodontiste) à Marseille 4ème. Diagnostic, traitement et suivi des maladies des gencives — gingivite, parodontite, déchaussement, récession — pour préserver durablement votre sourire.`,

  // ── Définition ──
  definitionTitre: `Qu'est-ce que la parodontie ?`,
  definitionTexte1: `La parodontie est la spécialité dentaire qui traite les maladies des gencives et des tissus de soutien des dents (os, ligament). Ces tissus forment le parodonte, l'ensemble des structures qui ancrent vos dents dans votre mâchoire.`,
  definitionTexte2: `Sans traitement, les maladies parodontales peuvent entraîner un déchaussement et même la perte de vos dents. Heureusement, une prise en charge précoce permet de stabiliser et d'améliorer votre santé parodontale.`,

  // ── Symptômes (4 fallback + 5e « Récession gingivale ») ──
  symptomesTitre: `Symptômes à surveiller`,
  symptomesList: keyed([
    { title: `Gencives qui saignent`, desc: `Au brossage, lors du passage du fil dentaire, ou même spontanément. C'est souvent le premier signe d'une gingivite.` },
    { title: `Gencives gonflées ou rouges`, desc: `Une inflammation visible, des gencives sensibles au toucher, ou une couleur rouge foncé au lieu de rose pâle.` },
    { title: `Mauvaise haleine persistante`, desc: `Une halitose chronique peut être causée par des bactéries sous la gencive.` },
    { title: `Déchaussement ou mobilité`, desc: `Racines apparentes, dents qui bougent, espaces entre les dents qui s'élargissent avec tassements alimentaires.` },
    { title: `Récession gingivale`, desc: `Les gencives se rétractent et les dents paraissent plus longues, avec parfois une sensibilité au niveau des collets.` },
  ]),

  // ── Maladies ──
  maladiesTitre: `Les maladies parodontales : comprendre simplement`,
  maladiesIntro: `Les maladies parodontales touchent les tissus qui entourent et soutiennent les dents : la gencive et l'os. Elles sont causées par l'accumulation de bactéries autour des dents. On distingue deux étapes : la gingivite et la parodontite.`,
  gingiviteTitre: `La gingivite : le premier signe d'alerte`,
  gingiviteTexte: `La gingivite est une inflammation de la gencive. Elle peut se manifester par :`,
  gingiviteItems: [
    `des gencives rouges, gonflées,`,
    `des saignements au brossage,`,
    `parfois une mauvaise haleine.`,
  ],
  gingiviteNote: `La bonne nouvelle : la gingivite est totalement réversible. Un nettoyage professionnel et de bonnes habitudes d'hygiène suffisent généralement pour retrouver une gencive saine.`,
  parodontiteTitre: `La parodontite : quand l'inflammation va plus loin`,
  parodontiteTexte: `Si la gingivite n'est pas traitée, l'inflammation peut progresser vers les tissus plus profonds. On parle alors de parodontite. Cette maladie peut provoquer :`,
  parodontiteItems: [
    `un déchaussement des dents,`,
    `leur mobilité,`,
    `des rétractations de la gencive,`,
    `des infections ou des abcès.`,
  ],
  parodontiteNote: `La parodontite entraîne une perte de l'os qui soutient les dents. Cette perte est irréversible, mais le traitement permet de stopper l'évolution de la maladie et de préserver les dents.`,

  // ── Traitements (5 étapes du fallback) ──
  traitementsTitre: `Les traitements parodontaux : comment soigne-t-on les gencives ?`,
  traitementsIntro: `Les maladies des gencives se soignent très bien lorsqu'elles sont prises en charge à temps. Les traitements parodontaux sont réalisés de façon douce, progressive et toujours adaptée à votre confort. L'objectif : stopper l'inflammation, préserver vos dents et retrouver une bouche saine et sereine.`,
  traitementsList: keyed([
    {
      step: `1`,
      title: `Un diagnostic complet pour bien vous accompagner`,
      desc: `Avant tout traitement, nous réalisons un examen précis de vos gencives et de l'os autour des dents. Cela comprend :`,
      items: [`un examen clinique détaillé,`, `la mesure des poches parodontales,`, `l'évaluation de la mobilité des dents,`, `l'analyse de la plaque et de l'inflammation,`, `et des radiographies.`],
      note: `Ce bilan complet permet de définir un plan de soins personnalisé et sécurisé, adapté à votre situation et à votre confort.`,
    },
    {
      step: `2`,
      title: `Le détartrage et l'accompagnement à l'hygiène`,
      desc: `La première étape du traitement consiste à éliminer la plaque dentaire et le tartre, et à vous accompagner dans l'amélioration de votre hygiène bucco-dentaire au quotidien.`,
      items: [`Détartrage professionnel complet`, `Conseils personnalisés de brossage`, `Choix des outils adaptés (brossettes, fil dentaire)`],
      note: ``,
    },
    {
      step: `3`,
      title: `Le surfaçage radiculaire : un nettoyage en profondeur`,
      desc: `Si nécessaire, nous réalisons un surfaçage radiculaire sous anesthésie locale. Ce soin consiste à nettoyer en profondeur sous la gencive pour éliminer les bactéries et le tartre qui se sont accumulés sur les racines des dents.`,
      items: [`Indolore (sous anesthésie locale)`, `Réalisé en 2 à 4 séances selon les cas`, `Permet de réduire les poches parodontales`],
      note: ``,
    },
    {
      step: `4`,
      title: `La chirurgie parodontale (si nécessaire)`,
      desc: `Dans les cas les plus avancés, une chirurgie parodontale peut être proposée pour accéder directement aux racines et à l'os.`,
      items: [`Réduction chirurgicale des poches profondes`, `Greffe gingivale pour recouvrir les racines exposées`, `Régénération osseuse guidée`],
      note: ``,
    },
    {
      step: `5`,
      title: `Le suivi parodontal : la clé du succès à long terme`,
      desc: `Le traitement parodontal ne s'arrête pas après les soins. Un suivi régulier est essentiel.`,
      items: [`Détartrages professionnels tous les 3 à 6 mois`, `Contrôle de l'état des gencives`, `Ajustement des conseils d'hygiène`],
      note: ``,
    },
  ]),

  // ── FAQ (8 questions du fallback) ──
  faqTitre: `Questions fréquentes sur la parodontie`,
  faqList: keyed([
    { question: `Qu'est-ce que la parodontie ?`, answer: `La parodontie est la spécialité dentaire qui traite les maladies des gencives et des tissus de soutien des dents (os alvéolaire, ligament parodontal). Elle prend en charge la gingivite, la parodontite et le déchaussement dentaire.` },
    { question: `Quelle différence entre un dentiste et un parodontologue ?`, answer: `Un parodontologue est un chirurgien-dentiste qui a suivi une formation approfondie en parodontologie (maladies des gencives) et qui consacre une part importante de son activité au diagnostic et au traitement de ces pathologies. Le Dr Meriot, formée à l'Académie de Parodontologie d'Aix-en-Provence et à l'IFPIO Marseille, exerce comme chirurgien-dentiste spécialisée en parodontie et implantologie.` },
    { question: `Quand consulter un spécialiste des gencives à Marseille ?`, answer: `Dès l'apparition de gencives qui saignent au brossage, gonflées, rouges ou douloureuses, en cas de mauvaise haleine persistante, de récession gingivale, de mobilité dentaire ou si votre dentiste traitant vous oriente pour un bilan parodontal. Une consultation précoce permet d'éviter une perte osseuse irréversible.` },
    { question: `Faut-il une ordonnance pour consulter en parodontie ?`, answer: `Non, vous pouvez prendre rendez-vous directement avec le Dr Meriot, sans ordonnance ni courrier de votre dentiste traitant. La consultation et les soins parodontaux sont accessibles en accès direct, et le cabinet est conventionné Secteur 1.` },
    { question: `Comment savoir si j'ai une maladie des gencives ?`, answer: `Les signes d'alerte incluent : gencives qui saignent au brossage, gencives rouges ou gonflées, mauvaise haleine persistante, déchaussement ou mobilité des dents, sensibilité au niveau des collets. Consultez rapidement si vous observez ces symptômes.` },
    { question: `Le traitement parodontal fait-il mal ?`, answer: `Les traitements parodontaux sont réalisés sous anesthésie locale pour garantir votre confort. Le surfaçage radiculaire est indolore pendant l'intervention. Une légère sensibilité peut persister quelques jours après, facilement soulagée par des antalgiques.` },
    { question: `Combien coûte un traitement parodontal à Marseille ?`, answer: `Le coût varie selon la sévérité de la maladie. Le Dr Meriot est conventionnée secteur 1, garantissant des tarifs maîtrisés. Un devis détaillé vous est remis après le bilan parodontal initial. Une partie des soins est prise en charge par l'Assurance Maladie.` },
    { question: `La parodontite est-elle réversible ?`, answer: `La gingivite est totalement réversible avec un traitement adapté. La parodontite entraîne une perte osseuse irréversible, mais le traitement permet de stopper l'évolution de la maladie, de préserver les dents et de retrouver des gencives saines.` },
  ]),

  // ── Cross-links + CTA ──
  crosslinksTitre: `Découvrez nos autres spécialités`,
  ctaTitre: `Prenez soin de vos gencives`,
  ctaTexte: `N'attendez pas que les symptômes s'aggravent. Plus le diagnostic est précoce, plus le traitement est simple et efficace.`,
}

// ─── Exécution ────────────────────────────────────────────────────────────────
const DOC_ID = 'parodontie'
console.log(`→ Patch du doc « ${DOC_ID} » (${Object.keys(content).length} champs)…`)
client
  .patch(DOC_ID)
  .set(content)
  .commit()
  .then((res) => {
    console.log(`✅  Doc « ${res._id} » mis à jour (rev ${res._rev}).`)
    console.log(`   FAQ: ${content.faqList.length} · symptômes: ${content.symptomesList.length} · traitements: ${content.traitementsList.length} étapes`)
  })
  .catch((err) => {
    console.error('❌  Échec du patch :', err.message)
    process.exit(1)
  })
