import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { getMember, type ChatMessage } from "@/components/collaboration/data";
import { cn } from "@/lib/utils";

export function MessageBubble({ msg, mine }: { msg: ChatMessage; mine?: boolean }) {
  const author = getMember(msg.authorId);
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-end gap-2", mine && "flex-row-reverse")}
    >
      <div className={`grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br ${author?.color || "from-primary to-accent"} text-[9px] font-semibold text-primary-foreground`}>
        {author?.initials}
      </div>
      <div className={cn(
        "relative max-w-[80%] rounded-2xl px-3 py-2 text-xs",
        mine
          ? "bg-primary text-primary-foreground rounded-br-sm"
          : "border border-border/60 bg-surface/60 rounded-bl-sm",
      )}>
        {!mine && <div className="text-[10px] font-semibold text-highlight mb-0.5">{author?.name}</div>}
        <div className="whitespace-pre-wrap">{msg.body}</div>
        <div className={cn("mt-1 text-[9px]", mine ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {msg.time}{msg.pinned && <span className="ml-1 inline-flex items-center gap-0.5"><Pin className="inline h-2.5 w-2.5" /> pinned</span>}
        </div>
      </div>
    </motion.div>
  );
}
