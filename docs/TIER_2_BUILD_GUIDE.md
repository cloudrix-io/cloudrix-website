# Tier 2 Build Guide — High Value, Moderate Effort

> **Products:** CloudrixAI Chat, ScopeAI, StackPilot, Cloud Cost Calculator
> **Timeline:** Week 3-4 after Tier 1 launch
> **Expected MRR:** €4K-€13K combined

---

## Access & Infrastructure

### GitHub Organization
- **Org:** https://github.com/cloudrix-io
- **Access:** You need collaborator/member access to the org
- **Branch strategy:** `main` = production, `dev` = development, feature branches for PRs

### Vercel
- **Team:** firas-projects-f79a263c
- **Dashboard:** https://vercel.com/firas-projects-f79a263c
- **How to deploy:** Each product repo is connected to Vercel. Push to `main` = auto-deploy.
- **To connect a new repo:** Vercel Dashboard → Add New Project → Import from `cloudrix-io` org

### Subdomains (configure in Vercel project settings → Domains)
- `chat.cloudrix.io` → cloudrix-ai-chat
- `scope.cloudrix.io` → cloudrix-scopeai
- `stackpilot.cloudrix.io` → cloudrix-stackpilot (or keep on main site)
- `calculator.cloudrix.io` → cloudrix-cost-calculator (or keep on main site)

