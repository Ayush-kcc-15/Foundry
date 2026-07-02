import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquareText, FileText, CheckCircle2, AlertTriangle, GitBranch, Users } from "lucide-react";
import { AIPageHeader, Field, textareaCls, GenerateButton, AISkeleton } from "@/components/ai/shared";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/ai/meeting")({
  component: MeetingSummary,
  head: () => ({ meta: [{ title: "Meeting Summary — Foundry" }] }),
});

const SAMPLE = {
  summary:
    "The team reviewed sprint 12 progress, aligned on the billing scope, and agreed to move the analytics rollout to sprint 13. Stripe integration is on track; UI is the current bottleneck.",
  actions: [
    { text: "Complete Stripe webhook handler", owner: "Ayush" },
    { text: "Ship payment method selector UI", owner: "Priya" },
    { text: "Draft billing FAQ for support", owner: "Rohan" },
  ],
  decisions: ["Move analytics rollout to sprint 13", "Adopt feature flags for billing preview"],
  risks: ["Stripe webhook retries not yet load-tested", "QA capacity may slip"],
  followUps: ["Design review Thursday 3pm", "Legal review of billing copy"],
};

function MeetingSummary() {
  const [notes, setNotes] = useState(`- Reviewed sprint 12 progress\n- Stripe integration on track\n- UI slipping — Priya to prioritize this week\n- Analytics rollout deferred\n- Decision: adopt feature flags`);
  const [out, setOut] = useState<typeof SAMPLE | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setOut(null);
    setTimeout(() => { setOut(SAMPLE); setLoading(false); }, 900);
  };

  return (
    <>
      <AIPageHeader
        icon={MessageSquareText}
        title="Meeting Summary"
        description="Paste raw meeting notes — get a clean summary, action items, decisions, and risks."
      />
      <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div className="rounded-2xl glass-strong p-5 space-y-3">
          <Field label="Meeting notes"><textarea className={textareaCls + " !min-h-[260px]"} value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
          <GenerateButton onClick={generate} loading={loading}>Summarize meeting</GenerateButton>
        </div>

        <div className="space-y-3">
          {loading && <div className="rounded-2xl glass-strong p-5"><AISkeleton lines={10} /></div>}
          {!loading && !out && <div className="rounded-2xl glass-strong p-8 text-center text-sm text-muted-foreground">Paste your meeting notes and summarize.</div>}
          {out && (
            <>
              <Section icon={FileText} title="Summary">
                <p className="text-sm text-muted-foreground leading-6">{out.summary}</p>
              </Section>
              <Section icon={CheckCircle2} title="Action items">
                <ul className="space-y-1.5">
                  {out.actions.map((a) => (
                    <li key={a.text} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="flex-1">{a.text}</span>
                      <span className="text-[11px] text-highlight">@ {a.owner}</span>
                    </li>
                  ))}
                </ul>
              </Section>
              <Section icon={GitBranch} title="Decisions">
                <ul className="text-sm text-muted-foreground space-y-1">{out.decisions.map((d) => <li key={d}>• {d}</li>)}</ul>
              </Section>
              <Section icon={AlertTriangle} title="Risks">
                <ul className="text-sm text-muted-foreground space-y-1">{out.risks.map((r) => <li key={r}>• {r}</li>)}</ul>
              </Section>
              <Section icon={Users} title="Follow-ups">
                <ul className="text-sm text-muted-foreground space-y-1">{out.followUps.map((r) => <li key={r}>• {r}</li>)}</ul>
              </Section>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Section({ icon: Icon, title, children }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-strong p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-3.5 w-3.5" /></div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
