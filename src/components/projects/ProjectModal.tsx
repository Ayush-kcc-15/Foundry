import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Plus,
  Sparkles,
  FileText,
  History,
} from "lucide-react";
import { Button } from "@/components/common";
import { TECH_OPTIONS, CATEGORIES, STATUSES, PRIORITIES } from "./data";
import { cn } from "@/lib/utils";

const steps = ["Basics", "Tech", "Team", "Settings", "Review"];
const colors = [
  "from-primary to-accent",
  "from-accent to-highlight",
  "from-warning to-destructive",
  "from-highlight to-primary",
  "from-success to-primary",
  "from-destructive to-warning",
];

export function ProjectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [icon, setIcon] = useState("F");
  const [color, setColor] = useState(colors[0]);
  const [tech, setTech] = useState<string[]>(["React"]);
  const [members, setMembers] = useState<string[]>([""]);
  const [visibility, setVisibility] = useState<"Private" | "Team" | "Public">("Team");
  const [status, setStatus] = useState<string>("Planning");
  const [priority, setPriority] = useState<string>("Medium");
  const [aiOn, setAiOn] = useState(true);
  const [docsOn, setDocsOn] = useState(true);
  const [versionOn, setVersionOn] = useState(true);

  function reset() {
    setStep(0);
    setName("");
    setDesc("");
    setTech(["React"]);
    setMembers([""]);
  }

  function close() {
    onClose();
    setTimeout(reset, 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl glass-strong shadow-glow overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
              <div>
                <h2 className="font-display text-lg font-semibold">Create project</h2>
                <p className="text-[11px] text-muted-foreground">Step {step + 1} of {steps.length} · {steps[step]}</p>
              </div>
              <button
                onClick={close}
                className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress */}
            <div className="px-6 pt-4">
              <div className="flex items-center gap-2">
                {steps.map((s, i) => (
                  <div key={s} className="flex flex-1 items-center gap-2">
                    <div
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] font-semibold",
                        i < step && "bg-primary border-primary text-primary-foreground",
                        i === step && "border-primary text-primary bg-primary/10",
                        i > step && "border-border/60 text-muted-foreground",
                      )}
                    >
                      {i < step ? <Check className="h-3 w-3" /> : i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="relative h-px flex-1 bg-border/60 overflow-hidden">
                        <motion.div
                          animate={{ scaleX: i < step ? 1 : 0 }}
                          style={{ transformOrigin: "left" }}
                          className="absolute inset-0 bg-primary"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto">
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
                      <Field label="Project name">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Foundry Web Platform"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Description">
                        <textarea
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          rows={3}
                          placeholder="What is this project about?"
                          className={cn(inputCls, "min-h-[76px] resize-none")}
                        />
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Category">
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={inputCls}
                          >
                            {CATEGORIES.map((c) => (
                              <option key={c} value={c} className="bg-background">{c}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Project icon (1-2 chars)">
                          <input
                            value={icon}
                            maxLength={2}
                            onChange={(e) => setIcon(e.target.value.toUpperCase())}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                      <Field label="Color theme">
                        <div className="flex flex-wrap gap-2">
                          {colors.map((c) => (
                            <button
                              key={c}
                              onClick={() => setColor(c)}
                              className={cn(
                                "h-9 w-9 rounded-xl bg-gradient-to-br transition ring-2",
                                c,
                                color === c ? "ring-primary ring-offset-2 ring-offset-background" : "ring-transparent",
                              )}
                              aria-label={`Color ${c}`}
                            />
                          ))}
                        </div>
                      </Field>
                      <Field label="Banner image">
                        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 bg-surface/30 py-4 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition">
                          <Upload className="h-4 w-4" /> Upload banner (PNG, JPG · max 2MB)
                        </button>
                      </Field>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <Field label="Selected technologies">
                        <div className="flex flex-wrap gap-1.5 min-h-9 p-2 rounded-xl bg-surface/50 border border-border/60">
                          {tech.length === 0 && <span className="text-xs text-muted-foreground px-1">None selected</span>}
                          {tech.map((t) => (
                            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 text-[11px] font-medium">
                              {t}
                              <button onClick={() => setTech(tech.filter((x) => x !== t))} aria-label={`Remove ${t}`}>
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </Field>
                      <Field label="Available">
                        <div className="flex flex-wrap gap-1.5">
                          {TECH_OPTIONS.filter((t) => !tech.includes(t)).map((t) => (
                            <button
                              key={t}
                              onClick={() => setTech([...tech, t])}
                              className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-surface/50 px-2.5 py-1 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-foreground transition"
                            >
                              <Plus className="h-3 w-3" /> {t}
                            </button>
                          ))}
                        </div>
                      </Field>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <Field label="Invite members by email">
                        <div className="space-y-2">
                          {members.map((m, i) => (
                            <div key={i} className="flex gap-2">
                              <input
                                value={m}
                                onChange={(e) => {
                                  const copy = [...members];
                                  copy[i] = e.target.value;
                                  setMembers(copy);
                                }}
                                placeholder="teammate@company.com"
                                className={inputCls}
                              />
                              <select className={cn(inputCls, "w-32 shrink-0")}>
                                <option className="bg-background">Member</option>
                                <option className="bg-background">Admin</option>
                                <option className="bg-background">Viewer</option>
                              </select>
                              {members.length > 1 && (
                                <button
                                  onClick={() => setMembers(members.filter((_, idx) => idx !== i))}
                                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border/60 text-muted-foreground hover:text-destructive hover:border-destructive/40"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => setMembers([...members, ""])}
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-highlight font-medium"
                          >
                            <Plus className="h-3.5 w-3.5" /> Add another
                          </button>
                        </div>
                      </Field>
                      <Field label="Visibility">
                        <div className="grid gap-2 sm:grid-cols-3">
                          {(["Private", "Team", "Public"] as const).map((v) => (
                            <button
                              key={v}
                              onClick={() => setVisibility(v)}
                              className={cn(
                                "rounded-xl border p-3 text-left transition",
                                visibility === v
                                  ? "border-primary bg-primary/10"
                                  : "border-border/60 bg-surface/40 hover:border-primary/40",
                              )}
                            >
                              <div className="text-sm font-medium">{v}</div>
                              <div className="text-[10px] text-muted-foreground mt-0.5">
                                {v === "Private" && "Only you and invitees"}
                                {v === "Team" && "Everyone in the workspace"}
                                {v === "Public" && "Anyone with the link"}
                              </div>
                            </button>
                          ))}
                        </div>
                      </Field>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Status">
                          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
                            {STATUSES.map((s) => <option key={s} className="bg-background">{s}</option>)}
                          </select>
                        </Field>
                        <Field label="Priority">
                          <select value={priority} onChange={(e) => setPriority(e.target.value)} className={inputCls}>
                            {PRIORITIES.map((p) => <option key={p} className="bg-background">{p}</option>)}
                          </select>
                        </Field>
                        <Field label="Start date">
                          <input type="date" className={inputCls} />
                        </Field>
                        <Field label="Deadline">
                          <input type="date" className={inputCls} />
                        </Field>
                      </div>
                      <div className="space-y-2 pt-2">
                        <Toggle icon={<Sparkles className="h-4 w-4" />} label="AI Assistant" desc="Suggest tasks & summaries" on={aiOn} onChange={setAiOn} />
                        <Toggle icon={<FileText className="h-4 w-4" />} label="Documentation" desc="Enable docs space" on={docsOn} onChange={setDocsOn} />
                        <Toggle icon={<History className="h-4 w-4" />} label="Version History" desc="Track changes over time" on={versionOn} onChange={setVersionOn} />
                      </div>
                    </>
                  )}

                  {step === 4 && (
                    <div className="space-y-3">
                      <div className="rounded-2xl border border-border/60 bg-surface/40 p-4 flex items-center gap-3">
                        <div className={cn("grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-sm font-bold text-primary-foreground", color)}>
                          {icon || "?"}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate">{name || "Untitled project"}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{desc || "No description yet."}</div>
                        </div>
                      </div>
                      <Summary label="Category" value={category} />
                      <Summary label="Tech stack" value={tech.join(", ") || "—"} />
                      <Summary label="Visibility" value={visibility} />
                      <Summary label="Status / Priority" value={`${status} · ${priority}`} />
                      <Summary label="Members" value={members.filter(Boolean).length ? `${members.filter(Boolean).length} invited` : "None invited"} />
                      <Summary label="Modules" value={[aiOn && "AI", docsOn && "Docs", versionOn && "Versions"].filter(Boolean).join(", ") || "None"} />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border/60 px-6 py-4">
              <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 0 && !name}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Continue
                </Button>
              ) : (
                <Button onClick={close} rightIcon={<Check className="h-4 w-4" />}>
                  Create project
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-xl bg-surface/70 border border-border/60 px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  icon,
  label,
  desc,
  on,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="w-full flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 px-3 py-2.5 hover:border-primary/40 transition"
    >
      <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg", on ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground")}>
        {icon}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[11px] text-muted-foreground">{desc}</div>
      </div>
      <div className={cn("h-5 w-9 rounded-full transition relative", on ? "bg-primary" : "bg-border/60")}>
        <motion.span
          animate={{ x: on ? 16 : 0 }}
          className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-background shadow"
        />
      </div>
    </button>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 text-sm border-b border-border/40 pb-2 last:border-0">
      <span className="w-32 shrink-0 text-xs text-muted-foreground">{label}</span>
      <span className="min-w-0 flex-1 text-foreground">{value}</span>
    </div>
  );
}
