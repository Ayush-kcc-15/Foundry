import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, X, Rocket } from "lucide-react";
import { ANNOUNCEMENTS } from "./data";
import { cn } from "@/lib/utils";

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const visible = ANNOUNCEMENTS.filter((a) => !dismissed.has(a.id));
  if (visible.length === 0) return null;
  const a = visible[0];
  const tone = a.tone === "accent"
    ? "from-accent/20 via-highlight/10 to-transparent border-accent/30"
    : "from-primary/20 via-highlight/10 to-transparent border-primary/30";
  return (
    <AnimatePresence>
      <motion.div
        key={a.id}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className={cn("relative overflow-hidden rounded-2xl border bg-gradient-to-r p-3.5 pr-10", tone)}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/30">
            {a.kind === "release" ? <Rocket className="h-4 w-4" /> : <Megaphone className="h-4 w-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold truncate">{a.title}</div>
            <div className="text-[11px] text-muted-foreground truncate">{a.desc}</div>
          </div>
          <button className="hidden sm:inline-flex shrink-0 rounded-lg bg-primary/15 border border-primary/30 text-highlight text-xs font-medium px-2.5 py-1 hover:bg-primary/25 transition">
            {a.cta}
          </button>
        </div>
        <button
          onClick={() => setDismissed((s) => new Set(s).add(a.id))}
          className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
