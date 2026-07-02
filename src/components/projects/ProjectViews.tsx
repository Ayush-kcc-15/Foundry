import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Star, Calendar, MoreHorizontal, ChevronRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "./data";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  Active: "bg-success/15 text-success border-success/30",
  Planning: "bg-muted text-muted-foreground border-border",
  "In Review": "bg-warning/15 text-warning border-warning/30",
  "On Hold": "bg-destructive/15 text-destructive border-destructive/30",
  Completed: "bg-primary/15 text-highlight border-primary/30",
};

export function ProjectGrid({
  projects,
  onFavorite,
}: {
  projects: Project[];
  onFavorite: (id: string) => void;
}) {
  return (
    <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onToggleFavorite={onFavorite} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export function ProjectList({
  projects,
  onFavorite,
}: {
  projects: Project[];
  onFavorite: (id: string) => void;
}) {
  return (
    <motion.ul layout className="space-y-2">
      <AnimatePresence mode="popLayout">
        {projects.map((p) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="group flex items-center gap-3 rounded-2xl glass-strong p-3 hover:border-primary/40 transition"
          >
            <div
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-sm font-bold text-primary-foreground",
                p.color,
              )}
            >
              {p.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: p.id }}
                  className="truncate text-sm font-semibold hover:text-primary transition"
                >
                  {p.name}
                </Link>
                <span
                  className={cn(
                    "hidden sm:inline-flex rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
                    statusStyle[p.status],
                  )}
                >
                  {p.status}
                </span>
              </div>
              <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{p.description}</div>
            </div>
            <div className="hidden md:flex items-center gap-4 w-48 shrink-0">
              <div className="w-full">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>{p.progress}%</span>
                  <span>{p.due}</span>
                </div>
                <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </div>
            <button
              onClick={() => onFavorite(p.id)}
              className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-warning"
              aria-label="Favorite"
            >
              <Star className={cn("h-4 w-4", p.favorite && "fill-warning text-warning")} />
            </button>
            <Link
              to="/projects/$projectId"
              params={{ projectId: p.id }}
              className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-primary hover:bg-white/5"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export function ProjectTable({
  projects,
  onFavorite,
}: {
  projects: Project[];
  onFavorite: (id: string) => void;
}) {
  return (
    <motion.div layout className="overflow-x-auto rounded-2xl glass-strong">
      <table className="w-full text-sm">
        <thead className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Project</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
            <th className="text-left px-4 py-3 font-medium">Priority</th>
            <th className="text-left px-4 py-3 font-medium">Progress</th>
            <th className="text-left px-4 py-3 font-medium">Owner</th>
            <th className="text-left px-4 py-3 font-medium">Due</th>
            <th className="text-right px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {projects.map((p) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-b border-border/40 last:border-0 hover:bg-white/[0.03] transition"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-xs font-bold text-primary-foreground", p.color)}>
                      {p.icon}
                    </div>
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: p.id }}
                      className="truncate font-medium hover:text-primary"
                    >
                      {p.name}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px]", statusStyle[p.status])}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.priority}</td>
                <td className="px-4 py-3 w-40">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-border/60 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{p.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.owner.name}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {p.due}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      onClick={() => onFavorite(p.id)}
                      className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-warning"
                      aria-label="Favorite"
                    >
                      <Star className={cn("h-3.5 w-3.5", p.favorite && "fill-warning text-warning")} />
                    </button>
                    <button className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </motion.div>
  );
}
