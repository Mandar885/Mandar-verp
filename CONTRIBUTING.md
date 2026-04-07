# Contributing to VERP

VERP is a VOSS Labs project. Contributions are welcome from all Vidyalankar students.

## Setup

1. Fork the repo and clone your fork
2. `npm install`
3. `cp .env.example .env.local` and fill in your database credentials
4. `npm run db:push && npm run db:migrate`
5. `npm run dev`

See [README.md](./README.md) for details on environment variables.

## Making Changes

1. Create a branch from `main`: `git checkout -b your-branch-name`
2. Make your changes
3. Run checks before committing:

```bash
npm run check
```

This runs TypeScript type checking, ESLint, and Prettier format verification.

4. Commit with a clear message describing what changed and why
5. Push and open a pull request against `main`

## Pull Requests

- Keep PRs focused. One feature or fix per PR.
- Fill out the PR template.
- All PRs require at least one review before merging.
- CI must pass (lint, typecheck, build).

## Code Standards

- TypeScript strict mode is enforced. No `any` casts.
- Format with Prettier: `npm run format`
- Lint with ESLint: `npm run lint:fix`
- Database queries go in `src/db/queries/`, organized by domain.
- Schema changes go in `src/db/schema/` with a corresponding migration in `src/db/migrations/`.
- Every API route checks permissions before executing.

## Database Changes

1. Modify the schema in `src/db/schema/`
2. Generate a migration: `npm run db:generate`
3. Test the migration: `npm run db:migrate`
4. Include both the schema change and migration in your PR

## Issue Labels

- `good-first-issue` -- scoped for first-time contributors
- `intermediate` -- requires familiarity with the codebase
- `advanced` -- complex changes across multiple systems
- `bug` -- something is broken
- `feature` -- new functionality
- `docs` -- documentation improvements

## Questions

Open an issue or ask in the VOSS Discord.
