import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type Member = {
  name: string;
  role: string;
  initials: string;
  online?: boolean;
  tasks?: number;
  color?: string;
};

const grads = [
  "from-primary to-accent",
  "from-warning to-destructive",
  "from-accent to-highlight",
  "from-highlight to-primary",
  "from-success to-primary",
];

export function MemberCard({ member, i = 0 }: { member: Member; i?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.03 }}
      whileHover={{ y: -2 }}
      className="flex items-center gap-3 rounded-2xl glass-strong p-3 hover:border-primary/40 transition"
    >
      <div className="relative shrink-0">
        <div className={cn("grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-primary-foreground", member.color || grads[i % grads.length])}>
          {member.initials}
        </div>
        {member.online && (
          <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-success stroke-background" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{member.name}</div>
        <div className="truncate text-[11px] text-muted-foreground">{member.role}</div>
      </div>
      {member.tasks !== undefined && (
        <div className="text-right shrink-0">
          <div className="text-sm font-semibold">{member.tasks}</div>
          <div className="text-[10px] text-muted-foreground">tasks</div>
        </div>
      )}
    </motion.div>
  );
}
