# SPEC-<NNN>: <Title>

> Phase / README mapping: Part 1 | Part 2 | Part 3  
> Created: YYYY-MM-DD  
> Depends on: *(prior SPEC items or "none")*

## Goal

One paragraph: what this epic delivers and why it comes now.

## Out of scope (epic)

- …

## Conventions (reference for all items)

- Target code: `src/` only; `figma-output/` is read-only reference.
- Stack per [AGENTS.md](../../../AGENTS.md); API per [api-spec.md](../../../api-spec.md).
- Suggested commits: Conventional Commits per AGENTS.md.

---

## 1. <Item title>

**Status:** `planned`  
**README:** Part X  
**Figma reference:** `figma-output/src/app/components/<Screen>.tsx`  
**Targets:** `src/...`

### Boundaries

- Do **not**: …
- Forbidden paths: …

### Responsibilities

- Must create/update: …
- Must wire / integrate: …

### Definition of done

- [ ] …
- [ ] `pnpm check` passes
- [ ] `pnpm build` passes *(if routes, route types, or build config touched)*

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| Component Architecture | 3 |
| Data Layer & API | 3 |
| Styling & UI Craft | 3 |
| Code Quality & TypeScript | 3 |
| Communication & Judgment | 3 |

*(Omit dimensions that do not apply; set N/A in notes.)*

### Suggested commit

`feat(<scope>): <imperative subject>`

---

## 1.1 <Subitem title> *(optional)*

**Status:** `planned`  
**Depends on:** 1

### Boundaries

- …

### Responsibilities

- …

### Definition of done

- [ ] …

### Target rubric

| Dimension | Minimum |
|-----------|---------|
| … | 3 |

### Suggested commit

`feat(<scope>): <imperative subject>`

---

## Handoff notes

- Next item after completion: …
- Risks / open questions: …
