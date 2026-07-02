import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Section } from "@/components/common/Section";

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Engineering Lead",
    company: "Nimbus Labs",
    initials: "AM",
    quote:
      "Foundry replaced three tools for us. Our sprints are tighter, our docs are actually read, and the AI drafts save me hours every week.",
  },
  {
    name: "Priya Shah",
    role: "Head of Product",
    company: "Vector.io",
    initials: "PS",
    quote:
      "The collaboration feels effortless. Comments, mentions, and handoffs stay tied to the work — nothing gets lost in Slack anymore.",
  },
  {
    name: "Jonas Weber",
    role: "Staff Engineer",
    company: "Northwind",
    initials: "JW",
    quote:
      "Best developer experience I've had in a project tool. Fast, keyboard-first, and the version history has already saved us twice.",
  },
];

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      align="center"
      eyebrow="Loved by teams"
      title="What Builders Say"
      subtitle="Foundry is trusted by engineers, PMs, and design leaders shipping ambitious products."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-strong rounded-2xl p-6 transition hover:border-primary/40"
          >
            <div className="flex items-center gap-1 text-primary" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
