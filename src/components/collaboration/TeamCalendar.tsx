import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalIcon, Video, Rocket, Cake, PackageOpen, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type EventKind = "meeting" | "sprint" | "deadline" | "birthday" | "release" | "event";
type CalEvent = { id: string; day: number; title: string; time: string; kind: EventKind };

const EVENTS: CalEvent[] = [
  { id: "e1", day: 3, title: "Sprint 13 planning",    time: "09:30", kind: "sprint" },
  { id: "e2", day: 3, title: "Design sync",            time: "14:00", kind: "meeting" },
  { id: "e3", day: 6, title: "v2.0.5 release train",   time: "16:00", kind: "release" },
  { id: "e4", day: 8, title: "Marcus' birthday 🎂",    time: "all day", kind: "birthday" },
  { id: "e5", day: 12, title: "Team offsite",          time: "10:00", kind: "event" },
  { id: "e6", day: 14, title: "Docs polish deadline",  time: "18:00", kind: "deadline" },
  { id: "e7", day: 17, title: "Retro",                 time: "11:00", kind: "meeting" },
  { id: "e8", day: 21, title: "Sprint 13 review",      time: "15:00", kind: "sprint" },
  { id: "e9", day: 24, title: "Amara's 1-yr work-iversary", time: "all day", kind: "birthday" },
];

const KIND_STYLES: Record<EventKind, { cls: string; icon: any }> = {
  meeting:  { cls: "bg-primary/15 text-primary border-primary/30", icon: Video },
  sprint:   { cls: "bg-highlight/15 text-highlight border-highlight/30", icon: Rocket },
  deadline: { cls: "bg-destructive/15 text-destructive border-destructive/30", icon: CalIcon },
  birthday: { cls: "bg-warning/15 text-warning border-warning/30", icon: Cake },
  release:  { cls: "bg-accent/15 text-accent border-accent/30", icon: PackageOpen },
  event:    { cls: "bg-success/15 text-success border-success/30", icon: Users },
};

const MODES = ["Month", "Week", "Agenda"] as const;

export function TeamCalendar() {
  const [mode, setMode] = useState<(typeof MODES)[number]>("Month");
  return (
    <div className="rounded-2xl glass-strong p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold">Team calendar</h3>
          <p className="text-[11px] text-muted-foreground">Meetings, sprints, deadlines, birthdays</p>
        </div>
        <div className="flex items-center rounded-xl border border-border/60 bg-surface/50 p-0.5">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-lg transition",
                mode === m ? "bg-primary/20 text-highlight" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {mode === "Month" && <MonthGrid />}
      {mode === "Week" && <WeekView />}
      {mode === "Agenda" && <AgendaView />}

      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(KIND_STYLES).map(([k, s]) => (
          <span key={k} className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize", s.cls)}>
            <s.icon className="h-2.5 w-2.5" /> {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function MonthGrid() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="rounded-xl border border-border/60 bg-surface/30 p-3">
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
        {weekdays.map((d) => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const events = EVENTS.filter((e) => e.day === d);
          return (
            <motion.div
              key={d}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d * 0.005 }}
              className="min-h-[68px] rounded-lg border border-border/60 bg-background/40 p-1.5"
            >
              <div className="text-[10px] font-mono text-muted-foreground">{d}</div>
              <div className="mt-1 space-y-0.5">
                {events.slice(0, 2).map((e) => {
                  const s = KIND_STYLES[e.kind];
                  return (
                    <div key={e.id} className={cn("truncate rounded-md border px-1 py-0.5 text-[9px] font-medium", s.cls)}>
                      {e.title}
                    </div>
                  );
                })}
                {events.length > 2 && <div className="text-[9px] text-muted-foreground">+{events.length - 2} more</div>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView() {
  const week = EVENTS.filter((e) => e.day >= 3 && e.day <= 9);
  const days = [3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d) => (
        <div key={d} className="rounded-xl border border-border/60 bg-surface/30 p-2 min-h-[180px]">
          <div className="mb-2 text-center">
            <div className="text-[10px] uppercase text-muted-foreground">Day</div>
            <div className="text-lg font-semibold font-display">{d}</div>
          </div>
          <div className="space-y-1">
            {week.filter((e) => e.day === d).map((e) => {
              const s = KIND_STYLES[e.kind];
              return (
                <div key={e.id} className={cn("rounded-md border p-1.5 text-[10px]", s.cls)}>
                  <div className="font-semibold truncate">{e.title}</div>
                  <div className="opacity-70">{e.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function AgendaView() {
  return (
    <ul className="space-y-2">
      {EVENTS.map((e) => {
        const s = KIND_STYLES[e.kind];
        return (
          <li key={e.id} className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 p-3">
            <div className={cn("grid h-9 w-9 place-items-center rounded-xl border", s.cls)}>
              <s.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{e.title}</div>
              <div className="text-[11px] text-muted-foreground">Day {e.day} · {e.time}</div>
            </div>
            <span className={cn("text-[10px] font-medium capitalize", s.cls.split(" ")[1])}>{e.kind}</span>
          </li>
        );
      })}
    </ul>
  );
}
