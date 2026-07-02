import { useState } from "react";
import { Plus, Copy, RefreshCw, Trash2, KeyRound, Check } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { API_KEYS } from "../data";
import { Panel, SectionHeader, EmptyState, Input, Select, Field } from "../primitives";

export function APIKeysSection() {
  const [keys, setKeys] = useState(API_KEYS);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (k: string) => { navigator.clipboard?.writeText(k); setCopied(k); setTimeout(() => setCopied(null), 1500); };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="API Keys"
        description="Programmatic access to your Foundry workspace."
        action={<Button size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setCreating(true)}>Create API Key</Button>}
      />

      <Panel>
        {keys.length === 0 ? (
          <EmptyState icon={KeyRound} title="No API keys yet" description="Create a key to authenticate the Foundry API." action={<Button size="sm" onClick={() => setCreating(true)}>Create key</Button>} />
        ) : (
          <div className="space-y-2">
            {keys.map((k) => (
              <div key={k.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-border/60 bg-background/30">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="h-9 w-9 grid place-items-center rounded-lg bg-primary/15 text-primary"><KeyRound className="h-4 w-4" /></div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{k.name}</p>
                    <p className="text-xs text-muted-foreground font-mono truncate">{k.token}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div>Created<br /><span className="text-foreground">{k.created}</span></div>
                  <div>Last used<br /><span className="text-foreground">{k.lastUsed}</span></div>
                  <div className="flex gap-1">{k.scopes.map((s) => <Badge key={s} variant="neutral">{s}</Badge>)}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => copy(k.token)} className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground" title="Copy">
                    {copied === k.token ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground" title="Regenerate"><RefreshCw className="h-4 w-4" /></button>
                  <button onClick={() => setKeys((ks) => ks.filter((x) => x.id !== k.id))} className="h-8 w-8 grid place-items-center rounded-lg hover:bg-white/5 text-muted-foreground hover:text-destructive" title="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      {creating && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-sm p-4" onClick={() => setCreating(false)}>
          <div onClick={(e) => e.stopPropagation()} className="glass-strong rounded-2xl w-full max-w-md p-6 animate-scale-in">
            <h3 className="font-semibold mb-4">Create API Key</h3>
            <div className="space-y-3">
              <Field label="Key name"><Input placeholder="e.g. Production API" /></Field>
              <Field label="Permissions">
                <Select><option>Read only</option><option>Read + Write</option><option>Full access</option></Select>
              </Field>
              <Field label="Expiration">
                <Select><option>Never</option><option>30 days</option><option>90 days</option><option>1 year</option></Select>
              </Field>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCreating(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setCreating(false)}>Create key</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
