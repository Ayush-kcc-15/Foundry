// Placeholder data for Phase 7 — Team Collaboration & Activity Center.

export type Presence = "online" | "away" | "busy" | "offline";

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: "Engineering" | "Design" | "Product" | "Ops" | "Marketing";
  email: string;
  timezone: string;
  presence: Presence;
  currentTask?: string;
  projects: string[];
  tasksAssigned: number;
  productivity: number; // 0-100
  lastActive: string;
  skills: string[];
  badges: { label: string; color: string }[];
  about: string;
  color: string;
  joined: string;
};

export const MEMBERS: TeamMember[] = [
  {
    id: "u_ayush", name: "Ayush Kumar", initials: "AY", role: "Owner · Engineering",
    department: "Engineering", email: "ayush@foundry.dev", timezone: "IST (UTC+5:30)",
    presence: "online", currentTask: "PR #482 — Kanban DnD polish",
    projects: ["Foundry Web", "AI Assistant"], tasksAssigned: 14, productivity: 92,
    lastActive: "just now",
    skills: ["React", "TanStack", "System Design", "TypeScript"],
    badges: [{ label: "Founding", color: "bg-primary/15 text-highlight border-primary/30" }, { label: "10x", color: "bg-warning/15 text-warning border-warning/30" }],
    about: "Ships end-to-end. Loves crisp UI, boring infra.",
    color: "from-primary to-accent",
    joined: "Jan 2024",
  },
  {
    id: "u_sara", name: "Sara Menon", initials: "SM", role: "Staff Engineer",
    department: "Engineering", email: "sara@foundry.dev", timezone: "CET (UTC+1)",
    presence: "online", currentTask: "Realtime presence spike",
    projects: ["Foundry Web", "Realtime Sync"], tasksAssigned: 11, productivity: 88,
    lastActive: "2m ago",
    skills: ["Rust", "CRDT", "Postgres", "Node"],
    badges: [{ label: "Reviewer", color: "bg-accent/15 text-accent border-accent/30" }],
    about: "Realtime nerd. Distributed systems by day, jazz by night.",
    color: "from-accent to-highlight",
    joined: "Mar 2024",
  },
  {
    id: "u_lena", name: "Lena Kohl", initials: "LK", role: "Design Lead",
    department: "Design", email: "lena@foundry.dev", timezone: "CET (UTC+1)",
    presence: "away", currentTask: "Discussion thread visual language",
    projects: ["Design System", "Foundry Web"], tasksAssigned: 7, productivity: 81,
    lastActive: "12m ago",
    skills: ["Design Systems", "Figma", "Motion", "Prototyping"],
    badges: [{ label: "Design", color: "bg-highlight/15 text-highlight border-highlight/30" }],
    about: "Systems thinker. Building the Foundry visual language.",
    color: "from-highlight to-primary",
    joined: "Feb 2024",
  },
  {
    id: "u_marcus", name: "Marcus Jung", initials: "MJ", role: "Product Manager",
    department: "Product", email: "marcus@foundry.dev", timezone: "PST (UTC-8)",
    presence: "busy", currentTask: "Q1 roadmap review",
    projects: ["Foundry Web", "Onboarding"], tasksAssigned: 9, productivity: 76,
    lastActive: "5m ago",
    skills: ["Discovery", "Analytics", "Roadmapping"],
    badges: [{ label: "PM", color: "bg-warning/15 text-warning border-warning/30" }],
    about: "Turning fuzzy signals into shipped features.",
    color: "from-warning to-destructive",
    joined: "Apr 2024",
  },
  {
    id: "u_dev", name: "Devika Rao", initials: "DR", role: "Senior Frontend",
    department: "Engineering", email: "devika@foundry.dev", timezone: "IST (UTC+5:30)",
    presence: "online", currentTask: "Docs Editor extensions",
    projects: ["Docs", "Foundry Web"], tasksAssigned: 10, productivity: 84,
    lastActive: "just now",
    skills: ["React", "TipTap", "A11y"],
    badges: [{ label: "A11y", color: "bg-success/15 text-success border-success/30" }],
    about: "Accessibility first. Motion always.",
    color: "from-success to-primary",
    joined: "May 2024",
  },
  {
    id: "u_kai", name: "Kai Tanaka", initials: "KT", role: "Backend Engineer",
    department: "Engineering", email: "kai@foundry.dev", timezone: "JST (UTC+9)",
    presence: "offline", currentTask: "Sprint 12 wrap-up",
    projects: ["Realtime Sync"], tasksAssigned: 6, productivity: 79,
    lastActive: "3h ago",
    skills: ["Go", "Postgres", "Redis"],
    badges: [],
    about: "APIs that don't wake you up at 3am.",
    color: "from-primary to-highlight",
    joined: "Jun 2024",
  },
  {
    id: "u_amara", name: "Amara Diallo", initials: "AD", role: "Growth",
    department: "Marketing", email: "amara@foundry.dev", timezone: "GMT (UTC+0)",
    presence: "online", currentTask: "Launch prep — v2",
    projects: ["Launch", "Docs"], tasksAssigned: 5, productivity: 71,
    lastActive: "8m ago",
    skills: ["SEO", "Copy", "Analytics"],
    badges: [{ label: "Growth", color: "bg-highlight/15 text-highlight border-highlight/30" }],
    about: "Stories that convert.",
    color: "from-highlight to-accent",
    joined: "Jul 2024",
  },
  {
    id: "u_ivan", name: "Ivan Petrov", initials: "IP", role: "DevOps",
    department: "Ops", email: "ivan@foundry.dev", timezone: "EET (UTC+2)",
    presence: "away", currentTask: "CI pipeline refactor",
    projects: ["Infra"], tasksAssigned: 8, productivity: 82,
    lastActive: "20m ago",
    skills: ["Kubernetes", "Terraform", "Observability"],
    badges: [{ label: "Ops", color: "bg-accent/15 text-accent border-accent/30" }],
    about: "Green pipelines. Quiet pagers.",
    color: "from-accent to-primary",
    joined: "Aug 2024",
  },
];

