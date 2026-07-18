"use client";

import { useState, useEffect, useCallback } from "react";
import { Zap, X } from "lucide-react";

const notifications = [
  {
    icon: "🏦",
    text: "A FinTech company from Amsterdam just booked an AI Strategy Call",
    time: "2 hours ago",
  },
  {
    icon: "💳",
    text: "PayFlow Technologies completed their EU AI Act compliance program",
    time: "5 hours ago",
  },
  {
    icon: "🛡️",
    text: "SecureLife Insurance deployed their AI customer service agent",
    time: "1 day ago",
  },
  {
    icon: "🏥",
    text: "A healthcare startup from Berlin started their RAG system project",
    time: "1 day ago",
  },
  {
    icon: "🏭",
    text: "A manufacturing company saved \u20AC840K with AI automation",
    time: "2 days ago",
  },
  {
    icon: "📊",
    text: "A logistics firm from Rotterdam deployed predictive analytics",
    time: "3 days ago",
  },
  {
    icon: "🔐",
    text: "A SaaS company completed GDPR-compliant AI integration",
    time: "3 days ago",
  },
];

export function SocialProofNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem("socialProofDismissed", "true");
  }, []);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("socialProofDismissed");
    if (dismissed) return;

    // Show first notification after 6 seconds
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(showTimeout);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      // Animate out
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsAnimating(false);
      }, 400);
    }, 8000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const notification = notifications[currentIndex];

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-sm transition-all duration-400 ${
        isAnimating
          ? "opacity-0 translate-y-4"
          : "opacity-100 translate-y-0"
      }`}
      style={{ animation: isAnimating ? undefined : "slideUp 0.4s ease-out" }}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 flex items-start gap-3 relative">
        <button
          onClick={dismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss notifications"
        >
          <X className="w-3.5 h-3.5" />
        </button>
        <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg">
          {notification.icon}
        </div>
        <div className="pr-4">
          <p className="text-sm font-medium text-gray-900 leading-snug">
            {notification.text}
          </p>
          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

// Trust Badge Strip Component
export function TrustBadgeStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-4 bg-gray-50 border-y border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>GDPR Compliant</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>KVK Registered</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span>24h Response</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span>EUR Invoicing</span>
      </div>
    </div>
  );
}
