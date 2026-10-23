"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldCheck, Database, GitBranch, Cpu, ArrowRight } from "lucide-react";

interface HealthState {
  api: boolean;
  aiService: boolean;
  checked: boolean;
}

export default function Home() {
  const [health, setHealth] = useState<HealthState>({
    api: false,
    aiService: false,
    checked: false,
  });

  useEffect(() => {
    async function checkHealth() {
      let apiOk = false;
      let aiOk = false;

      try {
        const res = await fetch("http://localhost:4000/health");
        if (res.ok) apiOk = true;
      } catch {
        apiOk = false;
      }

      try {
        const res = await fetch("http://localhost:8000/health");
        if (res.ok) aiOk = true;
      } catch {
        aiOk = false;
      }

      setHealth({ api: apiOk, aiService: aiOk, checked: true });
    }

    checkHealth();
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-between p-8 md:p-16 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-800 pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">
            DP
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">DevPilot AI</h1>
            <p className="text-xs text-gray-400">Developer Platform & DevOps Intelligence</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <div className="flex items-center space-x-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full">
            <span
              className={`w-2 h-2 rounded-full ${
                health.checked ? (health.api ? "bg-emerald-500" : "bg-rose-500") : "bg-amber-500 animate-pulse"
              }`}
            />
            <span>Core API: {health.checked ? (health.api ? "Online (4000)" : "Offline") : "Checking..."}</span>
          </div>

          <div className="flex items-center space-x-2 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-full">
            <span
              className={`w-2 h-2 rounded-full ${
                health.checked ? (health.aiService ? "bg-emerald-500" : "bg-rose-500") : "bg-amber-500 animate-pulse"
              }`}
            />
            <span>AI Service: {health.checked ? (health.aiService ? "Online (8000)" : "Offline") : "Checking..."}</span>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <section className="my-16 space-y-6">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs font-medium">
          <span>Phase 00 Foundation Deployed</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
          AI-Powered Software Engineering & Cloud Deployment Automation
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">
          Connect your GitHub repositories, extract AST route graphs, query your codebase with cited RAG, synthesize verified infrastructure, and manage Kubernetes rollouts.
        </p>

        <div className="pt-4 flex flex-wrap gap-4">
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/30">
            <span>Get Started with GitHub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="http://localhost:4000/health"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 font-medium px-6 py-3 rounded-xl transition"
          >
            <span>API Health Check</span>
          </a>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
        <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <GitBranch className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-white">Repository Intelligence</h3>
          <p className="text-sm text-gray-400">
            Static AST parsing for Express, Next.js, and FastAPI. Zero host code execution.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-white">Grounded RAG Assistant</h3>
          <p className="text-sm text-gray-400">
            Hybrid vector search via pgvector and full-text index with line-level file citations.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-white">Infra as Code Synthesis</h3>
          <p className="text-sm text-gray-400">
            Deterministic multi-stage Dockerfiles, Kubernetes manifests, Helm charts & CI/CD workflows.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800/80 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-white">Security & Rollouts</h3>
          <p className="text-sm text-gray-400">
            Ephemeral build isolation, Trivy/Semgrep scans, Helm rollout verification, and automated rollback.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 pt-6 text-xs text-gray-500 flex justify-between">
        <span>DevPilot AI &copy; 2026. Built with Antigravity.</span>
        <span>Version 0.1.0 (Phase 00)</span>
      </footer>
    </main>
  );
}
