// A/B Testing Configuration
// Define your experiments here

export interface Experiment {
  id: string;
  name: string;
  variants: {
    id: string;
    name: string;
    weight: number; // 0-100, all variants should sum to 100
  }[];
  isActive: boolean;
}

export const experiments: Experiment[] = [
  {
    id: "hero-cta",
    name: "Hero CTA Button Text",
    variants: [
      { id: "control", name: "Book Free Consultation", weight: 50 },
      { id: "variant-a", name: "Get Started Today", weight: 50 },
    ],
    isActive: true,
  },
  {
    id: "pricing-display",
    name: "Pricing Display Style",
    variants: [
      { id: "control", name: "Contact for Quote", weight: 50 },
      { id: "variant-a", name: "Starting at €5K/month", weight: 50 },
    ],
    isActive: false,
  },
  {
    id: "social-proof",
    name: "Social Proof Position",
    variants: [
      { id: "control", name: "Below Hero", weight: 50 },
      { id: "variant-a", name: "In Hero Section", weight: 50 },
    ],
    isActive: false,
  },
];

// Get a random variant based on weights
export function getRandomVariant(experiment: Experiment): string {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const variant of experiment.variants) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      return variant.id;
    }
  }

  return experiment.variants[0].id;
}

// Cookie name for storing experiment assignments
export const AB_COOKIE_NAME = "cloudrix_ab_tests";

// Parse experiment assignments from cookie
export function parseAssignments(cookie: string | undefined): Record<string, string> {
  if (!cookie) return {};

  try {
    return JSON.parse(cookie);
  } catch {
    return {};
  }
}

// Serialize experiment assignments to cookie
export function serializeAssignments(assignments: Record<string, string>): string {
  return JSON.stringify(assignments);
}

// Get variant for an experiment (from cookie or generate new)
export function getVariantAssignment(
  experimentId: string,
  existingAssignments: Record<string, string>
): { variant: string; isNew: boolean } {
  const experiment = experiments.find((e) => e.id === experimentId && e.isActive);

  if (!experiment) {
    return { variant: "control", isNew: false };
  }

  if (existingAssignments[experimentId]) {
    return { variant: existingAssignments[experimentId], isNew: false };
  }

  const variant = getRandomVariant(experiment);
  return { variant, isNew: true };
}

// Track conversion event (call from API or client)
export interface ConversionEvent {
  experimentId: string;
  variant: string;
  event: string; // e.g., "click", "signup", "contact_form"
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

// Send conversion events to Google Analytics 4
export function trackConversion(event: ConversionEvent): void {
  if (typeof window !== "undefined" && "gtag" in window) {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
    gtag("event", "ab_test_conversion", {
      experiment_id: event.experimentId,
      variant: event.variant,
      conversion_event: event.event,
      event_timestamp: event.timestamp.toISOString(),
      ...(event.metadata || {}),
    });
  }
}
