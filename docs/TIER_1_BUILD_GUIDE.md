# Tier 1 Build Guide — Build First, Highest Revenue

> **Products:** AI Act Scanner, CodeScan AI, API Monitor, StatusPage
> **Timeline:** Week 1-2
> **Expected MRR:** €5K-€32K combined
> **Organization:** https://github.com/cloudrix-io

---

## Access & Infrastructure

| Resource | URL / Value |
|----------|-------------|
| **GitHub Org** | https://github.com/cloudrix-io |
| **Vercel Team** | https://vercel.com/firas-projects-f79a263c |
| **Main Website Repo** | https://github.com/cloudrix-io/cloudrix-website |
| **Main Website URL** | https://www.cloudrix.io |
| **Products Page** | https://www.cloudrix.io/products |
| **Products Data File** | `cloudrix-website/src/data/products.ts` |

### Environment Variables (set in each Vercel project)
```
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/[db-name]
JWT_SECRET=[random-32-char-string]
RESEND_API_KEY=re_[your-key]
ANTHROPIC_API_KEY=sk-ant-[your-key]
STRIPE_SECRET_KEY=sk_live_[your-key]
STRIPE_WEBHOOK_SECRET=whsec_[your-key]
NEXT_PUBLIC_SITE_URL=https://[product].cloudrix.io
```

### Standard Tech Stack
- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JWT via jose library + bcryptjs for passwords
- **Email:** Resend
- **AI/LLM:** @anthropic-ai/sdk (Claude API)
- **Payments:** stripe + @stripe/stripe-js
- **Validation:** Zod
- **Icons:** lucide-react

### Standard Project Structure (ALL products follow this)
```
[product-repo]/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Public landing page
│   │   ├── layout.tsx                  # Root layout (metadata, fonts, analytics)
│   │   ├── globals.css                 # Tailwind imports + custom styles
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx              # Auth-protected layout
│   │   │   ├── page.tsx                # Main dashboard
│   │   │   ├── settings/page.tsx
│   │   │   └── billing/page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.ts
│   │   │   │   ├── login/route.ts
│   │   │   │   └── me/route.ts
│   │   │   ├── billing/
│   │   │   │   ├── checkout/route.ts
│   │   │   │   └── portal/route.ts
│   │   │   └── webhooks/
│   │   │       └── stripe/route.ts
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── ui/                         # Buttons, inputs, cards, etc.
│   │   └── forms/
│   ├── lib/
│   │   ├── mongodb.ts                  # Mongoose connection (copy from cloudrix-website)
│   │   ├── auth.ts                     # JWT create/verify (copy from cloudrix-website)
│   │   ├── stripe.ts                   # Stripe client init
│   │   ├── email.ts                    # Resend helpers
│   │   ├── validation.ts               # Zod schemas
│   │   └── models/
│   │       ├── user.ts                 # Standard user model
│   │       └── [product-specific].ts
│   ├── types/
│   │   └── index.ts
│   └── middleware.ts                    # Protect /dashboard/* routes
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.ts
└── .env.local                          # NOT committed
```

### How to Bootstrap a New Product
```bash
# 1. Clone the empty repo
git clone https://github.com/cloudrix-io/[REPO].git
cd [REPO]

# 2. Create Next.js app
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# 3. Install dependencies
npm install mongoose jose bcryptjs resend stripe @stripe/stripe-js zod lucide-react clsx tailwind-merge @anthropic-ai/sdk

# 4. Copy shared files from cloudrix-website
# Copy these files and adapt:
#   src/lib/mongodb.ts
#   src/lib/auth.ts
#   src/middleware.ts (adapt protected routes)

# 5. Create .env.local with all env vars

# 6. Build and test
npm run build
npm run dev

# 7. Deploy to Vercel
# Vercel Dashboard → Add New → Import cloudrix-io/[REPO] → Add env vars → Deploy
# Then add domain: [product].cloudrix.io
```

### After Deploying Each Product
Update `cloudrix-website/src/data/products.ts`:
```ts
// Change productUrl from placeholder to live URL:
productUrl: "https://[product].cloudrix.io",
// Change status from "beta" or "coming-soon" to "live":
status: "live",
```
Push to `cloudrix-io/cloudrix-website` → auto-deploys to cloudrix.io.

