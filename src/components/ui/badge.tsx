import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "outline";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-slate-100 text-slate-700",
      primary: "bg-blue-100 text-blue-700",
      secondary: "bg-slate-800 text-white",
      success: "bg-green-100 text-green-700",
      warning: "bg-amber-100 text-amber-700",
      outline: "border border-slate-300 text-slate-700 bg-transparent",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
