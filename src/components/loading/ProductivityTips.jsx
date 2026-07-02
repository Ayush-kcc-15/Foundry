import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

const TIPS = [
  "Press Ctrl + K to quickly search anything.",
  "Use Ctrl + J to open the AI Assistant.",
  "Organize projects using Boards.",
  "Pin important documents for faster access.",
  "Create reusable templates to save time.",
  "Invite teammates to collaborate.",
  "Use Labels to organize tasks.",
  "Keep documentation updated with AI.",
];

export default function ProductivityTips({ interval = 4500 }) {
  const [i, setI] = useState(() => Math.floor(Math.random() * TIPS.length));
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TIPS.length), interval);
    return () => clearInterval(t);
  }, [interval]);

  return (
    <div className="flex h-5 items-center justify-center gap-2 text-xs text-slate-500">
      <Lightbulb className="h-3.5 w-3.5 text-accent/80" />
      <AnimatePresence mode="wait">
        <motion.span
          key={TIPS[i]}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.4 }}
        >
          {TIPS[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
