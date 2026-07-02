import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ActivityTimeline } from "@/components/activity/ActivityTimeline";

export const Route = createFileRoute("/_authenticated/activity")({
  component: ActivityPage,
  head: () => ({
    meta: [
      { title: "Activity — Foundry" },
      { name: "description", content: "Every change, comment, release, and sprint update across the workspace." },
    ],
  }),
});

function ActivityPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[900px] space-y-5"
      >
        <header>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold">Activity</h1>
          <p className="text-sm text-muted-foreground">A unified feed of everything happening in Foundry Labs.</p>
        </header>
        <ActivityTimeline />
      </motion.div>
    </DashboardLayout>
  );
}
