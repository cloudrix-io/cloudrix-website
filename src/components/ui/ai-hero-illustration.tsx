"use client";

import React from "react";

export function AiHeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <style jsx>{`
        @keyframes pulse-line {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes float-icon {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .pulse-line {
          animation: pulse-line 3s ease-in-out infinite;
        }
        .pulse-line-delay-1 {
          animation: pulse-line 3s ease-in-out 0.5s infinite;
        }
        .pulse-line-delay-2 {
          animation: pulse-line 3s ease-in-out 1s infinite;
        }
        .pulse-line-delay-3 {
          animation: pulse-line 3s ease-in-out 1.5s infinite;
        }
        .pulse-line-delay-4 {
          animation: pulse-line 3s ease-in-out 2s infinite;
        }
        .float-icon {
          animation: float-icon 4s ease-in-out infinite;
        }
        .float-icon-delay-1 {
          animation: float-icon 4s ease-in-out 0.7s infinite;
        }
        .float-icon-delay-2 {
          animation: float-icon 4s ease-in-out 1.4s infinite;
        }
        .float-icon-delay-3 {
          animation: float-icon 4s ease-in-out 2.1s infinite;
        }
        .float-icon-delay-4 {
          animation: float-icon 4s ease-in-out 2.8s infinite;
        }
      `}</style>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background glow */}
        <defs>
          <radialGradient id="center-glow" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="160" fill="url(#center-glow)" />

        {/* Connection lines from center to icons */}
        <line x1="200" y1="200" x2="200" y2="80" stroke="url(#line-gradient)" strokeWidth="1.5" className="pulse-line" />
        <line x1="200" y1="200" x2="320" y2="130" stroke="url(#line-gradient)" strokeWidth="1.5" className="pulse-line-delay-1" />
        <line x1="200" y1="200" x2="320" y2="280" stroke="url(#line-gradient)" strokeWidth="1.5" className="pulse-line-delay-2" />
        <line x1="200" y1="200" x2="80" y2="280" stroke="url(#line-gradient)" strokeWidth="1.5" className="pulse-line-delay-3" />
        <line x1="200" y1="200" x2="80" y2="130" stroke="url(#line-gradient)" strokeWidth="1.5" className="pulse-line-delay-4" />

        {/* Secondary connection lines between icons */}
        <line x1="200" y1="80" x2="320" y2="130" stroke="#6366f1" strokeWidth="0.75" strokeOpacity="0.3" className="pulse-line-delay-2" />
        <line x1="320" y1="130" x2="320" y2="280" stroke="#6366f1" strokeWidth="0.75" strokeOpacity="0.3" className="pulse-line-delay-3" />
        <line x1="320" y1="280" x2="80" y2="280" stroke="#6366f1" strokeWidth="0.75" strokeOpacity="0.3" className="pulse-line-delay-4" />
        <line x1="80" y1="280" x2="80" y2="130" stroke="#6366f1" strokeWidth="0.75" strokeOpacity="0.3" className="pulse-line" />
        <line x1="80" y1="130" x2="200" y2="80" stroke="#6366f1" strokeWidth="0.75" strokeOpacity="0.3" className="pulse-line-delay-1" />

        {/* Central brain/neural node */}
        <circle cx="200" cy="200" r="32" fill="#4f46e5" fillOpacity="0.15" stroke="#6366f1" strokeWidth="2" />
        <circle cx="200" cy="200" r="20" fill="#4f46e5" fillOpacity="0.3" stroke="#818cf8" strokeWidth="1.5" />
        {/* Brain icon paths */}
        <g transform="translate(189, 189)">
          <path
            d="M11 2a4.5 4.5 0 0 0-3.8 6.9A4.5 4.5 0 0 0 5 17.5a4.5 4.5 0 0 0 6 4.24A4.5 4.5 0 0 0 17 17.5a4.5 4.5 0 0 0-1.8-8.6A4.5 4.5 0 0 0 11 2z"
            stroke="#c4b5fd"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(0.85) translate(1, 1)"
          />
        </g>

        {/* Node dots on connection lines */}
        <circle cx="200" cy="140" r="3" fill="#818cf8" className="pulse-line-delay-1" />
        <circle cx="260" cy="165" r="3" fill="#818cf8" className="pulse-line-delay-2" />
        <circle cx="260" cy="240" r="3" fill="#818cf8" className="pulse-line-delay-3" />
        <circle cx="140" cy="240" r="3" fill="#818cf8" className="pulse-line-delay-4" />
        <circle cx="140" cy="165" r="3" fill="#818cf8" className="pulse-line" />

        {/* Database icon (top) */}
        <g className="float-icon" transform="translate(182, 55)">
          <circle cx="18" cy="18" r="22" fill="#4f46e5" fillOpacity="0.1" />
          <ellipse cx="18" cy="12" rx="10" ry="4" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
          <path d="M8 12v6c0 2.2 4.5 4 10 4s10-1.8 10-4v-6" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
          <path d="M8 18c0 2.2 4.5 4 10 4s10-1.8 10-4" stroke="#a78bfa" strokeWidth="1.5" fill="none" />
        </g>

        {/* Cloud icon (top-right) */}
        <g className="float-icon-delay-1" transform="translate(302, 105)">
          <circle cx="18" cy="18" r="22" fill="#7c3aed" fillOpacity="0.1" />
          <path
            d="M13 24h12a5 5 0 0 0 1-9.9A7 7 0 0 0 12.6 14 4 4 0 0 0 13 24z"
            stroke="#c4b5fd"
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
          />
        </g>

        {/* Shield icon (bottom-right) */}
        <g className="float-icon-delay-2" transform="translate(302, 255)">
          <circle cx="18" cy="18" r="22" fill="#6366f1" fillOpacity="0.1" />
          <path
            d="M18 6l10 4v6c0 5.5-4 10-10 12-6-2-10-6.5-10-12v-6l10-4z"
            stroke="#a78bfa"
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
          />
          <path d="M14 17l3 3 5-5" stroke="#818cf8" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Bot icon (bottom-left) */}
        <g className="float-icon-delay-3" transform="translate(62, 255)">
          <circle cx="18" cy="18" r="22" fill="#4f46e5" fillOpacity="0.1" />
          <rect x="10" y="12" width="16" height="12" rx="2" stroke="#c4b5fd" strokeWidth="1.5" fill="none" />
          <circle cx="15" cy="18" r="1.5" fill="#818cf8" />
          <circle cx="21" cy="18" r="1.5" fill="#818cf8" />
          <line x1="18" y1="8" x2="18" y2="12" stroke="#c4b5fd" strokeWidth="1.5" />
          <circle cx="18" cy="7" r="2" stroke="#c4b5fd" strokeWidth="1.5" fill="none" />
        </g>

        {/* Code icon (top-left) */}
        <g className="float-icon-delay-4" transform="translate(62, 105)">
          <circle cx="18" cy="18" r="22" fill="#7c3aed" fillOpacity="0.1" />
          <path d="M14 12l-6 6 6 6" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 12l6 6-6 6" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
