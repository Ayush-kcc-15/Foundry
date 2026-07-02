import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const DEFAULT_MESSAGES = [
  "Initializing Workspace",
  "Loading Projects",
  "Preparing Dashboard",
  "Syncing Team Data",
  "Loading Documents",
  "Building AI Context",
  "Organizing Tasks",
  "Connecting Workspace",
  "Preparing Analytics",
  "Almost Ready...",
];

export default function StatusText({ messages = DEFAULT_MESSAGES, interval = 1800 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), interval);
    return () => clearInterval(t);
  }, [messages, interval]);

  return (
    <div
      className="relative flex h-6 items-center justify-center"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={messages[i]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-sm font-medium text-slate-300"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-[2px] rounded-full bg-accent shadow-[0_0_8px_#5EEAD4]" />
          {messages[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
