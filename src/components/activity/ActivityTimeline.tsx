import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckSquare, FileText, Rocket, Archive, UserPlus, MessageSquare, PackageOpen, MessagesSquare, GitPullRequest, Search,
} from "lucide-react";
import { ACTIVITY, getMember, type ActivityItem, type ActivityKind } from "@/components/collaboration/data";
import { cn } from "@/lib/utils";

const iconMap: Record<ActivityKind, { Icon: any; cls: string }> = {
  task_completed:     { Icon: CheckSquare,      cls: "bg-success/15 text-success" },
  doc_updated:        { Icon: FileText,         cls: "bg-accent/15 text-accent" },
  sprint_started:     { Icon: Rocket,           cls: "bg-primary/15 text-primary" },
  project_archived:   { Icon: Archive,          cls: "bg-muted text-muted-foreground" },
  member_joined:      { Icon: UserPlus,         cls: "bg-warning/15 text-warning" },
  comment_added:      { Icon: MessageSquare,    cls: "bg-highlight/15 text-highlight" },
  release_published:  { Icon: PackageOpen,      cls: "bg-primary/15 text-primary" },
  discussion_started: { Icon: MessagesSquare,   cls: "bg-accent/15 text-accent" },
  pr_merged:          { Icon: GitPullRequest,   cls: "bg-primary/15 text-primary" },
};

const KIND_TABS: (ActivityKind | "all")[] = ["all", "task_completed", "pr_merged", "comment_added", "release_published", "discussion_started", "member_joined"];
const KIND_LABEL: Record<string, string> = {
  all: "All",
  task_completed: "Tasks",
  pr_merged: "PRs",
  comment_added: "Comments",
  release_published: "Releases",
  discussion_started: "Discussions",
  member_joined: "Members",
};

export function ActivityTimeline({ items = ACTIVITY, compact = false }: { items?: ActivityItem[]; compact?: boolean }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<(typeof KIND_TABS)[number]>("all");

  const filtered = useMemo(() => {
    return items.filter((a) => {
      const mk = kind === "all" || a.kind === kind;
      const mq = !q || (a.title + " " + (a.target || "")).toLowerCase().includes(q.toLowerCase());
      return mk && mq;
    });
  }, [items, kind, q]);

  const groups = filtered.reduce<Record<string, ActivityItem[]>>((acc, a) => {
    (acc[a.dateGroup] ??= []).push(a);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {!compact && (
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search activity…"
              className="w-full rounded-xl border border-border/60 bg-surface/50 pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex items-center rounded-xl border border-border/60 bg-surface/50 p-0.5 overflow-x-auto">
            {KIND_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setKind(t)}
                className={cn(
                  "px-2.5 py-1 text-xs rounded-lg whitespace-nowrap transition",
                  kind === t ? "bg-primary/20 text-highlight" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {KIND_LABEL[t] || t}
              </button>
            ))}
          </div>
        </div>
      )}

      {Object.entries(groups).map(([label, list]) => (
        <div key={label}>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="flex-1 border-t border-border/60" />
            <div className="text-[10px] text-muted-foreground">{list.length}</div>
          </div>
          <ol className="relative space-y-3">
            <span className="absolute left-4 top-1 bottom-1 w-px bg-border/60" aria-hidden />
            {list.map((a, i) => (
              <ActivityRow key={a.id} a={a} i={i} />
            ))}
          </ol>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border/60 bg-surface/30 p-8 text-center">
          <div className="text-sm font-semibold">No activity</div>
          <p className="mt-1 text-xs text-muted-foreground">Nothing matches this filter.</p>
        </div>
      )}
    </div>
  );
}

function ActivityRow({ a, i }: { a: ActivityItem; i: number }) {
  const { Icon, cls } = iconMap[a.kind];
  const actor = getMember(a.actorId);
  return (
    <motion.li
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.03 }}
      className="relative flex items-start gap-3 pl-0"
    >
      <div className={cn("relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full", cls)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1 rounded-xl border border-border/60 bg-surface/40 p-2.5">
        <div className="flex items-center gap-2">
          {actor && (
            <span className={`grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br ${actor.color} text-[9px] font-semibold text-primary-foreground`}>
              {actor.initials}
            </span>
          )}
          <div className="min-w-0 text-xs">
            <span className="font-semibold text-foreground">{actor?.name || "Someone"}</span>{" "}
            <span className="text-muted-foreground">{a.title}</span>{" "}
            {a.target && <span className="text-foreground/90">{a.target}</span>}
          </div>
          <div className="ml-auto text-[10px] text-muted-foreground shrink-0">{a.time}</div>
        </div>
      </div>
    </motion.li>
  );
}
