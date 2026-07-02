import { motion } from "framer-motion";
import {
  FolderKanban,
  Code2,
  Sparkles,
  Users,
  FileText,
  BarChart3,
  Bell,
  Calendar,
} from "lucide-react";

const ICONS = [
  { Icon: FolderKanban, label: "Projects" },
  { Icon: Code2, label: "Code" },
  { Icon: Sparkles, label: "AI" },
  { Icon: Users, label: "Team" },
  { Icon: FileText, label: "Docs" },
  { Icon: BarChart3, label: "Analytics" },
  { Icon: Bell, label: "Notifications" },
  { Icon: Calendar, label: "Calendar" },
];

export default function OrbitAnimation({ radius = 140, duration = 24 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 grid place-items-center"
      aria-hidden="true"
    >
      <motion.div
        className="relative"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {ICONS.map(({ Icon, label }, i) => {
          const angle = (i / ICONS.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={label}
              className="absolute grid place-items-center rounded-full border border-primary/25 bg-[#0F2027]/70 backdrop-blur-sm"
              style={{
                width: 34,
                height: 34,
                left: `calc(50% + ${x}px - 17px)`,
                top: `calc(50% + ${y}px - 17px)`,
                boxShadow: "0 0 18px rgba(20,184,166,0.15)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
              aria-label={label}
            >
              <Icon className="h-4 w-4 text-accent" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
