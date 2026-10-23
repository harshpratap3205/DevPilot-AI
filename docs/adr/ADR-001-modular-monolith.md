# ADR-001: Modular Monolith API with Python AI Service and Isolated Workers

## Status
Accepted

## Context
DevPilot AI requires core platform functionality (user management, workspace RBAC, GitHub integration, project tracking, job coordination) alongside specialized workloads (Python-based AI/LLM operations, Tree-sitter AST analysis, and isolated container build/scanning execution).

Building 10+ independent microservices from day one introduces severe operational complexity: distributed transactions, network latency, multiple deployment pipelines, schema drift, and difficult local orchestration. Conversely, packing Python AI libraries and container build tools into a single Node.js runtime creates bloated runtimes and unstable execution.

## Decision
We adopt a **modular monolith** architecture for the primary API service using TypeScript and Express, complemented by:
1. A specialized **Python FastAPI service** (`services/ai-service`) for embeddings, hybrid retrieval, and LLM provider abstractions.
2. Independent **background workers** (`ingest-worker`, `build-worker`, `deploy-controller`) communicating via Redis and BullMQ.

Each domain in the core API is encapsulated in a dedicated module under `services/api/src/modules/` (e.g., `auth`, `workspaces`, `projects`, `analysis`, `jobs`, `artifacts`, `deployments`, `audit`) with well-defined boundaries and interfaces.

## Consequences
- **Positive:** Rapid development, type-safe internal dependencies, unified database migrations, simplified local orchestration via Docker Compose.
- **Positive:** Keeps Python AI ecosystem (LangChain, HuggingFace, PyTorch/ONNX if needed) clean and isolated from Node.js runtime.
- **Negative:** Requires strict module boundary discipline to prevent circular imports and spaghetti coupling within `services/api`.
