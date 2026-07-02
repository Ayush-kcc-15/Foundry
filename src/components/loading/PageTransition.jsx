import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Thin top progress bar shown during in-app navigation.
 * Max visible duration ~700ms.
 */
export default function PageTransition() {
  const status = useRouterState({ select: (s) => s.status });
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let hideTimer;
    let progTimer;
    if (status === "pending") {
      setVisible(true);
      setProgress(15);
      progTimer = setInterval(() => {
        setProgress((p) => (p < 85 ? p + (90 - p) * 0.15 : p));
      }, 120);
    } else {
      setProgress(100);
      hideTimer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 350);
    }
    return () => {
      clearInterval(progTimer);
      clearTimeout(hideTimer);
    };
  }, [status]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 top-0 z-[200] h-[2px] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <motion.div
            className="h-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #14B8A6 30%, #5EEAD4 60%, #14B8A6 90%, transparent)",
              boxShadow: "0 0 12px rgba(94,234,212,0.7)",
              width: `${progress}%`,
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
