import { useRef, useState } from "react";
import { Paperclip, Send, Smile, Code, AtSign } from "lucide-react";
import { MentionDropdown } from "./MentionDropdown";

export function ReplyEditor({
  placeholder = "Write a reply… use @ to mention",
  onSubmit,
}: {
  placeholder?: string;
  onSubmit?: (body: string) => void;
}) {
  const [value, setValue] = useState("");
  const [mention, setMention] = useState<{ open: boolean; query: string; active: number }>({ open: false, query: "", active: 0 });
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onChange = (v: string) => {
    setValue(v);
    const match = /(?:^|\s)@(\w*)$/.exec(v);
    if (match) setMention({ open: true, query: match[1], active: 0 });
    else setMention((s) => ({ ...s, open: false }));
  };

  const insertMention = (name: string) => {
    const next = value.replace(/(^|\s)@(\w*)$/, `$1@${name} `);
    setValue(next);
    setMention({ open: false, query: "", active: 0 });
    inputRef.current?.focus();
  };

  const submit = () => {
    if (!value.trim()) return;
    onSubmit?.(value);
    setValue("");
  };

  return (
    <div className="relative rounded-2xl border border-border/60 bg-surface/40 focus-within:border-primary/50 transition">
      {mention.open && (
        <MentionDropdown
          query={mention.query}
          active={mention.active}
          onSelect={insertMention}
        />
      )}
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); submit(); }
        }}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none bg-transparent px-3.5 py-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
      />
      <div className="flex items-center justify-between border-t border-border/60 px-2 py-1.5">
        <div className="flex items-center gap-0.5 text-muted-foreground">
          <IconBtn label="Mention" onClick={() => onChange(value + " @")}><AtSign className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn label="Emoji"><Smile className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn label="Code"><Code className="h-3.5 w-3.5" /></IconBtn>
          <IconBtn label="Attach"><Paperclip className="h-3.5 w-3.5" /></IconBtn>
          <span className="ml-1 text-[10px]">Markdown supported · ⌘↵ to send</span>
        </div>
        <button
          onClick={submit}
          disabled={!value.trim()}
          className="inline-flex items-center gap-1 rounded-lg bg-primary text-primary-foreground px-2.5 py-1 text-xs font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <Send className="h-3 w-3" /> Reply
        </button>
      </div>
    </div>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} title={label} aria-label={label} className="grid h-7 w-7 place-items-center rounded-md hover:bg-white/5 hover:text-foreground transition">
      {children}
    </button>
  );
}
