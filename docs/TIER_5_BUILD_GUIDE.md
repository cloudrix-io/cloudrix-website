# Tier 5 Build Guide — Build When Demand Proves It

> **Products:** CloudCost AI, InvoiceAI, DBMigrate, SaaS Starter Kit
> **Timeline:** Build only when customer demand is validated
> **Organization:** https://github.com/cloudrix-io

---

## Access & Infrastructure

Same as all tiers — see [TIER_2_BUILD_GUIDE.md](./TIER_2_BUILD_GUIDE.md) for full details.

| Resource | URL |
|----------|-----|
| **GitHub Org** | https://github.com/cloudrix-io |
| **Vercel Team** | https://vercel.com/firas-projects-f79a263c |
| **Standard Stack** | Next.js 16, TypeScript, Tailwind CSS 4, MongoDB, JWT, Resend, Stripe |
| **Standard Structure** | See Tier 2 guide for file structure template |

### Deployment (same for all)
1. Clone from `cloudrix-io/[REPO]`
2. `npm install` → `npm run build` → test locally
3. Vercel → Add Project → Import from org → Add env vars → Deploy
4. Add subdomain in Vercel → Domains
5. Update `cloudrix-website/src/data/products.ts` → `productUrl`

---

## Product 21: CloudCost AI

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-cloudcost
- **Deploy to:** `cloudcost.cloudrix.io`

### What It Does
Connect AWS/GCP/Azure billing → AI analyzes spending → identifies waste, recommends right-sizing, projects savings. Typically finds 25-40% savings.

### Why Wait
Requires cloud provider billing API access (AWS Cost Explorer API, GCP Billing API). Needs real customer billing data to be useful. Build only when you have 5+ enterprise leads requesting this.

### Product-Specific Files
```
cloudrix-cloudcost/src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Cost overview: total spend, trend, savings found
│   │   ├── accounts/page.tsx          # Connected cloud accounts
│   │   ├── accounts/[id]/page.tsx     # Account detail: services breakdown
│   │   ├── recommendations/page.tsx   # AI savings recommendations
│   │   ├── reports/page.tsx           # Monthly cost reports
│   │   └── alerts/page.tsx            # Cost anomaly alerts
│   ├── api/
│   │   ├── accounts/route.ts          # Connect cloud account (IAM role ARN for AWS)
│   │   ├── accounts/[id]/costs/route.ts  # GET: fetch billing data from provider
│   │   ├── accounts/[id]/analyze/route.ts  # POST: trigger AI analysis
│   │   ├── recommendations/route.ts   # GET: savings recommendations
│   │   └── alerts/route.ts           # CRUD cost alerts
├── lib/
│   ├── providers/
│   │   ├── aws.ts                    # AWS Cost Explorer API + pricing API
│   │   ├── gcp.ts                    # GCP Cloud Billing API
│   │   └── azure.ts                  # Azure Cost Management API
│   ├── ai/
│   │   ├── analyzer.ts              # Claude: analyze spending patterns → recommendations
│   │   ├── rightsizer.ts            # Identify over-provisioned resources
│   │   └── forecaster.ts           # Project future costs based on trends
│   ├── models/
│   │   ├── account.ts               # { userId, provider, credentials (encrypted), lastSync }
│   │   ├── cost-data.ts             # { accountId, service, resource, cost, usage, date }
│   │   ├── recommendation.ts        # { accountId, type, currentCost, projectedSavings, action, priority }
│   │   └── alert.ts                # { accountId, type (anomaly|budget|threshold), config, triggered }
```

### Third-Party APIs Required
- **AWS Cost Explorer API** — $0.01 per request. Need IAM role with `ce:GetCostAndUsage` permission.
- **GCP Cloud Billing API** — Free. Need billing account viewer role.
- **Azure Cost Management API** — Free. Need Cost Management Reader role.

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 1 account, monthly summary only |
| Pro | $99/mo | 3 accounts, daily analysis, recommendations, alerts |
| Enterprise | $299/mo | Unlimited accounts, FinOps reports, team, API, SLA |

