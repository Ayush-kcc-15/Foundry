import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Users, Sparkles, HardDrive, Activity, Lock, Mail, CheckCircle2,
  AlertTriangle, TrendingUp, Server,
} from "lucide-react";
import { HEALTH } from "../data";
import { Progress } from "../primitives";
import { cn } from "@/lib/utils";

const CIRC = 2 * Math.PI * 44;

function HealthRing({ score }: { score: number }) {
  const offset = CIRC - (score / 100) * CIRC;
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="50" cy="50" r="44" stroke="url(#hg)" strokeWidth="8" strokeLinecap="round" fill="none"
          initial={{ strokeDashoffset: CIRC }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ strokeDasharray: CIRC }}
        />
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#5EEAD4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-semibold">{score}</span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Health</span>
      </div>
    </div>
  );
}

const TILES = [
  { key: "activeMembers", label: "Active Members", icon: Users, value: HEALTH.activeMembers, suffix: "/ 48", tone: "primary" as const, pct: 85 },
  { key: "aiUsage", label: "AI Usage", icon: Sparkles, value: HEALTH.aiUsage, suffix: "%", tone: "primary" as const, pct: HEALTH.aiUsage },
  { key: "storage", label: "Storage", icon: HardDrive, value: HEALTH.storage, suffix: "% used", tone: "warning" as const, pct: HEALTH.storage },
  { key: "apiRequests", label: "API Requests", icon: TrendingUp, value: "12.4K", suffix: "/ 25K", tone: "primary" as const, pct: HEALTH.apiRequests },
  { key: "security", label: "Security Score", icon: Lock, value: HEALTH.security, suffix: "/100", tone: "success" as const, pct: HEALTH.security },
  { key: "invites", label: "Pending Invites", icon: Mail, value: HEALTH.pendingInvites, suffix: "", tone: "primary" as const, pct: 40 },
  { key: "activity", label: "Workspace Activity", icon: Activity, value: HEALTH.activity, suffix: "%", tone: "primary" as const, pct: HEALTH.activity },
  { key: "status", label: "System Status", icon: Server, value: "Operational", suffix: "", tone: "success" as const, pct: 100 },
];

export function OverviewSection() {
  const [tick] = useState(() => Date.now());
  void tick;
  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl p-6 flex flex-col lg:flex-row items-center gap-6">
        <HealthRing score={HEALTH.score} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            All systems operational
          </div>
          <h2 className="mt-2 font-display text-2xl font-semibold">Workspace Health · Excellent</h2>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
            Foundry HQ is running smoothly. 92% health across security, usage, and collaboration signals.
            AI credits refresh in 6 days.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Uptime · 30d", value: "99.98%", icon: ShieldCheck },
              { label: "Response P95", value: "184 ms", icon: TrendingUp },
              { label: "Open Incidents", value: "0", icon: AlertTriangle },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-border/60 bg-background/30 p-3">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wide">
                  <k.icon className="h-3.5 w-3.5" />{k.label}
                </div>
                <p className="mt-1 font-display text-lg font-semibold">{k.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TILES.map((t, i) => (
          <motion.div
            key={t.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass-strong rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-xl",
                t.tone === "success" ? "bg-success/15 text-success" :
                t.tone === "warning" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary",
              )}>
                <t.icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.label}</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-2xl font-semibold">{t.value}</span>
              {t.suffix && <span className="text-xs text-muted-foreground">{t.suffix}</span>}
            </div>
            <div className="mt-3"><Progress value={t.pct} tone={t.tone} /></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
