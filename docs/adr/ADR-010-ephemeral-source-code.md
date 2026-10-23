# ADR-010: Ephemeral Source Code Ingestion and Retention Policy

## Status
Accepted

## Context
Holding complete raw source code of private customer repositories persistently on DevPilot AI storage increases compliance scope (SOC 2, ISO 27001, GDPR), storage costs, and blast radius in the event of an infrastructure breach.

## Decision
1. **Ephemeral Clones:** Ingest workers download the repository tarball into an ephemeral tmpfs or temporary directory.
2. **Metadata Extraction:** The worker extracts static metadata (file paths, languages, AST route definitions, dependency graph relationships, and segmented RAG text chunks) directly into PostgreSQL.
3. **Immediate Cleanup:** Once parsing, chunking, and embedding generation finish, the raw source tarball and cloned filesystem are purged immediately with secure wipe.
4. If a user deletes a repository or revokes GitHub App permissions, all associated chunks, embeddings, routes, and graph nodes are cascaded and deleted within 24 hours.
