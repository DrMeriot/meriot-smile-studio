

# Correction critique — Redirections Vercel cassent l'indexation SSG

## Diagnostic

Le fichier `vercel.json` actuel contient :
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

Cette règle redirige **toutes les URLs** vers `/index.html` (la racine). Or, `vite-react-ssg` génère des fichiers HTML statiques individuels dans le dossier `dist/` (ex: `dist/parodontie/index.html`, `dist/implantologie/index.html`). Le rewrite Vercel court-circuite complètement ce mécanisme : Google reçoit le contenu de la homepage pour toutes les URLs, d'où l'erreur de redirection et l'absence d'indexation.

## Correction

Remplacer le `vercel.json` par une configuration qui :
1. Laisse Vercel servir les fichiers HTML statiques générés par SSG en priorité
2. Ne fait le fallback SPA (`/index.html`) que pour les routes qui n'ont pas de fichier HTML pré-rendu (routes dynamiques comme `blog/:slug`, routes admin)

### Nouveau `vercel.json`
```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

- `cleanUrls: true` → Vercel sert automatiquement `dist/parodontie/index.html` quand on accède à `/parodontie` (sans `.html` dans l'URL)
- `trailingSlash: false` → URLs propres sans slash final
- **Pas de rewrite catch-all** → les fichiers SSG sont servis directement avec un 200, pas de redirection

Pour les routes dynamiques (`blog/:slug`) qui n'ont pas de fichier HTML pré-rendu, on ajoute un rewrite ciblé uniquement pour celles-ci :

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/blog/:slug", "destination": "/index.html" },
    { "source": "/admin/:path*", "destination": "/index.html" }
  ]
}
```

### Correction hydration errors (#418/#423)

Les erreurs React #418 et #423 sont des mismatches d'hydratation SSG. Elles doivent aussi être diagnostiquées et corrigées car elles peuvent contribuer aux problèmes d'indexation (Google voit un contenu différent entre le HTML statique et le JS).

## Fichiers modifiés

| Fichier | Action |
|---|---|
| `vercel.json` | Remplacer le rewrite catch-all par `cleanUrls` + rewrites ciblés |

## Impact

- **Zéro impact Sanity** — modification purement infrastructure
- Les pages `/parodontie`, `/implantologie`, `/gingivite-marseille`, etc. seront servies comme HTML statique avec un status 200
- Google pourra enfin indexer ces pages correctement
- Les routes dynamiques (blog posts, admin) continueront de fonctionner via le fallback SPA

