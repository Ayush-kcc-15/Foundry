import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AI_NAV } from "./data";
import { cn } from "@/lib/utils";

export function AISubNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mb-6 -mx-1 overflow-x-auto">
      <div className="flex items-center gap-1 px-1 min-w-max border-b border-border/60 pb-1">
        {AI_NAV.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "relative px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              {active && (
                <motion.span
                  layoutId="ai-sub-active"
                  className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
