export const TECH_OPTIONS = [
  "React", "Spring Boot", "MongoDB", "Docker", "AWS", "Java", "Node.js",
  "Python", "Tailwind CSS", "Angular", "Vue", "Kubernetes", "TypeScript",
  "Next.js", "PostgreSQL", "Redis", "GraphQL", "Rust", "Go",
];

export const CATEGORIES = ["Product", "Internal", "R&D", "Client", "Marketing"];

export const STATUSES = ["Planning", "Active", "On Hold", "In Review", "Completed"] as const;
export const PRIORITIES = ["Low", "Medium", "High", "Critical"] as const;

export type Project = {
  id: string;
  name: string;
  icon: string;
  color: string; // tailwind gradient class
  description: string;
  tech: string[];
  status: typeof STATUSES[number];
  priority: typeof PRIORITIES[number];
  progress: number;
  health: number; // 0-100
  owner: { name: string; initials: string };
  team: string[];
  due: string;
  updated: string;
  updatedAt: number; // sortable
  favorite: boolean;
  category: string;
  visibility: "Private" | "Team" | "Public";
  tags: string[];
  createdAt: string;
  banner: string; // gradient
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, ${a}, ${b})`;

export const PROJECTS: Project[] = [
  {
    id: "foundry-web",
    name: "Foundry Web Platform",
    icon: "F",
    color: "from-primary to-accent",
    description: "The customer-facing marketing and app shell for Foundry.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    status: "Active",
    priority: "High",
    progress: 72,
    health: 88,
    owner: { name: "Ayush Kumar", initials: "AY" },
    team: ["AY", "SM", "LK", "MJ"],
    due: "Dec 12",
    updated: "2h ago",
    updatedAt: Date.now() - 2 * 3600e3,
    favorite: true,
    category: "Product",
    visibility: "Team",
    tags: ["Frontend", "Feature", "Design"],
    createdAt: "Aug 04, 2025",
    banner: grad("#0F766E", "#5EEAD4"),
  },
  {
    id: "ai-assistant-v2",
    name: "AI Assistant v2",
    icon: "AI",
    color: "from-accent to-highlight",
    description: "RAG-powered assistant with tool use and code generation.",
    tech: ["Python", "Node.js", "PostgreSQL", "Redis"],
    status: "Active",
    priority: "Critical",
    progress: 38,
    health: 62,
    owner: { name: "Sara Menon", initials: "SM" },
    team: ["SM", "EK", "AY"],
    due: "Dec 04",
    updated: "35m ago",
    updatedAt: Date.now() - 35 * 60e3,
    favorite: true,
    category: "R&D",
    visibility: "Private",
    tags: ["AI", "Backend", "Urgent"],
    createdAt: "Sep 21, 2025",
    banner: grad("#5B21B6", "#22D3EE"),
  },
  {
    id: "mobile-companion",
    name: "Mobile Companion",
    icon: "M",
    color: "from-warning to-destructive",
    description: "React Native app with offline sync and push notifications.",
    tech: ["React", "TypeScript", "MongoDB"],
    status: "In Review",
    priority: "Medium",
    progress: 54,
    health: 74,
    owner: { name: "Lena Kohl", initials: "LK" },
    team: ["LK", "GJ", "HP"],
    due: "Jan 18",
    updated: "1d ago",
    updatedAt: Date.now() - 26 * 3600e3,
    favorite: false,
    category: "Product",
    visibility: "Team",
    tags: ["Frontend", "Feature"],
    createdAt: "Jul 12, 2025",
    banner: grad("#B45309", "#EF4444"),
  },
  {
    id: "docs-knowledge",
    name: "Docs & Knowledge",
    icon: "D",
    color: "from-highlight to-primary",
    description: "Internal docs portal with MDX and search.",
    tech: ["Next.js", "MongoDB", "Tailwind CSS"],
    status: "Planning",
    priority: "Low",
    progress: 12,
    health: 90,
    owner: { name: "Marcus Jung", initials: "MJ" },
    team: ["MJ", "AY"],
    due: "Feb 02",
    updated: "3d ago",
    updatedAt: Date.now() - 3 * 24 * 3600e3,
    favorite: false,
    category: "Internal",
    visibility: "Private",
    tags: ["Documentation", "Research"],
    createdAt: "Oct 02, 2025",
    banner: grad("#134E4A", "#99F6E4"),
  },
  {
    id: "billing-payments",
    name: "Billing & Payments",
    icon: "$",
    color: "from-success to-primary",
    description: "Stripe-based billing, invoicing, and metered usage.",
    tech: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    status: "Active",
    priority: "High",
    progress: 88,
    health: 82,
    owner: { name: "Ivan Petrov", initials: "IP" },
    team: ["IP", "JQ", "KK", "AY"],
    due: "Nov 30",
    updated: "12m ago",
    updatedAt: Date.now() - 12 * 60e3,
    favorite: true,
    category: "Product",
    visibility: "Team",
    tags: ["Backend", "Feature"],
    createdAt: "Jun 18, 2025",
    banner: grad("#14532D", "#14B8A6"),
  },
  {
    id: "design-system-3",
    name: "Design System 3.0",
    icon: "DS",
    color: "from-accent to-primary",
    description: "Design tokens, primitives, and component reference.",
    tech: ["React", "Tailwind CSS", "TypeScript"],
    status: "In Review",
    priority: "Medium",
    progress: 61,
    health: 78,
    owner: { name: "Lena Kohl", initials: "LK" },
    team: ["LK", "MJ"],
    due: "Jan 08",
    updated: "5h ago",
    updatedAt: Date.now() - 5 * 3600e3,
    favorite: false,
    category: "Internal",
    visibility: "Public",
    tags: ["Design", "Frontend"],
    createdAt: "Sep 01, 2025",
    banner: grad("#0891B2", "#5EEAD4"),
  },
  {
    id: "infra-kube",
    name: "Infra & Kubernetes",
    icon: "K",
    color: "from-primary to-highlight",
    description: "Cluster hardening, autoscaling, and observability.",
    tech: ["Kubernetes", "Docker", "AWS", "Go"],
    status: "On Hold",
    priority: "Medium",
    progress: 28,
    health: 55,
    owner: { name: "Grace Ju", initials: "GJ" },
    team: ["GJ", "IP"],
    due: "Mar 15",
    updated: "1w ago",
    updatedAt: Date.now() - 7 * 24 * 3600e3,
    favorite: false,
    category: "Internal",
    visibility: "Private",
    tags: ["Backend", "Research"],
    createdAt: "May 10, 2025",
    banner: grad("#0E7490", "#0F766E"),
  },
  {
    id: "landing-v2",
    name: "Marketing Site v2",
    icon: "L",
    color: "from-warning to-primary",
    description: "Refresh of the public marketing surface.",
    tech: ["Next.js", "Tailwind CSS"],
    status: "Completed",
    priority: "Low",
    progress: 100,
    health: 100,
    owner: { name: "Kai Park", initials: "KK" },
    team: ["KK", "LK"],
    due: "Oct 20",
    updated: "2w ago",
    updatedAt: Date.now() - 14 * 24 * 3600e3,
    favorite: false,
    category: "Marketing",
    visibility: "Public",
    tags: ["Design", "Completed"],
    createdAt: "Apr 22, 2025",
    banner: grad("#CA8A04", "#14B8A6"),
  },
];

export function getProject(id: string) {
  return PROJECTS.find((p) => p.id === id);
}

export const MILESTONES = [
  { id: 1, title: "Kickoff & Architecture", due: "Aug 10", pct: 100, status: "Completed" },
  { id: 2, title: "Design System Alignment", due: "Sep 02", pct: 100, status: "Completed" },
  { id: 3, title: "Core UI Shipped", due: "Oct 14", pct: 90, status: "In progress" },
  { id: 4, title: "Beta Release", due: "Nov 22", pct: 55, status: "In progress" },
  { id: 5, title: "GA Launch", due: "Dec 12", pct: 15, status: "Upcoming" },
];

export const TIMELINE = [
  { phase: "Created", date: "Aug 04", done: true },
  { phase: "Planning", date: "Aug 20", done: true },
  { phase: "Development", date: "Sep 10", done: true },
  { phase: "Testing", date: "Nov 05", done: false, active: true },
  { phase: "Deployment", date: "Dec 12", done: false },
  { phase: "Maintenance", date: "—", done: false },
];

export const RECENT_OPENED = ["foundry-web", "ai-assistant-v2", "billing-payments", "design-system-3"];
