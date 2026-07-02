import { motion } from "framer-motion";
import { Download, CreditCard, Check, TrendingUp, Zap, Users, HardDrive } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { INVOICES } from "../data";
import { Panel, SectionHeader, Progress } from "../primitives";

const PLANS = [
  { name: "Starter", price: "$0", features: ["Up to 5 members", "3 projects", "1GB storage"] },
  { name: "Business", price: "$249", features: ["Unlimited members", "Unlimited projects", "100GB storage", "AI Workspace"], current: true },
  { name: "Enterprise", price: "Custom", features: ["SSO & SAML", "Audit exports", "Dedicated support", "SLA 99.99%"] },
];

const USAGE = [
  { label: "AI Credits", icon: Zap, used: 6840, total: 10000, tone: "primary" as const },
  { label: "Storage", icon: HardDrive, used: 62, total: 100, tone: "warning" as const, unit: "GB" },
  { label: "Workspace Members", icon: Users, used: 41, total: 100, tone: "primary" as const },
  { label: "API Requests", icon: TrendingUp, used: 12400, total: 25000, tone: "primary" as const },
];

const chartData = [24, 32, 28, 46, 52, 38, 64, 58, 72, 68, 82, 76];

export function BillingSection() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Billing" description="Plan, usage, and invoices." action={<Button size="sm">Upgrade Plan</Button>} />

      <div className="grid lg:grid-cols-3 gap-6">
        <Panel className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Current Plan</p>
              <h2 className="font-display text-2xl font-semibold mt-1">Business</h2>
              <p className="text-sm text-muted-foreground mt-1">$249/month · renews Jul 15, 2026</p>
            </div>
            <Badge variant="primary">Active</Badge>
          </div>
          <div className="h-32 flex items-end gap-1 rounded-xl bg-background/30 border border-border/60 p-3">
            {chartData.map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="flex-1 rounded-t bg-gradient-to-t from-primary/60 to-primary"
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Spend over the last 12 months</p>
        </Panel>

        <Panel title="Payment Method">
          <div className="rounded-xl p-4 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
            <div className="flex items-center justify-between">
              <CreditCard className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">VISA</span>
            </div>
            <p className="mt-6 font-mono text-lg">•••• •••• •••• 4242</p>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>Alex Chen</span><span>12/28</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">Update card</Button>
        </Panel>
      </div>

      <Panel title="Usage this cycle">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {USAGE.map((u) => (
            <div key={u.label} className="rounded-xl border border-border/60 bg-background/30 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
                <u.icon className="h-3.5 w-3.5" />{u.label}
              </div>
              <p className="mt-2 font-display text-xl font-semibold">
                {u.used.toLocaleString()}{u.unit || ""}<span className="text-sm text-muted-foreground"> / {u.total.toLocaleString()}{u.unit || ""}</span>
              </p>
              <div className="mt-2"><Progress value={(u.used / u.total) * 100} tone={u.tone} /></div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Available Plans">
        <div className="grid sm:grid-cols-3 gap-4">
          {PLANS.map((p) => (
            <div key={p.name} className={`rounded-xl border p-5 relative ${p.current ? "border-primary bg-primary/5 shadow-glow" : "border-border/60 bg-background/30"}`}>
              {p.current && <Badge variant="primary" className="absolute -top-2 right-4">Current</Badge>}
              <p className="text-sm font-medium text-muted-foreground">{p.name}</p>
              <p className="mt-1 font-display text-2xl font-semibold">{p.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
              <ul className="mt-3 space-y-1.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs">
                    <Check className="h-3.5 w-3.5 text-primary" />{f}
                  </li>
                ))}
              </ul>
              <Button variant={p.current ? "outline" : "primary"} size="sm" className="w-full mt-4">{p.current ? "Manage" : "Upgrade"}</Button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Billing History">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
              <th className="text-left py-3 font-medium">Invoice</th>
              <th className="text-left py-3 font-medium">Date</th>
              <th className="text-left py-3 font-medium">Amount</th>
              <th className="text-left py-3 font-medium">Status</th>
              <th className="text-right py-3 font-medium">Download</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => (
              <tr key={inv.id} className="border-b border-border/40">
                <td className="py-3 font-mono text-xs">{inv.id}</td>
                <td className="py-3 text-muted-foreground">{inv.date}</td>
                <td className="py-3">{inv.amount}</td>
                <td className="py-3"><Badge variant="success">{inv.status}</Badge></td>
                <td className="py-3 text-right">
                  <button className="inline-flex items-center gap-1 text-xs text-primary hover:text-highlight"><Download className="h-3.5 w-3.5" /> PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
