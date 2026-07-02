import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { notifications } from "./data";
import { cn } from "@/lib/utils";

export function Notifications({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.16 }}
      className="absolute right-0 top-full mt-2 w-[92vw] max-w-sm rounded-2xl glass-strong shadow-glow z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div>
          <div className="text-sm font-semibold">Notifications</div>
          <div className="text-[10px] text-muted-foreground">3 unread</div>
        </div>
        <button className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-highlight font-medium">
          <CheckCheck className="h-3.5 w-3.5" /> Mark all read
        </button>
      </div>
      <ul className="max-h-96 overflow-y-auto p-1.5">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={cn(
              "relative flex items-start gap-3 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-white/5 transition",
              n.unread && "bg-primary/[0.06]",
            )}
          >
            {n.unread && (
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
            <div className="ml-2 h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-primary to-accent" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">{n.title}</div>
              <div className="text-[11px] text-muted-foreground truncate">{n.desc}</div>
            </div>
            <div className="text-[10px] text-muted-foreground shrink-0">{n.time}</div>
          </li>
        ))}
      </ul>
      <div className="border-t border-border/60 px-4 py-2 text-center">
        <button
          onClick={onClose}
          className="text-xs text-primary hover:text-highlight font-medium"
        >
          View all notifications
        </button>
      </div>
    </motion.div>
  );
}
