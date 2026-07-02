import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import OrbitAnimation from "./OrbitAnimation";
import FloatingParticles from "./FloatingParticles";
import ProgressBar from "./ProgressBar";
import StatusText from "./StatusText";
import LoadingSteps from "./LoadingSteps";
import ProductivityTips from "./ProductivityTips";

const TAGLINE = ["Build.", "Plan.", "Ship.", "Together."];

export default function LoadingScreen({
  visible = true,
  duration = 2600,
  onComplete,
  label = "Loading Foundry workspace",
}) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (!visible) return;
    setProgress(0);
    setShow(true);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setShow(false);
          onComplete?.();
        }, 450);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, duration, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label={label}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#071417] text-[#F8FAFC]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {!reduce && <FloatingParticles />}

          <motion.div
            className="relative z-10 flex w-[min(560px,92vw)] flex-col items-center gap-8 px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo + orbit */}
            <div className="relative grid place-items-center" style={{ width: 320, height: 320 }}>
              {!reduce && <OrbitAnimation radius={130} />}
              <AnimatedLogo size={92} />
            </div>

            {/* Brand text */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-display text-4xl font-semibold tracking-tight"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #F8FAFC 0%, #5EEAD4 120%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Foundry
              </motion.h1>

              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400">
                {TAGLINE.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.12, duration: 0.4 }}
                  >
                    {w}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Status */}
            <StatusText />

            {/* Progress */}
            <ProgressBar value={progress} />

            {/* Steps */}
            <LoadingSteps progress={progress} />

            {/* AI ready */}
            <AnimatePresence>
              {progress > 65 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1 text-xs text-accent"
                  style={{ boxShadow: "0 0 20px rgba(94,234,212,0.15)" }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Assistant Ready
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tip */}
            <ProductivityTips />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
