import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, CheckSquare, Target, Flag, Tag, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuickCreateFab({ onCreateTask }: { onCreateTask: () => void }) {
  const [open, setOpen] = useState(false);
  const items = [
    { icon: CheckSquare, label: "Task", onClick: onCreateTask, color: "bg-primary/20 text-highlight border-primary/40" },
    { icon: Target,      label: "Sprint",    color: "bg-blue-500/20 text-blue-200 border-blue-500/40" },
    { icon: Flag,        label: "Milestone", color: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-500/40" },
    { icon: Tag,         label: "Label",     color: "bg-amber-500/20 text-amber-200 border-amber-500/40" },
    { icon: Layers,      label: "Epic",      color: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40" },
  ];
  return (
    <div className="fixed right-6 bottom-6 z-30">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 flex flex-col-reverse items-end gap-2"
          >
            {items.map((it) => (
              <button
                key={it.label}
                onClick={() => { setOpen(false); it.onClick?.(); }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold backdrop-blur-xl shadow-glow hover:-translate-x-0.5 transition",
                  it.color,
                )}
              >
                <it.icon className="h-3.5 w-3.5" />
                {it.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow"
        aria-label="Quick create"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
          <Plus className="h-6 w-6" />
        </motion.span>
      </motion.button>
    </div>
  );
}