export const PENDING_INVITES = [
  { email: "juno@studio.io", role: "Design", sent: "2 days ago" },
  { email: "erik@finhat.com", role: "Engineering", sent: "5 days ago" },
  { email: "priya@stellar.dev", role: "Product", sent: "1 week ago" },
];

export type DiscussionCategory =
  | "General" | "Engineering" | "Design" | "Announcements" | "Ideas" | "Q&A" | "Bug Reports" | "Feature Requests";

export const DISCUSSION_CATEGORIES: DiscussionCategory[] = [
  "General", "Engineering", "Design", "Announcements", "Ideas", "Q&A", "Bug Reports", "Feature Requests",
];

export type Discussion = {
  id: string;
  title: string;
  authorId: string;
  category: DiscussionCategory;
  tags: string[];
  pinned?: boolean;
  resolved?: boolean;
  replies: number;
  views: number;
  lastActivity: string;
  excerpt: string;
  body: string;
};

export const DISCUSSIONS: Discussion[] = [
  {
    id: "d1", title: "RFC: Realtime presence protocol", authorId: "u_sara",
    category: "Engineering", tags: ["rfc", "realtime"], pinned: true, replies: 18, views: 342,
    lastActivity: "12m", excerpt: "Proposing a CRDT-backed presence channel scoped by workspace.",
    body: "## Context\n\nOur current polling model doesn't scale beyond ~200 concurrent users per workspace.\n\n## Proposal\n\nSwitch to a WebSocket presence channel, sharded by workspace, using a lightweight CRDT for cursor + task focus state.\n\n**Trade-offs**\n- ✅ Sub-100ms updates\n- ⚠️ New infra dependency\n\nOpen to counter-proposals.",
  },
  {
    id: "d2", title: "Dark theme contrast on discussion cards", authorId: "u_lena",
    category: "Design", tags: ["a11y", "theme"], replies: 7, views: 128,
    lastActivity: "1h", excerpt: "Some cards fall below WCAG AA on dark backgrounds — sharing an audit.",
    body: "Ran contrast checks on the new card surfaces. Three tokens are borderline. Proposing bumping `--muted-foreground` by ~4%.",
  },
  {
    id: "d3", title: "Universal Activity Dock 🎉", authorId: "u_ayush",
    category: "Announcements", tags: ["release"], pinned: true, replies: 24, views: 512,
    lastActivity: "3h", excerpt: "Shipped the right-side dock — notifications, chat, AI, all in one place.",
    body: "The Universal Activity Dock is now live. Open with the bell icon or press `?` twice.",
  },
  {
    id: "d4", title: "Idea: keyboard-first navigation everywhere", authorId: "u_dev",
    category: "Ideas", tags: ["ux", "keyboard"], replies: 11, views: 194,
    lastActivity: "5h", excerpt: "What if every list was navigable with j/k like Linear?",
    body: "Every list — board columns, docs sidebar, discussion threads — should support j/k and enter to open.",
  },
  {
    id: "d5", title: "Bug: drag-and-drop breaks on Safari 17", authorId: "u_kai",
    category: "Bug Reports", tags: ["bug", "safari"], replies: 4, views: 89,
    lastActivity: "yesterday", excerpt: "Cards ghost but don't drop on Safari 17.0.x. Repro inside.",
    body: "Steps to reproduce…",
  },
  {
    id: "d6", title: "Feature: inline video comments", authorId: "u_marcus",
    category: "Feature Requests", tags: ["feature", "video"], replies: 15, views: 231,
    lastActivity: "2d", excerpt: "Loom-style video replies on tasks and docs.",
    body: "Record a 60s video comment directly in the drawer.",
  },
  {
    id: "d7", title: "Q: how do we handle guest access?", authorId: "u_amara",
    category: "Q&A", tags: ["auth"], resolved: true, replies: 6, views: 102,
    lastActivity: "3d", excerpt: "External stakeholders need read-only access to specific projects.",
    body: "Answered: guest role coming in v2.1 — see linked doc.",
  },
  {
    id: "d8", title: "Welcome new folks 👋", authorId: "u_ayush",
    category: "General", tags: ["intro"], replies: 32, views: 620,
    lastActivity: "4d", excerpt: "Say hi in the thread — where you're from, what you're building.",
    body: "Drop your intro below.",
  },
];