---

## Product 1: AI Act Compliance Scanner

### Why Build First
EU AI Act full compliance deadline is August 2, 2026 — **2 weeks away**. Companies are panicking. This product has the highest urgency and willingness to pay. The demo on cloudrix.io already works — this is about making it a real standalone SaaS.

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-ai-act-scanner
- **Deploy to:** `scanner.cloudrix.io`
- **Current demo:** https://www.cloudrix.io/ai-tools/compliance-scanner

### What It Does
Describe your AI system → get risk classification (Unacceptable/High/Limited/Minimal) → compliance gap analysis → actionable report with remediation steps → downloadable PDF.

### Architecture
```
User describes AI system (form)
→ Claude API: classify risk level based on EU AI Act criteria
→ Claude API: identify compliance gaps per risk category
→ Claude API: generate remediation steps
→ Render report in dashboard
→ PDF export via React PDF or html-to-pdf
```

### Product-Specific Files
```
cloudrix-ai-act-scanner/src/
├── app/
│   ├── page.tsx                        # Landing: "EU AI Act Deadline Aug 2, 2026"
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx                  # Auth-protected
│   │   ├── page.tsx                    # List of past scans + "New Scan" button
│   │   ├── scan/new/page.tsx           # Multi-step scan form (3 steps)
│   │   ├── scan/[id]/page.tsx          # Scan results detail
│   │   ├── scan/[id]/pdf/page.tsx      # PDF preview before download
│   │   ├── portfolio/page.tsx          # All AI systems overview (Enterprise)
│   │   ├── settings/page.tsx           # Account settings
│   │   └── billing/page.tsx            # Subscription management
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts       # POST: create account
│   │   │   ├── login/route.ts          # POST: JWT login
│   │   │   └── me/route.ts             # GET: current user
│   │   ├── scans/
│   │   │   ├── route.ts               # POST: create new scan, GET: list user's scans
│   │   │   └── [id]/
│   │   │       ├── route.ts           # GET: scan detail
│   │   │       ├── analyze/route.ts   # POST: trigger AI analysis (Claude API)
│   │   │       └── pdf/route.ts       # GET: generate and download PDF
│   │   ├── billing/
│   │   │   ├── checkout/route.ts      # POST: Stripe checkout session
│   │   │   └── portal/route.ts        # POST: Stripe customer portal
│   │   └── webhooks/
│   │       └── stripe/route.ts        # POST: Stripe webhooks
├── lib/
│   ├── mongodb.ts                      # Copy from cloudrix-website
│   ├── auth.ts                         # Copy from cloudrix-website
│   ├── stripe.ts                       # Stripe client
│   ├── email.ts                        # Welcome email, scan complete email
│   ├── ai/
│   │   ├── classifier.ts              # Claude: system description → risk level
│   │   │   # Prompt: "Classify this AI system under EU AI Act Regulation 2024/1689.
│   │   │   #   Analyze: purpose, affected persons, autonomy level, data types.
│   │   │   #   Return: { riskLevel, confidence, reasoning, articles[] }"
│   │   ├── gap-analyzer.ts            # Claude: risk level + system details → compliance gaps
│   │   │   # Prompt: "For a [HIGH_RISK] AI system doing [X], identify compliance gaps:
│   │   │   #   Check: documentation, human oversight, data governance, transparency,
│   │   │   #   accuracy metrics, cybersecurity, conformity assessment.
│   │   │   #   Return: { gaps[{ area, status, finding, severity }] }"
│   │   └── remediator.ts             # Claude: gaps → remediation steps with timeline
│   │       # Prompt: "For each gap, provide: action, responsible party, timeline,
│   │       #   estimated cost, priority (critical/high/medium/low)"
│   ├── pdf/
│   │   └── report-generator.ts        # Generate PDF from scan results
│   ├── models/
│   │   ├── user.ts
│   │   │   # { email, name, company, passwordHash, plan, stripeCustomerId,
│   │   │   #   scansUsed, scanLimit, createdAt }
│   │   └── scan.ts
│   │       # { userId, title, systemDescription, primaryFunction, affectedParties,
│   │       #   humanOversight, biometricData, lawEnforcement,
│   │       #   riskLevel (unacceptable|high|limited|minimal),
│   │       #   confidence, reasoning, articles[],
│   │       #   gaps[{ area, status, finding, severity }],
│   │       #   remediations[{ action, responsible, timeline, cost, priority }],
│   │       #   status (pending|analyzing|completed|failed),
│   │       #   pdfUrl, createdAt, completedAt }
│   └── validation.ts                   # Zod schemas for all inputs
├── middleware.ts                        # Protect /dashboard/*, check JWT cookie
```

