import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Send, Sparkles, TrendingUp, Search } from "lucide-react";
import { MEMBERS, PENDING_INVITES, type TeamMember } from "./data";
import { MemberCard } from "./MemberCard";
import { ProfileDrawer } from "./ProfileDrawer";

export function TeamDashboard() {
  const [q, setQ] = useState("");
  const [profile, setProfile] = useState<TeamMember | null>(null);
  const [dept, setDept] = useState<string>("All");

  const filtered = useMemo(() => {
    return MEMBERS.filter((m) => {
      const matchQ = !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.role.toLowerCase().includes(q.toLowerCase());
      const matchD = dept === "All" || m.department === dept;
      return matchQ && matchD;
    });
  }, [q, dept]);

  const online = MEMBERS.filter((m) => m.presence === "online");
  const recent = [...MEMBERS].sort((a, b) => (a.lastActive.includes("just") ? -1 : 1)).slice(0, 5);

  const roleCounts = MEMBERS.reduce<Record<string, number>>((acc, m) => {
    acc[m.department] = (acc[m.department] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: "Members", value: MEMBERS.length, icon: Users, tone: "text-primary" },
    { label: "Online now", value: online.length, icon: TrendingUp, tone: "text-success" },
    { label: "Pending", value: PENDING_INVITES.length, icon: Send, tone: "text-warning" },
    { label: "Avg. score", value: Math.round(MEMBERS.reduce((s, m) => s + m.productivity, 0) / MEMBERS.length), icon: Sparkles, tone: "text-highlight" },
  ];

  const departments = ["All", "Engineering", "Design", "Product", "Ops", "Marketing"];

  return (
    <>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl glass-strong p-4"
            >
              <div className="flex items-center justify-between">
                <div className={`grid h-9 w-9 place-items-center rounded-xl bg-primary/10 ${s.tone}`}>
                  <s.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 text-2xl font-semibold font-display">{s.value}</div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left: members */}
          <div className="space-y-4 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search members…"
                  className="w-full rounded-xl border border-border/60 bg-surface/50 pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex items-center rounded-xl border border-border/60 bg-surface/50 p-0.5 overflow-x-auto">
                {departments.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDept(d)}
                    className={`px-2.5 py-1 text-xs rounded-lg whitespace-nowrap transition ${dept === d ? "bg-primary/20 text-highlight" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((m, i) => (
                <MemberCard key={m.id} member={m} i={i} onOpen={setProfile} />
              ))}
            </div>
          </div>

          {/* Right: rails */}
          <aside className="space-y-4">
            <QuickInvite />
            <OnlineList />
            <RecentActive members={recent} onOpen={setProfile} />
            <PendingInvites />
            <RoleDistribution counts={roleCounts} />
          </aside>
        </div>
      </div>

      <ProfileDrawer member={profile} open={!!profile} onClose={() => setProfile(null)} />
    </>
  );
}

function QuickInvite() {
  const [email, setEmail] = useState("");
  return (
    <div className="rounded-2xl glass-strong p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <UserPlus className="h-4 w-4 text-primary" /> Quick invite
      </div>
      <p className="mb-3 text-[11px] text-muted-foreground">Send an invite by email.</p>
      <div className="flex gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="teammate@company.com"
          className="flex-1 rounded-xl border border-border/60 bg-surface/50 px-3 py-2 text-xs focus:outline-none focus:border-primary/50"
        />
        <button className="inline-flex items-center gap-1 rounded-xl bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:opacity-90 transition">
          <Send className="h-3 w-3" /> Send
        </button>
      </div>
    </div>
  );
}

function OnlineList() {
  const online = MEMBERS.filter((m) => m.presence === "online").slice(0, 6);
  return (
    <div className="rounded-2xl glass-strong p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold">Online now</div>
        <span className="rounded-full bg-success/15 text-success text-[10px] px-2 py-0.5 border border-success/30">{online.length}</span>
      </div>
      <ul className="space-y-2">
        {online.map((m) => (
          <li key={m.id} className="flex items-center gap-2 text-xs">
            <div className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ${m.color} text-[10px] font-semibold text-primary-foreground`}>{m.initials}</div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{m.name}</div>
              <div className="truncate text-[10px] text-muted-foreground">{m.role}</div>
            </div>
            <span className="h-2 w-2 rounded-full bg-success" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecentActive({ members, onOpen }: { members: TeamMember[]; onOpen: (m: TeamMember) => void }) {
  return (
    <div className="rounded-2xl glass-strong p-4">
      <div className="mb-3 text-sm font-semibold">Recently active</div>
      <ul className="space-y-2">
        {members.map((m) => (
          <li key={m.id}>
            <button onClick={() => onOpen(m)} className="w-full flex items-center gap-2 rounded-lg px-1.5 py-1.5 hover:bg-white/5 transition text-left">
              <div className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${m.color} text-[9px] font-semibold text-primary-foreground`}>{m.initials}</div>
              <span className="truncate text-xs flex-1">{m.name}</span>
              <span className="text-[10px] text-muted-foreground">{m.lastActive}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PendingInvites() {
  return (
    <div className="rounded-2xl glass-strong p-4">
      <div className="mb-3 text-sm font-semibold">Pending invitations</div>
      <ul className="space-y-2">
        {PENDING_INVITES.map((p) => (
          <li key={p.email} className="flex items-center gap-2 rounded-lg border border-dashed border-border/60 px-2.5 py-2 text-xs">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-warning/15 text-warning text-[10px] font-semibold">?</div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{p.email}</div>
              <div className="text-[10px] text-muted-foreground">{p.role} · sent {p.sent}</div>
            </div>
            <button className="text-[10px] text-primary hover:text-highlight font-medium">Resend</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoleDistribution({ counts }: { counts: Record<string, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const colors = ["bg-primary", "bg-accent", "bg-highlight", "bg-warning", "bg-success"];
  return (
    <div className="rounded-2xl glass-strong p-4">
      <div className="mb-3 text-sm font-semibold">Role distribution</div>
      <div className="mb-3 flex h-2 overflow-hidden rounded-full">
        {Object.entries(counts).map(([k, v], i) => (
          <div key={k} className={`${colors[i % colors.length]}`} style={{ width: `${(v / total) * 100}%` }} title={k} />
        ))}
      </div>
      <ul className="space-y-1.5">
        {Object.entries(counts).map(([k, v], i) => (
          <li key={k} className="flex items-center gap-2 text-xs">
            <span className={`h-2 w-2 rounded-full ${colors[i % colors.length]}`} />
            <span className="flex-1">{k}</span>
            <span className="text-muted-foreground">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
