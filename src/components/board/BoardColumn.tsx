import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { STATUS_META, type Status, type Task } from "@/components/task/data";
import { TaskCard } from "./TaskCard";

export function SortableTaskCard({
  task, onOpen, selected, onToggleSelect,
}: {
  task: Task;
  onOpen: (t: Task) => void;
  selected: boolean;
  onToggleSelect: (id: string, shift: boolean) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "task", status: task.status },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard
        task={task}
        onOpen={onOpen}
        selected={selected}
        onToggleSelect={onToggleSelect}
      />
    </div>
  );
}

export function BoardColumn({
  status, tasks, onOpen, onAdd, selectedIds, onToggleSelect,
}: {
  status: Status;
  tasks: Task[];
  onOpen: (t: Task) => void;
  onAdd: (s: Status) => void;
  selectedIds: Set<string>;
  onToggleSelect: (id: string, shift: boolean) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `col-${status}`, data: { type: "column", status } });
  const meta = STATUS_META[status];
  const done = status === "Done" ? tasks.length : Math.round((tasks.filter((t) => t.status === "Done").length / Math.max(1, tasks.length)) * 100);
  const progress = status === "Done" ? 100 : status === "Backlog" ? 0 : Math.min(100, tasks.length * 12);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex h-full w-[300px] shrink-0 flex-col rounded-2xl border border-border/60",
        "bg-gradient-to-b from-surface/60 to-surface/30 backdrop-blur-xl",
        "transition-colors",
        isOver && "border-primary/60 shadow-glow bg-primary/5",
      )}
    >
      {/* Header */}
      <div className="p-3 border-b border-border/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className={cn("h-2 w-2 rounded-full", meta.dot)} />
            <h3 className={cn("text-xs font-semibold uppercase tracking-wider truncate", meta.color)}>{status}</h3>
            <span className="rounded-full bg-border/60 px-1.5 text-[10px] font-semibold text-muted-foreground">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => onAdd(status)}
              className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-primary/15 hover:text-primary"
              aria-label={`Add task to ${status}`}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
            <button className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-surface" aria-label="Column options">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        {/* Animated progress */}
        <div className="h-1 rounded-full bg-border/60 overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", meta.dot)}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-[200px] scrollbar-none">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((t) => (
            <SortableTaskCard
              key={t.id}
              task={t}
              onOpen={onOpen}
              selected={selectedIds.has(t.id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="grid place-items-center py-10 text-center">
            <div className="text-[11px] text-muted-foreground">No tasks yet</div>
            <button
              onClick={() => onAdd(status)}
              className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary hover:text-highlight"
            >
              <Plus className="h-3 w-3" /> Add task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function BoardColumnSkeleton() {
  return (
    <div className="w-[300px] shrink-0 rounded-2xl border border-border/60 bg-surface/40 p-3 space-y-3">
      <div className="h-4 w-24 bg-border/60 rounded animate-pulse" />
      <div className="h-1 w-full bg-border/60 rounded animate-pulse" />
      <div className="space-y-2 pt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-border/40 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