### Scan Form Steps (reuse logic from cloudrix-website demo)
```
Step 1: "Describe Your AI System"
  - systemDescription (textarea, required)
  - primaryFunction (select: decision-making, content-generation, customer-service, 
    data-analysis, biometric, critical-infrastructure, education, other)

Step 2: "System Details"  
  - affectedParties (select: internal, b2b, public, vulnerable)
  - humanOversight (select: fully-autonomous, reviews-recommendations, 
    makes-final-decision, info-only)
  - biometricData (checkbox)
  - lawEnforcement (checkbox)

Step 3: "Analysis Results" (AI-generated)
  - Risk classification with color badge
  - Compliance gaps list with severity
  - Remediation steps with timeline
  - Download PDF button
```

### Claude API Calls (3 sequential calls per scan)
```
1. classify() → ~500 tokens input, ~300 tokens output → ~$0.003
2. analyzeGaps() → ~800 tokens input, ~500 tokens output → ~$0.005  
3. generateRemediation() → ~1000 tokens input, ~800 tokens output → ~$0.007
Total per scan: ~$0.015 (well within margins)
```

### Pricing
| Tier | Price | Limits | Stripe Price ID |
|------|-------|--------|-----------------|
| Free | $0/mo | 1 scan total, no PDF | — |
| Pro | $79/mo | Unlimited scans, PDF reports, email alerts | Create in Stripe |
| Enterprise | $299/mo | Portfolio scanning, team access, API, compliance calendar | Create in Stripe |

### Emails to Send (via Resend)
- Welcome email on registration
- Scan complete notification with link to results
- Weekly compliance digest (Enterprise)

### Definition of Done
- [ ] Landing page with EU AI Act urgency messaging
- [ ] Register/login with JWT auth
- [ ] 3-step scan form collects system information
- [ ] Claude API classifies risk level accurately
- [ ] Gap analysis identifies specific compliance issues
- [ ] Remediation steps are actionable with timelines
- [ ] PDF report downloads correctly (professional formatting)
- [ ] Scan history in dashboard
- [ ] Free tier: 1 scan, no PDF (enforced)
- [ ] Pro tier: unlimited scans + PDF (Stripe checkout works)
- [ ] Mobile-responsive
- [ ] Deployed to scanner.cloudrix.io
- [ ] Product URL updated on cloudrix.io

---

## Product 2: CodeScan AI

### Why Build Second
Every development team needs code review. The demo already works. Simple architecture: paste code → LLM analyzes → show results. High volume, low churn.

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-codescan
- **Deploy to:** `codescan.cloudrix.io`
- **Current demo:** https://www.cloudrix.io/products/ai-code-reviewer/demo

### Architecture
```
User pastes code (or connects GitHub repo)
→ Language detection
→ Claude API: analyze for security, performance, architecture, best practices
→ Score 0-100 per category
→ Overall grade (A-F)
→ Detailed findings with fix suggestions
```

