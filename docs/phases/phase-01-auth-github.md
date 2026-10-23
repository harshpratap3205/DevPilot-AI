# Phase 01 — Authentication & GitHub Integration

## Scope
- GitHub OAuth Authorization Code flow with state validation and PKCE.
- Database-backed server-side sessions with SHA-256 token hashing and `__Host-` Secure HttpOnly cookies.
- First login user provisioning and stable GitHub account linking (`oauth_accounts`).
- Default workspace creation on onboarding.
- GitHub App installation flow for least-privilege repository permissions.
- Verified GitHub App webhooks (HMAC SHA-256 signature verification).
- Workspace-authorized listing of available public and private repositories.
- Branch listing and resolution to immutable Git commit SHA.
- IDOR defense tests, revoked installation handling, state mismatch error tests.
