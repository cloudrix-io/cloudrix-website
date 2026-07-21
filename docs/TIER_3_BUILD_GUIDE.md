# Tier 3 Build Guide — Month 2, Big Payoff

> **Products:** SecureScan, PerfProfiler, SmartCRM, DocSmith AI
> **Timeline:** Month 2
> **Expected MRR:** €4K-€15K combined

---

## Access & Infrastructure

Same as Tier 2 — see [TIER_2_BUILD_GUIDE.md](./TIER_2_BUILD_GUIDE.md) for full access details (GitHub, Vercel, env vars, shared services).

---

## Standard Project Structure (Use for ALL products)

```
src/
├── app/
│   ├── page.tsx                    # Landing page (public)
│   ├── layout.tsx                  # Root layout with metadata
│   ├── globals.css                 # Tailwind + custom styles
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login page
│   │   ├── register/page.tsx       # Register page
│   │   └── forgot-password/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx              # Protected layout (auth check)
│   │   ├── page.tsx                # Dashboard home
│   │   ├── settings/page.tsx       # Account settings
│   │   └── billing/page.tsx        # Subscription management
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts   # POST - create account
│   │   │   ├── login/route.ts      # POST - JWT login
│   │   │   └── me/route.ts         # GET - current user
│   │   ├── billing/
│   │   │   ├── checkout/route.ts   # POST - create Stripe session
│   │   │   └── portal/route.ts     # POST - Stripe customer portal
│   │   └── webhooks/
│   │       └── stripe/route.ts     # POST - Stripe webhooks
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── header.tsx              # Navigation
│   │   └── footer.tsx              # Footer
│   ├── ui/                         # Reusable UI components
│   └── forms/                      # Form components
├── lib/
│   ├── mongodb.ts                  # DB connection
│   ├── auth.ts                     # JWT utilities
│   ├── stripe.ts                   # Stripe client
│   ├── email.ts                    # Resend email
│   ├── validation.ts               # Zod schemas
│   └── models/
│       ├── user.ts                 # User schema
│       └── [product-specific].ts   # Product-specific models
├── types/
│   └── index.ts                    # TypeScript interfaces
└── middleware.ts                    # Auth middleware for protected routes
```

### Standard Dependencies (package.json)
```json
{
  "dependencies": {
    "next": "16.1.2",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "mongoose": "^9.1.3",
    "jose": "^6.1.3",
    "resend": "^6.7.0",
    "stripe": "^18.0.0",
    "@stripe/stripe-js": "^5.0.0",
    "zod": "^4.3.5",
    "bcryptjs": "^3.0.3",
    "lucide-react": "^0.562.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0"
  }
}
```

### Standard Auth Pattern (copy to every product)
```
middleware.ts → checks JWT cookie on /dashboard/* routes
lib/auth.ts → createToken(), verifyToken(), getCurrentUser()
api/auth/register → hash password, create user, return JWT
api/auth/login → verify password, return JWT
api/auth/me → return current user from JWT
```

### Standard Stripe Pattern (copy to every product)
```
api/billing/checkout → create Stripe checkout session based on plan
api/billing/portal → create Stripe customer portal session
api/webhooks/stripe → handle checkout.completed, subscription.updated/deleted
lib/stripe.ts → Stripe client init, plan mapping
```

---

## Product 9: SecureScan

### Repo
- **URL:** https://github.com/cloudrix-io/cloudrix-securescan
- **Deploy to:** `scan.cloudrix.io`

### What It Does
Enter a URL → automated security scan checks OWASP Top 10, headers, SSL, exposed secrets, outdated dependencies. Returns prioritized report with fix instructions.

### Architecture
```
User enters URL → Backend creates scan job → Worker runs checks in parallel:
  1. HTTP header analysis (CSP, HSTS, X-Frame-Options, etc.)
  2. SSL certificate check (expiry, grade, chain)
  3. OWASP checks (XSS reflection, open redirect, CORS, etc.)
  4. Technology detection (Wappalyzer-style)
  5. Exposed files check (.env, .git, wp-admin, etc.)
→ Aggregate results → Score (A-F) → Generate report
```

### Product-Specific Files
```
src/app/dashboard/
├── page.tsx                        # List of past scans
├── scan/[id]/page.tsx              # Scan results detail
└── new/page.tsx                    # Start new scan
src/app/api/
├── scans/route.ts                  # POST: start scan, GET: list scans
├── scans/[id]/route.ts             # GET: scan results
└── scans/[id]/pdf/route.ts         # GET: download PDF report
src/lib/
├── scanner/
│   ├── headers.ts                  # HTTP header checks
│   ├── ssl.ts                      # SSL certificate analysis
│   ├── owasp.ts                    # OWASP Top 10 checks
│   ├── exposed-files.ts            # Check for .env, .git, etc.
│   ├── technology.ts               # Detect tech stack
│   └── scorer.ts                   # Calculate overall score A-F
├── models/
│   ├── user.ts
│   └── scan.ts                     # { userId, url, status, results, score, createdAt }
```