### Product-Specific Files
```
cloudrix-codescan/src/
├── app/
│   ├── page.tsx                        # Landing + quick scan (no login needed)
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Scan history + stats
│   │   ├── scan/page.tsx              # Full scan interface
│   │   ├── scan/[id]/page.tsx         # Scan results detail
│   │   ├── repos/page.tsx             # Connected GitHub repos
│   │   ├── repos/[id]/page.tsx        # Repo scan history
│   │   ├── settings/page.tsx
│   │   └── billing/page.tsx
│   ├── api/
│   │   ├── auth/ (standard)
│   │   ├── scan/
│   │   │   ├── route.ts               # POST: submit code for scanning
│   │   │   └── [id]/route.ts          # GET: scan results
│   │   ├── scan/quick/route.ts        # POST: anonymous quick scan (no auth, rate-limited)
│   │   ├── repos/
│   │   │   ├── route.ts              # Connect GitHub repo
│   │   │   └── [id]/scan/route.ts    # Trigger repo scan
│   │   ├── billing/ (standard)
│   │   └── webhooks/
│   │       ├── stripe/route.ts
│   │       └── github/route.ts        # PR webhook → auto-scan
├── lib/
│   ├── ai/
│   │   ├── analyzer.ts               # Claude: code → { security[], performance[], 
│   │   │                              #   architecture[], bestPractices[], score, grade }
│   │   ├── prompts.ts                # Prompts per language/framework
│   │   └── scorer.ts                 # Calculate overall score from categories
│   ├── github/
│   │   ├── oauth.ts                  # GitHub OAuth flow
│   │   ├── api.ts                    # Fetch PR files, repo contents
│   │   └── webhook.ts               # Handle PR opened → trigger scan
│   ├── models/
│   │   ├── user.ts
│   │   ├── scan.ts                   # { userId, code, language, score, grade, findings[], createdAt }
│   │   └── repo.ts                   # { userId, githubUrl, webhookId, lastScan }
```

### Claude API Prompt
```
System: You are a senior code reviewer. Analyze this code for:
1. Security vulnerabilities (OWASP Top 10, injection, XSS, auth issues)
2. Performance (O(n²), memory leaks, unnecessary re-renders, N+1 queries)
3. Architecture (SOLID violations, coupling, missing abstractions)
4. Best practices (error handling, typing, naming, documentation)

Return JSON: {
  security: { score: 0-100, findings: [{ severity, title, line, description, fix }] },
  performance: { score: 0-100, findings: [...] },
  architecture: { score: 0-100, findings: [...] },
  bestPractices: { score: 0-100, findings: [...] },
  overallScore: 0-100,
  grade: "A" | "B" | "C" | "D" | "F",
  summary: "2-sentence summary"
}
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 5 scans/day, paste only, no history |
| Pro | $29/mo | Unlimited scans, GitHub integration, history, team |
| Team | $79/mo | 5 seats, PR auto-scanning, API access |
| Enterprise | Custom | Unlimited seats, on-premise, SLA |

### Definition of Done
- [ ] Quick scan: paste code → instant results (no login needed)
- [ ] Full scan: login → paste or connect GitHub → detailed report
- [ ] Score 0-100 per category + overall grade A-F
- [ ] Findings with severity, line numbers, fix suggestions
- [ ] Scan history in dashboard
- [ ] GitHub OAuth + repo connection
- [ ] PR webhook → auto-scan on PR opened
- [ ] Free tier: 5 scans/day (rate-limited by IP)
- [ ] Stripe checkout for Pro/Team
- [ ] Deployed to codescan.cloudrix.io

---

## Product 3: API Monitor

### Why Build Third
Simple backend (cron job pings URLs), proven market, high retention (once set up, never leave). Low AI cost (no LLM calls needed).

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-api-monitor
- **Deploy to:** `monitor.cloudrix.io`

### Architecture
```
User adds endpoints → Cron job (every 30s-5min) pings each endpoint
→ Log response: status code, latency, headers, body hash
→ If status != expected → trigger alert (email, Slack, webhook)
→ Dashboard shows uptime %, latency charts, incident history
```

### Product-Specific Files
```
cloudrix-api-monitor/src/
├── app/
│   ├── page.tsx                        # Landing page
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Overview: all monitors status
│   │   ├── monitors/
│   │   │   ├── page.tsx               # List monitors
│   │   │   ├── new/page.tsx           # Add new monitor
│   │   │   └── [id]/page.tsx          # Monitor detail: chart, logs, incidents
│   │   ├── incidents/page.tsx          # Incident history
│   │   ├── alerts/page.tsx            # Alert configuration
│   │   ├── status-pages/page.tsx      # Public status page config
│   │   ├── settings/page.tsx
│   │   └── billing/page.tsx
│   ├── api/
│   │   ├── auth/ (standard)
│   │   ├── monitors/
│   │   │   ├── route.ts               # CRUD monitors
│   │   │   └── [id]/
│   │   │       ├── route.ts           # GET/PUT/DELETE monitor
│   │   │       ├── checks/route.ts    # GET: check history (paginated)
│   │   │       └── test/route.ts      # POST: run a single check now
│   │   ├── incidents/route.ts         # GET: incidents
│   │   ├── alerts/route.ts            # CRUD alert channels
│   │   ├── cron/check/route.ts        # POST: triggered by Vercel Cron — runs all checks
│   │   ├── billing/ (standard)
│   │   └── webhooks/stripe/route.ts
│   ├── status/[slug]/page.tsx          # Public status page (custom subdomain)
├── lib/
│   ├── checker/
│   │   ├── http.ts                    # HTTP check: GET/POST endpoint, measure latency
│   │   ├── ssl.ts                     # SSL certificate check: expiry, grade
│   │   └── dns.ts                     # DNS resolution check
│   ├── alerting/
│   │   ├── email.ts                   # Send alert via Resend
│   │   ├── slack.ts                   # Send alert via Slack webhook
│   │   └── webhook.ts                # Send alert via custom webhook
│   ├── models/
│   │   ├── user.ts
│   │   ├── monitor.ts                # { userId, name, url, method, headers, expectedStatus,
│   │   │                              #   interval (30s|1m|5m), regions[], isActive }
│   │   ├── check.ts                  # { monitorId, status, statusCode, latency, region, 
│   │   │                              #   headers, error, checkedAt }
│   │   ├── incident.ts               # { monitorId, type (down|degraded|ssl), startedAt,
│   │   │                              #   resolvedAt, duration, checks[] }
│   │   └── alert-channel.ts          # { userId, type (email|slack|webhook), config }
```

### Cron Job (Vercel Cron)
```
// vercel.json
{
  "crons": [
    { "path": "/api/cron/check", "schedule": "* * * * *" }  // Every minute
  ]
}

