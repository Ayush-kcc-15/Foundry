import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Kanban,
  FileText,
  Calendar,
  Users,
  Settings,
  Bell,
  TrendingUp,
  Plus,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FolderKanban, label: "Projects" },
  { icon: Kanban, label: "Boards" },
  { icon: FileText, label: "Documents" },
  { icon: Calendar, label: "Calendar" },
  { icon: Users, label: "Team" },
  { icon: Settings, label: "Settings" },
];

const chartBars = [42, 58, 36, 72, 51, 84, 66, 90, 74];

const kanban = [
  { title: "Todo", count: 4, color: "bg-highlight/30" },
  { title: "Doing", count: 3, color: "bg-primary/40" },
  { title: "Done", count: 7, color: "bg-accent/40" },
];

const avatars = ["AS", "MK", "JD", "PL"];

export function WorkspacePreview() {
  return (
    <div className="relative w-full">
      {/* rotating orb */}
      <motion.div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[3rem] opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, oklch(0.72 0.14 180 / 0.35), oklch(0.85 0.12 178 / 0.15), oklch(0.72 0.14 180 / 0.35))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative rounded-2xl border border-border bg-surface/80 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(20,184,166,0.35)] overflow-hidden"
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          <div className="mx-auto rounded-md bg-background/60 px-3 py-1 text-[10px] text-muted-foreground">
            foundry.app / dashboard
          </div>
        </div>

        <div className="grid grid-cols-[140px_1fr] min-h-[420px]">
          {/* sidebar */}
          <aside className="border-r border-border/60 bg-background/40 p-3">
            <div className="mb-4 flex items-center gap-2 px-2">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-primary to-accent" />
              <span className="text-xs font-semibold">Foundry</span>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "group flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] transition-all cursor-default",
                      item.active
                        ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_rgba(20,184,166,0.35)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                    {item.label}
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* main */}
          <div className="p-4 space-y-3">
            {/* top row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Overview
                </p>
                <h3 className="text-sm font-semibold">Good morning, Alex</h3>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="relative rounded-full bg-card p-1.5"
                >
                  <Bell className="h-3 w-3" />
                  <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                </motion.div>
                <div className="flex -space-x-1.5">
                  {avatars.map((a, i) => (
                    <div
                      key={a}
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border border-surface text-[8px] font-semibold",
                        i % 2 === 0
                          ? "bg-primary/30 text-primary"
                          : "bg-accent/30 text-accent",
                      )}
                    >
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Active", value: "24", tone: "text-primary" },
                { label: "In review", value: "8", tone: "text-accent" },
                { label: "Shipped", value: "142", tone: "text-highlight" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-border/60 bg-card/50 p-2"
                >
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                  <p className={cn("text-base font-semibold", s.tone)}>{s.value}</p>
                </motion.div>
              ))}
            </div>

            {/* analytics chart */}
            <div className="rounded-lg border border-border/60 bg-card/40 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 text-primary" />
                  <span className="text-[10px] font-medium">Velocity</span>
                </div>
                <span className="text-[9px] text-muted-foreground">Last 9d</span>
              </div>
              <div className="flex h-16 items-end gap-1">
                {chartBars.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                    className="flex-1 rounded-sm bg-gradient-to-t from-primary/60 to-accent/80"
                  />
                ))}
              </div>
            </div>

            {/* kanban + activity */}
            <div className="grid grid-cols-3 gap-2">
              {kanban.map((col) => (
                <motion.div
                  key={col.title}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-border/60 bg-card/40 p-2"
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[9px] font-semibold">{col.title}</span>
                    <span className="text-[9px] text-muted-foreground">{col.count}</span>
                  </div>
                  <div className="space-y-1">
                    <div className={cn("h-1.5 rounded-full", col.color)} />
                    <div className="h-1.5 w-3/4 rounded-full bg-white/5" />
                    <div className="h-1.5 w-1/2 rounded-full bg-white/5" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* deadline + quick action */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border/60 bg-card/40 p-2">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> Due Fri
                </div>
                <p className="mt-1 text-[11px] font-medium">Auth v2 launch</p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/10 p-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  <span className="text-[10px] font-medium">4 tasks done</span>
                </div>
                <button className="rounded-md bg-primary/20 p-1 text-primary hover:bg-primary/30 transition">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* floating cards */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 0.9, duration: 0.5 },
          x: { delay: 0.9, duration: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -left-4 top-1/3 hidden md:flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-xl backdrop-blur"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/20 text-success">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Deploy #142</p>
          <p className="text-xs font-semibold">Shipped to prod</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.1, duration: 0.5 },
          x: { delay: 1.1, duration: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -right-4 bottom-16 hidden md:flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-xl backdrop-blur"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
          <Users className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Mira joined</p>
          <p className="text-xs font-semibold">Design team</p>
        </div>
      </motion.div>
    </div>
  );
}
