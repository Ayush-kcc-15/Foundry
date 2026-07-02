import {
  Sparkles, Bug, ArrowUpCircle, Search, FileText, Wrench, Flame, Package,
  type LucideIcon,
} from "lucide-react";

export type Priority = "Critical" | "High" | "Medium" | "Low";
export type Status = "Backlog" | "Todo" | "In Progress" | "Review" | "Testing" | "Done";
export type TaskType =
  | "Feature" | "Bug" | "Improvement" | "Research"
  | "Documentation" | "Refactor" | "Hotfix" | "Chore";

export const STATUSES: Status[] = ["Backlog", "Todo", "In Progress", "Review", "Testing", "Done"];
export const PRIORITIES: Priority[] = ["Critical", "High", "Medium", "Low"];

export const STATUS_META: Record<Status, { color: string; dot: string; ring: string }> = {
  Backlog:      { color: "text-slate-300",    dot: "bg-slate-400",     ring: "ring-slate-400/30" },
  Todo:         { color: "text-blue-300",     dot: "bg-blue-400",      ring: "ring-blue-400/30" },
  "In Progress":{ color: "text-primary",      dot: "bg-primary",       ring: "ring-primary/40" },
  Review:       { color: "text-amber-300",    dot: "bg-amber-400",     ring: "ring-amber-400/30" },
  Testing:      { color: "text-fuchsia-300",  dot: "bg-fuchsia-400",   ring: "ring-fuchsia-400/30" },
  Done:         { color: "text-emerald-300",  dot: "bg-emerald-400",   ring: "ring-emerald-400/30" },
};

export const PRIORITY_META: Record<Priority, { color: string; bg: string; label: string }> = {
  Critical: { color: "text-red-300",    bg: "bg-red-500/15 border-red-500/30",    label: "Critical" },
  High:     { color: "text-orange-300", bg: "bg-orange-500/15 border-orange-500/30", label: "High" },
  Medium:   { color: "text-amber-300",  bg: "bg-amber-500/15 border-amber-500/30",  label: "Medium" },
  Low:      { color: "text-slate-300",  bg: "bg-slate-500/15 border-slate-500/30",  label: "Low" },
};

export const TYPE_META: Record<TaskType, { icon: LucideIcon; color: string; bg: string }> = {
  Feature:       { icon: Sparkles,      color: "text-primary",      bg: "bg-primary/15 border-primary/30" },
  Bug:           { icon: Bug,           color: "text-red-300",      bg: "bg-red-500/15 border-red-500/30" },
  Improvement:   { icon: ArrowUpCircle, color: "text-emerald-300",  bg: "bg-emerald-500/15 border-emerald-500/30" },
  Research:      { icon: Search,        color: "text-fuchsia-300",  bg: "bg-fuchsia-500/15 border-fuchsia-500/30" },
  Documentation: { icon: FileText,      color: "text-blue-300",     bg: "bg-blue-500/15 border-blue-500/30" },
  Refactor:      { icon: Wrench,        color: "text-amber-300",    bg: "bg-amber-500/15 border-amber-500/30" },
  Hotfix:        { icon: Flame,         color: "text-orange-300",   bg: "bg-orange-500/15 border-orange-500/30" },
  Chore:         { icon: Package,       color: "text-slate-300",    bg: "bg-slate-500/15 border-slate-500/30" },
};

