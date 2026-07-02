import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Calendar, Star, MoreHorizontal, ShieldCheck, Users } from "lucide-react";
import type { Project } from "./data";
import { Tag, TechChip } from "./Tags";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  Active: "bg-success/15 text-success border-success/30",
  Planning: "bg-muted text-muted-foreground border-border",
  "In Review": "bg-warning/15 text-warning border-warning/30",
  "On Hold": "bg-destructive/15 text-destructive border-destructive/30",
  Completed: "bg-primary/15 text-highlight border-primary/30",
};

const priorityDot: Record<string, string> = {
  Critical: "bg-destructive",
  High: "bg-warning",
  Medium: "bg-primary",
  Low: "bg-muted-foreground",
};

const avatarGrads = [
  "from-primary to-accent",
  "from-warning to-destructive",
  "from-accent to-highlight",
  "from-highlight to-primary",
];

export function ProjectCard({
  project,
  onToggleFavorite,
}: {
  project: Project;
  onToggleFavorite?: (id: string) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl glass-strong hover:border-primary/40 transition-all"
    >
      {/* Banner */}
      <div className="relative h-20" style={{ background: project.banner }}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.(project.id);
          }}
          className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-lg bg-background/60 backdrop-blur text-muted-foreground hover:text-warning transition"
          aria-label="Favorite"
        >
          <Star className={cn("h-4 w-4", project.favorite && "fill-warning text-warning")} />
        </button>
        <div className="absolute -bottom-5 left-4">
          <div
            className={cn(
              "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-sm font-bold text-primary-foreground shadow-glow ring-4 ring-background",
              project.color,
            )}
          >
            {project.icon}
          </div>
        </div>
      </div>

      <div className="p-4 pt-7">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link
            to="/projects/$projectId"
            params={{ projectId: project.id }}
            className="min-w-0 flex-1"
          >
            <h3 className="truncate text-sm font-semibold hover:text-primary transition">
              {project.name}
            </h3>
          </Link>
          <button
            className="opacity-0 group-hover:opacity-100 transition grid h-6 w-6 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5"
            aria-label="More"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{project.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.tech.slice(0, 4).map((t) => (
            <TechChip key={t} label={t} />
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] text-muted-foreground">+{project.tech.length - 4}</span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium",
              statusStyle[project.status],
            )}
          >
            <span className="h-1 w-1 rounded-full bg-current" />
            {project.status}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className={cn("h-1.5 w-1.5 rounded-full", priorityDot[project.priority])} />
            {project.priority}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-success" />
            {project.health}
          </span>
        </div>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/60">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {project.team.slice(0, 3).map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-6 w-6 rounded-full border-2 border-background grid place-items-center text-[9px] font-bold text-primary-foreground bg-gradient-to-br",
                    avatarGrads[i % avatarGrads.length],
                  )}
                >
                  {m}
                </div>
              ))}
              {project.team.length > 3 && (
                <div className="h-6 w-6 rounded-full border-2 border-background bg-surface grid place-items-center text-[9px] font-medium text-muted-foreground">
                  +{project.team.length - 3}
                </div>
              )}
            </div>
            <Users className="h-3 w-3 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {project.due}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
