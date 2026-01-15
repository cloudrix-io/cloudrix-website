import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  company: z
    .string()
    .min(1, "Company is required")
    .max(100, "Company name cannot exceed 100 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),
  problemType: z.string().min(1, "Please select a problem type"),
  budgetRange: z.string().optional(),
  timeline: z.string().min(1, "Please select a timeline"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message cannot exceed 5000 characters")
    .trim(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Rate limiting store (in-memory, consider Redis for production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60000);
