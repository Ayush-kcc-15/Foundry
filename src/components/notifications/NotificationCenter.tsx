import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AtSign, CheckSquare, FolderKanban, MessageSquare, Cog, Sparkles, Search, CheckCheck, Trash2, Bell } from "lucide-react";
import { NOTIFICATIONS, getMember, type NotificationCategory, type NotificationItem } from "@/components/collaboration/data";
import { cn } from "@/lib/utils";

const iconMap: Record<NotificationCategory, { Icon: any; cls: string }> = {
  mentions: { Icon: AtSign, cls: "bg-primary/15 text-primary" },
  tasks:    { Icon: CheckSquare, cls: "bg-success/15 text-success" },
  projects: { Icon: FolderKanban, cls: "bg-accent/15 text-accent" },
  comments: { Icon: MessageSquare, cls: "bg-highlight/15 text-highlight" },
  system:   { Icon: Cog, cls: "bg-muted text-muted-foreground" },
  ai:       { Icon: Sparkles, cls: "bg-warning/15 text-warning" },
};

const TABS: (NotificationCategory | "all")[] = ["all", "mentions", "tasks", "projects", "comments", "system", "ai"];

export function NotificationCenter() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const [tab, setTab] = useState<(typeof TABS)[number]>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return items.filter((n) => {
      const mt = tab === "all" || n.category === tab;
      const mq = !q || n.title.toLowerCase().includes(q.toLowerCase()) || n.description.toLowerCase().includes(q.toLowerCase());
      return mt && mq;
    });
  }, [items, tab, q]);

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  const clearAll = () => setItems([]);
  const remove = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));
  const toggleRead = (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));

  const unread = items.filter((n) => n.unread).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Notifications</h1>
          <p className="text-xs text-muted-foreground">{unread} unread · {items.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={markAll} className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-surface/50 px-3 py-1.5 text-xs hover:border-primary/40 transition">
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
          <button onClick={clearAll} className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-surface/50 px-3 py-1.5 text-xs hover:border-destructive/40 hover:text-destructive transition">
            <Trash2 className="h-3.5 w-3.5" /> Clear all
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notifications…"
            className="w-full rounded-xl border border-border/60 bg-surface/50 pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
        <div className="flex items-center rounded-xl border border-border/60 bg-surface/50 p-0.5 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-lg whitespace-nowrap capitalize transition",
                tab === t ? "bg-primary/20 text-highlight" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-surface/30 p-10 text-center">
          <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
          <div className="mt-2 text-sm font-semibold">You're all caught up</div>
          <p className="mt-1 text-xs text-muted-foreground">No notifications match this view.</p>
        </div>
      ) : (
        <ul className="grid gap-2.5">
          {filtered.map((n, i) => (
            <NotificationRow key={n.id} n={n} i={i} onRead={() => toggleRead(n.id)} onRemove={() => remove(n.id)} />
          ))}
        </ul>
      )}
    </div>
  );
}

export function NotificationRow({
  n, i = 0, onRead, onRemove,
}: {
  n: NotificationItem;
  i?: number;
  onRead?: () => void;
  onRemove?: () => void;
}) {
  const { Icon, cls } = iconMap[n.category];
  const actor = getMember(n.actorId);
  return (
    <motion.li
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.03 }}
      className={cn(
        "group relative flex items-start gap-3 rounded-2xl border p-3.5 transition",
        n.unread ? "border-primary/30 bg-primary/[0.05]" : "border-border/60 bg-surface/40",
      )}
    >
      {n.unread && <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary" />}
      <div className={cn("ml-2 grid h-9 w-9 shrink-0 place-items-center rounded-xl", cls)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold truncate">{n.title}</div>
          {actor && (
            <span className={`grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br ${actor.color} text-[8px] font-bold text-primary-foreground`}>
              {actor.initials}
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground truncate">{n.description}</div>
      </div>
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="text-[10px] text-muted-foreground">{n.time}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          {n.action && <button className="text-[10px] text-primary hover:text-highlight font-medium">{n.action}</button>}
          <button onClick={onRead} className="text-[10px] text-muted-foreground hover:text-foreground">{n.unread ? "Read" : "Unread"}</button>
          <button onClick={onRemove} className="grid h-5 w-5 place-items-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.li>
  );
}
