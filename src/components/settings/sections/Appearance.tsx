import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Sun, Moon, LayoutGrid, PanelLeft, PanelRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Panel, Toggle, SectionHeader } from "../primitives";
import { cn } from "@/lib/utils";

const ACCENTS = [
  { name: "Teal", value: "#14B8A6" },
  { name: "Cyan", value: "#22D3EE" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Emerald", value: "#22C55E" },
];

export function AppearanceSection() {
  const [theme, setTheme] = useState("dark");
  const [density, setDensity] = useState("comfortable");
  const [sidebar, setSidebar] = useState("left");
  const [accent, setAccent] = useState("#14B8A6");
  const [fontSize, setFontSize] = useState(15);
  const [radius, setRadius] = useState(16);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="space-y-6">
      <SectionHeader title="Appearance" description="Personalize your Foundry look and feel." action={<Button size="sm">Save Changes</Button>} />

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Theme">
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "light", label: "Light", icon: Sun, bg: "linear-gradient(135deg,#F8FAFC,#E2E8F0)" },
              { id: "dark", label: "Dark", icon: Moon, bg: "linear-gradient(135deg,#071417,#0F2027)" },
              { id: "system", label: "System", icon: Monitor, bg: "linear-gradient(135deg,#0F172A,#F8FAFC)" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "rounded-xl p-3 border-2 transition text-left",
                  theme === t.id ? "border-primary shadow-glow" : "border-border hover:border-primary/40",
                )}
              >
                <div className="h-16 rounded-lg mb-2" style={{ background: t.bg }} />
                <div className="flex items-center gap-1.5 text-xs font-medium"><t.icon className="h-3.5 w-3.5" />{t.label}</div>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Density">
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "compact", label: "Compact", rows: 6 },
              { id: "comfortable", label: "Comfortable", rows: 4 },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDensity(d.id)}
                className={cn(
                  "rounded-xl p-3 border-2 transition text-left",
                  density === d.id ? "border-primary shadow-glow" : "border-border hover:border-primary/40",
                )}
              >
                <div className="space-y-1 mb-2">
                  {Array.from({ length: d.rows }).map((_, i) => (
                    <div key={i} className="h-1.5 rounded bg-white/10" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium"><LayoutGrid className="h-3.5 w-3.5" />{d.label}</div>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Sidebar Position">
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "left", label: "Left", icon: PanelLeft },
              { id: "right", label: "Right", icon: PanelRight },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSidebar(s.id)}
                className={cn(
                  "rounded-xl p-3 border-2 transition text-center",
                  sidebar === s.id ? "border-primary shadow-glow" : "border-border hover:border-primary/40",
                )}
              >
                <s.icon className="h-6 w-6 mx-auto mb-1 text-primary" />
                <span className="text-xs font-medium">{s.label}</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Accent Color">
          <div className="flex flex-wrap gap-2 mb-3">
            {ACCENTS.map((c) => (
              <button
                key={c.value}
                onClick={() => setAccent(c.value)}
                className="h-9 w-9 rounded-lg transition hover:scale-110"
                style={{ background: c.value, boxShadow: accent === c.value ? `0 0 0 2px ${c.value}, 0 0 0 4px rgba(255,255,255,0.15)` : undefined }}
              />
            ))}
          </div>
          <motion.div layout className="rounded-xl border border-border p-4 flex items-center gap-3" style={{ borderColor: `${accent}66` }}>
            <div className="h-10 w-10 rounded-lg" style={{ background: accent }} />
            <div>
              <p className="text-sm font-medium">Preview</p>
              <p className="text-xs text-muted-foreground">Buttons, links, and highlights use this color.</p>
            </div>
          </motion.div>
        </Panel>

        <Panel title="Typography">
          <div>
            <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
              <span>Font Size</span><span>{fontSize}px</span>
            </div>
            <input type="range" min={12} max={18} value={fontSize} onChange={(e) => setFontSize(+e.target.value)} className="w-full accent-primary" />
            <div className="mt-4 rounded-xl border border-border p-4">
              <p style={{ fontSize }} className="font-display font-semibold">The quick brown fox jumps</p>
              <p style={{ fontSize: fontSize - 2 }} className="text-muted-foreground mt-1">Body text scales with your preference.</p>
            </div>
          </div>
        </Panel>

        <Panel title="Rounded Corners">
          <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
            <span>Radius</span><span>{radius}px</span>
          </div>
          <input type="range" min={0} max={24} value={radius} onChange={(e) => setRadius(+e.target.value)} className="w-full accent-primary" />
          <div className="mt-4 flex items-center gap-3">
            <div className="h-16 flex-1 bg-primary/20 border border-primary/40" style={{ borderRadius: radius }} />
            <div className="h-16 w-16 bg-primary" style={{ borderRadius: radius }} />
          </div>
        </Panel>
      </div>

      <Panel title="Motion">
        <Toggle label="Reduce motion" description="Minimize animations and transitions across Foundry." checked={reducedMotion} onChange={setReducedMotion} />
      </Panel>
    </div>
  );
}
