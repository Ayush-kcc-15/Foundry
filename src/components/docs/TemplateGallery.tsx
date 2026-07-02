import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { DOC_TEMPLATES, type DocTemplate } from "./data";
import { cn } from "@/lib/utils";

export function TemplateGallery({
  onUse, compact,
}: { onUse: (t: DocTemplate) => void; compact?: boolean }) {
  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
      {DOC_TEMPLATES.map((t, i) => (
        <motion.button
          key={t.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          whileHover={{ y: -2 }}
          onClick={() => onUse(t)}
          className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/60 p-4 text-left transition hover:border-primary/40 hover:shadow-glow"
        >
          <div className={cn("absolute inset-x-0 top-0 h-24 bg-gradient-to-br opacity-40 group-hover:opacity-60 transition", t.color)} />
          <div className="relative flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background/70 border border-border/60 text-primary">
              <t.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold truncate">{t.title}</h3>
                <Sparkles className="h-3 w-3 text-primary/70" />
              </div>
              <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">{t.description}</p>
              <span className="mt-2 inline-block rounded-full border border-border/60 bg-background/70 px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                {t.category}
              </span>
            </div>
          </div>
          <div className="relative mt-3 flex items-center justify-end">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 group-hover:opacity-100 transition">
              <Plus className="h-3 w-3" /> Use template
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
