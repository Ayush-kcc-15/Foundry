import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Check, X, Send, CornerDownRight } from "lucide-react";
import type { DocComment } from "./data";
import { cn } from "@/lib/utils";

export function CommentsPanel({ comments: initial }: { comments: DocComment[] }) {
  const [comments, setComments] = useState<DocComment[]>(initial);
  const [draft, setDraft] = useState("");
  const [replyDraftFor, setReplyDraftFor] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const addComment = () => {
    if (!draft.trim()) return;
    setComments([{ id: `c-${Date.now()}`, author: "You", initials: "YO", time: "just now", text: draft.trim(), replies: [] }, ...comments]);
    setDraft("");
  };
  const toggleResolved = (id: string) =>
    setComments((cs) => cs.map((c) => (c.id === id ? { ...c, resolved: !c.resolved } : c)));
  const removeComment = (id: string) => setComments((cs) => cs.filter((c) => c.id !== id));
  const submitReply = (id: string) => {
    if (!replyText.trim()) return;
    setComments((cs) => cs.map((c) =>
      c.id === id ? { ...c, replies: [...(c.replies ?? []), { author: "You", initials: "YO", time: "just now", text: replyText.trim() }] } : c,
    ));
    setReplyText(""); setReplyDraftFor(null);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <MessageSquare className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">Comments</h3>
        <span className="ml-auto rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] text-primary">{comments.filter((c) => !c.resolved).length}</span>
      </div>

      <div className="border-b border-border/60 p-3">
        <div className="rounded-xl border border-border/60 bg-background/50 p-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a comment…"
            className="w-full resize-none bg-transparent text-xs outline-none placeholder:text-muted-foreground/70"
            rows={2}
          />
          <div className="mt-1 flex justify-end">
            <button
              onClick={addComment}
              className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2 py-1 text-[10px] font-medium text-primary hover:bg-primary/25"
            >
              <Send className="h-3 w-3" /> Comment
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <AnimatePresence initial={false}>
          {comments.map((c) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className={cn(
                "rounded-xl border p-2.5",
                c.resolved ? "border-border/40 bg-white/[0.02] opacity-60" : "border-border/60 bg-surface/60",
              )}
            >
              <div className="flex items-start gap-2">
                <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-semibold text-primary-foreground">
                  {c.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{c.author}</span>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                    {c.resolved && <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-[9px] text-success">Resolved</span>}
                  </div>
                  <p className="mt-1 text-xs text-foreground/90">{c.text}</p>

                  {c.replies && c.replies.length > 0 && (
                    <div className="mt-2 space-y-1.5 border-l border-border/60 pl-3">
                      {c.replies.map((r, i) => (
                        <div key={i} className="text-[11px]">
                          <span className="font-medium">{r.author}</span>{" "}
                          <span className="text-muted-foreground">· {r.time}</span>
                          <p className="text-foreground/80">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {replyDraftFor === c.id ? (
                    <div className="mt-2 flex items-center gap-1.5">
                      <CornerDownRight className="h-3 w-3 text-muted-foreground" />
                      <input
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submitReply(c.id)}
                        className="flex-1 rounded-md border border-border/60 bg-background/50 px-2 py-1 text-[11px] outline-none focus:border-primary/40"
                        placeholder="Reply…"
                      />
                      <button onClick={() => submitReply(c.id)} className="text-primary hover:opacity-80"><Send className="h-3 w-3" /></button>
                    </div>
                  ) : (
                    <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
                      <button onClick={() => setReplyDraftFor(c.id)} className="hover:text-foreground">Reply</button>
                      <button onClick={() => toggleResolved(c.id)} className="inline-flex items-center gap-0.5 hover:text-foreground">
                        <Check className="h-3 w-3" /> {c.resolved ? "Reopen" : "Resolve"}
                      </button>
                      <button onClick={() => removeComment(c.id)} className="ml-auto hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {comments.length === 0 && (
          <div className="grid place-items-center rounded-xl border border-dashed border-border/60 p-6 text-center">
            <MessageSquare className="h-4 w-4 text-muted-foreground mb-1.5" />
            <div className="text-xs text-muted-foreground">No comments yet.</div>
          </div>
        )}
      </div>
    </div>
  );
}
