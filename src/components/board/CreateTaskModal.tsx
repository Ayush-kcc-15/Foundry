import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common";
import {
  PRIORITIES, STATUSES, LABELS, USERS, SPRINTS, MILESTONES,
  type Priority, type Status, type TaskType, TYPE_META, type Task,
} from "@/components/task/data";
import { LabelChip, PriorityBadge, TypeBadge } from "@/components/task/Labels";

const TASK_TYPES: TaskType[] = ["Feature","Bug","Improvement","Research","Documentation","Refactor","Hotfix","Chore"];

export function CreateTaskModal({
  open, onClose, onCreate, defaultStatus,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (t: Task) => void;
  defaultStatus?: Status;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => initForm(defaultStatus));

  function reset() { setStep(0); setForm(initForm(defaultStatus)); }

  function submit() {
    const t: Task = {
      id: `t-new-${Date.now()}`,
      key: `FDR-${200 + Math.floor(Math.random() * 800)}`,
      title: form.title || "Untitled task",
      description: form.description,
      type: form.type,
      priority: form.priority,
      status: form.status,
      assignee: form.assignee,
      reporter: "ay",
      due: form.due ? new Date(form.due).toISOString() : new Date().toISOString(),
      labels: form.labels,
      tech: form.tech,
      estimateH: form.estimateH,
      loggedH: 0,
      storyPoints: form.storyPoints,
      checklist: [],
      comments: [],
      attachments: [],
      activity: [{ id: "an1", kind: "created", text: "Task created", time: "just now", who: "Ayush Kumar" }],
      subtasks: [],
      dependencies: form.dependencies,
      related: [],
      sprintId: form.sprintId,
      epic: form.epic || null,
      milestone: form.milestone || null,
      createdAt: new Date().toISOString(),
      order: 9999,
    };
    onCreate(t);
    reset();
    onClose();
  }

  const steps = ["Basics", "Assignment", "Details", "Review"];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-50 w-[min(720px,94vw)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-glow overflow-hidden"
            role="dialog"
          >
            <header className="flex items-center justify-between border-b border-border/60 px-6 py-4">
              <div>
                <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" /> New task
                </div>
                <h2 className="mt-1 font-display text-lg font-semibold">{steps[step]}</h2>
              </div>
              <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-surface" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Stepper */}
            <div className="flex items-center gap-2 px-6 pt-4">
              {steps.map((s, i) => (
                <div key={s} className="flex-1">
                  <div className={cn(
                    "h-1 rounded-full transition-colors",
                    i <= step ? "bg-gradient-to-r from-primary to-accent" : "bg-border/60",
                  )} />
                  <div className={cn(
                    "mt-1 text-[10px] font-medium uppercase tracking-wider",
                    i === step ? "text-foreground" : "text-muted-foreground",
                  )}>{s}</div>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {step === 0 && (
                    <>
                      <Input label="Task name" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="e.g. Add drag-and-drop to Kanban" />
                      <TextArea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
                      <div className="grid gap-3 sm:grid-cols-3">
                        <Select label="Task type" value={form.type} onChange={(v) => setForm({ ...form, type: v as TaskType })} options={TASK_TYPES} />
                        <Select label="Priority"  value={form.priority} onChange={(v) => setForm({ ...form, priority: v as Priority })} options={[...PRIORITIES]} />
                        <Select label="Status"    value={form.status}   onChange={(v) => setForm({ ...form, status: v as Status })}     options={[...STATUSES]} />
                      </div>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Select label="Assignee" value={form.assignee} onChange={(v) => setForm({ ...form, assignee: v })} options={USERS.map((u) => u.id)} render={(id) => USERS.find((u) => u.id === id)?.name ?? id} />
                        <Select label="Sprint" value={form.sprintId ?? ""} onChange={(v) => setForm({ ...form, sprintId: v || null })} options={["", ...SPRINTS.map((s) => s.id)]} render={(id) => id ? (SPRINTS.find((s) => s.id === id)?.name ?? id) : "None"} />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <Input label="Epic" value={form.epic} onChange={(v) => setForm({ ...form, epic: v })} placeholder="e.g. Kanban" />
                        <NumberInput label="Story points"   value={form.storyPoints} onChange={(v) => setForm({ ...form, storyPoints: v })} />
                        <NumberInput label="Estimate (hrs)" value={form.estimateH}   onChange={(v) => setForm({ ...form, estimateH: v })} />
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div>
                        <Label>Labels</Label>
                        <div className="flex flex-wrap gap-1.5">
                          {LABELS.map((l) => {
                            const on = form.labels.includes(l.name);
                            return (
                              <button
                                key={l.name}
                                onClick={() => setForm({
                                  ...form,
                                  labels: on ? form.labels.filter((x) => x !== l.name) : [...form.labels, l.name],
                                })}
                                className={cn(
                                  "rounded-full border px-2.5 py-1 text-[11px] font-medium transition",
                                  on ? l.color : "border-border/60 bg-surface/50 text-muted-foreground hover:text-foreground",
                                )}
                              >
                                {l.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <Label>Technology tags</Label>
                        <input
                          type="text"
                          value={form.tech.join(", ")}
                          onChange={(e) => setForm({ ...form, tech: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })}
                          className="w-full rounded-xl border border-border/60 bg-surface/50 px-3 py-2 text-sm outline-none focus:border-primary/60"
                          placeholder="React, PostgreSQL, Docker"
                        />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Select label="Milestone" value={form.milestone ?? ""} onChange={(v) => setForm({ ...form, milestone: v || null })} options={["", ...MILESTONES.map((m) => m.id)]} render={(id) => id ? (MILESTONES.find((m) => m.id === id)?.name ?? id) : "None"} />
                        <Input label="Due date" type="date" value={form.due} onChange={(v) => setForm({ ...form, due: v })} />
                      </div>
                      <Input label="Dependencies (comma-separated task keys)" value={form.dependencies.join(", ")} onChange={(v) => setForm({ ...form, dependencies: v.split(",").map((x) => x.trim()).filter(Boolean) })} placeholder="FDR-101, FDR-104" />
                    </>
                  )}
                  {step === 3 && (
                    <div className="rounded-2xl border border-border/60 bg-surface/40 p-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <TypeBadge value={form.type} />
                        <PriorityBadge value={form.priority} />
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{form.status}</span>
                      </div>
                      <div className="font-display text-lg font-semibold">{form.title || "Untitled task"}</div>
                      {form.description && <p className="text-sm text-muted-foreground whitespace-pre-wrap">{form.description}</p>}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <ReviewRow k="Assignee"  v={USERS.find((u) => u.id === form.assignee)?.name ?? "—"} />
                        <ReviewRow k="Sprint"    v={SPRINTS.find((s) => s.id === form.sprintId)?.name ?? "—"} />
                        <ReviewRow k="Points"    v={String(form.storyPoints)} />
                        <ReviewRow k="Estimate"  v={`${form.estimateH}h`} />
                        <ReviewRow k="Due"       v={form.due || "—"} />
                        <ReviewRow k="Milestone" v={MILESTONES.find((m) => m.id === form.milestone)?.name ?? "—"} />
                      </div>
                      {form.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {form.labels.map((l) => <LabelChip key={l} name={l} />)}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <footer className="flex items-center justify-between border-t border-border/60 bg-surface/60 px-6 py-4">
              <button
                onClick={step === 0 ? onClose : () => setStep(step - 1)}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {step === 0 ? "Cancel" : (<><ChevronLeft className="h-3.5 w-3.5" /> Back</>)}
              </button>
              <div className="text-[10px] text-muted-foreground">Step {step + 1} of {steps.length}</div>
              {step < steps.length - 1 ? (
                <Button size="sm" rightIcon={<ChevronRight className="h-3.5 w-3.5" />} onClick={() => setStep(step + 1)}>
                  Continue
                </Button>
              ) : (
                <Button size="sm" leftIcon={<Check className="h-3.5 w-3.5" />} onClick={submit}>
                  Create task
                </Button>
              )}
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function initForm(status?: Status) {
  return {
    title: "",
    description: "",
    type: "Feature" as TaskType,
    priority: "Medium" as Priority,
    status: (status ?? "Todo") as Status,
    assignee: "ay",
    sprintId: "s-24" as string | null,
    epic: "",
    storyPoints: 3,
    estimateH: 5,
    labels: [] as string[],
    tech: [] as string[],
    milestone: "m-2" as string | null,
    due: "",
    dependencies: [] as string[],
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">{children}</div>;
}
function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border/60 bg-surface/50 px-3 py-2 text-sm outline-none focus:border-primary/60"
      />
    </div>
  );
}
function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-xl border border-border/60 bg-surface/50 px-3 py-2 text-sm outline-none focus:border-primary/60"
        placeholder="What needs to be done?"
      />
    </div>
  );
}
function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-xl border border-border/60 bg-surface/50 px-3 py-2 text-sm outline-none focus:border-primary/60"
      />
    </div>
  );
}
function Select({ label, value, onChange, options, render }: { label: string; value: string; onChange: (v: string) => void; options: string[]; render?: (v: string) => string }) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border/60 bg-surface/50 px-3 py-2 text-sm outline-none focus:border-primary/60"
      >
        {options.map((o) => <option key={o} value={o}>{render ? render(o) : o}</option>)}
      </select>
    </div>
  );
}
function ReviewRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 py-1.5">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
