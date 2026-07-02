import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Server, Layers, Rocket, Database, Package, Wrench, ClipboardList } from "lucide-react";
import { AIPageHeader, GenerateButton, CopyButton, AISkeleton, MarkdownBlock, Field, textareaCls } from "@/components/ai/shared";

export const Route = createFileRoute("/_authenticated/ai/docs")({
  component: DocsGenerator,
  head: () => ({ meta: [{ title: "Documentation Generator — Foundry" }] }),
});

const TYPES = [
  { key: "api", label: "API Docs", icon: Server },
  { key: "tech", label: "Technical", icon: Wrench },
  { key: "arch", label: "Architecture", icon: Layers },
  { key: "setup", label: "Setup Guide", icon: Package },
  { key: "deploy", label: "Deployment", icon: Rocket },
  { key: "db", label: "Database", icon: Database },
  { key: "feature", label: "Feature", icon: ClipboardList },
];

const SAMPLES: Record<string, string> = {
  api: `# API Reference\n\n## Authentication\nAll endpoints require a bearer token in the \`Authorization\` header.\n\n## GET /projects\nReturns a paginated list of projects for the current workspace.\n\n**Query params**\n- \`limit\` (int, default 20)\n- \`cursor\` (string, optional)\n\n**Response 200**\n\`\`\`json\n{ "items": [], "nextCursor": null }\n\`\`\`\n\n## POST /projects\nCreates a new project.`,
  tech: `# Technical Documentation\n\n## Overview\nFoundry is composed of a React frontend, a REST + WebSocket API, and a Postgres data layer.\n\n## Modules\n- **auth** — JWT sessions, refresh rotation, MFA\n- **projects** — CRUD, filters, favorites\n- **tasks** — Kanban, dependencies, estimates`,
  arch: `# Architecture\n\n## High-level\nClient <-> Edge (CDN + WAF) <-> API Gateway <-> Services <-> Postgres / Redis / Object Storage.\n\n## Decision log\n- Chose Postgres for OLTP, ClickHouse for analytics.\n- Chose Cloudflare Workers for edge personalization.`,
  setup: `# Setup Guide\n\n1. Clone the repo\n2. Copy \`.env.example\` to \`.env\`\n3. \`npm install\`\n4. \`npm run dev\`\n5. Visit http://localhost:3000`,
  deploy: `# Deployment\n\n## Environments\n- **preview** — every PR, ephemeral\n- **staging** — main branch\n- **production** — tagged release\n\n## Rollout\nBlue/green with automated smoke tests.`,
  db: `# Database Schema\n\n## users\n- id (uuid, pk)\n- email (text, unique)\n- created_at (timestamptz)\n\n## projects\n- id (uuid, pk)\n- workspace_id (uuid, fk)\n- name (text)`,
  feature: `# Feature Documentation\n\n## Overview\nDescribes the goals, UX, and technical notes for the feature.\n\n## User stories\n- As a developer, I want to…\n\n## Edge cases\n- Empty states, permission denials, large datasets.`,
};

function DocsGenerator() {
  const [type, setType] = useState("api");
  const [ctx, setCtx] = useState("Foundry SaaS — developer workspace");
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setOut(null);
    setTimeout(() => {
      setOut(SAMPLES[type] + `\n\n---\n_Generated for: ${ctx}_`);
      setLoading(false);
    }, 900);
  };

  return (
    <>
      <AIPageHeader
        icon={BookOpen}
        title="Documentation Generator"
        description="Generate polished technical documentation across 7 categories."
      />
      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="rounded-2xl glass-strong p-4 space-y-3">
          <div className="text-xs font-medium text-muted-foreground">Document type</div>
          <div className="grid grid-cols-2 gap-2">
            {TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`flex flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition ${
                  type === t.key ? "border-primary/50 bg-primary/10" : "border-border/60 bg-surface/40 hover:border-primary/30"
                }`}
              >
                <t.icon className={`h-4 w-4 ${type === t.key ? "text-highlight" : "text-muted-foreground"}`} />
                <span className="text-xs font-medium">{t.label}</span>
              </button>
            ))}
          </div>
          <Field label="Context / scope">
            <textarea className={textareaCls} value={ctx} onChange={(e) => setCtx(e.target.value)} />
          </Field>
          <GenerateButton onClick={generate} loading={loading}>Generate document</GenerateButton>
        </div>

        <div className="rounded-2xl glass-strong p-5 min-h-[400px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-sm font-semibold">{TYPES.find((t) => t.key === type)?.label} preview</div>
            {out && <div className="ml-auto"><CopyButton text={out} /></div>}
          </div>
          {loading && <AISkeleton lines={12} />}
          {!loading && !out && <div className="grid place-items-center h-64 text-sm text-muted-foreground">Choose a type and generate.</div>}
          {out && <MarkdownBlock>{out}</MarkdownBlock>}
        </div>
      </div>
    </>
  );
}
