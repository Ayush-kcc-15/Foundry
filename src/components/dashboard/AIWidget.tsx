import { motion } from "framer-motion";
import { Sparkles, ArrowRight, FileText, ListTodo, BookMarked, MessageSquareText } from "lucide-react";

const suggestions = [
  { icon: FileText, label: "Generate README", desc: "for Foundry Web" },
  { icon: MessageSquareText, label: "Summarize Sprint 11", desc: "6 min read" },
  { icon: ListTodo, label: "Create tasks from notes", desc: "5 new items" },
  { icon: BookMarked, label: "Generate documentation", desc: "Auth module" },
];

export function AIWidget() {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-strong p-5">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-center gap-2.5 mb-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow"
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold">AI Assistant</h3>
            <p className="text-[11px] text-muted-foreground">Hi Ayush · what should we build?</p>
          </div>
        </div>

        <div className="space-y-1.5 mb-3">
          {suggestions.map((s, i) => (
            <motion.button
              key={s.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex w-full items-center gap-2.5 rounded-xl border border-border/60 bg-surface/40 px-3 py-2 text-left hover:border-primary/40 hover:bg-surface transition"
            >
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium">{s.label}</div>
                <div className="truncate text-[10px] text-muted-foreground">{s.desc}</div>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
            </motion.button>
          ))}
        </div>

        <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-glow hover:opacity-95 transition">
          <Sparkles className="h-4 w-4" /> Ask AI
        </button>
      </div>
    </div>
  );
}
