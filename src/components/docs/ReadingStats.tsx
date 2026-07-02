import { Clock, Type, Calendar, User } from "lucide-react";
import { readingTime, type DocNode } from "./data";

export function ReadingStats({ doc }: { doc: DocNode }) {
  const rt = readingTime(doc.words);
  const items = [
    { icon: Clock, label: `${rt} min read` },
    { icon: Type, label: `${(doc.words ?? 0).toLocaleString()} words` },
    { icon: Calendar, label: `Updated ${doc.updatedAt ?? "recently"}` },
    { icon: User, label: doc.author ?? "Unknown" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          <it.icon className="h-3 w-3" />
          {it.label}
        </span>
      ))}
    </div>
  );
}
