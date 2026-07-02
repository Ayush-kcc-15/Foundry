import { useMemo, useState } from "react";
import {
  DndContext, DragOverlay, PointerSensor, KeyboardSensor,
  useSensor, useSensors, closestCorners,
  type DragEndEvent, type DragStartEvent, type DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, Plus, Target, Zap, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/common";
import { STATUSES, type Status, type Task, tasksByStatus } from "@/components/task/data";
import { BoardColumn } from "./BoardColumn";
import { TaskCard } from "./TaskCard";
import { SprintSummary } from "@/components/sprint/SprintPanel";
import { BulkActions } from "@/components/task/BulkActions";

export function KanbanBoard({
  tasks,
  setTasks,
  onOpenTask,
  onAddTask,
  onOpenCreate,
}: {
  tasks: Task[];
  setTasks: (updater: (prev: Task[]) => Task[]) => void;
  onOpenTask: (t: Task) => void;
  onAddTask: (s: Status) => void;
  onOpenCreate: () => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [focus, setFocus] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const grouped = useMemo(() => tasksByStatus(tasks), [tasks]);
  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  const findColumn = (id: string): Status | null => {
    if (id.startsWith("col-")) return id.slice(4) as Status;
    const t = tasks.find((x) => x.id === id);
    return t?.status ?? null;
  };

  function handleDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }

  function handleDragOver(e: DragOverEvent) {
    const { active, over } = e;
    if (!over) return;
    const activeCol = findColumn(String(active.id));
    const overCol = findColumn(String(over.id));
    if (!activeCol || !overCol || activeCol === overCol) return;
    setTasks((prev) => prev.map((t) => (t.id === active.id ? { ...t, status: overCol } : t)));
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveId(null);
    if (!over) return;
    if (active.id === over.id) return;
    const activeCol = findColumn(String(active.id));
    const overCol = findColumn(String(over.id));
    if (!activeCol || !overCol) return;
    if (activeCol === overCol && !String(over.id).startsWith("col-")) {
      // reorder within column
      setTasks((prev) => {
        const colTasks = prev.filter((t) => t.status === activeCol).sort((a, b) => a.order - b.order);
        const oldIndex = colTasks.findIndex((t) => t.id === active.id);
        const newIndex = colTasks.findIndex((t) => t.id === over.id);
        if (oldIndex < 0 || newIndex < 0) return prev;
        const reordered = arrayMove(colTasks, oldIndex, newIndex);
        const orderMap = new Map(reordered.map((t, i) => [t.id, i]));
        return prev.map((t) => (orderMap.has(t.id) ? { ...t, order: orderMap.get(t.id)! } : t));
      });
    }
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  return (
    <div className="space-y-4">
      {/* Compact sprint summary + focus toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-surface/40 backdrop-blur px-4 py-3">
        <SprintSummary tasks={tasks} />
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={onOpenCreate}>
            New task
          </Button>
          <button
            onClick={() => setFocus((f) => !f)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition",
              focus
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-border/60 bg-surface/50 text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={focus}
          >
            {focus ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            Focus mode
          </button>
        </div>
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className={cn("relative overflow-x-auto pb-3 -mx-2 px-2 scrollbar-none", focus && "rounded-2xl")}>
          <div className={cn("flex gap-4 min-h-[70vh]", focus && "min-h-[80vh]")}>
            {STATUSES.map((s) => (
              <BoardColumn
                key={s}
                status={s}
                tasks={grouped[s]}
                onOpen={onOpenTask}
                onAdd={onAddTask}
                selectedIds={selected}
                onToggleSelect={toggleSelect}
              />
            ))}
          </div>
        </div>
        <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.2, 0, 0, 1)" }}>
          {activeTask ? (
            <div className="w-[280px] rotate-2">
              <TaskCard task={activeTask} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AnimatePresence>
        {selected.size > 0 && (
          <BulkActions
            count={selected.size}
            onClear={() => setSelected(new Set())}
            onDelete={() => {
              setTasks((prev) => prev.filter((t) => !selected.has(t.id)));
              setSelected(new Set());
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