export const LABELS: { name: string; color: string }[] = [
  { name: "Frontend",      color: "bg-sky-500/20 text-sky-200 border-sky-500/30" },
  { name: "Backend",       color: "bg-indigo-500/20 text-indigo-200 border-indigo-500/30" },
  { name: "UI",            color: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-500/30" },
  { name: "UX",            color: "bg-pink-500/20 text-pink-200 border-pink-500/30" },
  { name: "Database",      color: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30" },
  { name: "API",           color: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30" },
  { name: "Testing",       color: "bg-lime-500/20 text-lime-200 border-lime-500/30" },
  { name: "Authentication",color: "bg-yellow-500/20 text-yellow-200 border-yellow-500/30" },
  { name: "Performance",   color: "bg-orange-500/20 text-orange-200 border-orange-500/30" },
  { name: "Bug",           color: "bg-red-500/20 text-red-200 border-red-500/30" },
  { name: "Feature",       color: "bg-primary/20 text-highlight border-primary/30" },
  { name: "Documentation", color: "bg-blue-500/20 text-blue-200 border-blue-500/30" },
  { name: "Design",        color: "bg-purple-500/20 text-purple-200 border-purple-500/30" },
  { name: "Deployment",    color: "bg-teal-500/20 text-teal-200 border-teal-500/30" },
  { name: "AI",            color: "bg-violet-500/20 text-violet-200 border-violet-500/30" },
  { name: "DevOps",        color: "bg-stone-500/20 text-stone-200 border-stone-500/30" },
];

export const labelColor = (name: string) =>
  LABELS.find((l) => l.name === name)?.color ?? "bg-muted text-muted-foreground border-border";

export const USERS = [
  { id: "ay", name: "Ayush Kumar",   initials: "AY", color: "from-primary to-accent" },
  { id: "sm", name: "Sara Menon",    initials: "SM", color: "from-fuchsia-500 to-pink-500" },
  { id: "lk", name: "Lena Kohl",     initials: "LK", color: "from-amber-500 to-orange-500" },
  { id: "mj", name: "Marcus Jung",   initials: "MJ", color: "from-blue-500 to-cyan-500" },
  { id: "ek", name: "Eli Kim",       initials: "EK", color: "from-emerald-500 to-teal-500" },
  { id: "rp", name: "Ravi Patel",    initials: "RP", color: "from-indigo-500 to-violet-500" },
];

export type User = (typeof USERS)[number];

export type ChecklistItem = { id: string; label: string; done: boolean };
export type Comment = { id: string; author: string; initials: string; time: string; body: string };
export type Activity = { id: string; kind: "created" | "priority" | "moved" | "comment" | "assigned" | "completed"; text: string; time: string; who?: string };
export type Attachment = { id: string; name: string; size: string; kind: string };
export type Subtask = { id: string; title: string; done: boolean };

export type Task = {
  id: string;
  key: string; // e.g. FDR-101
  title: string;
  description: string;
  type: TaskType;
  priority: Priority;
  status: Status;
  assignee: string; // user id
  reporter: string;
  due: string; // ISO
  labels: string[];
  tech: string[];
  estimateH: number;
  loggedH: number;
  storyPoints: number;
  checklist: ChecklistItem[];
  comments: Comment[];
  attachments: Attachment[];
  activity: Activity[];
  subtasks: Subtask[];
  dependencies: string[]; // task keys
  related: string[];
  sprintId: string | null;
  epic: string | null;
  milestone: string | null;
  createdAt: string;
  order: number;
};

export type Sprint = {
  id: string;
  name: string;
  goal: string;
  start: string;
  end: string;
  status: "Planned" | "Active" | "Completed";
  velocity: number;
  capacity: number;
};

export type Milestone = { id: string; name: string; date: string; phase: "Planning" | "Development" | "Testing" | "Release" | "Maintenance"; progress: number };

export const SPRINTS: Sprint[] = [
  { id: "s-24", name: "Sprint 24 · Ember", goal: "Ship task management & board polish", start: iso(-4), end: iso(10), status: "Active", velocity: 32, capacity: 48 },
  { id: "s-25", name: "Sprint 25 · Orbit", goal: "Insights, roadmap and mobile polish", start: iso(11), end: iso(25), status: "Planned", velocity: 0, capacity: 46 },
  { id: "s-23", name: "Sprint 23 · Nova",  goal: "Auth & dashboard shell",              start: iso(-18), end: iso(-5), status: "Completed", velocity: 41, capacity: 42 },
];

export const MILESTONES: Milestone[] = [
  { id: "m-1", name: "Discovery & specs",  date: iso(-40), phase: "Planning",   progress: 100 },
  { id: "m-2", name: "MVP Board & Tasks",  date: iso(6),   phase: "Development", progress: 62 },
  { id: "m-3", name: "QA Hardening",       date: iso(22),  phase: "Testing",     progress: 20 },
  { id: "m-4", name: "v1.0 Release",       date: iso(38),  phase: "Release",     progress: 0 },
  { id: "m-5", name: "Post-launch support",date: iso(60),  phase: "Maintenance", progress: 0 },
];

function iso(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString();
}

const TITLES: [TaskType, string][] = [
  ["Feature", "Implement drag-and-drop reordering on Kanban"],
  ["Feature", "Add Focus mode to hide side panels"],
  ["Bug", "Sidebar overlaps modal on iPad landscape"],
  ["Improvement", "Increase card hover contrast in dark mode"],
  ["Documentation", "Write onboarding guide for new engineers"],
  ["Refactor", "Extract Kanban selectors into hooks"],
  ["Hotfix", "Reset password link expires immediately"],
  ["Chore", "Bump dnd-kit to latest stable"],
  ["Research", "Evaluate CRDTs for collaborative editing"],
  ["Feature", "Add Sprint burndown chart to Insights"],
  ["Bug", "Duplicate label appears in filter dropdown"],
  ["Feature", "Bulk actions bar with keyboard shortcuts"],
  ["Improvement", "Optimize board render for 500+ tasks"],
  ["Feature", "Weekly & monthly calendar views"],
  ["Documentation", "API reference for task webhooks"],
  ["Feature", "Roadmap swimlanes by team"],
  ["Bug", "Timezone off-by-one on due dates"],
  ["Refactor", "Move task modal state to reducer"],
  ["Chore", "Cleanup unused CSS variables"],
  ["Feature", "Quick create palette (⌘K → task)"],
  ["Research", "Compare virtualization libs for backlog"],
  ["Improvement", "Skeleton loaders on drawer open"],
  ["Feature", "Subtask progress on card"],
  ["Bug", "Drag ghost mis-aligns on Safari"],
  ["Feature", "Attach files via drag-drop into drawer"],
  ["Feature", "Dependencies visualization on task"],
  ["Chore", "Add Storybook stories for TaskCard"],
  ["Feature", "Sprint retrospective template"],
];

const LABEL_POOL = LABELS.map((l) => l.name);
const TECH_POOL = ["React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Redis", "Docker"];

function pick<T>(arr: T[], n: number): T[] {
  const c = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && c.length; i++) out.push(c.splice(Math.floor(Math.random() * c.length), 1)[0]);
  return out;
}
function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

// Deterministic PRNG for stable placeholder data
let seed = 42;
function srand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
function spick<T>(arr: T[], n: number): T[] {
  const c = [...arr]; const out: T[] = [];
  for (let i = 0; i < n && c.length; i++) out.push(c.splice(Math.floor(srand() * c.length), 1)[0]);
  return out;
}
function srandOf<T>(arr: T[]): T { return arr[Math.floor(srand() * arr.length)]; }

function makeTask(i: number, statusHint?: Status): Task {
  const [type, title] = TITLES[i % TITLES.length];
  const priority = srandOf(PRIORITIES);
  const status = statusHint ?? srandOf(STATUSES);
  const user = srandOf(USERS);
  const dueOffset = Math.floor(srand() * 30) - 5;
  const checklistCount = Math.floor(srand() * 4) + 1;
  const checklist: ChecklistItem[] = Array.from({ length: checklistCount }, (_, k) => ({
    id: `c-${i}-${k}`,
    label: ["Design spec", "Implementation", "Tests", "Docs", "Review", "Deploy"][k % 6],
    done: srand() > 0.55,
  }));
  const subtaskCount = Math.floor(srand() * 3);
  const subtasks: Subtask[] = Array.from({ length: subtaskCount }, (_, k) => ({
    id: `st-${i}-${k}`, title: ["Wire dnd-kit sensors", "Persist column order", "Add empty state"][k % 3], done: srand() > 0.5,
  }));
  const labels = spick(LABEL_POOL, Math.floor(srand() * 3) + 1);
  const tech = spick(TECH_POOL, Math.floor(srand() * 2) + 1);
  const estimateH = [1, 2, 3, 5, 8, 13][Math.floor(srand() * 6)];
  const storyPoints = [1, 2, 3, 5, 8][Math.floor(srand() * 5)];

  return {
    id: `t-${i + 1}`,
    key: `FDR-${100 + i}`,
    title,
    description:
      "Design and implement this task with care. Consider edge cases, accessibility, and performance. Coordinate with the design system where relevant.\n\n**Acceptance:** works on desktop, tablet, and mobile with smooth 60fps interactions.",
    type,
    priority,
    status,
    assignee: user.id,
    reporter: srandOf(USERS).id,
    due: iso(dueOffset),
    labels,
    tech,
    estimateH,
    loggedH: Math.floor(estimateH * srand()),
    storyPoints,
    checklist,
    comments: [
      { id: `cm-${i}-1`, author: "Sara Menon", initials: "SM", time: "2h ago", body: "Let's align on the API shape before we start." },
      { id: `cm-${i}-2`, author: "Ayush Kumar", initials: "AY", time: "1h ago", body: "Agreed — I'll draft a proposal by EOD." },
    ],
    attachments: srand() > 0.6 ? [{ id: `a-${i}`, name: "spec-v2.pdf", size: "820 KB", kind: "pdf" }] : [],
    activity: [
      { id: `a1-${i}`, kind: "created",  text: "Task created",                    time: "3d ago", who: "Ayush Kumar" },
      { id: `a2-${i}`, kind: "assigned", text: `Assigned to ${user.name}`,        time: "3d ago", who: "Ayush Kumar" },
      { id: `a3-${i}`, kind: "priority", text: `Priority set to ${priority}`,     time: "2d ago", who: "Sara Menon" },
      { id: `a4-${i}`, kind: "moved",    text: `Moved to ${status}`,              time: "6h ago", who: user.name },
      { id: `a5-${i}`, kind: "comment",  text: "Added a comment",                  time: "2h ago", who: "Sara Menon" },
    ],
    subtasks,
    dependencies: srand() > 0.7 ? [`FDR-${100 + ((i + 3) % TITLES.length)}`] : [],
    related:      srand() > 0.6 ? [`FDR-${100 + ((i + 5) % TITLES.length)}`] : [],
    sprintId: srand() > 0.35 ? "s-24" : (srand() > 0.5 ? "s-25" : null),
    epic: rand(["Kanban", "Sprint", "Board Polish", "Insights", null] as (string | null)[]),
    milestone: srand() > 0.5 ? "m-2" : null,
    createdAt: iso(-Math.floor(srand() * 14) - 1),
    order: i,
  };
}

// Distribute across statuses
export const TASKS: Task[] = (() => {
  seed = 42;
  const dist: Status[] = [
    "Backlog","Backlog","Backlog","Backlog","Backlog",
    "Todo","Todo","Todo","Todo",
    "In Progress","In Progress","In Progress","In Progress",
    "Review","Review","Review",
    "Testing","Testing",
    "Done","Done","Done","Done","Done","Done",
    "Backlog","Todo","In Progress","Done",
  ];
  return TITLES.map((_, i) => makeTask(i, dist[i]));
})();

export function tasksByStatus(tasks: Task[]) {
  const map: Record<Status, Task[]> = {
    Backlog: [], Todo: [], "In Progress": [], Review: [], Testing: [], Done: [],
  };
  tasks.forEach((t) => map[t.status].push(t));
  (Object.keys(map) as Status[]).forEach((k) => map[k].sort((a, b) => a.order - b.order));
  return map;
}

export function checklistProgress(t: Task) {
  if (!t.checklist.length) return 0;
  return Math.round((t.checklist.filter((c) => c.done).length / t.checklist.length) * 100);
}

export function daysUntil(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const ms = d.getTime() - now.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function formatDue(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function getUser(id: string) {
  return USERS.find((u) => u.id === id) ?? USERS[0];
}
