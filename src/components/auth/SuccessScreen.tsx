import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function SuccessScreen({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="relative grid h-20 w-20 place-items-center rounded-full bg-primary/15 border border-primary/40 shadow-glow"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 14 }}
          className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          <Check className="h-6 w-6" strokeWidth={3} />
        </motion.span>
        <motion.span
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-primary/40"
        />
      </motion.div>
      <h2 className="mt-5 font-display text-2xl font-semibold">{title}</h2>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
