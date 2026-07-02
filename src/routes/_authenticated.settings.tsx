import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { SettingsShell } from "@/components/settings/SettingsShell";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Settings — Foundry" },
      { name: "description", content: "Personalize Foundry, manage your workspace, and control administration." },
    ],
  }),
});

function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px]">
        <SettingsShell />
      </div>
    </DashboardLayout>
  );
}
