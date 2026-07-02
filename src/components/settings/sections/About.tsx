import { Sparkles, FileText, Shield, Scale, Package, Heart } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Badge } from "@/components/common/Badge";
import { Panel, SectionHeader } from "../primitives";

const OSS = [
  "React", "Vite", "TanStack Router", "Tailwind CSS", "Framer Motion", "Lucide Icons",
  "TipTap", "dnd-kit", "Recharts", "shadcn/ui", "Zod",
];

const CHANGELOG = [
  { version: "2.4.0", date: "Jun 15, 2026", tag: "AI", notes: "Enterprise Admin Center · Workspace health dashboard · Role matrix." },
  { version: "2.3.0", date: "May 30, 2026", tag: "New", notes: "AI Workspace: chat, generators, code review, insights." },
  { version: "2.2.1", date: "May 12, 2026", tag: "Fix", notes: "Board performance improvements for 10k+ tasks." },
  { version: "2.2.0", date: "Apr 28, 2026", tag: "New", notes: "Team collaboration hubs and universal Activity Dock." },
];

export function AboutSection() {
  return (
    <div className="space-y-6">
      <SectionHeader title="About Foundry" />

      <Panel>
        <div className="flex items-center gap-4">
          <Logo />
          <div className="flex-1">
            <p className="font-display text-xl font-semibold flex items-center gap-2">Foundry <Badge variant="primary">v2.4.0</Badge></p>
            <p className="text-sm text-muted-foreground">The workspace where great software gets built.</p>
          </div>
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
      </Panel>

      <div className="grid md:grid-cols-2 gap-6">
        <Panel title="Release Notes" description="What's new">
          <div className="space-y-4">
            {CHANGELOG.map((c) => (
              <div key={c.version} className="flex gap-3">
                <Badge variant={c.tag === "AI" ? "primary" : c.tag === "Fix" ? "warning" : "success"}>{c.tag}</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">v{c.version} <span className="text-xs text-muted-foreground font-normal">· {c.date}</span></p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Legal" description="Policies & terms">
          <div className="space-y-2">
            {[
              { icon: FileText, label: "Changelog", href: "#" },
              { icon: Shield, label: "Privacy Policy", href: "#" },
              { icon: Scale, label: "Terms of Service", href: "#" },
              { icon: Package, label: "License · Commercial", href: "#" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition">
                <l.icon className="h-4 w-4 text-primary" />
                <span className="text-sm flex-1">{l.label}</span>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Open Source Libraries" description="Foundry is built on the shoulders of giants">
        <div className="flex flex-wrap gap-2">
          {OSS.map((l) => <Badge key={l} variant="neutral">{l}</Badge>)}
        </div>
      </Panel>

      <Panel title="Credits">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Heart className="h-4 w-4 text-destructive fill-destructive" />
          Crafted with care by the Foundry team. © 2026 Foundry Labs.
        </div>
      </Panel>
    </div>
  );
}
