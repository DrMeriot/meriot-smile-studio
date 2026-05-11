/**
 * patch-blog-categories.mjs
 * Normalise les valeurs blog_post.category vers les valeurs enum minuscules.
 * Mappings : "Parodontie" → "parodontie", "Implantologie" → "implantologie"
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
const env = readFileSync(envPath, 'utf8')
const token = env.match(/SANITY_TOKEN=(.+)/)?.[1]?.trim()

if (!token) {
  console.error('❌ SANITY_TOKEN introuvable dans .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: '6a2np8jy',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
})

const MAPPINGS = {
  'Parodontie': 'parodontie',
  'Implantologie': 'implantologie',
}

const docs = await client.fetch(
  `*[_type=='blog_post' && category in ['Parodontie', 'Implantologie']]{_id, title, category}`
)

console.log(`\n🔍 Documents trouvés avec casse incorrecte : ${docs.length}\n`)

let patched = 0
let failed = 0

for (const doc of docs) {
  const newValue = MAPPINGS[doc.category]
  try {
    await client.patch(doc._id).set({ category: newValue }).commit()
    console.log(`✅ ${doc._id}`)
    console.log(`   "${doc.category}" → "${newValue}"`)
    console.log(`   titre : ${doc.title}`)
    patched++
  } catch (err) {
    console.error(`❌ ÉCHEC ${doc._id} : ${err.message}`)
    failed++
  }
}

console.log(`\n═══════════════════════════════`)
console.log(`Récap : ${patched} patch(s) appliqué(s), ${failed} échec(s)`)
console.log(`═══════════════════════════════\n`)
