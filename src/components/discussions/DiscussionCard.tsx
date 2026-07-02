import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { MessageSquare, Eye, Pin, CheckCircle2 } from "lucide-react";
import { getMember, type Discussion } from "@/components/collaboration/data";
import { cn } from "@/lib/utils";

const catColor: Record<string, string> = {
  General: "bg-muted text-muted-foreground border-border",
  Engineering: "bg-primary/15 text-highlight border-primary/30",
  Design: "bg-accent/15 text-accent border-accent/30",
  Announcements: "bg-warning/15 text-warning border-warning/30",
  Ideas: "bg-highlight/15 text-highlight border-highlight/30",
  "Q&A": "bg-success/15 text-success border-success/30",
  "Bug Reports": "bg-destructive/15 text-destructive border-destructive/30",
  "Feature Requests": "bg-accent/15 text-accent border-accent/30",
};

export function DiscussionCard({ discussion, i = 0 }: { discussion: Discussion; i?: number }) {
  const author = getMember(discussion.authorId);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.03 }}
      whileHover={{ y: -2 }}
    >
      <Link
        to="/discussions/$discussionId"
        params={{ discussionId: discussion.id }}
        className="group block rounded-2xl glass-strong p-4 hover:border-primary/40 transition"
      >
        <div className="flex items-start gap-3">
          <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br ${author?.color || "from-primary to-accent"} text-xs font-semibold text-primary-foreground`}>
            {author?.initials || "?"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {discussion.pinned && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/15 text-highlight border border-primary/30 text-[9px] px-1.5 py-0.5">
                  <Pin className="h-2.5 w-2.5" /> Pinned
                </span>
              )}
              {discussion.resolved && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 text-success border border-success/30 text-[9px] px-1.5 py-0.5">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Resolved
                </span>
              )}
              <span className={cn("rounded-full border px-1.5 py-0.5 text-[9px] font-medium", catColor[discussion.category])}>
                {discussion.category}
              </span>
            </div>
            <h3 className="mt-1.5 text-sm font-semibold group-hover:text-primary transition line-clamp-1">
              {discussion.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{discussion.excerpt}</p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
              <span className="truncate">by <span className="text-foreground/90">{author?.name}</span></span>
              <span className="inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {discussion.replies}</span>
              <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" /> {discussion.views}</span>
              <span>· {discussion.lastActivity} ago</span>
              <div className="ml-auto flex gap-1">
                {discussion.tags.map((t) => (
                  <span key={t} className="rounded-md bg-surface/50 border border-border/60 px-1.5 py-0.5 text-[10px]">#{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
