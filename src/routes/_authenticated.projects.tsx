import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid, List, Table2, SlidersHorizontal, Plus, Star, Clock,
} from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Button } from "@/components/common";
import { SearchBar } from "@/components/projects/SearchBar";
import { FilterPanel, emptyFilters, type Filters } from "@/components/projects/FilterPanel";
import { SortDropdown, type SortKey, type SortDir } from "@/components/projects/SortDropdown";
import { ProjectGrid, ProjectList, ProjectTable } from "@/components/projects/ProjectViews";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { NoProjects, NoSearchResults, NoFavorites } from "@/components/projects/EmptyStates";
import { PROJECTS, RECENT_OPENED, type Project } from "@/components/projects/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/projects")({
  component: ProjectsPage,
  head: () => ({ meta: [{ title: "Projects — Foundry" }] }),
});

type View = "grid" | "list" | "table";

function ProjectsPage() {
  const [projects, setProjects] = useState(PROJECTS);
  const [view, setView] = useState<View>("grid");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("updated");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState<"all" | "favorites" | "recent">("all");

  const filtered = useMemo(() => {
    let out: Project[] = projects;

    if (tab === "favorites") out = out.filter((p) => p.favorite);
    if (tab === "recent") out = out.filter((p) => RECENT_OPENED.includes(p.id));

    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((p) =>
        [p.name, p.description, p.owner.name, ...p.tech, ...p.tags, p.category, p.status]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    if (filters.status.length) out = out.filter((p) => filters.status.includes(p.status));
    if (filters.priority.length) out = out.filter((p) => filters.priority.includes(p.priority));
    if (filters.visibility.length) out = out.filter((p) => filters.visibility.includes(p.visibility));
    if (filters.tech.length) out = out.filter((p) => filters.tech.some((t) => p.tech.includes(t)));

    const dir = sortDir === "asc" ? 1 : -1;
    out = [...out].sort((a, b) => {
      switch (sortKey) {
        case "name": return dir * a.name.localeCompare(b.name);
        case "updated": return dir * (b.updatedAt - a.updatedAt) * -1;
        case "progress": return dir * (b.progress - a.progress) * -1;
        case "due": return dir * a.due.localeCompare(b.due);
        case "priority": {
          const rank = { Critical: 4, High: 3, Medium: 2, Low: 1 } as Record<string, number>;
          return dir * (rank[b.priority] - rank[a.priority]) * -1;
        }
      }
    });

    return out;
  }, [projects, tab, query, filters, sortKey, sortDir]);

  const activeFilterCount =
    filters.status.length + filters.priority.length + filters.tech.length + filters.visibility.length;

  const toggleFavorite = (id: string) =>
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)));

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto max-w-[1400px] space-y-5"
      >
        {/* Header */}
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold truncate">Projects</h1>
            <p className="text-sm text-muted-foreground">Explore, filter, and manage everything in Foundry Labs.</p>
          </div>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setModalOpen(true)}>New project</Button>
        </header>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border/60">
          {(
            [
              { key: "all", label: "All projects", count: PROJECTS.length, icon: null },
              { key: "favorites", label: "Favorites", count: projects.filter(p => p.favorite).length, icon: <Star className="h-3.5 w-3.5" /> },
              { key: "recent", label: "Recently opened", count: RECENT_OPENED.length, icon: <Clock className="h-3.5 w-3.5" /> },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "relative inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors -mb-px",
                tab === t.key ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.icon}
              {t.label}
              <span className="rounded-full bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">{t.count}</span>
              {tab === t.key && (
                <motion.span layoutId="proj-tab" className="absolute left-2 right-2 bottom-0 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
          <SearchBar value={query} onChange={setQuery} />
          <div className="flex flex-wrap items-center gap-2 justify-end">
            <button
              onClick={() => setFilterOpen((s) => !s)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition",
                filterOpen || activeFilterCount
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/60 bg-surface/60 hover:border-primary/40",
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <SortDropdown
              sortKey={sortKey}
              sortDir={sortDir}
              onChange={(k, d) => { setSortKey(k); setSortDir(d); }}
            />
            <div className="inline-flex rounded-xl border border-border/60 bg-surface/60 p-0.5">
              {(["grid", "list", "table"] as const).map((v) => {
                const Icon = v === "grid" ? LayoutGrid : v === "list" ? List : Table2;
                return (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-lg text-muted-foreground transition",
                      view === v && "bg-primary/15 text-primary",
                    )}
                    aria-label={`${v} view`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <FilterPanel
          open={filterOpen}
          filters={filters}
          onChange={setFilters}
          onClear={() => setFilters(emptyFilters)}
        />

        {/* Result count */}
        <div className="text-xs text-muted-foreground">
          Showing <span className="text-foreground font-medium">{filtered.length}</span> of {PROJECTS.length} projects
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          tab === "favorites" ? <NoFavorites /> :
          query ? <NoSearchResults query={query} /> :
          <NoProjects onCreate={() => setModalOpen(true)} />
        ) : (
          <motion.div layout key={view} className="min-h-0">
            {view === "grid" && <ProjectGrid projects={filtered} onFavorite={toggleFavorite} />}
            {view === "list" && <ProjectList projects={filtered} onFavorite={toggleFavorite} />}
            {view === "table" && <ProjectTable projects={filtered} onFavorite={toggleFavorite} />}
          </motion.div>
        )}
      </motion.div>

      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </DashboardLayout>
  );
}
