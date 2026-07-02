import { useState } from "react";
import { Smile } from "lucide-react";
import { cn } from "@/lib/utils";

const EMOJIS = ["👍", "❤️", "🚀", "🎉", "👀", "💯", "🔥", "🙌"];

export function ReactionBar({
  reactions,
  onToggle,
}: {
  reactions: { emoji: string; count: number; mine?: boolean }[];
  onToggle?: (emoji: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-1">
      {reactions.map((r) => (
        <button
          key={r.emoji}
          onClick={() => onToggle?.(r.emoji)}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[11px] transition",
            r.mine
              ? "border-primary/40 bg-primary/15 text-highlight"
              : "border-border/60 bg-surface/50 text-muted-foreground hover:border-primary/40",
          )}
        >
          <span>{r.emoji}</span>
          <span>{r.count}</span>
        </button>
      ))}
      <div className="relative">
        <button
          onClick={() => setPickerOpen((s) => !s)}
          className="grid h-6 w-6 place-items-center rounded-full border border-border/60 bg-surface/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition"
          aria-label="Add reaction"
        >
          <Smile className="h-3 w-3" />
        </button>
        {pickerOpen && (
          <div className="absolute left-0 top-full mt-1.5 z-10 flex gap-0.5 rounded-xl border border-border/60 bg-surface/90 p-1.5 shadow-glow backdrop-blur">
            {EMOJIS.map((e) => (
              <button
                key={e}
                onClick={() => { onToggle?.(e); setPickerOpen(false); }}
                className="grid h-7 w-7 place-items-center rounded-lg text-sm hover:bg-primary/15"
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
