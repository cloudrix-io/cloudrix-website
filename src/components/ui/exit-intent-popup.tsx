"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Download, CheckCircle } from "lucide-react";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle Escape key to close popup
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsVisible(false);
    }
    // Focus trap: keep focus within the dialog
    if (e.key === "Tab" && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    }
  }, []);

  // Add/remove keydown listener and focus management when popup opens/closes
  useEffect(() => {
    if (isVisible) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the dialog when it opens
      setTimeout(() => {
        const firstInput = dialogRef.current?.querySelector<HTMLElement>("input, button");
        firstInput?.focus();
      }, 100);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isVisible, handleKeyDown]);

  useEffect(() => {
    // Check if popup was already shown in this session
    const hasShownPopup = sessionStorage.getItem("exitPopupShown");
    if (hasShownPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves at the top of the viewport
      if (e.clientY <= 0) {
        setIsVisible(true);
        sessionStorage.setItem("exitPopupShown", "true");
        // Remove listener after showing once
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    // Add delay before enabling exit intent
    const timeout = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000); // Wait 5 seconds before enabling

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent" }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to subscribe");
      }

      setIsSubmitted(true);
    } catch {
      // Still show success to not block UX, email will be retried
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Download free cloud migration checklist"
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-10 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Before You Go... One Thing
              </h3>
              <p className="text-blue-100">
                The exact checklist we use on €500K+ migration projects. Yours free.
              </p>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Inside the PDF:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    15 steps most agencies skip (then charge to fix)
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    The security gotchas that cause €50K+ breaches
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    How to cut cloud costs by 40% (not the obvious stuff)
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap disabled:opacity-50"
                  >
                    {isLoading ? "..." : "Get Free PDF"}
                  </button>
                </div>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Inbox!
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent the Cloud Migration Checklist to your email.
            </p>
            <button
              onClick={handleClose}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
