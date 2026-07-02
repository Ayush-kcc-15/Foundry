// Placeholder data for Foundry docs / knowledge hub
import type { LucideIcon } from "lucide-react";
import {
  Book, Code2, FileText, Rocket, Users, FlaskConical, GitBranch,
  Cog, Lightbulb, Layers, ShieldAlert, Bug, ClipboardList, Wrench,
} from "lucide-react";

export type DocTag =
  | "API" | "Frontend" | "Backend" | "Security" | "Deployment"
  | "AI" | "Research" | "Planning" | "Testing" | "Database"
  | "Urgent" | "Architecture";

export type DocCategory =
  | "Engineering" | "Planning" | "Research" | "Meeting Notes"
  | "Architecture" | "Product" | "Testing" | "Deployment" | "Operations";

export interface DocVersion {
  id: string;
  version: string;
  author: string;
  initials: string;
  date: string;
  summary: string;
}

export interface DocComment {
  id: string;
  author: string;
  initials: string;
  time: string;
  text: string;
  resolved?: boolean;
  replies?: { author: string; initials: string; time: string; text: string }[];
}

export interface DocActivity {
  id: string;
  kind: "created" | "edited" | "comment" | "shared" | "published" | "restored";
  actor: string;
  initials: string;
  time: string;
  detail?: string;
}

export interface DocNode {
  id: string;
  parentId: string | null;
  title: string;
  icon?: LucideIcon;
  emoji?: string;
  kind: "folder" | "doc";
  tags?: DocTag[];
  category?: DocCategory;
  author?: string;
  initials?: string;
  updatedAt?: string;
  words?: number;
  favorite?: boolean;
  pinned?: boolean;
  shared?: boolean;
  content?: string; // HTML for TipTap
  markdown?: string;
  versions?: DocVersion[];
  comments?: DocComment[];
  activity?: DocActivity[];
}

export const DOC_TAG_META: Record<DocTag, string> = {
  API: "bg-primary/15 text-primary border-primary/25",
  Frontend: "bg-info/15 text-info border-info/25",
  Backend: "bg-accent/15 text-accent border-accent/25",
  Security: "bg-destructive/15 text-destructive border-destructive/25",
  Deployment: "bg-success/15 text-success border-success/25",
  AI: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25",
  Research: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  Planning: "bg-warning/15 text-warning border-warning/25",
  Testing: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  Database: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
  Urgent: "bg-red-500/15 text-red-300 border-red-500/25",
  Architecture: "bg-violet-500/15 text-violet-300 border-violet-500/25",
};

const readmeHtml = `
<h1>Foundry Web Platform</h1>
<p>The <strong>Foundry</strong> platform is a modern developer workspace for planning, shipping and documenting software. This README is the entry point for engineers joining the project.</p>
<h2>Quick start</h2>
<ol><li>Clone the repo</li><li>Install dependencies with <code>bun install</code></li><li>Run <code>bun dev</code></li></ol>
<h2>Architecture</h2>
<p>Foundry follows a modular monolith pattern. Every domain lives in its own package with its own tests and documentation.</p>
<blockquote>Consistency &gt; cleverness. Optimize for a new engineer joining next quarter.</blockquote>
<h3>Code style</h3>
<ul><li>Prettier for formatting</li><li>ESLint with the shared config</li><li>Conventional commits</li></ul>
<pre><code class="language-ts">export function greet(name: string) {
  return \`Hello, \${name}!\`;
}</code></pre>
`;

const apiHtml = `
<h1>API Reference</h1>
<p>Foundry exposes a REST API. All endpoints require a bearer token.</p>
<h2>Authentication</h2>
<pre><code class="language-bash">curl https://api.foundry.dev/v1/me \\
  -H "Authorization: Bearer $TOKEN"</code></pre>
<h2>Endpoints</h2>
<ul><li><code>GET /v1/projects</code> — list projects</li><li><code>POST /v1/tasks</code> — create a task</li><li><code>GET /v1/docs/:id</code> — fetch a document</li></ul>
`;

