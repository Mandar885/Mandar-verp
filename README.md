# VERP

Open-source ERP for Vidyalankar Institute of Technology. Built and maintained by [VOSS Labs](https://vosslabs.org).

VERP handles the core academic operations of the college: student records, faculty management, course offerings, marks entry, attendance tracking, and departmental administration.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL on [Neon](https://neon.tech)
- **ORM**: Drizzle ORM
- **Auth**: Better Auth (email/password)
- **Styling**: Tailwind CSS 4, shadcn/ui
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (we use [Neon](https://neon.tech) -- free tier works)

### Setup

1. Clone the repo:

```bash
git clone https://github.com/voss-labs/verp.git
cd verp
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment template and fill in your values:

```bash
cp .env.example .env.local
```

You need:
- `DATABASE_URL` -- pooled Neon connection string (used by the app)
- `DIRECT_URL` -- direct Neon connection string (used by migrations)
- `BETTER_AUTH_SECRET` -- a random secret (`openssl rand -base64 32`)
- `BETTER_AUTH_URL` -- `http://localhost:3000` for local dev

4. Push the schema and run migrations:

```bash
npm run db:push
npm run db:migrate
```

5. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/              Next.js pages and API routes
    api/            REST endpoints (auth, marks, offerings)
    dashboard/      Protected dashboard pages
    login/          Login page
  components/       React components
    ui/             shadcn/ui primitives
    columns/        Data table column definitions
  db/
    schema/         Drizzle ORM table definitions
    queries/        Database query functions (organized by domain)
    migrations/     SQL migration files
  lib/              Utilities (auth, session, API helpers)
  hooks/            React hooks
```

## Database

Schema is defined in `src/db/schema/` using Drizzle ORM. Queries are organized by domain in `src/db/queries/`.

**Key commands:**

| Command | Description |
|---|---|
| `npm run db:push` | Push schema changes to database |
| `npm run db:migrate` | Run pending SQL migrations |
| `npm run db:migrate:status` | Check migration status |
| `npm run db:generate` | Generate new migration from schema changes |
| `npm run db:studio` | Open Drizzle Studio (visual DB browser) |
| `npm run db:setup` | Full setup (push + migrate) |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run check` | Run typecheck + lint + format check |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions and contribution guidelines.

## License

[MIT](./LICENSE)
