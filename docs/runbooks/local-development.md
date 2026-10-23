# Local Development Runbook

## Prerequisites
- Node.js >= 20.x and `pnpm` >= 9.x
- Python >= 3.11 with `poetry` or `pip` / `venv`
- Docker Engine & Docker Compose

## Quickstart
1. **Clone & Setup:**
   ```bash
   cp .env.example .env
   pnpm install
   ```

2. **Start Infrastructure Services:**
   ```bash
   docker compose -f infrastructure/compose/docker-compose.yml up -d
   ```

3. **Run Migrations:**
   ```bash
   pnpm --filter @devpilot/api db:migrate
   ```

4. **Start Development Services:**
   - Core API: `pnpm --filter @devpilot/api dev` (port 4000)
   - Web App: `pnpm --filter @devpilot/web dev` (port 3000)
   - AI Service: `cd services/ai-service && uvicorn app.main:app --reload --port 8000`

5. **Run Tests:**
   ```bash
   pnpm test
   ```
