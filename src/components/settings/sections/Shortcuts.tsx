import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SHORTCUTS } from "../data";
import { Panel, SectionHeader, Input } from "../primitives";

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="inline-flex items-center justify-center h-6 min-w-[24px] px-1.5 rounded-md border border-border bg-white/5 text-[11px] font-mono">{children}</kbd>;
}

export function ShortcutsSection() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() =>
    SHORTCUTS.map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())) }))
      .filter((g) => g.items.length > 0),
  [q]);

  return (
    <div className="space-y-6">
      <SectionHeader title="Keyboard Shortcuts" description="Every keybinding across Foundry." />
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search shortcuts…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((g) => (
          <Panel key={g.group} title={g.group}>
            <div className="divide-y divide-border/50">
              {g.items.map((i) => (
                <div key={i.label} className="flex items-center justify-between py-2.5">
                  <span className="text-sm">{i.label}</span>
                  <div className="flex items-center gap-1">
                    {i.keys.map((k, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        <Kbd>{k}</Kbd>
                        {idx < i.keys.length - 1 && <span className="text-xs text-muted-foreground">+</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
