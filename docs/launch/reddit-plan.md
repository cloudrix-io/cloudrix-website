# Reddit Plan — EU AI Act / AI Compliance

## Ground rules (Reddit will ban you faster than any other channel)

1. **Two-week warm-up first.** New-ish account + first post containing a link = removed + possible sitewide spam flag. Spend weeks 1–2 only commenting helpfully (AI Act questions get asked weekly in the subs below and mostly get bad answers — easy wins for someone who's read the Act).
2. **90/10 rule.** Reddit's self-promotion guideline: at most 1 in 10 contributions may promote your own thing. In practice: comment 15–20 times per link you ever post.
3. **Read each sub's rules the same day you post.** Several (r/MachineLearning, r/startups) restrict or schedule self-promo (e.g. dedicated weekly threads — use those).
4. **Disclose you built it, always.** "I built this" posts survive; astroturfing gets sniffed out and screenshotted.
5. **Never post the same content to multiple subs the same day** — cross-post detection + it looks like a campaign.
6. **Link in comments or on request where rules are strict;** many subs allow tool links only when someone asks.

## Target subreddits, tiered

**Tier 1 — compliance/privacy natives (highest intent, strictest norms)**
- r/gdpr (~60k) — most active EU-regulation community on Reddit; AI Act questions appear here constantly because the same DPO crowd owns both topics. Value comments >> posts. No tool-dropping without mod check.
- r/privacy — huge; EU regulation threads recur. Extremely hostile to marketing. Comments only, realistically.
- r/eulaw / r/europeanunion — Omnibus news threads appear here; good for informed comments, not promotion.
- r/aiCompliance, r/EU_AI_Act — check if active at posting time (small/possibly dormant niche subs come and go). If alive, they're the one place a direct tool post is welcome.

**Tier 2 — practitioner subs (where your buyers' engineers hang out)**
- r/MachineLearning — only via rules-compliant routes (self-promotion thread / genuinely technical discussion post). A "how I turned Annex III into a decision tree" technical post can work; a tool ad cannot.
- r/mlops / r/LLMDevs / r/Rag — Art. 12 logging and audit-trail content is on-topic engineering here.
- r/ArtificialInteligence (note the sub's single-t spelling) and r/artificial — general AI discussion; Omnibus explainer posts do well as text posts.

**Tier 3 — founder subs (buyers, softer norms)**
- r/startups + r/Entrepreneur / r/EntrepreneurRideAlong — "lessons learned" and "I built X" formats accepted if genuinely substantive.
- r/SaaS / r/indiehackers — solo-founder build stories are the house genre; the most natural home for a launch post.
- r/thenetherlands / r/cirkeltrek — no. Dutch subs are allergic to self-promo; skip unless commenting.

## Sequencing

- Weeks 1–2: comments only (Tier 1 + 2), 10–15 min/day.
- Week 2–3: Draft Post 1 (pure value, zero links) → r/ArtificialInteligence or r/gdpr (check mods first).
- Week 3: Draft Post 2 (technical) → r/mlops or r/MachineLearning per its rules.
- Week 4: Draft Post 3 (build story + tool, disclosed) → r/SaaS, and Tier-1 niche subs if active.

---

## Draft Post 1 — value post, no links

**Sub:** r/ArtificialInteligence (or r/gdpr)
**Title:** The EU AI Act's high-risk deadline moved to Dec 2027 — a plain-English summary of what actually changed (and what didn't)

> There's a lot of confusion since the Digital Omnibus was finalized in June, so here's the practical version. I do AI Act implementation work; this is a summary, not legal advice.
>
> **What moved:**
> - High-risk obligations for Annex III systems (hiring, credit scoring, biometrics, education access, etc.): 2 Aug 2026 → **2 Dec 2027**
> - High-risk AI embedded in regulated products (medical devices, machinery, Annex I): → **2 Aug 2028**
> - Watermarking duties for providers (Art. 50(2)): → 2 Dec 2026
>
> **What did NOT move:**
> - Prohibited practices (social scoring, emotion recognition at work/school, untargeted face scraping) — in force since **Feb 2025**
> - AI literacy obligations — also live since Feb 2025
> - GPAI/foundation-model rules — live since Aug 2025
> - Most transparency obligations (chatbots disclosing they're AI, deepfake labeling) — still start **2 Aug 2026**
> - The fines: up to €35M or 7% of global turnover for prohibited practices
>
> **What this means in practice:** the requirements didn't get lighter, you just have more runway. The two things worth doing in 2026 even if you deprioritize everything else: (1) inventory which of your systems are in scope at all — most companies genuinely don't know; (2) if you're building anything that will be high-risk, design the logging and documentation in now, because retrofitting Art. 12-grade decision logging onto a system built without it is a rewrite, not a patch.
>
> Happy to answer questions about specific scenarios — classification edge cases are most of what I deal with.

Then answer every question thoroughly. If (and only if) someone asks "is there a tool for this," link the scanner with disclosure.

---

## Draft Post 2 — technical post

**Sub:** r/mlops (or r/MachineLearning self-promo thread)
**Title:** What "compliance-grade" decision logging for ML systems actually requires (EU AI Act Art. 12) — an architecture breakdown

> The EU AI Act requires high-risk AI systems to support "automatic recording of events" over their lifetime. I've been designing this for client systems and it's a genuinely interesting MLOps problem, because standard observability doesn't cover it. What you have (requests, latency, errors, drift metrics) is infrastructure telemetry. What Art. 12 effectively needs is **decision provenance**:
>
> - Per-inference records: model version + input reference + output + confidence + which human accepted/overrode it
> - Reproducibility: enough state to explain *this* decision months later (model registry with immutable versioning, feature snapshots or hashes)
> - Tamper-evidence: append-only storage; a mutable table your app can UPDATE won't survive a regulator's skepticism
> - The GDPR tension: you must log decisions about people while minimizing personal data — pseudonymized references + separate keyed lookup is the pattern I've landed on
>
> Stack-wise, nothing exotic: event-sourced decision records (Kafka/Kinesis → append-only store like S3 object-lock or an immutable ledger table), model registry (MLflow or similar) as the version anchor, and override events captured from the review UI as first-class events, not audit-log afterthoughts.
>
> The design insight that surprised me: **override-rate monitoring** is both a compliance signal (Art. 14 requires oversight that isn't a rubber stamp) and a genuinely useful model-quality metric. Near-zero override rate either means your model is great or your reviewers stopped looking. Either way you want the alert.
>
> Deadline for this moved to Dec 2027 (Digital Omnibus), which is exactly enough time to design it in instead of retrofitting.
>
> Curious how others are approaching this — especially the log-retention vs data-minimization tradeoff.

No links at all in this one. The credibility is the product.

---

## Draft Post 3 — build story + disclosed tool

**Sub:** r/SaaS (variant works for active niche compliance subs)
**Title:** I turned the EU AI Act's risk rules into a free decision-tree tool — solo build, feedback wanted

> Solo founder / senior engineer in the Netherlands. This year I moved into EU AI Act implementation work, and every single first conversation began with the same unpaid hour: figuring out whether the Act applies to the company at all, and at which risk tier.
>
> So I encoded that hour into a free tool: ~5 minutes of plain-language questions about your AI system → risk classification (prohibited / high / limited / minimal), the specific obligations, and the dates they apply — using the post-Digital-Omnibus timeline (high-risk is now Dec 2, 2027, not the Aug 2026 date most of the internet still shows).
>
> Deliberate choices, open to criticism:
> - **Not an LLM.** It's a hand-built decision tree derived from the Act's text. Deterministic, explainable, cites its articles. I didn't want a model hallucinating anyone's legal exposure.
> - **No signup, no email wall.** I hate gated "free" tools. Business model is transparent: I sell implementation engineering to the subset who classify as high-risk and want help; the tool stays free regardless.
> - **Honest scope:** common cases (SaaS AI features, hiring tools, scoring, chatbots) are handled well; Annex I embedded systems and GPAI provider duties get a "you need a specialist" answer.
>
> What I'd love from this community: run a real or hypothetical system through it and tell me where the classification feels wrong or a question is ambiguous. Wrong-answer reports are worth more to me than upvotes.
>
> Link: cloudrix.io/eu-ai-act — and yes, this is my own tool (mods: happy to remove if this crosses the sub's promo line).

---

## Comment-farming topics (for warm-up weeks)

Search these weekly and answer well: "EU AI Act" in r/gdpr and r/ArtificialInteligence; "AI Act deadline"; "high risk AI"; "AI compliance" in r/SaaS and r/startups; Omnibus news threads in r/europeanunion. Correcting the outdated August-2026 deadline (politely, with the source) is a repeatable, genuinely helpful comment that quietly demonstrates exactly what you do.
