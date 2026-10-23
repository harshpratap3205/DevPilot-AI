# Phase 00 — Foundation and Local Infrastructure Blueprint

## Objective
Establish the monorepo workspace, core infrastructure services (PostgreSQL with pgvector, Redis), shared contracts package, core Express modular API skeleton, Python FastAPI AI service skeleton, Next.js web application skeleton, database migration baseline, structured logging, request correlation, health endpoints, and automated CI pipelines.

---

## Deliverables Checklist
- [ ] Monorepo configuration (`pnpm-workspace.yaml`, root `package.json`, TypeScript shared config).
- [ ] Local Docker Compose (`infrastructure/compose/docker-compose.yml`) running PostgreSQL 16 (with `pgvector`) and Redis 7 with health checks.
- [ ] Environment variable template (`.env.example`) and `.gitignore`.
- [ ] Shared contracts package (`packages/contracts`) with Zod schemas for User, Workspace, Project, Health, and Standard Errors.
- [ ] Core API service (`services/api`):
  - Express app with strict TypeScript.
  - Pino structured logger with request ID propagation middleware.
  - Global error handler converting Zod/internal errors to standard JSON error envelope.
  - Health check endpoints (`/health`, `/health/ready`).
  - Database client and initial migration (Prisma / SQL migration for `users`, `workspaces`, `workspace_members`, `projects`).
  - Vitest test suite for health, middleware, and schema validation.
- [ ] Python AI service (`services/ai-service`):
  - FastAPI application with health endpoint.
  - Pydantic models matching shared contracts.
  - Pytest suite.
- [ ] Next.js web application (`apps/web`):
  - Next.js App Router with TypeScript and Tailwind CSS.
  - Basic layout and landing dashboard checking API health.
- [ ] GitHub Actions CI workflow (`.github/workflows/ci.yml`) running lint, typecheck, and test jobs across services.

---

## Acceptance Criteria
1. `pnpm install` succeeds cleanly across all workspaces.
2. `docker compose -f infrastructure/compose/docker-compose.yml up -d` starts PostgreSQL and Redis with healthy statuses.
3. Database migrations apply cleanly against local PostgreSQL.
4. `services/api` starts and responds to `GET /health` with 200 OK.
5. `services/ai-service` starts and responds to `GET /health` with 200 OK.
6. `apps/web` builds and starts cleanly.
7. Unit tests in `services/api` (Vitest) and `services/ai-service` (pytest) pass with zero errors.
8. CI workflow passes lint and typecheck.
