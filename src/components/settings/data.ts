import {
  User, UserCog, Building2, Users, ShieldCheck, Bell, Palette, Lock,
  Plug, KeyRound, CreditCard, HardDrive, ScrollText, Keyboard, Info,
} from "lucide-react";

export type SectionId =
  | "overview" | "profile" | "account" | "workspace" | "members" | "roles"
  | "notifications" | "appearance" | "security" | "integrations" | "api-keys"
  | "billing" | "storage" | "audit" | "shortcuts" | "about";

export const SECTIONS: { id: SectionId; label: string; icon: any; group: string }[] = [
  { id: "overview", label: "Overview", icon: ShieldCheck, group: "Admin" },
  { id: "profile", label: "Profile", icon: User, group: "Personal" },
  { id: "account", label: "Account", icon: UserCog, group: "Personal" },
  { id: "appearance", label: "Appearance", icon: Palette, group: "Personal" },
  { id: "notifications", label: "Notifications", icon: Bell, group: "Personal" },
  { id: "security", label: "Security", icon: Lock, group: "Personal" },
  { id: "workspace", label: "Workspace", icon: Building2, group: "Workspace" },
  { id: "members", label: "Members", icon: Users, group: "Workspace" },
  { id: "roles", label: "Roles & Permissions", icon: ShieldCheck, group: "Workspace" },
  { id: "integrations", label: "Integrations", icon: Plug, group: "Workspace" },
  { id: "api-keys", label: "API Keys", icon: KeyRound, group: "Workspace" },
  { id: "billing", label: "Billing", icon: CreditCard, group: "Workspace" },
  { id: "storage", label: "Storage", icon: HardDrive, group: "Workspace" },
  { id: "audit", label: "Audit Logs", icon: ScrollText, group: "Workspace" },
  { id: "shortcuts", label: "Keyboard Shortcuts", icon: Keyboard, group: "Help" },
  { id: "about", label: "About", icon: Info, group: "Help" },
];

export const MEMBERS = [
  { id: "u1", name: "Alex Chen", email: "alex@foundry.dev", role: "Owner", status: "active", lastActive: "just now", projects: 12, avatar: "AC" },
  { id: "u2", name: "Maya Patel", email: "maya@foundry.dev", role: "Admin", status: "active", lastActive: "5m ago", projects: 8, avatar: "MP" },
  { id: "u3", name: "Jordan Lee", email: "jordan@foundry.dev", role: "Developer", status: "active", lastActive: "1h ago", projects: 5, avatar: "JL" },
  { id: "u4", name: "Sam Rivera", email: "sam@foundry.dev", role: "Designer", status: "away", lastActive: "3h ago", projects: 4, avatar: "SR" },
  { id: "u5", name: "Priya Kumar", email: "priya@foundry.dev", role: "Manager", status: "active", lastActive: "20m ago", projects: 9, avatar: "PK" },
  { id: "u6", name: "Nikhil Rao", email: "nikhil@foundry.dev", role: "Developer", status: "offline", lastActive: "2d ago", projects: 3, avatar: "NR" },
  { id: "u7", name: "Emma Wilson", email: "emma@foundry.dev", role: "Viewer", status: "active", lastActive: "12m ago", projects: 2, avatar: "EW" },
  { id: "u8", name: "Diego Santos", email: "diego@foundry.dev", role: "Guest", status: "pending", lastActive: "invited", projects: 0, avatar: "DS" },
];

export const ROLES = ["Owner", "Admin", "Manager", "Developer", "Designer", "Viewer", "Guest"] as const;
export const PERMISSIONS = ["Projects", "Tasks", "Boards", "Documents", "AI", "Billing", "Settings", "Workspace", "Members", "API Keys"] as const;

export const PERMISSION_MATRIX: Record<string, Record<string, boolean>> = {
  Owner: Object.fromEntries(PERMISSIONS.map((p) => [p, true])),
  Admin: Object.fromEntries(PERMISSIONS.map((p) => [p, p !== "Billing"])),
  Manager: Object.fromEntries(PERMISSIONS.map((p) => [p, !["Billing", "API Keys", "Settings"].includes(p)])),
  Developer: Object.fromEntries(PERMISSIONS.map((p) => [p, ["Projects", "Tasks", "Boards", "Documents", "AI"].includes(p)])),
  Designer: Object.fromEntries(PERMISSIONS.map((p) => [p, ["Projects", "Tasks", "Boards", "Documents"].includes(p)])),
  Viewer: Object.fromEntries(PERMISSIONS.map((p) => [p, ["Projects", "Documents"].includes(p)])),
  Guest: Object.fromEntries(PERMISSIONS.map((p) => [p, p === "Projects"])),
};

export const INTEGRATIONS = [
  { id: "github", name: "GitHub", desc: "Sync repos, PRs, and issues.", connected: true, color: "#f0f6fc" },
  { id: "slack", name: "Slack", desc: "Send notifications to channels.", connected: true, color: "#4A154B" },
  { id: "discord", name: "Discord", desc: "Community & team chat.", connected: false, color: "#5865F2" },
  { id: "figma", name: "Figma", desc: "Embed designs & prototypes.", connected: true, color: "#F24E1E" },
  { id: "notion", name: "Notion", desc: "Import docs & wikis.", connected: false, color: "#ffffff" },
  { id: "gdrive", name: "Google Drive", desc: "Attach files from Drive.", connected: true, color: "#1FA463" },
  { id: "aws", name: "AWS", desc: "Deploy & monitor infra.", connected: false, color: "#FF9900" },
  { id: "docker", name: "Docker", desc: "Container registry sync.", connected: false, color: "#2496ED" },
  { id: "jira", name: "Jira", desc: "Mirror issues both ways.", connected: false, color: "#2684FF" },
  { id: "gitlab", name: "GitLab", desc: "Merge requests & pipelines.", connected: false, color: "#FC6D26" },
  { id: "vercel", name: "Vercel", desc: "Preview deployments.", connected: true, color: "#ffffff" },
  { id: "netlify", name: "Netlify", desc: "Deploy previews & forms.", connected: false, color: "#00C7B7" },
];

