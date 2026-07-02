import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Sparkles, X, FileText, ListTodo, MessageSquareText, Wand2, MessageCircle } from "lucide-react";

const items = [
  { icon: ListTodo, label: "Generate task", to: "/ai/tasks" },
  { icon: FileText, label: "Generate README", to: "/ai/readme" },
  { icon: MessageSquareText, label: "Summarize discussion", to: "/ai/meeting" },
  { icon: Wand2, label: "Generate docs", to: "/ai/docs" },
  { icon: MessageCircle, label: "Ask AI", to: "/ai/chat" },
];

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-16 right-0 w-64 rounded-2xl glass-strong p-2 shadow-glow"
          >
            <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              AI quick actions
            </div>
            {items.map((it) => (
              <Link
                key={it.label}
                to={it.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
              >
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                  <it.icon className="h-3.5 w-3.5" />
                </div>
                {it.label}
              </Link>
            ))}
            <div className="mt-1 border-t border-border/60 px-2 pt-2 pb-1 text-[10px] text-muted-foreground/70">
              Tip: press ⌘J anywhere
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((s) => !s)}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow"
        aria-label="AI quick actions"
      >
        <motion.span
          aria-hidden
          animate={{ opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-primary/40 blur-xl -z-10"
        />
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </motion.button>
    </div>
  );
}
