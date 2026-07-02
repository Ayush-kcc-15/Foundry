import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, Pencil, Columns2, History, MessageSquare, Info, Share2, Star, MoreHorizontal,
  ChevronLeft, ChevronRight, LayoutTemplate, FileText, Pin,
} from "lucide-react";
import { DocsSidebar } from "./DocsSidebar";
import { DocsEditor } from "./DocsEditor";
import { MarkdownPreview } from "./MarkdownPreview";
import { PropertiesPanel } from "./PropertiesPanel";
import { CommentsPanel } from "./CommentsPanel";
import { VersionHistory } from "./VersionHistory";
import { TemplateGallery } from "./TemplateGallery";
import { DocumentCard } from "./DocumentCard";
import { SearchBar } from "./SearchBar";
import { ReadingStats } from "./ReadingStats";
import { ActivityTimeline } from "./DocActivityTimeline";
import { DOC_NODES, DOC_TEMPLATES, type DocNode } from "./data";
import { NoDocuments } from "./EmptyStates";
import { cn } from "@/lib/utils";

type Mode = "edit" | "preview" | "split";
type RightTab = "properties" | "comments" | "activity";
type View = "home" | "doc" | "templates";

export function DocsWorkspace() {
  const [nodes, setNodes] = useState<DocNode[]>(DOC_NODES);
  const [activeId, setActiveId] = useState<string | null>("d-readme");
  const [view, setView] = useState<View>("home");
  const [mode, setMode] = useState<Mode>("edit");
  const [rightTab, setRightTab] = useState<RightTab>("properties");
  const [rightOpen, setRightOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [query, setQuery] = useState("");

  const activeDoc = useMemo(
    () => (activeId ? nodes.find((n) => n.id === activeId && n.kind === "doc") ?? null : null),
    [activeId, nodes],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "e" && (e.ctrlKey || e.metaKey) && e.shiftKey) { setMode("edit"); e.preventDefault(); }
      if (e.key === "p" && (e.ctrlKey || e.metaKey) && e.shiftKey) { setMode("preview"); e.preventDefault(); }
      if (e.key === "\\" && (e.ctrlKey || e.metaKey)) { setSidebarOpen((s) => !s); e.preventDefault(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openDoc = (id: string) => {
    setActiveId(id); setView("doc");
  };

  const createDoc = (parentId: string | null) => {
    const id = `d-${Date.now()}`;
    const next: DocNode = {
      id, parentId, title: "Untitled", kind: "doc", icon: FileText,
      category: "Engineering", tags: [], author: "You", initials: "YO",
      updatedAt: "just now", words: 0, content: "<h1>Untitled</h1><p></p>",
      versions: [{ id: "v1", version: "1.0", author: "You", initials: "YO", date: "just now", summary: "Document created." }],
      comments: [],
      activity: [{ id: "a1", kind: "created", actor: "You", initials: "YO", time: "just now" }],
    };
    setNodes([next, ...nodes]);
    openDoc(id);
  };

  const useTemplate = (t: typeof DOC_TEMPLATES[number]) => {
    const id = `d-${Date.now()}`;
    const next: DocNode = {
      id, parentId: null, title: t.title, kind: "doc", icon: t.icon,
      category: t.category, tags: [], author: "You", initials: "YO",
      updatedAt: "just now", words: 0, content: t.content,
      versions: [{ id: "v1", version: "1.0", author: "You", initials: "YO", date: "just now", summary: `Created from template: ${t.title}` }],
      comments: [],
      activity: [{ id: "a1", kind: "created", actor: "You", initials: "YO", time: "just now" }],
    };
    setNodes([next, ...nodes]);
    openDoc(id);
  };

  const updateActive = (patch: Partial<DocNode>) => {
    if (!activeDoc) return;
    setNodes((ns) => ns.map((n) => (n.id === activeDoc.id ? { ...n, ...patch } : n)));
  };

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px] min-h-[720px]">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            key="sb"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="hidden lg:block h-[calc(100vh-14rem)] sticky top-24"
          >
            <div className="flex h-full flex-col gap-2">
              <button
                onClick={() => { setView("home"); setActiveId(null); }}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium",
                  view === "home" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-white/5",
                )}
              >
                <Pin className="h-3.5 w-3.5" /> Documentation home
              </button>
              <button
                onClick={() => setView("templates")}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium",
                  view === "templates" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-white/5",
                )}
              >
                <LayoutTemplate className="h-3.5 w-3.5" /> Templates
              </button>
              <div className="flex-1 min-h-0">
                <DocsSidebar
                  nodes={nodes}
                  activeId={activeId}
                  onOpen={openDoc}
                  onCreate={createDoc}
                  query={query}
                  onQueryChange={setQuery}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="hidden lg:grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5"
            title="Toggle sidebar"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {view === "doc" && activeDoc ? (
            <>
              <input
                value={activeDoc.title}
                onChange={(e) => updateActive({ title: e.target.value })}
                className="min-w-0 flex-1 bg-transparent text-lg font-semibold outline-none"
              />
              <ModeSwitcher mode={mode} setMode={setMode} />
              <button onClick={() => setHistoryOpen(true)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5" title="Version history">
                <History className="h-4 w-4" />
              </button>
              <button onClick={() => updateActive({ favorite: !activeDoc.favorite })} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5" title="Favorite">
                <Star className={cn("h-4 w-4", activeDoc.favorite && "text-warning fill-warning/70")} />
              </button>
              <button className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5" title="Share"><Share2 className="h-4 w-4" /></button>
              <button
                onClick={() => setRightOpen((s) => !s)}
                className="hidden xl:grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5"
                title="Toggle panel"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </>
          ) : (
            <h2 className="text-lg font-semibold">
              {view === "templates" ? "Templates" : "Documentation home"}
            </h2>
          )}
        </div>

        <motion.div
          key={`${view}-${activeId}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl glass-strong overflow-hidden"
        >
          {view === "home" && (
            <DocsHome nodes={nodes} onOpen={openDoc} onCreate={() => createDoc(null)} onOpenTemplates={() => setView("templates")} onUseTemplate={useTemplate} />
          )}
          {view === "templates" && (
            <div className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Choose a template</h3>
              </div>
              <TemplateGallery onUse={useTemplate} />
            </div>
          )}
          {view === "doc" && activeDoc && (
            <div className="min-h-[600px]">
              {mode === "edit" && (
                <DocsEditor content={activeDoc.content ?? ""} onUpdate={(html) => updateActive({ content: html, updatedAt: "just now" })} />
              )}
              {mode === "preview" && (
                <MarkdownPreview html={activeDoc.content ?? ""} />
              )}
              {mode === "split" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                  <div className="border-b lg:border-b-0 lg:border-r border-border/60">
                    <DocsEditor content={activeDoc.content ?? ""} onUpdate={(html) => updateActive({ content: html, updatedAt: "just now" })} />
                  </div>
                  <MarkdownPreview html={activeDoc.content ?? ""} className="min-h-[600px]" />
                </div>
              )}
              <div className="border-t border-border/60 px-6 py-3 sm:px-10">
                <ReadingStats doc={activeDoc} />
              </div>
            </div>
          )}
          {view === "doc" && !activeDoc && (
            <div className="p-8"><NoDocuments action={
              <button onClick={() => createDoc(null)} className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">New page</button>
            } /></div>
          )}
        </motion.div>
      </div>

      {/* Right panel */}
      <AnimatePresence>
        {rightOpen && view === "doc" && activeDoc && (
          <motion.aside
            key="rp"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            className="hidden xl:flex h-[calc(100vh-14rem)] sticky top-24 flex-col rounded-2xl glass-strong overflow-hidden"
          >
            <div className="grid grid-cols-3 border-b border-border/60">
              <PanelTab active={rightTab === "properties"} onClick={() => setRightTab("properties")} icon={Info} label="Info" />
              <PanelTab active={rightTab === "comments"} onClick={() => setRightTab("comments")} icon={MessageSquare} label="Comments" />
              <PanelTab active={rightTab === "activity"} onClick={() => setRightTab("activity")} icon={History} label="Activity" />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
              {rightTab === "properties" && <PropertiesPanel doc={activeDoc} onChange={(d) => updateActive(d)} />}
              {rightTab === "comments" && <CommentsPanel comments={activeDoc.comments ?? []} />}
              {rightTab === "activity" && (
                <div className="p-4">
                  <ActivityTimeline items={activeDoc.activity ?? []} />
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <VersionHistory open={historyOpen} onClose={() => setHistoryOpen(false)} versions={activeDoc?.versions ?? []} />
    </div>
  );
}

function ModeSwitcher({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const items: { key: Mode; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
    { key: "edit", icon: Pencil, label: "Edit" },
    { key: "split", icon: Columns2, label: "Split" },
    { key: "preview", icon: Eye, label: "Preview" },
  ];
  return (
    <div className="flex items-center rounded-lg border border-border/60 bg-background/50 p-0.5">
      {items.map((i) => (
        <button
          key={i.key}
          onClick={() => setMode(i.key)}
          title={i.label}
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition",
            mode === i.key ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <i.icon className="h-3 w-3" /> <span className="hidden sm:inline">{i.label}</span>
        </button>
      ))}
    </div>
  );
}

function PanelTab({ active, onClick, icon: Icon, label }: {
  active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-medium border-b-2 transition",
        active ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-3 w-3" /> {label}
    </button>
  );
}

/* ============ Documentation Home ============ */
function DocsHome({
  nodes, onOpen, onCreate, onOpenTemplates, onUseTemplate,
}: {
  nodes: DocNode[];
  onOpen: (id: string) => void;
  onCreate: () => void;
  onOpenTemplates: () => void;
  onUseTemplate: (t: typeof DOC_TEMPLATES[number]) => void;
}) {
  const docs = nodes.filter((n) => n.kind === "doc");
  const recent = [...docs].slice(0, 4);
  const favorites = docs.filter((d) => d.favorite);
  const pinned = docs.filter((d) => d.pinned);
  const wiki = docs.filter((d) => d.category === "Engineering" || d.category === "Architecture");
  const meetings = docs.filter((d) => d.category === "Meeting Notes");
  const releases = docs.filter((d) => d.category === "Deployment");
  const api = docs.filter((d) => d.tags?.includes("API"));

  return (
    <div className="p-5 sm:p-6 space-y-6">
      <SearchBar docs={docs} onSelect={onOpen} />

      {pinned.length > 0 && (
        <Section title="Pinned">
          <Grid>{pinned.map((d) => <DocumentCard key={d.id} doc={d} onOpen={onOpen} />)}</Grid>
        </Section>
      )}

      <Section title="Recently edited" action={<button onClick={onCreate} className="text-[11px] text-primary hover:underline">New page</button>}>
        <Grid>{recent.map((d) => <DocumentCard key={d.id} doc={d} onOpen={onOpen} />)}</Grid>
      </Section>

      <Section title="Favorites">
        {favorites.length ? <Grid>{favorites.map((d) => <DocumentCard key={d.id} doc={d} onOpen={onOpen} />)}</Grid>
          : <EmptyMini label="No favorites yet — star a doc." />}
      </Section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Section title="Project Wiki">
          {wiki.length ? <Stack>{wiki.slice(0, 3).map((d) => <DocumentCard key={d.id} doc={d} onOpen={onOpen} dense />)}</Stack>
            : <EmptyMini label="Wiki is empty." />}
        </Section>
        <Section title="API Documentation">
          {api.length ? <Stack>{api.slice(0, 3).map((d) => <DocumentCard key={d.id} doc={d} onOpen={onOpen} dense />)}</Stack>
            : <EmptyMini label="No API docs yet." />}
        </Section>
        <Section title="Meeting Notes">
          {meetings.length ? <Stack>{meetings.slice(0, 3).map((d) => <DocumentCard key={d.id} doc={d} onOpen={onOpen} dense />)}</Stack>
            : <EmptyMini label="No meetings captured." />}
        </Section>
        <Section title="Release Notes">
          {releases.length ? <Stack>{releases.slice(0, 3).map((d) => <DocumentCard key={d.id} doc={d} onOpen={onOpen} dense />)}</Stack>
            : <EmptyMini label="No releases logged." />}
        </Section>
      </div>

      <Section title="Templates" action={<button onClick={onOpenTemplates} className="text-[11px] text-primary hover:underline">Browse all</button>}>
        <TemplateGallery onUse={onUseTemplate} compact />
      </Section>
    </div>
  );
}

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-2.5 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}
const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">{children}</div>
);
const Stack = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-2">{children}</div>
);
const EmptyMini = ({ label }: { label: string }) => (
  <div className="rounded-xl border border-dashed border-border/60 p-5 text-center text-xs text-muted-foreground">{label}</div>
);
