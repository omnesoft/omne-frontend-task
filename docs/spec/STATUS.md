# Spec status

| ID | Title | Status | Notes |
|----|-------|--------|-------|
| SPEC-001 | Foundation (structure, theme, shell) | done | See [SPEC-001-foundation.md](./SPEC-001-foundation.md) |
| SPEC-001.1 | Theme tokens | done | `src/styles/theme.css` |
| SPEC-001.2 | Folder scaffold | done | `src/components/layout/`, `src/components/ui/` |
| SPEC-001.3 | App shell layout | done | `AppLayout`, `nav-config` |
| SPEC-001.4 | Route stubs | done | `_app` pathless layout |
| SPEC-002 | Shared primitives & types | done | See [SPEC-002-shared-primitives.md](./SPEC-002-shared-primitives.md) |
| SPEC-002.1 | Status types and StatusChip | done | `src/types/status.ts`, `StatusChip` |
| SPEC-002.2 | Page header and empty state | done | `PageHeader`, `EmptyState` |
| SPEC-002.3 | Form and action primitives | done | `src/components/ui/*` |
| SPEC-002.4 | API-shaped fixtures and time helper | done | `src/fixtures/*`, `format-relative-time` |
| SPEC-002.5 | Feed list building blocks | done | `StatusUpdateCard`, `FeedToolbar`, `FeedPagination` |
| SPEC-003 | Screen ports (UI only) | planned | See [SPEC-003-screens.md](./SPEC-003-screens.md) |
| SPEC-003.1 | Status feed screen | planned | Depends on SPEC-002.5 |
| SPEC-003.2 | Create update screen | planned | |
| SPEC-003.3 | Team overview screen | planned | |
| SPEC-003.4 | My updates screen | planned | |
| SPEC-003.5 | Settings screen | planned | Can pair with 3.4 in one session |

Legend: `planned` | `in_progress` | `done` | `blocked`
