import { motion } from "framer-motion";
import { FileText, Star, Pin, MessageSquare, Clock, GitBranch } from "lucide-react";
import type { DocNode } from "./data";
import { readingTime } from "./data";
import { DocTagList } from "./Tags";
import { cn } from "@/lib/utils";

export function DocumentCard({
  doc, onOpen, dense,
}: { doc: DocNode; onOpen: (id: string) => void; dense?: boolean }) {
  const Icon = doc.icon ?? FileText;
  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={() => onOpen(doc.id)}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-border/60 bg-surface/60 p-4 text-left transition hover:border-primary/40 hover:shadow-glow",
        dense && "p-3",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold truncate">{doc.title}</h3>
            {doc.pinned && <Pin className="h-3 w-3 text-warning" />}
            {doc.favorite && <Star className="h-3 w-3 text-warning fill-warning/70" />}
          </div>
          <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{doc.updatedAt}</span>
            <span className="inline-flex items-center gap-1"><FileText className="h-3 w-3" />{readingTime(doc.words)} min</span>
            {doc.comments && doc.comments.length > 0 && (
              <span className="inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" />{doc.comments.length}</span>
            )}
            {doc.versions && (
              <span className="inline-flex items-center gap-1"><GitBranch className="h-3 w-3" />v{doc.versions[0]?.version ?? "1.0"}</span>
            )}
          </div>
          {!dense && doc.tags && (
            <div className="mt-2.5"><DocTagList tags={doc.tags} /></div>
          )}
        </div>
        {!dense && doc.initials && (
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-semibold text-primary-foreground">
            {doc.initials}
          </div>
        )}
      </div>
    </motion.button>
  );
}
