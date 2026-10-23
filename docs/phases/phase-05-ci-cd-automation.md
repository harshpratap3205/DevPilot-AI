# Phase 05 — CI/CD Automation

## Scope
- Synthesis of GitHub Actions workflows for lint, test, SAST, container build, and scan.
- BullMQ asynchronous build pipeline queue.
- Disposable build workers running rootless BuildKit.
- Static application security testing (Semgrep) and container vulnerability scanning (Trivy).
- Digest pinning (`sha256:...`) and push to container registries.
- Webhook ingestion of CI run statuses with signature validation.
