import { motion } from "framer-motion";
import {
  Github,
  Slack,
  MessageCircle,
  Figma,
  Code2,
  Trello,
  Container,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";

type Integration = { name: string; icon: LucideIcon };

const integrations: Integration[] = [
  { name: "GitHub", icon: Github },
  { name: "Slack", icon: Slack },
  { name: "Discord", icon: MessageCircle },
  { name: "Figma", icon: Figma },
  { name: "VS Code", icon: Code2 },
  { name: "Jira", icon: Trello },
  { name: "Docker", icon: Container },
  { name: "AWS", icon: Cloud },
];

export function Integrations() {
  return (
    <Section
      id="integrations"
      align="center"
      eyebrow="Integrations"
      title="Works with Your Favorite Tools"
      subtitle="Connect Foundry to the stack your team already loves — no context switching required."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {integrations.map((i, idx) => (
          <motion.div
            key={i.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group glass-strong rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition hover:border-primary/50 hover:shadow-glow"
          >
            <i.icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-highlight" />
            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
              {i.name}
            </span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
