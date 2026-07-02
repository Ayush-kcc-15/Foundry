import { motion } from "framer-motion";
import { MessageSquare, AtSign, Bell, UserPlus } from "lucide-react";
import { Section } from "@/components/common/Section";

const points = [
  { icon: MessageSquare, title: "Threaded Comments", description: "Discuss decisions in context, right beside the work." },
  { icon: UserPlus, title: "Task Assignments", description: "Assign, reassign, and hand off with a click." },
  { icon: AtSign, title: "Smart Mentions", description: "Loop in the right people with @mentions and roles." },
  { icon: Bell, title: "Live Notifications", description: "Stay in sync with real-time activity across teams." },
];

const teammates = [
  { initials: "AK", color: "from-primary to-accent", x: "12%", y: "18%" },
  { initials: "JM", color: "from-accent to-highlight", x: "68%", y: "10%" },
  { initials: "SP", color: "from-warning to-primary", x: "78%", y: "62%" },
  { initials: "RN", color: "from-highlight to-primary", x: "22%", y: "70%" },
];

export function Collaboration() {
  return (
    <Section id="collaboration" eyebrow="Collaboration">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square w-full max-w-md glass-strong rounded-3xl p-6 overflow-hidden"
        >
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="link" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.14 180)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="oklch(0.85 0.12 178)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {[
              ["18%", "26%", "72%", "18%"],
              ["72%", "18%", "82%", "70%"],
              ["82%", "70%", "26%", "78%"],
              ["26%", "78%", "18%", "26%"],
              ["18%", "26%", "82%", "70%"],
            ].map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#link)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: i * 0.15 }}
              />
            ))}
          </svg>
          {teammates.map((t, i) => (
            <motion.div
              key={t.initials}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
              style={{ left: t.x, top: t.y }}
              className="absolute"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-sm font-semibold text-primary-foreground shadow-glow ring-2 ring-background`}
              >
                {t.initials}
              </motion.div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-xl px-4 py-3 shadow-soft"
          >
            <div className="flex items-center gap-2 text-xs">
              <MessageSquare className="h-3.5 w-3.5 text-highlight" />
              <span>
                <span className="font-medium">JM</span> replied to your comment
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="absolute bottom-4 right-4 glass rounded-lg px-3 py-2 text-[11px]"
          >
            <span className="text-highlight">@AK</span> assigned you a task
          </motion.div>
        </motion.div>

        <div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Where Teams <span className="text-gradient">Ship Together</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Foundry keeps every conversation, mention, and update tied to the work it belongs to —
            so your team stays in sync without the noise.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-strong rounded-2xl p-5 transition hover:border-primary/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-highlight ring-1 ring-primary/30">
                  <p.icon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 text-base font-semibold">{p.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
