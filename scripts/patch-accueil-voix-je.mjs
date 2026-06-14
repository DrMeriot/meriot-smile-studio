/**
 * Harmonisation voix « je » du doc Sanity `accueil` (anti split-brain).
 *
 * Contexte : l'accueil est fallback-only au build → le HTML indexé = le JSX
 * (déjà passé en « je »). Mais les composants lisent le doc Sanity côté client
 * (après hydratation), donc les humains voyaient encore « nous » sur la FAQ et
 * quelques titres. Ce patch met le doc Sanity en parité avec le JSX « je ».
 * La bio praticienne / philosophie étaient déjà en « je » → non touchées.
 *
 * Idempotent : `.set()` remplace les champs ciblés, conserve _id/_type.
 * Cible le doc par TYPE. Lancer : node scripts/patch-accueil-voix-je.mjs
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
const keyed = (arr) => arr.map((item, i) => ({ ...item, _key: `faq${i}` }))

const content = {
  faqTitle: `Vos questions, mes réponses`,
  quicklinksLabel: `✨ Découvrez mes spécialités`,
  quicklinksTitle: `Accès direct à mes expertises`,
  temoignagesTitle: `Ils me font confiance`,
  // FAQ alignée sur le fallback JSX « je » (champ `reponse` côté schéma accueil)
  faq: keyed([
    { question: `Le cabinet accepte-t-il la carte vitale ?`, reponse: `Oui, le cabinet est conventionné secteur 1 et accepte la carte vitale ainsi que le tiers payant pour la part Sécurité sociale. Vous n'avancez donc pas les frais correspondant à la part remboursée par l'Assurance Maladie.` },
    { question: `Comment prendre rendez-vous ?`, reponse: `Vous pouvez prendre rendez-vous facilement sur Doctolib 24h/24, ou me joindre directement au 09 83 43 96 21 pendant mes horaires d'ouverture.` },
    { question: `Le cabinet est-il accessible aux personnes à mobilité réduite ?`, reponse: `Oui, le cabinet se trouve au rez-de-chaussée avec une entrée accessible PMR. L'accès est donc facilité pour les personnes en fauteuil roulant ou avec des difficultés de mobilité.` },
    { question: `Quelles langues sont parlées au cabinet ?`, reponse: `Je parle français, anglais et espagnol. Vous pouvez donc consulter dans la langue avec laquelle vous êtes le plus à l'aise.` },
    { question: `La parodontie, qu'est-ce que c'est ?`, reponse: `La parodontie est la spécialité qui traite les maladies des gencives et des tissus de soutien des dents (parodonte). Elle permet de soigner les gingivites, parodontites, et de prévenir le déchaussement dentaire. Je suis spécialisée en parodontie grâce à mes formations à l'IFPIO de Marseille et à l'Académie de paro d'Aix-en-Provence.` },
    { question: `Qu'est-ce qu'un implant dentaire ?`, reponse: `Un implant dentaire est une racine artificielle en titane qui est placée dans l'os de la mâchoire pour remplacer une dent manquante. Il sert de support à une couronne dentaire et permet de retrouver une fonction masticatoire optimale de façon durable.` },
    { question: `J'ai peur du dentiste, comment cela se passe ?`, reponse: `L'anxiété dentaire est très courante et je la prends pleinement en compte. J'adopte une approche douce et bienveillante : je prends le temps d'expliquer chaque étape, je respecte votre rythme et je m'assure de votre confort tout au long des soins. N'hésitez pas à exprimer vos craintes lors de la consultation.` },
    { question: `Combien coûte une consultation ?`, reponse: `Une consultation de base coûte 23€ (tarif conventionné secteur 1). Les autres actes varient selon les soins nécessaires. Je vous informe toujours du coût avant de débuter un traitement, et j'établis un devis détaillé pour les soins plus complexes.` },
    { question: `Le cabinet pratique-t-il la dentisterie conservatrice ?`, reponse: `Oui, c'est même ma philosophie centrale. Ma thèse de doctorat porte sur la dentisterie à minima, ce qui signifie que je privilégie les techniques permettant de conserver au maximum vos tissus naturels (émail, dentine) tout en assurant des soins efficaces et durables.` },
  ]),
}

const id = await client.fetch('*[_type=="accueil"][0]._id')
if (!id) { console.error('❌  doc accueil introuvable'); process.exit(1) }
const res = await client.patch(id).set(content).commit()
console.log(`✅  Doc « ${res._id} » mis à jour (rev ${res._rev}).`)
console.log(`   FAQ: ${content.faq.length} items · titres harmonisés (faqTitle, quicklinks*, temoignagesTitle)`)
