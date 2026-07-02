import { useState } from "react";
import { Camera, MapPin, Globe, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { Panel, Field, Input, Textarea, Select, Avatar, SectionHeader } from "../primitives";

const SKILLS = ["React", "TypeScript", "Node.js", "Postgres", "Design Systems", "AI/LLM"];

export function ProfileSection() {
  const [bio, setBio] = useState("Product engineer building developer tools. Coffee-powered.");
  const [availability, setAvailability] = useState("available");
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Profile"
        description="How the rest of the workspace sees you."
        action={<Button size="sm">Save Changes</Button>}
      />

      <Panel title="Photo & Identity">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative">
            <Avatar initials="AC" size={96} />
            <button className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-lg hover:scale-105 transition">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 grid sm:grid-cols-2 gap-4 w-full">
            <Field label="Full Name"><Input defaultValue="Alex Chen" /></Field>
            <Field label="Username"><Input defaultValue="alexchen" /></Field>
            <Field label="Job Title"><Input defaultValue="Senior Product Engineer" /></Field>
            <Field label="Company"><Input defaultValue="Foundry Labs" /></Field>
          </div>
        </div>
      </Panel>

      <Panel title="About">
        <div className="space-y-4">
          <Field label="Bio" hint={`${bio.length}/280`}>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} maxLength={280} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email"><Input type="email" defaultValue="alex@foundry.dev" /></Field>
            <Field label="Phone"><Input defaultValue="+91 98••• ••210" /></Field>
            <Field label="Website"><Input defaultValue="https://alexchen.dev" /></Field>
            <Field label="Location"><Input defaultValue="Bengaluru, IN" /></Field>
            <Field label="Timezone">
              <Select defaultValue="IST">
                <option>IST (UTC+5:30)</option><option>PST (UTC-8)</option><option>EST (UTC-5)</option><option>UTC</option>
              </Select>
            </Field>
            <Field label="Availability">
              <Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                <option value="available">🟢 Available</option>
                <option value="focus">🎯 Deep Focus</option>
                <option value="meeting">📞 In a Meeting</option>
                <option value="away">🌙 Away</option>
              </Select>
            </Field>
          </div>
        </div>
      </Panel>

      <Panel title="Skills & Expertise">
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => <Badge key={s} variant="primary">{s}</Badge>)}
          <button className="text-xs px-2.5 py-1 rounded-full border border-dashed border-border hover:border-primary/50 text-muted-foreground">
            + Add skill
          </button>
        </div>
      </Panel>

      <Panel title="Social & Links">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Github, label: "GitHub", value: "github.com/alexchen" },
            { icon: Twitter, label: "Twitter", value: "@alexchen" },
            { icon: Linkedin, label: "LinkedIn", value: "in/alexchen" },
            { icon: Globe, label: "Portfolio", value: "alexchen.dev" },
          ].map((s) => (
            <Field key={s.label} label={s.label}>
              <div className="relative">
                <s.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input defaultValue={s.value} className="pl-9" />
              </div>
            </Field>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> Location and links are visible to workspace members.
        </div>
      </Panel>
    </div>
  );
}
