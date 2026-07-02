import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return <div className={cn("rounded-md bg-white/5 animate-pulse", className)} />;
}

export function StatsSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl glass-strong p-4">
          <div className="flex justify-between mb-3">
            <Bar className="h-9 w-9 rounded-xl" />
            <Bar className="h-4 w-10" />
          </div>
          <Bar className="h-7 w-24 mb-2" />
          <Bar className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl glass-strong p-5">
      <Bar className="h-4 w-32 mb-4" />
      <Bar className="h-52 w-full" />
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl glass-strong p-4">
      <div className="flex items-center gap-2.5 mb-3">
        <Bar className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-1.5">
          <Bar className="h-3.5 w-32" />
          <Bar className="h-3 w-20" />
        </div>
      </div>
      <Bar className="h-1.5 w-full mb-3" />
      <div className="flex gap-1 mb-3">
        <Bar className="h-4 w-12" />
        <Bar className="h-4 w-14" />
      </div>
      <div className="flex justify-between pt-3 border-t border-border/60">
        <Bar className="h-6 w-20" />
        <Bar className="h-3 w-14" />
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="rounded-2xl glass-strong p-5 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <Bar className="h-6 w-6 rounded-full" />
          <div className="flex-1 space-y-1.5">
            <Bar className="h-3 w-3/4" />
            <Bar className="h-2.5 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function WidgetSkeleton() {
  return (
    <div className="rounded-2xl glass-strong p-5 space-y-3">
      <Bar className="h-4 w-24" />
      <Bar className="h-32 w-full" />
    </div>
  );
}
