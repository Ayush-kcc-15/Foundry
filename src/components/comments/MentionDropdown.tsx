import { useMemo } from "react";
import { MEMBERS } from "@/components/collaboration/data";
import { cn } from "@/lib/utils";

export function MentionDropdown({
  query, active, onSelect,
}: {
  query: string;
  active: number;
  onSelect: (name: string) => void;
}) {
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MEMBERS.filter((m) => m.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  if (filtered.length === 0) return null;

  return (
    <div className="absolute bottom-full mb-1.5 left-0 z-20 w-72 rounded-xl border border-border/60 bg-surface/95 backdrop-blur shadow-glow overflow-hidden">
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
        Mention a teammate
      </div>
      <ul className="p-1">
        {filtered.map((m, i) => (
          <li key={m.id}>
            <button
              onClick={() => onSelect(m.name)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition",
                i === active ? "bg-primary/15" : "hover:bg-white/5",
              )}
            >
              <div className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${m.color} text-[10px] font-semibold text-primary-foreground`}>{m.initials}</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-medium">{m.name}</div>
                <div className="truncate text-[10px] text-muted-foreground">{m.role}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
