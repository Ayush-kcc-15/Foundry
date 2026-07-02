import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { History, Star, Trash2, Search } from "lucide-react";
import { AIPageHeader, Chip, EmptyState } from "@/components/ai/shared";
import { AI_HISTORY } from "@/components/ai/data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/ai/history")({
  component: AIHistory,
  head: () => ({ meta: [{ title: "AI History — Foundry" }] }),
});

function AIHistory() {
  const [items, setItems] = useState(AI_HISTORY);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const [favOnly, setFavOnly] = useState(false);

  const types = ["All", ...Array.from(new Set(AI_HISTORY.map((h) => h.type)))];
  const filtered = items.filter((i) => (filter === "All" || i.type === filter) && (!favOnly || i.favorite) && i.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <AIPageHeader
        icon={History}
        title="AI History"
        description="Every AI session in your workspace, searchable and organized."
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search history" className="rounded-xl border border-border/60 bg-surface/40 pl-8 pr-3 py-2 text-sm w-64 focus:outline-none focus:border-primary/40" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-border/60 bg-surface/40 px-3 py-2 text-sm focus:outline-none focus:border-primary/40">
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
        <button onClick={() => setFavOnly((s) => !s)} className={`rounded-xl border px-3 py-2 text-sm transition ${favOnly ? "border-primary/50 bg-primary/15 text-highlight" : "border-border/60 bg-surface/40 text-muted-foreground"}`}>
          ★ Favorites
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={History} title="No sessions found" description="Try a different filter or start a new AI conversation." />
      ) : (
        <div className="rounded-2xl glass-strong divide-y divide-border/60 overflow-hidden">
          {filtered.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 p-3.5 hover:bg-white/5 transition"
            >
              <button
                onClick={() => setItems((s) => s.map((x) => x.id === h.id ? { ...x, favorite: !x.favorite } : x))}
                className={`grid h-8 w-8 place-items-center rounded-lg ${h.favorite ? "text-warning" : "text-muted-foreground hover:text-foreground"} hover:bg-white/5`}
                aria-label="Favorite"
              >
                <Star className={`h-4 w-4 ${h.favorite ? "fill-current" : ""}`} />
              </button>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{h.title}</div>
                <div className="text-[11px] text-muted-foreground">{h.type} · {h.date}</div>
              </div>
              <Chip tone={h.status === "completed" ? "success" : h.status === "draft" ? "warning" : "default"}>{h.status}</Chip>
              <button
                onClick={() => setItems((s) => s.filter((x) => x.id !== h.id))}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
