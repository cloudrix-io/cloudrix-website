# Cold Outreach Kit — NL/EU SMB AI Companies

## Targeting & rules

**Who:** NL and EU SMBs (10–200 FTE) that *deploy or build* AI in scoped domains — HR-tech, fintech/credit, ed-tech, health-tech, martech with profiling, and AI product studios. Founders, CTOs, Heads of Engineering; at larger SMBs also the DPO/legal counsel (they already own GDPR and are being handed the AI Act).

**Where to find them:** LinkedIn Sales-style search (title + NL + "AI"), Dealroom/Techleap NL startup lists, KvK sector search, attendee lists of Dutch AI meetups, companies posting "AI engineer" vacancies (proof they're building).

**Volume:** 5/day, personalized (~7 min each). Never blast. Track in a simple sheet: name, company, hook used, date, follow-up dates, outcome.

**Compliance note (eat your own dog food):** cold *email* to companies (B2B) is permitted in NL but must be honest, identify you, and offer opt-out; LinkedIn DMs are safer for first touch. Never scrape emails into a mass tool — one spam complaint hurts a new domain badly. Send from firas@cloudrix.io, plain text, no tracking pixels.

**The offer ladder:** free scanner (self-serve) → free 20-min readout of their scanner result → €2,500 Quick Scan (fixed price, fixed scope, report in ~2 weeks) → audits €8–15K → implementation €25–60K. Cold outreach only ever sells the first two rungs.

**Personalization slots used below:**
`{{first_name}}`, `{{company}}`, `{{their_ai_feature}}` (the specific AI thing they ship — from their website/changelog), `{{scoped_domain}}` (why it may be Annex III: hiring / credit / education / etc.), `{{trigger}}` (recent event: funding, launch, vacancy, LinkedIn post), `{{city}}`.

---

## Template 1 — LinkedIn DM: the deadline-correction opener (best first touch)

**Use when:** their site/blog/docs still references the August 2026 deadline, or they've posted about AI Act prep.

> Hi {{first_name}} — I noticed {{company}}'s {{page/post}} still references the August 2026 AI Act deadline. That moved: the Digital Omnibus (finalized in June) pushed high-risk obligations to 2 December 2027 — though the transparency rules still start this August.
>
> Not pitching anything with this, just flagging it since I work on AI Act implementation and see the old date everywhere.
>
> If it's ever useful: I built a free scanner that classifies AI systems against the updated timeline (no signup) — happy to share the link, or to sanity-check how {{their_ai_feature}} classifies. Either way, good luck with it.

*Why it works: you open by being right and useful, not by selling. High reply rate because it's a genuine correction. If they respond at all, offer the free 20-min readout.*

---

## Template 2 — Email: the "your feature is probably in scope" note

**Use when:** {{their_ai_feature}} plausibly lands on Annex III (hiring, scoring, education access…).

**Subject:** `{{their_ai_feature}} and the AI Act's Annex III — quick question`

> Hi {{first_name}},
>
> I'm Firas, an engineer in {{city == Tilburg ? "Tilburg as well" : "Tilburg"}} running Cloudrix, a one-person EU AI Act implementation studio.
>
> I came across {{company}} via {{trigger}} and looked at {{their_ai_feature}}. Depending on how it's used, it may fall under Annex III of the AI Act ({{scoped_domain}} systems are on the high-risk list). The good news: the compliance deadline for that category just moved to December 2, 2027 — the bad news is that the logging and documentation requirements are the kind you want designed in early, not retrofitted in 2027.
>
> Two no-cost ways I can be useful:
> 1. Our free scanner gives you a risk classification in ~5 minutes (no signup): cloudrix.io/eu-ai-act
> 2. If you run it and want a second pair of eyes, I'll walk through the result with you in 20 minutes, free, no strings.
>
> If it turns out you're out of scope, that's a genuinely useful answer too — and we're done.
>
> Full disclosure of the business model: some companies that turn out high-risk buy a €2,500 fixed-price Quick Scan (gap analysis + prioritized fix list). Most don't need to.
>
> Best,
> Firas Sayah
> Cloudrix — EU AI Act implementation engineering, Tilburg
> cloudrix.io · [unsubscribe: just reply "no thanks" and I won't email again]

---

## Template 3 — Email: the vendor-questionnaire angle (for AI vendors selling B2B)

**Use when:** {{company}} sells an AI product to enterprises/public sector.

**Subject:** `When {{company}}'s customers send the AI Act questionnaire`

> Hi {{first_name}},
>
> Quick observation from the trenches: even though the AI Act's high-risk deadline moved to Dec 2027, enterprise procurement teams are already adding AI Act questions to vendor due diligence — their 2027 compliance depends on their vendors being ready earlier. I've watched deals slow down over a questionnaire no one on the vendor side could answer.
>
> For a company like {{company}} selling {{their_ai_feature}} into {{scoped_domain}}, being able to reply with a documented risk classification and gap analysis is a sales asset about 18 months before it's a legal obligation.
>
> I'm a solo AI Act implementation engineer (Cloudrix, Tilburg). If useful, start free: cloudrix.io/eu-ai-act gives you a classification in 5 minutes. If you want it turned into something you can hand to a prospect's legal team, my €2,500 Quick Scan does exactly that, fixed price, ~2 weeks.
>
> Worth 5 minutes?
>
> Firas

---

## Template 4 — LinkedIn DM: warm-ish follow-up to engagement

**Use when:** they liked/commented on one of your posts, ran the scanner (if identifiable), or you met at a meetup.

> Hi {{first_name}}, thanks for the {{comment on my Art. 12 logging post / chat at {{event}}}}. Since {{company}} builds {{their_ai_feature}}, I'm curious how you're thinking about the AI Act timeline now that high-risk moved to Dec 2027 — most teams I talk to are either over- or under-reacting to the delay.
>
> If it's on your radar: happy to do a free 20-minute readout of where {{their_ai_feature}} likely classifies and what (if anything) is worth doing in 2026. I'm one engineer, not an agency, so this would be a technical conversation, not a sales call with slides.
>
> Either way, enjoyed the exchange.

---

## Template 5 — Email: the DPO/legal counsel angle

**Use when:** contacting the person who owns GDPR at a 50–200 FTE company.

**Subject:** `AI Act scoping — the engineering half of your GDPR playbook`

> Hi {{first_name}},
>
> You presumably own {{company}}'s GDPR posture, which means the AI Act is landing on your desk too — with one difference: a larger share of it is engineering work (Art. 12 decision logging, Art. 14 oversight UX, technical documentation) rather than policy work.
>
> That's the half I do. I'm a senior engineer running Cloudrix, a one-person AI Act implementation studio in Tilburg. I translate the legal obligations into architecture and tickets your dev team can execute — the piece law firms explicitly leave out of their memos.
>
> Post-Digital-Omnibus timeline, in case useful for your planning: high-risk (Annex III) now bites 2 Dec 2027, transparency obligations still 2 Aug 2026, prohibitions already in force.
>
> Free starting point for your AI inventory: cloudrix.io/eu-ai-act (5-minute classification per system, no signup). If a system comes back high-risk, my €2,500 Quick Scan produces the gap analysis you'd want before budgeting 2027.
>
> Would a 20-minute intro call be useful, or shall I just leave the scanner with you?
>
> Firas Sayah — Cloudrix, Tilburg · cloudrix.io
> (Reply "not relevant" and I won't follow up.)

---

## Follow-up sequence (max 3 touches total, then stop)

**Touch 1:** any template above.

**Touch 2 — day 6, reply in same thread, add NEW value (never "just bumping"):**

> Hi {{first_name}} — one addition since my last note: {{new value — e.g. "the Commission published the first draft harmonized standards for risk management" / "wrote a breakdown of how {{scoped_domain}} systems classify, thought of {{company}}: <link>"}}. The free-readout offer stands. If this isn't relevant, a one-word "pass" saves us both time.

**Touch 3 — day 14, the honest close:**

> Last note from me, {{first_name}} — I keep these to three, cold outreach etiquette. If AI Act scoping becomes relevant later: the scanner at cloudrix.io/eu-ai-act stays free, and I'm easy to find. Good luck with {{their_ai_feature}}.

Then: connect on LinkedIn without a pitch, and let the content cadence do the slow work. Re-approach only on a real trigger (their funding round, a relevant regulatory event) after 90+ days.

## What NOT to do

- No fake "Re:" subjects, no fake familiarity, no "I noticed we're both passionate about innovation."
- No claiming clients, team members, or years of AI Act experience — the honest solo-engineer positioning is the differentiator, and this niche is small enough that inflation gets noticed.
- No urgency theater about deadlines — you'd be using the exact outdated tactic the deadline-correction opener (#1) wins against.
