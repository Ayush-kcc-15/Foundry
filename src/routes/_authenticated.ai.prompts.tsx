import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Library, Search } from "lucide-react";
import { AIPageHeader, CopyButton, Chip } from "@/components/ai/shared";
import { PROMPT_CATEGORIES } from "@/components/ai/data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_authenticated/ai/prompts")({
  component: PromptLibrary,
  head: () => ({ meta: [{ title: "Prompt Library — Foundry" }] }),
});

function PromptLibrary() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const cats = ["All", ...PROMPT_CATEGORIES.map((c) => c.name)];
  const filtered = PROMPT_CATEGORIES.filter((c) => !cat || cat === "All" || c.name === cat).map((c) => ({
    ...c,
    prompts: c.prompts.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.body.toLowerCase().includes(q.toLowerCase())),
  })).filter((c) => c.prompts.length);

  return (
    <>
      <AIPageHeader
        icon={Library}
        title="Prompt Library"
        description="A curated collection of proven prompts. Click any card to copy."
        actions={
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts" className="rounded-xl border border-border/60 bg-surface/40 pl-8 pr-3 py-2 text-sm w-64 focus:outline-none focus:border-primary/40" />
          </div>
        }
      />

      <div className="flex flex-wrap gap-1.5 mb-5">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c === "All" ? null : c)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              (cat ?? "All") === c ? "border-primary/50 bg-primary/15 text-highlight" : "border-border/60 bg-surface/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((c) => (
          <section key={c.name}>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-display text-lg font-semibold">{c.name}</h2>
              <Chip>{c.prompts.length}</Chip>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.prompts.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl glass-strong p-4 flex flex-col gap-2 hover:border-primary/40 transition-all"
                >
                  <div className="text-sm font-semibold">{p.title}</div>
                  <div className="text-[12px] text-muted-foreground line-clamp-3 whitespace-pre-wrap">{p.body}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Chip tone="primary">{c.name}</Chip>
                    <div className="ml-auto"><CopyButton text={p.body} label="Copy" /></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
