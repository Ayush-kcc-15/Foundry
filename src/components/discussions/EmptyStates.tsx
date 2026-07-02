import { MessagesSquare } from "lucide-react";

export function NoDiscussions() {
  return (
    <div className="rounded-2xl border border-dashed border-border/60 bg-surface/30 p-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-3">
        <MessagesSquare className="h-6 w-6" />
      </div>
      <div className="text-base font-semibold">No discussions yet</div>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
        Start the first conversation. Ask a question, share a proposal, or announce a shipped feature.
      </p>
    </div>
  );
}
