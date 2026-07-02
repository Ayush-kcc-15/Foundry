import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { EditorToolbar } from "./EditorToolbar";
import { useEffect } from "react";

export function DocsEditor({
  content,
  onUpdate,
  editable = true,
}: {
  content: string;
  onUpdate?: (html: string) => void;
  editable?: boolean;
}) {
  const editor = useEditor({
    editable,
    extensions: [
      StarterKit.configure({ codeBlock: { HTMLAttributes: { class: "docs-codeblock" } } }),
      Underline,
      Highlight.configure({ multicolor: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline underline-offset-2" } }),
      Placeholder.configure({ placeholder: "Start writing, or press '/' for commands…" }),
      TaskList.configure({ HTMLAttributes: { class: "docs-tasklist" } }),
      TaskItem.configure({ nested: true, HTMLAttributes: { class: "docs-taskitem" } }),
      Table.configure({ resizable: false, HTMLAttributes: { class: "docs-table" } }),
      TableRow, TableHeader, TableCell,
    ],
    content,
    onUpdate: ({ editor }) => onUpdate?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "docs-prose focus:outline-none min-h-[400px]",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, editor]);

  return (
    <div className="flex h-full flex-col">
      {editable && editor && <EditorToolbar editor={editor} />}
      <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-10">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export type { Editor };
