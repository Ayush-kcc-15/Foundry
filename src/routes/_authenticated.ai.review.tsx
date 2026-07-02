import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Zap, Lock, Eye, Lightbulb, Activity } from "lucide-react";
import { AIPageHeader, Field, textareaCls, GenerateButton, AISkeleton, Chip } from "@/components/ai/shared";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/ai/review")({
  component: CodeReview,
  head: () => ({ meta: [{ title: "Code Review — Foundry" }] }),
});

const CATS = [
  { key: "best", label: "Best Practices", icon: ShieldCheck, tone: "primary" },
  { key: "perf", label: "Performance", icon: Zap, tone: "warning" },
  { key: "sec", label: "Security", icon: Lock, tone: "destructive" },
  { key: "read", label: "Readability", icon: Eye, tone: "default" },
  { key: "sugg", label: "Suggestions", icon: Lightbulb, tone: "primary" },
  { key: "cx", label: "Complexity", icon: Activity, tone: "warning" },
];

const FINDINGS = [
  { cat: "sec", severity: "High", title: "Unescaped user input in query", desc: "String interpolation into SQL query — use parameterized queries." },
  { cat: "perf", severity: "Medium", title: "N+1 query in loop", desc: "Batch fetch related entities with a JOIN or dataloader." },
  { cat: "best", severity: "Low", title: "Missing error boundary", desc: "Wrap network calls in try/catch and surface a user-visible error." },
  { cat: "read", severity: "Low", title: "Function exceeds 40 lines", desc: "Split `processOrder()` into smaller helpers." },
  { cat: "sugg", severity: "Info", title: "Extract magic number", desc: "Replace `86400` with a `SECONDS_PER_DAY` constant." },
  { cat: "cx", severity: "Medium", title: "Cyclomatic complexity: 14", desc: "Consider a strategy pattern to simplify branching." },
];

function CodeReview() {
  const [code, setCode] = useState(`function getUser(id) {\n  const q = "SELECT * FROM users WHERE id = " + id;\n  return db.query(q);\n}`);
  const [findings, setFindings] = useState<typeof FINDINGS | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    setLoading(true);
    setFindings(null);
    setTimeout(() => {
      setFindings(FINDINGS);
      setLoading(false);
    }, 900);
  };

  return (
    <>
      <AIPageHeader
        icon={ShieldCheck}
        title="AI Code Review"
        description="Paste a snippet — get instant feedback across security, performance, readability, and more."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl glass-strong p-5 space-y-3">
          <Field label="Paste code">
            <textarea className={textareaCls + " font-mono !min-h-[300px]"} value={code} onChange={(e) => setCode(e.target.value)} />
          </Field>
          <GenerateButton onClick={analyze} loading={loading}>Run AI review</GenerateButton>
        </div>

        <div className="space-y-3">
          {loading && <div className="rounded-2xl glass-strong p-5"><AISkeleton lines={10} /></div>}
          {!loading && !findings && <div className="rounded-2xl glass-strong p-8 text-center text-sm text-muted-foreground">Paste code and run the review.</div>}
          {findings && (
            <>
              <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
                {CATS.map((c) => {
                  const count = findings.filter((f) => f.cat === c.key).length;
                  return (
                    <div key={c.key} className="rounded-xl glass-strong p-3">
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1"><c.icon className="h-3.5 w-3.5" /> {c.label}</div>
                      <div className="text-xl font-display font-semibold">{count}</div>
                    </div>
                  );
                })}
              </div>

              {findings.map((f, i) => {
                const cat = CATS.find((c) => c.key === f.cat)!;
                const tone = f.severity === "High" ? "destructive" : f.severity === "Medium" ? "warning" : f.severity === "Low" ? "primary" : "default";
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-2xl glass-strong p-4 flex items-start gap-3"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <cat.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-sm font-semibold">{f.title}</div>
                        <Chip tone={tone as any}>{f.severity}</Chip>
                        <Chip>{cat.label}</Chip>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
