import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { DISCUSSIONS, DISCUSSION_CATEGORIES, type DiscussionCategory } from "@/components/collaboration/data";
import { DiscussionCard } from "./DiscussionCard";
import { NoDiscussions } from "./EmptyStates";
import { cn } from "@/lib/utils";

export function DiscussionList() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<DiscussionCategory | "All">("All");
  const [sort, setSort] = useState<"recent" | "popular" | "unanswered">("recent");

  const filtered = useMemo(() => {
    let list = DISCUSSIONS.filter((d) => {
      const mq = !q || d.title.toLowerCase().includes(q.toLowerCase()) || d.excerpt.toLowerCase().includes(q.toLowerCase());
      const mc = cat === "All" || d.category === cat;
      return mq && mc;
    });
    if (sort === "popular") list = [...list].sort((a, b) => b.views - a.views);
    if (sort === "unanswered") list = [...list].sort((a, b) => a.replies - b.replies);
    return list;
  }, [q, cat, sort]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search discussions…"
            className="w-full rounded-xl border border-border/60 bg-surface/50 pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="rounded-xl border border-border/60 bg-surface/50 px-2.5 py-2 text-xs focus:outline-none focus:border-primary/50"
        >
          <option value="recent">Recent</option>
          <option value="popular">Popular</option>
          <option value="unanswered">Unanswered</option>
        </select>
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:opacity-90 transition">
          <Plus className="h-3.5 w-3.5" /> New discussion
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(["All", ...DISCUSSION_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-medium transition",
              cat === c
                ? "border-primary/40 bg-primary/15 text-highlight"
                : "border-border/60 bg-surface/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? <NoDiscussions /> : (
        <div className="grid gap-3">
          {filtered.map((d, i) => (
            <DiscussionCard key={d.id} discussion={d} i={i} />
          ))}
        </div>
      )}
    </div>
  );
}
