import { motion } from "framer-motion";
import { FileText, Paperclip, ImageIcon, Sparkles, Archive } from "lucide-react";
import { Panel, SectionHeader, Progress } from "../primitives";

const BUCKETS = [
  { label: "Documents", icon: FileText, size: 12.4, color: "#14B8A6" },
  { label: "Attachments", icon: Paperclip, size: 18.2, color: "#6366F1" },
  { label: "Images", icon: ImageIcon, size: 21.8, color: "#F59E0B" },
  { label: "AI Files", icon: Sparkles, size: 6.6, color: "#EC4899" },
  { label: "Backups", icon: Archive, size: 3.0, color: "#22C55E" },
];

const TOTAL = 100;

export function StorageSection() {
  const used = BUCKETS.reduce((a, b) => a + b.size, 0);
  const remaining = TOTAL - used;
  let cursor = 0;

  return (
    <div className="space-y-6">
      <SectionHeader title="Storage" description={`${used.toFixed(1)} GB used of ${TOTAL} GB`} />

      <Panel title="Distribution">
        <div className="h-4 flex rounded-full overflow-hidden bg-white/5">
          {BUCKETS.map((b, i) => {
            const pct = (b.size / TOTAL) * 100;
            const el = (
              <motion.div
                key={b.label}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                style={{ background: b.color }}
              />
            );
            cursor += pct;
            return el;
          })}
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BUCKETS.map((b) => (
            <div key={b.label} className="rounded-xl border border-border/60 bg-background/30 p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: b.color }} />
                <b.icon className="h-3.5 w-3.5" />{b.label}
              </div>
              <p className="mt-1 font-display text-lg font-semibold">{b.size} GB</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Remaining">
          <div className="text-center py-4">
            <p className="font-display text-4xl font-semibold text-primary">{remaining.toFixed(1)} GB</p>
            <p className="text-sm text-muted-foreground mt-1">Available on your plan</p>
            <div className="mt-4 max-w-xs mx-auto"><Progress value={(used / TOTAL) * 100} tone={used / TOTAL > 0.8 ? "warning" : "primary"} /></div>
          </div>
        </Panel>

        <Panel title="Trend · 30 days">
          <div className="h-32 flex items-end gap-1">
            {Array.from({ length: 30 }).map((_, i) => {
              const h = 25 + Math.sin(i * 0.4) * 15 + i * 1.2;
              return (
                <motion.div
                  key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.02 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary"
                />
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Storage grew +8.4 GB over the last month.</p>
        </Panel>
      </div>
    </div>
  );
}
