import { motion, AnimatePresence } from "framer-motion";
import { History, GitCompare, RotateCcw, X } from "lucide-react";
import { NoVersionHistory } from "./EmptyStates";
import type { DocVersion } from "./data";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function VersionHistory({
  open, onClose, versions,
}: { open: boolean; onClose: () => void; versions: DocVersion[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : s.length < 2 ? [...s, id] : [s[1], id]);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: 400, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-hidden glass-strong border-l border-border/60 flex flex-col"
          >
            <header className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold">Version history</h2>
              </div>
              <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </header>

            {versions.length === 0 ? (
              <div className="p-5"><NoVersionHistory /></div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {versions.map((v) => {
                    const isSel = selected.includes(v.id);
                    return (
                      <div
                        key={v.id}
                        onClick={() => toggleSelect(v.id)}
                        className={cn(
                          "rounded-xl border p-3 cursor-pointer transition",
                          isSel ? "border-primary/60 bg-primary/10" : "border-border/60 hover:border-primary/40 hover:bg-white/5",
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-mono text-primary">v{v.version}</span>
                            <span className="text-xs text-muted-foreground">{v.date}</span>
                          </div>
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">
                            {v.initials}
                          </div>
                        </div>
                        <p className="mt-1.5 text-xs text-foreground">{v.summary}</p>
                        <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span>by {v.author}</span>
                          <button className="ml-auto inline-flex items-center gap-1 text-primary hover:underline">
                            <RotateCcw className="h-3 w-3" /> Restore
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <footer className="border-t border-border/60 p-3">
                  <button
                    disabled={selected.length !== 2}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/15 py-2 text-xs font-medium text-primary hover:bg-primary/25 disabled:opacity-40"
                  >
                    <GitCompare className="h-3.5 w-3.5" />
                    {selected.length === 2 ? "Compare selected" : "Select 2 versions to compare"}
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
