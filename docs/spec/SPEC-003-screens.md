# SPEC-003: Screen ports (UI only)

> Phase / README mapping: Part 1 (screens — completes README Part 1)  
> Created: 2026-05-20  
> Depends on: [SPEC-002-shared-primitives.md](./SPEC-002-shared-primitives.md)

## Goal

Replace route stubs under `src/routes/_app/` with decomposed screen components that match figma layout and visual hierarchy, using SPEC-002 primitives, semantic Tailwind tokens, and static fixtures. No API integration — Part 2 swaps data sources without restructuring UI.

## Out of scope (epic)

- TanStack Query, mutations, loading/error UI
- URL search params (`?page`, `?status`, `?team`, `?search`)
- Edit mode route (`/create` with id), `GET /api/statuses/:id`
- Figma `showEmpty` demo toggle on team overview (Part 3 wires real empty state)
- Team overview empty state when API returns no data (Part 3)
- Body min-length validation, full form validation (Part 3)
- Responsive sidebar collapse (~768px) (Part 3)
- `DECISIONS.md`
- Forbidden: `figma-output/` edits, `mock-server.ts`, reintroducing `src/routes/index.tsx`

## Conventions (reference for all items)

- Target code: `src/` only; visual reference: `figma-output/src/app/components/*.tsx` (`designs/` is empty).
- Screen components live under `src/components/screens/` (one file per screen).
- Route files stay thin: `createFileRoute` + import screen component only.
- Data: import from `src/fixtures/*` only; slice/filter in screen with `useState`.
- Styling: semantic tokens (`foreground`, `surface`, `primary-*`, `border`); `cn()` for conditionals; no inline `style={{}}`.
- `/create` remains off sidebar; CTA from feed only (matches figma).
- Suggested commits: Conventional Commits per AGENTS.md.

### Screen → route map

| Route | Screen file | Figma reference |
|-------|-------------|-----------------|
| `/_app/` | `StatusFeedScreen.tsx` | `StatusFeed.tsx` |
| `/_app/create` | `CreateUpdateScreen.tsx` | `CreateUpdate.tsx` |
| `/_app/team` | `TeamOverviewScreen.tsx` | `TeamOverview.tsx` |
| `/_app/my-updates` | `MyUpdatesScreen.tsx` | `MyUpdates.tsx` |
| `/_app/settings` | `SettingsScreen.tsx` | `Settings.tsx` |

---

## 3.1 Status feed screen

**Status:** `planned`  
**Depends on:** SPEC-002.5 (and 2.1–2.4)  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/StatusFeed.tsx`  
**Targets:** `src/components/screens/StatusFeedScreen.tsx`, `src/routes/_app/index.tsx`

### Boundaries

- No TanStack Query; no URL-driven filters or pagination.
- Client-side filter/search on fixtures is optional for Part 1 (figma filters are non-functional on mock data — OK to mirror with local state + slice, or static slice only).
- Do **not** add sidebar link for `/create`.
- Forbidden: MSW / api changes

### Responsibilities

- `StatusFeedScreen`: full-height column layout per figma
  - Top bar: title, `Link` to `/create` with Plus icon (“New Update”), `FeedToolbar`
  - Scrollable list: map filtered/sliced updates to `StatusUpdateCard`
  - Footer: `FeedPagination` (e.g. 6 items per page, same UX as figma)
- State: `searchQuery`, `statusFilter`, `teamFilter`, `currentPage` in screen component
- Import `mockStatusUpdates` equivalent from `src/fixtures/status-updates.ts` and `teams` from fixtures
- Filter options use `StatusSlug` labels via `STATUS_LABELS` where applicable
- `_app/index.tsx`: render `StatusFeedScreen` only

### Definition of done

- [ ] `/` shows feed UI inside shell matching figma structure
- [ ] Pagination and New Update link work with static data
- [ ] Semantic tokens throughout; `StatusChip` uses slugs
- [ ] `pnpm check` passes
- [ ] `pnpm build` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |
| Data Layer & API | N/A |

### Suggested commit

`feat(feed): port status feed screen with static data`

---

## 3.2 Create update screen

**Status:** `planned`  
**Depends on:** SPEC-002.2, 2.3, 2.4  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/CreateUpdate.tsx`  
**Targets:** `src/components/screens/CreateUpdateScreen.tsx`, `src/routes/_app/create.tsx`

### Boundaries

- Submit: `navigate({ to: '/' })` after validation — no `POST /api/statuses`.
- No `console.log` in production code (remove figma debug log).
- Body min-length and API error handling deferred to Part 3.
- Status form state uses `StatusSlug` (default `on_track`), not figma display strings.
- Forbidden: Query mutations, edit-by-id route

### Responsibilities

