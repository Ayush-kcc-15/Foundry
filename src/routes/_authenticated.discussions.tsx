import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DiscussionList } from "@/components/discussions/DiscussionList";

export const Route = createFileRoute("/_authenticated/discussions")({
  component: DiscussionsPage,
  head: () => ({
    meta: [
      { title: "Discussions — Foundry" },
      { name: "description", content: "Team discussions, RFCs, announcements, and Q&A." },
    ],
  }),
});

function DiscussionsPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[1200px] space-y-6"
      >
        <header>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold">Discussions</h1>
          <p className="text-sm text-muted-foreground">RFCs, ideas, questions, and announcements — all in one place.</p>
        </header>
        <DiscussionList />
      </motion.div>
    </DashboardLayout>
  );
}
