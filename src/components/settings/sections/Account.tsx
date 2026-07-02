import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Panel, Field, Input, Select, SectionHeader } from "../primitives";
import { ConfirmDialog } from "../ConfirmDialog";

export function AccountSection() {
  const [del, setDel] = useState(false);
  const [deact, setDeact] = useState(false);

  return (
    <div className="space-y-6">
      <SectionHeader title="Account" description="Login, language, and account state." action={<Button size="sm">Save Changes</Button>} />

      <Panel title="Login">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Username"><Input defaultValue="alexchen" /></Field>
          <Field label="Primary Email"><Input type="email" defaultValue="alex@foundry.dev" /></Field>
          <Field label="Secondary Email"><Input type="email" defaultValue="alex.chen@personal.io" /></Field>
          <Field label="Password"><Input type="password" defaultValue="••••••••••••" /></Field>
        </div>
      </Panel>

      <Panel title="Preferences">
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Language"><Select><option>English (US)</option><option>English (UK)</option><option>Hindi</option><option>Español</option></Select></Field>
          <Field label="Date Format"><Select><option>MMM D, YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option></Select></Field>
          <Field label="Time Format"><Select><option>12-hour</option><option>24-hour</option></Select></Field>
        </div>
      </Panel>

      <Panel title="Danger Zone" className="border-destructive/40">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-border/60 bg-background/30">
            <div>
              <p className="text-sm font-medium">Deactivate account</p>
              <p className="text-xs text-muted-foreground mt-0.5">Pauses your account. You can reactivate anytime by logging back in.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setDeact(true)}>Deactivate</Button>
          </div>
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-destructive/40 bg-destructive/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="text-sm font-medium">Delete account</p>
                <p className="text-xs text-muted-foreground mt-0.5">Permanently remove all workspaces, projects, and data. This cannot be undone.</p>
              </div>
            </div>
            <Button size="sm" onClick={() => setDel(true)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-none" leftIcon={<Trash2 className="h-4 w-4" />}>
              Delete
            </Button>
          </div>
        </div>
      </Panel>

      <ConfirmDialog
        open={del} onClose={() => setDel(false)} title="Delete your account?" tone="destructive"
        description="This will permanently delete your account, workspaces, and every associated resource. Type DELETE to confirm."
        confirmLabel="Delete forever" requireText="DELETE"
      />
      <ConfirmDialog
        open={deact} onClose={() => setDeact(false)} title="Deactivate account?"
        description="Your account will be paused. You can reactivate by signing back in."
        confirmLabel="Deactivate"
      />
    </div>
  );
}
