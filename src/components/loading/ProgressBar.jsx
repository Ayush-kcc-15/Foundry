import { motion } from "framer-motion";

export default function ProgressBar({ value = 0 }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="w-full" aria-label="Loading progress" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-400">
        <span className="uppercase tracking-[0.18em]">Booting workspace</span>
        <motion.span
          key={v}
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent tabular-nums"
        >
          {v}%
        </motion.span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="relative h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #14B8A6 0%, #5EEAD4 60%, #14B8A6 100%)",
            boxShadow: "0 0 14px rgba(20,184,166,0.6)",
          }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-y-0 w-1/3"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
            }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