// The cron endpoint fetches all active monitors due for a check,
// runs HTTP checks in parallel, logs results, triggers alerts if needed.
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 5 monitors, 5-min interval, email alerts only |
| Pro | $29/mo | 50 monitors, 1-min interval, Slack + webhook |
| Business | $79/mo | 200 monitors, 30s interval, multi-region, status page |
| Enterprise | Custom | Unlimited, API, SSO, SLA |

### Definition of Done
- [ ] Add monitor: URL, method, expected status, check interval
- [ ] Cron job checks all monitors on schedule
- [ ] Dashboard shows: uptime %, response time chart, current status
- [ ] Alert sent within 60s of downtime (email at minimum)
- [ ] Slack webhook alerts
- [ ] Incident auto-created on downtime, auto-resolved on recovery
- [ ] Public status page per user
- [ ] SSL certificate expiry monitoring
- [ ] Free tier: 5 monitors enforced
- [ ] Stripe checkout
- [ ] Deployed to monitor.cloudrix.io

---

## Product 4: StatusPage

### Why Build Fourth
Pairs perfectly with API Monitor (cross-sell). Simple CRUD + public page. Very sticky product.

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-statuspage
- **Deploy to:** `status.cloudrix.io`

### Architecture
```
User creates components (API, Web App, Database, etc.)
→ Sets status per component (Operational, Degraded, Down, Maintenance)
→ Creates incidents with timeline updates
→ Public page renders real-time status
→ Subscribers get email/SMS on incidents
```

