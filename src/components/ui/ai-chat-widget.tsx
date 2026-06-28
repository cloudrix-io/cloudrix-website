"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, X, Send, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE =
  "Hi there! 👋 Welcome to Cloudrix. I'm your AI assistant — I can help you find the right service, get pricing, or answer any questions. What are you working on?";

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How much does a project cost?",
  "I need help with AI",
];

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setShowPulse(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Auto-open after 30 seconds on first visit
  useEffect(() => {
    const hasSeenChat = sessionStorage.getItem("cloudrix-chat-seen");
    if (!hasSeenChat) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("cloudrix-chat-seen", "1");
      }, 30000);
      return () => clearTimeout(timer);
    } else {
      setShowPulse(false);
    }
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMsg: Message = { role: "user", content: content.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/products/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.filter((m) => m.content !== WELCOME_MESSAGE),
        }),
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream") && response.body) {
        // Streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  assistantContent += parsed.text;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: assistantContent,
                    };
                    return updated;
                  });
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      } else {
        // JSON response (demo mode)
        const data = await response.json();
        if (data.demo || data.error) {
          // Fallback responses
          const fallback = getFallbackResponse(content);
          setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please email us at contact@cloudrix.io or call +31 6 43166305 — we'd love to help!",
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 max-sm:bottom-4 max-sm:right-4">
      {/* Chat Panel */}
      <div
        className={`origin-bottom-right transition-all duration-300 ease-in-out ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[400px] max-sm:w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-indigo-700" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Cloudrix AI</h3>
                <p className="text-blue-200 text-xs">Online — typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                  }`}
                >
                  {msg.content.split("\n").map((line, j) => (
                    <span key={j}>
                      {line.split(/(\*\*.*?\*\*)/).map((part, k) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={k}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={k}>{part}</span>;
                      })}
                      {j < msg.content.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions (show only at start) */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-white flex-shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors border border-blue-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 px-4 py-3 flex-shrink-0 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isStreaming}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isStreaming}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              >
                {isStreaming ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-1.5">
              Powered by Claude AI · Responses in seconds
            </p>
          </div>
        </div>
      </div>

      {/* Floating Button with Pulse */}
      <div className="relative">
        {showPulse && !isOpen && (
          <>
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[8px] text-white flex items-center justify-center font-bold">
              1
            </div>
          </>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 relative"
          aria-label={isOpen ? "Close chat" : "Chat with Cloudrix AI"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}

function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (/price|cost|budget|pricing|how much/.test(lower)) {
    return "Our pricing is transparent: Quick Wins start at EUR 1,500, dedicated engineers at EUR 8,500/month, and projects from EUR 15,000. AI projects range from EUR 15,000-250,000. Check cloudrix.io/pricing for full details, or I can help you estimate for your specific project!";
  }
  if (/service|offer|do you|what can/.test(lower)) {
    return "We offer: Cloud Migration, DevOps Consulting, AI & ML Consulting (agents, RAG, LLM integration), Full-Stack Development, Dedicated Teams, Technical Due Diligence, API Development, and EU AI Act Compliance. What challenge are you facing? I can recommend the right fit.";
  }
  if (/ai|agent|rag|llm|machine learn/.test(lower)) {
    return "AI is our specialty! We build AI agents, RAG systems, LLM integrations, and help with EU AI Act compliance. Projects start at EUR 15,000 for a PoC. Want to explore what AI can do for your business? Book a free call at cloudrix.io/contact";
  }
  if (/hello|hi|hey/.test(lower)) {
    return "Hey! Great to have you here. Are you exploring a specific project, or just learning about what we do? I'm happy to help either way!";
  }
  return "Great question! I'd love to help you with that. For the most detailed answer, you can book a free 20-minute call with our founder at cloudrix.io/contact, or email contact@cloudrix.io. Is there anything specific about our services I can clarify?";
}
