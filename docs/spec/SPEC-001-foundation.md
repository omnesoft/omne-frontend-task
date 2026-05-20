# SPEC-001: Foundation (structure, theme, shell)

> Phase / README mapping: Part 1 (foundation only)  
> Created: 2026-05-20  
> Depends on: none

## Goal

Establish the production app skeleton: extended design tokens in `theme.css`, a minimal folder layout under `src/components/layout/`, an app shell ported from Figma `Layout.tsx` (structure only), and TanStack Router pathless layout with stub routes. No screen UI, API wiring, or shadcn port.

## Out of scope (epic)

- Port of `figma-output/.../ui/` or bulk `@base-ui/react` primitives
- `StatusChip`, feed, forms, team metrics, settings content
- TanStack Query, MSW handler changes, URL filters
- Responsive sidebar collapse, `DECISIONS.md`
- Copying figma `theme.css` shadcn `:root` stack

## Conventions (reference for all items)

- Target code: `src/` only; `figma-output/` is read-only reference.
- Stack per [AGENTS.md](../../AGENTS.md); API per [api-spec.md](../../api-spec.md) (not used in this epic).
- Nav active states: `bg-primary-50 text-primary-700` (not raw `blue-*`).
- Suggested commits: Conventional Commits per AGENTS.md.

---

## 1.1 Theme tokens

**Status:** `done`  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/Layout.tsx`, `StatusChip.tsx` (color intent only)  
**Targets:** `src/styles/theme.css`, `src/styles/globals.css`

### Boundaries

- Do **not** copy figma `theme.css` shadcn variables or `@layer base` typography block.
- Do **not** add `fonts.css` or a second Tailwind entry; Inter is loaded in `index.html`.
- No dark-mode theming in this item.
- Forbidden: edits to `figma-output/`, `src/api/mock-server.ts`

### Responsibilities

- Extend `src/styles/theme.css` `@theme` with:
  - **App chrome:** `--color-app-canvas`, `--color-sidebar`, `--color-sidebar-border` (figma page bg / sidebar).
  - **Status categories (CSS only):** `--color-status-on-track-*`, `blocked`, `needs-review`, `done` (bg, text, border) aligned with figma chip colors.
- Keep `globals.css` as reset + `body` using semantic tokens.
- Layout or stubs must consume semantic utilities (`bg-app-canvas`, `bg-sidebar`, etc.).

### Definition of done

- [ ] App chrome and status tokens exist in `theme.css`
- [ ] No hardcoded hex in layout/stub components
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |
| Data Layer & API | N/A |
| Component Architecture | N/A |
| Communication & Judgment | N/A |

### Suggested commit

`feat(theme): add app chrome and status color tokens`

---

## 1.2 Folder scaffold

**Status:** `done`  
**README:** Part 1  
**Figma reference:** —  
**Targets:** `src/components/layout/`, optional `src/components/ui/.gitkeep`

### Boundaries

- No barrel `index.ts` files unless immediately used.
- No new dependencies, domain types, hooks, or `api/` changes.
- Forbidden: porting `figma-output/.../ui/`

### Responsibilities

- Create `src/components/layout/`
- Optional `src/components/ui/.gitkeep` to reserve primitives (no shadcn port)

### Definition of done

- [ ] Directories exist
- [ ] `pnpm check` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`chore(structure): add components layout directories`

---

## 1.3 App shell layout

**Status:** `done`  
**Depends on:** 1.1, 1.2  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/components/Layout.tsx`  
**Targets:** `src/components/layout/AppLayout.tsx`, `src/components/layout/nav-config.ts`

### Boundaries

- No screen content, `StatusChip`, or mobile sidebar collapse.
- No react-router imports.
- No template-string `className` in nav; use `cn()` + token utilities.
- Forbidden: `figma-output/` edits

### Responsibilities

- `AppLayout.tsx`: `flex h-screen`, sidebar `w-64`, main area with `<Outlet />`
- `nav-config.ts`: paths `/`, `/my-updates`, `/team`, `/settings` + lucide icons (labels match figma)
- TanStack `Link` with `activeProps` / semantic active styles

### Definition of done

- [ ] Shell matches figma structure (sidebar + scrollable main)
- [ ] `pnpm check` passes
- [ ] `pnpm build` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`feat(layout): add app shell with sidebar navigation`

---

## 1.4 Route stubs under pathless layout

**Status:** `done`  
**Depends on:** 1.3  
**README:** Part 1  
**Figma reference:** `figma-output/src/app/routes.ts` (route map only)  
**Targets:** `src/routes/_app.tsx`, `src/routes/_app/*.tsx`; remove `src/routes/index.tsx`

### Boundaries

- Stub pages: title + optional subtitle only — no mock data, Query, or forms.
- Do **not** modify `src/api/mock-server.ts`.
- Forbidden: Part 2 data layer

### Responsibilities

- `src/routes/_app.tsx` wraps `AppLayout`
- Child routes: `/`, `/create`, `/my-updates`, `/team`, `/settings` with minimal placeholders
- Remove root `src/routes/index.tsx`; feed stub at `_app/index.tsx`

### Definition of done

- [ ] All five URLs render inside shell; sidebar active state correct
- [ ] `pnpm check` passes
- [ ] `pnpm build` passes

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Code Quality & TypeScript | 3 |

### Suggested commit

`feat(routes): add pathless layout and stub app routes`

---

## Handoff notes

- Next: SPEC-002 shared primitives (`StatusChip`, page header pattern, API status types)
- Then SPEC-003+ screen builds (feed, create, team, my updates, settings)
- Risk: TanStack pathless layout file naming — use `_app.tsx` + `_app/` children per router plugin conventions
