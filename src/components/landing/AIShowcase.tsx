import { motion } from "framer-motion";
import { Sparkles, Send, FileText, ListChecks, FolderTree, GitBranch, BarChart3 } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

const prompts = [
  { icon: FileText, label: "Generate a README" },
  { icon: ListChecks, label: "Create user stories" },
  { icon: FolderTree, label: "Suggest project structure" },
  { icon: GitBranch, label: "Write release notes" },
  { icon: BarChart3, label: "Summarize sprint progress" },
];

const messages = [
  { role: "user", text: "Summarize this sprint's progress and highlight blockers." },
  {
    role: "ai",
    text: "Sprint 14 is 82% complete. 23 of 28 tasks shipped, 3 in review, 2 blocked by API auth. On track for Friday release.",
  },
  { role: "user", text: "Draft release notes from merged PRs." },
];

export function AIShowcase() {
  return (
    <Section id="ai" eyebrow="AI Assistant" align="left">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge variant="primary" className="mb-4">
            <Sparkles className="h-3 w-3" /> Built-in AI
          </Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Meet Your <span className="text-gradient">AI Development Partner</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Foundry's assistant lives inside every workspace. It reads your context, drafts artifacts,
            and keeps your team moving — without breaking flow.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prompts.map((p, i) => (
              <motion.button
                key={p.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 rounded-xl glass px-4 py-3 text-left text-sm text-foreground/90 hover:border-primary/40 transition"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-highlight ring-1 ring-primary/30">
                  <p.icon className="h-4 w-4" />
                </span>
                {p.label}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-3xl bg-primary/20 blur-3xl opacity-60" />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative glass-strong rounded-2xl shadow-glow overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-highlight ring-1 ring-primary/40">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Foundry AI</p>
                  <p className="text-[10px] text-muted-foreground">Context: Sprint 14</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Online
              </span>
            </div>
            <div className="space-y-3 p-5">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm shadow-soft"
                        : "max-w-[80%] rounded-2xl rounded-bl-sm glass px-4 py-2.5 text-sm"
                    }
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm glass px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.15 }}
                      className="h-1.5 w-1.5 rounded-full bg-highlight"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="border-t border-border/60 p-3">
              <div className="flex items-center gap-2 rounded-xl bg-background/60 px-3 py-2 ring-1 ring-border">
                <input
                  aria-label="Ask Foundry AI"
                  placeholder="Ask Foundry anything…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <Button size="sm" aria-label="Send">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
