import { motion } from "framer-motion";
import {
  Paperclip, MessageSquare, Calendar as CalendarIcon, Clock, CheckSquare,
  MoreHorizontal, Copy, Edit3, Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/components/task/data";
import { checklistProgress, daysUntil, formatDue } from "@/components/task/data";
import { Avatar, LabelChip, PriorityBadge, TypeBadge } from "@/components/task/Labels";

export function TaskCard({
  task,
  onOpen,
  isDragging,
  selected,
  onToggleSelect,
}: {
  task: Task;
  onOpen?: (t: Task) => void;
  isDragging?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: string, shift: boolean) => void;
}) {
  const cp = checklistProgress(task);
  const du = daysUntil(task.due);
  const overdue = du < 0 && task.status !== "Done";
  const soon = du >= 0 && du <= 2 && task.status !== "Done";

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("[data-stop]")) return;
        onOpen?.(task);
      }}
      className={cn(
        "group relative rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-3 cursor-pointer",
        "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_28px_-8px_rgba(20,184,166,0.35)]",
        "hover:border-primary/40 transition-all",
        isDragging && "rotate-2 scale-[1.02] shadow-glow border-primary/60",
        selected && "ring-2 ring-primary/60",
      )}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {onToggleSelect && (
            <button
              data-stop
              onClick={(e) => onToggleSelect(task.id, e.shiftKey)}
              className={cn(
                "h-3.5 w-3.5 shrink-0 rounded border transition-colors opacity-0 group-hover:opacity-100",
                selected ? "bg-primary border-primary opacity-100" : "border-border hover:border-primary",
              )}
              aria-label="Select task"
            />
          )}
          <TypeBadge value={task.type} />
          <span className="text-[10px] font-mono text-muted-foreground truncate">{task.key}</span>
        </div>
        <div className="flex items-center gap-1">
          <PriorityBadge value={task.priority} showLabel={false} />
          <QuickActions />
        </div>
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium leading-snug mb-2 line-clamp-2">{task.title}</h4>

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {task.labels.slice(0, 3).map((l) => <LabelChip key={l} name={l} size="xs" />)}
        </div>
      )}

      {/* Checklist progress bar */}
      {task.checklist.length > 0 && (
        <div className="mb-2.5">
          <div className="flex items-center justify-between text-[9px] text-muted-foreground mb-0.5">
            <span>Checklist</span>
            <span>{cp}%</span>
          </div>
          <div className="h-1 rounded-full bg-border/60 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${cp}%` }} />
          </div>
        </div>
      )}

      {/* Meta row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className={cn(
            "inline-flex items-center gap-0.5",
            overdue && "text-destructive font-semibold",
            soon && "text-warning font-medium",
          )}>
            <CalendarIcon className="h-2.5 w-2.5" />
            {formatDue(task.due)}
          </span>
          {task.estimateH > 0 && (
            <span className="inline-flex items-center gap-0.5">
              <Clock className="h-2.5 w-2.5" />
              {task.estimateH}h
            </span>
          )}
          {task.storyPoints > 0 && (
            <span className="grid h-4 min-w-[16px] place-items-center rounded bg-primary/15 border border-primary/30 px-1 text-[9px] font-semibold text-highlight">
              {task.storyPoints}
            </span>
          )}
          {task.checklist.length > 0 && (
            <span className="inline-flex items-center gap-0.5">
              <CheckSquare className="h-2.5 w-2.5" />
              {task.checklist.filter((c) => c.done).length}/{task.checklist.length}
            </span>
          )}
          {task.comments.length > 0 && (
            <span className="inline-flex items-center gap-0.5">
              <MessageSquare className="h-2.5 w-2.5" />
              {task.comments.length}
            </span>
          )}
          {task.attachments.length > 0 && (
            <span className="inline-flex items-center gap-0.5">
              <Paperclip className="h-2.5 w-2.5" />
              {task.attachments.length}
            </span>
          )}
        </div>
        <Avatar userId={task.assignee} size={22} />
      </div>
    </motion.div>
  );
}

function QuickActions() {
  return (
    <div
      data-stop
      className="hidden group-hover:flex items-center gap-0.5 rounded-md bg-surface/80 border border-border/60 backdrop-blur px-1 py-0.5"
    >
      <button className="grid h-5 w-5 place-items-center rounded text-muted-foreground hover:bg-primary/15 hover:text-primary" aria-label="Edit">
        <Edit3 className="h-2.5 w-2.5" />
      </button>
      <button className="grid h-5 w-5 place-items-center rounded text-muted-foreground hover:bg-primary/15 hover:text-primary" aria-label="Duplicate">
        <Copy className="h-2.5 w-2.5" />
      </button>
      <button className="grid h-5 w-5 place-items-center rounded text-muted-foreground hover:bg-primary/15 hover:text-primary" aria-label="Archive">
        <Archive className="h-2.5 w-2.5" />
      </button>
      <button className="grid h-5 w-5 place-items-center rounded text-muted-foreground hover:bg-primary/15 hover:text-primary" aria-label="More">
        <MoreHorizontal className="h-2.5 w-2.5" />
      </button>
    </div>
  );
}

export function TaskCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 p-3 animate-pulse space-y-2">
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 bg-border/60 rounded" />
        <div className="h-3 w-6 bg-border/60 rounded" />
      </div>
      <div className="h-4 w-3/4 bg-border/60 rounded" />
      <div className="h-4 w-1/2 bg-border/60 rounded" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-3 w-20 bg-border/60 rounded" />
        <div className="h-5 w-5 bg-border/60 rounded-full" />
      </div>
    </div>
  );
}
