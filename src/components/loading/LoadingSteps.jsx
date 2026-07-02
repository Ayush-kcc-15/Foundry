import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes,
  Users,
  FolderKanban,
  BarChart3,
  ShieldCheck,
  Check,
  Loader2,
} from "lucide-react";

const STEPS = [
  { key: "workspace", title: "Initialize Workspace", Icon: Boxes },
  { key: "team", title: "Fetch Team", Icon: Users },
  { key: "projects", title: "Load Projects", Icon: FolderKanban },
  { key: "analytics", title: "Prepare Analytics", Icon: BarChart3 },
  { key: "session", title: "Secure Session", Icon: ShieldCheck },
];

export default function LoadingSteps({ progress = 0 }) {
  const activeIndex = Math.min(
    STEPS.length - 1,
    Math.floor((progress / 100) * STEPS.length)
  );

  return (
    <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-5">
      {STEPS.map((step, i) => {
        const done = i < activeIndex || progress >= 100;
        const active = i === activeIndex && progress < 100;
        const { Icon } = step;
        return (
          <motion.li
            key={step.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className={`relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors ${
              done
                ? "border-primary/40 bg-primary/5"
                : active
                ? "border-accent/50 bg-accent/[0.06]"
                : "border-white/5 bg-white/[0.02]"
            }`}
            style={
              active
                ? { boxShadow: "0 0 24px rgba(94,234,212,0.18)" }
                : undefined
            }
          >
            <div className="flex w-full items-center justify-between">
              <span
                className={`grid h-7 w-7 place-items-center rounded-md ${
                  done
                    ? "bg-primary/20 text-primary"
                    : active
                    ? "bg-accent/15 text-accent"
                    : "bg-white/5 text-slate-500"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.span
                    key="done"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary"
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </motion.span>
                ) : active ? (
                  <motion.span
                    key="load"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>
            <span className="text-[11px] font-medium leading-tight text-slate-300">
              {step.title}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
}
