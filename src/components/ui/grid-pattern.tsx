"use client";

import React from "react";

interface GridPatternProps {
  variant?: "dots" | "grid" | "circuit";
  opacity?: number;
  color?: string;
  className?: string;
}

export function GridPattern({
  variant = "dots",
  opacity = 0.05,
  color = "currentColor",
  className = "",
}: GridPatternProps) {
  const patternId = `pattern-${variant}`;

  return (
    <svg
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        {variant === "dots" && (
          <pattern
            id={patternId}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1" fill={color} />
          </pattern>
        )}
        {variant === "grid" && (
          <pattern
            id={patternId}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0v40"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
          </pattern>
        )}
        {variant === "circuit" && (
          <pattern
            id={patternId}
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal and vertical traces */}
            <path
              d="M0 30h20v-10h10v20h10v-10h20"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
            <path
              d="M30 0v15h-10v10h20v15"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
            {/* Junction nodes */}
            <circle cx="20" cy="30" r="1.5" fill={color} />
            <circle cx="30" cy="20" r="1.5" fill={color} />
            <circle cx="40" cy="30" r="1.5" fill={color} />
            <circle cx="30" cy="15" r="1" fill={color} />
            <circle cx="20" cy="20" r="1" fill={color} />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
