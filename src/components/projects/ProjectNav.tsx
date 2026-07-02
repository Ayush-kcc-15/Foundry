import { motion } from "framer-motion";
import {
  LayoutDashboard, Columns3, CheckSquare, Calendar, Map,
  FileText, Files, LineChart, Users, Settings, Activity, MessagesSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const PROJECT_TABS = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "board", label: "Board", icon: Columns3 },
  { key: "tasks", label: "Tasks", icon: CheckSquare },
  { key: "calendar", label: "Calendar", icon: Calendar },
  { key: "roadmap", label: "Roadmap", icon: Map },
  { key: "documents", label: "Docs", icon: FileText },
  { key: "files", label: "Files", icon: Files },
  { key: "insights", label: "Insights", icon: LineChart },
  { key: "team", label: "Team", icon: Users },
  { key: "activity", label: "Activity", icon: Activity },
  { key: "discussions", label: "Discussions", icon: MessagesSquare },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

export type ProjectTab = typeof PROJECT_TABS[number]["key"];

export function ProjectNav({
  projectId,
  active,
  onChange,
}: {
  projectId: string;
  active: ProjectTab;
  onChange: (tab: ProjectTab) => void;
}) {
  return (
    <nav className="border-b border-border/60">
      <div className="flex gap-1 overflow-x-auto scrollbar-none -mb-px">
        {PROJECT_TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={cn(
                "relative inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium whitespace-nowrap transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
              {isActive && (
                <motion.span
                  layoutId="project-tab-underline"
                  className="absolute left-2 right-2 bottom-0 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
