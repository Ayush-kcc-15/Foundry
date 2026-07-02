import { Hash, Search } from "lucide-react";
import { CONVERSATIONS, type Conversation } from "@/components/collaboration/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ConversationList({
  activeId, onSelect,
}: { activeId: string; onSelect: (id: string) => void }) {
  const [q, setQ] = useState("");
  const filtered = CONVERSATIONS.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  const channels = filtered.filter((c) => c.kind === "channel");
  const dms = filtered.filter((c) => c.kind === "dm");
  return (
    <div className="flex h-full flex-col">
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search chats…"
            className="w-full rounded-lg border border-border/60 bg-surface/60 pl-7 pr-2 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-1.5 pb-2 space-y-3">
        <Group title="Channels" items={channels} activeId={activeId} onSelect={onSelect} />
        <Group title="Direct messages" items={dms} activeId={activeId} onSelect={onSelect} />
      </div>
    </div>
  );
}

function Group({ title, items, activeId, onSelect }: { title: string; items: Conversation[]; activeId: string; onSelect: (id: string) => void }) {
  return (
    <div>
      <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul>
        {items.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect(c.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition",
                activeId === c.id ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
              )}
            >
              {c.kind === "channel"
                ? <Hash className="h-3.5 w-3.5 shrink-0" />
                : <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent" />
              }
              <span className="flex-1 truncate text-xs">{c.name}</span>
              {c.unread > 0 && (
                <span className="rounded-full bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5">{c.unread}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