export const API_KEYS = [
  { id: "k1", name: "Production API", created: "2025-11-01", lastUsed: "2 min ago", scopes: ["read", "write"], token: "fdy_live_••••••••7A2c" },
  { id: "k2", name: "CI/CD Pipeline", created: "2025-10-12", lastUsed: "1h ago", scopes: ["read", "deploy"], token: "fdy_ci_••••••••K9pQ" },
  { id: "k3", name: "Analytics Read", created: "2025-09-24", lastUsed: "3d ago", scopes: ["read"], token: "fdy_ro_••••••••M12x" },
];

export const INVOICES = [
  { id: "INV-2026-006", date: "Jun 01, 2026", amount: "$249.00", status: "Paid" },
  { id: "INV-2026-005", date: "May 01, 2026", amount: "$249.00", status: "Paid" },
  { id: "INV-2026-004", date: "Apr 01, 2026", amount: "$249.00", status: "Paid" },
  { id: "INV-2026-003", date: "Mar 01, 2026", amount: "$199.00", status: "Paid" },
];

export const AUDIT_LOGS = [
  { id: 1, actor: "Alex Chen", event: "Logged in", target: "web · Chrome", time: "2m ago", kind: "auth" },
  { id: 2, actor: "Maya Patel", event: "Invited member", target: "diego@foundry.dev", time: "15m ago", kind: "member" },
  { id: 3, actor: "Alex Chen", event: "Updated workspace", target: "Foundry HQ", time: "1h ago", kind: "workspace" },
  { id: 4, actor: "System", event: "Role changed", target: "Jordan Lee → Developer", time: "3h ago", kind: "role" },
  { id: 5, actor: "Jordan Lee", event: "Deleted project", target: "Legacy · Mobile v1", time: "yesterday", kind: "project" },
  { id: 6, actor: "Priya Kumar", event: "Created API key", target: "CI/CD Pipeline", time: "2d ago", kind: "api" },
  { id: 7, actor: "Alex Chen", event: "Updated billing", target: "Business plan", time: "3d ago", kind: "billing" },
  { id: 8, actor: "Sam Rivera", event: "Logged out", target: "web · Safari", time: "3d ago", kind: "auth" },
];

export const SHORTCUTS = [
  {
    group: "Global", items: [
      { keys: ["Ctrl", "K"], label: "Command Palette" },
      { keys: ["Ctrl", "J"], label: "AI Assistant" },
      { keys: ["Ctrl", "Shift", "A"], label: "Activity Dock" },
      { keys: ["G", "D"], label: "Go to Dashboard" },
      { keys: ["?"], label: "Show Shortcuts" },
    ],
  },
  {
    group: "Create", items: [
      { keys: ["N"], label: "New Task" },
      { keys: ["P"], label: "New Project" },
      { keys: ["Shift", "D"], label: "New Document" },
      { keys: ["Shift", "M"], label: "New Meeting" },
    ],
  },
  {
    group: "Navigation", items: [
      { keys: ["G", "P"], label: "Projects" },
      { keys: ["G", "T"], label: "Team" },
      { keys: ["G", "A"], label: "AI Workspace" },
      { keys: ["G", "S"], label: "Settings" },
    ],
  },
  {
    group: "Board", items: [
      { keys: ["F"], label: "Focus Mode" },
      { keys: ["Space"], label: "Preview Task" },
      { keys: ["E"], label: "Edit Task" },
      { keys: ["/"], label: "Filter Tasks" },
    ],
  },
];

export const SESSIONS = [
  { id: "s1", device: "MacBook Pro 16″", browser: "Chrome 141 · macOS Sonoma", location: "Bengaluru, IN", current: true, lastActive: "now" },
  { id: "s2", device: "iPhone 16 Pro", browser: "Foundry iOS 2.4", location: "Bengaluru, IN", current: false, lastActive: "2h ago" },
  { id: "s3", device: "Windows Desktop", browser: "Edge 138 · Win 11", location: "Mumbai, IN", current: false, lastActive: "yesterday" },
  { id: "s4", device: "iPad Air", browser: "Safari 18", location: "Bengaluru, IN", current: false, lastActive: "4d ago" },
];

export const LOGIN_HISTORY = [
  { time: "Today, 09:14", ip: "103.24.44.10", location: "Bengaluru, IN", status: "success" },
  { time: "Yesterday, 22:02", ip: "103.24.44.10", location: "Bengaluru, IN", status: "success" },
  { time: "Jun 30, 07:41", ip: "49.207.55.12", location: "Mumbai, IN", status: "success" },
  { time: "Jun 29, 18:19", ip: "45.112.98.4", location: "Unknown", status: "blocked" },
];

export const HEALTH = {
  score: 92,
  activeMembers: 41,
  aiUsage: 68,
  storage: 62,
  apiRequests: 84,
  security: 88,
  pendingInvites: 3,
  activity: 76,
  systemStatus: "operational",
};
