import React from "react";
import { cn } from "@/lib/utils";

interface ServiceIconProps {
  icon: React.ComponentType<{ className?: string }>;
  variant?: "blue" | "indigo" | "purple" | "green" | "orange" | "red";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const gradients: Record<NonNullable<ServiceIconProps["variant"]>, string> = {
  blue: "from-blue-500 to-cyan-400",
  indigo: "from-indigo-500 to-purple-500",
  purple: "from-purple-500 to-pink-500",
  green: "from-emerald-500 to-teal-400",
  orange: "from-orange-500 to-amber-400",
  red: "from-red-500 to-rose-400",
};

const sizes: Record<NonNullable<ServiceIconProps["size"]>, { container: string; icon: string }> = {
  sm: { container: "h-10 w-10", icon: "h-5 w-5" },
  md: { container: "h-14 w-14", icon: "h-7 w-7" },
  lg: { container: "h-20 w-20", icon: "h-10 w-10" },
};

export function ServiceIcon({
  icon: Icon,
  variant = "indigo",
  size = "md",
  className,
}: ServiceIconProps) {
  const { container, icon: iconSize } = sizes[size];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-to-br shadow-lg",
        gradients[variant],
        container,
        className
      )}
    >
      <Icon className={cn(iconSize, "text-white drop-shadow-sm")} />
    </div>
  );
}
