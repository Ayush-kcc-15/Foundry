import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-accent shadow-glow grid place-items-center">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-background" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20 L12 4 L20 20 Z" />
          <path d="M8 14 h8" />
        </svg>
      </div>
      {!compact && (
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Foundry
        </span>
      )}
    </Link>
  );
}
