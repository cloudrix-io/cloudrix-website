"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, fr: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "cloudrix-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load language from localStorage
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (stored && (stored === "en" || stored === "fr")) {
      setLanguageState(stored);
    } else {
      // Try to detect from browser
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "fr") {
        setLanguageState("fr");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  // Simple translation helper
  const t = (en: string, fr: string) => {
    return language === "en" ? en : fr;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "en", setLanguage: () => {}, t: (en) => en }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
