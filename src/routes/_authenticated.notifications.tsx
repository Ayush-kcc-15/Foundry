import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

export const Route = createFileRoute("/_authenticated/notifications")({
  component: NotificationsPage,
  head: () => ({
    meta: [
      { title: "Notifications — Foundry" },
      { name: "description", content: "Mentions, tasks, comments, and system updates across your workspace." },
    ],
  }),
});

function NotificationsPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[1000px]"
      >
        <NotificationCenter />
      </motion.div>
    </DashboardLayout>
  );
}
