export const AI_NAV = [
  { label: "Overview", to: "/ai", exact: true },
  { label: "AI Chat", to: "/ai/chat" },
  { label: "README", to: "/ai/readme" },
  { label: "Documentation", to: "/ai/docs" },
  { label: "Task Generator", to: "/ai/tasks" },
  { label: "Sprint Planner", to: "/ai/sprint" },
  { label: "Code Review", to: "/ai/review" },
  { label: "Release Notes", to: "/ai/release-notes" },
  { label: "Meeting Summary", to: "/ai/meeting" },
  { label: "Project Insights", to: "/ai/insights" },
  { label: "Prompt Library", to: "/ai/prompts" },
  { label: "History", to: "/ai/history" },
];

export const SUGGESTED_PROMPTS = [
  { title: "Generate a README", desc: "For my current project" },
  { title: "Create Sprint Tasks", desc: "Break down the next sprint goal" },
  { title: "Summarize Today's Progress", desc: "Team activity + commits" },
  { title: "Review this Architecture", desc: "Highlight risks and gaps" },
  { title: "Generate API Documentation", desc: "OpenAPI-style overview" },
];

export const SAMPLE_CHATS = [
  { id: "c1", title: "Sprint 12 planning", pinned: true, date: "Today" },
  { id: "c2", title: "Auth architecture review", pinned: true, date: "Today" },
  { id: "c3", title: "Foundry Web README", pinned: false, date: "Yesterday" },
  { id: "c4", title: "Payments module tasks", pinned: false, date: "Yesterday" },
  { id: "c5", title: "Design tokens audit", pinned: false, date: "This week" },
  { id: "c6", title: "Release notes v1.4", pinned: false, date: "Last week" },
];

export const PROMPT_CATEGORIES = [
  {
    name: "Development",
    prompts: [
      { title: "Refactor for readability", body: "Refactor the following code to improve readability while preserving behavior:\n\n<code>" },
      { title: "Add TypeScript types", body: "Add strict TypeScript types to this module and explain each generic:" },
    ],
  },
  {
    name: "Planning",
    prompts: [
      { title: "Break down epic", body: "Break down this epic into sprint-ready tasks with story points and dependencies." },
      { title: "Sprint retro", body: "Draft a sprint retrospective template with wins, misses, and action items." },
    ],
  },
  {
    name: "Documentation",
    prompts: [
      { title: "Generate README", body: "Generate a polished README for a project with the following details…" },
      { title: "API reference", body: "Turn this route file into an API reference with request/response examples." },
    ],
  },
  {
    name: "Testing",
    prompts: [
      { title: "Unit test suggestions", body: "Suggest a comprehensive Jest test suite for this function:" },
      { title: "Edge case matrix", body: "Enumerate edge cases and failure modes for this behavior:" },
    ],
  },
  {
    name: "Deployment",
    prompts: [
      { title: "CI/CD pipeline", body: "Draft a GitHub Actions workflow that builds, tests, and deploys to production." },
      { title: "Rollback plan", body: "Outline a safe rollback strategy for this release." },
    ],
  },
  {
    name: "Architecture",
    prompts: [
      { title: "Trade-off analysis", body: "Compare monolith vs. microservices for the following requirements." },
      { title: "ADR template", body: "Write an Architecture Decision Record for the following choice." },
    ],
  },
  {
    name: "Security",
    prompts: [
      { title: "Threat model", body: "Produce a STRIDE threat model for this feature." },
      { title: "Secrets audit", body: "Audit this repo for accidentally committed secrets." },
    ],
  },
  {
    name: "DevOps",
    prompts: [
      { title: "Dockerize service", body: "Write a production-grade Dockerfile for this Node service." },
      { title: "Observability plan", body: "Design a logs/metrics/traces plan for this stack." },
    ],
  },
  {
    name: "Bug Fixes",
    prompts: [
      { title: "Root cause analysis", body: "Given this stack trace, propose the most likely root causes." },
      { title: "Repro steps", body: "Turn this bug description into precise reproduction steps." },
    ],
  },
  {
    name: "Product Management",
    prompts: [
      { title: "PRD outline", body: "Draft a PRD outline for the following feature idea." },
      { title: "User story split", body: "Split this vague requirement into INVEST user stories." },
    ],
  },
];

export const AI_HISTORY = [
  { id: "h1", title: "README for Foundry Web", type: "README", date: "2h ago", status: "completed", favorite: true },
  { id: "h2", title: "Sprint 12 breakdown", type: "Tasks", date: "5h ago", status: "completed", favorite: true },
  { id: "h3", title: "Auth flow architecture review", type: "Review", date: "Yesterday", status: "completed", favorite: false },
  { id: "h4", title: "Standup summary — Nov 8", type: "Meeting", date: "Yesterday", status: "completed", favorite: false },
  { id: "h5", title: "API docs — Billing", type: "Docs", date: "2 days ago", status: "draft", favorite: false },
  { id: "h6", title: "Release notes v1.4", type: "Release", date: "3 days ago", status: "completed", favorite: true },
  { id: "h7", title: "Sprint 11 risks", type: "Sprint", date: "5 days ago", status: "archived", favorite: false },
];

export const SMART_SUGGESTIONS = [
  { title: "Your sprint looks overloaded", desc: "Sprint 12 is at 112% capacity — consider moving 3 tasks.", tone: "warning" },
  { title: "Documentation is outdated", desc: "Auth module docs haven't been updated in 47 days.", tone: "warning" },
  { title: "Three tasks are blocked", desc: "Two depend on API v2 which shipped yesterday.", tone: "destructive" },
  { title: "This project has no README", desc: "Generate one from your current codebase.", tone: "primary" },
];

export function fakeReadme(name: string, desc: string, features: string, tech: string) {
  return `# ${name || "My Project"}

${desc || "A modern application built with best-in-class tooling."}

## ✨ Features

${(features || "- Fast and delightful UX\n- Realtime collaboration\n- Enterprise-ready security").split("\n").map((l) => (l.startsWith("-") ? l : `- ${l}`)).join("\n")}

## 🚀 Installation

\`\`\`bash
git clone https://github.com/your-org/${(name || "my-project").toLowerCase().replace(/\s+/g, "-")}.git
cd ${(name || "my-project").toLowerCase().replace(/\s+/g, "-")}
npm install
npm run dev
\`\`\`

## 🧠 Usage

Run the development server and open http://localhost:3000. Sign in with your workspace credentials to explore the dashboard.

## 🛠 Tech Stack

${tech || "React, TypeScript, Tailwind CSS, Framer Motion"}

## 📄 License

MIT — Built with Foundry.`;
}
