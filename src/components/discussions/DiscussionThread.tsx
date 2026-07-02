import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, Share2, CheckCircle2, Pin, Paperclip } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { DISCUSSION_REPLIES, getMember, type Discussion } from "@/components/collaboration/data";
import { CommentCard } from "@/components/comments/CommentCard";
import { ReplyEditor } from "@/components/comments/ReplyEditor";
import { ReactionBar } from "@/components/comments/ReactionBar";
import { cn } from "@/lib/utils";

export function DiscussionThread({ discussion }: { discussion: Discussion }) {
  const author = getMember(discussion.authorId);
  const replies = DISCUSSION_REPLIES[discussion.id] || [];
  const [bookmark, setBookmark] = useState(false);
  const [resolved, setResolved] = useState(!!discussion.resolved);

  return (
    <div className="space-y-5">
      <Link to="/discussions" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> All discussions
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl glass-strong p-5"
      >
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {discussion.pinned && <Tag color="bg-primary/15 text-highlight border-primary/30" icon={<Pin className="h-2.5 w-2.5" />}>Pinned</Tag>}
          {resolved && <Tag color="bg-success/15 text-success border-success/30" icon={<CheckCircle2 className="h-2.5 w-2.5" />}>Resolved</Tag>}
          <span className="rounded-full border border-border/60 bg-surface/50 px-2 py-0.5 text-[10px] text-muted-foreground">{discussion.category}</span>
          {discussion.tags.map((t) => (
            <span key={t} className="rounded-md bg-surface/50 border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">#{t}</span>
          ))}
        </div>

        <h1 className="font-display text-2xl font-semibold">{discussion.title}</h1>

        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ${author?.color} text-[10px] font-semibold text-primary-foreground`}>{author?.initials}</div>
          <span className="text-foreground/90 font-medium">{author?.name}</span>
          <span>· {discussion.lastActivity} ago</span>
          <span>· {discussion.views} views</span>
        </div>

        <div className="prose prose-invert mt-4 max-w-none text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
          {discussion.body}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
          <ReactionBar reactions={[{ emoji: "👍", count: 8, mine: true }, { emoji: "🚀", count: 3 }]} onToggle={() => {}} />
          <div className="flex items-center gap-1.5">
            <IconAction onClick={() => setBookmark((s) => !s)} active={bookmark} label="Bookmark">
              <Bookmark className={cn("h-3.5 w-3.5", bookmark && "fill-current")} />
            </IconAction>
            <IconAction label="Share">
              <Share2 className="h-3.5 w-3.5" />
            </IconAction>
            <IconAction label="Attach">
              <Paperclip className="h-3.5 w-3.5" />
            </IconAction>
            <button
              onClick={() => setResolved((s) => !s)}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition",
                resolved
                  ? "border-success/30 bg-success/15 text-success"
                  : "border-border/60 bg-surface/50 text-muted-foreground hover:border-success/40 hover:text-success",
              )}
            >
              <CheckCircle2 className="h-3 w-3" /> {resolved ? "Resolved" : "Mark resolved"}
            </button>
          </div>
        </div>
      </motion.article>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Replies · {replies.length}</h2>
        {replies.map((r) => <CommentCard key={r.id} reply={r} />)}
      </div>

      <div>
        <ReplyEditor onSubmit={() => {}} />
      </div>
    </div>
  );
}

function Tag({ color, icon, children }: { color: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[10px] font-medium", color)}>
      {icon} {children}
    </span>
  );
}

function IconAction({ children, label, active, onClick }: { children: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg border transition",
        active
          ? "border-primary/40 bg-primary/15 text-primary"
          : "border-border/60 bg-surface/50 text-muted-foreground hover:text-foreground hover:border-primary/40",
      )}
    >
      {children}
    </button>
  );
}
