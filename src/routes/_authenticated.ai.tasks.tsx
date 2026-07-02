import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ListTodo, CheckCircle2 } from "lucide-react";
import { AIPageHeader, Field, inputCls, textareaCls, GenerateButton, AISkeleton, Chip } from "@/components/ai/shared";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/ai/tasks")({
  component: TaskGenerator,
  head: () => ({ meta: [{ title: "Task Generator — Foundry" }] }),
});

type Task = {
  title: string;
  effort: string;
  points: number;
  labels: string[];
  deps?: string;
  priority: "High" | "Medium" | "Low";
};

const SAMPLE_TASKS: Task[] = [
  { title: "Design DB schema for payments", effort: "4h", points: 3, labels: ["backend", "schema"], priority: "High" },
  { title: "Build POST /payments endpoint", effort: "6h", points: 5, labels: ["backend", "api"], deps: "DB schema", priority: "High" },
  { title: "Add Stripe SDK integration", effort: "5h", points: 5, labels: ["backend", "integration"], priority: "High" },
  { title: "Payment method selector UI", effort: "4h", points: 3, labels: ["frontend"], priority: "Medium" },
  { title: "Webhook handler for events", effort: "3h", points: 3, labels: ["backend", "webhooks"], deps: "POST /payments", priority: "Medium" },
  { title: "Add success/error screens", effort: "2h", points: 2, labels: ["frontend", "ux"], priority: "Medium" },
  { title: "Write end-to-end tests", effort: "3h", points: 3, labels: ["qa"], priority: "Low" },
];

function TaskGenerator() {
  const [feature, setFeature] = useState("Add Stripe subscription payments to the billing module.");
  const [priority, setPriority] = useState("High");
  const [sprint, setSprint] = useState("Sprint 12");
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTasks(null);
    setTimeout(() => {
      setTasks(SAMPLE_TASKS);
      setLoading(false);
    }, 900);
  };

  return (
    <>
      <AIPageHeader
        icon={ListTodo}
        title="Task Generator"
        description="Turn a feature description into a sprint-ready task list with points, effort, and dependencies."
      />
      <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div className="rounded-2xl glass-strong p-5 space-y-3">
          <Field label="Feature description">
            <textarea className={textareaCls} value={feature} onChange={(e) => setFeature(e.target.value)} />
          </Field>
          <Field label="Priority">
            <select className={inputCls} value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>High</option><option>Medium</option><option>Low</option>
            </select>
          </Field>
          <Field label="Sprint">
            <input className={inputCls} value={sprint} onChange={(e) => setSprint(e.target.value)} />
          </Field>
          <GenerateButton onClick={generate} loading={loading}>Generate tasks</GenerateButton>
        </div>

        <div className="space-y-3">
          {loading && <div className="rounded-2xl glass-strong p-5"><AISkeleton lines={8} /></div>}
          {!loading && !tasks && (
            <div className="rounded-2xl glass-strong p-8 text-center text-sm text-muted-foreground">
              Describe your feature and generate a smart task list.
            </div>
          )}
          {tasks && (
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-2xl glass-strong px-4 py-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Suggested for </span>
                  <span className="font-semibold">{sprint}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {tasks.length} tasks · {tasks.reduce((a, t) => a + t.points, 0)} points
                </div>
              </div>
              {tasks.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl glass-strong p-4 flex items-start gap-3"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="text-sm font-semibold">{t.title}</div>
                      <Chip tone={t.priority === "High" ? "destructive" : t.priority === "Medium" ? "warning" : "default"}>{t.priority}</Chip>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span>{t.effort}</span>
                      <span>·</span>
                      <span>{t.points} pts</span>
                      {t.deps && (<><span>·</span><span>depends on <span className="text-highlight">{t.deps}</span></span></>)}
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {t.labels.map((l) => <Chip key={l} tone="primary">{l}</Chip>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
