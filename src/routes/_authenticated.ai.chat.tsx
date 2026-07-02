import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Plus,
  Pin,
  Search,
  Copy,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  Download,
  Share2,
  Check,
} from "lucide-react";
import { AIPageHeader } from "@/components/ai/shared";
import { SAMPLE_CHATS, SUGGESTED_PROMPTS } from "@/components/ai/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/ai/chat")({
  component: AIChat,
  head: () => ({ meta: [{ title: "AI Chat — Foundry" }] }),
});

type Msg = { id: string; role: "user" | "ai"; text: string };

const placeholderResponse = (q: string) => `Great — here's a first pass on **"${q}"**.

I'd approach it in three steps:
1. Clarify the desired outcome and constraints.
2. Draft the structure with sensible defaults.
3. Iterate with quick feedback from your team.

\`\`\`ts
// Example snippet
export function foundry(input: string) {
  return input.trim().toLowerCase();
}
\`\`\`

Want me to expand any of these steps or turn them into sprint tasks?`;

function AIChat() {
  const [chats, setChats] = useState(SAMPLE_CHATS);
  const [activeId, setActiveId] = useState(SAMPLE_CHATS[0].id);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: t };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "ai", text: placeholderResponse(t) }]);
      setTyping(false);
    }, 900);
  };

  const filtered = chats.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <AIPageHeader
        icon={Sparkles}
        title="AI Chat"
        description="Have a conversation with your workspace. Ask anything about your projects."
      />

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] h-[calc(100vh-260px)] min-h-[560px]">
        {/* Sidebar */}
        <aside className="rounded-2xl glass-strong flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border/60 space-y-2">
            <button
              onClick={() => {
                const id = crypto.randomUUID();
                setChats((c) => [{ id, title: "New chat", pinned: false, date: "Now" }, ...c]);
                setActiveId(id);
                setMessages([]);
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-2 text-sm font-semibold shadow-glow hover:opacity-95"
            >
              <Plus className="h-4 w-4" /> New chat
            </button>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chats"
                className="w-full rounded-lg border border-border/60 bg-surface/40 pl-8 pr-2 py-1.5 text-xs focus:outline-none focus:border-primary/40"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {filtered.filter((c) => c.pinned).length > 0 && (
              <div className="px-2 pt-1 pb-1 text-[10px] uppercase tracking-wider text-muted-foreground">Pinned</div>
            )}
            {filtered.filter((c) => c.pinned).map((c) => (
              <ChatItem key={c.id} c={c} active={c.id === activeId} onClick={() => setActiveId(c.id)} />
            ))}
            <div className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-wider text-muted-foreground">History</div>
            {filtered.filter((c) => !c.pinned).map((c) => (
              <ChatItem key={c.id} c={c} active={c.id === activeId} onClick={() => setActiveId(c.id)} />
            ))}
          </div>
        </aside>

        {/* Main */}
        <section className="rounded-2xl glass-strong flex flex-col overflow-hidden min-w-0">
          <header className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">
                {chats.find((c) => c.id === activeId)?.title ?? "New chat"}
              </div>
              <div className="text-[11px] text-muted-foreground">Foundry AI · Preview</div>
            </div>
            <IconAction icon={Share2} label="Share" />
            <IconAction icon={Download} label="Export" />
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow mb-3"
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
                <h3 className="font-display text-xl font-semibold">How can I help you build today?</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Ask about your projects, generate docs, plan sprints, or review code.
                </p>
                <div className="mt-6 grid gap-2 w-full max-w-lg sm:grid-cols-2">
                  {SUGGESTED_PROMPTS.map((p) => (
                    <button
                      key={p.title}
                      onClick={() => send(p.title)}
                      className="rounded-xl border border-border/60 bg-surface/40 p-3 text-left hover:border-primary/40 hover:bg-surface transition"
                    >
                      <div className="text-sm font-medium">{p.title}</div>
                      <div className="text-[11px] text-muted-foreground">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <MessageBubble key={m.id} m={m} onRegenerate={() => send("Regenerate the previous answer")} />
                ))}
              </AnimatePresence>
            )}
            {typing && <TypingIndicator />}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border/60 p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-border/60 bg-surface/40 p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Message Foundry AI…"
                className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none min-h-[38px] max-h-40"
              />
              <button
                onClick={() => send()}
                className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow hover:opacity-95 transition"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function ChatItem({ c, active, onClick }: { c: (typeof SAMPLE_CHATS)[number]; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition",
        active ? "bg-primary/10 text-foreground border border-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-white/5",
      )}
    >
      {c.pinned && <Pin className="h-3 w-3 text-highlight shrink-0" />}
      <span className="truncate flex-1">{c.title}</span>
      <span className="text-[10px] text-muted-foreground/70">{c.date}</span>
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-surface/40 px-3 py-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
            className="h-1.5 w-1.5 rounded-full bg-primary"
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ m, onRegenerate }: { m: Msg; onRegenerate: () => void }) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  if (m.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] rounded-2xl bg-primary text-primary-foreground px-4 py-2.5 text-sm">
          {m.text}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="min-w-0 max-w-[85%]">
        <div className="rounded-2xl border border-border/60 bg-surface/40 px-4 py-3 text-sm leading-6 space-y-2">
          {m.text.split("\n\n").map((block, i) => {
            if (block.startsWith("```")) {
              const code = block.replace(/```(\w+)?/g, "").trim();
              return (
                <pre key={i} className="rounded-lg bg-background/70 border border-border/60 p-3 text-[12px] font-mono overflow-x-auto">
                  {code}
                </pre>
              );
            }
            return (
              <p key={i} className="whitespace-pre-wrap"
                 dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
              />
            );
          })}
        </div>
        <div className="mt-1.5 flex items-center gap-1">
          <button
            onClick={() => {
              navigator.clipboard.writeText(m.text);
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            }}
            className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
            aria-label="Copy"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <button onClick={onRegenerate} className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5" aria-label="Regenerate">
            <RotateCw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setFeedback(feedback === "up" ? null : "up")}
            className={cn("grid h-7 w-7 place-items-center rounded-lg hover:bg-white/5", feedback === "up" ? "text-success" : "text-muted-foreground hover:text-foreground")}
            aria-label="Like"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setFeedback(feedback === "down" ? null : "down")}
            className={cn("grid h-7 w-7 place-items-center rounded-lg hover:bg-white/5", feedback === "down" ? "text-destructive" : "text-muted-foreground hover:text-foreground")}
            aria-label="Dislike"
          >
            <ThumbsDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function IconAction({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button
      title={label}
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
