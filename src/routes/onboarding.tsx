import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Building2,
  Upload,
  Mail,
  Plus,
  X,
  Code2,
  Rocket,
  Briefcase,
  GraduationCap,
  Users,
} from "lucide-react";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/common";
import {
  AuthCard,
  AuthInput,
  ProgressStepper,
  WorkspaceCard,
  SuccessScreen,
} from "@/components/auth";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
  head: () => ({ meta: [{ title: "Set up your workspace — Foundry" }] }),
});

const steps = ["Welcome", "Workspace", "Team", "Workflow", "Finish"];

const workflows = [
  { id: "dev", title: "Software Development", desc: "Sprints, issues, and code reviews.", icon: <Code2 className="h-5 w-5" /> },
  { id: "startup", title: "Startup", desc: "Move fast across product and ops.", icon: <Rocket className="h-5 w-5" /> },
  { id: "freelancer", title: "Freelancer", desc: "Client projects and deliverables.", icon: <Briefcase className="h-5 w-5" /> },
  { id: "student", title: "Student", desc: "Coursework and personal projects.", icon: <GraduationCap className="h-5 w-5" /> },
  { id: "agency", title: "Agency", desc: "Multi-client, multi-team.", icon: <Users className="h-5 w-5" /> },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [invites, setInvites] = useState<string[]>([""]);
  const [workflow, setWorkflow] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <AuthLayout>
      <div className="space-y-6">
        <ProgressStepper steps={steps} current={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <AuthCard title="Welcome to Foundry">
                <div className="flex flex-col items-center text-center py-2">
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow"
                  >
                    <Sparkles className="h-9 w-9" />
                  </motion.div>
                  <h2 className="mt-5 font-display text-2xl font-semibold">Let's set you up</h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    We'll walk you through a few quick steps to configure your workspace,
                    invite your team, and pick a workflow.
                  </p>
                  <div className="mt-6 w-full">
                    <Button size="lg" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />} onClick={next}>
                      Get started
                    </Button>
                  </div>
                </div>
              </AuthCard>
            )}

            {step === 1 && (
              <AuthCard title="Create your workspace" subtitle="This is where your team collaborates.">
                <div className="space-y-4">
                  <AuthInput
                    name="workspaceName"
                    label="Workspace name"
                    placeholder="Acme Inc."
                    leftIcon={<Building2 className="h-4 w-4" />}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!slug)
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                    }}
                  />
                  <AuthInput
                    name="slug"
                    label="Workspace URL"
                    placeholder="acme"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    hint={`foundry.app/${slug || "your-workspace"}`}
                  />
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-muted-foreground">Description</label>
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      rows={3}
                      placeholder="What does your team work on?"
                      className="w-full rounded-xl bg-surface/70 border border-border/60 px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Workspace logo</label>
                    <button
                      type="button"
                      className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 bg-surface/30 py-6 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition"
                    >
                      <Upload className="h-5 w-5" />
                      Click to upload (PNG, JPG · max 2MB)
                    </button>
                  </div>
                  <Footer onBack={back} onNext={next} disabled={!name || !slug} />
                </div>
              </AuthCard>
            )}

            {step === 2 && (
              <AuthCard title="Invite your team" subtitle="Add teammates by email. You can also do this later.">
                <div className="space-y-3">
                  {invites.map((email, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="flex-1">
                        <AuthInput
                          name={`invite-${i}`}
                          type="email"
                          placeholder="teammate@company.com"
                          leftIcon={<Mail className="h-4 w-4" />}
                          value={email}
                          onChange={(e) => {
                            const copy = [...invites];
                            copy[i] = e.target.value;
                            setInvites(copy);
                          }}
                        />
                      </div>
                      {invites.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setInvites(invites.filter((_, idx) => idx !== i))}
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border/60 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition"
                          aria-label="Remove"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setInvites([...invites, ""])}
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-highlight font-medium"
                  >
                    <Plus className="h-4 w-4" /> Add another
                  </button>
                  <Footer
                    onBack={back}
                    onNext={next}
                    nextLabel="Continue"
                    secondaryLabel="Skip for now"
                    onSecondary={next}
                  />
                </div>
              </AuthCard>
            )}

            {step === 3 && (
              <AuthCard title="Choose your workflow" subtitle="We'll tailor Foundry to how you work.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {workflows.map((w) => (
                    <WorkspaceCard
                      key={w.id}
                      icon={w.icon}
                      title={w.title}
                      description={w.desc}
                      selected={workflow === w.id}
                      onClick={() => setWorkflow(w.id)}
                    />
                  ))}
                </div>
                <div className="pt-2">
                  <Footer onBack={back} onNext={next} disabled={!workflow} />
                </div>
              </AuthCard>
            )}

            {step === 4 && (
              <AuthCard title="You're all set">
                <SuccessScreen
                  title="Your workspace is ready!"
                  description="Foundry is configured and waiting. Let's get you to the dashboard."
                  action={
                    <Button
                      size="lg"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                      onClick={() => navigate({ to: "/dashboard" })}
                    >
                      Go to Dashboard
                    </Button>
                  }
                />
              </AuthCard>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AuthLayout>
  );
}

function Footer({
  onBack,
  onNext,
  disabled,
  nextLabel = "Continue",
  secondaryLabel,
  onSecondary,
}: {
  onBack: () => void;
  onNext: () => void;
  disabled?: boolean;
  nextLabel?: string;
  secondaryLabel?: string;
  onSecondary?: () => void;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />} onClick={onBack}>
        Back
      </Button>
      <div className="flex items-center gap-2">
        {secondaryLabel && (
          <Button variant="outline" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
        <Button
          onClick={onNext}
          disabled={disabled}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}
