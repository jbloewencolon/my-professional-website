# Tasks

## Copy Editing Refactor

- [x] Create task tracker for copy-editing refactor work.
- [x] Add a centralized route/title/meta content file.
- [x] Wire the build to read route metadata from that content file.
- [x] Wire the client app to read page titles and nav labels from that content file.
- [x] Keep the local source fallback working.
- [x] Update the dist self-check to validate generated routes from the same source.
- [x] Run `npm run check`.

## Change Log

- 2026-06-26: Added `tasks.md` to track copy-editing architecture changes.
- 2026-06-26: Added `content/routes.js` as the route/title/meta/nav label source of truth.
- 2026-06-26: Wired build output, local fallback scripts, client nav labels, client page titles, and dist checks to `content/routes.js`.
- 2026-06-26: Ran `npm run check`; build and route/meta validation passed.
