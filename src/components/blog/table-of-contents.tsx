"use client";

import { useState, useEffect } from "react";
import { List, ChevronDown } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(html: string): TOCItem[] {
  const headingRegex = /<h([23])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h[23]>/gi;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const existingId = match[2];
    const text = match[3].replace(/<[^>]*>/g, "").trim();
    const id = existingId || text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    if (text) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const headings = extractHeadings(content);

  useEffect(() => {
    if (headings.length === 0) return;

    // Add IDs to headings in the DOM if they don't have them
    headings.forEach((heading) => {
      const elements = document.querySelectorAll("h2, h3");
      elements.forEach((el) => {
        const text = el.textContent?.trim();
        if (text === heading.text && !el.id) {
          el.id = heading.id;
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile TOC - Collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2 font-medium text-gray-900">
            <List className="w-4 h-4" />
            Table of Contents
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <nav className="mt-2 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <ol className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`text-sm text-left w-full hover:text-blue-600 transition-colors ${
                      heading.level === 3 ? "pl-4" : ""
                    } ${activeId === heading.id ? "text-blue-600 font-medium" : "text-gray-600"}`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>

      {/* Desktop TOC - Sticky Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <h4 className="flex items-center gap-2 font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
            <List className="w-4 h-4" />
            On This Page
          </h4>
          <nav>
            <ol className="space-y-2 border-l-2 border-gray-200">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`block text-sm text-left w-full py-1 transition-colors border-l-2 -ml-[2px] ${
                      heading.level === 3 ? "pl-6" : "pl-4"
                    } ${
                      activeId === heading.id
                        ? "border-blue-600 text-blue-600 font-medium"
                        : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-400"
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </aside>
    </>
  );
}
