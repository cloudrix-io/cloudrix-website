"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Send, Bot, User, Loader2, ArrowLeft, Mail, X, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "What services do you offer?",
  "How much does cloud migration cost?",
  "Do you work with US companies?",
];

const DEMO_RESPONSES: Record<string, string> = {
  "What services do you offer?":
    "Cloudrix offers a comprehensive range of services including cloud migration, DevOps consulting, AI consulting & development, full-stack software engineering, dedicated development teams, and infrastructure optimization. We specialize in helping companies modernize their tech stack and leverage AI effectively.",
  "How much does cloud migration cost?":
    "Our pricing is flexible based on your needs. Quick Wins start at EUR 1,500 for focused consulting engagements. For ongoing work, dedicated engineers are available from EUR 8,500/month. Cloud migration projects typically range from EUR 15,000 to EUR 150,000 depending on complexity, number of services, and compliance requirements. We offer a free initial assessment to give you an accurate estimate.",
  "Do you work with US companies?":
    "Absolutely! While Cloudrix is headquartered in Europe, we work with companies worldwide including the US, Middle East, Asia-Pacific, and Africa. We have experience navigating cross-border compliance requirements and offer flexible working hours to accommodate different time zones.",
  default:
    "Thank you for your question! As a demo, I have limited responses. In the full version, CloudrixAI can answer any question about our services, pricing, capabilities, and more. Would you like to try one of the starter questions, or contact our team directly?",
};

const WELCOME_MESSAGE = `Hi there! 👋 I'm CloudrixAI, your engineering consultant.

I can help you with:
• **Getting a cost estimate** for your project
• **Choosing the right service** (cloud, AI, DevOps, full-stack)
• **Understanding our pricing** and how we work
• **Answering technical questions** about our capabilities

What brings you here today?`;

export default function CloudrixAIChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    if (newCount >= 3 && !emailSubmitted) {
      setTimeout(() => setShowEmailCapture(true), 1000);
    }

    try {
      const response = await fetch("/api/products/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (response.status === 429) {
        setMessages([...newMessages, { role: "assistant", content: "Rate limit reached. Please try again later." }]);
        setIsStreaming(false);
        return;
      }

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        // Demo mode
        setIsDemoMode(true);
        const demoResponse = DEMO_RESPONSES[content] || DEMO_RESPONSES.default;
        let accumulated = "";
        for (const char of demoResponse) {
          accumulated += char;
          setMessages([...newMessages, { role: "assistant", content: accumulated }]);
          await new Promise((r) => setTimeout(r, 15));
        }
      } else {
        // Streaming mode
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        if (reader) {
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
                  accumulated += parsed.text;
                  setMessages([...newMessages, { role: "assistant", content: accumulated }]);
                } catch {
                  // skip
                }
              }
            }
          }
        }
      }
    } catch {
      setIsDemoMode(true);
      const demoResponse = DEMO_RESPONSES[content] || DEMO_RESPONSES.default;
      setMessages([...newMessages, { role: "assistant", content: demoResponse }]);
    }

    setIsStreaming(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/products/cloudrix-ai-chat"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">CloudrixAI Chat</h1>
              <p className="text-sm text-muted-foreground">
                Ask anything about Cloudrix services
                {isDemoMode && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    <Sparkles className="h-3 w-3" /> Demo Mode
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="rounded-2xl border border-card-border bg-card-bg shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Bot className="h-16 w-16 text-violet-400 mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  Welcome to CloudrixAI
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  I can help you learn about Cloudrix&apos;s services, pricing, and capabilities. Try one of these questions:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm text-violet-700 hover:bg-violet-100 transition-colors dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-300 dark:hover:bg-violet-900/40"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-slate-300"
                  }`}
                >
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  {msg.content}
                  {i === messages.length - 1 && msg.role === "assistant" && isStreaming && (
                    <span className="inline-block ml-1 w-2 h-4 bg-current animate-pulse" />
                  )}
                </div>
              </div>
            ))}

            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-slate-300">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-gray-100 px-4 py-3 dark:bg-slate-800">
                  <Loader2 className="h-5 w-5 animate-spin text-violet-500" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Email Capture */}
          {showEmailCapture && !emailSubmitted && (
            <div className="border-t border-card-border bg-violet-50 px-4 py-3 dark:bg-violet-900/20">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-violet-500 shrink-0" />
                <p className="text-sm text-violet-700 dark:text-violet-300 flex-1">
                  Want a human to follow up? Leave your email
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-sm dark:border-violet-700 dark:bg-slate-800 dark:text-slate-200"
                  />
                  <button
                    onClick={() => {
                      if (email) {
                        setEmailSubmitted(true);
                        setShowEmailCapture(false);
                      }
                    }}
                    className="rounded-lg bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowEmailCapture(false)}
                    className="rounded-lg p-1.5 text-violet-400 hover:text-violet-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {emailSubmitted && (
            <div className="border-t border-card-border bg-green-50 px-4 py-3 dark:bg-green-900/20">
              <p className="text-sm text-green-700 dark:text-green-300 text-center">
                Thanks! Our team will reach out to {email} shortly.
              </p>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-card-border p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Cloudrix services..."
                disabled={isStreaming}
                className="flex-1 rounded-xl border border-card-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isStreaming ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 rounded-xl border border-card-border bg-card-bg p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Want CloudrixAI for your business?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Deploy an intelligent support agent that learns from your documentation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-6 py-3 text-sm font-medium text-white hover:bg-violet-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