### Product-Specific Files
```
cloudrix-statuspage/src/
├── app/
│   ├── page.tsx                        # Landing page
│   ├── (auth)/login + register
│   ├── dashboard/
│   │   ├── page.tsx                    # Status overview
│   │   ├── components/page.tsx        # Manage services/components
│   │   ├── incidents/
│   │   │   ├── page.tsx               # Incident list
│   │   │   ├── new/page.tsx           # Create incident
│   │   │   └── [id]/page.tsx          # Update incident timeline
│   │   ├── maintenance/page.tsx       # Scheduled maintenance
│   │   ├── subscribers/page.tsx       # Manage subscribers
│   │   ├── customize/page.tsx         # Branding: logo, colors, domain
│   │   ├── settings/page.tsx
│   │   └── billing/page.tsx
│   ├── api/
│   │   ├── auth/ (standard)
│   │   ├── components/route.ts        # CRUD service components
│   │   ├── incidents/route.ts         # CRUD incidents
│   │   ├── incidents/[id]/updates/route.ts  # Add timeline update
│   │   ├── maintenance/route.ts       # CRUD scheduled maintenance
│   │   ├── subscribers/route.ts       # Subscribe/unsubscribe
│   │   ├── public/[slug]/route.ts     # GET: public status data (no auth)
│   │   ├── billing/ (standard)
│   │   └── webhooks/stripe/route.ts
│   ├── [slug]/page.tsx                 # Public status page (dynamic per org)
├── lib/
│   ├── models/
│   │   ├── user.ts
│   │   ├── organization.ts           # { userId, name, slug, logo, brandColor, customDomain }
│   │   ├── component.ts              # { orgId, name, description, status, order }
│   │   │                              #   status: operational | degraded | partial-outage | major-outage | maintenance
│   │   ├── incident.ts               # { orgId, title, status (investigating|identified|monitoring|resolved),
│   │   │                              #   severity (minor|major|critical), components[], 
│   │   │                              #   updates[{ status, body, createdAt }], createdAt, resolvedAt }
│   │   ├── maintenance.ts            # { orgId, title, components[], scheduledStart, scheduledEnd, status }
│   │   └── subscriber.ts             # { orgId, email, phone, confirmedAt }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 1 page, 5 components, Cloudrix branding |
| Pro | $29/mo | Custom domain, 20 components, remove branding, email subscribers |
| Business | $79/mo | Multiple pages, SMS alerts, API, 100 components |
| Enterprise | Custom | SSO, SLA, unlimited, white-label |

### Definition of Done
- [ ] Create status page with custom branding (logo, colors)
- [ ] Add components with drag-and-drop ordering
- [ ] Update component status (operational → degraded → outage)
- [ ] Create incidents with timeline updates
- [ ] Public page renders beautifully (real-time)
- [ ] Subscriber email notifications on incidents
- [ ] 90-day uptime history graph
- [ ] Scheduled maintenance windows
- [ ] Free tier: 1 page, Cloudrix branding
- [ ] Custom domain support (Pro+)
- [ ] Stripe checkout
- [ ] Deployed to status.cloudrix.io

---

## Testing Checklist (Run for EVERY product before going live)

### Functional
- [ ] Register → login → dashboard works
- [ ] Core feature works end-to-end
- [ ] Free tier limits enforced correctly
- [ ] Paid tier upgrade flow works (Stripe checkout → access granted)
- [ ] PDF/export features work
- [ ] Email notifications sent
- [ ] Error states handled gracefully
- [ ] 404 page works

### Security
- [ ] No exposed API keys in client code
- [ ] Auth required on all /dashboard/* and protected API routes
- [ ] Input validation on all endpoints (Zod)
- [ ] Rate limiting on public endpoints
- [ ] CORS configured correctly
- [ ] Honeypot or rate limit on registration

### Performance
- [ ] Page load < 2 seconds
- [ ] API response < 500ms (excluding LLM calls)
- [ ] No memory leaks in long-running processes
- [ ] Images optimized

### SEO
- [ ] Title and meta description on every page
- [ ] OG image configured
- [ ] Canonical URLs set
- [ ] robots.txt blocks /api/ and /dashboard/
- [ ] Sitemap includes public pages

### Mobile
- [ ] All pages responsive on mobile (320px+)
- [ ] Touch targets ≥ 44px
- [ ] No horizontal scroll

### After Deploy
- [ ] Verify production URL loads
- [ ] Verify Stripe webhook works in production
- [ ] Update product URL in cloudrix-website/src/data/products.ts
- [ ] Push update to cloudrix-io/cloudrix-website
- [ ] Verify product page on cloudrix.io links to live product
