import { useState } from "react";
import { motion } from "framer-motion";
import { Settings2, Plug, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { INTEGRATIONS } from "../data";
import { SectionHeader, Input } from "../primitives";
import { cn } from "@/lib/utils";

export function IntegrationsSection() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"all" | "connected" | "available">("all");
  const filtered = INTEGRATIONS
    .filter((i) => (tab === "connected" ? i.connected : tab === "available" ? !i.connected : true))
    .filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <SectionHeader title="Integrations" description="Connect Foundry to the tools your team already uses." />

      <div className="flex flex-col sm:flex-row gap-3">
        <Input placeholder="Search integrations…" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1" />
        <div className="inline-flex gap-1 rounded-full bg-white/5 p-1">
          {(["all", "connected", "available"] as const).map((t) => (
            <button
              key={t} onClick={() => setTab(t)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium capitalize transition",
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >{t}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((i, idx) => (
          <motion.div
            key={i.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="glass-strong rounded-2xl p-5 group hover:border-primary/40 transition"
          >
            <div className="flex items-start justify-between">
              <div
                className="h-12 w-12 rounded-xl grid place-items-center text-lg font-bold shadow-inner"
                style={{ background: `${i.color}22`, color: i.color, border: `1px solid ${i.color}44` }}
              >
                {i.name.slice(0, 1)}
              </div>
              {i.connected ? (
                <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Connected</Badge>
              ) : (
                <Badge variant="neutral">Available</Badge>
              )}
            </div>
            <h3 className="mt-4 font-semibold">{i.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">{i.desc}</p>
            <div className="mt-4 flex items-center gap-2">
              {i.connected ? (
                <>
                  <Button variant="outline" size="sm" leftIcon={<Settings2 className="h-3.5 w-3.5" />} className="flex-1">Configure</Button>
                  <Button variant="ghost" size="sm">Disconnect</Button>
                </>
              ) : (
                <Button size="sm" leftIcon={<Plug className="h-3.5 w-3.5" />} className="flex-1">Connect</Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
