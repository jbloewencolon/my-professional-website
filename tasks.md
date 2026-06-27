# Tasks

## Copy Editing Refactor

- [x] Create task tracker for copy-editing refactor work.
- [x] Add a centralized route/title/meta content file.
- [x] Wire the build to read route metadata from that content file.
- [x] Wire the client app to read page titles and nav labels from that content file.
- [x] Keep the local source fallback working.
- [x] Update the dist self-check to validate generated routes from the same source.
- [x] Run `npm run check`.

## Text Copy Phase

- [x] Push route/title/meta copy refactor.
- [x] Add centralized editable content files for homepage/about/speaking/contact/work text.
- [x] Wire build and local fallback to load text content before JSX.
- [x] Move existing structured text lists out of component files.
- [x] Wire key page headlines and lead copy to the text content file.
- [x] Run `npm run check`.
- [x] Move work page headlines/leads and work lists into editable content.

## Change Log

- 2026-06-26: Added `tasks.md` to track copy-editing architecture changes.
- 2026-06-26: Added `content/routes.js` as the route/title/meta/nav label source of truth.
- 2026-06-26: Wired build output, local fallback scripts, client nav labels, client page titles, and dist checks to `content/routes.js`.
- 2026-06-26: Ran `npm run check`; build and route/meta validation passed.
- 2026-06-26: Pushed commit `6fb0f52` with route/title/meta copy refactor.
- 2026-06-26: Added `content/text.js` and wired homepage/about/speaking/contact page copy through it.
- 2026-06-26: Ran `npm run check`; text content build passed.
- 2026-06-26: Added `content/work.js` and moved work publications, press, talks, projects, headlines, leads, and tiles into editable content files.
- 2026-06-26: Ran `npm run check`; work content build passed.
