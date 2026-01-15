"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useABTest } from "@/hooks/use-ab-test";

interface ABCtaButtonProps {
  href: string;
  className?: string;
}

export function ABCtaButton({ href, className = "" }: ABCtaButtonProps) {
  const { variant, isLoading, trackConversion } = useABTest("hero-cta");

  // Define text variants
  const buttonText: Record<string, string> = {
    control: "Book Free Consultation",
    "variant-a": "Get Started Today",
  };

  const handleClick = () => {
    trackConversion("cta_click", {
      button_location: "hero",
      destination: href,
    });
  };

  // Show loading state to avoid flicker
  if (isLoading) {
    return (
      <div className={`inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg opacity-80 ${className}`}>
        <span className="w-48 h-6 bg-blue-500 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg group ${className}`}
      data-ab-experiment="hero-cta"
      data-ab-variant={variant}
    >
      {buttonText[variant] || buttonText.control}
      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