const sprintHtml = `
<h1>Sprint 12 planning</h1>
<p>Two-week sprint from <strong>Mar 04 – Mar 18</strong>. Focus: onboarding polish and doc search.</p>
<h2>Goals</h2>
<ul data-type="taskList">
  <li data-checked="true">Ship onboarding checklist</li>
  <li data-checked="true">Redesign template gallery</li>
  <li data-checked="false">Wire document search backend</li>
  <li data-checked="false">Version history compare view</li>
</ul>
<h2>Risks</h2>
<p>Search infra depends on the new indexer team — worth a sync mid-sprint.</p>
`;

const adrHtml = `
<h1>ADR-014: Switch to Postgres full-text search</h1>
<h2>Status</h2><p>Accepted</p>
<h2>Context</h2>
<p>We prototyped Meilisearch, but running an extra service raised our infra cost and complexity. Postgres FTS covers the near-term needs.</p>
<h2>Decision</h2>
<p>Use Postgres <code>tsvector</code> for document search until we exceed 5M docs or need semantic ranking.</p>
<h2>Consequences</h2>
<ul><li>+ One less service to operate</li><li>+ Transactional consistency with content</li><li>− Weaker ranking than dedicated search</li></ul>
`;

const meetingHtml = `
<h1>Design review — Docs editor</h1>
<p><em>Feb 27 · Attendees: Lena, Sara, Marcus, Ayush</em></p>
<h2>Notes</h2>
<ul><li>Slash menu should mirror Linear's density</li><li>Split view is the killer feature for engineers</li><li>Version compare is a P1 for platform team</li></ul>
<h2>Action items</h2>
<ul data-type="taskList">
  <li data-checked="false">Lena — final tokens for callouts</li>
  <li data-checked="false">Sara — spike TipTap collab</li>
  <li data-checked="true">Ayush — write ADR-014</li>
</ul>
`;

const releaseHtml = `
<h1>Release 2.4</h1>
<h2>✨ Highlights</h2>
<ul><li>New documentation workspace</li><li>Command palette with fuzzy search</li><li>Sprint calendar view</li></ul>
<h2>🐛 Fixes</h2>
<ul><li>Kanban drag on Safari</li><li>Notification badge stuck at 99+</li></ul>
`;

const V = (n: string, a: string, i: string, d: string, s: string): DocVersion => ({
  id: `v-${n}-${a}`, version: n, author: a, initials: i, date: d, summary: s,
});

const commonVersions: DocVersion[] = [
  V("1.4", "Ayush Kumar", "AY", "2h ago", "Refined intro paragraph and added quick-start section."),
  V("1.3", "Sara Menon", "SM", "Yesterday", "Reworked architecture section with new diagram references."),
  V("1.2", "Lena Kohl", "LK", "3 days ago", "Copy edits and consistent voice pass."),
  V("1.1", "Ayush Kumar", "AY", "1 week ago", "Initial expansion beyond stub."),
  V("1.0", "Ayush Kumar", "AY", "2 weeks ago", "Document created."),
];

const commonComments: DocComment[] = [
  {
    id: "c1", author: "Sara Menon", initials: "SM", time: "1h ago",
    text: "Should we call out the migration path from v1 endpoints here?",
    replies: [{ author: "Ayush Kumar", initials: "AY", time: "58m ago", text: "Good call — I'll add a subsection." }],
  },
  { id: "c2", author: "Marcus Jung", initials: "MJ", time: "Yesterday", text: "Love the tone. Small nit: 'workspace' vs 'space' — pick one.", resolved: true },
];

const commonActivity: DocActivity[] = [
  { id: "a1", kind: "edited", actor: "Ayush Kumar", initials: "AY", time: "2h ago", detail: "Updated intro" },
  { id: "a2", kind: "comment", actor: "Sara Menon", initials: "SM", time: "1h ago", detail: "Left a comment" },
  { id: "a3", kind: "shared", actor: "Ayush Kumar", initials: "AY", time: "Yesterday", detail: "Shared with #platform" },
  { id: "a4", kind: "published", actor: "Ayush Kumar", initials: "AY", time: "3 days ago", detail: "Published v1.3" },
  { id: "a5", kind: "created", actor: "Ayush Kumar", initials: "AY", time: "2 weeks ago" },
];

