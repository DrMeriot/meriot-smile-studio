

## Rendre le site facilement modifiable via le CMS admin

### Situation actuelle

- Le CMS admin existe (`/admin`) avec gestion des articles de blog (fonctionnel)
- La page "Gestion des Pages" (`/admin/pages`) existe mais **aucune page du site n'utilise de contenu dynamique** — tout le texte est codé en dur dans les composants
- Le hook `usePageContent` est prêt mais jamais utilisé

### Ce qu'on va faire

Rendre les textes principaux du site modifiables depuis l'admin, sans toucher au code. Votre femme pourra changer les textes, les descriptions, les horaires, etc. directement depuis le panneau d'administration.

### Étape 1 — Peupler la base avec le contenu actuel

Créer une migration qui insère les sections éditables avec leur contenu actuel :

| Page | Section | Champs éditables |
|------|---------|-----------------|
| `accueil` | `hero` | titre, sous_titre |
| `accueil` | `praticien` | nom, titre, description, parcours |
| `accueil` | `philosophie` | titre, description |
| `accueil` | `horaires` | lundi_vendredi, samedi, telephone, adresse |
| `parodontie` | `intro` | titre, description |
| `implantologie` | `intro` | titre, description |
| `esthetique` | `intro` | titre, description |
| `tarifs` | `intro` | titre, description |

### Étape 2 — Connecter les composants au CMS

Modifier les composants principaux pour utiliser `usePageContent` avec un fallback sur le texte codé en dur (si la base ne répond pas, le site affiche le contenu par défaut) :

- `Hero.tsx` — titre + sous-titre
- `Practitioner.tsx` — texte de présentation
- `Philosophy.tsx` — texte de philosophie
- `Contact.tsx` — horaires et coordonnées
- `Parodontie.tsx`, `Implantologie.tsx`, `Esthetique.tsx` — intro de chaque page spécialité

### Étape 3 — Améliorer l'interface admin pour les non-techniciens

Rendre le PageManager plus convivial :

- Labels en français clair au lieu des clés techniques (ex: "Titre principal" au lieu de "titre")
- Descriptions d'aide sous chaque champ ("Ce texte apparaît en grand sur la page d'accueil")
- Bouton "Voir sur le site" à côté de chaque section pour visualiser où le texte apparaît
- Confirmation visuelle claire après sauvegarde
- Regroupement par page avec des icônes et noms lisibles ("Page d'accueil", "Parodontie", etc.)

### Étape 4 — Ajouter un guide d'utilisation dans le dashboard

Ajouter une carte d'aide sur le Dashboard admin avec :
- "Comment modifier un texte du site" — explication en 3 étapes
- Lien direct vers la gestion des pages

### Détails techniques

- **Fichiers modifiés** : `Hero.tsx`, `Practitioner.tsx`, `Philosophy.tsx`, `Contact.tsx`, `Parodontie.tsx`, `Implantologie.tsx`, `Esthetique.tsx`, `PageManager.tsx`, `Dashboard.tsx`
- **Migration SQL** : INSERT des sections avec le contenu actuel en JSON
- **Pattern** : chaque composant utilise `usePageContent()` avec fallback `??` sur les valeurs par défaut, donc aucun risque de casser le site si la base est vide
- **Aucun impact SEO** : les textes restent identiques, seule la source change (base de données au lieu du code)

