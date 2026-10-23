# ADR-009: Database-Backed Server Sessions with Anti-CSRF Protections

## Status
Accepted

## Context
Stateless JWTs stored in browser `localStorage` are vulnerable to XSS exfiltration, cannot be instantly revoked upon security incidents (or logout all sessions), and lack fine-grained device management. Pure memory sessions do not survive server restarts or scale across multiple API replicas.

## Decision
1. We use server-side sessions stored in PostgreSQL (with optional Redis caching for read hot paths).
2. The session identifier is a cryptographically secure random token (256-bit entropy). Only the SHA-256 hash of this token (`token_hash`) is stored in the database.
3. The raw session token is transmitted to the browser in a `__Host-session` cookie configured with:
   - `HttpOnly: true` (inaccessible to JavaScript)
   - `Secure: true` (HTTPS only)
   - `SameSite: Lax`
   - `Path: /`
4. State-mutating requests (`POST`, `PUT`, `PATCH`, `DELETE`) require an anti-CSRF token validated via Double Submit Cookie or custom header (`X-CSRF-Token`).
5. Sessions support instantaneous revocation (`revoked_at` timestamp) and global session revocation (`POST /api/auth/logout-all`).
