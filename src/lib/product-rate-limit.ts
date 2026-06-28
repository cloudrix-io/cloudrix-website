// In-memory rate limiter for product demo APIs (max 5 requests per IP per hour)
const store = new Map<string, { count: number; resetTime: number }>();

export function checkProductRateLimit(
  ip: string,
  maxRequests = 5,
  windowMs = 3600000 // 1 hour
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now > record.resetTime) {
    store.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
}

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of store.entries()) {
    if (now > record.resetTime) {
      store.delete(ip);
    }
  }
}, 600000);
