# Tier 4 Build Guide — Month 3, Complex Products

> **Products:** HelpDesk AI, HireAI, ContentAI Studio, DevOps Dashboard, CloudArchitect AI, MigrateIQ, InsightAI, TranslateAI
> **Timeline:** Month 3
> **Expected MRR:** €8K-€25K combined
> **Organization:** https://github.com/cloudrix-io

---

## Access & Infrastructure

| Resource | URL / Details |
|----------|--------------|
| **GitHub Org** | https://github.com/cloudrix-io |
| **Vercel Team** | https://vercel.com/firas-projects-f79a263c |
| **Main Website** | https://github.com/cloudrix-io/cloudrix-website → cloudrix.io |
| **Env Vars** | MONGODB_URI, JWT_SECRET, RESEND_API_KEY, ANTHROPIC_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET |
| **Standard Stack** | Next.js 16, TypeScript, Tailwind CSS 4, MongoDB/Mongoose, JWT (jose), Resend, Stripe |

### Standard Project Structure
See [TIER_2_BUILD_GUIDE.md](./TIER_2_BUILD_GUIDE.md) → "Standard Project Structure" section. ALL products follow the same pattern.

### Deployment Steps (same for every product)
1. Clone repo from `cloudrix-io/[REPO]`
2. Build locally: `npm run build`
3. Vercel Dashboard → Add New Project → Import from `cloudrix-io/[REPO]`
4. Add env vars → Deploy
5. Add domain: `[product].cloudrix.io` in Vercel project → Domains
6. Update `cloudrix-website/src/data/products.ts` → set `productUrl` to live subdomain

---

## Product 13: HelpDesk AI

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-helpdesk
- **Deploy to:** `helpdesk.cloudrix.io`

### What It Does
Customer support platform with AI ticket routing, auto-draft responses, sentiment analysis, and knowledge base suggestions.

### Product-Specific Files
```
cloudrix-helpdesk/src/
├── app/
│   ├── page.tsx                        # Landing page
│   ├── dashboard/
│   │   ├── page.tsx                    # Ticket inbox (list view)
│   │   ├── tickets/[id]/page.tsx       # Ticket detail + AI suggestions
│   │   ├── knowledge-base/page.tsx     # KB articles CRUD
│   │   ├── analytics/page.tsx          # Response time, CSAT, volume
│   │   ├── settings/page.tsx           # Team, channels, auto-rules
│   │   └── billing/page.tsx            # Subscription management
│   ├── api/
│   │   ├── tickets/route.ts            # CRUD + auto-classify on create
│   │   ├── tickets/[id]/route.ts       # GET/PUT ticket
│   │   ├── tickets/[id]/reply/route.ts # POST: send reply (AI draft option)
│   │   ├── tickets/[id]/ai-draft/route.ts # POST: generate AI response
│   │   ├── knowledge-base/route.ts     # CRUD KB articles
│   │   ├── inbound/email/route.ts      # POST: receive inbound email → create ticket
│   │   └── analytics/route.ts          # GET: metrics
│   └── portal/[orgSlug]/page.tsx       # Public customer portal (submit ticket, view status)
├── lib/
│   ├── ai/
│   │   ├── classifier.ts              # Claude: classify ticket (billing/technical/general)
│   │   ├── sentiment.ts               # Claude: detect sentiment (positive/neutral/negative/urgent)
│   │   ├── draft-response.ts          # Claude: generate reply draft from context + KB
│   │   └── suggest-articles.ts        # Claude: match ticket to KB articles
│   ├── models/
│   │   ├── user.ts                    # Agent user
│   │   ├── ticket.ts                  # { subject, body, from, status, priority, sentiment, assignee, category }
│   │   ├── message.ts                 # { ticketId, sender (customer|agent|ai), body, timestamp }
│   │   ├── article.ts                 # { title, body, category, isPublished }
│   │   └── organization.ts           # { name, slug, plan, agents[] }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Starter | $39/mo | 3 agents, 500 tickets/mo, email channel |
| Pro | $89/mo | 10 agents, 5K tickets/mo, email + chat, AI drafts |
| Enterprise | Custom | Unlimited, all channels, custom SLA, API |

### Definition of Done
- [ ] Ticket inbox with filtering (status, priority, assignee)
- [ ] AI auto-classifies incoming tickets (category + sentiment)
- [ ] AI drafts response for agent review
- [ ] Knowledge base CRUD with AI article suggestions
- [ ] Customer portal for submitting/tracking tickets
- [ ] Email inbound creates tickets automatically
- [ ] Analytics: response time, resolution time, CSAT
- [ ] Stripe checkout, free trial
- [ ] Deployed to helpdesk.cloudrix.io

---

## Product 14: HireAI

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-hireai
- **Deploy to:** `hire.cloudrix.io`

### What It Does
Upload job description + candidate CVs → AI screens, scores, ranks candidates. Generates interview questions per candidate.

### Product-Specific Files
```
cloudrix-hireai/src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Jobs list
│   │   ├── jobs/new/page.tsx           # Create job + paste/upload JD
│   │   ├── jobs/[id]/page.tsx          # Job detail: ranked candidates
│   │   ├── jobs/[id]/candidates/[cid]/page.tsx  # Candidate scorecard
│   │   └── billing/page.tsx
│   ├── api/
│   │   ├── jobs/route.ts              # CRUD jobs
│   │   ├── jobs/[id]/candidates/route.ts  # Upload CVs (PDF parse + AI score)
│   │   ├── jobs/[id]/candidates/[cid]/route.ts  # GET scorecard
│   │   └── jobs/[id]/candidates/[cid]/questions/route.ts  # AI interview Qs
├── lib/
│   ├── pdf-parser.ts                  # Extract text from PDF CVs
│   ├── ai/
│   │   ├── scorer.ts                  # Claude: compare CV to JD → score 0-100 + breakdown
│   │   ├── questions.ts               # Claude: generate interview questions from gaps
│   │   └── bias-check.ts             # Ensure scoring doesn't use protected attributes
│   ├── models/
│   │   ├── job.ts                     # { title, description, requirements[], niceToHave[], status }
│   │   ├── candidate.ts              # { jobId, name, email, cvText, score, breakdown, rank }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Pay-per-use | $5/candidate | No subscription, pay as you go |
| Pro | $199/mo | Unlimited candidates, 20 active jobs, team access |
| Enterprise | Custom | ATS integration, SSO, bias audit reports |

