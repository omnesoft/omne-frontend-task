# SPEC-002: Shared primitives & types

> Phase / README mapping: Part 1 (shared UI before screens)  
> Created: 2026-05-20  
> Depends on: [SPEC-001-foundation.md](./SPEC-001-foundation.md) (done)

## Goal

Extract reusable UI and domain types from figma screen components before porting full screens. Align status and entity shapes with [api-spec.md](../../api-spec.md) (API slugs, not figma display labels). Use semantic tokens from `theme.css`, `cn()`, and `tailwind-variants` where variants help. Provide static fixtures and feed building blocks so SPEC-003 routes can compose screens without TanStack Query.

## Out of scope (epic)

- TanStack Query, custom hooks, `src/api/` changes, `mock-server.ts`
- URL search params for filters or pagination
- Port of `figma-output/.../ui/` (shadcn kit — unused by figma screens)
- Screen-level route composition (SPEC-003)
- Part 3: responsive sidebar collapse, full form validation rules, `DECISIONS.md`
- `@base-ui/react` unless a control truly needs it; figma uses native `<input>` / `<select>` — prefer styled natives for Part 1

## Conventions (reference for all items)

- Target code: `src/` only; `figma-output/` is read-only reference.
- Stack per [AGENTS.md](../../AGENTS.md); types per [api-spec.md](../../api-spec.md).
- Status values: `on_track` | `blocked` | `needs_review` | `done` (not figma `'On Track'` strings).
- Display labels via `STATUS_LABELS` map; chips use `--color-status-*` tokens (not raw `emerald-*` / `blue-*`).
- Suggested commits: Conventional Commits per AGENTS.md.

### Target folder layout

```
src/
  types/
    status.ts
    status-update.ts      # StatusUpdate interface per api-spec
    team.ts               # Team, TeamMember, TeamSummary per api-spec
  lib/
    format-relative-time.ts
  fixtures/
    status-updates.ts
    teams.ts
    projects.ts           # string[] for form project dropdown
    team-summary.ts
  components/
    status/StatusChip.tsx
    layout/PageHeader.tsx
    layout/EmptyState.tsx
    ui/Button.tsx
    ui/Input.tsx
    ui/Select.tsx
    ui/Textarea.tsx
    ui/FieldLabel.tsx
    ui/FieldError.tsx
    feed/StatusUpdateCard.tsx
    feed/FeedToolbar.tsx
    feed/FeedPagination.tsx
```

---

## 2.1 Status types and StatusChip

**Status:** `planned`  
**Depends on:** SPEC-001.1 (status tokens in theme)  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/StatusChip.tsx`  
**Targets:** `src/types/status.ts`, `src/components/status/StatusChip.tsx`

### Boundaries

- Do **not** import from `figma-output/` or `mockData.ts`.
- Do **not** use figma display strings as the prop type (`'On Track'`, etc.).
- No `any`; no inline `style={{}}`.
- Forbidden: TanStack Query, fixtures (2.4), screen routes

### Responsibilities

- `src/types/status.ts`:
  - `StatusSlug` union: `'on_track' | 'blocked' | 'needs_review' | 'done'`
  - `STATUS_LABELS: Record<StatusSlug, string>` for UI copy
  - Optional `STATUS_SLUGS` readonly array for iteration (form radios, filter options)
- `StatusChip`: prop `status: StatusSlug`; renders pill with label from `STATUS_LABELS`
- Variants via `tailwind-variants` mapping each slug to `bg-status-*-bg`, `text-status-*-text`, `border-status-*-border` (or equivalent token utilities from SPEC-001)
- Use `cn()` for merging optional `className`

### Definition of done

- [ ] All four slugs render correct label and token-based colors
- [ ] No hardcoded hex or raw Tailwind palette names for status colors
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |
| Data Layer & API | N/A |
| Communication & Judgment | N/A |

### Suggested commit

`feat(status-chip): add API-aligned status badge`

---

## 2.2 Page header and empty state

**Status:** `planned`  
**Depends on:** 2.1 (optional — no hard dependency; can parallelize after 2.3 ui tokens)  
**README:** Part 1  
**Figma reference:** headers in all figma screens; empty UI in `MyUpdates.tsx`, `TeamOverview.tsx` (empty branch only as layout reference)  
**Targets:** `src/components/layout/PageHeader.tsx`, `src/components/layout/EmptyState.tsx`

### Boundaries

- No business logic, fixtures, or API types beyond presentation props.
- `EmptyState` is generic — not team-specific copy baked into the component.
- Forbidden: porting figma `showEmpty` toggle; team empty wiring is Part 3

### Responsibilities

- `PageHeader`: props `title`, `description?`, optional `children` for actions (e.g. toolbar row)
- `EmptyState`: props `icon` (React node or Lucide component type), `title`, `description`, optional `action` slot (e.g. TanStack `Link` passed as children)
- Semantic typography: `text-foreground`, `text-foreground-muted`
- Styling aligned with figma empty panels: centered column, rounded bordered card, icon circle on `surface-raised`

### Definition of done

- [ ] Both components exported and usable from screen files
- [ ] No `any`; no figma imports
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`feat(ui): add page header and empty state`

---

## 2.3 Form and action primitives

**Status:** `planned`  
**Depends on:** 2.1 (for status radio styling reference only — can use primary tokens)  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/CreateUpdate.tsx`, feed toolbar in `StatusFeed.tsx`  
**Targets:** `src/components/ui/Button.tsx`, `Input.tsx`, `Select.tsx`, `Textarea.tsx`, `FieldLabel.tsx`, `FieldError.tsx`

