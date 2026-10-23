# ADR-008: OpenTelemetry Instrumentation and Structured Logging from Phase 0

## Status
Accepted

## Context
Diagnosing distributed failures across API endpoints, BullMQ workers, Python AI retrievals, and Kubernetes deployments becomes intractable without unified telemetry. Retrofitting tracing and structured logging into an existing distributed codebase is costly and prone to missed spans.

## Decision
From Phase 0 onward:
1. Every incoming HTTP request is assigned a unique `X-Request-ID` and OpenTelemetry `traceparent`.
2. All log messages are emitted as structured JSON (using Pino in Node.js and Loguru/structlog in Python) containing `traceId`, `spanId`, `workspaceId`, `requestId`, and timestamp.
3. Trace context is propagated through BullMQ job metadata to workers and via HTTP headers to downstream internal services.
4. Sensitive values (tokens, credentials, repository secrets) are scrubbed via automatic redaction filters before log serialization.
