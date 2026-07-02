import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { TeamDashboard } from "@/components/collaboration/TeamDashboard";
import { TeamAnalytics } from "@/components/collaboration/TeamAnalytics";
import { TeamCalendar } from "@/components/collaboration/TeamCalendar";
import { AnnouncementBanner } from "@/components/collaboration/AnnouncementBanner";

export const Route = createFileRoute("/_authenticated/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Team — Foundry" },
      { name: "description", content: "Meet your workspace, presence, roles, and collaboration analytics." },
    ],
  }),
});

function TeamPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[1400px] space-y-6"
      >
        <AnnouncementBanner />
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold">Team</h1>
            <p className="text-sm text-muted-foreground">Members, presence, workload, and analytics for Foundry Labs.</p>
          </div>
        </header>

        <TeamDashboard />

        <section>
          <h2 className="font-display text-lg font-semibold mb-3">Team analytics</h2>
          <TeamAnalytics />
        </section>

        <TeamCalendar />
      </motion.div>
    </DashboardLayout>
  );
}
