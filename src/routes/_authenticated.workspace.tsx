import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users, HardDrive, CalendarDays, Shield, Sparkles, Plus, ArrowRight,
  FolderKanban, ChevronRight, Activity,
} from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button, Badge } from "@/components/common";
import { PROJECTS } from "@/components/projects/data";
import { MemberCard } from "@/components/workspace/MemberCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/workspace")({
  component: WorkspacePage,
  head: () => ({ meta: [{ title: "Workspace — Foundry" }] }),
});

const MEMBERS = [
  { name: "Ayush Kumar", role: "Owner · Founding Eng", initials: "AY", online: true, tasks: 14 },
  { name: "Sara Menon", role: "Staff Engineer", initials: "SM", online: true, tasks: 11 },
  { name: "Lena Kohl", role: "Design Lead", initials: "LK", online: false, tasks: 7 },
  { name: "Marcus Jung", role: "PM", initials: "MJ", online: true, tasks: 9 },
  { name: "Ivan Petrov", role: "Backend Engineer", initials: "IP", online: false, tasks: 6 },
  { name: "Grace Ju", role: "SRE", initials: "GJ", online: true, tasks: 4 },
];

const ACTIVITY = [
  { who: "Sara", what: "shipped v1.4.0 of AI Assistant v2", when: "2h" },
  { who: "Ayush", what: "opened PR #284 on Foundry Web Platform", when: "4h" },
  { who: "Lena", what: "updated Design tokens v3", when: "1d" },
  { who: "Marcus", what: "created Sprint 12 planning doc", when: "2d" },
];

function WorkspacePage() {
  const pinned = PROJECTS.filter((p) => p.favorite);
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto max-w-[1400px] space-y-6"
      >
        {/* Banner */}
        <section className="relative overflow-hidden rounded-3xl glass-strong">
          <div
            className="h-40 sm:h-52"
            style={{ background: "linear-gradient(135deg, #0F766E, #5EEAD4 60%, #99F6E4)" }}
          >
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>
          <div className="relative -mt-14 sm:-mt-16 px-5 sm:px-8 pb-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
              <div className="flex min-w-0 items-end gap-4">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shadow-glow ring-4 ring-background">
                  F
                </div>
                <div className="min-w-0 pb-1">
                  <h1 className="font-display text-2xl sm:text-3xl font-semibold truncate">Foundry Labs</h1>
                  <p className="text-sm text-muted-foreground max-w-xl line-clamp-2">
                    The premium developer workspace for teams that plan, document, collaborate, and ship software beautifully.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" leftIcon={<Users className="h-4 w-4" />}>Invite</Button>
                <Link to="/projects">
                  <Button leftIcon={<Plus className="h-4 w-4" />}>New project</Button>
                </Link>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="primary">Pro workspace</Badge>
              <Badge variant="success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> All systems normal
              </Badge>
              <Badge variant="neutral">
                <Shield className="h-3 w-3" /> Team
              </Badge>
              <Badge variant="neutral">
                <CalendarDays className="h-3 w-3" /> Created Jun 12, 2025
              </Badge>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<FolderKanban className="h-4 w-4" />} label="Projects" value={PROJECTS.length} sub="8 active" />
          <StatCard icon={<Users className="h-4 w-4" />} label="Members" value={MEMBERS.length} sub="3 online" />
          <StatCard icon={<HardDrive className="h-4 w-4" />} label="Storage" value="6.4 GB" sub="of 15 GB" progress={42} />
          <StatCard icon={<Sparkles className="h-4 w-4" />} label="AI usage" value="342" sub="Requests today" />
        </section>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6 min-w-0">
            {/* Pinned projects */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">Pinned projects</h2>
                  <p className="text-xs text-muted-foreground">{pinned.length} starred</p>
                </div>
                <Link to="/projects" className="text-xs text-primary hover:text-highlight font-medium">
                  Browse all →
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {pinned.map((p) => (
                  <Link
                    key={p.id}
                    to="/projects/$projectId"
                    params={{ projectId: p.id }}
                    className="group rounded-2xl glass-strong p-4 hover:border-primary/40 hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={cn("grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br text-xs font-bold text-primary-foreground", p.color)}>
                        {p.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold group-hover:text-primary">{p.name}</div>
                        <div className="text-[10px] text-muted-foreground">Updated {p.updated}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
                    </div>
                    <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${p.progress}%` }} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Members */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">Members</h2>
                  <p className="text-xs text-muted-foreground">{MEMBERS.length} teammates</p>
                </div>
                <button className="text-xs text-primary hover:text-highlight font-medium">Manage →</button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {MEMBERS.map((m, i) => <MemberCard key={m.name} member={m} i={i} />)}
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-4">
            <div className="rounded-2xl glass-strong p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Quick actions</h3>
              </div>
              <div className="grid gap-2">
                <QuickBtn icon={<Plus />} label="Create project" />
                <QuickBtn icon={<Users />} label="Invite teammate" />
                <QuickBtn icon={<Sparkles />} label="Ask AI assistant" />
                <QuickBtn icon={<HardDrive />} label="Manage storage" />
              </div>
            </div>

            <div className="rounded-2xl glass-strong p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Recent activity</h3>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <ol className="relative space-y-3">
                <span className="absolute left-3 top-1 bottom-1 w-px bg-border/60" aria-hidden />
                {ACTIVITY.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative flex gap-3 pl-0"
                  >
                    <div className="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                      {a.who[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs">
                        <span className="font-medium">{a.who}</span>{" "}
                        <span className="text-muted-foreground">{a.what}</span>
                      </p>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{a.when} ago</div>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

function StatCard({
  icon, label, value, sub, progress,
}: { icon: React.ReactNode; label: string; value: React.ReactNode; sub: string; progress?: number }) {
  return (
    <div className="rounded-2xl glass-strong p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary border border-primary/20">
          {icon}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
      <div className="text-2xl font-semibold font-display">{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>
      {progress !== undefined && (
        <div className="mt-2 h-1.5 rounded-full bg-border/60 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

function QuickBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-surface/40 px-3 py-2 text-sm text-left hover:border-primary/40 hover:bg-surface transition">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
        <span className="h-3.5 w-3.5">{icon}</span>
      </span>
      <span className="flex-1 text-xs font-medium">{label}</span>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
    </button>
  );
}
