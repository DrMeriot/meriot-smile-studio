Je vais corriger le 404 au reload des articles blog dynamiques en branchant explicitement les slugs Sanity au pré-rendu SSG.

Plan d’implémentation :

1. Centraliser la récupération des slugs blog dans `vite.config.ts`
   - Garder un seul helper `fetchBlogSlugs()` utilisé à la fois par le sitemap et par vite-react-ssg.
   - Le helper récupérera les documents Sanity `blog_post` avec `slug.current` défini, comme actuellement pour `dynamicSitemapPlugin`.
   - Il retournera les slugs sous forme fiable pour générer `/blog/{slug}`.

2. Ajouter `ssgOptions.includedRoutes` async
   - Définir `includedRoutes: async (paths) => { ... }` dans `vite.config.ts`.
   - Conserver les routes statiques découvertes par vite-react-ssg.
   - Ajouter toutes les routes dynamiques blog issues de Sanity : `/blog/dent-qui-bouge-adulte-que-faire`, etc.
   - Dédupliquer les routes avant retour.
   - Exclure les routes non indexables/admin si elles apparaissent dans `paths`.

3. Ajouter le log build demandé
   - Ajouter `console.log('[ssg] generating routes:', routes)` dans `includedRoutes`.
   - Les logs Vercel montreront exactement quelles URLs sont pré-rendues.

4. Nettoyer une incohérence visible dans `vite.config.ts`
   - Supprimer `/esthetique` de `STATIC_ROUTES`, car la page a été retirée mais reste encore listée dans la config de sitemap.
   - Cela évite de remettre une URL supprimée dans `dist/sitemap.xml`.

5. Vérifier localement avant livraison
   - Lancer le build SSG.
   - Vérifier que `dist/blog/dent-qui-bouge-adulte-que-faire/index.html` est bien généré si le slug est bien retourné par Sanity.
   - Vérifier que le sitemap contient le slug et que les tests SSG/SEO passent.

Note : je ne peux pas faire le `commit + push` depuis Lovable, car l’état Git est géré par la plateforme. Après application du correctif, un rebuild/publish Vercel devra reprendre la nouvelle config et générer les pages HTML statiques.