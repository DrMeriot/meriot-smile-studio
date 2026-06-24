/**
 * Seed des champs Sanity restés VIDES après le chantier « rendre éditable » (Lots 1-4).
 *
 * Remplit UNIQUEMENT les champs vides (undefined / null / "" / [] ) avec le texte
 * qui était jusque-là codé en dur dans les composants React. Ne touche JAMAIS un
 * champ déjà saisi dans Sanity → le contenu déjà rempli par le client est conservé.
 *
 * Cible le document PUBLIÉ de chaque singleton. Idempotent : relançable sans risque.
 *
 * Lancer :
 *   node scripts/seed-champs-vides.mjs            (applique les changements)
 *   node scripts/seed-champs-vides.mjs --dry-run  (affiche ce qui serait fait, sans écrire)
 *
 * Requiert SANITY_TOKEN (permissions Editor) dans .env.local.
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
  console.error('❌  SANITY_TOKEN manquant. Ajoute-le dans .env.local (permissions Editor).')
  process.exit(1)
}

const DRY = process.argv.includes('--dry-run')

const client = createClient({
  projectId: '6a2np8jy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
let _k = 0
const key = () => `seed${(_k++).toString(36)}`
const keyed = (arr) => arr.map((it) => ({ ...it, _key: key() }))

// Un champ est « vide » s'il est absent, null, chaîne vide/espaces, ou tableau vide.
const isEmpty = (v) =>
  v === undefined ||
  v === null ||
  (typeof v === 'string' && v.trim() === '') ||
  (Array.isArray(v) && v.length === 0)

// ─── Constructeurs Portable Text (compatibles src/lib/portableTextComponents.tsx) ──
const norm = (p) => (typeof p === 'string' ? { text: p } : p)
function ptBlock(style, parts, listItem) {
  const markDefs = []
  const children = parts.map((raw) => {
    const p = norm(raw)
    const marks = [...(p.marks || [])]
    if (p.href) {
      const lk = key()
      markDefs.push({ _type: 'link', _key: lk, href: p.href })
      marks.push(lk)
    }
    return { _type: 'span', _key: key(), text: p.text, marks }
  })
  const b = { _type: 'block', _key: key(), style, markDefs, children }
  if (listItem) {
    b.listItem = listItem
    b.level = 1
  }
  return b
}
const P = (...parts) => ptBlock('normal', parts.length ? parts : [{ text: '' }])
const H2 = (text) => ptBlock('h2', [norm(text)])
const LI = (...parts) => ptBlock('normal', parts, 'bullet')
const B = (text) => ({ text, marks: ['strong'] })
const L = (text, href) => ({ text, href })

// Valeurs concrètes baked dans les pages légales (texte statique).
const NOM = 'Dr Stéphanie Meriot'
const ADRESSE = '23 Boulevard de la Fédération, 13004 Marseille'
const TEL = '09 83 43 96 21'
const RPPS = '10100720993'

// ─── Contenus par défaut (extraits 1:1 des composants) ──────────────────────────
const DEFAULTS = {
  accueil: {
    // Praticienne
    praticienNom: NOM,
    praticienDescription:
      "Diplômée de la Faculté d'odontologie de Marseille, je suis chirurgien-dentiste spécialisée en parodontie et implantologie. Mon approche repose sur l'écoute, la douceur et le respect du rythme de chaque patient.",
    praticienParcours:
      "Ma thèse sur la dentisterie à minima reflète ma philosophie : préserver au maximum vos tissus naturels tout en vous offrant des soins de qualité. Chaque traitement est personnalisé et expliqué avec clarté.",
    praticienCitation:
      "Je prends le temps d'expliquer chaque étape de vos soins, pour que vous vous sentiez en confiance et acteur de votre santé bucco-dentaire.",
    praticienHighlights: keyed([
      { titre: 'Formations spécialisées', description: 'IFPIO Marseille, Académie de paro Aix-en-Provence' },
      { titre: 'Expérience internationale', description: 'Marseille, Paris, Genève (Suisse)' },
      { titre: 'Approche bienveillante', description: "Prise en compte de l'anxiété dentaire" },
      { titre: 'Multilingue', description: '🇫🇷 Français · 🇬🇧 Anglais · 🇪🇸 Espagnol' },
    ]),
    // Services (section accueil)
    servicesTitre: 'Des soins adaptés à vos besoins',
    servicesIntro:
      "Du simple détartrage à la pose d'implants, je vous accompagne avec expertise et bienveillance dans tous vos soins dentaires.",
    servicesList: keyed([
      { titre: 'Soins dentaires généraux', description: 'Consultations, détartrage, soins des caries, dévitalisation. Prise en charge complète de votre santé bucco-dentaire.', lien: '/services' },
      { titre: 'Parodontie - Spécialité', description: 'Traitement des maladies des gencives, détartrage approfondi, chirurgie parodontale, greffe gingivale. Découvrez aussi mes pages dédiées à la gingivite et au déchaussement dentaire.', lien: '/parodontie' },
      { titre: 'Implantologie - Spécialité', description: "Pose d'implants dentaires, régénération osseuse, restauration complète. Solution durable pour remplacer vos dents manquantes.", lien: '/implantologie' },
      { titre: 'Prévention et hygiène', description: 'Conseils personnalisés, suivi régulier, techniques de brossage adaptées. Prévenir vaut mieux que guérir.', lien: '/gencives-qui-saignent' },
      { titre: 'Dentisterie conservatrice', description: 'Approche minimale invasive selon ma thèse. Préservation maximale de vos tissus naturels.', lien: '/services' },
    ]),
    // QuickLinks
    quicklinksLabel: '✨ Découvrez mes spécialités',
    quicklinksTitle: 'Accès direct à mes expertises',
    quicklinksSpecialites: keyed([
      { titre: 'Parodontie', description: 'Parodontologue à Marseille : soins des gencives et des tissus de soutien des dents', lien: '/parodontie' },
      { titre: 'Implantologie', description: 'Remplacement durable de vos dents manquantes', lien: '/implantologie' },
    ]),
    quicklinksFocus: keyed([
      { titre: 'Gingivite', description: 'Gencives rouges, gonflées, qui saignent', lien: '/gingivite-marseille' },
      { titre: 'Déchaussement', description: 'Racines exposées, mobilité dentaire', lien: '/dechaussement-dentaire-marseille' },
      { titre: 'Gencives qui saignent', description: 'Saignements au brossage : agir tôt', lien: '/gencives-qui-saignent' },
    ]),
    // Contact (section accueil)
    contactTitre: 'Prenez rendez-vous facilement',
    contactIntro:
      'Situé à Marseille 4ème, près du métro Chartreux, mon cabinet est facilement accessible.',
    zonesTitre: "Zone d'intervention",
    zonesTexte:
      "J'accueille des patients de Marseille et de toute la région, dans un rayon de 50 km.",
    zones: keyed([
      { region: 'Marseille', villes: 'Tous arrondissements (13001-13016)' },
      { region: 'Alentours proches', villes: ['Allauch', 'Plan-de-Cuques', 'Les Pennes-Mirabeau', 'Septèmes-les-Vallons', 'La Penne-sur-Huveaune'].join('\n') },
      { region: "Pays d'Aix", villes: ['Aix-en-Provence', 'Gardanne', 'Bouc-Bel-Air', 'Cabriès', 'Simiane-Collongue', 'Meyreuil', 'Fuveau', 'Rousset'].join('\n') },
      { region: 'Côte Bleue', villes: ['Carry-le-Rouet', 'Sausset-les-Pins', 'Marignane', 'Vitrolles', 'Châteauneuf-les-Martigues', 'Gignac-la-Nerthe'].join('\n') },
      { region: 'Aubagne & La Ciotat', villes: ['Aubagne', 'Gémenos', 'Carnoux', 'La Ciotat', 'Cassis', 'Roquefort-la-Bédoule', 'Ceyreste'].join('\n') },
      { region: "Vallée de l'Huveaune", villes: ['Roquevaire', 'Auriol', 'La Destrousse', 'Peypin', 'La Bouilladisse', 'Trets'].join('\n') },
      { region: 'Étang de Berre', villes: ['Martigues', 'Istres', 'Fos-sur-Mer', 'Port-de-Bouc', "Berre-l'Étang", 'Rognac', 'Velaux', 'Miramas'].join('\n') },
      { region: 'Salon & environs', villes: ['Salon-de-Provence', 'Pélissanne', 'Lançon-Provence', 'La Fare-les-Oliviers', 'Lambesc'].join('\n') },
    ]),
    accesList: keyed([
      { item: 'Métro : Chartreux (ligne M1)' },
      { item: 'Bus : Saint Just Ivaldi (42T)' },
      { item: 'Parking public à proximité' },
      { item: 'Entrée accessible PMR' },
    ]),
    // SEO (page d'accueil)
    seoTitle: 'Dr Meriot — Spécialiste des gencives à Marseille | Parodontie',
    seoDescription: 'Dr Stéphanie Meriot, chirurgien-dentiste spécialiste des gencives à Marseille 4ème. Traitement gingivite, parodontite, déchaussement, implants. Conventionnée Secteur 1. Prise de RDV en ligne.',
  },

  parodontie: {
    approcheTitre: 'Mon approche : un parodontologue de confiance à Marseille',
    approcheBody: [
      P(
        "J'ai fait de la santé des gencives l'un des piliers de mon exercice. Diplômée de la Faculté d'Odontologie de Marseille et formée à l'",
        B('Académie de Parodontologie d\'Aix-en-Provence'),
        " ainsi qu'à l'",
        B('IFPIO Marseille'),
        ', je consulte en tant que chirurgien-dentiste spécialisée en parodontie et implantologie — l\'équivalent, dans le langage courant, d\'un parodontologue.',
      ),
      P(
        'Mon approche se veut ',
        B('douce, progressive et personnalisée'),
        ' : chaque traitement parodontal commence par un bilan complet (sondage des poches, analyse de la mobilité, radiographies ciblées), suivi d\'explications claires et d\'un plan de soins adapté à votre rythme. Fidèle à la dentisterie à minima, mon objectif n\'est jamais de multiplier les actes, mais de stopper l\'inflammation au plus tôt et de préserver vos dents naturelles.',
      ),
      P(
        'Le cabinet est ',
        B('conventionné Secteur 1'),
        ', accepte la Carte Vitale et le tiers payant. Vous pouvez me consulter directement, sans courrier ni ordonnance.',
      ),
    ],
    zonesTitre: "Ma zone d'intervention en parodontie",
    zonesList: keyed([
      { titre: 'Marseille intra-muros', description: 'Patients principalement issus du 4ème, 5ème, 6ème, 7ème, 8ème et 1er arrondissement, facilement accessibles par le métro M1 (station Chartreux) ou en voiture.' },
      { titre: 'Métropole Aix-Marseille', description: 'Aix-en-Provence, Aubagne, La Ciotat, Cassis, Allauch, Plan-de-Cuques, Marignane, Vitrolles — la prise en charge parodontale est souvent un motif de consultation spécifique.' },
      { titre: 'Côte Bleue & Étang de Berre', description: 'Carry-le-Rouet, Sausset-les-Pins, Martigues, Istres, Salon-de-Provence — pour des bilans parodontaux et un suivi à long terme.' },
    ]),
  },

  tarifs: {
    heroTitle: 'Tarifs et remboursements',
    heroSubtitle:
      "Transparence et clarté sur nos honoraires. Conventionnée secteur 1, je pratique les tarifs de l'Assurance Maladie pour les soins courants.",
    secteurTitre: 'Conventionnée Secteur 1',
    secteurItems: ['Carte Vitale acceptée', 'Tiers payant Sécurité sociale', 'Tarifs conventionnés', 'Mutuelle'],
    tarifsTitre: 'Tarifs indicatifs',
    soinsCourantsLabel: 'Soins courants',
    soinsSpecialisesLabel: 'Soins spécialisés',
    consultation: '23€',
    implant: '950€',
    parodontieInfo: 'Devis personnalisé selon la complexité',
    devisTitre: 'Devis détaillés gratuits',
    devisTexte:
      'Pour tous les soins complexes, je vous remets un devis détaillé et transparent avant de débuter le traitement.',
    remboursementsTitre: 'Remboursements et prise en charge',
    remboursementsList: keyed([
      { title: 'Assurance Maladie', desc: 'Soins courants remboursés à 60% du tarif conventionné. Tiers payant pour la part SS.' },
      { title: 'Mutuelle complémentaire', desc: 'Remboursement des 40% restant + soins hors nomenclature selon contrat.' },
      { title: '100% Santé (RAC 0)', desc: 'Certaines prothèses intégralement prises en charge.' },
    ]),
    ctaTitre: 'Une question sur les tarifs ?',
    ctaTexte: "N'hésitez pas à me poser vos questions lors de votre consultation.",
  },

  blog_page: {
    heroTitre: 'Blog & Conseils Dentaires',
    heroSubtitle:
      "Découvrez nos articles sur la parodontie, l'implantologie et la santé bucco-dentaire.",
    ctaTitre: 'Une Question sur Votre Santé Dentaire ?',
    ctaTexte: 'Le Dr Stéphanie Meriot est à votre écoute.',
    auteurBio:
      'est chirurgien-dentiste spécialisée en parodontologie et implantologie à Marseille 4ème.',
    articleCtaTitre: "Besoin d'un Rendez-vous ?",
    articleCtaTexte: 'Prenez rendez-vous pour un bilan personnalisé',
    specialitesList: keyed([
      { titre: 'Parodontie', description: 'Traitement des gencives par le Dr Meriot.', lien: '/parodontie' },
      { titre: 'Implantologie', description: "Pose d'implants dentaires durables.", lien: '/implantologie' },
    ]),
    // SEO (page Blog)
    seoTitle: 'Blog Dentaire | Conseils Parodontie & Implantologie - Dr Meriot Marseille',
    seoDescription: "Articles et conseils d'experts sur la parodontie, l'implantologie et les soins dentaires par le Dr Stéphanie Meriot.",
  },

  services_page: {
    servicesList: keyed([
      { title: 'Soins dentaires généraux', description: 'Prendre soin de votre santé bucco-dentaire au quotidien avec des soins adaptés à vos besoins.', details: keyed([
        { subtitle: 'Consultations et examens', text: 'Bilan complet de votre santé bucco-dentaire, dépistage précoce des caries et maladies des gencives.' },
        { subtitle: 'Détartrage', text: 'Nettoyage professionnel pour éliminer la plaque et le tartre.' },
        { subtitle: 'Soins des caries', text: 'Traitement des caries avec des matériaux esthétiques et biocompatibles.' },
        { subtitle: 'Dévitalisation (endodontie)', text: 'Traitement des infections de la pulpe dentaire.' },
      ]) },
      { title: 'Parodontie - Spécialité', featured: true, description: "Spécialité dédiée à la santé de vos gencives. Formation à l'IFPIO Marseille et l'Académie de paro d'Aix-en-Provence.", details: keyed([
        { subtitle: 'Diagnostic parodontal', text: 'Bilan complet : mesure des poches parodontales, évaluation de la perte osseuse.' },
        { subtitle: 'Traitement non-chirurgical', text: 'Détartrage et surfaçage radiculaire.' },
        { subtitle: 'Chirurgie parodontale', text: 'Réduction des poches, régénération tissulaire guidée.' },
        { subtitle: 'Greffe gingivale', text: 'Reconstruction des gencives rétractées.' },
        { subtitle: 'Maintenance parodontale', text: 'Suivi régulier personnalisé.' },
      ]) },
      { title: 'Implantologie - Spécialité', featured: true, description: 'Solution moderne et durable pour remplacer vos dents manquantes. Formation IFPIO Marseille.', details: keyed([
        { subtitle: 'Consultation implantaire', text: 'Examen clinique, scanner 3D, plan de traitement personnalisé.' },
        { subtitle: "Pose d'implants", text: "Insertion chirurgicale d'implants en titane sous anesthésie locale." },
        { subtitle: 'Régénération osseuse', text: 'Greffe osseuse si nécessaire.' },
        { subtitle: 'Restauration prothétique', text: 'Couronne, bridge ou prothèse sur implants.' },
        { subtitle: 'Suivi post-opératoire', text: 'Contrôles réguliers pour garantir la réussite.' },
      ]) },
      { title: 'Prévention et hygiène', description: "La prévention est la clé d'une bonne santé bucco-dentaire.", details: keyed([
        { subtitle: 'Conseils personnalisés', text: 'Techniques de brossage adaptées.' },
        { subtitle: "Éducation à l'hygiène", text: 'Importance du brossage et du détartrage régulier.' },
        { subtitle: 'Suivi régulier', text: 'Contrôles périodiques pour détection précoce.' },
      ]) },
      { title: 'Dentisterie conservatrice', description: 'Préserver au maximum vos tissus naturels. Au cœur de ma thèse universitaire.', details: keyed([
        { subtitle: 'Dentisterie à minima', text: "Techniques modernes pour préserver l'émail et la dentine." },
        { subtitle: 'Diagnostic précoce', text: 'Détection des caries au stade débutant.' },
        { subtitle: 'Matériaux biocompatibles', text: 'Composites esthétiques et résistants, sans mercure.' },
      ]) },
    ]),
  },

  global: {
    maps_embed_url: 'https://www.google.com/maps?q=23+Boulevard+de+la+F%C3%A9d%C3%A9ration,+13004+Marseille&output=embed',
  },

  legal: {
    body: [
      H2('Éditeur du site'),
      P(B(NOM), ' — Chirurgien-dentiste'),
      P(ADRESSE + ', France'),
      P(B('Téléphone : '), TEL),
      P(B('RPPS : '), RPPS),

      H2('Autorité compétente'),
      P('Ordre National des Chirurgiens-Dentistes'),
      P('22 rue Emile Ménier, 75116 Paris'),
      P('Tél : 01 44 34 77 77'),

      H2('Diplômes et qualifications'),
      LI("Docteur en chirurgie dentaire - Faculté d'odontologie de Marseille"),
      LI('Formation spécialisée en Parodontologie - IFPIO Marseille'),
      LI('Formation complémentaire en Parodontologie - Académie de paro, Aix-en-Provence'),
      LI('Formation en Implantologie - IFPIO Marseille'),

      H2("Conditions d'exercice"),
      P(`Le ${NOM} exerce en secteur 1 (tarifs conventionnés). Inscrite à l'Ordre sous le numéro RPPS ${RPPS}.`),
      P('Assurance responsabilité civile professionnelle conformément à l\'article L.1142-2 du Code de la Santé Publique.'),

      H2('Règles déontologiques'),
      P('Soumise au Code de déontologie des chirurgiens-dentistes : ', L('www.ordre-chirurgiens-dentistes.fr', 'https://www.ordre-chirurgiens-dentistes.fr/')),

      H2('Hébergement du site'),
      P('Hébergé par Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — Tél : (559) 288-7060 — ', L('vercel.com', 'https://vercel.com')),

      H2('Propriété intellectuelle'),
      P(`L'ensemble du contenu de ce site est la propriété exclusive du ${NOM}. Toute reproduction est interdite sans autorisation.`),

      H2('Données personnelles'),
      P('Consultez notre ', L('Politique de confidentialité', '/confidentialite'), '.'),
    ],
  },

  confidentialite: {
    body: [
      P(`Le ${NOM} accorde une grande importance à la protection de vos données personnelles. Cette politique vous informe sur la collecte, l'utilisation et la protection de vos données conformément au Règlement Général sur la Protection des Données (RGPD).`),

      H2('Responsable du traitement'),
      P(B(NOM)),
      P(ADRESSE),
      P('Téléphone : ' + TEL),

      H2('Données collectées'),
      P('Dans le cadre de votre prise en charge médicale, nous collectons :'),
      LI(B("Données d'identification :"), ' nom, prénom, date de naissance, adresse, numéro de téléphone, email'),
      LI(B('Données de santé :'), ' antécédents médicaux, traitements en cours, examens, radiographies, soins prodigués'),
      LI(B('Données administratives :'), ' numéro de Sécurité sociale, mutuelle, modalités de paiement'),

      H2('Finalités du traitement'),
      P('Vos données sont collectées pour :'),
      LI('Assurer votre suivi médical et la continuité des soins'),
      LI('Établir des devis, factures et documents de remboursement'),
      LI('Respecter nos obligations légales et réglementaires'),
      LI('Gérer les prises de rendez-vous (via Doctolib notamment)'),

      H2('Base légale du traitement'),
      P('Le traitement de vos données est fondé sur :'),
      LI(B('Intérêt légitime :'), ' votre suivi médical et la gestion du cabinet'),
      LI(B('Obligation légale :'), ' tenue du dossier médical, facturation'),
      LI(B('Consentement :'), ' pour certains traitements spécifiques (communication par email par exemple)'),

      H2('Destinataires des données'),
      P('Vos données peuvent être transmises à :'),
      LI("L'Assurance Maladie et votre mutuelle (pour remboursement)"),
      LI('Des professionnels de santé (si nécessaire pour votre prise en charge)'),
      LI('Doctolib (pour la gestion des rendez-vous, sous réserve de leur propre politique de confidentialité)'),
      P("Aucune donnée n'est vendue ou cédée à des tiers à des fins commerciales."),

      H2('Durée de conservation'),
      P('Conformément à la réglementation en vigueur, vos données médicales sont conservées pendant ', B('20 ans'), ' à compter de votre dernière consultation.'),
      P('Les données administratives (factures, devis) sont conservées pendant la durée légale applicable.'),

      H2('Vos droits'),
      P('Vous disposez des droits suivants concernant vos données personnelles :'),
      LI(B("Droit d'accès :"), ' obtenir une copie de vos données'),
      LI(B('Droit de rectification :'), ' corriger des données inexactes'),
      LI(B("Droit d'opposition :"), ' vous opposer à certains traitements'),
      LI(B('Droit à la limitation :'), ' limiter le traitement de vos données'),
      LI(B("Droit à l'effacement :"), ' sous réserve des obligations légales de conservation'),
      P('Pour exercer vos droits, contactez-nous par téléphone au ', B(TEL), ' ou sur place au cabinet.'),

      H2('Sécurité des données'),
      P('Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité et la confidentialité de vos données (accès restreint, sauvegarde sécurisée, chiffrement si applicable).'),

      H2('Cookies'),
      P("Ce site n'utilise pas de cookies publicitaires ou de suivi intrusif. Seuls des cookies strictement nécessaires au fonctionnement du site peuvent être utilisés (par exemple, pour la prise de rendez-vous via Doctolib)."),

      H2('Contact'),
      P("Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits, contactez-nous :"),
      P(B(NOM)),
      P(ADRESSE),
      P('Tél : ' + TEL),
      P("Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits n'ont pas été respectés."),
    ],
  },
}

// Identifiant à utiliser si le document publié n'existe pas encore (création).
const FIXED_ID = {
  accueil: 'accueil',
  parodontie: 'parodontie',
  tarifs: 'tarifs',
  blog_page: 'blog_page',
  legal: 'legal',
  confidentialite: 'confidentialite',
  services_page: 'services_page',
  global: 'global',
}

// ─── Seeding ────────────────────────────────────────────────────────────────────
async function seedDoc(type, defaults) {
  // On cible explicitement le document PUBLIÉ (on exclut les brouillons).
  const id = await client.fetch(
    `*[_type==$t && !(_id in path("drafts.**"))][0]._id`,
    { t: type },
  )

  const current = id ? (await client.getDocument(id)) ?? {} : {}

  const setObj = {}
  for (const [field, val] of Object.entries(defaults)) {
    if (isEmpty(current[field])) setObj[field] = val
  }

  const fields = Object.keys(setObj)
  if (fields.length === 0) {
    console.log(`• ${type.padEnd(16)} : déjà complet, rien à remplir.`)
    return { type, filled: [] }
  }

  console.log(`• ${type.padEnd(16)} : remplit ${fields.length} champ(s) → ${fields.join(', ')}`)

  if (DRY) return { type, filled: fields }

  if (id) {
    await client.patch(id).set(setObj).commit()
  } else {
    const newId = FIXED_ID[type] || type
    await client.createOrReplace({ _id: newId, _type: type, ...setObj })
    console.log(`  ↳ document publié créé (_id: ${newId})`)
  }
  return { type, filled: fields }
}

async function main() {
  console.log(
    DRY
      ? '🔎  DRY-RUN — aucune écriture, simulation seulement.\n'
      : '✍️   Écriture sur le dataset production (champs vides uniquement).\n',
  )

  const results = []
  for (const [type, defaults] of Object.entries(DEFAULTS)) {
    try {
      results.push(await seedDoc(type, defaults))
    } catch (err) {
      console.error(`❌  ${type} : ${err.message}`)
    }
  }

  const totalFilled = results.reduce((n, r) => n + r.filled.length, 0)
  console.log(
    `\n${DRY ? 'Simulation terminée' : 'Terminé'} — ${totalFilled} champ(s) ${DRY ? 'à remplir' : 'remplis'} sur ${results.length} document(s).`,
  )
  if (!DRY && totalFilled > 0) {
    console.log('➡️   Vérifie dans le Studio puis relance deploy.bat pour figer le contenu au build.')
  }
}

main()
