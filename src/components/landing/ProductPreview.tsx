import { Section } from "@/components/common";
import { DashboardMockup } from "./DashboardMockup";

export function ProductPreview() {
  return (
    <Section
      id="solutions"
      eyebrow="One workspace"
      title="Everything Your Team Needs in One Workspace"
      subtitle="A single platform to organize projects, manage tasks, document ideas, collaborate with teammates, and track progress."
      align="center"
    >
      <DashboardMockup />
    </Section>
  );
}
