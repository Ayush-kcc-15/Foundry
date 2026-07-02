import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

export function CTA() {
  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.14 180 / 0.25), transparent 60%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(120deg, oklch(0.72 0.14 180 / 0.35), transparent 40%, oklch(0.85 0.12 178 / 0.25) 80%)",
          backgroundSize: "200% 200%",
        }}
      />
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute h-1 w-1 rounded-full bg-highlight/60"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl glass-strong rounded-3xl p-10 md:p-16 text-center shadow-glow"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Start Building <span className="text-gradient">Smarter Today</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Join developers and teams using Foundry to build, organize, and ship better software.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" leftIcon={<Calendar className="h-4 w-4" />}>
              Book a Demo
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required · Free forever plan
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
