import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const eventDots: Record<number, string> = {
  4: "meeting",
  9: "deadline",
  12: "deadline",
  15: "meeting",
  22: "deadline",
  26: "meeting",
};

export function CalendarWidget() {
  const [ref, setRef] = useState(new Date());
  const today = new Date();

  const year = ref.getFullYear();
  const month = ref.getMonth();
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = ref.toLocaleString("en-US", { month: "long", year: "numeric" });

  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="rounded-2xl glass-strong p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">{monthName}</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setRef(new Date(year, month - 1, 1))}
            className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setRef(new Date(year, month + 1, 1))}
            className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.005 }}
            disabled={!d}
            className={cn(
              "relative aspect-square rounded-lg text-[11px] transition",
              !d && "invisible",
              d && !isToday(d!) && "text-foreground hover:bg-white/5",
              d && isToday(d!) && "bg-primary text-primary-foreground font-semibold shadow-glow",
            )}
          >
            {d}
            {d && eventDots[d] && !isToday(d) && (
              <span
                className={cn(
                  "absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full",
                  eventDots[d] === "deadline" ? "bg-destructive" : "bg-primary",
                )}
              />
            )}
          </motion.button>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Meetings
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-destructive" /> Deadlines
        </span>
      </div>
    </div>
  );
}
