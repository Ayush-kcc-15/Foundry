import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Users, Star, ShieldCheck, GitBranch, ArrowLeft, Sparkles,
  FileText, Files, LineChart, Settings, Columns3, CheckSquare, Rocket,
  Map as MapIcon, Filter as FilterIcon, ListFilter, LayoutGrid,
} from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/common";
import { getProject, PROJECTS } from "@/components/projects/data";
import { Tag, TechChip } from "@/components/projects/Tags";
import { MilestonesList, ProjectTimeline } from "@/components/projects/Timeline";
import { MemberCard } from "@/components/workspace/MemberCard";
import { ProjectNav, type ProjectTab } from "@/components/projects/ProjectNav";
import { NoMembers } from "@/components/projects/EmptyStates";
import { cn } from "@/lib/utils";
import { TASKS, type Task, type Status } from "@/components/task/data";
import { KanbanBoard } from "@/components/board/KanbanBoard";
import { TaskDrawer } from "@/components/board/TaskDrawer";
import { CreateTaskModal } from "@/components/board/CreateTaskModal";
import { Search } from "@/components/task/Search";
import { Filters, EMPTY_FILTERS, applyFilters, type TaskFilters } from "@/components/task/Filters";
import { QuickCreateFab } from "@/components/task/QuickCreateFab";
import { BacklogList } from "@/components/backlog/BacklogList";
import { CalendarView } from "@/components/calendar/CalendarView";
import { RoadmapTimeline } from "@/components/roadmap/RoadmapTimeline";
import { SprintPanel } from "@/components/sprint/SprintPanel";
import { Avatar, LabelChip, PriorityBadge, StatusBadge, TypeBadge } from "@/components/task/Labels";
import { DocsWorkspace } from "@/components/docs/DocsWorkspace";
import { TeamDashboard } from "@/components/collaboration/TeamDashboard";
import { ActivityTimeline } from "@/components/activity/ActivityTimeline";
import { DiscussionList } from "@/components/discussions/DiscussionList";

export const Route = createFileRoute("/_authenticated/projects/$projectId")({
  component: ProjectDetail,
  head: () => ({ meta: [{ title: "Project — Foundry" }] }),
});

const PROJECT_MEMBERS = [
  { name: "Ayush Kumar", role: "Owner · Engineering", initials: "AY", online: true, tasks: 14 },
  { name: "Sara Menon", role: "Staff Engineer", initials: "SM", online: true, tasks: 11 },
  { name: "Lena Kohl", role: "Design Lead", initials: "LK", online: false, tasks: 7 },
  { name: "Marcus Jung", role: "Product Manager", initials: "MJ", online: true, tasks: 9 },
];

function ProjectDetail() {
  const { projectId } = useParams({ from: "/projects/$projectId" });
  const project = getProject(projectId) ?? PROJECTS[0];
  const [tab, setTab] = useState<ProjectTab>("overview");
  const [fav, setFav] = useState(project.favorite);

  // Task state shared across Board / Tasks / Backlog / Calendar
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [drawerTask, setDrawerTask] = useState<Task | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createStatus, setCreateStatus] = useState<Status | undefined>();

  const openCreate = (s?: Status) => { setCreateStatus(s); setCreateOpen(true); };
  const openTask = (t: Task) => setDrawerTask(t);
  const updateTask = (t: Task) => {
    setTasks((prev) => prev.map((x) => (x.id === t.id ? t : x)));
    setDrawerTask(t);
  };
  const createTask = (t: Task) => setTasks((prev) => [t, ...prev]);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[1400px] space-y-5"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>

        {/* Banner */}
        <section className="relative overflow-hidden rounded-3xl glass-strong">
          <div className="h-40 sm:h-48" style={{ background: project.banner }}>
            <div className="absolute inset-0 grid-pattern opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>
          <div className="relative -mt-12 sm:-mt-14 px-5 sm:px-8 pb-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
              <div className="flex min-w-0 items-end gap-4">
                <div className={cn(
                  "grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-2xl font-bold text-primary-foreground shadow-glow ring-4 ring-background",
                  project.color,
                )}>
                  {project.icon}
                </div>
                <div className="min-w-0 pb-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="font-display text-xl sm:text-2xl font-semibold truncate">{project.name}</h1>
                    <button
                      onClick={() => setFav((s) => !s)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-warning"
                      aria-label="Favorite"
                    >
                      <Star className={cn("h-4 w-4", fav && "fill-warning text-warning")} />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 max-w-xl">{project.description}</p>
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <Button variant="outline" leftIcon={<GitBranch className="h-4 w-4" />}>Repo</Button>
                <Button leftIcon={<Sparkles className="h-4 w-4" />}>Ask AI</Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
              <StatusPill status={project.status} />
              <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-surface/50 px-2 py-0.5 text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-success" /> Health {project.health}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-surface/50 px-2 py-0.5 text-muted-foreground">
                <Users className="h-3 w-3" /> {project.team.length} members
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-surface/50 px-2 py-0.5 text-muted-foreground">
                <Calendar className="h-3 w-3" /> Due {project.due}
              </span>
              {project.tags.map((t) => <Tag key={t} label={t} />)}
            </div>
          </div>
        </section>

        {/* Developer workspace nav */}
        <ProjectNav projectId={project.id} active={tab} onChange={setTab} />

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "overview" && <Overview project={project} />}
            {tab === "board" && (
              <KanbanBoard
                tasks={tasks}
                setTasks={setTasks}
                onOpenTask={openTask}
                onAddTask={(s) => openCreate(s)}
                onOpenCreate={() => openCreate()}
              />
            )}
            {tab === "tasks" && (
              <TasksView tasks={tasks} onOpen={openTask} onCreate={() => openCreate()} />
            )}
            {tab === "calendar" && <CalendarView tasks={tasks} />}
            {tab === "roadmap" && (
              <div className="space-y-6">
                <SprintPanel tasks={tasks} />
                <RoadmapTimeline />
              </div>
            )}
            {tab === "documents" && <DocsWorkspace />}
            {tab === "files"       && <TabPlaceholder tab="files" />}
            {tab === "insights"    && <TabPlaceholder tab="insights" />}
            {tab === "team"        && <TeamDashboard />}
            {tab === "activity"    && <ActivityTimeline />}
            {tab === "discussions" && <DiscussionList />}
            {tab === "settings"    && <TabPlaceholder tab="settings" />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <TaskDrawer
        task={drawerTask}
        open={!!drawerTask}
        onClose={() => setDrawerTask(null)}
        onUpdate={updateTask}
      />
      <CreateTaskModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createTask}
        defaultStatus={createStatus}
      />
      <QuickCreateFab onCreateTask={() => openCreate()} />
    </DashboardLayout>
  );
}

