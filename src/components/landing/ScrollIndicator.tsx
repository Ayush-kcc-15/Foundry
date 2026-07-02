import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="mt-16 flex flex-col items-center gap-2 text-muted-foreground"
    >
      <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-8 w-5 items-start justify-center rounded-full border border-border p-1"
      >
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1 rounded-full bg-primary"
        />
      </motion.div>
      <ChevronDown className="h-3 w-3" />
    </motion.div>
  );
}
