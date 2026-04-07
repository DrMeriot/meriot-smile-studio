

# Fix: Sanity queries never execute

## Root cause

The `useSanityQuery` hook sets `initialData: null`. In TanStack React Query v5, `initialData` without `initialDataUpdatedAt` is treated as **fresh data** for the duration of `staleTime` (5 minutes). Since `null` is valid data, React Query never fires the `queryFn` — it already has "data."

This explains why:
- Console shows `SANITY DATA global: null` (the hook returns `initialData`)
- No "SANITY FETCH result for" log appears (queryFn never runs)
- 0 network requests to sanity.io

## Fix (2 files)

### 1. `src/hooks/useSanityContent.ts`
- **Remove `initialData: null`** — let the query start with `undefined` so it's immediately stale and triggers a fetch
- Optionally add `placeholderData: null` if components need `null` instead of `undefined` while loading (but the `??` fallback operators already handle `undefined`)

### 2. `src/lib/sanity.ts`
- Add a direct test fetch at the bottom of the file (temporary debug line) to confirm the client works independently of hooks:
  ```ts
  sanityClient.fetch('*[_type=="global"][0]')
    .then(d => console.log("DIRECT SANITY TEST:", d))
    .catch(e => console.error("DIRECT SANITY ERROR:", e))
  ```

## Expected result
- Queries fire immediately on mount
- If Sanity has data → components display it
- If Sanity is empty → `null` returned after 3s timeout, fallbacks kick in
- Debug log confirms client connectivity

