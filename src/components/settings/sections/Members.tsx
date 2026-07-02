import { useMemo, useState } from "react";
import { Search, UserPlus, MoreHorizontal, Mail, Ban, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { MEMBERS, ROLES } from "../data";
import { Avatar, StatusDot, SectionHeader, Input, Select, EmptyState, Panel } from "../primitives";

export function MembersSection() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [invite, setInvite] = useState(false);

  const filtered = useMemo(() => {
    return MEMBERS.filter((m) =>
      (role === "all" || m.role === role) &&
      (q === "" || m.name.toLowerCase().includes(q.toLowerCase()) || m.email.toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, role]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Members"
        description={`${MEMBERS.length} members · 3 pending invitations`}
        action={<Button size="sm" leftIcon={<UserPlus className="h-4 w-4" />} onClick={() => setInvite(true)}>Invite Member</Button>}
      />

      <Panel>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search members by name or email…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={role} onChange={(e) => setRole(e.target.value)} className="sm:w-56">
            <option value="all">All roles</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={UserPlus} title="No members match" description="Try a different search or clear filters." />
        ) : (
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
                  <th className="text-left font-medium py-3 px-5">Member</th>
                  <th className="text-left font-medium py-3 px-3">Role</th>
                  <th className="text-left font-medium py-3 px-3">Status</th>
                  <th className="text-left font-medium py-3 px-3">Projects</th>
                  <th className="text-left font-medium py-3 px-3">Last Active</th>
                  <th className="text-right font-medium py-3 px-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} className="border-b border-border/40 hover:bg-white/[0.02] transition">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <Avatar initials={m.avatar} size={36} />
                        <div>
                          <p className="font-medium">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3"><Badge variant={m.role === "Owner" ? "primary" : "neutral"}>{m.role}</Badge></td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <StatusDot status={m.status} /> {m.status}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground">{m.projects}</td>
                    <td className="py-3 px-3 text-muted-foreground">{m.lastActive}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-end gap-1">
                        {m.status === "pending" && (
                          <button title="Resend" className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground"><RefreshCw className="h-4 w-4" /></button>
                        )}
                        <button title="Suspend" className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-warning"><Ban className="h-4 w-4" /></button>
                        <button title="Remove" className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                        <button title="More" className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/5 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {MEMBERS.length}</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded-md hover:bg-white/5">Previous</button>
            <span className="px-2">Page 1 of 1</span>
            <button className="px-3 py-1 rounded-md hover:bg-white/5">Next</button>
          </div>
        </div>
      </Panel>

      {invite && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-sm p-4" onClick={() => setInvite(false)}>
          <div onClick={(e) => e.stopPropagation()} className="glass-strong rounded-2xl w-full max-w-md p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-primary/15 text-primary"><Mail className="h-5 w-5" /></div>
              <div><h3 className="font-semibold">Invite to Foundry HQ</h3><p className="text-xs text-muted-foreground">They'll receive an email invitation.</p></div>
            </div>
            <div className="space-y-3">
              <Input placeholder="teammate@company.com, another@company.com" />
              <Select defaultValue="Developer">{ROLES.map((r) => <option key={r}>{r}</option>)}</Select>
              <Input placeholder="Add a personal note (optional)" />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setInvite(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setInvite(false)}>Send invites</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
