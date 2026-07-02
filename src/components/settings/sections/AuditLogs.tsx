import { useMemo, useState } from "react";
import {
  Search, Download, LogIn, LogOut, UserPlus, Building2, Shield, Trash2, KeyRound, CreditCard,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { AUDIT_LOGS } from "../data";
import { Panel, SectionHeader, Input, Select, EmptyState } from "../primitives";
import { cn } from "@/lib/utils";

const KIND_META: Record<string, { icon: any; color: string }> = {
  auth: { icon: LogIn, color: "text-primary bg-primary/15" },
  member: { icon: UserPlus, color: "text-accent bg-accent/15" },
  workspace: { icon: Building2, color: "text-primary bg-primary/15" },
  role: { icon: Shield, color: "text-warning bg-warning/15" },
  project: { icon: Trash2, color: "text-destructive bg-destructive/15" },
  api: { icon: KeyRound, color: "text-primary bg-primary/15" },
  billing: { icon: CreditCard, color: "text-success bg-success/15" },
};

export function AuditLogsSection() {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("all");

  const filtered = useMemo(() => AUDIT_LOGS.filter((l) =>
    (kind === "all" || l.kind === kind) &&
    (q === "" || `${l.actor} ${l.event} ${l.target}`.toLowerCase().includes(q.toLowerCase()))
  ), [q, kind]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Audit Logs"
        description="Every material action across your workspace."
        action={<Button size="sm" variant="outline" leftIcon={<Download className="h-4 w-4" />}>Export Logs</Button>}
      />

      <Panel>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search actor, event, or target…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={kind} onChange={(e) => setKind(e.target.value)} className="sm:w-56">
            <option value="all">All events</option>
            <option value="auth">Authentication</option>
            <option value="member">Members</option>
            <option value="workspace">Workspace</option>
            <option value="role">Roles</option>
            <option value="project">Projects</option>
            <option value="api">API Keys</option>
            <option value="billing">Billing</option>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={LogOut} title="No logs match" description="Adjust your filters or search query." />
        ) : (
          <ol className="relative border-l border-border/60 ml-3 space-y-4 pl-5">
            {filtered.map((l) => {
              const meta = KIND_META[l.kind];
              const Icon = meta.icon;
              return (
                <li key={l.id} className="relative">
                  <span className={cn("absolute -left-[34px] top-0 h-6 w-6 grid place-items-center rounded-full", meta.color)}>
                    <Icon className="h-3 w-3" />
                  </span>
                  <div className="rounded-xl border border-border/60 bg-background/30 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm"><span className="font-medium">{l.actor}</span> <span className="text-muted-foreground">{l.event}</span></p>
                      <span className="text-xs text-muted-foreground">{l.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{l.target}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </Panel>
    </div>
  );
}
