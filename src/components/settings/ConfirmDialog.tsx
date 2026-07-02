import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export function ConfirmDialog({
  open, onClose, title, description, confirmLabel = "Confirm", tone = "primary", requireText,
}: {
  open: boolean; onClose: () => void; title: string; description?: string;
  confirmLabel?: string; tone?: "primary" | "destructive"; requireText?: string;
}) {
  const [text, setText] = useState("");
  useEffect(() => { if (!open) setText(""); }, [open]);
  const canConfirm = !requireText || text === requireText;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] grid place-items-center bg-background/70 backdrop-blur-sm p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, y: 8, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="glass-strong rounded-2xl w-full max-w-md p-6 relative"
          >
            <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-lg hover:bg-white/5 text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3 mb-3">
              <div className={cn(
                "h-10 w-10 grid place-items-center rounded-xl shrink-0",
                tone === "destructive" ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary",
              )}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
              </div>
            </div>
            {requireText && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1.5">Type <span className="font-mono text-foreground">{requireText}</span> to continue</p>
                <input
                  value={text} onChange={(e) => setText(e.target.value)}
                  className="w-full h-10 rounded-lg border border-border bg-background/40 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-destructive/50"
                />
              </div>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
              <Button
                size="sm" disabled={!canConfirm} onClick={onClose}
                className={tone === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-none" : ""}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
