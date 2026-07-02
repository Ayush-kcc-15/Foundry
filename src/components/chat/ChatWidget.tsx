import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Smile, Paperclip, Phone, Video, ChevronLeft, Search } from "lucide-react";
import { CHAT_MESSAGES, CONVERSATIONS } from "@/components/collaboration/data";
import { ConversationList } from "./ConversationList";
import { MessageBubble } from "./MessageBubble";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("c1");
  const [mobileList, setMobileList] = useState(true);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Record<string, typeof CHAT_MESSAGES[string]>>(CHAT_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = CONVERSATIONS.find((c) => c.id === activeId);
  const list = messages[activeId] || [];
  const totalUnread = CONVERSATIONS.reduce((s, c) => s + c.unread, 0);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [open, list.length, activeId]);

  useEffect(() => {
    if (!text) return setTyping(false);
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 900);
    return () => clearTimeout(t);
  }, [text]);

  const send = () => {
    if (!text.trim()) return;
    const newMsg = { id: `n${Date.now()}`, authorId: "u_ayush", body: text, time: "now" };
    setMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }));
    setText("");
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        className={cn(
          "fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow hover:scale-105 transition lg:bottom-6 lg:left-6",
          open && "hidden",
        )}
      >
        <MessageSquare className="h-5 w-5" />
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground px-1">
            {totalUnread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 left-4 right-4 z-40 flex h-[70vh] max-h-[560px] w-auto flex-col overflow-hidden rounded-2xl glass-strong shadow-glow sm:right-auto sm:w-[380px] md:w-[520px] md:h-[520px]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2.5 bg-background/60">
              <button
                onClick={() => setMobileList((s) => !s)}
                className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 md:hidden"
                aria-label="Toggle list"
              >
                <ChevronLeft className={cn("h-4 w-4 transition", !mobileList && "rotate-180")} />
              </button>
              <MessageSquare className="h-4 w-4 text-primary" />
              <div className="text-sm font-semibold flex-1">Team chat</div>
              <button aria-label="Voice call" className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-primary hover:bg-white/5"><Phone className="h-3.5 w-3.5" /></button>
              <button aria-label="Video call" className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-primary hover:bg-white/5"><Video className="h-3.5 w-3.5" /></button>
              <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Sidebar list */}
              <div className={cn("w-full md:w-40 border-r border-border/60 bg-background/40", !mobileList && "hidden md:block")}>
                <ConversationList activeId={activeId} onSelect={(id) => { setActiveId(id); setMobileList(false); }} />
              </div>

              {/* Thread */}
              <div className={cn("flex-1 min-w-0 flex-col", mobileList ? "hidden md:flex" : "flex")}>
                <div className="border-b border-border/60 px-3 py-2 flex items-center gap-2">
                  <div className="text-xs font-semibold">{conversation?.name}</div>
                  {conversation?.pinned && <span className="rounded-full border border-primary/30 bg-primary/15 text-highlight text-[9px] px-1.5 py-0.5">Pinned</span>}
                  <div className="ml-auto">
                    <button aria-label="Search" className="grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5"><Search className="h-3 w-3" /></button>
                  </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2.5">
                  {list.length === 0 ? (
                    <div className="grid h-full place-items-center text-center text-xs text-muted-foreground">
                      <div>
                        <MessageSquare className="mx-auto mb-2 h-6 w-6 opacity-60" />
                        No messages yet — say hi.
                      </div>
                    </div>
                  ) : (
                    list.map((m) => <MessageBubble key={m.id} msg={m} mine={m.authorId === "u_ayush"} />)
                  )}
                  {typing && (
                    <div className="text-[10px] text-muted-foreground pl-8 animate-pulse">someone is typing…</div>
                  )}
                </div>

                <div className="border-t border-border/60 p-2">
                  <div className="flex items-end gap-1.5 rounded-xl border border-border/60 bg-surface/50 p-1.5">
                    <button aria-label="Attach" className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5"><Paperclip className="h-3.5 w-3.5" /></button>
                    <button aria-label="Emoji" className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5"><Smile className="h-3.5 w-3.5" /></button>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                      placeholder="Message…"
                      rows={1}
                      className="flex-1 resize-none bg-transparent px-1 py-1 text-xs placeholder:text-muted-foreground/70 focus:outline-none max-h-24"
                    />
                    <button
                      onClick={send}
                      disabled={!text.trim()}
                      className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition"
                      aria-label="Send"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
