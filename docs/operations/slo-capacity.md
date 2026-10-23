# Service Level Objectives (SLOs) & Capacity Planning

## 1. Service Level Objectives (SLOs)
- **API Availability:** 99.9% uptime over rolling 30-day windows.
- **Latency (p95):** < 300ms for read/write CRUD operations (excluding downstream third-party GitHub/LLM calls).
- **Ingestion Time:** Small-to-medium repositories (< 5,000 files) ingested and AST analyzed in < 2 minutes.
- **Data Isolation:** Zero cross-tenant data leaks (0 tolerance).

## 2. Capacity Guardrails
- **Max Repository Archive Size:** 50 MB compressed archive limit for MVP.
- **Max Files Scanned:** 5,000 source files per repository version.
- **Concurrent Analysis Jobs:** Max 3 concurrent jobs per workspace.
- **Rate Limits:** 120 requests/min per IP on unauthenticated routes; 600 requests/min per workspace on authenticated routes.
