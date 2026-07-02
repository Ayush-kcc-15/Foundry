import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function WorkspaceCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative text-left rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5",
        selected
          ? "border-primary bg-primary/10 shadow-glow"
          : "border-border/60 bg-surface/50 hover:border-primary/40",
      )}
    >
      {selected && (
        <div className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3.5 w-3.5" />
        </div>
      )}
      <div
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl mb-3 transition",
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary border border-primary/20",
        )}
      >
        {icon}
      </div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>
    </button>
  );
}
