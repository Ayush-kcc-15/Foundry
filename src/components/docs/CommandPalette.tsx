import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import {
  Search, FileText, FolderKanban, CheckSquare, Users, LayoutTemplate, Settings,
  Home, ArrowRight, Command as CmdIcon, MessagesSquare, Bell, Activity as ActivityIcon, Sparkles,
} from "lucide-react";
import { DOC_NODES, DOC_TEMPLATES } from "@/components/docs/data";
import { PROJECTS } from "@/components/projects/data";
import { TASKS } from "@/components/task/data";
import { DISCUSSIONS, MEMBERS, NOTIFICATIONS } from "@/components/collaboration/data";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  group: "Jump to" | "Actions" | "Projects" | "Tasks" | "Documents" | "Discussions" | "Templates" | "Team" | "Notifications";
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
};
const TEAM = MEMBERS.slice(0, 6);

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const go = (to: string) => { onClose(); navigate({ to } as any); };

  const items: Item[] = useMemo(() => {
    const arr: Item[] = [
      { id: "j-dash", group: "Jump to", label: "Dashboard", icon: Home, action: () => go("/dashboard") },
      { id: "j-work", group: "Jump to", label: "Workspace", icon: FolderKanban, action: () => go("/workspace") },
      { id: "j-proj", group: "Jump to", label: "All projects", icon: FolderKanban, action: () => go("/projects") },
      { id: "j-team", group: "Jump to", label: "Team", icon: Users, action: () => go("/team") },
      { id: "j-disc", group: "Jump to", label: "Discussions", icon: MessagesSquare, action: () => go("/discussions") },
      { id: "j-act",  group: "Jump to", label: "Activity", icon: ActivityIcon, action: () => go("/activity") },
      { id: "j-notif",group: "Jump to", label: "Notifications", icon: Bell, action: () => go("/notifications") },
      { id: "j-set",  group: "Jump to", label: "Settings", icon: Settings, action: () => go("/dashboard") },
      { id: "a-ai",   group: "Actions", label: "Ask AI assistant", hint: "Draft, summarize, plan", icon: Sparkles, action: () => go("/dashboard") },
      { id: "a-ndisc",group: "Actions", label: "Start a discussion", icon: MessagesSquare, action: () => go("/discussions") },
      ...PROJECTS.slice(0, 6).map((p) => ({
        id: `p-${p.id}`, group: "Projects" as const, label: p.name, hint: "Open project",
        icon: FolderKanban, action: () => go(`/projects/${p.id}`),
      })),
      ...TASKS.slice(0, 8).map((t) => ({
        id: `t-${t.id}`, group: "Tasks" as const, label: t.title, hint: t.status,
        icon: CheckSquare, action: () => go(`/projects/${PROJECTS[0].id}`),
      })),
      ...DISCUSSIONS.map((d) => ({
        id: `dc-${d.id}`, group: "Discussions" as const, label: d.title, hint: d.category,
        icon: MessagesSquare, action: () => go(`/discussions/${d.id}`),
      })),
      ...DOC_NODES.filter((n) => n.kind === "doc").map((d) => ({
        id: `d-${d.id}`, group: "Documents" as const, label: d.title, hint: d.category,
        icon: FileText, action: () => go(`/projects/${PROJECTS[0].id}`),
      })),
      ...DOC_TEMPLATES.map((t) => ({
        id: `tp-${t.id}`, group: "Templates" as const, label: t.title, hint: "Insert template",
        icon: LayoutTemplate, action: () => go(`/projects/${PROJECTS[0].id}`),
      })),
      ...TEAM.map((m) => ({
        id: `tm-${m.id}`, group: "Team" as const, label: m.name, hint: m.role,
        icon: Users, action: () => go("/team"),
      })),
      ...NOTIFICATIONS.slice(0, 6).map((n) => ({
        id: `nt-${n.id}`, group: "Notifications" as const, label: n.title, hint: n.description,
        icon: Bell, action: () => go("/notifications"),
      })),
    ];
    return arr;
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items.slice(0, 24);
    return items.filter((i) => i.label.toLowerCase().includes(query) || i.group.toLowerCase().includes(query)).slice(0, 30);
  }, [q, items]);

  useEffect(() => { setActive(0); }, [q, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === "Enter" && filtered[active]) { e.preventDefault(); filtered[active].action(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  // Group items
  const groups = filtered.reduce<Record<string, Item[]>>((acc, it) => {
    (acc[it.group] ??= []).push(it); return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed left-1/2 top-20 z-50 w-[92vw] max-w-2xl -translate-x-1/2 rounded-2xl glass-strong shadow-glow overflow-hidden"
            role="dialog" aria-label="Command palette"
          >
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects, tasks, documents, team…"
                className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <kbd className="hidden sm:inline text-[10px] font-mono text-muted-foreground border border-border/60 rounded px-1.5 py-0.5">
                <CmdIcon className="inline h-2.5 w-2.5 mr-0.5" />K
              </kbd>
              <kbd className="text-[10px] font-mono text-muted-foreground border border-border/60 rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-10 text-center text-xs text-muted-foreground">No results for "{q}"</div>
              ) : (
                Object.entries(groups).map(([group, list]) => (
                  <div key={group} className="mb-1.5">
                    <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">{group}</div>
                    {list.map((it) => {
                      const idx = filtered.indexOf(it);
                      const isActive = idx === active;
                      return (
                        <button
                          key={it.id}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => it.action()}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-left transition",
                            isActive ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-white/5",
                          )}
                        >
                          <it.icon className="h-4 w-4 text-primary/80" />
                          <span className="flex-1 truncate">{it.label}</span>
                          {it.hint && <span className="hidden sm:inline text-[10px] text-muted-foreground/80">{it.hint}</span>}
                          <ArrowRight className={cn("h-3 w-3 transition", isActive ? "opacity-100" : "opacity-0")} />
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border/60 px-3 py-2 text-[10px] text-muted-foreground">
              <span>↑ ↓ navigate · ↵ open · ESC close</span>
              <span>Foundry Command</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
