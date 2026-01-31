"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, Users, TrendingUp } from "lucide-react";

const notifications = [
  {
    type: "booking",
    company: "TechVentures GmbH",
    location: "Berlin",
    action: "just booked a strategy call",
    time: "2 minutes ago",
  },
  {
    type: "booking",
    company: "Nordic Solutions",
    location: "Stockholm",
    action: "scheduled a technical assessment",
    time: "5 minutes ago",
  },
  {
    type: "download",
    company: "A FinTech company",
    location: "Amsterdam",
    action: "downloaded the Cloud Migration Checklist",
    time: "8 minutes ago",
  },
  {
    type: "booking",
    company: "DataFlow Labs",
    location: "Paris",
    action: "just booked a strategy call",
    time: "12 minutes ago",
  },
  {
    type: "project",
    company: "MedConnect",
    location: "Brussels",
    action: "started a new project with us",
    time: "1 hour ago",
  },
  {
    type: "download",
    company: "A SaaS startup",
    location: "Munich",
    action: "downloaded the DevOps Assessment",
    time: "15 minutes ago",
  },
  {
    type: "booking",
    company: "LogiTech Solutions",
    location: "Rotterdam",
    action: "booked a consultation",
    time: "20 minutes ago",
  },
];

export function SocialProofNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user dismissed notifications this session
    const dismissed = sessionStorage.getItem("socialProofDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Initial delay before showing first notification
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    // Rotate through notifications
    const showInterval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    // Auto-hide after showing
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    return () => {
      clearInterval(showInterval);
      clearTimeout(hideTimeout);
    };
  }, [currentNotification, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("socialProofDismissed", "true");
  };

  if (isDismissed || !isVisible) return null;

  const notification = notifications[currentNotification];

  const getIcon = () => {
    switch (notification.type) {
      case "booking":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "download":
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case "project":
        return <Users className="w-5 h-5 text-purple-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-sm transition-all duration-500 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">
            <span className="font-semibold">{notification.company}</span>
            <span className="text-gray-500"> from {notification.location}</span>
          </p>
          <p className="text-sm text-gray-600">{notification.action}</p>
          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Visitor Counter Component
export function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate visitor count (in production, use real analytics)
    const baseCount = 127;
    const randomVariation = Math.floor(Math.random() * 20);
    setCount(baseCount + randomVariation);

    // Show after delay
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span>
        <strong>{count}</strong> people viewing this page
      </span>
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
        <span>AWS Partner</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span>4.9/5 Rating</span>
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
