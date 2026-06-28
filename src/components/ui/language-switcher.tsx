"use client";

import { useLanguage, Language } from "@/contexts/language-context";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "default" | "compact";
  className?: string;
}

export function LanguageSwitcher({ variant = "default", className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; shortLabel: string }[] = [
    { code: "en", label: "English", shortLabel: "EN" },
    { code: "fr", label: "Francais", shortLabel: "FR" },
  ];

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-1", className)} role="group" aria-label="Language switcher">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "px-2 py-1 text-sm font-medium rounded transition-colors",
              language === lang.code
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            {lang.shortLabel}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative group", className)}>
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span>{language === "en" ? "EN" : "FR"}</span>
      </button>

      <div className="absolute right-0 top-full mt-1 hidden group-hover:block">
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={cn(
                "w-full px-4 py-2 text-left text-sm transition-colors",
                language === lang.code
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
