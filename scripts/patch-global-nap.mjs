/**
 * Normalisation NAP du doc Sanity `global` (golden source, indexé via root loader).
 *
 * Contexte : l'adresse live contenait une espace parasite avant la virgule
 * (« 23 Bd de la Fédération , 13004 Marseille ») — cosmétique mais le Footer
 * indexé l'affiche tel quel, et la cohérence NAP compte pour le SEO local.
 * Adresse + téléphone confirmés par Dr Meriot (2026-06-03) :
 *   23 Bd de la Fédération, 13004 Marseille · 09 83 43 96 21
 *
 * Idempotent : `.set()` n'écrit que si différent. Cible le doc par TYPE.
 * Lancer : node scripts/patch-global-nap.mjs   (requiert SANITY_TOKEN dans .env.local)
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

const content = {
  nom_praticien: `Dr Stéphanie Meriot`,
  phone: `09 83 43 96 21`,
  adresse: `23 Bd de la Fédération, 13004 Marseille`,
}

const id = await client.fetch('*[_type=="global"][0]._id')
if (!id) { console.error('❌  doc global introuvable'); process.exit(1) }
const res = await client.patch(id).set(content).commit()
console.log(`✅  Doc « ${res._id} » mis à jour (rev ${res._rev}).`)
console.log(`   adresse: "${content.adresse}" · phone: "${content.phone}"`)
