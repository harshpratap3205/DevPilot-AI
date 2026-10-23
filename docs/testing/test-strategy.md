# Test Strategy & Quality Gates

## 1. Testing Pyramid

```
       /\
      /  \     E2E Tests (Playwright / Supertest full flows)
     /----\    Contract Tests (Zod, OpenAPI, Webhook HMAC signatures)
    /------\   Integration Tests (PostgreSQL, Redis, BullMQ, Mock GitHub)
   /--------\  Unit Tests (Vitest, Pytest: Parsers, FSM, State transitions)
```

## 2. Test Requirements per Layer
- **Unit Tests:** Fast, isolated, deterministic. Every state machine transition, Zod schema parser, and route extractor must have unit tests.
- **Integration Tests:** Execute against local PostgreSQL with test database migrations and Redis. Never use mocks for local database logic.
- **Contract Tests:** Validate API payloads against shared Zod schemas (`packages/contracts`) and verify OpenAPI compliance.
- **Security Tests:** IDOR checks across workspace boundaries, path traversal prevention, CSRF verification, prompt injection bounds.
- **Reliability Tests:** Worker crash recovery, webhook deduplication, expired session handling, Helm rollback triggers.
