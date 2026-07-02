import { useState } from "react";
import { Star, Pin, Share2, Users, Tag as TagIcon, Folder } from "lucide-react";
import type { DocNode } from "./data";
import { ALL_TAGS, CATEGORY_ICONS, type DocTag } from "./data";
import { DocTagChip } from "./Tags";
import { ReadingStats } from "./ReadingStats";
import { cn } from "@/lib/utils";

export function PropertiesPanel({ doc, onChange }: { doc: DocNode; onChange: (d: DocNode) => void }) {
  const [tagOpen, setTagOpen] = useState(false);
  const CategoryIcon = doc.category ? CATEGORY_ICONS[doc.category] : Folder;

  const toggleTag = (t: DocTag) => {
    const has = doc.tags?.includes(t);
    onChange({ ...doc, tags: has ? doc.tags!.filter((x) => x !== t) : [...(doc.tags ?? []), t] });
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto p-4">
      <div className="mb-3 text-[10px] uppercase tracking-wider text-muted-foreground">Properties</div>

      <div className="space-y-3">
        <Row label="Author">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-semibold text-primary-foreground">
              {doc.initials}
            </div>
            <span className="text-xs">{doc.author}</span>
          </div>
        </Row>

        <Row label="Category">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-xs">
            <CategoryIcon className="h-3 w-3 text-primary" />
            {doc.category}
          </div>
        </Row>

        <Row label="Tags">
          <div className="relative">
            <div className="flex flex-wrap gap-1">
              {(doc.tags ?? []).map((t) => (
                <button key={t} onClick={() => toggleTag(t)} title="Remove"><DocTagChip tag={t} /></button>
              ))}
              <button
                onClick={() => setTagOpen((s) => !s)}
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground hover:border-primary/40"
              >
                <TagIcon className="h-3 w-3" /> Add
              </button>
            </div>
            {tagOpen && (
              <div className="mt-2 rounded-lg border border-border/60 bg-surface/80 p-2">
                <div className="flex flex-wrap gap-1">
                  {ALL_TAGS.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTag(t)}
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px]",
                        doc.tags?.includes(t) ? "border-primary/60 text-primary" : "border-border/60 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Row>

        <Row label="Flags">
          <div className="flex flex-wrap gap-1">
            <Toggle icon={Star} on={!!doc.favorite} label="Favorite"
              onClick={() => onChange({ ...doc, favorite: !doc.favorite })} activeColor="text-warning" />
            <Toggle icon={Pin} on={!!doc.pinned} label="Pinned"
              onClick={() => onChange({ ...doc, pinned: !doc.pinned })} activeColor="text-warning" />
            <Toggle icon={Share2} on={!!doc.shared} label="Shared"
              onClick={() => onChange({ ...doc, shared: !doc.shared })} activeColor="text-success" />
          </div>
        </Row>

        <Row label="Collaborators">
          <div className="flex -space-x-1.5">
            {["AY", "SM", "LK", "MJ"].map((i) => (
              <div key={i} className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[9px] font-semibold text-primary-foreground ring-2 ring-background">
                {i}
              </div>
            ))}
            <button className="grid h-6 w-6 place-items-center rounded-full border border-dashed border-border/60 text-[9px] text-muted-foreground hover:border-primary/40 ring-2 ring-background">
              <Users className="h-3 w-3" />
            </button>
          </div>
        </Row>
      </div>

      <div className="mt-5 border-t border-border/60 pt-3">
        <div className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Reading stats</div>
        <ReadingStats doc={doc} />
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground/80 mb-1">{label}</div>
      {children}
    </div>
  );
}

function Toggle({ icon: Icon, on, label, onClick, activeColor }: {
  icon: React.ComponentType<{ className?: string }>; on: boolean; label: string; onClick: () => void; activeColor: string;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] transition",
        on ? `border-current ${activeColor}` : "border-border/60 text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="h-3 w-3" /> {label}
    </button>
  );
}
