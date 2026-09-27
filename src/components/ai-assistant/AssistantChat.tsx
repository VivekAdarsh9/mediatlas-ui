"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  SendHorizontal,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { sendAssistantMessage } from "@/lib/ai-assistant";
import type {
  AssistantSuggestion,
  ChatMessage,
} from "@/types/ai-assistant";

interface AssistantChatProps {
  greeting: string;
  suggestions: AssistantSuggestion[];
}

export default function AssistantChat({
  greeting,
  suggestions,
}: AssistantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // Keep the latest message in view without scrolling the whole page
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${nextId.current++}`,
      role: "user",
      content,
    };
    const history = [...messages, userMessage];

    setMessages(history);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendAssistantMessage(content, messages);
      setMessages([
        ...history,
        { id: `msg-${nextId.current++}`, role: "assistant", ...reply },
      ]);
    } catch {
      setMessages([
        ...history,
        {
          id: `msg-${nextId.current++}`,
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-[640px] bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
            <Sparkles size={16} />
          </span>
          <span className="font-heading text-lg font-semibold">
            Clinical Assistant
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            disabled={isLoading}
            className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
          >
            <RotateCcw size={14} /> New chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center">
            <p className="text-lg leading-7 text-on-surface-variant mb-6 max-w-xl">
              {greeting}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.prompt}
                  onClick={() => sendMessage(suggestion.prompt)}
                  className="text-left p-4 rounded-xl border border-outline-variant hover:border-primary hover:shadow-lg transition-all group"
                >
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">
                    {suggestion.category}
                  </span>
                  <p className="text-sm font-medium mt-1 group-hover:text-primary transition-colors">
                    {suggestion.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) =>
            message.role === "user" ? (
              <div key={message.id} className="flex justify-end">
                <p className="max-w-[80%] bg-primary text-on-primary px-4 py-3 rounded-xl rounded-br-sm whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            ) : (
              <div key={message.id} className="flex gap-3 items-start">
                <span className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </span>
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-xl rounded-tl-sm space-y-3 ${
                    message.isUrgent
                      ? "bg-error-container text-on-error-container"
                      : "bg-surface-container-low"
                  }`}
                >
                  {message.isUrgent && (
                    <p className="flex items-center gap-2 font-semibold">
                      <AlertTriangle size={16} /> Seek urgent care
                    </p>
                  )}
                  {message.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {message.sources && message.sources.length > 0 && (
                    <div className="pt-3 border-t border-outline-variant">
                      <span className="text-xs font-bold text-outline uppercase tracking-wider">
                        Sources
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.sources.map((source) => (
                          <Link
                            key={source.href}
                            href={source.href}
                            className="flex items-center gap-1 bg-surface-container-lowest border border-outline-variant px-3 py-1 rounded-full text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
                          >
                            {source.title} <ArrowRight size={12} />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )
        )}

        {isLoading && (
          <div className="flex gap-3 items-center">
            <span className="w-8 h-8 rounded-full bg-surface-container text-primary flex items-center justify-center shrink-0">
              <Sparkles size={16} />
            </span>
            <div className="flex gap-1 bg-surface-container-low px-4 py-4 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-outline animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-outline animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-outline animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 p-4 border-t border-outline-variant"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask about a condition, medication, or test..."
          aria-label="Message the AI Assistant"
          className="flex-1 resize-none max-h-32 px-4 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base placeholder:text-outline"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
          className="h-12 w-12 shrink-0 bg-primary text-on-primary rounded-xl flex items-center justify-center hover:bg-surface-tint transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendHorizontal size={20} />
        </button>
      </form>
    </div>
  );
}
