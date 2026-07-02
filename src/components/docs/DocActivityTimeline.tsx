import { motion } from "framer-motion";
import {
  FilePlus, Pencil, MessageSquare, Share2, GitBranch, RotateCcw,
} from "lucide-react";
import type { DocActivity } from "./data";

const meta: Record<DocActivity["kind"], { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  created:   { icon: FilePlus, color: "text-primary bg-primary/15", label: "created" },
  edited:    { icon: Pencil,   color: "text-info bg-info/15", label: "edited" },
  comment:   { icon: MessageSquare, color: "text-accent bg-accent/15", label: "commented" },
  shared:    { icon: Share2,   color: "text-success bg-success/15", label: "shared" },
  published: { icon: GitBranch, color: "text-warning bg-warning/15", label: "published" },
  restored:  { icon: RotateCcw, color: "text-fuchsia-300 bg-fuchsia-500/15", label: "restored" },
};

export function ActivityTimeline({ items }: { items: DocActivity[] }) {
  return (
    <ol className="relative space-y-3 border-l border-border/60 pl-4">
      {items.map((a, i) => {
        const m = meta[a.kind];
        return (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="relative"
          >
            <span className={`absolute -left-[22px] grid h-6 w-6 place-items-center rounded-full ${m.color}`}>
              <m.icon className="h-3 w-3" />
            </span>
            <div className="text-xs">
              <span className="font-medium">{a.actor}</span>{" "}
              <span className="text-muted-foreground">{m.label} · {a.time}</span>
            </div>
            {a.detail && <div className="text-[11px] text-muted-foreground/80">{a.detail}</div>}
          </motion.li>
        );
      })}
    </ol>
  );
}
