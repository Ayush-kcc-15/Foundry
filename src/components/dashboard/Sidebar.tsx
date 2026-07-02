import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Columns3,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Sparkles,
  Bell,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  HardDrive,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const nav: Array<{
  label: string;
  icon: any;
  href?: string;
  to?: boolean;
  badge?: string | number;
}> = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", to: true },
  { label: "Workspace", icon: Users, href: "/workspace", to: true },
  { label: "Projects", icon: FolderKanban, href: "/projects", to: true },
  { label: "Team", icon: Users, href: "/team", to: true },
  { label: "Discussions", icon: Columns3, href: "/discussions", to: true },
  { label: "Activity", icon: BarChart3, href: "/activity", to: true },
  { label: "Documents", icon: FileText },
  { label: "Calendar", icon: Calendar },
  { label: "AI Workspace", icon: Sparkles, href: "/ai", to: true, badge: "New" },
  { label: "Notifications", icon: Bell, href: "/notifications", to: true, badge: 3 },
  { label: "Settings", icon: Settings, href: "/settings", to: true },
];

export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 264 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/60 bg-sidebar",
          "transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ width: collapsed ? 72 : 264 }}
      >
        <WorkspaceHeader collapsed={collapsed} />

        <nav className="flex-1 overflow-y-auto px-2.5 py-3">
          <div className="space-y-0.5">
            {nav.map((item) => {
              const active = item.to && item.href === pathname;
              const content = (
                <span
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="side-active"
                      className="absolute inset-0 -z-10 rounded-xl bg-primary/10 border border-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {active && (
                    <span className="absolute -left-2.5 top-1.5 bottom-1.5 w-0.5 rounded-full bg-primary" />
                  )}
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      active && "text-primary",
                    )}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                            typeof item.badge === "number"
                              ? "bg-destructive/20 text-destructive"
                              : "bg-primary/15 text-highlight border border-primary/30",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </span>
              );
              return item.to ? (
                <Link key={item.label} to={item.href!} onClick={onMobileClose}>
                  {content}
                </Link>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  className="block w-full text-left"
                  title={collapsed ? item.label : undefined}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-border/60 p-2.5 space-y-2">
          {!collapsed && <StorageMeter />}

          <div
            className={cn(
              "flex items-center gap-2 rounded-xl p-2 hover:bg-white/5 transition",
              collapsed && "justify-center",
            )}
          >
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-xs font-semibold text-primary-foreground">
              AY
            </div>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium">Ayush Kumar</div>
                  <div className="truncate text-[11px] text-muted-foreground">ayush@foundry.dev</div>
                </div>
                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "hidden lg:flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition",
              collapsed && "justify-center",
            )}
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : (
              <>
                <ChevronsLeft className="h-4 w-4" /> Collapse
              </>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

function WorkspaceHeader({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-2 border-b border-border/60 p-3">
      {collapsed ? (
        <div className="mx-auto h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow" />
      ) : (
        <button
          type="button"
          className="flex flex-1 items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-white/5 transition min-w-0"
        >
          <Logo compact />
          <div className="min-w-0 flex-1 text-left">
            <div className="truncate text-sm font-semibold">Foundry Labs</div>
            <div className="truncate text-[11px] text-muted-foreground">Pro workspace</div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        </button>
      )}
    </div>
  );
}

function StorageMeter() {
  const [used] = useState(6.4);
  const total = 15;
  const pct = (used / total) * 100;
  return (
    <div className="rounded-xl border border-border/60 bg-surface/50 p-2.5">
      <div className="flex items-center gap-2 mb-1.5">
        <HardDrive className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[11px] font-medium text-muted-foreground flex-1">Storage</span>
        <span className="text-[11px] text-foreground">{used}/{total} GB</span>
      </div>
      <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </div>
  );
}
