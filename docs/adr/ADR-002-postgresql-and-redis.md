# ADR-002: PostgreSQL as Single Source of Truth and Redis for Transient State

## Status
Accepted

## Context
A developer platform handles transactional entities (users, workspaces, memberships, installations, audit events) as well as vector embeddings for source chunks and high-throughput background queues. Splitting across multiple disparate databases (e.g. MongoDB + DynamoDB + Pinecone + Redis) creates data inconsistency, complex backups, and difficult cross-tenant access governance.

## Decision
1. **PostgreSQL** serves as the unified, durable single source of truth. The `pgvector` extension is utilized for high-dimensional vector embeddings, allowing vector retrieval to join directly with workspace, project, and file ACL tables in a single transaction.
2. **Redis** is strictly used for transient, high-velocity state: distributed locks, BullMQ job queues, ephemeral rate-limiting counters, and short-lived caching.
3. Redis is never used as durable storage for core platform records or job histories.

## Consequences
- Single transactional boundary, atomic migrations, unified backup and point-in-time recovery.
- pgvector scales well up to hundreds of thousands of repository chunks with HNSW/IVFFlat indexing without external cloud vector billing.