export const DOC_NODES: DocNode[] = [
  { id: "f-eng", parentId: null, title: "Engineering", kind: "folder", emoji: "⚙️" },
  { id: "f-api", parentId: "f-eng", title: "API", kind: "folder", emoji: "🔌" },
  { id: "f-arch", parentId: "f-eng", title: "Architecture", kind: "folder", emoji: "🏛️" },
  { id: "f-product", parentId: null, title: "Product", kind: "folder", emoji: "📦" },
  { id: "f-meetings", parentId: null, title: "Meeting Notes", kind: "folder", emoji: "🗓️" },
  { id: "f-releases", parentId: null, title: "Release Notes", kind: "folder", emoji: "🚀" },

  {
    id: "d-readme", parentId: null, title: "README", kind: "doc", icon: Book,
    tags: ["Frontend", "Backend"], category: "Engineering",
    author: "Ayush Kumar", initials: "AY", updatedAt: "2h ago", words: 480,
    pinned: true, favorite: true, shared: true,
    content: readmeHtml, versions: commonVersions, comments: commonComments, activity: commonActivity,
  },
  {
    id: "d-api", parentId: "f-api", title: "REST API reference", kind: "doc", icon: Code2,
    tags: ["API", "Backend"], category: "Engineering",
    author: "Sara Menon", initials: "SM", updatedAt: "Yesterday", words: 1240,
    pinned: true, favorite: true,
    content: apiHtml, versions: commonVersions, comments: commonComments, activity: commonActivity,
  },
  {
    id: "d-adr", parentId: "f-arch", title: "ADR-014 · Postgres FTS", kind: "doc", icon: Layers,
    tags: ["Architecture", "Database"], category: "Architecture",
    author: "Ayush Kumar", initials: "AY", updatedAt: "3 days ago", words: 320,
    favorite: false,
    content: adrHtml, versions: commonVersions.slice(0, 3), comments: [], activity: commonActivity.slice(0, 3),
  },
  {
    id: "d-sprint", parentId: "f-product", title: "Sprint 12 planning", kind: "doc", icon: ClipboardList,
    tags: ["Planning"], category: "Planning",
    author: "Marcus Jung", initials: "MJ", updatedAt: "5h ago", words: 210,
    favorite: true,
    content: sprintHtml, versions: commonVersions.slice(0, 4), comments: commonComments.slice(0, 1), activity: commonActivity,
  },
  {
    id: "d-meeting", parentId: "f-meetings", title: "Design review — Docs editor", kind: "doc", icon: Users,
    tags: ["Planning", "Frontend"], category: "Meeting Notes",
    author: "Lena Kohl", initials: "LK", updatedAt: "Yesterday", words: 180,
    content: meetingHtml, versions: commonVersions.slice(0, 2), comments: [], activity: commonActivity.slice(0, 3),
  },
  {
    id: "d-release", parentId: "f-releases", title: "Release 2.4 notes", kind: "doc", icon: Rocket,
    tags: ["Deployment"], category: "Deployment",
    author: "Ayush Kumar", initials: "AY", updatedAt: "1 week ago", words: 140,
    shared: true,
    content: releaseHtml, versions: commonVersions.slice(0, 3), comments: [], activity: commonActivity,
  },
  {
    id: "d-security", parentId: "f-eng", title: "Security review checklist", kind: "doc", icon: ShieldAlert,
    tags: ["Security", "Urgent"], category: "Engineering",
    author: "Sara Menon", initials: "SM", updatedAt: "2 days ago", words: 90,
    content: `<h1>Security review checklist</h1><ul data-type="taskList"><li data-checked="true">Threat model reviewed</li><li data-checked="false">Pen-test scheduled</li><li data-checked="false">Secrets rotated</li></ul>`,
    versions: commonVersions.slice(0, 2), comments: [], activity: commonActivity.slice(0, 2),
  },
];

export interface DocTemplate {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string; // gradient classes
  category: DocCategory;
  content: string;
}

