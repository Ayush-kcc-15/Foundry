import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Plus,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  Settings,
  Menu,
  Command,
  ChevronDown,
  Circle,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { CommandPalette as GlobalCommandPalette } from "@/components/docs/CommandPalette";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export function Topbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [dark, setDark] = useState(true);
  const [openNotifs, setOpenNotifs] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border/60 bg-background/70 px-3 sm:px-5 backdrop-blur-xl">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <button
          type="button"
          onClick={() => setOpenSearch(true)}
          className="group flex w-full items-center gap-2.5 rounded-xl border border-border/60 bg-surface/60 px-3 py-2 text-sm text-muted-foreground hover:border-primary/40 hover:bg-surface transition"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left hidden sm:inline">Search projects, tasks, docs…</span>
          <span className="hidden sm:inline text-[10px] font-mono border border-border/60 rounded-md px-1.5 py-0.5 bg-background/50">
            <Command className="inline h-2.5 w-2.5 mr-0.5" />K
          </span>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <IconBtn label="Quick create">
          <Plus className="h-[18px] w-[18px]" />
        </IconBtn>
        <IconBtn label="Messages" badge={2}>
          <MessageSquare className="h-[18px] w-[18px]" />
        </IconBtn>
        <div className="relative">
          <IconBtn label="Notifications" badge={3} onClick={() => setOpenNotifs((s) => !s)}>
            <Bell className="h-[18px] w-[18px]" />
          </IconBtn>
          <AnimatePresence>
            {openNotifs && <NotificationDropdown onClose={() => setOpenNotifs(false)} />}
          </AnimatePresence>
        </div>
        <IconBtn label="Toggle theme" onClick={() => setDark((s) => !s)}>
          {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </IconBtn>
        <IconBtn label="Settings">
          <Settings className="h-[18px] w-[18px]" />
        </IconBtn>

        <div className="mx-1 h-6 w-px bg-border/60" />

        <ProfileMenu />
      </div>

      <GlobalCommandPalette open={openSearch} onClose={() => setOpenSearch(false)} />
    </header>
  );
}

function ProfileMenu() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  const email = user?.email ?? "";
  const name =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    email.split("@")[0] ||
    "You";
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";
  const avatar = user?.user_metadata?.avatar_url as string | undefined;

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 rounded-xl px-1.5 py-1 hover:bg-white/5 transition"
      >
        <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-xs font-semibold text-primary-foreground overflow-hidden">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
          <Circle className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 fill-success stroke-background" />
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:inline" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute right-0 top-11 z-50 w-64 rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-xl p-2"
          >
            <div className="px-3 py-2.5 border-b border-border/60 mb-1">
              <div className="text-sm font-semibold truncate">{name}</div>
              <div className="text-xs text-muted-foreground truncate">{email}</div>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                navigate({ to: "/settings" });
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              <UserIcon className="h-4 w-4" /> Profile & settings
            </button>
            <button
              onClick={signOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconBtn({
  children,
  label,
  badge,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="relative grid h-9 w-9 place-items-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
    >
      {children}
      {badge ? (
        <span className="absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground px-1">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = [
    { group: "Actions", options: ["Create project", "Create task", "Invite teammate", "Open AI assistant"] },
    { group: "Jump to", options: ["Dashboard", "Projects", "Boards", "Documents", "Team"] },
    { group: "Recent", options: ["Foundry Web Platform", "Sprint 12 planning", "Design tokens audit"] },
  ];
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed left-1/2 top-24 z-50 w-[92vw] max-w-xl -translate-x-1/2 rounded-2xl glass-strong shadow-glow overflow-hidden"
          >
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
                onKeyDown={(e) => e.key === "Escape" && onClose()}
              />
              <kbd className="text-[10px] font-mono text-muted-foreground border border-border/60 rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {items.map((g) => (
                <div key={g.group} className="mb-2">
                  <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">{g.group}</div>
                  {g.options.map((o) => (
                    <button
                      key={o}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-left hover:bg-primary/10 hover:text-foreground text-muted-foreground",
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                      {o}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