function Overview({ project }: { project: ReturnType<typeof getProject> extends infer T ? NonNullable<T> : never }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6 min-w-0">
        {/* Progress + tech + summary */}
        <section className="rounded-2xl glass-strong p-5">
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Progress</div>
              <div className="text-2xl font-semibold font-display">{project.progress}%</div>
              <div className="mt-2 h-1.5 rounded-full bg-border/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Owner</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground">
                  {project.owner.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{project.owner.name}</div>
                  <div className="text-[11px] text-muted-foreground">{project.visibility} · {project.category}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Tech stack</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.tech.map((t) => <TechChip key={t} label={t} />)}
              </div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-3">Milestones</h2>
          <MilestonesList />
        </section>

        {/* Team */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold">Team members</h2>
            <button className="text-xs text-primary hover:text-highlight font-medium">Manage →</button>
          </div>
          {PROJECT_MEMBERS.length === 0 ? <NoMembers /> : (
            <div className="grid gap-2 sm:grid-cols-2">
              {PROJECT_MEMBERS.map((m, i) => <MemberCard key={m.name} member={m} i={i} />)}
            </div>
          )}
        </section>

        {/* Links */}
        <section className="grid gap-3 sm:grid-cols-3">
          <LinkCard icon={<Columns3 className="h-4 w-4" />} label="Linked Board" desc="14 tasks · 3 in progress" />
          <LinkCard icon={<FileText className="h-4 w-4" />} label="Linked Documents" desc="8 pages · updated today" />
          <LinkCard icon={<Calendar className="h-4 w-4" />} label="Linked Calendar" desc="4 upcoming events" />
        </section>
      </div>

      {/* Right column */}
      <aside className="space-y-4">
        <div className="rounded-2xl glass-strong p-5">
          <h3 className="text-sm font-semibold mb-4">Timeline</h3>
          <ProjectTimeline />
        </div>

        <div className="rounded-2xl glass-strong p-5">
          <h3 className="text-sm font-semibold mb-3">Files</h3>
          <ul className="space-y-2">
            {[
              { name: "architecture.pdf", size: "1.2 MB" },
              { name: "brand-assets.zip", size: "8.4 MB" },
              { name: "roadmap.md", size: "24 KB" },
              { name: "risk-review.docx", size: "312 KB" },
            ].map((f) => (
              <li key={f.name} className="flex items-center gap-2 text-xs">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Files className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{f.name}</div>
                  <div className="text-[10px] text-muted-foreground">{f.size}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl glass-strong p-5">
          <h3 className="text-sm font-semibold mb-3">Activity summary</h3>
          <ul className="text-xs space-y-2 text-muted-foreground">
            <li>12 commits this week</li>
            <li>4 PRs merged</li>
            <li>2 releases shipped</li>
            <li>28 comments across the team</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function LinkCard({ icon, label, desc }: { icon: React.ReactNode; label: string; desc: string }) {
  return (
    <button className="group flex items-center gap-3 rounded-2xl glass-strong p-4 text-left hover:border-primary/40 hover:-translate-y-0.5 transition">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/20">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-[11px] text-muted-foreground truncate">{desc}</div>
      </div>
    </button>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-success/15 text-success border-success/30",
    Planning: "bg-muted text-muted-foreground border-border",
    "In Review": "bg-warning/15 text-warning border-warning/30",
    "On Hold": "bg-destructive/15 text-destructive border-destructive/30",
    Completed: "bg-primary/15 text-highlight border-primary/30",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium", styles[status])}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {status}
    </span>
  );
}

function TabPlaceholder({ tab }: { tab: ProjectTab }) {
  const map: Record<string, { icon: any; label: string; blurb: string; phase: string }> = {
    files:    { icon: FileText,   label: "Files",          blurb: "Assets, attachments, and shared files for this project.",       phase: "Phase 8" },
    insights: { icon: LineChart,  label: "Insights",       blurb: "Velocity, cycle time, and quality insights for the project.",   phase: "Phase 8" },
    team:     { icon: Users,      label: "Team",           blurb: "Roles, permissions, and workload across the team.",             phase: "Phase 7" },
    settings: { icon: Settings,   label: "Settings",       blurb: "Project preferences, integrations, and danger zone.",           phase: "Phase 9" },
  };
  const item = map[tab] ?? map.settings;
  const Icon = item.icon;
  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-dashed border-border/60 bg-surface/30 p-10 text-center"
    >
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-base font-semibold">{item.label}</div>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{item.blurb}</p>
      <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-primary/15 border border-primary/30 text-highlight text-[11px] px-2.5 py-0.5 font-medium">
        Coming in {item.phase}
      </span>
    </motion.div>
  );
}

function TasksView({
  tasks, onOpen, onCreate,
}: { tasks: Task[]; onOpen: (t: Task) => void; onCreate: () => void }) {
  const [mode, setMode] = useState<"list" | "backlog">("list");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<TaskFilters>(EMPTY_FILTERS);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => applyFilters(tasks, filters, search) as Task[], [tasks, filters, search]);
  const backlog = useMemo(() => filtered.filter((t) => t.status === "Backlog"), [filtered]);

  const toggleSelect = (id: string) => setSelected((prev) => {
    const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Search value={search} onChange={setSearch} />
        <div className="flex items-center rounded-lg border border-border/60 bg-surface/50 p-0.5">
          {(["list", "backlog"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setMode(v)}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium capitalize",
                mode === v ? "bg-primary/20 text-highlight" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {v === "list" ? <LayoutGrid className="h-3 w-3" /> : <ListFilter className="h-3 w-3" />}
              {v}
            </button>
          ))}
        </div>
        <Button size="sm" leftIcon={<CheckSquare className="h-3.5 w-3.5" />} onClick={onCreate}>New task</Button>
      </div>
      <Filters filters={filters} setFilters={setFilters} />

      {mode === "backlog" ? (
        <BacklogList
          tasks={backlog}
          selected={selected}
          onToggleSelect={toggleSelect}
          onOpen={onOpen}
          onMoveToSprint={() => {}}
        />
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-surface/30 py-16 px-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-3">
            <FilterIcon className="h-6 w-6" />
          </div>
          <h3 className="font-display text-base font-semibold">No tasks match your filters</h3>
          <p className="text-xs text-muted-foreground mt-1">Try adjusting the search or clearing filters.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-xl">
          <div className="hidden md:grid grid-cols-[minmax(0,1fr)_120px_120px_120px_110px_60px] gap-3 border-b border-border/60 bg-surface/40 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <div>Task</div><div>Type</div><div>Priority</div><div>Status</div><div>Due</div><div className="text-right">SP</div>
          </div>
          <ul className="divide-y divide-border/40">
            {filtered.map((t) => (
              <motion.li
                key={t.id}
                layout
                onClick={() => onOpen(t)}
                className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,1fr)_120px_120px_120px_110px_60px] gap-3 items-center px-4 py-3 hover:bg-primary/5 cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-mono text-muted-foreground">{t.key}</span>
                    <span className="text-sm font-medium truncate">{t.title}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                    {t.labels.slice(0, 3).map((l) => <LabelChip key={l} name={l} size="xs" />)}
                    <span className="text-[10px] text-muted-foreground">· <Avatar userId={t.assignee} size={16} /></span>
                  </div>
                </div>
                <div className="hidden md:block"><TypeBadge value={t.type} /></div>
                <div className="hidden md:block"><PriorityBadge value={t.priority} /></div>
                <div className="hidden md:block"><StatusBadge value={t.status} /></div>
                <div className="hidden md:block text-xs text-muted-foreground">{new Date(t.due).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</div>
                <div className="hidden md:block text-right text-sm font-semibold text-highlight">{t.storyPoints}</div>
                <div className="md:hidden"><Avatar userId={t.assignee} size={22} /></div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
