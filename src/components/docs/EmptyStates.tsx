import { FileText, Search, Star, LayoutTemplate, History } from "lucide-react";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

function Empty({
  icon: Icon, title, hint, action, className,
}: { icon: ComponentType<{ className?: string }>; title: string; hint: string; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid place-items-center rounded-2xl border border-dashed border-border/60 p-10 text-center", className)}>
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary mb-3">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 max-w-sm text-xs text-muted-foreground">{hint}</div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export const NoDocuments = ({ action }: { action?: React.ReactNode }) => (
  <Empty icon={FileText} title="No documents yet" hint="Create your first page or start from a template." action={action} />
);
export const NoSearchResults = ({ q }: { q: string }) => (
  <Empty icon={Search} title="No matches" hint={`We couldn't find anything for "${q}". Try a different query.`} />
);
export const NoFavorites = () => (
  <Empty icon={Star} title="No favorites yet" hint="Star a document to pin it here for fast access." />
);
export const NoTemplates = () => (
  <Empty icon={LayoutTemplate} title="No templates" hint="Templates you save will appear here." />
);
export const NoVersionHistory = () => (
  <Empty icon={History} title="No version history" hint="Edits will appear here once you start writing." />
);
