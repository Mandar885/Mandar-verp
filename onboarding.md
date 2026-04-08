# Your First Contribution

This guide gets you from zero to a merged PR. No theory, just the steps.

---

## Prerequisites

You need these installed before starting:

- Node.js 18+ (`node -v` to check)
- Git (`git -v` to check)
- A GitHub account
- A code editor (VS Code recommended)

---

## 1. Fork and Clone

Go to https://github.com/voss-labs/verp and click **Fork** (top right).

Then clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/verp.git
cd verp
```

Add the original repo as upstream so you can pull updates later:

```bash
git remote add upstream https://github.com/voss-labs/verp.git
```

---

## 2. Local Setup

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

You need a PostgreSQL database. We use Neon (free tier works):

1. Go to https://neon.tech and create an account
2. Create a new project
3. Copy the pooled connection string into `DATABASE_URL` in `.env.local`
4. Copy the direct (unpooled) connection string into `DIRECT_URL`
5. Generate an auth secret: `openssl rand -base64 32` and paste into `BETTER_AUTH_SECRET`
6. Set `BETTER_AUTH_URL=http://localhost:3000`

Push the schema and run migrations:

```bash
npm run db:push
npm run db:migrate
```

Start the dev server:

```bash
npm run dev
```

Open http://localhost:3000. Sign up with any email/password to create your first account.

### If something breaks

- `DATABASE_URL is not set` -- your `.env.local` is missing or the variable names are wrong.
- `db:push` fails with connection error -- check your Neon connection strings. Make sure you copied the full URL including `?sslmode=require`.
- Port 3000 in use -- kill the other process or set a different port: `npm run dev -- -p 3001`.

---

## 3. Pick an Issue

Go to https://github.com/voss-labs/verp/issues and filter by `good-first-issue`.

Read the issue description. It tells you exactly what needs to change, which files to look at, and what "done" means.

**Before you start working:**

1. Check that nobody else is already assigned
2. Leave a comment on the issue: "I'd like to work on this"
3. A maintainer will assign it to you

Don't start work on an unassigned issue without commenting first. Two people working on the same issue wastes everyone's time.

---

## 4. Create a Branch

Always branch from the latest `main`:

```bash
git checkout main
git pull upstream main
git checkout -b your-branch-name
```

Name your branch after what you're doing: `fix-dead-sidebar-links`, `add-error-pages`, `real-dashboard-stats`.

---

## 5. Make Your Changes

Open the codebase in your editor. Read the files mentioned in the issue before changing anything.

### Key directories

```
src/app/          -- pages and API routes
src/components/   -- React components
src/db/schema/    -- database table definitions
src/db/queries/   -- database query functions
src/lib/          -- utilities (auth, session, helpers)
```

### Before committing, run the checks

```bash
npm run check
```

This runs TypeScript type checking, ESLint, and Prettier. Your PR will fail CI if this doesn't pass.

If formatting is off:

```bash
npm run format
```

If there are lint errors:

```bash
npm run lint:fix
```

---

## 6. Commit and Push

Stage your changes and commit:

```bash
git add src/components/app-sidebar.tsx
git commit -m "Remove dead sidebar links"
```

Be specific in commit messages. "Remove dead sidebar links" is good. "fixes" is not.

Push to your fork:

```bash
git push origin your-branch-name
```

---

## 7. Open a Pull Request

Go to your fork on GitHub. You'll see a banner to create a PR. Click it.

Fill in the PR template:

- **What** -- one sentence describing the change
- **Why** -- reference the issue number (e.g., "Closes #1")
- **How** -- brief description of your approach
- **Testing** -- confirm `npm run check` passes and you tested locally

That's it. Submit the PR.

---

## 8. What Happens Next

- A maintainer reviews your PR within 48 hours
- You might get change requests -- this is normal, not a rejection. Read the feedback, make the changes, push again. The PR updates automatically.
- Once approved, a maintainer merges it
- You're now a VOSS contributor

---

## Quick Reference

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run check` | Run typecheck + lint + format check |
| `npm run format` | Auto-fix formatting |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:studio` | Open visual database browser |

---

## Rules

- One issue per PR. Don't bundle unrelated changes.
- Don't push to `main`. Always use a feature branch.
- Don't add dependencies without discussing in the issue first.
- Run `npm run check` before every PR. No exceptions.
- Ask questions in the issue thread if you're stuck. Nobody expects you to know everything.
