import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { CheckCheck, Settings, Bell } from "lucide-react";
import { NOTIFICATIONS } from "@/components/collaboration/data";
import { NotificationRow } from "./NotificationCenter";

export function NotificationDropdown({ onClose }: { onClose: () => void }) {
  const items = NOTIFICATIONS.slice(0, 6);
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.16 }}
      className="absolute right-0 top-full mt-2 w-[92vw] max-w-md rounded-2xl glass-strong shadow-glow z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          <div>
            <div className="text-sm font-semibold">Notifications</div>
            <div className="text-[10px] text-muted-foreground">{unread} unread</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-highlight font-medium">
            <CheckCheck className="h-3 w-3" /> Mark all
          </button>
          <button className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5">
            <Settings className="h-3 w-3" />
          </button>
        </div>
      </div>
      <ul className="max-h-[420px] overflow-y-auto p-2 space-y-1.5">
        {items.map((n, i) => (
          <NotificationRow key={n.id} n={n} i={i} />
        ))}
      </ul>
      <div className="border-t border-border/60 px-4 py-2 text-center">
        <Link
          to="/notifications"
          onClick={onClose}
          className="text-xs text-primary hover:text-highlight font-medium"
        >
          View all notifications →
        </Link>
      </div>
    </motion.div>
  );
}
