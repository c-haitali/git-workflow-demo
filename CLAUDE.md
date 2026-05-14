# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

`src/app.js` is the entry point. It owns:
- The `OPENAPI_SPEC` object (single source of truth for API documentation — update it whenever routes change)
- System-level routes (`/`, `/docs`, `/openapi.json`, `/api/health`) registered directly on the app
- `createApp()` which wires everything together and is exported for use in tests

`src/routes/tasks.js` is an Express Router for task-domain routes (`/api/tasks`, `/api/tasks/:taskId`). New resource domains should follow the same pattern: a router in `src/routes/`, registered in `src/routes/index.js`.

`src/services/taskService.js` holds all data access logic. Data is in-memory (`_tasks` array); there is no database. Tests rely on this seed data — the test for seed data asserts on the first item's title, so seed order matters. Call `resetTasks()` in `beforeEach` to restore seed state between tests.

OpenAPI path ordering convention: task paths first, system paths (e.g. `/api/health`) last.

## Running the App

```bash
npm install   # install dependencies
npm start     # start server at http://127.0.0.1:3000
npm test      # run Jest test suite
```

## Commit Format

All commits must use the conventional commit format:

```
<type>: <short description>

Types: feat, fix, docs, chore, refactor, test
```

Examples:
- `feat: add pagination to GET /api/tasks`
- `fix: return 404 when task_id is negative`
- `test: add edge case coverage for createTask`
- `refactor: extract status validation into helper`
- `docs: update OpenAPI spec for health endpoint`
- `chore: bump express to 5.x`
