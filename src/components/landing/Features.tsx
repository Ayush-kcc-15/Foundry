import { motion } from "framer-motion";
import {
  LayoutGrid,
  Kanban,
  Sparkles,
  FileText,
  History,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Badge } from "@/components/common/Badge";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
};

const features: Feature[] = [
  {
    icon: LayoutGrid,
    title: "Project Workspaces",
    description: "Organize every initiative into focused workspaces with roles, goals, and context.",
    badge: "Core",
  },
  {
    icon: Kanban,
    title: "Kanban Boards",
    description: "Visualize work with drag-and-drop boards, WIP limits, swimlanes, and smart filters.",
    badge: "Planning",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description: "Draft specs, generate tasks, and summarize sprints with a context-aware AI partner.",
    badge: "AI",
  },
  {
    icon: FileText,
    title: "Markdown Documentation",
    description: "Write beautiful docs with live preview, embeds, code blocks, and mentions.",
    badge: "Docs",
  },
  {
    icon: History,
    title: "Version History",
    description: "Track every change with granular history, diffs, and one-click restore.",
    badge: "Reliability",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Comment, mention, assign, and react in real time — wherever the work happens.",
    badge: "Teams",
  },
];

export function Features() {
  return (
    <Section
      id="features"
      align="center"
      eyebrow="Features"
      title="Everything You Need to Build Better Software"
      subtitle="Foundry combines planning, collaboration, documentation, analytics, and AI into one powerful workspace."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl glass-strong p-6",
              "transition-all duration-300 hover:border-primary/40",
            )}
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex items-start justify-between">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.05 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-highlight ring-1 ring-primary/30"
              >
                <f.icon className="h-6 w-6" />
              </motion.div>
              <Badge variant="primary">{f.badge}</Badge>
            </div>
            <h3 className="relative mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
            <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
