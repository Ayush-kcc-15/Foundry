import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/common/Section";

const faqs = [
  {
    q: "What is Foundry?",
    a: "Foundry is a modern workspace for product teams — combining planning, docs, collaboration, and AI in one fast, keyboard-first tool.",
  },
  {
    q: "Can I collaborate with my team?",
    a: "Yes. Invite unlimited teammates on paid plans, comment in context, mention people, and get real-time notifications across every workspace.",
  },
  {
    q: "Is there a free plan?",
    a: "Absolutely. The Starter plan is free forever and includes personal projects, basic boards, docs, and community support.",
  },
  {
    q: "Does Foundry support AI?",
    a: "Yes. Foundry ships with a built-in AI assistant that drafts docs, generates tasks, summarizes sprints, and answers questions using your workspace context.",
  },
  {
    q: "Can I integrate GitHub?",
    a: "Yes. Native integrations with GitHub, Slack, Figma, Jira, and more keep your work connected across tools.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit and at rest. Enterprise plans include SSO, SCIM, audit logs, and configurable data residency.",
  },
];

export function FAQ() {
  return (
    <Section
      id="faq"
      align="center"
      eyebrow="FAQ"
      title="Questions, Answered"
      subtitle="Everything you need to know about Foundry. Can't find an answer? Reach out to our team."
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl glass-strong rounded-2xl px-6 py-2"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border/60">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </Section>
  );
}
