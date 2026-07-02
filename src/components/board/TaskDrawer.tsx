import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Calendar, Clock, Flag, Tag as TagIcon, Users, GitBranch, Link2,
  Paperclip, MessageSquare, CheckSquare, Sparkles, ListTree, History, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common";
import type { Task } from "@/components/task/data";
import { STATUSES, PRIORITIES, getUser, formatDue, SPRINTS, checklistProgress } from "@/components/task/data";
import { Avatar, LabelChip, PriorityBadge, StatusBadge, TypeBadge } from "@/components/task/Labels";
import { ActivityTimeline } from "@/components/task/ActivityTimeline";

export function TaskDrawer({
  task, open, onClose, onUpdate,
}: {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (t: Task) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && task && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 h-full w-full sm:w-[560px] lg:w-[640px] border-l border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Task details"
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5">
              <div className="flex items-center gap-2 min-w-0">
                <TypeBadge value={task.type} />
                <span className="text-xs font-mono text-muted-foreground">{task.key}</span>
                <StatusBadge value={task.status} />
              </div>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              <div className="px-5 py-5 space-y-6">
                {/* Title */}
                <h2 className="font-display text-2xl font-semibold leading-tight">{task.title}</h2>

                {/* Meta grid */}
                <section className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-border/60 bg-surface/40 p-4 text-sm">
                  <Field icon={<Users className="h-3.5 w-3.5" />} label="Assignee">
                    <div className="flex items-center gap-2">
                      <Avatar userId={task.assignee} size={22} />
                      <span>{getUser(task.assignee).name}</span>
                    </div>
                  </Field>
                  <Field icon={<Flag className="h-3.5 w-3.5" />} label="Priority">
                    <PriorityBadge value={task.priority} />
                  </Field>
                  <Field icon={<Sparkles className="h-3.5 w-3.5" />} label="Sprint">
                    <span>{SPRINTS.find((s) => s.id === task.sprintId)?.name ?? "—"}</span>
                  </Field>
                  <Field icon={<Calendar className="h-3.5 w-3.5" />} label="Due date">
                    <span>{formatDue(task.due)}</span>
                  </Field>
                  <Field icon={<Clock className="h-3.5 w-3.5" />} label="Estimate">
                    <span>{task.estimateH}h ({task.loggedH}h logged)</span>
                  </Field>
                  <Field icon={<span className="text-highlight font-bold text-[10px]">SP</span>} label="Story points">
                    <span className="font-semibold">{task.storyPoints}</span>
                  </Field>
                </section>

                {/* Description */}
                <section>
                  <SectionTitle icon={<ListTree className="h-3.5 w-3.5" />} title="Description" />
                  <div className="rounded-2xl border border-border/60 bg-surface/40 p-4 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {task.description}
                  </div>
                </section>

                {/* Labels */}
                {task.labels.length > 0 && (
                  <section>
                    <SectionTitle icon={<TagIcon className="h-3.5 w-3.5" />} title="Labels" />
                    <div className="flex flex-wrap gap-1.5">
                      {task.labels.map((l) => <LabelChip key={l} name={l} />)}
                    </div>
                  </section>
                )}

                {/* Checklist */}
                {task.checklist.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-2">
                      <SectionTitle icon={<CheckSquare className="h-3.5 w-3.5" />} title="Checklist" nomb />
                      <span className="text-[11px] text-muted-foreground">{checklistProgress(task)}% complete</span>
                    </div>
                    <ul className="rounded-2xl border border-border/60 bg-surface/40 divide-y divide-border/40">
                      {task.checklist.map((c) => (
                        <li key={c.id} className="flex items-center gap-2 px-3 py-2 text-sm">
                          <button
                            onClick={() =>
                              onUpdate({
                                ...task,
                                checklist: task.checklist.map((x) => x.id === c.id ? { ...x, done: !x.done } : x),
                              })
                            }
                            className={cn(
                              "grid h-4 w-4 place-items-center rounded border transition",
                              c.done ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-primary",
                            )}
                            aria-label={c.done ? "Uncheck" : "Check"}
                          >
                            {c.done && <CheckSquare className="h-3 w-3" />}
                          </button>
                          <span className={cn(c.done && "line-through text-muted-foreground")}>{c.label}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Subtasks */}
                {task.subtasks.length > 0 && (
                  <section>
                    <SectionTitle icon={<ListTree className="h-3.5 w-3.5" />} title="Subtasks" />
                    <ul className="rounded-2xl border border-border/60 bg-surface/40 divide-y divide-border/40">
                      {task.subtasks.map((s) => (
                        <li key={s.id} className="flex items-center justify-between px-3 py-2 text-sm">
                          <span className={cn(s.done && "line-through text-muted-foreground")}>{s.title}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Attachments */}
                {task.attachments.length > 0 && (
                  <section>
                    <SectionTitle icon={<Paperclip className="h-3.5 w-3.5" />} title="Attachments" />
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {task.attachments.map((a) => (
                        <li key={a.id} className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface/40 p-2.5 text-xs">
                          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
                            <Paperclip className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">{a.name}</div>
                            <div className="text-[10px] text-muted-foreground">{a.size}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Dependencies / Related */}
                {(task.dependencies.length > 0 || task.related.length > 0) && (
                  <section className="grid gap-3 sm:grid-cols-2">
                    {task.dependencies.length > 0 && (
                      <div>
                        <SectionTitle icon={<GitBranch className="h-3.5 w-3.5" />} title="Dependencies" />
                        <div className="space-y-1">
                          {task.dependencies.map((d) => <RelPill key={d} k={d} />)}
                        </div>
                      </div>
                    )}
                    {task.related.length > 0 && (
                      <div>
                        <SectionTitle icon={<Link2 className="h-3.5 w-3.5" />} title="Related" />
                        <div className="space-y-1">
                          {task.related.map((d) => <RelPill key={d} k={d} />)}
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Comments */}
                <section>
                  <SectionTitle icon={<MessageSquare className="h-3.5 w-3.5" />} title={`Comments · ${task.comments.length}`} />
                  <div className="space-y-3">
                    {task.comments.map((c) => (
                      <div key={c.id} className="rounded-2xl border border-border/60 bg-surface/40 p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-primary-foreground">{c.initials}</div>
                          <span className="text-xs font-semibold">{c.author}</span>
                          <span className="text-[10px] text-muted-foreground">· {c.time}</span>
                        </div>
                        <p className="text-sm text-foreground/90">{c.body}</p>
                      </div>
                    ))}
                    <div className="rounded-2xl border border-border/60 bg-surface/40 p-3">
                      <textarea
                        rows={2}
                        placeholder="Write a comment…"
                        className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      />
                      <div className="flex justify-end mt-2">
                        <Button size="sm">Post</Button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Activity */}
                <section>
                  <SectionTitle icon={<History className="h-3.5 w-3.5" />} title="Activity" />
                  <ActivityTimeline items={task.activity} />
                </section>
              </div>
            </div>

            {/* Footer status controls */}
            <footer className="border-t border-border/60 bg-surface/60 backdrop-blur px-5 py-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</label>
                <select
                  value={task.status}
                  onChange={(e) => onUpdate({ ...task, status: e.target.value as Task["status"] })}
                  className="rounded-lg bg-card border border-border/60 px-2 py-1 text-xs font-medium outline-none focus:border-primary/60"
                >
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[10px] uppercase tracking-wider text-muted-foreground">Priority</label>
                <select
                  value={task.priority}
                  onChange={(e) => onUpdate({ ...task, priority: e.target.value as Task["priority"] })}
                  className="rounded-lg bg-card border border-border/60 px-2 py-1 text-xs font-medium outline-none focus:border-primary/60"
                >
                  {PRIORITIES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionTitle({ icon, title, nomb }: { icon: React.ReactNode; title: string; nomb?: boolean }) {
  return (
    <h3 className={cn("flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground", !nomb && "mb-2")}>
      {icon}{title}
    </h3>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon}{label}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function RelPill({ k }: { k: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-surface/50 px-2 py-1 text-xs font-mono">
      <span className="text-muted-foreground">→</span>
      <span>{k}</span>
    </div>
  );
}
