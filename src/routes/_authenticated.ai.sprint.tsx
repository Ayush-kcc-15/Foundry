import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, AlertTriangle, TrendingUp } from "lucide-react";
import { AIPageHeader, Field, inputCls, textareaCls, GenerateButton, AISkeleton, Chip } from "@/components/ai/shared";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/ai/sprint")({
  component: SprintPlanner,
  head: () => ({ meta: [{ title: "Sprint Planner — Foundry" }] }),
});

function SprintPlanner() {
  const [goal, setGoal] = useState("Launch the billing module MVP with Stripe payments.");
  const [size, setSize] = useState("5");
  const [duration, setDuration] = useState("2");
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setPlan(null);
    setTimeout(() => {
      setPlan({
        velocity: 42,
        risk: "Medium",
        risks: [
          "Stripe webhook infra new to team",
          "Front-end capacity tight in week 2",
        ],
        timeline: [
          { week: "Week 1", items: ["Kickoff & schema", "Stripe integration spike", "Payment API endpoints"] },
          { week: "Week 2", items: ["Payment UI", "Webhooks & retries", "E2E tests", "Beta launch to internal users"] },
        ],
        tasks: [
          { title: "Design DB schema", pts: 3, priority: "High" },
          { title: "Stripe SDK integration", pts: 5, priority: "High" },
          { title: "Payment API endpoints", pts: 5, priority: "High" },
          { title: "Payment method selector", pts: 3, priority: "Medium" },
          { title: "Webhook handler", pts: 3, priority: "Medium" },
          { title: "E2E tests", pts: 3, priority: "Low" },
        ],
      });
      setLoading(false);
    }, 900);
  };

  return (
    <>
      <AIPageHeader
        icon={Calendar}
        title="Sprint Planner"
        description="AI-drafted sprint plans with tasks, velocity estimates, timeline, and risk indicators."
      />
      <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div className="rounded-2xl glass-strong p-5 space-y-3">
          <Field label="Sprint goal"><textarea className={textareaCls} value={goal} onChange={(e) => setGoal(e.target.value)} /></Field>
          <Field label="Team size"><input className={inputCls} value={size} onChange={(e) => setSize(e.target.value)} /></Field>
          <Field label="Duration (weeks)"><input className={inputCls} value={duration} onChange={(e) => setDuration(e.target.value)} /></Field>
          <GenerateButton onClick={generate} loading={loading}>Generate sprint plan</GenerateButton>
        </div>

        <div className="space-y-3">
          {loading && <div className="rounded-2xl glass-strong p-5"><AISkeleton lines={10} /></div>}
          {!loading && !plan && <div className="rounded-2xl glass-strong p-8 text-center text-sm text-muted-foreground">Configure the sprint and generate.</div>}
          {plan && (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <StatBox icon={TrendingUp} label="Velocity estimate" value={`${plan.velocity} pts`} tone="primary" />
                <StatBox icon={AlertTriangle} label="Risk level" value={plan.risk} tone="warning" />
                <StatBox icon={Calendar} label="Duration" value={`${duration} weeks · ${size} devs`} tone="default" />
              </div>

              <div className="rounded-2xl glass-strong p-5">
                <h3 className="text-sm font-semibold mb-3">Suggested tasks</h3>
                <div className="space-y-2">
                  {plan.tasks.map((t: any, i: number) => (
                    <motion.div
                      key={t.title}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 p-3"
                    >
                      <Chip tone={t.priority === "High" ? "destructive" : t.priority === "Medium" ? "warning" : "default"}>{t.priority}</Chip>
                      <div className="flex-1 text-sm">{t.title}</div>
                      <div className="text-xs text-muted-foreground">{t.pts} pts</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl glass-strong p-5">
                <h3 className="text-sm font-semibold mb-3">Timeline</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {plan.timeline.map((w: any) => (
                    <div key={w.week} className="rounded-xl border border-border/60 bg-surface/40 p-3">
                      <div className="text-xs font-semibold text-highlight mb-1.5">{w.week}</div>
                      <ul className="space-y-1 text-sm">
                        {w.items.map((it: string) => <li key={it} className="text-muted-foreground">• {it}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl glass-strong p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <h3 className="text-sm font-semibold">Risk indicators</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {plan.risks.map((r: string) => <li key={r}>• {r}</li>)}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function StatBox({ icon: Icon, label, value, tone }: any) {
  return (
    <div className="rounded-2xl glass-strong p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Icon className="h-3.5 w-3.5" /> {label}</div>
      <div className="text-xl font-display font-semibold">{value}</div>
      <div className="mt-1"><Chip tone={tone}>AI estimate</Chip></div>
    </div>
  );
}