export const DOC_TEMPLATES: DocTemplate[] = [
  { id: "t-readme", title: "README", description: "Project intro, quick start, and contribution guide.", icon: Book, color: "from-primary/40 to-accent/30", category: "Engineering",
    content: `<h1>Project name</h1><p>One-liner describing the project.</p><h2>Quick start</h2><ol><li>Install</li><li>Configure</li><li>Run</li></ol><h2>Contributing</h2><p>How to file issues and open PRs.</p>` },
  { id: "t-api", title: "API Documentation", description: "Endpoint reference with examples.", icon: Code2, color: "from-info/40 to-primary/30", category: "Engineering",
    content: `<h1>API</h1><h2>Auth</h2><pre><code>Bearer token</code></pre><h2>Endpoints</h2><ul><li><code>GET /resource</code></li></ul>` },
  { id: "t-sprint", title: "Sprint Planning", description: "Goals, capacity, and commitments.", icon: ClipboardList, color: "from-warning/40 to-accent/30", category: "Planning",
    content: `<h1>Sprint N planning</h1><h2>Goals</h2><ul data-type="taskList"><li data-checked="false">Goal one</li></ul><h2>Capacity</h2><p>Team hours available.</p>` },
  { id: "t-meeting", title: "Meeting Notes", description: "Attendees, notes, action items.", icon: Users, color: "from-accent/40 to-info/30", category: "Meeting Notes",
    content: `<h1>Meeting title</h1><p><em>Date · Attendees</em></p><h2>Notes</h2><ul><li></li></ul><h2>Action items</h2><ul data-type="taskList"><li data-checked="false">Owner — task</li></ul>` },
  { id: "t-design", title: "Design Document", description: "Problem, options, chosen direction.", icon: Lightbulb, color: "from-fuchsia-500/40 to-primary/30", category: "Product",
    content: `<h1>Design doc</h1><h2>Problem</h2><h2>Options considered</h2><h2>Chosen direction</h2><h2>Risks</h2>` },
  { id: "t-adr", title: "Architecture Decision Record", description: "Context, decision, consequences.", icon: Layers, color: "from-violet-500/40 to-info/30", category: "Architecture",
    content: `<h1>ADR-XXX: Title</h1><h2>Status</h2><p>Proposed</p><h2>Context</h2><h2>Decision</h2><h2>Consequences</h2>` },
  { id: "t-bug", title: "Bug Report", description: "Reproduction, expected, actual.", icon: Bug, color: "from-destructive/40 to-warning/30", category: "Testing",
    content: `<h1>Bug title</h1><h2>Steps to reproduce</h2><ol><li></li></ol><h2>Expected</h2><h2>Actual</h2><h2>Environment</h2>` },
  { id: "t-feature", title: "Feature Proposal", description: "Problem statement, solution, success.", icon: Rocket, color: "from-primary/40 to-success/30", category: "Product",
    content: `<h1>Feature proposal</h1><h2>Problem</h2><h2>Proposed solution</h2><h2>Success metrics</h2>` },
  { id: "t-deploy", title: "Deployment Guide", description: "Runbook for shipping a release.", icon: Wrench, color: "from-success/40 to-info/30", category: "Deployment",
    content: `<h1>Deployment</h1><h2>Preflight</h2><ul data-type="taskList"><li data-checked="false">CI green</li></ul><h2>Rollout</h2><h2>Rollback</h2>` },
  { id: "t-release", title: "Release Notes", description: "Highlights, fixes, breaking changes.", icon: FileText, color: "from-accent/40 to-primary/30", category: "Deployment",
    content: `<h1>Release X.Y</h1><h2>Highlights</h2><h2>Fixes</h2><h2>Breaking changes</h2>` },
];

export const ALL_TAGS: DocTag[] = [
  "API", "Frontend", "Backend", "Security", "Deployment", "AI",
  "Research", "Planning", "Testing", "Database", "Urgent", "Architecture",
];

export const CATEGORY_ICONS: Record<DocCategory, LucideIcon> = {
  Engineering: Cog, Planning: ClipboardList, Research: FlaskConical,
  "Meeting Notes": Users, Architecture: Layers, Product: Rocket,
  Testing: Bug, Deployment: GitBranch, Operations: Wrench,
};

export function buildTree(nodes: DocNode[]) {
  const map = new Map<string | null, DocNode[]>();
  for (const n of nodes) {
    const arr = map.get(n.parentId) ?? [];
    arr.push(n);
    map.set(n.parentId, arr);
  }
  return map;
}

export function readingTime(words = 0) {
  return Math.max(1, Math.round(words / 220));
}
