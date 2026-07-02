// Mock data for dashboard placeholder surfaces.
export const productivityData = [
  { day: "Mon", value: 42, prev: 30 },
  { day: "Tue", value: 58, prev: 44 },
  { day: "Wed", value: 51, prev: 48 },
  { day: "Thu", value: 71, prev: 55 },
  { day: "Fri", value: 66, prev: 60 },
  { day: "Sat", value: 38, prev: 34 },
  { day: "Sun", value: 47, prev: 40 },
];

export const taskStatusData = [
  { name: "Done", value: 48, color: "oklch(0.72 0.14 180)" },
  { name: "In progress", value: 24, color: "oklch(0.78 0.16 75)" },
  { name: "In review", value: 14, color: "oklch(0.85 0.12 178)" },
  { name: "Backlog", value: 18, color: "oklch(0.45 0.03 215)" },
];

export const weeklyProgressData = [
  { week: "W1", planned: 32, shipped: 28 },
  { week: "W2", planned: 40, shipped: 34 },
  { week: "W3", planned: 36, shipped: 36 },
  { week: "W4", planned: 44, shipped: 41 },
  { week: "W5", planned: 48, shipped: 45 },
  { week: "W6", planned: 52, shipped: 50 },
];

export const teamActivityData = [
  { hour: "9a", commits: 4, reviews: 2 },
  { hour: "10a", commits: 8, reviews: 3 },
  { hour: "11a", commits: 12, reviews: 5 },
  { hour: "12p", commits: 6, reviews: 4 },
  { hour: "1p", commits: 3, reviews: 2 },
  { hour: "2p", commits: 11, reviews: 6 },
  { hour: "3p", commits: 14, reviews: 8 },
  { hour: "4p", commits: 9, reviews: 5 },
  { hour: "5p", commits: 5, reviews: 3 },
];

export const projects = [
  {
    id: "1",
    name: "Foundry Web Platform",
    icon: "F",
    status: "On track",
    progress: 72,
    due: "Dec 12",
    tags: ["React", "TanStack", "TS"],
    team: ["A", "B", "C", "D"],
  },
  {
    id: "2",
    name: "AI Assistant v2",
    icon: "AI",
    status: "At risk",
    progress: 38,
    due: "Dec 04",
    tags: ["LLM", "RAG", "Node"],
    team: ["E", "F", "A"],
  },
  {
    id: "3",
    name: "Mobile Companion",
    icon: "M",
    status: "On track",
    progress: 54,
    due: "Jan 18",
    tags: ["Expo", "React Native"],
    team: ["B", "G", "H"],
  },
  {
    id: "4",
    name: "Docs & Knowledge",
    icon: "D",
    status: "Planning",
    progress: 12,
    due: "Feb 02",
    tags: ["MDX", "Vite"],
    team: ["A", "C"],
  },
  {
    id: "5",
    name: "Billing & Payments",
    icon: "$",
    status: "On track",
    progress: 88,
    due: "Nov 30",
    tags: ["Stripe", "SQL"],
    team: ["I", "J", "K", "A"],
  },
  {
    id: "6",
    name: "Design System 3.0",
    icon: "DS",
    status: "In review",
    progress: 61,
    due: "Jan 08",
    tags: ["Figma", "Tokens"],
    team: ["L", "M"],
  },
];

export const activityFeed = [
  { id: 1, user: "John", action: "completed", target: "API Integration", time: "2m", icon: "check" },
  { id: 2, user: "Sarah", action: "created", target: "Sprint 12", time: "18m", icon: "sprint" },
  { id: 3, user: "Alex", action: "updated", target: "Auth Documentation", time: "1h", icon: "doc" },
  { id: 4, user: "Priya", action: "joined the workspace", target: "", time: "3h", icon: "user" },
  { id: 5, user: "Marcus", action: "moved", target: "Onboarding wizard → Done", time: "5h", icon: "move" },
  { id: 6, user: "Lena", action: "opened PR", target: "#284 · Dashboard shell", time: "6h", icon: "pr" },
];

export const deadlines = [
  { task: "Publish landing v2", project: "Foundry Web", due: "Today", priority: "high", overdue: false },
  { task: "AI eval report", project: "AI Assistant", due: "Tomorrow", priority: "high", overdue: false },
  { task: "SOC2 checklist", project: "Compliance", due: "In 3 days", priority: "medium", overdue: false },
  { task: "Design tokens audit", project: "Design System", due: "2 days ago", priority: "low", overdue: true },
];

export const notifications = [
  { id: 1, title: "New task assigned", desc: "Ayush · Review PR #284", time: "3m", unread: true },
  { id: 2, title: "Sarah commented", desc: "on 'Sprint 12 planning'", time: "22m", unread: true },
  { id: 3, title: "Priya joined the workspace", desc: "Welcome them 👋", time: "3h", unread: true },
  { id: 4, title: "v1.4.0 deployed to production", desc: "All checks passed", time: "1d", unread: false },
  { id: 5, title: "Weekly report ready", desc: "Team velocity +12%", time: "2d", unread: false },
];

export const devMetrics = [
  { label: "Active Repositories", value: 14, delta: "+2", trend: "up", desc: "Across 3 orgs", icon: "repo" },
  { label: "Sprint Completion", value: "92%", delta: "+4%", trend: "up", desc: "Sprint 11 wrapped", icon: "target" },
  { label: "PRs Reviewed", value: 128, delta: "+21", trend: "up", desc: "This week", icon: "pr" },
  { label: "Docs Coverage", value: "76%", delta: "+8%", trend: "up", desc: "of modules", icon: "book" },
  { label: "AI Tasks Generated", value: 342, delta: "+56", trend: "up", desc: "Auto-drafted", icon: "sparkles" },
  { label: "Team Velocity", value: "47pts", delta: "+3", trend: "up", desc: "3-sprint avg", icon: "gauge" },
  { label: "Code Review Time", value: "3.2h", delta: "-0.6h", trend: "up", desc: "Median", icon: "clock" },
  { label: "Deploy Success", value: "98.4%", delta: "+0.3%", trend: "up", desc: "Last 100 deploys", icon: "rocket" },
];
