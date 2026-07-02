import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Panel, Toggle, SectionHeader } from "../primitives";

const GROUPS: { title: string; items: { key: string; label: string; description: string; default: boolean }[] }[] = [
  {
    title: "Delivery",
    items: [
      { key: "email", label: "Email Notifications", description: "Receive alerts to your primary inbox.", default: true },
      { key: "desktop", label: "Desktop Notifications", description: "OS notifications from the Foundry app.", default: true },
      { key: "push", label: "Push Notifications", description: "Mobile push via the Foundry iOS/Android app.", default: false },
    ],
  },
  {
    title: "Activity",
    items: [
      { key: "task", label: "Task Updates", description: "Status changes, assignments, and due dates.", default: true },
      { key: "comments", label: "Comments", description: "Replies on tasks, docs, and discussions.", default: true },
      { key: "mentions", label: "Mentions", description: "When someone @-mentions you.", default: true },
      { key: "ai", label: "AI Suggestions", description: "Proactive AI recommendations across your work.", default: true },
    ],
  },
  {
    title: "Digest & Announcements",
    items: [
      { key: "announce", label: "Workspace Announcements", description: "Broadcasts from admins.", default: true },
      { key: "release", label: "Release Updates", description: "What's new in Foundry.", default: false },
      { key: "daily", label: "Daily Summary", description: "A morning digest of your day.", default: true },
      { key: "weekly", label: "Weekly Report", description: "Sprint velocity, blockers, and highlights.", default: false },
    ],
  },
];

export function NotificationsSection() {
  const [state, setState] = useState<Record<string, boolean>>(() => {
    const s: Record<string, boolean> = {};
    GROUPS.forEach((g) => g.items.forEach((i) => (s[i.key] = i.default)));
    return s;
  });

  return (
    <div className="space-y-6">
      <SectionHeader title="Notifications" description="Choose what to hear about — and how." action={<Button size="sm">Save Preferences</Button>} />

      {GROUPS.map((g) => (
        <Panel key={g.title} title={g.title}>
          <div className="divide-y divide-border/50">
            {g.items.map((i) => (
              <Toggle
                key={i.key}
                label={i.label}
                description={i.description}
                checked={!!state[i.key]}
                onChange={(v) => setState((s) => ({ ...s, [i.key]: v }))}
              />
            ))}
          </div>
        </Panel>
      ))}
    </div>
  );
}
