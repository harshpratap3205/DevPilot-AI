# Phase 08 — Security & Reliability Hardening

## Scope
- Multi-tenant boundary penetration tests and strict PostgreSQL Row Level Security (RLS).
- Sandboxed worker isolation with gVisor / Kata runtimes.
- Network egress controls preventing metadata service (SSRF) and private subnet reaching.
- Workspace quotas (concurrent jobs, storage limit, API rate limits).
- Job crash recovery, worker timeout sweepers, and dead-letter queue (DLQ) replay handlers.
- Automated database backup and disaster recovery validation.
