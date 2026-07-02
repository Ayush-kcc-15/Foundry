import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { STATUSES, PRIORITIES, TECH_OPTIONS } from "./data";
import { cn } from "@/lib/utils";

export type Filters = {
  status: string[];
  priority: string[];
  tech: string[];
  visibility: string[];
};

export const emptyFilters: Filters = { status: [], priority: [], tech: [], visibility: [] };

export function FilterPanel({
  open,
  filters,
  onChange,
  onClear,
}: {
  open: boolean;
  filters: Filters;
  onChange: (next: Filters) => void;
  onClear: () => void;
}) {
  function toggle<K extends keyof Filters>(key: K, val: string) {
    const arr = filters[key];
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    onChange({ ...filters, [key]: next });
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="rounded-2xl glass-strong p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Group label="Status">
              {STATUSES.map((s) => (
                <Chip key={s} label={s} active={filters.status.includes(s)} onClick={() => toggle("status", s)} />
              ))}
            </Group>
            <Group label="Priority">
              {PRIORITIES.map((p) => (
                <Chip key={p} label={p} active={filters.priority.includes(p)} onClick={() => toggle("priority", p)} />
              ))}
            </Group>
            <Group label="Visibility">
              {["Private", "Team", "Public"].map((v) => (
                <Chip key={v} label={v} active={filters.visibility.includes(v)} onClick={() => toggle("visibility", v)} />
              ))}
            </Group>
            <Group label="Technology">
              <div className="max-h-24 overflow-y-auto flex flex-wrap gap-1.5 pr-1">
                {TECH_OPTIONS.slice(0, 12).map((t) => (
                  <Chip key={t} label={t} active={filters.tech.includes(t)} onClick={() => toggle("tech", t)} />
                ))}
              </div>
            </Group>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
              <button
                onClick={onClear}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition"
              >
                <X className="h-3.5 w-3.5" /> Clear all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-glow"
          : "bg-surface/50 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground",
      )}
    >
      {active && <Check className="h-3 w-3" />}
      {label}
    </button>
  );
}
