import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownUp, ArrowDown, ArrowUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortKey = "name" | "updated" | "due" | "progress" | "priority";
export type SortDir = "asc" | "desc";

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "updated", label: "Recently updated" },
  { key: "name", label: "Name" },
  { key: "due", label: "Deadline" },
  { key: "progress", label: "Progress" },
  { key: "priority", label: "Priority" },
];

export function SortDropdown({
  sortKey,
  sortDir,
  onChange,
}: {
  sortKey: SortKey;
  sortDir: SortDir;
  onChange: (k: SortKey, d: SortDir) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const active = OPTIONS.find((o) => o.key === sortKey);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-surface/60 px-3 py-2 text-xs font-medium hover:border-primary/40 transition"
      >
        <ArrowDownUp className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="hidden sm:inline">Sort: {active?.label}</span>
        <span className="sm:hidden">Sort</span>
        {sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 rounded-xl glass-strong shadow-glow z-40 overflow-hidden"
          >
            <div className="p-1.5">
              {OPTIONS.map((o) => (
                <button
                  key={o.key}
                  onClick={() => onChange(o.key, sortDir)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs hover:bg-white/5",
                    sortKey === o.key ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Check className={cn("h-3 w-3", sortKey === o.key ? "text-primary" : "opacity-0")} />
                  {o.label}
                </button>
              ))}
            </div>
            <div className="border-t border-border/60 p-1.5 grid grid-cols-2 gap-1">
              <button
                onClick={() => onChange(sortKey, "asc")}
                className={cn(
                  "inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs",
                  sortDir === "asc" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-white/5",
                )}
              >
                <ArrowUp className="h-3 w-3" /> Asc
              </button>
              <button
                onClick={() => onChange(sortKey, "desc")}
                className={cn(
                  "inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs",
                  sortDir === "desc" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-white/5",
                )}
              >
                <ArrowDown className="h-3 w-3" /> Desc
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
