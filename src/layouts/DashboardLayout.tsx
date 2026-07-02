import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { ActivityDock } from "@/components/collaboration/ActivityDock";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { AICommandCenter } from "@/components/ai/AICommandCenter";
import { FloatingAssistant } from "@/components/ai/FloatingAssistant";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((s) => !s)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-h-screen flex-col transition-[padding] duration-300">
        <div className="hidden lg:block" style={{ paddingLeft: collapsed ? 72 : 264 }}>
          <Topbar onOpenSidebar={() => setMobileOpen(true)} />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
        <div className="lg:hidden">
          <Topbar onOpenSidebar={() => setMobileOpen(true)} />
          <main className="p-4">{children}</main>
        </div>
      </div>
      <ActivityDock />
      <ChatWidget />
      <FloatingAssistant />
      <AICommandCenter />
    </div>
  );
}
