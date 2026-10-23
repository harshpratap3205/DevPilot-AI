# State Machines & Distributed Retries

All long-running asynchronous workflows in DevPilot AI are governed by strict finite state machines. Invalid transitions fail fast and are rejected.

## 1. Repository Import & Ingest FSM

```mermaid
stateDiagram-v2
  [*] --> QUEUED : Enqueue job
  QUEUED --> FETCHING : Worker picks up job
  FETCHING --> SCANNING : Safe tarball downloaded
  SCANNING --> PARSING : Files inventory validated
  PARSING --> COMPLETED : AST & graph persisted

  QUEUED --> CANCELLED : User cancellation
  FETCHING --> FAILED : Network timeout / GitHub 4xx
  SCANNING --> FAILED : Archive size exceeded / Path traversal
  PARSING --> FAILED : Parser crash / Malformed syntax

  FAILED --> QUEUED : Retry under max attempts
```

### Valid Transition Matrix
| Current State | Next Permitted States |
|---|---|
| `QUEUED` | `FETCHING`, `CANCELLED` |
| `FETCHING` | `SCANNING`, `FAILED`, `CANCELLED` |
| `SCANNING` | `PARSING`, `FAILED`, `CANCELLED` |
| `PARSING` | `COMPLETED`, `FAILED`, `CANCELLED` |
| `FAILED` | `QUEUED` (Manual or exponential backoff retry) |
| `COMPLETED` | Terminal state |
| `CANCELLED` | Terminal state |

---

## 2. Container Build & Security Scan FSM

```mermaid
stateDiagram-v2
  [*] --> QUEUED : Build requested
  QUEUED --> PREPARING : Ephemeral worker allocated
  PREPARING --> TESTING : Static checks & tests run
  TESTING --> BUILDING : Unit tests pass
  BUILDING --> SCANNING : Image digest generated
  SCANNING --> SUCCEEDED : Trivy/Semgrep pass policy

  QUEUED --> CANCELLED : User cancels
  TESTING --> FAILED : Test suite failure
  BUILDING --> FAILED : Build failure
  SCANNING --> FAILED : Critical CVE policy violation
```

---

## 3. Deployment Orchestration FSM

```mermaid
stateDiagram-v2
  [*] --> PENDING_APPROVAL : Deploy triggered
  PENDING_APPROVAL --> QUEUED : Admin signs off
  PENDING_APPROVAL --> REJECTED : Admin rejects
  QUEUED --> DEPLOYING : Deploy controller initiates
  DEPLOYING --> VERIFYING : Helm upgrade triggered
  VERIFYING --> HEALTHY : Pod probes report 200 OK
  VERIFYING --> FAILED : Timeout / CrashLoopBackOff
  FAILED --> ROLLED_BACK : Auto or manual rollback executed
```

---

## 4. Idempotency & Retry Rules
1. **Idempotency Keys:** Every job dispatch generates an idempotency key derived from `workspace_id + action + target_resource_id + commit_sha`.
2. **Exponential Backoff:** Retried tasks utilize exponential jitter: $t_{wait} = \min(t_{max}, 2^{attempt} \times base + \text{jitter})$.
3. **Dead Letter Queue (DLQ):** After 3 failed attempts, jobs are marked `FAILED` with explicit `error_code` and dumped into the DLQ for operator inspection.