- Layout: `bg-app-canvas` or `surface` page background, centered `max-w-2xl` form card
- Fields: project `Select` (options from `fixtures/projects.ts`), status radio grid (4 slugs), body `Textarea`, blockers `Textarea`, date `Input` type date
- On submit without project: set error, show `FieldError` (“Please select a project” or api-spec-aligned copy)
- Cancel navigates to `/`
- Use `Button`, `FieldLabel`, `FieldError`, `cn()` for selected status tile styles
- `_app/create.tsx`: render `CreateUpdateScreen` only

### Definition of done

- [ ] `/create` renders full form; submit with project navigates home
- [ ] Project required error displays inline
- [ ] `pnpm check` passes
- [ ] `pnpm build` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`feat(create-update): port status form screen`

---

## 3.3 Team overview screen

**Status:** `planned`  
**Depends on:** SPEC-002.1, 2.2, 2.4  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/TeamOverview.tsx`  
**Targets:** `src/components/screens/TeamOverviewScreen.tsx`, `src/components/team/MetricCard.tsx` (optional), `src/routes/_app/team.tsx`

### Boundaries

- **Do not** ship figma `showEmpty` toggle or empty-state branch (Part 3).
- Metrics and table driven by `fixtures/team-summary.ts` only — not computed from status-updates fixture.
- “View” action may link to `/` or `#` (non-functional OK for Part 1).
- Forbidden: `GET /api/team-summary` hook

### Responsibilities

- `PageHeader` with team overview title and subtitle
- `MetricCard` (extract if not inline): icon, label, value, subLabel; token-based icon badge colors (map metric kind to primary/success/warning/danger tokens, not raw `blue-600`)
- Four metrics from `TeamSummary` fixture fields: `totalUpdatesThisWeek`, `onTrackCount`, `blockedCount`, `needsReviewCount`
- Table: columns Name, Team, Last Update, Status, Actions; rows from `members`; `StatusChip` when `lastStatus` present; `formatRelativeTime` for `lastUpdate`
- `_app/team.tsx`: render `TeamOverviewScreen` only

### Definition of done

- [ ] `/team` shows metric grid + populated table from fixture
- [ ] No empty-state demo toggle in DOM
- [ ] `pnpm check` passes
- [ ] `pnpm build` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`feat(team): port team overview screen`

---

## 3.4 My updates screen

**Status:** `planned`  
**Depends on:** SPEC-002.2  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/MyUpdates.tsx`  
**Targets:** `src/components/screens/MyUpdatesScreen.tsx`, `src/routes/_app/my-updates.tsx`

### Boundaries

- Static empty state only (no user-specific feed, no API).
- Forbidden: Query, list of user's updates

### Responsibilities

- `PageHeader` + `EmptyState` with User icon, copy from figma, CTA `Link` to `/create` with Plus (“Create Update”)
- Page background consistent with other secondary screens (`app-canvas` / neutral surface pattern from figma)
- `_app/my-updates.tsx`: render `MyUpdatesScreen` only

### Definition of done

- [ ] `/my-updates` matches figma empty-state layout
- [ ] CTA navigates to `/create`
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`feat(my-updates): port empty state screen`

---

## 3.5 Settings screen

**Status:** `planned`  
**Depends on:** SPEC-002.2  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/Settings.tsx`  
**Targets:** `src/components/screens/SettingsScreen.tsx`, `src/routes/_app/settings.tsx`

### Boundaries

- Rows are presentational only — no navigation, modals, or settings logic.
- Can be combined in one engineer session with 3.4.

### Responsibilities

- `PageHeader` + typed config array: Profile, Notifications, Privacy, Language & Region (lucide icons per figma)
- `SettingsRow` inline or small component: icon tile, title, description; hover shadow; `cursor-pointer` without click handler
- `_app/settings.tsx`: render `SettingsScreen` only

### Definition of done

- [ ] `/settings` shows four setting rows per figma
- [ ] Config typed (no `any`)
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`feat(settings): port settings screen`

---

## Part 1 vs Part 2 boundary

| Concern | SPEC-003 (Part 1) | Part 2 |
|---------|-------------------|--------|
| Feed data | Fixtures + `useState` slice | `useQuery` + URL params |
| Form submit | Navigate home | `POST` / `PUT` + cache |
| Team screen | Static `TeamSummary` fixture | `GET /api/team-summary` |
| Filters | Local state | Router search + API |

---

## Handoff notes

- Engineer order: 3.1 → 3.2 → 3.3 → 3.4 + 3.5 (one session for 3.4/3.5 acceptable)
- After SPEC-003 complete: README Part 1 done; begin Part 2 spec (Query, routes search, MSW consumption)
- Critical path: 3.1 blocked on SPEC-002.5
- Visual source: figma components (not `designs/`)