### Definition of Done
- [ ] Create job with description and requirements
- [ ] Upload CVs (PDF) → text extraction
- [ ] AI scores each candidate vs JD (0-100)
- [ ] Ranked candidate list with score breakdown
- [ ] AI-generated interview questions per candidate
- [ ] Bias check (no scoring on name/gender/age)
- [ ] Stripe checkout (per-candidate or subscription)
- [ ] Deployed to hire.cloudrix.io

---

## Product 15: ContentAI Studio

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-contentai
- **Deploy to:** `content.cloudrix.io`

### Product-Specific Files
```
cloudrix-contentai/src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Content calendar view
│   │   ├── create/page.tsx            # Create new content (select type)
│   │   ├── posts/[id]/page.tsx        # Editor with AI assist
│   │   ├── brand-voice/page.tsx       # Train brand voice from samples
│   │   ├── templates/page.tsx         # Content templates
│   │   └── analytics/page.tsx         # Performance tracking
│   ├── api/
│   │   ├── content/route.ts           # CRUD content pieces
│   │   ├── content/[id]/generate/route.ts  # AI generate from brief
│   │   ├── content/[id]/variants/route.ts  # A/B variant generation
│   │   ├── brand-voice/route.ts       # Upload samples → train voice
│   │   └── templates/route.ts         # Template CRUD
├── lib/
│   ├── ai/
│   │   ├── generator.ts              # Claude: brief → content (blog, social, email)
│   │   ├── brand-voice.ts            # Analyze writing samples → voice profile
│   │   ├── seo-optimizer.ts          # Add keywords, meta descriptions
│   │   └── variant-generator.ts      # Generate A/B test variants
│   ├── models/
│   │   ├── content.ts                # { title, type (blog|social|email), body, status (draft|review|published) }
│   │   ├── brand-voice.ts            # { userId, samples[], voiceProfile (JSON), tone, style }
│   │   ├── template.ts              # { name, type, promptTemplate, variables[] }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 5 pieces/mo, no brand voice |
| Pro | $39/mo | Unlimited, brand voice, SEO, templates |
| Team | $99/mo | 5 seats, approval workflow, calendar |
| Enterprise | Custom | API, custom templates, SSO |

### Definition of Done
- [ ] Create content from brief (blog, social, email)
- [ ] Brand voice training from sample content
- [ ] Content calendar with scheduling
- [ ] A/B variant generation
- [ ] SEO keyword suggestions
- [ ] Template library
- [ ] Stripe checkout
- [ ] Deployed to content.cloudrix.io

---

## Product 16: DevOps Dashboard

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-devops-dashboard
- **Deploy to:** `devops.cloudrix.io`

### Product-Specific Files
```
cloudrix-devops-dashboard/src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Overview: DORA metrics, recent deploys
│   │   ├── pipelines/page.tsx         # Pipeline status across all services
│   │   ├── deployments/page.tsx       # Deployment history with rollback
│   │   ├── incidents/page.tsx         # Incident timeline
│   │   ├── incidents/[id]/page.tsx    # Post-mortem detail
│   │   ├── services/page.tsx          # Service catalog
│   │   └── settings/page.tsx          # Provider connections
│   ├── api/
│   │   ├── providers/github/route.ts  # Connect GitHub Actions
│   │   ├── providers/gitlab/route.ts  # Connect GitLab CI
│   │   ├── pipelines/route.ts         # GET: aggregated pipeline data
│   │   ├── deployments/route.ts       # GET: deployment history
│   │   ├── metrics/dora/route.ts      # GET: DORA metrics
│   │   └── incidents/route.ts         # CRUD incidents + post-mortems
├── lib/
│   ├── providers/
│   │   ├── github-actions.ts          # GitHub API: workflow runs, status
│   │   ├── gitlab-ci.ts              # GitLab API: pipelines, jobs
│   │   └── jenkins.ts                # Jenkins API: builds
│   ├── metrics/
│   │   └── dora.ts                   # Calculate: deploy frequency, lead time, MTTR, CFR
│   ├── models/
│   │   ├── pipeline.ts               # { provider, repo, status, duration, branch, commit }
│   │   ├── deployment.ts             # { service, version, environment, status, deployedAt }
│   │   ├── incident.ts              # { title, severity, status, timeline[], postMortem }
│   │   └── service.ts               # { name, repo, provider, lastDeploy, healthStatus }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 3 pipelines, 1 provider, 7-day history |
| Pro | $79/mo | 20 pipelines, all providers, 90-day, alerts |
| Team | $199/mo | Unlimited, DORA reports, incidents, 5 seats |
| Enterprise | Custom | SSO, API, SLA, unlimited seats |

