"use client";

import { useEffect, useState, useCallback } from "react";
import { AB_COOKIE_NAME, parseAssignments, experiments } from "@/lib/ab-testing";

interface UseABTestResult {
  variant: string;
  isLoading: boolean;
  trackConversion: (event: string, metadata?: Record<string, unknown>) => void;
}

export function useABTest(experimentId: string): UseABTestResult {
  const [variant, setVariant] = useState<string>("control");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read cookie on client side
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const assignments = parseAssignments(cookies[AB_COOKIE_NAME]);
    const assignedVariant = assignments[experimentId] || "control";

    setVariant(assignedVariant);
    setIsLoading(false);
  }, [experimentId]);

  const trackConversion = useCallback(
    (event: string, metadata?: Record<string, unknown>) => {
      const experiment = experiments.find((e) => e.id === experimentId);

      // Log conversion event
      const conversionData = {
        experimentId,
        experimentName: experiment?.name,
        variant,
        event,
        timestamp: new Date().toISOString(),
        metadata,
        url: window.location.href,
      };

      console.log("[A/B Conversion]", conversionData);

      // Send to Google Analytics 4 if available
      if (typeof window !== "undefined" && "gtag" in window) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "ab_test_conversion", {
          experiment_id: experimentId,
          variant: variant,
          conversion_event: event,
          ...metadata,
        });
      }

      // Send to Vercel Analytics if available
      if (typeof window !== "undefined" && "va" in window) {
        (window as unknown as { va: (...args: unknown[]) => void }).va("event", {
          name: "ab_conversion",
          data: conversionData,
        });
      }

      // You can also send to your own API
      // fetch("/api/analytics/conversion", {
      //   method: "POST",
      //   body: JSON.stringify(conversionData),
      // });
    },
    [experimentId, variant]
  );

  return { variant, isLoading, trackConversion };
}

// Hook to get all active experiment assignments
export function useAllExperiments(): Record<string, string> {
  const [assignments, setAssignments] = useState<Record<string, string>>({});

  useEffect(() => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    setAssignments(parseAssignments(cookies[AB_COOKIE_NAME]));
  }, []);

  return assignments;
}