### Boundaries

- No shadcn / figma `ui/` port.
- No react-hook-form or validation library.
- `Button` does not wrap `@base-ui/react` unless already required elsewhere.
- Remove `.gitkeep` from `src/components/ui/` when first file is added.
- Forbidden: full Create Update screen (SPEC-003.2)

### Responsibilities

- `Button`: variants `primary` | `secondary` | `ghost` via `tailwind-variants`; supports `asChild` not required; native `<button>` or optional `type="button" | "submit"`
- `Input`, `Select`, `Textarea`: forward refs optional; shared focus ring using `primary-*` / `border` tokens; `error` boolean prop for border state
- `FieldLabel`, `FieldError`: accessible label + error text row (figma `AlertCircle` + message pattern)
- All use `cn()` for `className` merge
- Match figma control sizing (rounded-lg, padding) with semantic colors (`surface-raised`, `border`, not `neutral-*`)

### Definition of done

- [ ] Primitives usable for feed search/select and create form
- [ ] Error state visually distinct on `Select` / `Input`
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`feat(ui): add form and action primitives`

---

## 2.4 API-shaped types, fixtures, and time helper

**Status:** `planned`  
**Depends on:** 2.1 (`StatusSlug` / `StatusUpdate.status`)  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/data/mockData.ts` (content reference only)  
**Targets:** `src/types/status-update.ts`, `src/types/team.ts`, `src/fixtures/*`, `src/lib/format-relative-time.ts`

### Boundaries

- Do **not** import `figma-output` mockData.
- Fixtures are static seed data for Part 1 UI only — not MSW seed changes.
- Forbidden: `mock-server.ts` edits, Query hooks

### Responsibilities

- Types mirroring [api-spec.md](../../api-spec.md): `StatusUpdate`, `Team`, `TeamMember`, `TeamSummary`
- `src/fixtures/status-updates.ts`: array of ≥6 `StatusUpdate` objects (UUIDs, ISO dates, `status` slugs, avatar URLs)
- `src/fixtures/teams.ts`: `Team[]` for filter dropdown labels/ids
- `src/fixtures/projects.ts`: project name strings for create form
- `src/fixtures/team-summary.ts`: `TeamSummary` with metrics and `members[]` aligned to api-spec (`lastUpdate` ISO | null, `lastStatus` slug | null)
- `formatRelativeTime(iso: string): string` — human-readable relative time from ISO datetime (replace figma `getRelativeTime(Date)`)

### Definition of done

- [ ] Fixture shapes type-check against api-spec interfaces
- [ ] No figma field names (`userName`, `summary`, display status labels)
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Code Quality & TypeScript | 3 |
| Component Architecture | N/A |
| Data Layer & API | N/A (fixtures only; wiring in Part 2) |

### Suggested commit

`chore(fixtures): add static API-shaped seed data`

---

## 2.5 Feed list building blocks

**Status:** `planned`  
**Depends on:** 2.1, 2.3, 2.4  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/StatusFeed.tsx`  
**Targets:** `src/components/feed/StatusUpdateCard.tsx`, `FeedToolbar.tsx`, `FeedPagination.tsx`

### Boundaries

- Controlled components: toolbar and pagination receive values + callbacks; **no internal fixture fetching**.
- No URL query params; no filtering logic beyond optional `onSearchChange` etc.
- Do **not** implement full `StatusFeedScreen` (SPEC-003.1).
- Forbidden: TanStack Query

### Responsibilities

- `StatusUpdateCard`: prop `update: StatusUpdate`; avatar, author, team, relative time via `formatRelativeTime`, `StatusChip`, body text, optional project line
- `FeedToolbar`: controlled `search`, `statusFilter`, `teamFilter`, `teams` option list; search input + two selects; icons per figma (Search, Filter)
- `FeedPagination`: props `page`, `totalPages`, `totalItems`, `pageSize`, `onPageChange`; prev/next + page number buttons; “Showing X to Y of Z” copy
- Card/list hover and borders use semantic tokens; active page button uses `primary-600` not raw `blue-600`
- Use `cn()` for active page state

### Definition of done

- [ ] Components render correctly with fixture data in isolation or Story-less manual check via temporary usage
- [ ] Props fully typed; no `any`
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`feat(feed): add feed list UI building blocks`

---

## Handoff notes

- Engineer order: 2.1 → 2.4 (pair in one session if small) → 2.2 → 2.3 → 2.5
- Next epic: [SPEC-003-screens.md](./SPEC-003-screens.md); do not start 3.1 until 2.5 is done
- Part 2 will replace fixtures with Query hooks; keep component props stable (`StatusUpdate`, `StatusSlug`)
- Optional polish (not in this epic): `cn()` on `AppLayout` nav `className` strings from SPEC-001
