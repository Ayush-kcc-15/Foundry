import { motion } from "framer-motion";

/**
 * Themed skeleton primitives + preset layouts for major surfaces.
 * Usage: <SkeletonLoader variant="dashboard" />
 */

function Block({ className = "", style }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-white/[0.04] ${className}`}
      style={style}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(94,234,212,0.10), transparent)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-white/5 bg-[#17313A]/40 p-4 ${className}`}
    >
      {children}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Block className="h-7 w-48" />
        <Block className="h-9 w-32 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <Block className="h-3 w-20" />
            <Block className="mt-3 h-7 w-24" />
            <Block className="mt-4 h-2 w-full" />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Block className="h-4 w-32" />
          <Block className="mt-4 h-48 w-full" />
        </Card>
        <Card>
          <Block className="h-4 w-24" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Block className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Block className="h-3 w-3/4" />
                  <Block className="h-2 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ListSkeleton({ rows = 6 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <Card key={i} className="flex items-center gap-3">
          <Block className="h-9 w-9 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Block className="h-3 w-1/3" />
            <Block className="h-2 w-1/2" />
          </div>
          <Block className="h-6 w-20 rounded-full" />
        </Card>
      ))}
    </div>
  );
}

function BoardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, c) => (
        <Card key={c}>
          <Block className="h-4 w-24" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <Block className="h-3 w-3/4" />
                <Block className="mt-2 h-2 w-1/2" />
                <div className="mt-3 flex gap-2">
                  <Block className="h-5 w-12 rounded-full" />
                  <Block className="h-5 w-16 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function DocsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
      <Card>
        <Block className="h-4 w-24" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Block key={i} className="h-3 w-full" />
          ))}
        </div>
      </Card>
      <Card>
        <Block className="h-6 w-1/2" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Block key={i} className="h-3 w-full" style={{ width: `${60 + Math.random() * 40}%` }} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function CalendarSkeleton() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <Block className="h-6 w-40" />
        <Block className="h-8 w-24 rounded-full" />
      </div>
      <div className="mt-4 grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <Block key={i} className="h-16 w-full" />
        ))}
      </div>
    </Card>
  );
}

function TeamSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="flex items-center gap-3">
          <Block className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Block className="h-3 w-2/3" />
            <Block className="h-2 w-1/2" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function AISkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <div className="flex items-start gap-3">
            <Block className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Block className="h-3 w-1/4" />
              <Block className="h-2 w-full" />
              <Block className="h-2 w-5/6" />
              <Block className="h-2 w-3/4" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

const VARIANTS = {
  dashboard: DashboardSkeleton,
  projects: ListSkeleton,
  tasks: ListSkeleton,
  notifications: ListSkeleton,
  board: BoardSkeleton,
  docs: DocsSkeleton,
  calendar: CalendarSkeleton,
  team: TeamSkeleton,
  ai: AISkeleton,
};

export default function SkeletonLoader({ variant = "dashboard", ...rest }) {
  const Component = VARIANTS[variant] ?? DashboardSkeleton;
  return (
    <div className="w-full animate-in fade-in duration-300" aria-busy="true" aria-live="polite">
      <Component {...rest} />
    </div>
  );
}

export { Block as SkeletonBlock };
