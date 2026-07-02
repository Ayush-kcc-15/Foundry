import { motion } from "framer-motion";
import { AlertTriangle, Clock } from "lucide-react";
import { deadlines } from "./data";
import { cn } from "@/lib/utils";

const priorityCls: Record<string, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

export function DeadlineWidget() {
  return (
    <div className="rounded-2xl glass-strong p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">Upcoming deadlines</h3>
          <p className="text-[11px] text-muted-foreground">{deadlines.length} items</p>
        </div>
      </div>
      <ul className="space-y-2">
        {deadlines.map((d, i) => (
          <motion.li
            key={d.task}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "group flex items-start gap-3 rounded-xl border p-3 transition hover:border-primary/40",
              d.overdue ? "border-destructive/40 bg-destructive/5" : "border-border/60 bg-surface/40",
            )}
          >
            <div
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                d.overdue ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary",
              )}
            >
              {d.overdue ? <AlertTriangle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">{d.task}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] uppercase font-semibold",
                    priorityCls[d.priority],
                  )}
                >
                  {d.priority}
                </span>
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground truncate">{d.project}</div>
            </div>
            <div className={cn("text-[11px] font-medium shrink-0", d.overdue ? "text-destructive" : "text-muted-foreground")}>
              {d.due}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
