# DevPilot AI

DevPilot AI is a production-grade developer platform combining repository intelligence, AST code analysis, cited RAG assistance, automated infrastructure generation (Docker, Kubernetes, Helm), isolated container builds, and Kubernetes rollout orchestration.

## Architecture

- **Web Dashboard:** Next.js (App Router), Tailwind CSS, Lucide icons, React Flow.
- **Core API:** Modular monolith in Express, strict TypeScript, Prisma ORM, Pino structured logging, request ID tracing.
- **AI Service:** Python FastAPI, Pydantic, pgvector hybrid search integration.
- **Data Stores:** PostgreSQL 16 (with `pgvector`), Redis 7 (BullMQ queues & distributed locks).
- **Architecture & Specifications:** See [MASTER_PLAN.md](file:///c:/Users/harsh/Downloads/DevPilot%20AI/MASTER_PLAN.md) and [AGENTS.md](file:///c:/Users/harsh/Downloads/DevPilot%20AI/AGENTS.md).

## Getting Started

### 1. Prerequisites
- Node.js >= 20.x and `pnpm`
- Python >= 3.11
- Docker Desktop or Docker Engine

### 2. Install Dependencies
```bash
# Set up environment file
cp .env.example .env

# Install pnpm workspace dependencies
pnpm install
```

### 3. Start Local Infrastructure
```bash
docker compose -f infrastructure/compose/docker-compose.yml up -d
```

### 4. Build Contracts & Run Migrations
```bash
pnpm --filter @devpilot/contracts build
pnpm --filter @devpilot/api db:generate
```

### 5. Start Services
- **Core API (port 4000):**
  ```bash
  pnpm --filter @devpilot/api dev
  ```
- **AI Service (port 8000):**
  ```bash
  cd services/ai-service
  python -m venv .venv
  source .venv/bin/activate  # or .venv\Scripts\Activate.ps1 on Windows
  pip install -r requirements.txt
  uvicorn app.main:app --reload --port 8000
  ```
- **Web App (port 3000):**
  ```bash
  pnpm --filter @devpilot/web dev
  ```

### 6. Run Tests
```bash
pnpm --filter @devpilot/api test
```
