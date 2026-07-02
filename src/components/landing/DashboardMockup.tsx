import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Kanban,
  FileText,
  Calendar as CalendarIcon,
  Users,
  Settings,
  Bell,
  Sparkles,
  TrendingUp,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FolderKanban, label: "Projects" },
  { icon: Kanban, label: "Boards" },
  { icon: FileText, label: "Docs" },
  { icon: CalendarIcon, label: "Calendar" },
  { icon: Users, label: "Team" },
  { icon: Settings, label: "Settings" },
];

const projects = [
  { name: "Auth service v2", progress: 72, tag: "Backend", color: "from-primary to-accent" },
  { name: "Design system refresh", progress: 48, tag: "Design", color: "from-accent to-highlight" },
  { name: "Billing migration", progress: 91, tag: "Infra", color: "from-primary to-highlight" },
];

const kanban = [
  { title: "Backlog", items: ["OAuth flows", "Rate limits", "Search index"] },
  { title: "In progress", items: ["Session tokens", "Webhooks v3"] },
  { title: "In review", items: ["Payment retries"] },
  { title: "Shipped", items: ["Audit log", "Team roles"] },
];

const activity = [
  { who: "Mira", what: "merged #482 into main", when: "2m" },
  { who: "Alex", what: "shipped Auth v2 to staging", when: "12m" },
  { who: "Jules", what: "commented on RFC-014", when: "1h" },
  { who: "Priya", what: "created project Billing v2", when: "3h" },
];

const chart = [30, 48, 42, 60, 55, 72, 65, 82, 74, 90, 78, 96];

export function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-border bg-surface/80 shadow-[0_60px_140px_-40px_rgba(20,184,166,0.35)] backdrop-blur-xl"
    >
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-destructive/70" />
        <span className="h-3 w-3 rounded-full bg-warning/70" />
        <span className="h-3 w-3 rounded-full bg-success/70" />
        <div className="mx-auto rounded-md bg-background/60 px-4 py-1 text-xs text-muted-foreground">
          foundry.app / workspace / acme
        </div>
      </div>

      <div className="grid grid-cols-[200px_1fr_260px] min-h-[560px] max-md:grid-cols-1">
        {/* sidebar */}
        <aside className="border-r border-border/60 bg-background/40 p-4 max-md:hidden">
          <div className="mb-6 flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-accent" />
            <span className="font-display text-sm font-semibold">Acme workspace</span>
          </div>
          <nav className="space-y-1">
            {nav.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.label}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-all",
                    n.active
                      ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_rgba(20,184,166,0.3)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  {n.label}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* main */}
        <div className="space-y-4 p-5">
          {/* header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Workspace overview
              </p>
              <h3 className="font-display text-lg font-semibold">Sprint 42 · Week 2</h3>
            </div>
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative rounded-full bg-card p-2"
            >
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-primary" />
            </motion.div>
          </div>

          {/* analytics */}
          <div className="rounded-xl border border-border/60 bg-card/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Team velocity</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Last 12 weeks</span>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {chart.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.6, ease: "easeOut" }}
                  className="flex-1 rounded-sm bg-gradient-to-t from-primary/50 to-accent/90"
                />
              ))}
            </div>
          </div>

          {/* projects */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Recent projects</p>
            {projects.map((p, i) => (
              <motion.div
                key={p.name}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-3 transition-colors hover:border-primary/40"
              >
                <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br", p.color)} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{p.name}</span>
                    <span className="text-[10px] text-muted-foreground">{p.tag}</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-primary">{p.progress}%</span>
              </motion.div>
            ))}
          </div>

          {/* kanban */}
          <div className="grid grid-cols-4 gap-2">
            {kanban.map((col) => (
              <div
                key={col.title}
                className="rounded-lg border border-border/60 bg-card/40 p-2"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold">{col.title}</span>
                  <span className="text-[10px] text-muted-foreground">{col.items.length}</span>
                </div>
                <div className="space-y-1.5">
                  {col.items.map((it) => (
                    <div
                      key={it}
                      className="rounded-md border border-border/60 bg-background/50 p-1.5 text-[9px]"
                    >
                      {it}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right rail */}
        <aside className="space-y-4 border-l border-border/60 bg-background/30 p-4 max-md:border-l-0 max-md:border-t">
          {/* AI assistant */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold">Foundry AI</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Sprint 42 is 68% complete. 3 tasks may miss the deadline — want me to rebalance?
            </p>
            <div className="mt-2 flex items-center gap-1.5 rounded-md border border-border/60 bg-background/60 px-2 py-1.5">
              <input
                readOnly
                value="Rebalance sprint"
                className="flex-1 bg-transparent text-[10px] outline-none"
              />
              <Send className="h-3 w-3 text-primary" />
            </div>
          </div>

          {/* calendar */}
          <div className="rounded-xl border border-border/60 bg-card/40 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold">November</span>
              <CalendarIcon className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[9px]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i} className="text-muted-foreground">
                  {d}
                </span>
              ))}
              {Array.from({ length: 28 }).map((_, i) => {
                const day = i + 1;
                const today = day === 14;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex h-5 items-center justify-center rounded",
                      today
                        ? "bg-primary text-primary-foreground font-semibold shadow-[0_0_12px_rgba(20,184,166,0.6)]"
                        : "text-muted-foreground hover:bg-white/5",
                    )}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* activity */}
          <div className="rounded-xl border border-border/60 bg-card/40 p-3">
            <p className="mb-2 text-xs font-semibold">Activity</p>
            <div className="space-y-2">
              {activity.map((a) => (
                <div key={a.what} className="flex gap-2">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[8px] font-semibold text-primary">
                    {a.who[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] leading-snug">
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-muted-foreground">{a.what}</span>
                    </p>
                    <p className="text-[9px] text-muted-foreground">{a.when} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* doc preview */}
          <div className="rounded-xl border border-border/60 bg-card/40 p-3">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-3 w-3 text-accent" />
              <span className="text-xs font-semibold">RFC-014 · Auth v2</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-white/10" />
              <div className="h-1.5 w-5/6 rounded-full bg-white/5" />
              <div className="h-1.5 w-3/4 rounded-full bg-white/5" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/5" />
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
