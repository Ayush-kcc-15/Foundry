import { createFileRoute, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DiscussionThread } from "@/components/discussions/DiscussionThread";
import { DISCUSSIONS } from "@/components/collaboration/data";

export const Route = createFileRoute("/_authenticated/discussions/$discussionId")({
  component: DiscussionDetail,
  head: () => ({ meta: [{ title: "Discussion — Foundry" }] }),
});

function DiscussionDetail() {
  const { discussionId } = useParams({ from: "/discussions/$discussionId" });
  const discussion = DISCUSSIONS.find((d) => d.id === discussionId) ?? DISCUSSIONS[0];
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-[900px]"
      >
        <DiscussionThread discussion={discussion} />
      </motion.div>
    </DashboardLayout>
  );
}
