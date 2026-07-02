import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Charts } from "@/components/dashboard/Charts";
import { ProjectGrid } from "@/components/dashboard/ProjectCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DeadlineWidget } from "@/components/dashboard/DeadlineWidget";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { AIWidget } from "@/components/dashboard/AIWidget";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TaskWidgets } from "@/components/dashboard/TaskWidgets";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — Foundry" }] }),
});

function Dashboard() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto max-w-[1400px] space-y-6"
      >
        <WelcomeBanner />
        <StatsCards />
        <TaskWidgets />


        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6 min-w-0">
            <QuickActions />
            <Charts />
            <ProjectGrid />
          </div>

          <aside className="space-y-4">
            <AIWidget />
            <CalendarWidget />
            <DeadlineWidget />
            <ActivityFeed />
          </aside>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
