import { motion } from "framer-motion";
import {
  FolderPlus,
  ListChecks,
  Users2,
  BookOpen,
  Activity,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";

type Step = { icon: LucideIcon; title: string; description: string };

const steps: Step[] = [
  { icon: FolderPlus, title: "Create Workspace", description: "Spin up a home for your product." },
  { icon: ListChecks, title: "Plan Tasks", description: "Break work into sprints and boards." },
  { icon: Users2, title: "Collaborate", description: "Invite teammates and align in real time." },
  { icon: BookOpen, title: "Document", description: "Capture decisions with living docs." },
  { icon: Activity, title: "Track Activity", description: "Follow progress with analytics." },
  { icon: Rocket, title: "Ship Product", description: "Release with confidence and history." },
];

export function WorkflowTimeline() {
  return (
    <Section
      id="workflow"
      align="center"
      eyebrow="Workflow"
      title="From Idea to Release"
      subtitle="A guided path that keeps every team member aligned from kickoff to launch."
    >
      {/* Desktop horizontal */}
      <div className="relative hidden lg:block">
        <div className="absolute left-0 right-0 top-6 h-px bg-border" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
          className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-primary via-accent to-transparent"
        />
        <div className="relative grid grid-cols-6 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background ring-1 ring-primary/40 shadow-glow">
                <s.icon className="h-5 w-5 text-highlight" />
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-primary">
                Step {i + 1}
              </p>
              <h4 className="mt-1 text-sm font-semibold">{s.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground max-w-[180px]">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet vertical */}
      <div className="relative lg:hidden">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent"
        />
        <ul className="space-y-8">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pl-16"
            >
              <div className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full bg-background ring-1 ring-primary/40 shadow-glow">
                <s.icon className="h-5 w-5 text-highlight" />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-primary">
                Step {i + 1}
              </p>
              <h4 className="mt-1 text-base font-semibold">{s.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
