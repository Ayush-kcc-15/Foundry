import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, MapPin, Award, Sparkles, Calendar, FileText, CheckSquare, Circle } from "lucide-react";
import type { TeamMember } from "./data";
import { PresenceAvatar, PresencePill } from "./PresenceIndicator";
import { cn } from "@/lib/utils";

export function ProfileDrawer({
  member, open, onClose,
}: { member: TeamMember | null; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && member && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto border-l border-border/60 bg-background"
            role="dialog" aria-label={`${member.name} profile`}
          >
            <div className="relative">
              <div className="h-28 bg-gradient-to-br from-primary/30 via-accent/20 to-highlight/20">
                <div className="absolute inset-0 grid-pattern opacity-20" />
              </div>
              <button
                onClick={onClose}
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-background/60 backdrop-blur hover:bg-background transition"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="-mt-10 px-5 pb-5">
                <PresenceAvatar initials={member.initials} color={member.color} presence={member.presence} size={72} />
                <div className="mt-3 flex items-center gap-2">
                  <h2 className="font-display text-xl font-semibold">{member.name}</h2>
                  <PresencePill presence={member.presence} />
                </div>
                <p className="text-sm text-muted-foreground">{member.role} · {member.department}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> {member.email}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {member.timezone}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> Joined {member.joined}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border/60 px-5 py-4 space-y-5">
              <Section title="About">
                <p className="text-sm text-muted-foreground">{member.about}</p>
              </Section>

              <Section title="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((s) => (
                    <span key={s} className="rounded-full border border-border/60 bg-surface/50 px-2 py-0.5 text-[11px]">{s}</span>
                  ))}
                </div>
              </Section>

              {member.badges.length > 0 && (
                <Section title="Badges" icon={<Award className="h-3.5 w-3.5" />}>
                  <div className="flex flex-wrap gap-1.5">
                    {member.badges.map((b) => (
                      <span key={b.label} className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium", b.color)}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="Contribution graph">
                <ContributionGrid />
              </Section>

              <div className="grid grid-cols-2 gap-3">
                <StatBlock icon={<CheckSquare className="h-3.5 w-3.5" />} label="Tasks" value={member.tasksAssigned} />
                <StatBlock icon={<Sparkles className="h-3.5 w-3.5" />} label="Score" value={member.productivity} />
              </div>

              <Section title="Projects">
                <ul className="space-y-1.5">
                  {member.projects.map((p) => (
                    <li key={p} className="flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 px-2.5 py-2 text-xs">
                      <span className="font-medium">{p}</span>
                      <Circle className="h-2 w-2 fill-success stroke-success" />
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Recent documents" icon={<FileText className="h-3.5 w-3.5" />}>
                <ul className="space-y-1 text-xs">
                  {["Sprint 12 retro", "Realtime presence RFC", "Docs editor extensions"].map((d) => (
                    <li key={d} className="truncate rounded-md px-2 py-1.5 hover:bg-white/5 cursor-pointer">{d}</li>
                  ))}
                </ul>
              </Section>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 rounded-xl bg-primary text-primary-foreground text-sm font-medium py-2 hover:opacity-90 transition">
                  Send message
                </button>
                <button className="rounded-xl border border-border/60 bg-surface/50 px-3 py-2 text-sm hover:border-primary/40 transition">
                  Assign task
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function StatBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-xl glass-strong p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="text-xl font-semibold font-display">{value}</div>
    </div>
  );
}

function ContributionGrid() {
  const cells = Array.from({ length: 7 * 20 }, (_, i) => (i * 37) % 5);
  return (
    <div className="rounded-xl border border-border/60 bg-surface/40 p-3 overflow-x-auto">
      <div className="grid grid-flow-col grid-rows-7 gap-1" style={{ gridAutoColumns: "10px" }}>
        {cells.map((v, i) => (
          <div
            key={i}
            className={cn(
              "h-[10px] w-[10px] rounded-sm",
              v === 0 && "bg-border/40",
              v === 1 && "bg-primary/25",
              v === 2 && "bg-primary/45",
              v === 3 && "bg-primary/70",
              v === 4 && "bg-primary",
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-sm bg-border/40" />
          <span className="h-2 w-2 rounded-sm bg-primary/45" />
          <span className="h-2 w-2 rounded-sm bg-primary/70" />
          <span className="h-2 w-2 rounded-sm bg-primary" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
