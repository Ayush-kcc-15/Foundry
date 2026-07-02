import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import { AIPageHeader, Field, inputCls, textareaCls, GenerateButton, AISkeleton, CopyButton, MarkdownBlock } from "@/components/ai/shared";

export const Route = createFileRoute("/_authenticated/ai/release-notes")({
  component: ReleaseNotes,
  head: () => ({ meta: [{ title: "Release Notes — Foundry" }] }),
});

function ReleaseNotes() {
  const [version, setVersion] = useState("v1.5.0");
  const [features, setFeatures] = useState("- Stripe subscription payments\n- Team roles & permissions\n- New analytics dashboard");
  const [fixes, setFixes] = useState("- Fixed sidebar collapse on Safari\n- Corrected timezone display in activity feed");
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setOut(null);
    setTimeout(() => {
      setOut(`# Foundry ${version}

_Released ${new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}_

We're shipping a big one. This release focuses on billing, roles, and deeper insights across your workspace.

## 🚀 What's new

${features}

## 🐛 Bug fixes

${fixes}

## 💚 Thanks

To everyone who filed a bug or suggested a feature — you shaped this release.`);
      setLoading(false);
    }, 900);
  };

  return (
    <>
      <AIPageHeader
        icon={Tag}
        title="Release Notes Generator"
        description="Turn a changelog into polished, customer-facing release notes."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl glass-strong p-5 space-y-3">
          <Field label="Version"><input className={inputCls} value={version} onChange={(e) => setVersion(e.target.value)} /></Field>
          <Field label="Completed features"><textarea className={textareaCls} value={features} onChange={(e) => setFeatures(e.target.value)} /></Field>
          <Field label="Bug fixes"><textarea className={textareaCls} value={fixes} onChange={(e) => setFixes(e.target.value)} /></Field>
          <GenerateButton onClick={generate} loading={loading}>Generate release notes</GenerateButton>
        </div>

        <div className="rounded-2xl glass-strong p-5 min-h-[400px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-sm font-semibold">Preview</div>
            {out && <div className="ml-auto"><CopyButton text={out} /></div>}
          </div>
          {loading && <AISkeleton lines={10} />}
          {!loading && !out && <div className="grid place-items-center h-64 text-sm text-muted-foreground">Fill the changelog to generate.</div>}
          {out && <MarkdownBlock>{out}</MarkdownBlock>}
        </div>
      </div>
    </>
  );
}
