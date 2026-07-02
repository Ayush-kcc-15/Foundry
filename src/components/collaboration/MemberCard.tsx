import { motion } from "framer-motion";
import { Mail, User, TrendingUp, CheckSquare, FolderKanban } from "lucide-react";
import type { TeamMember } from "./data";
import { PresenceAvatar, PresencePill } from "./PresenceIndicator";

export function MemberCard({
  member, i = 0, onOpen,
}: { member: TeamMember; i?: number; onOpen?: (m: TeamMember) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.03 }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl glass-strong p-4 hover:border-primary/40 transition"
    >
      <div className="absolute inset-x-0 -top-20 h-32 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
      <div className="relative flex items-start gap-3">
        <PresenceAvatar initials={member.initials} color={member.color} presence={member.presence} size={44} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{member.name}</div>
              <div className="truncate text-[11px] text-muted-foreground">{member.role}</div>
            </div>
            <PresencePill presence={member.presence} />
          </div>

          {member.currentTask && (
            <div className="mt-2 truncate text-[11px] text-muted-foreground">
              <span className="text-foreground/80">Working on:</span> {member.currentTask}
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-3 grid grid-cols-3 gap-2">
        <Stat icon={<FolderKanban className="h-3 w-3" />} label="Projects" value={member.projects.length} />
        <Stat icon={<CheckSquare className="h-3 w-3" />} label="Tasks" value={member.tasksAssigned} />
        <Stat icon={<TrendingUp className="h-3 w-3" />} label="Score" value={`${member.productivity}`} />
      </div>

      <div className="relative mt-3 flex items-center justify-between gap-2">
        <span className="text-[10px] text-muted-foreground">Active {member.lastActive}</span>
        <div className="flex items-center gap-1">
          <button
            className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition"
            aria-label="Contact"
            title={`Email ${member.name}`}
          >
            <Mail className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onOpen?.(member)}
            className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-surface/50 px-2 py-1 text-[11px] font-medium hover:border-primary/40 hover:text-primary transition"
          >
            <User className="h-3 w-3" /> Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-surface/40 p-1.5 text-center">
      <div className="mx-auto mb-0.5 grid h-5 w-5 place-items-center rounded-md bg-primary/10 text-primary">{icon}</div>
      <div className="text-xs font-semibold">{value}</div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
