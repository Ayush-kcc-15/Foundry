import { useMemo, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { SECTIONS, type SectionId } from "@/components/settings/data";
import { cn } from "@/lib/utils";

import { OverviewSection } from "@/components/settings/sections/Overview";
import { ProfileSection } from "@/components/settings/sections/Profile";
import { AccountSection } from "@/components/settings/sections/Account";
import { WorkspaceSection } from "@/components/settings/sections/Workspace";
import { MembersSection } from "@/components/settings/sections/Members";
import { RolesSection } from "@/components/settings/sections/Roles";
import { NotificationsSection } from "@/components/settings/sections/Notifications";
import { AppearanceSection } from "@/components/settings/sections/Appearance";
import { SecuritySection } from "@/components/settings/sections/Security";
import { IntegrationsSection } from "@/components/settings/sections/Integrations";
import { APIKeysSection } from "@/components/settings/sections/APIKeys";
import { BillingSection } from "@/components/settings/sections/Billing";
import { StorageSection } from "@/components/settings/sections/Storage";
import { AuditLogsSection } from "@/components/settings/sections/AuditLogs";
import { ShortcutsSection } from "@/components/settings/sections/Shortcuts";
import { AboutSection } from "@/components/settings/sections/About";

const RENDERERS: Record<SectionId, ComponentType> = {
  overview: OverviewSection,
  profile: ProfileSection,
  account: AccountSection,
  workspace: WorkspaceSection,
  members: MembersSection,
  roles: RolesSection,
  notifications: NotificationsSection,
  appearance: AppearanceSection,
  security: SecuritySection,
  integrations: IntegrationsSection,
  "api-keys": APIKeysSection,
  billing: BillingSection,
  storage: StorageSection,
  audit: AuditLogsSection,
  shortcuts: ShortcutsSection,
  about: AboutSection,
};

export function SettingsShell() {
  const [active, setActive] = useState<SectionId>("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const groups = useMemo(() => {
    const g: Record<string, typeof SECTIONS> = {};
    SECTIONS.forEach((s) => { (g[s.group] ||= []).push(s); });
    return g;
  }, []);

  const Renderer = RENDERERS[active];
  const activeMeta = SECTIONS.find((s) => s.id === active)!;

  return (
    <div className="flex flex-col lg:flex-row gap-6 -mt-2">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between lg:hidden">
        <button
          onClick={() => setMobileNavOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white/5"
        >
          <ChevronLeft className={cn("h-4 w-4 transition", mobileNavOpen && "rotate-90")} />
          Settings menu · {activeMeta.label}
        </button>
      </div>

      {/* Sidebar nav */}
      <aside className={cn(
        "lg:w-64 shrink-0",
        !mobileNavOpen && "hidden lg:block",
      )}>
        <div className="lg:sticky lg:top-24 space-y-5">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              <p className="px-3 mb-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-semibold">{group}</p>
              <div className="space-y-0.5">
                {items.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setActive(s.id); setMobileNavOpen(false); }}
                      className={cn(
                        "relative w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition group",
                        isActive ? "text-foreground bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="settings-active"
                          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <s.icon className={cn("h-4 w-4", isActive && "text-primary")} />
                      <span className="flex-1 text-left">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Renderer />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
