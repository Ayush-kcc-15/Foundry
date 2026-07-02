import { motion } from "framer-motion";
import { TrendingUp, MessageSquare, FileText, Trophy } from "lucide-react";
import { MEMBERS } from "./data";

export function TeamAnalytics() {
  const top = [...MEMBERS].sort((a, b) => b.productivity - a.productivity).slice(0, 5);
  const collab = [
    { label: "Mon", value: 42 }, { label: "Tue", value: 58 }, { label: "Wed", value: 66 },
    { label: "Thu", value: 71 }, { label: "Fri", value: 60 }, { label: "Sat", value: 22 }, { label: "Sun", value: 30 },
  ];
  const max = Math.max(...collab.map((c) => c.value));

  const stats = [
    { icon: MessageSquare, label: "Comments this week", value: 214, tone: "text-primary" },
    { icon: FileText, label: "Documents created", value: 18, tone: "text-accent" },
    { icon: TrendingUp, label: "Task completion", value: "82%", tone: "text-success" },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl glass-strong p-5 lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Weekly collaboration</div>
            <div className="text-[11px] text-muted-foreground">Comments · reviews · replies</div>
          </div>
          <div className="text-xs text-highlight font-semibold">+18% vs last week</div>
        </div>
        <div className="flex items-end gap-2 h-40">
          {collab.map((c, i) => (
            <div key={c.label} className="flex-1 flex flex-col items-center gap-1.5">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(c.value / max) * 100}%` }}
                transition={{ delay: i * 0.05 }}
                className="w-full rounded-md bg-gradient-to-t from-primary to-accent"
              />
              <span className="text-[10px] text-muted-foreground">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl glass-strong p-4">
            <div className="flex items-center justify-between">
              <div className={`grid h-9 w-9 place-items-center rounded-xl bg-primary/10 ${s.tone}`}>
                <s.icon className="h-4 w-4" />
              </div>
              <div className="text-2xl font-semibold font-display">{s.value}</div>
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl glass-strong p-5 lg:col-span-3">
        <div className="mb-3 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-warning" />
          <div className="text-sm font-semibold">Most active members</div>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {top.map((m, i) => (
            <li key={m.id} className="rounded-xl border border-border/60 bg-surface/40 p-3">
              <div className="flex items-center gap-2">
                <div className={`grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br ${m.color} text-[10px] font-semibold text-primary-foreground`}>{m.initials}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold">{m.name}</div>
                  <div className="truncate text-[10px] text-muted-foreground">{m.role}</div>
                </div>
                <span className="text-[10px] font-mono text-highlight">#{i + 1}</span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-border/60 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${m.productivity}%` }} transition={{ duration: 0.6 }} className="h-full bg-gradient-to-r from-primary to-accent" />
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">{m.productivity} score</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
