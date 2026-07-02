import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { Sparkles, X, Send, Wand2, FileText, ListTodo, MessageSquareText, Zap } from "lucide-react";
import { AISkeleton } from "./shared";

function contextFor(path: string) {
  if (path.startsWith("/projects/")) return { label: "Project", suggestion: "Generate a project summary." };
  if (path.startsWith("/projects")) return { label: "Projects", suggestion: "Highlight the top at-risk projects." };
  if (path.startsWith("/discussions")) return { label: "Discussions", suggestion: "Summarize this discussion." };
  if (path.startsWith("/team")) return { label: "Team", suggestion: "Who's overloaded this sprint?" };
  if (path.startsWith("/activity")) return { label: "Activity", suggestion: "Summarize today's activity." };
  if (path.startsWith("/notifications")) return { label: "Inbox", suggestion: "Cluster my unread notifications." };
  if (path.startsWith("/ai")) return { label: "AI Workspace", suggestion: "What can you help me with here?" };
  if (path.startsWith("/dashboard")) return { label: "Dashboard", suggestion: "Summarize today's workspace activity." };
  return { label: "Foundry", suggestion: "What would you like to do?" };
}

export function AICommandCenter() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ctx = contextFor(pathname);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setOpen((s) => !s);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setReply(null);
    setQ("");
  }, [open]);

  const ask = (prompt?: string) => {
    const text = prompt ?? q;
    if (!text.trim()) return;
    setLoading(true);
    setReply(null);
    setTimeout(() => {
      setLoading(false);
      setReply(
        `Here's a quick take on **${ctx.label.toLowerCase()}**:\n\n${text}\n\n— I've drafted 3 recommended next actions and flagged 1 blocker. Open the AI Workspace to expand this into a full plan.`,
      );
    }, 900);
  };

  const quicks = [
    { icon: FileText, label: "Generate README" },
    { icon: ListTodo, label: "Generate tasks" },
    { icon: MessageSquareText, label: "Summarize discussion" },
    { icon: Wand2, label: "Improve documentation" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col border-l border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl"
            aria-label="AI Command Center"
          >
            <header className="flex items-center gap-2 border-b border-border/60 p-4">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">AI Command Center</div>
                <div className="text-[11px] text-muted-foreground">
                  Context: <span className="text-highlight">{ctx.label}</span> · ⌘J
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-3">
                <div className="flex items-center gap-2 text-[11px] font-medium text-highlight mb-1.5">
                  <Zap className="h-3.5 w-3.5" /> Suggested for this page
                </div>
                <button
                  onClick={() => ask(ctx.suggestion)}
                  className="text-left text-sm hover:text-highlight transition"
                >
                  {ctx.suggestion}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quicks.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => ask(q.label)}
                    className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface/40 p-2.5 text-left text-xs hover:border-primary/40 hover:bg-surface transition"
                  >
                    <q.icon className="h-3.5 w-3.5 text-primary" />
                    {q.label}
                  </button>
                ))}
              </div>

              {loading && (
                <div className="rounded-2xl border border-border/60 bg-surface/40 p-4">
                  <AISkeleton lines={5} />
                </div>
              )}

              {reply && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border/60 bg-surface/40 p-4 text-sm leading-6 whitespace-pre-wrap"
                >
                  {reply}
                </motion.div>
              )}
            </div>

            <div className="border-t border-border/60 p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-border/60 bg-surface/40 p-2">
                <textarea
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      ask();
                    }
                  }}
                  placeholder={`Ask AI about ${ctx.label.toLowerCase()}…`}
                  className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none min-h-[36px] max-h-32"
                />
                <button
                  onClick={() => ask()}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow hover:opacity-95 transition"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-1.5 text-[10px] text-muted-foreground/70 text-center">
                Placeholder responses · Backend AI ships in a later phase
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
