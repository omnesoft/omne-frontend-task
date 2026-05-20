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
| SPEC-003 | Screen ports (UI only) | done | See [SPEC-003-screens.md](./SPEC-003-screens.md) |
| SPEC-003.1 | Status feed screen | done | `StatusFeedScreen`, fixtures + local filters |
| SPEC-003.2 | Create update screen | done | `CreateUpdateScreen`, project required |
| SPEC-003.3 | Team overview screen | done | `TeamOverviewScreen`, `MetricCard` |
| SPEC-003.4 | My updates screen | done | Static `EmptyState` |
| SPEC-003.5 | Settings screen | done | Presentational `SettingsRow` |
| SPEC-004 | API integration (Part 2) | done | Rubric: D1✓ D2✓ D3✓ D4✓ |
| SPEC-004.1 | API client and query keys | done | `api-client`, `query-keys`, `types/api` |
| SPEC-004.2 | Teams query and async UI | done | `use-teams`, `QueryState` |
| SPEC-004.3 | Feed URL + paginated query | done | `use-statuses`, route search |
| SPEC-004.4 | Create/edit mutations + cache | done | `/create/$statusId`, POST/PUT |
| SPEC-004.5 | Team overview query | done | `use-team-summary` |
| SPEC-005 | Polish & decisions (Part 3) | done | See [SPEC-005-polish-and-decisions.md](./SPEC-005-polish-and-decisions.md) |
| SPEC-005.1 | Form client validation | done | `status-form-validation`, `CreateUpdateScreen` |
| SPEC-005.2 | Team overview empty state | done | `TeamOverviewScreen` + `EmptyState` |
| SPEC-005.3 | Responsive shell and feed | done | `AppLayout`, `StatusFeedScreen`, `FeedToolbar` |
| SPEC-005.4 | DECISIONS.md | done | Repo root |

Legend: `planned` | `in_progress` | `done` | `blocked`