### Database Schema
```
Users: { email, name, passwordHash, plan, stripeCustomerId, scansThisWeek }
Scans: { userId, url, status (pending|running|completed|failed), score (A-F), 
         findings[{ category, severity (critical|high|medium|low|info), title, description, fix }],
         headers{}, ssl{}, technologies[], createdAt, completedAt }
```

### Scan Checks (implement each as a function)
```
Headers: Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, 
         X-Content-Type-Options, Referrer-Policy, Permissions-Policy
SSL: Certificate valid, expiry date, TLS version, grade
OWASP: Open redirect, CORS misconfiguration, clickjacking, missing security headers
Exposed: /.env, /.git, /wp-admin, /phpinfo.php, /.DS_Store, /server-status
Tech: Server header, X-Powered-By, meta generator, known JS library fingerprints
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 1 scan/week, basic checks only |
| Pro | $59/mo | Daily scans, all checks, PDF reports, 10 sites |
| Enterprise | $199/mo | Continuous scanning, API access, team, unlimited sites |

### Definition of Done
- [ ] User enters URL → scan runs in <30 seconds
- [ ] Results show categorized findings with severity
- [ ] Overall score (A-F) with explanation
- [ ] Fix instructions for each finding
- [ ] PDF report export
- [ ] Free tier: 1 scan/week enforced
- [ ] Stripe checkout for Pro/Enterprise
- [ ] Scan history in dashboard
- [ ] Deployed to scan.cloudrix.io

---

## Product 10: PerfProfiler

### Repo
- **URL:** https://github.com/cloudrix-io/cloudrix-perfprofiler
- **Deploy to:** `perf.cloudrix.io`

### What It Does
Add a script tag to your site → collects real Core Web Vitals from actual users → dashboard shows LCP, FID, CLS, INP with optimization recommendations.

### Architecture
```
1. User adds <script src="perf.cloudrix.io/collect.js"> to their site
2. Script collects Web Vitals from real visitors using web-vitals library
3. Sends beacon to POST /api/collect with metrics + page URL + device info
4. Backend stores metrics in DB
5. Dashboard shows charts, trends, slow pages, recommendations
```

### Product-Specific Files
```
src/app/dashboard/
├── page.tsx                        # Overview: CWV scores, trends
├── pages/page.tsx                  # Per-page breakdown
├── pages/[path]/page.tsx           # Individual page detail
└── recommendations/page.tsx        # AI-generated optimization tips
src/app/api/
├── collect/route.ts                # POST: receive metrics (public, no auth, CORS enabled)
├── sites/route.ts                  # CRUD for monitored sites
├── sites/[id]/metrics/route.ts     # GET: metrics for a site
└── sites/[id]/recommendations/route.ts  # GET: AI optimization suggestions
public/
├── collect.js                      # The lightweight script users embed (~2KB)
src/lib/
├── models/
│   ├── user.ts
│   ├── site.ts                     # { userId, domain, scriptInstalled }
│   └── metric.ts                   # { siteId, page, lcp, fid, cls, inp, device, country, timestamp }
```

### The collect.js Script (critical — must be tiny)
```js
// ~2KB minified. Uses web-vitals library pattern.
// Collects: LCP, FID, CLS, INP, TTFB
// Sends: POST beacon to perf.cloudrix.io/api/collect
// Includes: page URL, viewport, connection type, device type
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 1 site, 1K pageviews/mo, 7-day retention |
| Pro | $39/mo | 5 sites, 100K pageviews/mo, 90-day retention |
| Business | $99/mo | 20 sites, 1M pageviews/mo, 1-year retention, API |
| Enterprise | Custom | Unlimited, raw data export, SLA |

### Definition of Done
- [ ] collect.js script works on any website (<2KB)
- [ ] Metrics stored and displayed in dashboard
- [ ] Core Web Vitals breakdown (LCP, FID, CLS, INP)
- [ ] Per-page analysis with trends
- [ ] Device/country breakdown
- [ ] Optimization recommendations
- [ ] Free tier limits enforced
- [ ] Stripe checkout
- [ ] Deployed to perf.cloudrix.io

---

## Product 11: SmartCRM

### Repo
- **URL:** https://github.com/cloudrix-io/cloudrix-crm
- **Deploy to:** `crm.cloudrix.io`

### What It Does
CRM with AI-powered lead scoring, email drafting, deal prediction. Pipeline view with drag-and-drop. AI analyzes engagement signals to prioritize deals.

### Architecture
```
Standard CRUD CRM + AI layer:
- Contacts/Companies/Deals = standard CRUD
- AI Lead Scoring = Claude API analyzes deal data → returns score 0-100
- AI Email Draft = Claude API generates follow-up based on deal context
- Deal Prediction = Simple scoring model based on stage, age, engagement
```

