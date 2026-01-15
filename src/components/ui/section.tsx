import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "gray" | "dark" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", size = "lg", children, ...props }, ref) => {
    const variants = {
      default: "bg-white",
      gray: "bg-slate-50",
      dark: "bg-slate-900 text-white",
      gradient: "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white",
    };

    const sizes = {
      sm: "py-12 md:py-16",
      md: "py-16 md:py-20",
      lg: "py-20 md:py-28",
      xl: "py-24 md:py-32",
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", children, ...props }, ref) => {
    const sizes = {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    };

    return (
      <div
        ref={ref}
        className={cn("mx-auto px-4 sm:px-6 lg:px-8", sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Section, Container };
