# ADR-006: Deterministic Templates Paired with LLM Suggestions & Validation

## Status
Accepted

## Context
Relying purely on LLM generation for infrastructure as code (Dockerfile, Kubernetes manifests, Helm charts) yields hallucinated configuration keys, unoptimized multi-stage build layers, and security anti-patterns (e.g. running as root, missing resource limits). Conversely, pure static templates cannot adapt to custom build scripts or frameworks.

## Decision
We implement a hybrid approach:
1. **Deterministic Structured Specification:** The engine extracts language, framework, port, start script, and dependencies into a typed JSON schema (`DeploymentSpec`).
2. **Deterministic Baseline Templates:** Production-hardened templates (multi-stage non-root Dockerfiles, Kubernetes manifests with liveness/readiness probes and security contexts) provide the structural skeleton.
3. **LLM Enrichment:** The LLM is used to tailor configuration nuances (specific environment variables, cache directory flags, health check paths).
4. **Validation Gate:** All output must pass strict syntax and linting checks (`dockerfile-lint`, `kubeval`/`helm lint`) and require explicit user approval before being committed to GitHub.

## Consequences
- Guaranteed syntactic validity and enforcement of container security standards.
- No live secrets or credentials can be accidentally inserted.
