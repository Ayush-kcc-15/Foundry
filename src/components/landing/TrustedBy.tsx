import { motion } from "framer-motion";
import { Container } from "@/components/common";

const logos = [
  { name: "Northwind", mark: "◈" },
  { name: "Vertex", mark: "▲" },
  { name: "Orbital", mark: "◉" },
  { name: "Lattice", mark: "◆" },
  { name: "Prism", mark: "❖" },
  { name: "Helix", mark: "✺" },
];

export function TrustedBy() {
  return (
    <section className="border-y border-border/50 bg-surface/30 py-14">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          Trusted by modern development teams
        </motion.p>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex items-center justify-center gap-2 text-muted-foreground/60 transition-colors duration-300 hover:text-primary"
            >
              <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                {l.mark}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                {l.name}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
