# Decisions

## Data and routing (Part 2)

After create or edit, the app invalidates TanStack Query keys for the status list and team summary instead of patching the cache optimistically. Invalidation is easier to reason about with MSW’s random failures and keeps the feed and team overview consistent without hand-maintaining partial list updates. Feed filters (status, team, page, search) live in TanStack Router search params so the list is deep-linkable and the back button restores state; local React state would be simpler but would not match production list behavior.

## Form and team overview (Part 3)

The mock API accepts any non-empty body up to 500 characters; the README asks for a meaningful minimum on the client. I validate 10 characters after trim in `validateStatusForm` before submit so users get inline feedback without a round trip, while server rules still apply on edge cases. The team overview uses the figma empty panel when `totalUpdatesThisWeek === 0` and every member has `lastUpdate === null`, which matches “no updates yet” without changing the mock server (verify in dev by deleting all statuses via `DELETE /api/statuses/:id`).

## Layout (Part 3)

At tablet width (~768px) a fixed sidebar leaves too little room for the feed toolbar. I hide the sidebar below `md` and show a top bar with horizontally scrollable nav links from the same `navItems` config, rather than a hamburger drawer that adds extra taps. Team metrics use a 2-column grid on small viewports so cards stay readable. With more time I would add optimistic feed updates with rollback and optional blur validation on the form.
