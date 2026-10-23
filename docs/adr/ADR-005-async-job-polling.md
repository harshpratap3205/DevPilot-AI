# ADR-005: Asynchronous Processing via HTTP 202 Accepted and Job IDs

## Status
Accepted

## Context
Code ingestion, AST parsing, dependency graph extraction, vector embedding, container builds, and deployment verification are long-running operations lasting from seconds to several minutes. Holding HTTP connections open causes timeouts, gateway 504 errors, and server connection exhaustion.

## Decision
All long-running tasks return an immediate HTTP `202 Accepted` response with a standard envelope containing:
```json
{
  "jobId": "job_01h...",
  "status": "QUEUED",
  "resourceId": "anl_01h...",
  "pollUrl": "/api/jobs/job_01h..."
}
```
Clients poll the status endpoint or subscribe to server-sent events (SSE). Every async operation implements an idempotency key to prevent duplicate job creation upon client retries.
