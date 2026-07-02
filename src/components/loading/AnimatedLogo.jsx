import { motion } from "framer-motion";

export default function AnimatedLogo({ size = 96 }) {
  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size * 2, height: size * 2 }}
      aria-hidden="true"
    >
      {/* Rotating gradient ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #14B8A6 90deg, #5EEAD4 180deg, transparent 300deg)",
          filter: "blur(14px)",
          opacity: 0.55,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulse rings */}
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-primary/40"
          style={{ width: size, height: size }}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.3,
          }}
        />
      ))}

      {/* Logo mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative grid place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent"
          style={{
            width: size,
            height: size,
            boxShadow:
              "0 0 40px rgba(20,184,166,0.55), 0 0 90px rgba(94,234,212,0.25)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-background"
            style={{ width: size * 0.5, height: size * 0.5 }}
          >
            <path d="M4 20 L12 4 L20 20 Z" />
            <path d="M8 14 h8" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
