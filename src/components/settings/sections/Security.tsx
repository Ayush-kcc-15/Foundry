import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Smartphone, Monitor, Tablet, LogOut, Key, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { SESSIONS, LOGIN_HISTORY } from "../data";
import { Panel, Toggle, SectionHeader, Progress } from "../primitives";
import { cn } from "@/lib/utils";

const CIRC = 2 * Math.PI * 40;

export function SecuritySection() {
  const [twoFA, setTwoFA] = useState(true);
  const score = 88;

  return (
    <div className="space-y-6">
      <SectionHeader title="Security" description="Protect your account and audit access." />

      <div className="grid lg:grid-cols-3 gap-6">
        <Panel className="lg:col-span-1">
          <div className="flex flex-col items-center text-center py-2">
            <div className="relative h-28 w-28">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="50" cy="50" r="40" stroke="#22C55E" strokeWidth="8" strokeLinecap="round" fill="none"
                  initial={{ strokeDashoffset: CIRC }}
                  animate={{ strokeDashoffset: CIRC - (score / 100) * CIRC }}
                  transition={{ duration: 1 }}
                  style={{ strokeDasharray: CIRC }}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-2xl font-semibold">{score}</span>
              </div>
            </div>
            <p className="mt-3 text-sm font-medium">Security Score · Strong</p>
            <p className="text-xs text-muted-foreground mt-1">Enable recovery codes to reach 100.</p>
          </div>
        </Panel>

        <Panel title="Authentication" className="lg:col-span-2">
          <div className="divide-y divide-border/50">
            <Toggle
              label="Two-factor authentication"
              description="Require a second verification step at login."
              checked={twoFA} onChange={setTwoFA}
            />
            <div className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium flex items-center gap-2">Recovery Codes <Badge variant="warning">10 unused</Badge></p>
                <p className="text-xs text-muted-foreground mt-0.5">Backup codes if you lose your device.</p>
              </div>
              <Button variant="outline" size="sm" leftIcon={<Key className="h-4 w-4" />}>Regenerate</Button>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium">Password strength</p>
                <div className="mt-1 w-64"><Progress value={82} tone="success" /></div>
              </div>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium">Session expiration</p>
                <p className="text-xs text-muted-foreground mt-0.5">Automatically sign out after inactivity.</p>
              </div>
              <select className="h-9 rounded-lg border border-border bg-background/40 px-3 text-sm">
                <option>2 hours</option><option>8 hours</option><option>1 day</option><option>7 days</option>
              </select>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Active Sessions" description={`${SESSIONS.length} devices signed in`}>
        <div className="space-y-2">
          {SESSIONS.map((s) => {
            const Icon = s.device.includes("iPhone") ? Smartphone : s.device.includes("iPad") ? Tablet : Monitor;
            return (
              <div key={s.id} className="flex items-center justify-between gap-4 p-3 rounded-xl border border-border/60 bg-background/30">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn("h-10 w-10 grid place-items-center rounded-lg", s.current ? "bg-primary/15 text-primary" : "bg-white/5 text-muted-foreground")}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium flex items-center gap-2">{s.device} {s.current && <Badge variant="primary">This device</Badge>}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.browser} · {s.location} · {s.lastActive}</p>
                  </div>
                </div>
                {!s.current && <Button variant="ghost" size="sm">Revoke</Button>}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" leftIcon={<LogOut className="h-4 w-4" />}>Sign out all other devices</Button>
        </div>
      </Panel>

      <Panel title="Recent Logins">
        <div className="divide-y divide-border/50">
          {LOGIN_HISTORY.map((l, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5">
              {l.status === "success" ? <CheckCircle2 className="h-4 w-4 text-success" /> :
                l.status === "blocked" ? <XCircle className="h-4 w-4 text-destructive" /> :
                <AlertTriangle className="h-4 w-4 text-warning" />}
              <div className="flex-1 flex flex-wrap justify-between text-sm gap-2">
                <span>{l.time}</span>
                <span className="text-muted-foreground">{l.ip} · {l.location}</span>
              </div>
              <Badge variant={l.status === "success" ? "success" : l.status === "blocked" ? "error" : "warning"}>{l.status}</Badge>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Trusted Devices">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" />
          3 devices marked as trusted. Skips 2FA verification.
        </div>
      </Panel>
    </div>
  );
}
