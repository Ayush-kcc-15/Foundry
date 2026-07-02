import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { DocNode } from "./data";
import { DocTagList } from "./Tags";
import { cn } from "@/lib/utils";

export function SearchBar({
  docs, onSelect, placeholder = "Search titles, content, tags, authors…",
}: { docs: DocNode[]; onSelect: (id: string) => void; placeholder?: string }) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return docs
      .filter((d) => d.kind === "doc")
      .filter((d) => {
        const hay = [
          d.title, d.author, d.category,
          ...(d.tags ?? []),
          d.content ?? "",
        ].join(" ").toLowerCase();
        return hay.includes(query);
      })
      .slice(0, 8);
  }, [q, docs]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface/60 px-3 py-2.5 focus-within:border-primary/40">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear" className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && q && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-2xl glass-strong shadow-glow"
          >
            {results.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">No results for "{q}"</div>
            ) : (
              <ul className="p-1.5">
                {results.map((d) => (
                  <li key={d.id}>
                    <button
                      onMouseDown={() => onSelect(d.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left hover:bg-primary/10",
                      )}
                    >
                      <span className="text-primary">{d.icon ? <d.icon className="h-4 w-4" /> : "📄"}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{d.title}</span>
                        <span className="block truncate text-[10px] text-muted-foreground">
                          {d.category} · {d.author} · {d.updatedAt}
                        </span>
                      </span>
                      <DocTagList tags={d.tags} max={2} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
