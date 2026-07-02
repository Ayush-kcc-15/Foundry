import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Pin, CheckCircle2, MessageSquare, Edit2, Trash2 } from "lucide-react";
import { getMember, type Reply } from "@/components/collaboration/data";
import { ReactionBar } from "./ReactionBar";
import { ReplyEditor } from "./ReplyEditor";
import { cn } from "@/lib/utils";

function renderBody(body: string) {
  // Very small markdown-ish renderer: code fences, mentions, inline code.
  const parts: React.ReactNode[] = [];
  const codeFence = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let m;
  let i = 0;
  while ((m = codeFence.exec(body))) {
    if (m.index > lastIndex) parts.push(<TextRun key={`t${i++}`} text={body.slice(lastIndex, m.index)} />);
    parts.push(
      <pre key={`c${i++}`} className="my-1.5 rounded-lg border border-border/60 bg-background/80 p-2.5 text-[11px] leading-relaxed overflow-x-auto">
        <code>{m[2]}</code>
      </pre>,
    );
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < body.length) parts.push(<TextRun key={`t${i++}`} text={body.slice(lastIndex)} />);
  return parts;
}

function TextRun({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const parts = text.split(/(@\w+(?:\s\w+)?|`[^`]+`)/g);
  parts.forEach((p, i) => {
    if (!p) return;
    if (p.startsWith("@")) nodes.push(<span key={i} className="rounded bg-primary/15 text-highlight px-1 font-medium">{p}</span>);
    else if (p.startsWith("`") && p.endsWith("`")) nodes.push(<code key={i} className="rounded bg-surface/70 border border-border/60 px-1 py-0.5 text-[11px] font-mono">{p.slice(1, -1)}</code>);
    else nodes.push(<span key={i}>{p}</span>);
  });
  return <>{nodes}</>;
}

export function CommentCard({
  reply, depth = 0,
}: { reply: Reply; depth?: number }) {
  const author = getMember(reply.authorId);
  const [showReply, setShowReply] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [pinned, setPinned] = useState(!!reply.pinned);
  const [resolved, setResolved] = useState(!!reply.resolved);
  const [reactions, setReactions] = useState(reply.reactions);

  const toggleReaction = (emoji: string) => {
    setReactions((prev) => {
      const existing = prev.find((r) => r.emoji === emoji);
      if (existing) {
        return prev.map((r) =>
          r.emoji === emoji ? { ...r, count: r.mine ? r.count - 1 : r.count + 1, mine: !r.mine } : r,
        ).filter((r) => r.count > 0);
      }
      return [...prev, { emoji, count: 1, mine: true }];
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("relative", depth > 0 && "ml-6 mt-3 border-l border-border/60 pl-4")}
    >
      <div className={cn("rounded-2xl p-3.5", pinned ? "border border-primary/30 bg-primary/[0.06]" : "border border-border/60 bg-surface/40", resolved && "opacity-70")}>
        <div className="mb-2 flex items-center gap-2">
          <div className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ${author?.color || "from-primary to-accent"} text-[10px] font-semibold text-primary-foreground`}>
            {author?.initials || "?"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-xs font-semibold">{author?.name || "Unknown"}</span>
              {pinned && <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/15 text-highlight border border-primary/30 text-[9px] px-1.5 py-0.5"><Pin className="h-2.5 w-2.5" /> Pinned</span>}
              {resolved && <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 text-success border border-success/30 text-[9px] px-1.5 py-0.5"><CheckCircle2 className="h-2.5 w-2.5" /> Resolved</span>}
            </div>
            <div className="text-[10px] text-muted-foreground">{author?.role} · {reply.time}</div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu((s) => !s)}
              className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
              aria-label="More"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="absolute right-0 top-full mt-1 z-10 w-40 rounded-xl border border-border/60 bg-surface/95 backdrop-blur shadow-glow p-1"
                >
                  <MenuItem icon={<Pin className="h-3 w-3" />} label={pinned ? "Unpin" : "Pin"} onClick={() => { setPinned(!pinned); setShowMenu(false); }} />
                  <MenuItem icon={<CheckCircle2 className="h-3 w-3" />} label={resolved ? "Reopen" : "Resolve"} onClick={() => { setResolved(!resolved); setShowMenu(false); }} />
                  <MenuItem icon={<Edit2 className="h-3 w-3" />} label="Edit" onClick={() => setShowMenu(false)} />
                  <MenuItem icon={<Trash2 className="h-3 w-3" />} label="Delete" danger onClick={() => setShowMenu(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="text-sm text-foreground/90 leading-relaxed">
          {renderBody(reply.body)}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <ReactionBar reactions={reactions} onToggle={toggleReaction} />
          <button
            onClick={() => setShowReply((s) => !s)}
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition"
          >
            <MessageSquare className="h-3 w-3" /> Reply
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showReply && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-6 mt-2 overflow-hidden"
          >
            <ReplyEditor placeholder={`Reply to ${author?.name || "them"}…`} onSubmit={() => setShowReply(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {reply.replies?.map((child) => (
        <CommentCard key={child.id} reply={child} depth={depth + 1} />
      ))}
    </motion.div>
  );
}

function MenuItem({ icon, label, onClick, danger }: { icon: React.ReactNode; label: string; onClick?: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition",
        danger ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5",
      )}
    >
      {icon} {label}
    </button>
  );
}
