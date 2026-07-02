import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Kanban } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const features = [
  { icon: Sparkles, title: "AI-Powered Workspace", desc: "Draft, refactor, and ship faster with built-in AI." },
  { icon: Users, title: "Team Collaboration", desc: "Real-time editing, comments, and mentions." },
  { icon: Kanban, title: "Project Management", desc: "Roadmaps, sprints, and issues in one place." },
];

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* Left branding panel */}
        <aside className="relative hidden lg:flex flex-col justify-between p-12 border-r border-border/60">
          <div>
            <Logo />
          </div>

          <div className="relative">
            {/* Floating illustration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mx-auto mb-10 h-56 w-56"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-3xl glass-strong shadow-glow"
              />
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow grid place-items-center"
              >
                <Sparkles className="h-10 w-10 text-background" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-4 bottom-2 h-20 w-32 rounded-xl glass shadow-soft grid place-items-center"
              >
                <div className="text-xs font-mono text-highlight">$ foundry init</div>
              </motion.div>
            </motion.div>

            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Where Great Software <span className="text-gradient">Takes Shape</span>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                A premium workspace for teams that plan, build, and ship together.
              </p>

              <ul className="mt-8 space-y-4">
                {features.map((f, i) => (
                  <motion.li
                    key={f.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 border border-primary/30 text-primary">
                      <f.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{f.title}</div>
                      <div className="text-xs text-muted-foreground">{f.desc}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Foundry Labs. All rights reserved.
          </div>
        </aside>

        {/* Right form panel */}
        <main className="relative flex flex-col">
          <div className="flex items-center justify-between p-6 lg:hidden">
            <Logo />
          </div>
          <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
