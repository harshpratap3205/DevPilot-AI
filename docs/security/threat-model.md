# Threat Model & Security Controls

## 1. STRIDE Analysis & Mitigations

| Threat Category | Potential Attack Vector | Platform Countermeasure |
|---|---|---|
| **Spoofing** | Forged GitHub webhook payloads | Raw HTTP body HMAC SHA-256 validation with GitHub webhook secret; replay defense via timestamp window. |
| **Tampering** | User modifies client-side project/workspace IDs to access another tenant's repo | Server-side session validation; all queries joined on authenticated `workspace_members`; PostgreSQL RLS. |
| **Repudiation** | An engineer deploys malicious image or changes RBAC without accountability | Structured `audit_events` written transactionally on every configuration mutation, deployment, and approval. |
| **Information Disclosure** | Secret tokens leak into application logs or LLM prompts | Automatic regex-based redaction middleware for API keys/tokens in Pino logger; ephemeral source file deletion. |
| **Denial of Service** | Archive decompression bomb (Zip bomb) or 100,000 file repo clone | Maximum archive size quota (50MB), uncompressed stream byte limiter, max file count cap (5,000 files). |
| **Elevation of Privilege** | Container escape during build or tests to compromise host Docker socket | Never mount host Docker socket; isolated workers run with unprivileged user, drop all capabilities, use gVisor sandbox. |

---

## 2. Ingestion & AST Parser Defenses
1. **No Code Execution:** Repository source files are parsed purely using AST parsers (`@babel/parser`, `ts-morph`, Python `ast.parse`). Dynamic scripts (`eval`, `npm install`, `setup.py`) are never invoked during analysis.
2. **Path Traversal & Symlinks:** All paths inside extracted tarballs are canonicalized. Symlinks pointing outside the extraction root or pointing to sensitive device paths (`/etc`, `/proc`, `/sys`) are immediately dropped.
3. **Prompt Injection Resistance:** Source code fed into the RAG model is treated as strictly untrusted user data. LLM system prompts explicitly instruct the model to ignore any instructions found inside user files or comments.
