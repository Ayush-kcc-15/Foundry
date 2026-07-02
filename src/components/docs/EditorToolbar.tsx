import type { Editor } from "@tiptap/react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Highlighter,
  Heading1, Heading2, Heading3, Heading4, List, ListOrdered, ListChecks,
  Code, Code2, Quote, Minus, Link2, Table as TableIcon, Image as ImageIcon,
  Info, AlertTriangle, CheckCircle2, Undo2, Redo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function Btn({
  onClick, active, disabled, title, children,
}: { onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition",
        active && "bg-primary/20 text-foreground",
        !active && "hover:bg-white/5 hover:text-foreground",
        disabled && "opacity-40 pointer-events-none",
      )}
    >
      {children}
    </button>
  );
}

const Divider = () => <div className="mx-0.5 h-5 w-px bg-border/60" />;

export function EditorToolbar({ editor }: { editor: Editor }) {
  const insertCallout = (kind: "info" | "warning" | "success") => {
    const styles = {
      info: { bg: "rgba(20,184,166,0.1)", border: "rgba(20,184,166,0.35)", label: "💡 Info" },
      warning: { bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.4)", label: "⚠️ Warning" },
      success: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.4)", label: "✅ Success" },
    }[kind];
    editor.chain().focus().insertContent(
      `<div class="docs-callout" style="border-left:3px solid ${styles.border};background:${styles.bg};padding:12px 14px;border-radius:8px;margin:12px 0;"><strong>${styles.label}</strong><p>Write your note here…</p></div>`,
    ).run();
  };

  const insertPlaceholder = (label: string, emoji: string) => {
    editor.chain().focus().insertContent(
      `<div class="docs-embed" style="border:1px dashed rgba(255,255,255,0.15);border-radius:12px;padding:24px;text-align:center;color:rgba(255,255,255,0.55);margin:12px 0;">${emoji}  ${label} placeholder</div>`,
    ).run();
  };

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-border/60 bg-background/70 px-2 py-1.5 backdrop-blur-xl">
      <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><Undo2 className="h-4 w-4" /></Btn>
      <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><Redo2 className="h-4 w-4" /></Btn>
      <Divider />
      <Btn title="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="h-4 w-4" /></Btn>
      <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></Btn>
      <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></Btn>
      <Btn title="Heading 4" active={editor.isActive("heading", { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}><Heading4 className="h-4 w-4" /></Btn>
      <Divider />
      <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></Btn>
      <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></Btn>
      <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon className="h-4 w-4" /></Btn>
      <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></Btn>
      <Btn title="Highlight" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}><Highlighter className="h-4 w-4" /></Btn>
      <Divider />
      <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></Btn>
      <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></Btn>
      <Btn title="Task list" active={editor.isActive("taskList")} onClick={() => editor.chain().focus().toggleTaskList().run()}><ListChecks className="h-4 w-4" /></Btn>
      <Divider />
      <Btn title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code className="h-4 w-4" /></Btn>
      <Btn title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code2 className="h-4 w-4" /></Btn>
      <Btn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></Btn>
      <Btn title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></Btn>
      <Divider />
      <Btn title="Link" active={editor.isActive("link")} onClick={addLink}><Link2 className="h-4 w-4" /></Btn>
      <Btn title="Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableIcon className="h-4 w-4" /></Btn>
      <Btn title="Image" onClick={() => insertPlaceholder("Image", "🖼️")}><ImageIcon className="h-4 w-4" /></Btn>
      <Divider />
      <Btn title="Info callout" onClick={() => insertCallout("info")}><Info className="h-4 w-4 text-primary" /></Btn>
      <Btn title="Warning callout" onClick={() => insertCallout("warning")}><AlertTriangle className="h-4 w-4 text-warning" /></Btn>
      <Btn title="Success callout" onClick={() => insertCallout("success")}><CheckCircle2 className="h-4 w-4 text-success" /></Btn>
    </div>
  );
}
