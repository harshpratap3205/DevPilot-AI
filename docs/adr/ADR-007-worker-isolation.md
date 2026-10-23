# ADR-007: Isolated Ephemeral Workers for Build & Test Execution

## Status
Accepted

## Context
Building user container images, compiling untrusted third-party code, and running tests expose the host environment to container breakout attacks, arbitrary code execution, cryptocurrency mining, and network scanning of internal cloud services.

## Decision
1. Never mount the host Docker socket (`/var/run/docker.sock`) into build containers.
2. Build jobs run in isolated, single-use, ephemeral worker instances or containers leveraging rootless BuildKit / Kaniko and sandboxed runtimes (gVisor or Kata Containers).
3. Strict cgroup resource limits (CPU, memory, disk I/O, max PIDs) and restricted egress network policies are enforced.
4. Workers are torn down and wiped immediately after artifact extraction.
