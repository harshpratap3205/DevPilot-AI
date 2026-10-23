# ADR-004: Pin Repository Analysis and Indexing to Immutable Commit SHAs

## Status
Accepted

## Context
Git branches (such as `main` or `feature/xyz`) are mutable pointers. If an import or RAG indexing job relies on a branch name, subsequent commits pushed while the job runs lead to cache corruption, inconsistent graph nodes, and mismatched line-level citations.

## Decision
All repository imports, static AST analyses, and vector embeddings must resolve the target branch or tag to an immutable 40-character Git commit SHA before beginning processing. All database entities (`repository_versions`, `files`, `api_routes`, `graph_nodes`, `source_chunks`) reference this immutable commit SHA.

## Consequences
- Deterministic analysis results and caching: re-running analysis on the same commit SHA produces identical results.
- Robust incremental diffing: new commits only require re-analyzing and re-indexing modified files.
- Citations remain permanently accurate to the specific commit snapshot.