export type Reply = {
  id: string;
  authorId: string;
  body: string;
  time: string;
  reactions: { emoji: string; count: number; mine?: boolean }[];
  pinned?: boolean;
  resolved?: boolean;
  replies?: Reply[];
};

export const DISCUSSION_REPLIES: Record<string, Reply[]> = {
  d1: [
    {
      id: "r1", authorId: "u_ayush", time: "10m",
      body: "Love this. What's the fallback for clients that lose the WS?",
      reactions: [{ emoji: "👍", count: 4, mine: true }, { emoji: "🚀", count: 2 }],
      pinned: true,
      replies: [
        { id: "r1a", authorId: "u_sara", time: "8m", body: "Exponential backoff, then long-poll after 30s.", reactions: [{ emoji: "💯", count: 2 }] },
      ],
    },
    {
      id: "r2", authorId: "u_lena", time: "6m",
      body: "Can we surface presence in the docs sidebar too? Would love to see who's reading what.",
      reactions: [{ emoji: "❤️", count: 3 }],
    },
    {
      id: "r3", authorId: "u_dev", time: "2m",
      body: "```ts\ntype Presence = { userId: string; cursor?: Pos; focus?: TaskId }\n```\nSomething like this?",
      reactions: [],
    },
  ],
};

export type NotificationCategory = "mentions" | "tasks" | "projects" | "comments" | "system" | "ai";
export type NotificationItem = {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
  actorId?: string;
  action?: string;
};

export const NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", category: "mentions", title: "Sara mentioned you", description: "in RFC: Realtime presence protocol", time: "2m", unread: true, actorId: "u_sara", action: "View thread" },
  { id: "n2", category: "tasks", title: "Task assigned to you", description: "PR review — Kanban DnD polish", time: "8m", unread: true, actorId: "u_marcus", action: "Open task" },
  { id: "n3", category: "comments", title: "Lena replied", description: "on 'Dark theme contrast on discussion cards'", time: "22m", unread: true, actorId: "u_lena", action: "View reply" },
  { id: "n4", category: "projects", title: "Project archived", description: "Legacy Onboarding v1", time: "1h", actorId: "u_ayush", action: "Undo" },
  { id: "n5", category: "ai", title: "AI suggested 3 subtasks", description: "for 'Universal Activity Dock'", time: "2h", action: "Review" },
  { id: "n6", category: "system", title: "New workspace member", description: "Amara Diallo joined Foundry Labs", time: "4h", actorId: "u_amara" },
  { id: "n7", category: "tasks", title: "Deadline in 2 days", description: "Sprint 12 — Docs polish", time: "5h" },
  { id: "n8", category: "comments", title: "Marcus resolved a thread", description: "'Q: guest access' marked as resolved", time: "yesterday", actorId: "u_marcus" },
  { id: "n9", category: "ai", title: "AI drafted a release note", description: "for v2.0.4 — ready to review", time: "yesterday" },
  { id: "n10", category: "system", title: "Deploy succeeded", description: "production · web-platform · 12s", time: "2d" },
];

export type ActivityKind =
  | "task_completed" | "doc_updated" | "sprint_started" | "project_archived"
  | "member_joined" | "comment_added" | "release_published" | "discussion_started" | "pr_merged";

export type ActivityItem = {
  id: string;
  kind: ActivityKind;
  actorId: string;
  title: string;
  target?: string;
  time: string;
  dateGroup: "Today" | "Yesterday" | "This week" | "Earlier";
};