### Shared Services
- **Database:** MongoDB Atlas (connection string in `MONGODB_URI` env var)
- **Email:** Resend (`RESEND_API_KEY` env var) — used for transactional emails
- **AI/LLM:** Anthropic Claude API (`ANTHROPIC_API_KEY` env var)
- **Payments:** Stripe (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` env vars)
- **Analytics:** Vercel Analytics (auto) + Google Analytics (`G-3WL9275XNR`)

### Tech Stack (same for all products)
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB + Mongoose (or PostgreSQL + Prisma for relational data)
- **Auth:** JWT (jose library) or NextAuth
- **Hosting:** Vercel
- **LLM:** Claude API via Anthropic SDK

---

## Product 5: CloudrixAI Chat

### Repo
- **URL:** https://github.com/cloudrix-io/cloudrix-ai-chat
- **Deploy to:** `chat.cloudrix.io`

### What It Does
AI-powered customer support chatbot. Users upload their docs/FAQs, the system builds a RAG pipeline, and deploys a chat widget they embed on their site.

### Architecture
```
User uploads docs → Chunking → Embedding (Claude/OpenAI) → Store in Pinecone/pgvector
Visitor asks question → Retrieve relevant chunks → Claude generates answer → Stream response
```

### Core Features to Build
1. **Dashboard** — Create/manage chatbots, view conversations, analytics
2. **Doc ingestion** — Upload PDF, paste URL, or paste text. Chunk and embed.
3. **Chat widget** — Embeddable `<script>` tag that renders a chat bubble on any site
4. **RAG pipeline** — Query vector DB → retrieve context → Claude API call → stream response
5. **Escalation** — Button to hand off to human with full conversation context
6. **Analytics** — Messages/day, resolution rate, top questions, unanswered queries
7. **Customization** — Colors, logo, welcome message, tone setting

### Database Schema
```
Users: { email, name, plan, stripeCustomerId, createdAt }
Chatbots: { userId, name, welcomeMessage, tone, brandColor, domains[] }
Documents: { chatbotId, filename, content, chunks[], embeddingStatus }
Conversations: { chatbotId, visitorId, messages[], createdAt, resolved }
Messages: { conversationId, role (user|assistant), content, timestamp }
```

### API Endpoints
```
POST /api/auth/register — Create account
POST /api/auth/login — JWT login
POST /api/chatbots — Create chatbot
POST /api/chatbots/:id/documents — Upload document
DELETE /api/chatbots/:id/documents/:docId — Remove document
POST /api/chatbots/:id/chat — Public chat endpoint (RAG query)
GET /api/chatbots/:id/analytics — Dashboard analytics
GET /api/chatbots/:id/conversations — List conversations
POST /api/billing/checkout — Stripe checkout session
POST /api/webhooks/stripe — Payment webhooks
```

### Third-Party Services Needed
- **Pinecone** (vector DB) — Free tier: 1 index, 100K vectors. Or use pgvector with PostgreSQL.
- **Claude API** — For generating responses. ~$0.003 per message average.
- **Stripe** — Subscriptions and metering.

### Pricing Tiers (already set in products.ts)
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0/mo | 1 chatbot, 100 messages/mo, 5 docs |
| Starter | $49/mo | 3 chatbots, 1K messages/mo, 50 docs |
| Pro | $149/mo | 10 chatbots, 10K messages/mo, unlimited docs |
| Enterprise | Custom | Unlimited everything, SSO, SLA, on-premise option |

### Key Files to Create
```
src/app/page.tsx — Landing/dashboard
src/app/dashboard/ — Protected dashboard routes
src/app/api/chat/route.ts — Public chat API
src/app/api/documents/route.ts — Doc upload + processing
src/components/chat-widget/ — Embeddable widget code
src/lib/rag.ts — RAG pipeline (embed, retrieve, generate)
src/lib/embeddings.ts — Chunking + embedding logic
src/lib/stripe.ts — Billing utilities
```

### Definition of Done
- [ ] User can register, login, create a chatbot
- [ ] User can upload a PDF and the system indexes it
- [ ] Chat widget works on any external website via script tag
- [ ] Responses are grounded in uploaded documents (RAG)
- [ ] Free tier limits enforced (100 msgs/mo)
- [ ] Stripe checkout works for paid tiers
- [ ] Analytics dashboard shows message count, top questions
- [ ] Mobile-responsive dashboard
- [ ] Deployed to chat.cloudrix.io

---

## Product 6: ScopeAI

### Repo
- **URL:** https://github.com/cloudrix-io/cloudrix-scopeai
- **Deploy to:** `scope.cloudrix.io`

### What It Does
User describes a project in plain English → AI generates a detailed scope document with tech stack, timeline, cost estimate, team composition. Downloadable as PDF.

### Architecture
```
User input (description + constraints) → Claude API (structured output) → Parse JSON → Render scope doc → PDF export
```

### Core Features to Build
1. **Scope form** — Project description, industry, budget range, timeline, team size
2. **AI generation** — Claude API call with structured prompt → JSON response
3. **Scope viewer** — Rendered scope with sections: overview, tech stack, phases, timeline, cost, risks
4. **PDF export** — Generate downloadable PDF using React PDF or html2pdf
5. **History** — Save past scopes, compare versions
6. **Share** — Public link to share scope with stakeholders
7. **Templates** — Pre-built templates for common project types (e-commerce, SaaS, mobile app)

### Database Schema
```
Users: { email, name, plan, stripeCustomerId }
Scopes: { userId, title, input, output (JSON), pdfUrl, isPublic, shareSlug, createdAt }
Templates: { name, category, defaultInput, description }
```

### API Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/scopes/generate — Generate scope from input (Claude API call)
GET /api/scopes — List user's scopes
GET /api/scopes/:id — Get scope detail
GET /api/scopes/:id/pdf — Download PDF
GET /api/share/:slug — Public scope view
POST /api/billing/checkout
POST /api/webhooks/stripe
```

### Claude API Prompt Strategy
```
System: You are a senior technical architect. Generate a detailed project scope document.
Return JSON with: { overview, techStack[], phases[], timeline, costEstimate: { low, high }, 
teamComposition[], risks[], assumptions[], deliverables[] }
```

### Pricing Tiers
| Tier | Price | Limits |
|------|-------|--------|
| Free | $0/mo | 3 scopes/mo, no PDF export |
| Pro | $39/mo | Unlimited scopes, PDF export, history |
| Team | $99/mo | 5 seats, shared workspace, templates |
| Enterprise | Custom | SSO, custom templates, API access |

### Definition of Done
- [ ] User can describe a project and get a generated scope
- [ ] Scope includes: tech stack, timeline, phases, cost estimate, risks
- [ ] PDF download works
- [ ] History of past scopes saved
- [ ] Shareable public link
- [ ] Free tier limits enforced (3/mo)
- [ ] Stripe checkout for paid tiers
- [ ] Deployed to scope.cloudrix.io

---

## Product 7: StackPilot (Free — Traffic Magnet)

### Repo
- **URL:** https://github.com/cloudrix-io/cloudrix-stackpilot
- **Deploy to:** Keep on main site at `/products/tech-stack-advisor/demo` OR `stackpilot.cloudrix.io`

### What It Does
5-question quiz → battle-tested tech stack recommendation with pros, cons, alternatives. 100% free, no login required.

### Architecture
```
5 questions (client-side) → Score answers → Match to recommendation matrix → Display results
```
No backend needed. Pure client-side logic. No LLM calls.

### Core Features to Build
1. **5-question quiz** — Project type, scale, team skills, timeline, constraints
2. **Recommendation engine** — Decision matrix matching answers to tech stacks
3. **Results page** — Primary stack, alternatives, pros/cons, team skill gaps
4. **Share results** — URL with encoded answers for sharing
5. **Email capture** — Optional "Get detailed report via email" (captures leads)

### Tech Stack Recommendations Database (hardcoded)
```
SaaS MVP → Next.js + Supabase + Tailwind + Vercel
Enterprise API → NestJS + PostgreSQL + Docker + AWS
Mobile App → React Native + Expo + Supabase
E-commerce → Next.js + Shopify API + Vercel
Data Platform → Python + FastAPI + PostgreSQL + AWS
AI Product → Next.js + Python + Claude API + Pinecone + Vercel
```

### Pricing
**Free forever.** This is a traffic magnet that drives users to paid products.

### Definition of Done
- [ ] 5-question flow works smoothly
- [ ] 10+ unique stack recommendations
- [ ] Results show pros, cons, alternatives
- [ ] Shareable URL for results
- [ ] Email capture form (optional)
- [ ] Mobile-responsive
- [ ] SEO-optimized (target: "best tech stack for [X]" keywords)

---

## Product 8: Cloud Cost Calculator (Free — Traffic Magnet)

### Repo
- **URL:** https://github.com/cloudrix-io/cloudrix-cost-calculator
- **Deploy to:** Keep on main site at `/calculator` OR `calculator.cloudrix.io`

### What It Does
Configure compute, storage, database, networking → see real-time AWS vs GCP vs Azure pricing comparison.

### Architecture
```
User selects resources (client-side) → Calculate prices from pricing data → Display comparison chart
```
No backend needed. Pure client-side with hardcoded/fetched pricing data.

### Core Features to Build
1. **Resource configurator** — Compute (instance type, count), storage (GB), database (type, size), networking (transfer GB)
2. **Price calculator** — Real pricing formulas for AWS, GCP, Azure
3. **Comparison view** — Side-by-side monthly/annual costs per provider
4. **Reserved vs On-demand** — Toggle to show savings with reserved instances
5. **Export** — Download comparison as CSV or PDF
6. **Save configurations** — LocalStorage for scenario planning

### Pricing Data (hardcoded, update quarterly)
```
AWS EC2 t3.medium: $0.0416/hr → $30.37/mo
GCP e2-medium: $0.0335/hr → $24.46/mo
Azure B2s: $0.0416/hr → $30.37/mo
... (cover 10 common instance types per provider)
```

### Pricing
**Free forever.** Drives traffic and leads to CloudCost AI (paid product).

### Definition of Done
- [ ] Configure compute, storage, DB, networking
- [ ] Real-time price comparison across 3 providers
- [ ] Monthly and annual views
- [ ] Reserved vs on-demand toggle
- [ ] CSV/PDF export
- [ ] Mobile-responsive
- [ ] SEO-optimized (target: "cloud cost calculator", "AWS vs GCP pricing")

---

## General Build Instructions (All Products)

### Step 1: Clone and Setup
```bash
git clone https://github.com/cloudrix-io/[REPO_NAME].git
cd [REPO_NAME]
npx create-next-app@latest . --typescript --tailwind --app --src-dir
npm install mongoose jose resend zod
# For AI products:
npm install @anthropic-ai/sdk
# For payment:
npm install stripe @stripe/stripe-js
```

### Step 2: Environment Variables
Create `.env.local`:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-here
RESEND_API_KEY=re_...
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=https://[product].cloudrix.io
```

### Step 3: Deploy to Vercel
1. Go to https://vercel.com/firas-projects-f79a263c
2. Click "Add New Project"
3. Import from `cloudrix-io/[REPO_NAME]`
4. Add environment variables
5. Deploy
6. Add custom domain: `[product].cloudrix.io`

### Step 4: Connect to Main Website
In `cloudrix-website/src/data/products.ts`, update the product's `productUrl` to point to the live subdomain.

### Step 5: Test End-to-End
- [ ] Homepage loads
- [ ] User can register/login
- [ ] Core feature works
- [ ] Free tier limits enforced
- [ ] Stripe checkout works
- [ ] Email notifications sent
- [ ] Mobile-responsive
- [ ] Performance: <2s load time
- [ ] No console errors
