import { motion } from "framer-motion";
import { Trash2, ArrowRightLeft, UserPlus, Tag, Flag, Archive, X } from "lucide-react";

export function BulkActions({
  count,
  onClear,
  onDelete,
}: {
  count: number;
  onClear: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed left-1/2 bottom-6 z-40 -translate-x-1/2 flex items-center gap-1 rounded-2xl border border-border/60 bg-card/90 backdrop-blur-xl px-2.5 py-2 shadow-glow"
    >
      <span className="rounded-lg bg-primary/15 border border-primary/30 px-2 py-1 text-xs font-semibold text-highlight">
        {count} selected
      </span>
      <div className="mx-1 h-6 w-px bg-border/60" />
      <BulkBtn icon={<ArrowRightLeft className="h-3.5 w-3.5" />} label="Move" />
      <BulkBtn icon={<UserPlus    className="h-3.5 w-3.5" />} label="Assign" />
      <BulkBtn icon={<Flag        className="h-3.5 w-3.5" />} label="Priority" />
      <BulkBtn icon={<Tag         className="h-3.5 w-3.5" />} label="Labels" />
      <BulkBtn icon={<Archive     className="h-3.5 w-3.5" />} label="Archive" />
      <BulkBtn icon={<Trash2      className="h-3.5 w-3.5" />} label="Delete" danger onClick={onDelete} />
      <div className="mx-1 h-6 w-px bg-border/60" />
      <button
        onClick={onClear}
        className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground"
        aria-label="Clear selection"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

function BulkBtn({
  icon, label, danger, onClick,
}: { icon: React.ReactNode; label: string; danger?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition " +
        (danger
          ? "text-destructive hover:bg-destructive/10"
          : "text-muted-foreground hover:bg-primary/10 hover:text-primary")
      }
    >
      {icon}
      {label}
    </button>
  );
}
