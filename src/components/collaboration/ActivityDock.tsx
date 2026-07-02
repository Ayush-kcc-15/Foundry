import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Layers, X, Bell, MessageSquare, Users as UsersIcon, Sparkles, Calendar, Rocket, ChevronRight,
} from "lucide-react";
import { NOTIFICATIONS, ACTIVITY, MEMBERS, DISCUSSION_REPLIES, getMember } from "./data";
import { NotificationRow } from "@/components/notifications/NotificationCenter";
import { cn } from "@/lib/utils";

type Section = "notifications" | "comments" | "activity" | "ai" | "deadlines" | "sprint";

const SECTIONS: { id: Section; label: string; icon: any; tone: string }[] = [
  { id: "notifications", label: "Notifications", icon: Bell, tone: "text-primary" },
  { id: "comments",      label: "Comments",      icon: MessageSquare, tone: "text-highlight" },
  { id: "activity",      label: "Team activity", icon: UsersIcon, tone: "text-accent" },
  { id: "ai",            label: "AI suggestions",icon: Sparkles, tone: "text-warning" },
  { id: "deadlines",     label: "Deadlines",     icon: Calendar, tone: "text-success" },
  { id: "sprint",        label: "Sprint",        icon: Rocket, tone: "text-primary" },
];

export function ActivityDock() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<Section>("notifications");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open activity dock"
        className={cn(
          "fixed right-5 bottom-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-highlight text-primary-foreground shadow-glow hover:scale-105 transition lg:right-6 lg:bottom-6",
          open && "hidden",
        )}
      >
        <Layers className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground px-1">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col overflow-hidden border-l border-border/60 bg-background"
              role="dialog"
              aria-label="Universal activity dock"
            >
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-highlight text-primary-foreground">
                  <Layers className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Activity dock</div>
                  <div className="text-[10px] text-muted-foreground">Everything in one place · ⌘⇧A</div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-1 min-h-0">
                <nav className="w-14 border-r border-border/60 py-2">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSection(s.id)}
                      title={s.label}
                      className={cn(
                        "relative mx-auto my-1 grid h-9 w-9 place-items-center rounded-xl transition",
                        section === s.id ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                      )}
                    >
                      {section === s.id && (
                        <motion.span layoutId="dock-active" className="absolute -left-2 top-1.5 bottom-1.5 w-0.5 rounded-full bg-primary" />
                      )}
                      <s.icon className="h-[18px] w-[18px]" />
                    </button>
                  ))}
                </nav>

                <div className="flex-1 overflow-y-auto p-3">
                  <SectionHeader
                    label={SECTIONS.find((x) => x.id === section)!.label}
                    icon={SECTIONS.find((x) => x.id === section)!.icon}
                  />
                  <div className="mt-3">
                    {section === "notifications" && <NotificationsPanel />}
                    {section === "comments" && <CommentsPanel />}
                    {section === "activity" && <ActivityPanel />}
                    {section === "ai" && <AIPanel />}
                    {section === "deadlines" && <DeadlinesPanel />}
                    {section === "sprint" && <SprintPanel />}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SectionHeader({ label, icon: Icon }: { label: string; icon: any }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-primary" />
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <ul className="space-y-2">
      {NOTIFICATIONS.slice(0, 6).map((n, i) => <NotificationRow key={n.id} n={n} i={i} />)}
      <li>
        <Link to="/notifications" className="mt-2 flex items-center justify-center gap-1 text-[11px] text-primary hover:text-highlight font-medium">
          View all <ChevronRight className="h-3 w-3" />
        </Link>
      </li>
    </ul>
  );
}

function CommentsPanel() {
  const items = (DISCUSSION_REPLIES.d1 || []).slice(0, 4);
  return (
    <ul className="space-y-2">
      {items.map((c) => {
        const a = getMember(c.authorId);
        return (
          <li key={c.id} className="rounded-xl border border-border/60 bg-surface/40 p-2.5">
            <div className="flex items-center gap-2 mb-1">
              <div className={`grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br ${a?.color} text-[9px] font-semibold text-primary-foreground`}>{a?.initials}</div>
              <span className="text-[11px] font-medium">{a?.name}</span>
              <span className="text-[10px] text-muted-foreground ml-auto">{c.time}</span>
            </div>
            <div className="text-xs text-muted-foreground line-clamp-2">{c.body}</div>
          </li>
        );
      })}
    </ul>
  );
}

