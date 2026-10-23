# ADR-003: GitHub OAuth for Identity and GitHub App for Scoped Access

## Status
Accepted

## Context
Developers require simple sign-in with GitHub. However, using a single GitHub OAuth application to request broad read/write repository scopes creates a massive security risk: users would have to grant global access to their entire GitHub account just to analyze a single repository.

## Decision
We decouple user identity from repository access:
1. **GitHub OAuth App:** Used exclusively for user identity (`read:user`, `user:email`), generating user accounts and server sessions.
2. **GitHub App Installation:** Used for fine-grained repository permissions (read-only Contents and Metadata). Users explicitly choose which repositories (public or private) to grant DevPilot AI access to during the installation flow.
3. Access tokens for repositories are acquired dynamically as short-lived installation tokens (valid for 1 hour) and are never stored long-term in the database.

## Consequences
- Least privilege model aligned with GitHub security best practices.
- Zero persistent master credentials for customer code.
- Organization and personal account installations are managed cleanly.
