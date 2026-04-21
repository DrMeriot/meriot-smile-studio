

## Diagnostic

Dans `src/components/Header.tsx`, le menu mobile est rendu **à l'intérieur** du `<header>` (dans `.container`), juste sous la barre principale, avec ces classes :

```tsx
{isMobileMenuOpen && (
  <div className="lg:hidden pb-6 animate-fade-in">
    <nav className="flex flex-col space-y-4 mb-4">...</nav>
    ...
  </div>
)}
```

Problèmes :
1. **Aucun fond explicite** sur ce panneau. Il hérite uniquement du `bg-card/95 backdrop-blur-md` du `<header>`, et **ce fond n'est appliqué que si `isScrolled === true`**. Au chargement initial (top de page), le header est `bg-transparent` → menu mobile transparent → les liens apparaissent par-dessus le hero sans fond opaque.
2. **Pas de position dédiée** : le panneau est en flux normal du header. Tant que le header reste `fixed top-0 z-50`, ça pourrait suffire — mais combiné au fond transparent, le rendu visuel est cassé.
3. Le bouton hamburger ne ferme pas le menu si on clique en dehors, et le `body` peut continuer à scroller derrière.

## Plan de correction

**Fichier modifié** : `src/components/Header.tsx` uniquement.

**1. Forcer un fond opaque sur le panneau mobile** (indépendant de `isScrolled`)
Ajouter `bg-card` (couleur de fond du thème, cohérente avec l'aesthetic feminine pastel — pas de `bg-white` brut qui casserait le ton chaud du site) et `shadow-soft` pour la séparation visuelle. Étendre le panneau pleine largeur avec `-mx-4 px-4` pour qu'il aille bord-à-bord.

**2. Garantir l'empilement au-dessus du hero**
Le `<header>` parent a déjà `z-50 fixed`. Le panneau mobile en flux normal hérite donc déjà du contexte d'empilement correct. Aucun changement de `z-index` nécessaire — le vrai bug est l'absence de fond, pas le z-index.

**3. Ajouter un overlay/backdrop semi-transparent sous le menu**
Pour masquer visuellement le hero derrière et permettre la fermeture au clic extérieur :
- Ajouter un `<div>` `fixed inset-0 top-20 bg-black/20 z-40 lg:hidden` rendu conditionnellement quand `isMobileMenuOpen`.
- `onClick` sur le backdrop → ferme le menu.

**4. Bloquer le scroll du body quand le menu est ouvert** (UX)
`useEffect` qui ajoute `overflow-hidden` sur `document.body` tant que `isMobileMenuOpen === true`, retiré au cleanup.

**5. Conservation des fallbacks et tone**
- Couleurs depuis le design system (`bg-card`, `shadow-soft`) — pas de Tailwind brut comme `bg-white` ou `bg-pink-50` qui contournerait les tokens.
- Aucun changement aux liens, données Sanity, ou fallbacks.

## Détails techniques

```tsx
// Header.tsx — extraits modifiés

// 1. Lock body scroll
useEffect(() => {
  document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  return () => { document.body.style.overflow = ""; };
}, [isMobileMenuOpen]);

// 2. Backdrop (rendu en frère du panneau menu, à l'intérieur du header)
{isMobileMenuOpen && (
  <div
    className="fixed inset-0 top-20 bg-foreground/20 z-40 lg:hidden"
    onClick={() => setIsMobileMenuOpen(false)}
    aria-hidden="true"
  />
)}

// 3. Panneau mobile avec fond opaque garanti
{isMobileMenuOpen && (
  <div className="lg:hidden pb-6 pt-2 -mx-4 px-4 bg-card shadow-soft animate-fade-in relative z-50">
    {/* nav + boutons inchangés */}
  </div>
)}
```

## Vérification post-fix

Au viewport 375px ou 414px, ouvrir le menu hamburger sur la home (top de page, header transparent) :
- Le panneau doit avoir un fond pastel opaque.
- Le hero derrière doit être assombri par le backdrop.
- Cliquer sur le backdrop ferme le menu.
- Le scroll de la page est bloqué tant que le menu est ouvert.

