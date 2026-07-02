import { motion } from "framer-motion";
import { FolderKanban, Users, CheckCircle2, Rocket } from "lucide-react";
import { Section } from "@/components/common";

const stats = [
  {
    icon: FolderKanban,
    value: "10,000+",
    label: "Projects managed across engineering teams",
  },
  {
    icon: Users,
    value: "1,200+",
    label: "Teams building with Foundry every day",
  },
  {
    icon: CheckCircle2,
    value: "2M+",
    label: "Tasks completed and shipped to production",
  },
  {
    icon: Rocket,
    value: "99.9%",
    label: "Deployment success across all workspaces",
  },
];

export function PlatformStats() {
  return (
    <Section eyebrow="By the numbers" title="A platform teams rely on" align="center">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_rgba(20,184,166,0.35)]"
            >
              <div
                aria-hidden
                className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 font-display text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {s.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
