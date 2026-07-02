import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/common/Button";
import { ROLES, PERMISSIONS, PERMISSION_MATRIX } from "../data";
import { Panel, SectionHeader } from "../primitives";
import { cn } from "@/lib/utils";

export function RolesSection() {
  const [matrix, setMatrix] = useState(PERMISSION_MATRIX);
  const [activeRole, setActiveRole] = useState<string>("Developer");

  const toggle = (role: string, perm: string) => {
    setMatrix((m) => ({ ...m, [role]: { ...m[role], [perm]: !m[role][perm] } }));
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Roles & Permissions" description="Fine-grained access control per role." action={<Button size="sm">Save Matrix</Button>} />

      <Panel>
        <div className="flex flex-wrap gap-2 mb-5">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRole(r)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition",
                activeRole === r ? "bg-primary text-primary-foreground shadow-glow" : "bg-white/5 text-muted-foreground hover:text-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto -mx-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="text-left py-3 px-5 font-medium">Permission</th>
                {ROLES.map((r) => (
                  <th key={r} className={cn("py-3 px-3 font-medium text-center", r === activeRole && "text-primary")}>{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map((perm) => (
                <tr key={perm} className="border-b border-border/40">
                  <td className="py-3 px-5 font-medium">{perm}</td>
                  {ROLES.map((r) => {
                    const on = matrix[r][perm];
                    const isOwner = r === "Owner";
                    return (
                      <td key={r} className={cn("py-3 px-3 text-center", r === activeRole && "bg-primary/5")}>
                        <button
                          onClick={() => !isOwner && toggle(r, perm)}
                          disabled={isOwner}
                          className={cn(
                            "inline-flex h-6 w-6 items-center justify-center rounded-md border transition",
                            on ? "bg-primary/20 border-primary text-primary" : "border-border bg-background/30 text-transparent hover:border-primary/40",
                            isOwner && "opacity-70 cursor-not-allowed",
                          )}
                        >
                          {on && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="h-3.5 w-3.5" /></motion.span>}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[11px] text-muted-foreground">The Owner role always has full access and cannot be modified.</p>
      </Panel>
    </div>
  );
}
