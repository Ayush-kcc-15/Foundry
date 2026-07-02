import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  FileText,
  BookOpen,
  ListTodo,
  Calendar,
  ShieldCheck,
  Tag,
  MessageSquareText,
  LineChart,
  Library,
  History,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AIPageHeader, Chip } from "@/components/ai/shared";
import { SMART_SUGGESTIONS, AI_HISTORY } from "@/components/ai/data";

export const Route = createFileRoute("/_authenticated/ai/")({
  component: AIOverview,
  head: () => ({ meta: [{ title: "AI Overview — Foundry" }] }),
});

const stats = [
  { label: "AI Suggestions Today", value: "24", delta: "+18%", icon: Sparkles, tint: "from-primary to-accent" },
  { label: "Documents Generated", value: "142", delta: "+12", icon: FileText, tint: "from-accent to-highlight" },
  { label: "Tasks Created", value: "86", delta: "+9", icon: ListTodo, tint: "from-highlight to-primary" },
  { label: "Time Saved", value: "14h", delta: "this week", icon: Clock, tint: "from-success to-primary" },
  { label: "Workspace Productivity", value: "92%", delta: "+4pt", icon: TrendingUp, tint: "from-warning to-destructive" },
  { label: "Prompts Reused", value: "38", delta: "+6", icon: Zap, tint: "from-primary to-highlight" },
];

const shortcuts = [
  { label: "AI Chat", to: "/ai/chat", icon: MessageCircle },
  { label: "README", to: "/ai/readme", icon: FileText },
  { label: "Docs", to: "/ai/docs", icon: BookOpen },
  { label: "Tasks", to: "/ai/tasks", icon: ListTodo },
  { label: "Sprint", to: "/ai/sprint", icon: Calendar },
  { label: "Review", to: "/ai/review", icon: ShieldCheck },
  { label: "Release", to: "/ai/release-notes", icon: Tag },
  { label: "Meeting", to: "/ai/meeting", icon: MessageSquareText },
  { label: "Insights", to: "/ai/insights", icon: LineChart },
  { label: "Prompts", to: "/ai/prompts", icon: Library },
  { label: "History", to: "/ai/history", icon: History },
];

function AIOverview() {
  return (
    <>
      <AIPageHeader
        icon={Sparkles}
        title="AI Workspace"
        description="Plan, generate, and ship faster. Every tool your team needs powered by Foundry AI."
        actions={<Chip tone="primary">Preview · Placeholder responses</Chip>}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl glass-strong p-4"
          >
            <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${s.tint} text-primary-foreground mb-3`}>
              <s.icon className="h-4 w-4" />
            </div>
            <div className="text-2xl font-display font-semibold">{s.value}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
            <div className="text-[10px] text-highlight mt-1">{s.delta}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6 min-w-0">
          <section>
            <h2 className="font-display text-lg font-semibold mb-3">Jump into a tool</h2>
            <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {shortcuts.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link
                    to={s.to}
                    className="group flex items-center gap-2.5 rounded-2xl glass-strong p-3.5 hover:border-primary/40 transition-all"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">{s.label}</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3">Recent AI sessions</h2>
            <div className="rounded-2xl glass-strong divide-y divide-border/60 overflow-hidden">
              {AI_HISTORY.slice(0, 5).map((h) => (
                <div key={h.id} className="flex items-center gap-3 p-3.5 hover:bg-white/5 transition">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{h.title}</div>
                    <div className="text-[11px] text-muted-foreground">{h.type} · {h.date}</div>
                  </div>
                  <Chip tone={h.status === "completed" ? "success" : h.status === "draft" ? "warning" : "default"}>{h.status}</Chip>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl glass-strong p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-highlight" />
              <h3 className="text-sm font-semibold">Smart suggestions</h3>
            </div>
            <div className="space-y-2">
              {SMART_SUGGESTIONS.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border/60 bg-surface/40 p-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Chip tone={s.tone as any}>AI</Chip>
                    <div className="text-xs font-semibold">{s.title}</div>
                  </div>
                  <div className="text-[11px] text-muted-foreground">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl glass-strong p-4">
            <h3 className="text-sm font-semibold mb-1">AI productivity score</h3>
            <div className="text-3xl font-display font-semibold text-highlight">92</div>
            <div className="text-[11px] text-muted-foreground">↑ 6 pts vs last week</div>
            <div className="mt-3 h-1.5 rounded-full bg-border/60 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
