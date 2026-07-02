import { useState } from "react";
import { Archive, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Panel, Field, Input, Textarea, Select, SectionHeader } from "../primitives";
import { ConfirmDialog } from "../ConfirmDialog";

const COLORS = ["#14B8A6", "#6366F1", "#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#22C55E"];

export function WorkspaceSection() {
  const [color, setColor] = useState("#14B8A6");
  const [archive, setArchive] = useState(false);
  const [del, setDel] = useState(false);

  return (
    <div className="space-y-6">
      <SectionHeader title="Workspace" description="Branding and defaults for Foundry HQ." action={<Button size="sm">Save Changes</Button>} />

      <Panel title="Branding">
        <div
          className="mb-4 h-32 rounded-xl relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${color}, #0F172A)` }}
        >
          <div className="absolute bottom-3 left-3 flex items-center gap-3">
            <div className="h-14 w-14 rounded-xl shadow-lg grid place-items-center" style={{ background: color }}>
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Foundry HQ</p>
              <p className="text-xs text-white/70">foundry.dev/hq</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm">Upload Logo</Button>
          <Button variant="outline" size="sm">Upload Banner</Button>
        </div>
      </Panel>

      <Panel title="Identity">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Workspace Name"><Input defaultValue="Foundry HQ" /></Field>
          <Field label="Workspace URL" hint="Used for public links and invites.">
            <Input defaultValue="foundry.dev/hq" />
          </Field>
          <Field label="Visibility" className="sm:col-span-1">
            <Select defaultValue="private">
              <option value="private">🔒 Private — invite only</option>
              <option value="internal">🏢 Internal — company only</option>
              <option value="public">🌍 Public — anyone with link</option>
            </Select>
          </Field>
          <Field label="Default Project Template">
            <Select><option>Sprint (Scrum)</option><option>Kanban</option><option>Bug Tracker</option><option>Design Ops</option></Select>
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <Textarea defaultValue="Shipping the world's fastest workspace for developer teams." />
          </Field>
        </div>
      </Panel>

      <Panel title="Appearance">
        <Field label="Workspace Color">
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c} onClick={() => setColor(c)}
                className="h-9 w-9 rounded-lg ring-2 ring-transparent hover:scale-110 transition"
                style={{ background: c, boxShadow: color === c ? `0 0 0 2px ${c}, 0 0 0 4px rgba(255,255,255,0.15)` : undefined }}
              />
            ))}
          </div>
        </Field>
      </Panel>

      <Panel title="Danger Zone">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border/60 bg-background/30">
            <div><p className="text-sm font-medium">Archive workspace</p><p className="text-xs text-muted-foreground mt-0.5">Hide from active workspaces. Restore anytime.</p></div>
            <Button variant="outline" size="sm" leftIcon={<Archive className="h-4 w-4" />} onClick={() => setArchive(true)}>Archive</Button>
          </div>
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-destructive/40 bg-destructive/5">
            <div><p className="text-sm font-medium">Delete workspace</p><p className="text-xs text-muted-foreground mt-0.5">Removes all projects, tasks, docs, and data.</p></div>
            <Button size="sm" onClick={() => setDel(true)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-none" leftIcon={<Trash2 className="h-4 w-4" />}>Delete</Button>
          </div>
        </div>
      </Panel>

      <ConfirmDialog open={archive} onClose={() => setArchive(false)} title="Archive Foundry HQ?" description="The workspace becomes read-only and hidden from your sidebar." confirmLabel="Archive workspace" />
      <ConfirmDialog open={del} onClose={() => setDel(false)} title="Delete Foundry HQ?" tone="destructive" description="This permanently removes 128 projects, 4,821 tasks, and 612 documents." confirmLabel="Delete workspace" requireText="Foundry HQ" />
    </div>
  );
}
