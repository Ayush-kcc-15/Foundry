import { cn } from "@/lib/utils";
import { DOC_TAG_META, type DocTag } from "./data";

export function DocTagChip({ tag, className }: { tag: DocTag; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
        DOC_TAG_META[tag],
        className,
      )}
    >
      {tag}
    </span>
  );
}

export function DocTagList({ tags, max = 4 }: { tags?: DocTag[]; max?: number }) {
  if (!tags?.length) return null;
  const visible = tags.slice(0, max);
  const extra = tags.length - visible.length;
  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((t) => <DocTagChip key={t} tag={t} />)}
      {extra > 0 && (
        <span className="inline-flex items-center rounded-full border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground">
          +{extra}
        </span>
      )}
    </div>
  );
}
