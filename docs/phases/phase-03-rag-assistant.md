# Phase 03 — RAG Code Assistant

## Scope
- AST-aware code chunking respecting function and class boundaries.
- Generating vector embeddings with pgvector HNSW indexing.
- Hybrid search combining pgvector cosine distance and PostgreSQL full-text search (`tsvector`).
- Reranking and strict prompt context budgeting.
- Grounded Q&A assistant with exact file path and line number citations.
- Strict prompt injection boundaries (source files treated as untrusted user data).
- Incremental indexing and deleted file cleanup on commit changes.
