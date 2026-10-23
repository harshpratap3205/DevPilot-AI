# AGENTS.md — Antigravity Engineering Operating Rules

You are an engineering agent working on **DevPilot AI**. Follow these persistent operating principles and security guardrails across all phases:

## 1. Operating Rules
1. **Read Specifications First:** Always read [MASTER_PLAN.md](file:///c:/Users/harsh/Downloads/DevPilot%20AI/MASTER_PLAN.md), [AGENTS.md](file:///c:/Users/harsh/Downloads/DevPilot%20AI/AGENTS.md), relevant phase documents in `docs/phases/`, and Architecture Decision Records in `docs/adr/` before authoring code.
2. **One Phase and Bounded Task at a Time:** Work on one phase and one bounded feature per cycle. Do not jump ahead into future phases or create half-baked placeholders across unrelated modules.
3. **Pre-Implementation Proposals:** Before writing code, present the files to create/modify, API contracts, database schema diffs, security/threat implications, and test coverage plans.
4. **No Silent Architectural Shifts:** Do not silently introduce architectural changes or swap critical technologies. Document changes via an Architecture Decision Record (ADR) under `docs/adr/`.
5. **Strict Typing & Explicit Error Handling:** Use strict TypeScript (`strict: true`, `noImplicitAny`) and Python type hints (`mypy` compliant). Do not use broad `any` or empty catch blocks.
6. **Zero Secrets in Code:** Never hardcode credentials, tokens, or encryption keys. Never commit `.env` files. Provide comprehensive `.env.example` templates.
7. **No Untrusted Execution on Host:** Never execute imported repository code directly on the API host or main development machine. Code analysis must remain purely static AST parsing.
8. **No Mock Successes in Production Paths:** Do not use mocked success responses or synthetic bypasses in production code paths. Tests should use explicit, isolated test fixtures.
9. **Authorization Everywhere:** Every tenant-scoped endpoint must enforce workspace and project-level authorization. Never trust client-provided IDs without validating ownership against the current session.
10. **Comprehensive Testing:** Add tests for happy paths, failure conditions, concurrent requests, security boundaries, and tenant isolation.
11. **Verification Over Claims:** Run formatting, linting, typechecks, and tests via the terminal. Report actual execution logs and test outputs. Never claim a check passed without executing it.
12. **Living Documentation:** Keep `README.md`, API contracts (`docs/architecture/api-contracts.md`), and the respective phase checklist in `docs/phases/` updated alongside code changes.
13. **Explicit Approvals for High-Risk Actions:** Prompt the user for approval before installing wide/heavy dependencies, deleting files, restructuring databases, or running deployment commands.
14. **Structured Delivery Summaries:** Conclude every task with an implementation summary: files changed, commands run, test results, and residual risks.
15. **Backwards Compatibility & Preservation:** Preserve existing working functionality and docstrings. Do not break previously passing tests when extending functionality.
