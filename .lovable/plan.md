

# Fix Sanity loading performance

## Problem
Sanity queries hang/timeout when no data exists yet, blocking the UI. The `retry: 1` setting means each failed query is attempted twice before resolving to `null`.

## Solution

Two changes to `src/hooks/useSanityContent.ts` and one to `src/lib/sanity.ts`:

### 1. Add 3-second timeout to Sanity client (`src/lib/sanity.ts`)
Add `timeout: 3000` to the `createClient` config. This ensures no request hangs longer than 3 seconds.

### 2. Optimize React Query config (`src/hooks/useSanityContent.ts`)
- Set `retry: 0` — don't retry failed/timed-out queries (they'll just timeout again)
- Add `gcTime: 10 * 60 * 1000` to keep cached null results and avoid re-fetching
- Add `placeholderData: null` so components render immediately with fallbacks (the `??` operators already handle this)
- Wrap the fetch in an `AbortController` with 3s timeout as a secondary safeguard

### Files modified
- `src/lib/sanity.ts` — add `timeout: 3000`
- `src/hooks/useSanityContent.ts` — set `retry: 0`, add `gcTime`, add `placeholderData`

### Result
- Site renders instantly with hardcoded fallbacks
- Sanity data loads in background if available
- If Sanity is empty or unreachable, UI is unaffected (max 3s wait, no retries)

