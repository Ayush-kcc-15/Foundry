import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "Free",
    cadence: "forever",
    description: "For personal projects and side quests.",
    features: ["Personal projects", "Basic boards", "Documentation", "Community support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "/month",
    description: "Everything growing teams need to ship.",
    features: [
      "Unlimited projects",
      "AI Assistant",
      "Team collaboration",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For organizations with advanced needs.",
    features: ["SSO & SCIM", "Advanced permissions", "Dedicated support", "Custom integrations"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <Section
      id="pricing"
      align="center"
      eyebrow="Pricing"
      title="Simple Pricing for Every Team"
      subtitle="Start free. Upgrade when your team grows. No hidden fees, no surprises."
    >
      <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={cn(
              "relative flex flex-col rounded-2xl p-8 transition",
              p.highlighted
                ? "glass-strong shadow-glow border-primary/60 md:-translate-y-2"
                : "glass-strong hover:border-primary/40",
            )}
          >
            {p.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="primary" className="px-3 py-1 text-[10px]">
                  Most Popular
                </Badge>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-4xl font-semibold tracking-tight",
                    p.highlighted && "text-gradient",
                  )}
                >
                  {p.price}
                </span>
                {p.cadence && (
                  <span className="text-sm text-muted-foreground">{p.cadence}</span>
                )}
              </div>
            </div>
            <ul className="mt-6 space-y-3 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-8 w-full"
              variant={p.highlighted ? "primary" : "outline"}
              size="lg"
            >
              {p.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