### Product-Specific Files
```
src/app/dashboard/
├── page.tsx                        # Pipeline overview (Kanban board)
├── contacts/
│   ├── page.tsx                    # Contact list
│   └── [id]/page.tsx               # Contact detail
├── companies/
│   ├── page.tsx                    # Company list
│   └── [id]/page.tsx               # Company detail
├── deals/
│   ├── page.tsx                    # Deal pipeline (Kanban)
│   └── [id]/page.tsx               # Deal detail with AI insights
├── ai/
│   ├── lead-scoring/page.tsx       # AI scoring dashboard
│   └── email-draft/page.tsx        # AI email generator
└── reports/page.tsx                # Revenue reports, forecasting
src/app/api/
├── contacts/route.ts               # CRUD
├── companies/route.ts              # CRUD
├── deals/route.ts                  # CRUD + pipeline stage updates
├── deals/[id]/score/route.ts       # POST: AI lead scoring
├── deals/[id]/email/route.ts       # POST: AI email draft
└── reports/route.ts                # GET: analytics data
src/lib/models/
├── user.ts
├── contact.ts                      # { name, email, phone, company, tags, notes }
├── company.ts                      # { name, domain, industry, size, contacts[] }
├── deal.ts                         # { title, value, stage, probability, contact, company, activities[] }
└── activity.ts                     # { dealId, type (email|call|meeting|note), content, date }
```

### Pipeline Stages
```
Lead → Qualified → Proposal → Negotiation → Won / Lost
```

### AI Features
1. **Lead Score** — Claude analyzes: deal value, company size, engagement frequency, stage velocity → returns 0-100 score
2. **Email Draft** — Claude generates follow-up email based on: deal context, last activity, stage, contact info
3. **Deal Prediction** — Simple algorithm: score = f(stage_weight, days_in_stage, total_activities, deal_value)

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Starter | $29/seat/mo | 500 contacts, 3 pipelines, basic AI |
| Pro | $59/seat/mo | 10K contacts, unlimited pipelines, full AI |
| Enterprise | Custom | Unlimited, SSO, API, custom fields |

### Definition of Done
- [ ] Kanban pipeline with drag-and-drop
- [ ] Contact/Company/Deal CRUD
- [ ] AI lead scoring (Claude API)
- [ ] AI email draft generation
- [ ] Activity timeline per deal
- [ ] Basic reports (pipeline value, win rate)
- [ ] Multi-seat support (team invites)
- [ ] Stripe per-seat billing
- [ ] Deployed to crm.cloudrix.io

---

## Product 12: DocSmith AI

### Repo
- **URL:** https://github.com/cloudrix-io/cloudrix-docsmith
- **Deploy to:** `docsmith.cloudrix.io`

### What It Does
Connect a GitHub repo → AI reads the codebase → generates comprehensive API documentation. Supports REST, GraphQL, gRPC. Hosted docs with custom branding.

### Architecture
```
1. User connects GitHub repo (OAuth or personal access token)
2. System clones repo, scans for route files / API definitions
3. Claude API analyzes each endpoint: method, params, response, description
4. Generates structured documentation in MDX format
5. Renders as a hosted docs site with search, versioning, theme
```

### Product-Specific Files
```
src/app/dashboard/
├── page.tsx                        # List of connected repos
├── repos/[id]/page.tsx             # Repo documentation overview
├── repos/[id]/generate/page.tsx    # Trigger generation / view progress
└── repos/[id]/settings/page.tsx    # Theme, domain, branding
src/app/docs/[slug]/               # Public hosted docs for each repo
├── page.tsx                        # Doc landing page
└── [section]/page.tsx              # Doc sections (endpoints, models, auth)
src/app/api/
├── repos/route.ts                  # Connect/list repos
├── repos/[id]/generate/route.ts    # POST: trigger doc generation
├── repos/[id]/docs/route.ts        # GET: generated docs data
└── github/callback/route.ts        # GitHub OAuth callback
src/lib/
├── github.ts                       # GitHub API: clone, read files, list routes
├── parser.ts                       # Parse route files (Express, NestJS, FastAPI, etc.)
├── generator.ts                    # Claude API: analyze routes → generate docs
├── models/
│   ├── user.ts
│   ├── repo.ts                     # { userId, githubUrl, branch, lastGenerated }
│   └── doc.ts                      # { repoId, sections[], version, publishedUrl }
```

### Supported Frameworks (detect and parse)
```
Express.js — scan for app.get(), app.post(), router.*
NestJS — scan for @Controller, @Get, @Post decorators
FastAPI — scan for @app.get, @app.post
Next.js API Routes — scan for route.ts files in app/api/
Django REST — scan for viewsets, serializers
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 1 repo, manual generation only |
| Pro | $49/mo | 5 repos, auto-regeneration on push, custom domain |
| Team | $129/mo | Unlimited repos, team access, versioning, API |
| Enterprise | Custom | SSO, on-premise, SLA |

### Definition of Done
- [ ] Connect GitHub repo (personal access token at minimum)
- [ ] Scan and detect API routes
- [ ] Claude generates documentation per endpoint
- [ ] Hosted docs page with search
- [ ] Custom branding (logo, colors)
- [ ] PDF export
- [ ] Free tier: 1 repo
- [ ] Stripe checkout
- [ ] Deployed to docsmith.cloudrix.io
