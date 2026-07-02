import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Eye, Code } from "lucide-react";
import { AIPageHeader, Field, inputCls, textareaCls, GenerateButton, CopyButton, AISkeleton, MarkdownBlock } from "@/components/ai/shared";
import { fakeReadme } from "@/components/ai/data";

export const Route = createFileRoute("/_authenticated/ai/readme")({
  component: ReadmeGenerator,
  head: () => ({ meta: [{ title: "README Generator — Foundry" }] }),
});

function ReadmeGenerator() {
  const [name, setName] = useState("Foundry Web");
  const [desc, setDesc] = useState("A collaborative developer workspace built for shipping product faster.");
  const [features, setFeatures] = useState("- Real-time collaboration\n- AI-powered tools\n- Sprint planning");
  const [install, setInstall] = useState("npm install\nnpm run dev");
  const [usage, setUsage] = useState("Sign in, create a workspace, invite your team.");
  const [tech, setTech] = useState("React, TypeScript, Tailwind CSS, Framer Motion, Vite");
  const [license, setLicense] = useState("MIT");
  const [output, setOutput] = useState<string | null>(null);
  const [view, setView] = useState<"preview" | "markdown">("preview");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setOutput(null);
    setTimeout(() => {
      setOutput(fakeReadme(name, desc, features, tech));
      setLoading(false);
    }, 900);
    void install; void usage; void license;
  };

  return (
    <>
      <AIPageHeader
        icon={FileText}
        title="README Generator"
        description="Turn a few prompts into a polished, production-ready README file."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl glass-strong p-5 space-y-3">
          <Field label="Project name"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <Field label="Description"><textarea className={textareaCls} value={desc} onChange={(e) => setDesc(e.target.value)} /></Field>
          <Field label="Features (one per line)"><textarea className={textareaCls} value={features} onChange={(e) => setFeatures(e.target.value)} /></Field>
          <Field label="Installation"><textarea className={textareaCls} value={install} onChange={(e) => setInstall(e.target.value)} /></Field>
          <Field label="Usage"><textarea className={textareaCls} value={usage} onChange={(e) => setUsage(e.target.value)} /></Field>
          <Field label="Tech stack"><input className={inputCls} value={tech} onChange={(e) => setTech(e.target.value)} /></Field>
          <Field label="License"><input className={inputCls} value={license} onChange={(e) => setLicense(e.target.value)} /></Field>
          <GenerateButton onClick={generate} loading={loading}>Generate README</GenerateButton>
        </div>

        <div className="rounded-2xl glass-strong p-5 min-h-[400px] flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-surface/40 p-1">
              <button
                onClick={() => setView("preview")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs ${view === "preview" ? "bg-primary/15 text-highlight" : "text-muted-foreground"}`}
              >
                <Eye className="h-3.5 w-3.5" /> Preview
              </button>
              <button
                onClick={() => setView("markdown")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs ${view === "markdown" ? "bg-primary/15 text-highlight" : "text-muted-foreground"}`}
              >
                <Code className="h-3.5 w-3.5" /> Markdown
              </button>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {output && <CopyButton text={output} />}
              {output && (
                <button
                  onClick={() => {
                    const blob = new Blob([output], { type: "text/markdown" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "README.md";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/50 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
              )}
            </div>
          </div>

          {loading && <AISkeleton lines={10} />}
          {!loading && !output && (
            <div className="flex-1 grid place-items-center text-center text-sm text-muted-foreground">
              Fill in the form and generate to preview your README.
            </div>
          )}
          {output && view === "markdown" && <MarkdownBlock>{output}</MarkdownBlock>}
          {output && view === "preview" && (
            <div className="prose prose-invert prose-sm max-w-none">
              {output.split("\n").map((line, i) => {
                if (line.startsWith("# ")) return <h1 key={i} className="font-display text-2xl font-semibold mt-2">{line.slice(2)}</h1>;
                if (line.startsWith("## ")) return <h2 key={i} className="font-display text-lg font-semibold mt-4">{line.slice(3)}</h2>;
                if (line.startsWith("- ")) return <li key={i} className="ml-5 list-disc text-sm">{line.slice(2)}</li>;
                if (line.startsWith("```")) return null;
                if (line.trim() === "") return <div key={i} className="h-2" />;
                return <p key={i} className="text-sm leading-6">{line}</p>;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
