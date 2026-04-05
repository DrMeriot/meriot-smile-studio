

# Mise à jour du Project ID et Dataset Sanity

## Changements

Deux fichiers à modifier :

### 1. `src/lib/sanity.ts`
- `projectId` fallback : `"6a2np8jy"` → `"erxqaqoe"`
- `dataset` fallback : `"production"` → `"data"`

### 2. `.env.local.example`
- `VITE_SANITY_PROJECT_ID=6a2np8jy` → `VITE_SANITY_PROJECT_ID=erxqaqoe`
- `VITE_SANITY_DATASET=production` → `VITE_SANITY_DATASET=data`

Aucun autre fichier ne contient de référence directe au project ID.

