import { motion } from "framer-motion";
import {
  FolderPlus,
  PlusSquare,
  UserPlus,
  Sparkles,
  Upload,
  CalendarPlus,
} from "lucide-react";

const actions = [
  { icon: FolderPlus, label: "Create project", tint: "from-primary to-accent" },
  { icon: PlusSquare, label: "Create task", tint: "from-accent to-highlight" },
  { icon: UserPlus, label: "Invite team", tint: "from-warning to-destructive" },
  { icon: Sparkles, label: "Open AI Assistant", tint: "from-primary to-highlight" },
  { icon: Upload, label: "Upload document", tint: "from-highlight to-primary" },
  { icon: CalendarPlus, label: "Schedule meeting", tint: "from-success to-primary" },
];

export function QuickActions() {
  return (
    <section>
      <div className="mb-3">
        <h2 className="font-display text-lg font-semibold">Quick actions</h2>
        <p className="text-xs text-muted-foreground">Jump into your most common flows</p>
      </div>
      <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {actions.map((a, i) => (
          <motion.button
            key={a.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-2xl glass-strong p-4 text-left hover:border-primary/40 transition-all"
          >
            <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${a.tint} text-primary-foreground mb-2`}>
              <a.icon className="h-4 w-4" />
            </div>
            <div className="text-xs font-semibold leading-tight">{a.label}</div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
