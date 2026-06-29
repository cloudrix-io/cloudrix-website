"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Rocket } from "lucide-react";

const BANNER_DISMISSED_KEY = "cloudrix-tools-banner-dismissed";

export function ToolsBanner() {
  const [dismissed, setDismissed] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const wasDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    if (!wasDismissed) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
  };

  // Hide on product pages or if dismissed
  if (dismissed || pathname.startsWith("/products")) {
    return null;
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2 text-sm">
        <Rocket className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline">
          Try our 24 free AI tools — No signup required
        </span>
        <span className="sm:hidden">24 free AI tools — No signup</span>
        <Link
          href="/products"
          className="ml-2 inline-flex items-center font-semibold underline underline-offset-2 hover:text-blue-100 transition-colors"
        >
          Try Now
        </Link>
        <button
          onClick={handleDismiss}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
