# API Contracts & Error Specifications

All API responses follow uniform JSON envelopes and include an `X-Request-ID` response header.

## 1. Standard Envelopes

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "requestId": "req_01hxyz...",
    "timestamp": "2026-10-23T18:00:00.000Z"
  }
}
```

### Paginated List Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 142,
    "page": 1,
    "limit": 20,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "meta": {
    "requestId": "req_01hxyz...",
    "timestamp": "2026-10-23T18:00:00.000Z"
  }
}
```

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Project with id proj_123 does not exist in workspace.",
    "details": []
  },
  "meta": {
    "requestId": "req_01hxyz...",
    "timestamp": "2026-10-23T18:00:00.000Z"
  }
}
```

### Standard Error Codes
- `UNAUTHORIZED` (401): Missing or expired session cookie.
- `FORBIDDEN` (403): User lacks required workspace or project role.
- `NOT_FOUND` (404): Resource not found or not visible to user.
- `VALIDATION_ERROR` (422): Zod request schema validation failed.
- `CONFLICT` (409): Unique constraint violation or state transition conflict.
- `RATE_LIMITED` (429): Workspace or IP exceeded rate quota.
- `INTERNAL_SERVER_ERROR` (500): Unhandled exception logged with trace ID.

---

## 2. Core Endpoints Summary

### Health & Meta
- `GET /health` -> `{ status: "ok", timestamp: ... }`
- `GET /health/ready` -> checks PostgreSQL and Redis connections

### Authentication
- `GET /api/auth/github` -> Redirects to GitHub OAuth with encrypted state & PKCE challenge.
- `GET /api/auth/github/callback?code=...&state=...` -> Exchanges code, verifies state, sets session cookie.
- `GET /api/auth/me` -> Current authenticated user & workspaces.
- `POST /api/auth/logout` -> Revokes current session & clears cookie.
- `POST /api/auth/logout-all` -> Revokes all active sessions for current user.

### Workspaces & Members
- `GET /api/workspaces` -> List workspaces user belongs to.
- `POST /api/workspaces` -> Create workspace.
- `GET /api/workspaces/:id/members` -> List members with roles.
- `POST /api/workspaces/:id/members` -> Invite member.

### GitHub Integration
- `GET /api/github/installations` -> List GitHub App installations for workspace.
- `GET /api/github/installations/:id/repositories` -> List repositories available via installation.
- `GET /api/github/installations/:id/repositories/:repoId/branches` -> List remote branches.
- `POST /api/github/webhooks` -> GitHub Webhook receiver (HMAC SHA-256 signature verified against raw body).

### Projects & Repository Analysis
- `GET /api/projects` -> List workspace projects.
- `POST /api/projects` -> Create new project.
- `POST /api/projects/:id/repositories` -> Attach repository to project.
- `POST /api/repositories/:id/analyze` -> Triggers async analysis (`202 Accepted` + `jobId`).
- `GET /api/analysis/:id` -> Poll analysis run status & progress.
- `GET /api/repositories/:id/routes` -> Extracted API routes.
- `GET /api/repositories/:id/graph` -> Architecture graph nodes & edges (React Flow compatible format).
- `GET /api/repositories/:id/files` -> Discovered file tree.

### AI Assistant & RAG
- `POST /api/projects/:id/chat` -> Send question, returns answer with file/line citations.
- `GET /api/projects/:id/conversations` -> List prior conversations.

### Infrastructure Generation
- `POST /api/projects/:id/artifacts/generate` -> Generates Dockerfile/Helm/K8s/CI specs (`202 Accepted`).
- `GET /api/artifacts/:id` -> Retrieve generated artifact diff & preview.
- `POST /api/artifacts/:id/validate` -> Lint and validate artifact syntax.
- `POST /api/artifacts/:id/approve` -> Approve and commit to GitHub repo.

### Builds & Deployments
- `POST /api/projects/:id/builds` -> Trigger container build & vulnerability scan (`202 Accepted`).
- `GET /api/projects/:id/builds` -> List project builds.
- `GET /api/builds/:id/logs` -> Build log stream.
- `POST /api/projects/:id/deployments` -> Request deployment (`202 Accepted`).
- `POST /api/deployments/:id/rollback` -> Rollback release to previous immutable image digest.
- `GET /api/projects/:id/health` -> Deployment rollout & Kubernetes pod health status.
