import type { ReactNode } from "react";
import { FolderPlus, Star, SearchX, UserPlus2 } from "lucide-react";
import { Button } from "@/components/common";

function Base({
  icon,
  title,
  description,
  cta,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  cta?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-surface/30 py-14 px-6 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-4">
        {icon}
      </div>
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</div>
      {cta && <div className="mt-5">{cta}</div>}
    </div>
  );
}

export function NoProjects({ onCreate }: { onCreate?: () => void }) {
  return (
    <Base
      icon={<FolderPlus className="h-7 w-7" />}
      title="No projects yet"
      description="Kick off your first project to start planning, tracking, and shipping with your team."
      cta={onCreate && <Button onClick={onCreate}>Create project</Button>}
    />
  );
}

export function NoFavorites() {
  return (
    <Base
      icon={<Star className="h-7 w-7" />}
      title="No favorites yet"
      description="Star projects you visit often to keep them one click away."
    />
  );
}

export function NoSearchResults({ query }: { query: string }) {
  return (
    <Base
      icon={<SearchX className="h-7 w-7" />}
      title="No projects match your search"
      description={`We couldn't find anything for "${query}". Try a different keyword or clear your filters.`}
    />
  );
}

export function NoMembers() {
  return (
    <Base
      icon={<UserPlus2 className="h-7 w-7" />}
      title="No team members"
      description="Invite teammates to collaborate on this project."
      cta={<Button>Invite members</Button>}
    />
  );
}
