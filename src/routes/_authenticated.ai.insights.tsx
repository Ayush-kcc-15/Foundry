import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LineChart, Activity, AlertTriangle, Bug, BookOpen, Users, ShieldAlert, CalendarClock, TrendingUp } from "lucide-react";
import { AIPageHeader, Chip } from "@/components/ai/shared";

export const Route = createFileRoute("/_authenticated/ai/insights")({
  component: Insights,
  head: () => ({ meta: [{ title: "Project Insights — Foundry" }] }),
});

const CARDS = [
  { title: "Project Health", value: "94", suffix: "/100", trend: "+3", icon: Activity, tone: "success" },
  { title: "Sprint Risk", value: "Medium", trend: "watch", icon: AlertTriangle, tone: "warning" },
  { title: "Velocity Trend", value: "42", suffix: "pts", trend: "+8%", icon: TrendingUp, tone: "primary" },
  { title: "Bug Prediction", value: "Low", trend: "-14%", icon: Bug, tone: "success" },
  { title: "Docs Coverage", value: "78%", trend: "+6pt", icon: BookOpen, tone: "primary" },
  { title: "Team Productivity", value: "92%", trend: "+4pt", icon: Users, tone: "success" },
  { title: "Risk Score", value: "23", suffix: "/100", trend: "-5", icon: ShieldAlert, tone: "warning" },
  { title: "Deadline Prediction", value: "On track", trend: "Nov 22", icon: CalendarClock, tone: "success" },
];

function Insights() {
  return (
    <>
      <AIPageHeader
        icon={LineChart}
        title="Project Insights"
        description="AI-analyzed metrics across health, velocity, risk, and delivery."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-2xl glass-strong p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-4 w-4" /></div>
              <Chip tone={c.tone as any}>{c.trend}</Chip>
            </div>
            <div className="text-2xl font-display font-semibold">
              {c.value}{c.suffix && <span className="text-sm text-muted-foreground ml-0.5">{c.suffix}</span>}
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{c.title}</div>
            <div className="mt-3 h-1 rounded-full bg-border/60 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${40 + Math.random() * 55}%` }}
                transition={{ duration: 1, delay: i * 0.04 }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl glass-strong p-5">
          <h3 className="font-display text-lg font-semibold mb-1">AI narrative</h3>
          <p className="text-sm text-muted-foreground leading-6">
            Your workspace is trending healthy this sprint. Velocity is up 8% and the bug backlog is shrinking. The main risk is
            Sprint 12 capacity — engineering is at 112% while QA is at 68%. Consider rebalancing two tasks. Documentation coverage
            crossed 78% for the first time this quarter.
          </p>
        </div>
        <div className="rounded-2xl glass-strong p-5">
          <h3 className="font-display text-lg font-semibold mb-3">Top signals</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Chip tone="success">+</Chip> Fewer regressions in main</li>
            <li className="flex items-center gap-2"><Chip tone="warning">!</Chip> Sprint 12 slightly overloaded</li>
            <li className="flex items-center gap-2"><Chip tone="primary">i</Chip> 3 stale docs detected</li>
            <li className="flex items-center gap-2"><Chip tone="success">+</Chip> PR review time ↓ 22%</li>
          </ul>
        </div>
      </div>
    </>
  );
}
