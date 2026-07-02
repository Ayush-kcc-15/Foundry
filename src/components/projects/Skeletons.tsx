import { cn } from "@/lib/utils";
function Bar({ className }: { className?: string }) {
  return <div className={cn("rounded-md bg-white/5 animate-pulse", className)} />;
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl glass-strong overflow-hidden">
      <Bar className="h-20 w-full rounded-none" />
      <div className="p-4 pt-7 space-y-2.5">
        <Bar className="h-4 w-3/4" />
        <Bar className="h-3 w-full" />
        <Bar className="h-3 w-2/3" />
        <div className="flex gap-1">
          <Bar className="h-4 w-14" />
          <Bar className="h-4 w-14" />
        </div>
        <Bar className="h-1.5 w-full" />
        <div className="flex justify-between pt-2">
          <Bar className="h-6 w-24" />
          <Bar className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => <ProjectCardSkeleton key={i} />)}
    </div>
  );
}

export function WorkspaceSkeleton() {
  return (
    <div className="space-y-6">
      <Bar className="h-40 w-full rounded-3xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <Bar key={i} className="h-24 rounded-2xl" />)}
      </div>
    </div>
  );
}
