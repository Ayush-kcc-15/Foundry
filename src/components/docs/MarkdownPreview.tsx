import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Renders an HTML string OR a markdown string in a "read view". */
export function MarkdownPreview({
  html, markdown, className,
}: { html?: string; markdown?: string; className?: string }) {
  const isMarkdown = !!markdown;
  return (
    <div className={cn("docs-prose px-6 py-6 sm:px-10 overflow-y-auto", className)}>
      {isMarkdown ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props }: any) {
              const text = String(children ?? "").replace(/\n$/, "");
              if (inline) return <code className="docs-inline-code" {...props}>{children}</code>;
              return <CodeBlock code={text} lang={className?.replace("language-", "")} />;
            },
          }}
        >{markdown!}</ReactMarkdown>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: html ?? "" }} />
      )}
    </div>
  );
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="group relative my-3 overflow-hidden rounded-lg border border-border/60 bg-background/60">
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{lang ?? "code"}</span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] hover:bg-white/5"
        >
          {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed"><code>{code}</code></pre>
    </div>
  );
}