### Definition of Done
- [ ] Connect GitHub Actions (OAuth or token)
- [ ] Pipeline status view (passing/failing/running)
- [ ] Deployment history with service mapping
- [ ] DORA metrics calculated and displayed
- [ ] Incident tracking with timeline
- [ ] Slack/email alerts for failures
- [ ] Stripe checkout
- [ ] Deployed to devops.cloudrix.io

---

## Product 17: CloudArchitect AI

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-cloud-architect
- **Deploy to:** `architect.cloudrix.io`

### Product-Specific Files
```
cloudrix-cloud-architect/src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Saved architectures
│   │   ├── new/page.tsx               # Create new architecture
│   │   └── [id]/page.tsx             # View/edit architecture
│   ├── api/
│   │   ├── architectures/route.ts     # CRUD
│   │   ├── architectures/[id]/generate/route.ts  # POST: AI generates architecture
│   │   ├── architectures/[id]/export/route.ts    # GET: export SVG/PNG/PDF/Terraform
├── lib/
│   ├── ai/
│   │   ├── architect.ts              # Claude: requirements → architecture JSON
│   │   └── terraform.ts             # Convert architecture → Terraform HCL
│   ├── diagram/
│   │   ├── renderer.ts              # JSON → SVG diagram using D3 or React Flow
│   │   └── cloud-icons.ts           # AWS/GCP/Azure service icons
│   ├── models/
│   │   ├── architecture.ts          # { userId, title, requirements, diagram (JSON), provider, costEstimate }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 3 designs/mo, no export |
| Pro | $59/mo | Unlimited, SVG/PNG/PDF export, Terraform code |
| Team | $149/mo | 5 seats, shared library, versioning |
| Enterprise | Custom | On-premise, custom templates, SLA |

### Definition of Done
- [ ] Describe requirements → AI generates architecture
- [ ] Visual diagram with cloud service icons
- [ ] Cost estimate per component
- [ ] Export: SVG, PNG, PDF
- [ ] Terraform code generation
- [ ] Multi-cloud support (AWS, GCP, Azure)
- [ ] Stripe checkout
- [ ] Deployed to architect.cloudrix.io

---

## Product 18: MigrateIQ

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-migrateiq
- **Deploy to:** `migrate.cloudrix.io`

### Product-Specific Files
```
cloudrix-migrateiq/src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Migration projects list
│   │   ├── projects/new/page.tsx      # Create migration project
│   │   ├── projects/[id]/page.tsx     # Migration plan detail
│   │   └── projects/[id]/timeline/page.tsx  # Gantt chart view
│   ├── api/
│   │   ├── projects/route.ts          # CRUD
│   │   ├── projects/[id]/generate/route.ts  # AI generate migration plan
│   │   ├── projects/[id]/export/route.ts    # PDF export
├── lib/
│   ├── ai/
│   │   └── migration-planner.ts      # Claude: infrastructure details → phased migration plan
│   ├── models/
│   │   ├── project.ts                # { title, currentInfra, targetCloud, services[], databases[], compliance[] }
│   │   ├── migration-plan.ts         # { projectId, strategy, phases[], risks[], tools[], costEstimate }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 1 project, basic plan |
| Pro | $49/mo | Unlimited projects, detailed plans, PDF export |
| Enterprise | Custom | API, team, custom templates |

