# Analyse SEO & plan d'action — dr-meriot-chirurgien-dentiste.fr

**Données : Google Search Console, 2 → 30 juin 2026 (28 jours)**
**Objectif du site : acquérir des patients en parodontie et implantologie sur Marseille / PACA.**

---

## 1. Où on en est, vs l'objectif

| Indicateur (28 j) | Valeur | Lecture |
|---|---|---|
| Clics | 11 | Tous sur des requêtes **de marque** (« dr meriot », « stephanie meriot ») |
| Impressions | 300 | La demande existe et est captée |
| CTR moyen | 3,7 % | Faible, normal vu les positions |
| Position moyenne | 19 | Bas de page 2 — juste sous le seuil du clic |
| **Clics non-marque** | **0** | **Le vrai chiffre à débloquer** |

Le site est jeune mais **la tendance monte** : début juin, position moyenne ~25 et 0 clic ; fin juin (28/06), position 10,3 et 3 clics dans la journée. Google est en train de remonter le site. L'enjeu n'est plus « être visible » (300 impressions le prouvent) mais **franchir le seuil du clic** sur les requêtes qui amènent des patients, pas seulement ceux qui te cherchent déjà par ton nom.

Le diagnostic recoupe exactement l'audit 360° : **le frein n°1 n'est pas le site, c'est le hors-site** (fiche Google Business Profile + avis). On y revient en priorité 1.

---

## 2. Les 3 gisements que la data révèle

### Gisement A — Le cluster « gencives qui saignent » : beaucoup de demande, classé page 4-5
C'est ta page la plus demandée et la plus sous-exploitée. La page `/gencives-qui-saignent` capte à elle seule la majorité des impressions non-marque, mais à des positions catastrophiques :

| Requête | Impressions | Position | Page |
|---|---|---|---|
| saignement des gencives | 31 | **31,9** | /gencives-qui-saignent |
| gencives qui saignent | 7 | 85 | /gencives-qui-saignent |
| gencive qui saigne | 5 | 58 | /gencives-qui-saignent |
| pourquoi mes gencives saignent | 4 | 70 | /gencives-qui-saignent |
| + ~15 variantes (saignement gencive, dents qui saignent…) | ~25 | 50-90 | /gencives-qui-saignent |

**Total cluster : ~100 impressions, 0 clic, position moyenne ~50.** La demande est là, l'autorité de la page est trop faible pour percer. C'est de l'intention **informationnelle** (un patient inquiet, pas encore prêt à réserver) — donc le rôle de cette page est d'**attraper large puis rediriger** vers la prise de RDV en parodontie.

### Gisement B — « parodontologue / spécialiste des gencives » : la page argent, à un cheveu du top 10
La page `/parodontie` (ton hub, ta spécialité, ton acte le plus rentable) se classe juste au bord de la page 1 sur des requêtes **commerciales locales** — celles qui amènent un vrai patient :

| Requête | Impressions | Position |
|---|---|---|
| parodontologue | 7 | **14,4** |
| spécialiste parodontite | 1 | 8 |
| spécialiste des gencives | 2 | 10 |
| parodontologue marseille | 1 | **13** |
| specialiste gencive | 1 | 13 |

Ces requêtes sont **à portée immédiate** : passer de la position 11-14 au top 5-8 fait basculer dans la zone de clics. C'est l'effort/retour le plus rentable côté contenu.

### Gisement C — La marque est acquise, capitalise dessus
« dr meriot » (pos 4), « stephanie meriot » (pos 3), « dentiste chartreux » (pos 2), « gingivite » (pos 2) sont déjà bien placés. Rien à corriger ici — mais ça confirme que **Google te juge légitime** ; le problème est l'autorité/notoriété locale, pas la qualité du site. D'où la priorité avis Google.

---

## 3. Plan d'action priorisé

Classé par retour-sur-effort, en cohérence avec le backlog des audits. Le code/contenu est déjà bien avancé (PR #10, #12) ; les leviers restants sont surtout **hors-site** et **éditoriaux ciblés**.

### Priorité 1 — Google Business Profile + avis (hors-site) 🔴
**Le plus gros levier, et il est presque inactivé (~4 avis vs 30-142 chez les concurrents).** Sans local-pack, tu n'apparais pas sur la carte Google pour « parodontologue marseille » — là où se décide la majorité des prises de RDV locales.
- Compléter / revendiquer la fiche GBP (catégorie « Parodontiste » + « Chirurgien-dentiste », horaires, photos, accès métro Chartreux).
- Lancer une routine de collecte d'avis : viser **>20 avis** (objectif déjà fixé dans l'audit). Demande systématique en fin de soin + lien court par SMS/email.
- Corriger l'incohérence de nom d'établissement (« SELARL CABINET DENTAIRE MATEO PATRICK » sur Maiia/lemedecin vs le domaine) — le NAP doit être identique partout.

### Priorité 2 — Faire percer `/gencives-qui-saignent` (Gisement A) 🟠
La page existe et capte la demande ; il lui manque autorité et signaux.
- **Title + H1** centrés sur « saignement des gencives » (la requête à 31 impressions), pas une variante.
- Étoffer le contenu (causes → que faire → quand consulter), répondre aux variantes réelles : « pourquoi mes gencives saignent », « saignement des gencives la nuit », « remède de grand-mère ».
- **Maillage** : lien contextuel fort vers `/parodontie` (le hub) avec une ancre exacte, + CTA de prise de RDV au-dessus de la ligne de flottaison.
- Re-soumettre l'URL dans GSC après mise à jour (Inspection d'URL → Demander une indexation).

### Priorité 3 — Pousser `/parodontie` dans le top 10 local (Gisement B) 🟠
- Renforcer le champ sémantique « parodontologue Marseille / spécialiste des gencives / parodontite » dans la page (sans sur-optimiser).
- Ajouter le schéma `LocalBusiness/Dentist` sur les pages NAP (`/contact`, `/a-propos`) — manquant d'après l'audit, il aide le local-pack.
- Étoffer `/a-propos` (actuellement « exploré, non indexé » = thin content) en 600-900 mots à la 1ère personne : diplôme de parodontologie, parcours, approche « à minima ». Une page À-propos indexée et riche renforce l'E-E-A-T de tout le cluster.

### Priorité 4 — Hygiène technique (fiabilité) 🟡
Repris de l'audit technique, car un site qui ne build pas ne ranke pas :
- Sortir le clone Git de OneDrive (cause racine des troncatures de fichiers / 7 builds Vercel en erreur le 24 juin).
- Ajouter une CI GitHub Actions (tsc + build + lint) + notification d'échec Vercel.
- Performance images (Hero PNG 1,86 Mo → webp) : la vitesse mobile est un facteur de classement local.

---

## 4. Comment mesurer les progrès

Indicateurs à suivre tous les mois (le dashboard et le rapport mensuel automatisé s'en chargent) :

1. **Clics non-marque** : 0 aujourd'hui → le seul KPI qui compte vraiment. Premier clic non-marque = première vraie victoire SEO.
2. **Position « parodontologue marseille »** et « saignement des gencives » : suivre la descente vers le top 10.
3. **Nombre d'avis Google** : proxy direct du levier n°1.
4. **Impressions cluster gencives** : doivent monter à mesure que la page gagne en autorité.

> Règle de lecture : sur un site jeune, **les impressions et les positions bougent avant les clics**. Une position qui passe de 50 à 25 sans clic n'est pas un échec — c'est l'étape d'avant le clic. Le rapport mensuel te montrera ce mouvement.