export const ACTIVITY: ActivityItem[] = [
  { id: "a1", kind: "pr_merged", actorId: "u_sara", title: "merged PR", target: "#482 · Kanban DnD polish", time: "12m", dateGroup: "Today" },
  { id: "a2", kind: "comment_added", actorId: "u_lena", title: "commented on", target: "Dark theme contrast", time: "38m", dateGroup: "Today" },
  { id: "a3", kind: "task_completed", actorId: "u_dev", title: "completed", target: "Docs · TipTap toolbar polish", time: "1h", dateGroup: "Today" },
  { id: "a4", kind: "discussion_started", actorId: "u_sara", title: "started a discussion", target: "RFC: Realtime presence protocol", time: "2h", dateGroup: "Today" },
  { id: "a5", kind: "release_published", actorId: "u_ayush", title: "published release", target: "v2.0.4", time: "3h", dateGroup: "Today" },
  { id: "a6", kind: "sprint_started", actorId: "u_marcus", title: "started sprint", target: "Sprint 13 · Collaboration", time: "yesterday", dateGroup: "Yesterday" },
  { id: "a7", kind: "member_joined", actorId: "u_amara", title: "joined the workspace", time: "yesterday", dateGroup: "Yesterday" },
  { id: "a8", kind: "doc_updated", actorId: "u_dev", title: "updated document", target: "Docs · Editor extensions", time: "2d", dateGroup: "This week" },
  { id: "a9", kind: "project_archived", actorId: "u_ayush", title: "archived project", target: "Legacy Onboarding v1", time: "3d", dateGroup: "This week" },
  { id: "a10", kind: "task_completed", actorId: "u_kai", title: "completed", target: "Realtime · WebSocket spike", time: "5d", dateGroup: "This week" },
  { id: "a11", kind: "release_published", actorId: "u_ayush", title: "published release", target: "v2.0.3", time: "2w", dateGroup: "Earlier" },
];

export const ANNOUNCEMENTS = [
  { id: "an1", kind: "release", tone: "primary", title: "v2.0.4 shipped — Universal Activity Dock", desc: "Notifications, chat, AI, and deadlines in one right-side panel.", cta: "Read notes" },
  { id: "an2", kind: "sprint", tone: "accent", title: "Sprint 13 kicks off Monday", desc: "Focus: Collaboration & activity center. Standup at 09:30 IST.", cta: "View plan" },
];

export type Conversation = {
  id: string;
  kind: "dm" | "channel";
  name: string;
  memberIds?: string[];
  unread: number;
  lastMessage: string;
  lastTime: string;
  pinned?: boolean;
};

export type ChatMessage = {
  id: string;
  authorId: string;
  body: string;
  time: string;
  pinned?: boolean;
};

export const CONVERSATIONS: Conversation[] = [
  { id: "c1", kind: "channel", name: "#engineering", unread: 3, lastMessage: "Kai: pushed the WS spike branch.", lastTime: "2m", pinned: true },
  { id: "c2", kind: "channel", name: "#design", unread: 0, lastMessage: "Lena: contrast audit uploaded.", lastTime: "18m" },
  { id: "c3", kind: "channel", name: "#announcements", unread: 1, lastMessage: "Ayush: v2.0.4 is live 🚀", lastTime: "3h" },
  { id: "c4", kind: "dm", name: "Sara Menon", memberIds: ["u_sara"], unread: 2, lastMessage: "quick sanity check on the RFC?", lastTime: "5m" },
  { id: "c5", kind: "dm", name: "Marcus Jung", memberIds: ["u_marcus"], unread: 0, lastMessage: "Roadmap looks good.", lastTime: "1h" },
  { id: "c6", kind: "dm", name: "Lena Kohl", memberIds: ["u_lena"], unread: 0, lastMessage: "sent Figma link", lastTime: "yesterday" },
];

export const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  c1: [
    { id: "m1", authorId: "u_kai", body: "pushed the WS spike branch — realtime/presence-v2.", time: "10:02" },
    { id: "m2", authorId: "u_sara", body: "nice, pulling now. Any known perf gotchas?", time: "10:03" },
    { id: "m3", authorId: "u_kai", body: "keep the sub count under 500/workspace for now.", time: "10:04", pinned: true },
    { id: "m4", authorId: "u_ayush", body: "we should add a metrics panel before merging 👍", time: "10:06" },
  ],
  c4: [
    { id: "m1", authorId: "u_sara", body: "quick sanity check on the RFC?", time: "09:58" },
    { id: "m2", authorId: "u_sara", body: "specifically the fallback section.", time: "09:58" },
  ],
};

export const getMember = (id?: string) => MEMBERS.find((m) => m.id === id);
