# Rubric gate (engineer)

Run only for dimensions **touched** by the current spec item. Target: **≥ 3** per dimension in scope; **none &lt; 2**. See [RUBRIC.md](../../../RUBRIC.md) for full scoring text.

## Dimension 1 — Component architecture (30%)

- [ ] Single responsibility per new/changed component
- [ ] Props typed, narrow, no unexplained optional sprawl
- [ ] Shared UI reused across screens where spec requires (e.g. `StatusChip`)
- [ ] Folder layout matches spec; names describe purpose
- [ ] No monolithic screen files that should have been split per spec

## Dimension 2 — Data layer & API (30%)

Skip section if item has no API work.

- [ ] TanStack Query for fetch/mutate (no raw `useEffect` fetch)
- [ ] Query keys consistent with project/spec convention
- [ ] Hooks abstract query/mutation logic
- [ ] Mutations invalidate cache or use documented optimistic update
- [ ] Filters/pagination in URL when item includes list/filter behavior
- [ ] User-visible loading and error states
- [ ] Types match `api-spec.md`; mock server untouched

## Dimension 3 — Styling & UI craft (20%)

- [ ] Tailwind utilities (responsive/hover/focus as needed)
- [ ] Tokens/theme used; no stray Figma-generated CSS in scope
- [ ] Reasonable match to `designs/` / figma reference
- [ ] Empty/loading/error/skeleton polished when in scope
- [ ] Responsive behavior per spec (e.g. ~768px feed)

## Dimension 4 — Code quality & TypeScript (10%)

- [ ] No new `any`
- [ ] `pnpm check` passes
- [ ] Naming and exports consistent with existing `src/`
- [ ] Biome-friendly formatting (no ignored lint in new code)

## Dimension 5 — Communication & judgment (10%)

- [ ] If item includes decisions: `DECISIONS.md` entry with tradeoff, English, concise
- [ ] If blocked: STATUS explains why and what is needed next

## Gate result

| Result | Action |
|--------|--------|
| All touched dimensions ≥ 3 | Mark item `done` in STATUS |
| Any touched dimension &lt; 3 and fixable | Fix before `done` |
| Any touched dimension &lt; 3, not fixable in scope | `blocked` + note dimension |

Record in STATUS (one line): `Rubric: D1✓ D2✓ …` or `Rubric: blocked — D2 cache not invalidated`.
