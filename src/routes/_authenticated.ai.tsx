import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { AISubNav } from "@/components/ai/AISubNav";

export const Route = createFileRoute("/_authenticated/ai")({
  component: AILayout,
  head: () => ({ meta: [{ title: "AI Workspace — Foundry" }] }),
});

function AILayout() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <AISubNav />
        <Outlet />
      </div>
    </DashboardLayout>
  );
}
