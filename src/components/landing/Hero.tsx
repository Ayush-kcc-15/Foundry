import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Users, KanbanSquare, FileText, History } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button, Container } from "@/components/common";
import { WorkspacePreview } from "./WorkspacePreview";
import { ScrollIndicator } from "./ScrollIndicator";

const badges = [
  { icon: Sparkles, label: "AI Powered" },
  { icon: Users, label: "Team Collaboration" },
  { icon: KanbanSquare, label: "Project Tracking" },
  { icon: FileText, label: "Documentation" },
  { icon: History, label: "Version History" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      {/* background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.72 0.14 180 / 0.25), transparent 60%), radial-gradient(ellipse 60% 40% at 90% 20%, oklch(0.85 0.12 178 / 0.15), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "oklch(0.72 0.14 180 / 0.18)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* particles */}
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent/60"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 37) % 100}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Now in public beta
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]"
            >
              Build Better Software{" "}
              <span className="text-gradient">Together</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Foundry helps developers and teams plan projects, collaborate seamlessly,
              document every decision, and ship software faster—all from one beautiful
              workspace.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />} onClick={() => navigate({ to: "/register" })}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" leftIcon={<Play className="h-4 w-4" />}>
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-8 flex flex-wrap gap-2"
            >
              {badges.map((b) => {
                const Icon = b.icon;
                return (
                  <motion.span
                    key={b.label}
                    whileHover={{ y: -2, scale: 1.03 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    <Icon className="h-3 w-3 text-primary" />
                    {b.label}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>

          <div className="relative">
            <WorkspacePreview />
          </div>
        </div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}
