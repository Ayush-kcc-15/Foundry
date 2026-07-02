import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronDown, FileText, Folder, FolderOpen, Plus,
  Star, Clock, Share2, Search, Pin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocNode } from "./data";
import { buildTree } from "./data";

type Section = "workspace" | "favorites" | "recent" | "shared";

export function DocsSidebar({
  nodes,
  activeId,
  onOpen,
  onCreate,
  query,
  onQueryChange,
}: {
  nodes: DocNode[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onCreate: (parentId: string | null) => void;
  query: string;
  onQueryChange: (q: string) => void;
}) {
  const tree = useMemo(() => buildTree(nodes), [nodes]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "f-eng": true, "f-api": true, "f-product": true, "f-meetings": true, "f-releases": true, "f-arch": false,
  });
  const [section, setSection] = useState<Section>("workspace");
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const favorites = nodes.filter((n) => n.favorite && n.kind === "doc");
  const shared = nodes.filter((n) => n.shared && n.kind === "doc");
  const recent = [...nodes].filter((n) => n.kind === "doc").slice(0, 5);

  const toggle = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }));

  function handleDrop(targetId: string | null) {
    // UI-only: pretend to move. Real move would mutate parentId.
    setDragId(null); setDragOverId(null);
  }

  function renderNode(node: DocNode, depth = 0) {
    const isFolder = node.kind === "folder";
    const isOpen = expanded[node.id];
    const children = tree.get(node.id) ?? [];
    const isActive = node.id === activeId;
    const isDragOver = dragOverId === node.id;

    return (
      <div key={node.id}>
        <div
          draggable
          onDragStart={() => setDragId(node.id)}
          onDragOver={(e) => { e.preventDefault(); setDragOverId(node.id); }}
          onDragLeave={() => setDragOverId((v) => (v === node.id ? null : v))}
          onDrop={() => handleDrop(node.id)}
          className={cn(
            "group flex items-center gap-1 rounded-md px-1.5 py-1 text-[13px] cursor-pointer select-none",
            isActive ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
            isDragOver && dragId !== node.id && "ring-1 ring-primary/50",
          )}
          style={{ paddingLeft: 6 + depth * 12 }}
          onClick={() => (isFolder ? toggle(node.id) : onOpen(node.id))}
        >
          {isFolder ? (
            <>
              <button
                type="button"
                className="grid h-4 w-4 place-items-center text-muted-foreground/70"
                onClick={(e) => { e.stopPropagation(); toggle(node.id); }}
                aria-label={isOpen ? "Collapse" : "Expand"}
              >
                {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>
              <span className="text-sm">{node.emoji ?? (isOpen ? "📂" : "📁")}</span>
            </>
          ) : (
            <>
              <span className="w-4" />
              {node.icon ? <node.icon className="h-3.5 w-3.5 text-primary/80" /> : <FileText className="h-3.5 w-3.5" />}
            </>
          )}
          <span className="truncate flex-1">{node.title}</span>
          {node.pinned && <Pin className="h-3 w-3 text-warning" />}
          {node.favorite && <Star className="h-3 w-3 text-warning fill-warning/70" />}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onCreate(isFolder ? node.id : node.parentId); }}
            className="opacity-0 group-hover:opacity-100 grid h-5 w-5 place-items-center rounded hover:bg-white/10"
            aria-label="Add page"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {isFolder && isOpen && children.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              {children.map((c) => renderNode(c, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const roots = tree.get(null) ?? [];
  const filtered = query
    ? nodes.filter((n) => n.kind === "doc" && n.title.toLowerCase().includes(query.toLowerCase()))
    : null;

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden rounded-2xl glass-strong">
      <div className="border-b border-border/60 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 px-2.5 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search docs…"
            className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {(["workspace", "favorites", "recent", "shared"] as Section[]).map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={cn(
                "rounded-md px-1.5 py-1 text-[10px] font-medium capitalize transition",
                section === s ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:bg-white/5",
              )}
              title={s}
            >
              {s === "workspace" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 text-sm">
        {filtered ? (
          filtered.length === 0 ? (
            <div className="p-4 text-xs text-muted-foreground">No matches.</div>
          ) : (
            filtered.map((d) => (
              <button
                key={d.id}
                onClick={() => onOpen(d.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px]",
                  d.id === activeId ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-white/5",
                )}
              >
                <FileText className="h-3.5 w-3.5 text-primary/80" />
                <span className="truncate">{d.title}</span>
              </button>
            ))
          )
        ) : section === "workspace" ? (
          roots.map((r) => renderNode(r))
        ) : section === "favorites" ? (
          <SimpleList items={favorites} activeId={activeId} onOpen={onOpen} emptyIcon={Star} emptyLabel="No favorites" />
        ) : section === "recent" ? (
          <SimpleList items={recent} activeId={activeId} onOpen={onOpen} emptyIcon={Clock} emptyLabel="No recent docs" />
        ) : (
          <SimpleList items={shared} activeId={activeId} onOpen={onOpen} emptyIcon={Share2} emptyLabel="Nothing shared" />
        )}
      </div>

      <div className="border-t border-border/60 p-2">
        <button
          onClick={() => onCreate(null)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary/15 py-1.5 text-xs font-medium text-primary hover:bg-primary/25"
        >
          <Plus className="h-3.5 w-3.5" /> New page
        </button>
      </div>
    </aside>
  );
}

function SimpleList({
  items, activeId, onOpen, emptyIcon: EmptyIcon, emptyLabel,
}: {
  items: DocNode[]; activeId: string | null; onOpen: (id: string) => void;
  emptyIcon: React.ComponentType<{ className?: string }>; emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <div className="grid place-items-center rounded-lg border border-dashed border-border/60 p-6 text-center">
        <EmptyIcon className="h-4 w-4 text-muted-foreground mb-1.5" />
        <div className="text-xs text-muted-foreground">{emptyLabel}</div>
      </div>
    );
  }
  return (
    <div>
      {items.map((d) => (
        <button
          key={d.id}
          onClick={() => onOpen(d.id)}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px]",
            d.id === activeId ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-white/5",
          )}
        >
          {d.icon ? <d.icon className="h-3.5 w-3.5 text-primary/80" /> : <FileText className="h-3.5 w-3.5" />}
          <span className="truncate">{d.title}</span>
        </button>
      ))}
    </div>
  );
}