function ActivityPanel() {
  return (
    <ol className="relative space-y-2 pl-4">
      <span className="absolute left-1 top-1 bottom-1 w-px bg-border/60" />
      {ACTIVITY.slice(0, 6).map((a, i) => {
        const actor = getMember(a.actorId);
        return (
          <li key={a.id} className="relative">
            <span className="absolute -left-3.5 top-2 h-2 w-2 rounded-full bg-primary" />
            <div className="rounded-lg border border-border/60 bg-surface/40 p-2 text-xs">
              <span className="font-semibold">{actor?.name}</span>{" "}
              <span className="text-muted-foreground">{a.title}</span>{" "}
              {a.target && <span className="text-foreground/90">{a.target}</span>}
              <div className="text-[10px] text-muted-foreground mt-0.5">{a.time}</div>
            </div>
          </li>
        );
      })}
      <li>
        <Link to="/activity" className="mt-2 flex items-center justify-center gap-1 text-[11px] text-primary hover:text-highlight font-medium">
          Open activity center <ChevronRight className="h-3 w-3" />
        </Link>
      </li>
    </ol>
  );
}

function AIPanel() {
  const suggestions = [
    { title: "Split 'Universal Activity Dock' into 3 subtasks", detail: "Estimated 6h total across UI, wiring, and QA." },
    { title: "Draft a release note for v2.0.4", detail: "Includes dock, discussions, and profile drawer." },
    { title: "Summarize this week's engineering discussions", detail: "12 threads · 34 replies." },
  ];
  return (
    <ul className="space-y-2">
      {suggestions.map((s) => (
        <li key={s.title} className="rounded-xl border border-warning/20 bg-warning/[0.06] p-2.5">
          <div className="flex items-start gap-2">
            <Sparkles className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="text-xs font-semibold">{s.title}</div>
              <div className="text-[11px] text-muted-foreground">{s.detail}</div>
              <div className="mt-1.5 flex gap-1.5">
                <button className="rounded-md bg-warning/20 text-warning text-[10px] font-medium px-2 py-0.5">Apply</button>
                <button className="text-[10px] text-muted-foreground hover:text-foreground">Dismiss</button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function DeadlinesPanel() {
  const items = [
    { title: "Sprint 12 wrap-up", when: "Today · 6pm", tone: "text-destructive" },
    { title: "Docs polish PR review", when: "Tomorrow", tone: "text-warning" },
    { title: "v2.0.5 release train", when: "In 3 days", tone: "text-highlight" },
    { title: "Q1 roadmap review", when: "In 5 days", tone: "text-muted-foreground" },
  ];
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.title} className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface/40 p-2.5 text-xs">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span className="flex-1 truncate font-medium">{it.title}</span>
          <span className={`text-[10px] ${it.tone}`}>{it.when}</span>
        </li>
      ))}
    </ul>
  );
}

function SprintPanel() {
  return (
    <div className="space-y-2">
      <div className="rounded-xl border border-primary/30 bg-primary/[0.06] p-3">
        <div className="flex items-center gap-2 mb-2">
          <Rocket className="h-4 w-4 text-primary" />
          <div className="text-xs font-semibold">Sprint 13 · Collaboration</div>
        </div>
        <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>Progress</span><span>62%</span>
        </div>
        <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "62%" }} transition={{ duration: 0.6 }} className="h-full bg-gradient-to-r from-primary to-accent" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
          <div><div className="text-sm font-semibold">14</div><div className="text-muted-foreground">Done</div></div>
          <div><div className="text-sm font-semibold">6</div><div className="text-muted-foreground">In progress</div></div>
          <div><div className="text-sm font-semibold">3</div><div className="text-muted-foreground">Blocked</div></div>
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground">Presence: {MEMBERS.filter((m) => m.presence === "online").length} online</div>
    </div>
  );
}
