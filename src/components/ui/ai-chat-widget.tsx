"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE =
  "Hi! I'm Cloudrix's AI assistant. I can help you learn about our AI services, EU AI Act compliance, or answer questions about our engineering capabilities. What would you like to know?";

function getResponse(input: string): string {
  const lower = input.toLowerCase();

  if (/ai act|compliance|regulation/.test(lower)) {
    return "The EU AI Act is the world's first comprehensive AI regulation, and compliance is mandatory for companies operating in the EU. Cloudrix offers full EU AI Act compliance assessments, risk classification, and implementation roadmaps. We help you identify your AI systems' risk levels and build the documentation, monitoring, and governance frameworks required. Learn more at [/eu-ai-act](/eu-ai-act).";
  }
  if (/agent|bot|automate/.test(lower)) {
    return "We build production-grade AI agents that automate complex business workflows. From customer service agents to internal process automation, our agents integrate with your existing systems via APIs and tool-calling frameworks. We use LangChain, CrewAI, and custom orchestration to deliver agents that are reliable, auditable, and scalable.";
  }
  if (/rag|data|search|knowledge/.test(lower)) {
    return "Our RAG (Retrieval-Augmented Generation) systems connect LLMs to your proprietary data — documents, databases, APIs — so you get accurate, source-cited answers instead of hallucinations. We handle vector databases, embedding pipelines, chunking strategies, and hybrid search to maximize retrieval quality for your specific domain.";
  }
  if (/price|cost|budget|pricing/.test(lower)) {
    return "Our AI projects typically range from \u20ac5,000 for focused PoCs to \u20ac50,000+ for full production systems. We offer transparent pricing with no hidden fees. Every project starts with a free AI strategy call where we scope your needs and provide a fixed-price quote. Check out our pricing at [/pricing](/pricing).";
  }
  if (/mcp|model context/.test(lower)) {
    return "We develop custom MCP (Model Context Protocol) servers that give AI assistants secure, structured access to your business tools and data. MCP servers act as a bridge between LLMs and your APIs, databases, and internal systems — enabling AI to take real actions on your behalf while maintaining security and audit trails.";
  }

  return "Great question! Our team would love to discuss this in detail. You can book a free AI strategy call at [/contact](/contact) or explore our AI services at [/ai-services](/ai-services).";
}

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const response = getResponse(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsThinking(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4 sm:bottom-6 sm:right-6 max-sm:bottom-4 max-sm:right-4">
      {/* Chat Panel */}
      <div
        className={`origin-bottom-right transition-all duration-300 ease-in-out ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[380px] max-sm:w-[calc(100vw-2rem)] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Cloudrix AI Assistant</h3>
                <p className="text-indigo-200 text-xs">Ask me anything about our AI services</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  {msg.content.split(/(\[.*?\]\(.*?\))/).map((part, j) => {
                    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (linkMatch) {
                      return (
                        <a
                          key={j}
                          href={linkMatch[2]}
                          className={`underline font-medium ${
                            msg.role === "user"
                              ? "text-indigo-200 hover:text-white"
                              : "text-indigo-600 hover:text-indigo-800"
                          }`}
                        >
                          {linkMatch[1]}
                        </a>
                      );
                    }
                    return <span key={j}>{part}</span>;
                  })}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-4 py-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                disabled={isThinking}
                className="flex-1 px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
              >
                {isThinking ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
          isOpen ? "rotate-0" : "rotate-0"
        }`}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </div>
  );
}