---

## Product 19: InsightAI

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-insightai
- **Deploy to:** `insight.cloudrix.io`

### Product-Specific Files
```
cloudrix-insightai/src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Saved dashboards
│   │   ├── query/page.tsx             # Natural language query interface
│   │   ├── dashboards/[id]/page.tsx   # Dashboard with pinned charts
│   │   └── connections/page.tsx       # Database connections
│   ├── api/
│   │   ├── connections/route.ts       # CRUD database connections
│   │   ├── query/route.ts            # POST: natural language → SQL → results
│   │   ├── dashboards/route.ts       # CRUD dashboards
│   │   └── dashboards/[id]/charts/route.ts  # CRUD pinned charts
├── lib/
│   ├── ai/
│   │   ├── nl-to-sql.ts             # Claude: "show revenue by month" → SELECT query
│   │   └── chart-suggester.ts       # Suggest best chart type for data
│   ├── connectors/
│   │   ├── postgres.ts              # PostgreSQL connector
│   │   ├── mysql.ts                 # MySQL connector
│   │   └── mongodb.ts              # MongoDB connector
│   ├── models/
│   │   ├── connection.ts            # { userId, type, host, port, database, credentials (encrypted) }
│   │   ├── query.ts                # { connectionId, naturalLanguage, sql, results, chartType }
│   │   ├── dashboard.ts            # { userId, name, charts[] }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Starter | $49/mo | 1 connection, 100 queries/mo |
| Pro | $149/mo | 5 connections, unlimited queries, scheduled reports |
| Enterprise | Custom | Unlimited, API, SSO, data governance |

---

## Product 20: TranslateAI

### Repo & Deploy
- **Repo:** https://github.com/cloudrix-io/cloudrix-translateai
- **Deploy to:** `translate.cloudrix.io`

### Product-Specific Files
```
cloudrix-translateai/src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx                    # Translation projects
│   │   ├── translate/page.tsx         # Real-time translation interface
│   │   ├── documents/page.tsx         # Document translation history
│   │   ├── glossary/page.tsx          # Custom glossary management
│   │   └── api-keys/page.tsx          # API key management
│   ├── api/
│   │   ├── translate/route.ts         # POST: translate text (Claude API)
│   │   ├── documents/route.ts         # POST: upload document for translation
│   │   ├── documents/[id]/route.ts    # GET: translated document
│   │   ├── glossary/route.ts          # CRUD glossary terms
│   │   └── v1/translate/route.ts      # Public API endpoint
├── lib/
│   ├── ai/
│   │   ├── translator.ts            # Claude: translate with context + glossary
│   │   └── language-detector.ts     # Detect source language
│   ├── parsers/
│   │   ├── pdf.ts                   # Extract text from PDF, translate, reconstruct
│   │   ├── docx.ts                  # Parse DOCX, translate, reconstruct
│   │   └── html.ts                  # Parse HTML, translate text nodes
│   ├── models/
│   │   ├── project.ts               # { userId, sourceLang, targetLang, documents[] }
│   │   ├── translation.ts           # { text, sourceLang, targetLang, translated, glossaryApplied }
│   │   ├── glossary.ts             # { userId, sourceTerm, targetTerm, language, context }
```

### Pricing
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0 | 5K words/mo, 5 languages |
| Pro | $49/mo | 50K words/mo, 40+ languages, documents, glossary |
| Business | $149/mo | 500K words/mo, API access, team, priority |
| Enterprise | Custom | Unlimited, on-premise, custom models |
