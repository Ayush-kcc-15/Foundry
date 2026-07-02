import type { ReactNode } from "react";
import { FolderOpen, BellOff, CheckSquare, Activity } from "lucide-react";

export function EmptyState({
  icon,
  title,
  description,
  cta,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  cta?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-surface/30 py-10 px-6 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-3">
        {icon}
      </div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground max-w-xs">{description}</div>
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );
}

export const NoProjects = () => (
  <EmptyState
    icon={<FolderOpen className="h-6 w-6" />}
    title="No projects yet"
    description="Create your first project to start organizing tasks, docs, and teams."
  />
);
export const NoNotifications = () => (
  <EmptyState icon={<BellOff className="h-6 w-6" />} title="You're all caught up" description="No new notifications right now." />
);
export const NoTasks = () => (
  <EmptyState icon={<CheckSquare className="h-6 w-6" />} title="No tasks" description="Nothing on your plate — good time to plan the next sprint." />
);
export const NoActivity = () => (
  <EmptyState icon={<Activity className="h-6 w-6" />} title="Quiet in here" description="Activity from your team will show up here." />
);
