# SPEC-005: Polish & Decisions (Part 3)

> Phase / README mapping: Part 3  
> Created: 2026-05-20  
> Depends on: [SPEC-004-api-integration.md](./SPEC-004-api-integration.md)

## Goal

Close README Part 3: client-side status form validation (including meaningful body length), team overview empty state from design, tablet-width (~768px) feed and shell responsiveness, and `DECISIONS.md` for submission. Builds on Part 2 hooks and screens without API or mock changes.

## Out of scope (epic)

- New screens, routes, or endpoints
- Edits to `src/api/mock-server.ts`, `public/mockServiceWorker.js`, `figma-output/`
- My Updates / Settings data wiring
- Optimistic updates, feed search debounce
- Tests, `figma-output/` `showEmpty` demo toggle
- New validation libraries (`react-hook-form`, Zod)

## Conventions (reference for all items)

- Target code: `src/` only; visual reference: `figma-output/src/app/components/TeamOverview.tsx` (empty branch only).
- Reuse: `EmptyState`, `FieldError`, `FieldLabel`, `Textarea` (`error` prop), `Button`, `QueryState`.
- Body client rules: trim whitespace; **min 10**, **max 500** characters (stricter than API min 1 — document in `DECISIONS.md`).
- Responsive breakpoint: Tailwind `md` (768px).
- Suggested commits: Conventional Commits per [AGENTS.md](../../AGENTS.md).

## Part 2 vs Part 3 boundary

| Concern | SPEC-004 (done) | SPEC-005 |
|---------|-----------------|----------|
| Form | Project + team required; API `details` on 400 | Body min/max client rules; field error UX |
| Team overview | `useTeamSummary` + loading/error | Empty when no team updates |
| Layout | Desktop sidebar | Tablet feed + shell |
| Communication | — | `DECISIONS.md` |

---

## 5.1 Status form client validation

**Status:** `planned`  
**Depends on:** SPEC-004.4  
**README:** Part 3 §1  
**Figma reference:** `figma-output/src/app/components/CreateUpdate.tsx` (project error pattern only)  
**Targets:** `src/lib/status-form-validation.ts`, `src/components/screens/CreateUpdateScreen.tsx`

### Boundaries

- No `react-hook-form`, Zod, or new dependencies.
- Do **not** edit `mock-server.ts` or remove API `details` handling on 400.
- Forbidden: `figma-output/`

### Responsibilities

- `status-form-validation.ts`:
  - `MIN_UPDATE_BODY_LENGTH = 10`, `MAX_UPDATE_BODY_LENGTH = 500`
  - `validateStatusForm(fields)` → `FieldErrors` partial record (`project`, `teamId`, `body`)
  - Trim `body` before length checks
- `CreateUpdateScreen`:
  - Call validator on submit **before** `mutateAsync`; abort when errors present
  - Inline messages: `Please select a project`, `Please select a team`, `Update must be at least 10 characters`, `Update must be 500 characters or fewer`
  - `error={Boolean(fieldErrors.body)}` on update `Textarea`; clear errors on field change (existing pattern)

### Definition of done

- [ ] Empty project → inline error, no mutation
- [ ] Body &lt; 10 chars after trim → inline error on update field
- [ ] Body &gt; 500 → inline error
- [ ] Valid form still navigates to feed on success
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Code Quality & TypeScript | 3 |
| Styling & UI Craft | 3 |

### Suggested commit

`feat(create-update): add client-side form validation`

---

## 5.2 Team overview empty state

**Status:** `planned`  
**Depends on:** SPEC-004.5  
**README:** Part 3 §2  
**Figma reference:** `figma-output/src/app/components/TeamOverview.tsx` (empty branch, lines 70–86)  
**Targets:** `src/components/screens/TeamOverviewScreen.tsx`

### Boundaries

- No `showEmpty` demo toggle in DOM.
- No `mock-server.ts` edits.
- Do **not** bake team-specific copy into `EmptyState` component.

### Responsibilities

- Empty when:

```ts
summary.totalUpdatesThisWeek === 0 &&
summary.members.every((m) => m.lastUpdate == null)
```

- Render `EmptyState` instead of metrics grid + table:
  - Icon: `FileText` (`size-16 text-icon-muted`)
  - Title: `No updates yet`
  - Description: `Your team hasn't posted any status updates yet. Be the first to share your progress!`
  - Action: `Link` to `/create` + `Button` label `Create First Update`
- Keep `PageHeader`; preserve `QueryState` loading/error paths

### Definition of done

- [ ] Empty branch matches figma copy/CTA
- [ ] Populated summary still shows metrics + table
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |

### Suggested commit

`feat(team-overview): add empty state when team has no updates`

### Verification (handoff)

MSW seed always has statuses. Verify empty branch by deleting all statuses via `DELETE /api/statuses/:id`, then refetch team summary.

---

## 5.3 Responsive feed and shell (~768px)

**Status:** `planned`  
**Depends on:** SPEC-001.3, SPEC-003.1  
**README:** Part 3 §3  
**Figma reference:** `figma-output/src/app/components/Layout.tsx` (structure reference only)  
**Targets:** `src/components/layout/AppLayout.tsx`, `src/components/screens/StatusFeedScreen.tsx`, `src/components/feed/FeedToolbar.tsx`

### Boundaries

- Primary scope: **feed** + shell navigation; other screens only `px-4 md:px-8` padding if touched.
- Tailwind utilities only; no new CSS files.
- No route tree changes.

### Responsibilities

- **`>= md`:** Current left sidebar (`w-64`) + main.
- **`< md`:** Hide sidebar; top bar with logo + horizontal scrollable nav (`navItems` from `nav-config.ts`); preserve `DEFAULT_FEED_SEARCH` on feed link.
- **StatusFeedScreen:** Stack header title + New Update; `px-4 md:px-8` on sections.
- **FeedToolbar:** `flex-col md:flex-row`, full-width controls below `md`.
- **FeedPagination:** No horizontal overflow at ~768px (wrap or responsive text if needed).

### Definition of done

- [ ] ~768px: feed usable without horizontal page scroll
- [ ] Navigation reachable without permanent sidebar
- [ ] Desktop (`>= md`) unchanged
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Styling & UI Craft | 3 |

### Suggested commit

`style(layout): add tablet-responsive shell and feed toolbar`

---

## 5.4 DECISIONS.md

**Status:** `planned`  
**Depends on:** 5.1–5.3 (recommended after implementation)  
**README:** Part 3 §4  
**Targets:** `DECISIONS.md` (repo root)

### Boundaries

- Docs only; no feature code required.
- English only; do not list AI tooling as a “decision”.

### Responsibilities

- 2–3 short paragraphs total (not an essay).
- Each decision: **X over Y because …**; include tradeoff or “with more time”.
- Must cover at least one **Part 2** topic (e.g. cache invalidation over optimistic updates; URL-synced feed filters).
- Must cover at least one **Part 3** topic (e.g. body min 10 vs API min 1; top nav vs drawer; team empty detection rule).

### Definition of done

- [ ] `DECISIONS.md` at repo root
- [ ] 2–3 substantive decisions with rationale
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Communication & Judgment | 3 |

### Suggested commit

`docs: add DECISIONS.md for assessment submission`

---

## Handoff notes

- **Engineer order:** 5.1 → 5.2 → 5.3 → 5.4.
- **Body minimum:** 10 characters after trim (fixed; document vs API min 1 in `DECISIONS.md`).
- **Empty state:** Not visible in default dev seed; use DELETE-all-statuses to verify.
- **Responsive:** Top nav below `md` is the default; drawer acceptable if feed DoD met — document choice in `DECISIONS.md`.
