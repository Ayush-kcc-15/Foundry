import { motion } from "framer-motion";
import { Check, Rocket, FileText, UserPlus, MoveRight, GitPullRequest } from "lucide-react";
import { activityFeed } from "./data";

const iconMap = {
  check: { Icon: Check, cls: "bg-success/15 text-success" },
  sprint: { Icon: Rocket, cls: "bg-primary/15 text-primary" },
  doc: { Icon: FileText, cls: "bg-accent/15 text-accent" },
  user: { Icon: UserPlus, cls: "bg-warning/15 text-warning" },
  move: { Icon: MoveRight, cls: "bg-highlight/15 text-highlight" },
  pr: { Icon: GitPullRequest, cls: "bg-primary/15 text-primary" },
};

export function ActivityFeed() {
  return (
    <div className="rounded-2xl glass-strong p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">Recent activity</h3>
          <p className="text-[11px] text-muted-foreground">Across your workspace</p>
        </div>
        <button className="text-xs text-primary hover:text-highlight font-medium">All</button>
      </div>

      <ol className="relative space-y-4">
        <span className="absolute left-3 top-1 bottom-1 w-px bg-border/60" aria-hidden />
        {activityFeed.map((a, i) => {
          const { Icon, cls } = iconMap[a.icon as keyof typeof iconMap];
          return (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative flex gap-3 pl-0"
            >
              <div className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full ${cls}`}>
                <Icon className="h-3 w-3" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs">
                  <span className="font-medium text-foreground">{a.user}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  {a.target && <span className="text-foreground">{a.target}</span>}
                </p>
                <div className="text-[10px] text-muted-foreground mt-0.5">{a.time} ago</div>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