### Definition of Done
- [ ] Connect AWS account via IAM role (read-only billing)
- [ ] Fetch and display cost data by service/resource
- [ ] AI identifies top 10 savings opportunities
- [ ] Right-sizing recommendations (compute, storage)
- [ ] Reserved instance / savings plan suggestions
- [ ] Cost anomaly alerting (email/Slack)
- [ ] Monthly PDF report
- [ ] Stripe checkout
- [ ] Deployed to cloudcost.cloudrix.io

---

## Product 22: InvoiceAI

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-invoiceai
- **Deploy to:** `invoice.cloudrix.io`

### What It Does
Upload invoices (any format) → AI extracts line items, amounts, dates, vendor info → matches to POs → categorizes expenses → flags anomalies.

### Why Wait
Requires OCR integration (Tesseract or cloud vision API), accounting system integrations (QuickBooks, Xero). Complex data extraction. Build when you have 10+ SMB leads in the pipeline.

### Product-Specific Files
```
cloudrix-invoiceai/src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Invoice queue: pending, processed, flagged
│   │   ├── invoices/[id]/page.tsx     # Invoice detail: extracted data, matches
│   │   ├── upload/page.tsx            # Drag-and-drop upload
│   │   ├── vendors/page.tsx           # Vendor management
│   │   ├── reports/page.tsx           # Expense reports by category/vendor/period
│   │   └── settings/page.tsx          # GL codes, categories, approval rules
│   ├── api/
│   │   ├── invoices/route.ts          # POST: upload + process, GET: list
│   │   ├── invoices/[id]/route.ts     # GET: detail, PUT: correct extraction
│   │   ├── invoices/[id]/approve/route.ts  # POST: approve invoice
│   │   ├── invoices/[id]/export/route.ts   # POST: export to accounting system
│   │   └── vendors/route.ts          # CRUD vendors
├── lib/
│   ├── ocr/
│   │   ├── extractor.ts             # Tesseract or Google Vision: image/PDF → text
│   │   └── parser.ts                # Claude: raw text → structured invoice data (JSON)
│   ├── ai/
│   │   ├── categorizer.ts           # Auto-categorize line items to GL codes
│   │   ├── matcher.ts               # Match invoice to purchase orders
│   │   └── anomaly.ts               # Flag duplicates, unusual amounts, missing approvals
│   ├── integrations/
│   │   ├── quickbooks.ts            # Export to QuickBooks
│   │   └── xero.ts                  # Export to Xero
│   ├── models/
│   │   ├── invoice.ts               # { userId, vendor, date, total, lineItems[], status, extractedData }
│   │   ├── vendor.ts                # { name, taxId, defaultCategory, paymentTerms }
│   │   ├── purchase-order.ts        # { poNumber, vendor, items[], total, status }
│   │   └── gl-code.ts              # { code, name, category, description }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Starter | $29/mo | 100 invoices/mo, manual export |
| Pro | $79/mo | 1K invoices/mo, auto-export to QuickBooks/Xero |
| Enterprise | Custom | Unlimited, PO matching, approval workflows, API |

### Definition of Done
- [ ] Upload PDF/image invoice → text extracted via OCR
- [ ] AI parses: vendor, date, total, line items, tax
- [ ] Auto-categorization to expense categories
- [ ] Duplicate detection
- [ ] Approval workflow (submit → approve → export)
- [ ] Export to QuickBooks or Xero
- [ ] Stripe checkout
- [ ] Deployed to invoice.cloudrix.io

---

## Product 23: DBMigrate (Open Source)

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-dbmigrate
- **Deploy to:** npm registry (CLI tool) + `dbmigrate.cloudrix.io` (docs/dashboard)

### What It Does
CLI + web dashboard for zero-downtime database schema changes. Generates migration scripts, simulates on shadow DB, executes with expand-and-contract pattern.

### Why Wait
Niche developer tool. Build when you have GitHub star traction or enterprise requests.

### Product-Specific Files
```
cloudrix-dbmigrate/
├── packages/
│   ├── cli/                          # npm package: @cloudrix/dbmigrate
│   │   ├── src/
│   │   │   ├── index.ts             # CLI entry point
│   │   │   ├── commands/
│   │   │   │   ├── init.ts          # Initialize migration config
│   │   │   │   ├── generate.ts      # Generate migration from schema diff
│   │   │   │   ├── simulate.ts      # Run on shadow DB
│   │   │   │   ├── migrate.ts       # Execute migration
│   │   │   │   └── rollback.ts      # Rollback last migration
│   │   │   ├── drivers/
│   │   │   │   ├── postgres.ts      # PostgreSQL driver
│   │   │   │   ├── mysql.ts         # MySQL driver
│   │   │   │   └── mongodb.ts       # MongoDB driver
│   │   │   └── strategies/
│   │   │       ├── expand-contract.ts  # Zero-downtime pattern
│   │   │       └── blue-green.ts      # Blue-green migration
│   │   └── package.json
│   └── dashboard/                    # Next.js web UI
│       ├── src/app/
│       │   ├── page.tsx             # Migration history
│       │   ├── migrations/[id]/page.tsx  # Migration detail + diff view
│       │   └── api/migrations/route.ts
```

### Pricing
| Tier | Price |
|------|-------|
| Open Source | Free forever (CLI) |
| Pro Cloud | $49/mo (hosted dashboard, team, scheduled migrations) |
| Enterprise | $199/mo (audit logs, SSO, priority support) |

---

## Product 24: SaaS Starter Kit (Open Source)

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-saas-starter
- **Deploy to:** `demo.cloudrix.io` (live demo) — already deployed

### What It Does
Production-ready SaaS boilerplate: NestJS + Angular, authentication (OAuth, magic links, 2FA), Stripe subscriptions, multi-tenancy, RBAC, email, Docker, Terraform.

### Why It's Tier 5
Already exists as a demo. Maintain and update, don't rebuild. Revenue comes from Pro Support and Enterprise License, not from building new features.

### Product-Specific Files (already exist)
```
cloudrix-saas-starter/
├── apps/
│   ├── api/                         # NestJS backend
│   │   ├── src/
│   │   │   ├── auth/               # JWT, OAuth, magic links, 2FA
│   │   │   ├── billing/            # Stripe subscriptions, usage metering
│   │   │   ├── tenants/            # Multi-tenant data isolation
│   │   │   ├── users/              # User CRUD, roles, invitations
│   │   │   └── email/              # Email templates, Resend
│   │   └── Dockerfile
│   └── web/                         # Angular frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── auth/           # Login, register, forgot password
│       │   │   ├── dashboard/      # Tenant dashboard
│       │   │   ├── settings/       # Account, billing, team
│       │   │   └── admin/          # Super-admin panel
│       └── Dockerfile
├── infrastructure/
│   ├── terraform/                   # AWS ECS, RDS, ElastiCache
│   ├── docker-compose.yml           # Local development
│   └── github-actions/              # CI/CD workflows
├── docs/                            # Setup and customization guide
└── README.md
```

### Pricing
| Tier | Price |
|------|-------|
| Open Source | Free (MIT license) |
| Pro Support | $99/mo (priority support, private Slack, updates) |
| Enterprise License | $499/mo (commercial license, SLA, consulting hours) |

### Definition of Done (Maintenance)
- [ ] README is comprehensive (setup in 5 minutes)
- [ ] Demo site is live and working
- [ ] Stripe billing works end-to-end
- [ ] 50+ GitHub stars (growth target)
- [ ] Monthly updates (dependency bumps, new features)

---

## Demand Validation Criteria

**Only build a Tier 5 product when:**
1. 10+ people have signed up for the waitlist on cloudrix.io
2. 3+ enterprise leads have specifically asked for it
3. A competitor raises funding in the same space (market validated)
4. You can pre-sell 5 annual subscriptions before building

**How to validate:**
- Add "Join Waitlist" buttons on product pages (already on cloudrix.io)
- Track waitlist signups per product in MongoDB
- Run LinkedIn polls: "Would you pay $X/mo for [product]?"
- Cold email 50 target companies: "We're building [X], would you be a design partner?"
