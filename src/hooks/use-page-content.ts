"use client";

import { useLanguage } from "@/contexts/language-context";
import type { ILocalizedContent, PageContent } from "@/lib/models/page";

export function usePageContent<T extends PageContent>(content: ILocalizedContent): T {
  const { language } = useLanguage();
  return (content[language] || content.en || {}) as T;
}

export function useLocalizedValue<T>(values: { en: T; fr: T }): T {
  const { language } = useLanguage();
  return values[language] ?? values.en;
}
