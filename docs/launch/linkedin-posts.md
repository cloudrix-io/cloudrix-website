# LinkedIn Posts — Founder Voice (10 posts)

Cadence: 3×/week, Tue/Wed/Thu 8:00–9:30 CET. Plus 10–15 genuine comments/day on AI-governance and legal posts — for a zero-audience account, commenting drives more profile visits than posting. No engagement pods, no "comment YES for the PDF" bait (LinkedIn's 2026 authenticity update actively penalizes both). First line is the hook — it's all people see before "…see more."

Voice rules: first person singular ("I", never "we" — you're solo and that's the differentiator). No fake urgency. Correct dates only: high-risk Annex III = **Dec 2, 2027**; Annex I embedded = Aug 2, 2028; prohibitions + AI literacy live since Feb 2025; GPAI since Aug 2025; most transparency from Aug 2, 2026.

---

## Post 1 — Newsjack: the delay, decoded (publish first, window is closing)

The EU AI Act deadline moved 16 months. Most of the advice I've seen since is wrong in both directions.

Two weeks ago the Council gave final approval to the Digital Omnibus. The high-risk deadline moved from August 2026 to December 2, 2027. Since then I've heard two reactions:

"Great, we can park compliance until 2027." Wrong.
"Nothing changes, keep panicking." Also wrong.

What actually changed, in engineering terms:

→ Still live TODAY: prohibited practices and AI-literacy obligations (since Feb 2025). If your system does social scoring or emotion recognition at work, the delay does nothing for you.
→ Still coming THIS August: most transparency obligations. Chatbots must disclose they're AI. Deepfakes must be labeled.
→ Moved to Dec 2, 2027: the heavy high-risk requirements — risk management systems, logging, technical documentation, human oversight (Annex III systems).
→ Moved to Aug 2028: AI embedded in regulated products (medical devices, machinery).

The requirements didn't shrink. You got runway. The teams that use it to build logging and documentation into their architecture will spend a fraction of what the December-2027 panic crowd will pay.

I put the full revised timeline in a free self-assessment tool — link in comments.

What's your team doing with the extra 16 months?

---

## Post 2 — Newsjack: what the delay means for your roadmap

"The deadline moved to 2027, so we deprioritized it." I've heard this three times this month. Here's the roadmap math on why that's expensive.

Say you deploy a high-risk system — AI-assisted hiring, credit scoring, anything on Annex III.

By December 2, 2027 you need, among other things:
- A risk management system that runs across the lifecycle (Art. 9)
- Automatic event logging (Art. 12)
- Technical documentation that regulators can actually read (Art. 11)
- Human oversight that's designed in, not bolted on (Art. 14)

Here's the thing about logging and documentation: retrofitting them onto a system built without them is a rewrite, not a patch. If your model pipeline doesn't capture the data needed for Art. 12 logs today, you can't reconstruct it later.

16 months sounds long. Subtract: procurement cycles, one annual planning round, testing, and the consultancy price surge that will hit in mid-2027 when everyone wakes up at once. (We watched exactly this movie with GDPR in 2017–2018.)

The cheap version of compliance is the one you design in during 2026.

I'm a solo engineer doing exactly this work — starting with a €2,500 Quick Scan that tells you what's actually affected. But even if you never talk to me: don't let "delayed" become "deleted" in your backlog.

---

## Post 3 — Newsjack/contrarian: who the delay actually helps

Unpopular opinion: the EU AI Act delay is bad news for companies that were ready, and a gift to their competitors.

If you spent 2025 preparing for the August 2026 high-risk deadline, the Digital Omnibus just handed your slower competitors 16 free months. That's genuinely annoying.

But here's what didn't change: your customers' procurement teams.

Enterprise buyers were already adding AI Act clauses to vendor contracts in 2025. They're not rolling those back because Brussels moved a date. "Are you AI Act ready?" stays on the RFP — because the buyer's own 2027 obligations depend on their vendors being ready earlier.

So the real deadline for AI vendors selling B2B in the EU isn't December 2, 2027. It's whenever your biggest prospect's legal team sends the questionnaire.

I've started seeing these questionnaires. Most vendors answer them badly, in a panic, the week before a deal closes.

Being able to answer with a documented risk classification and a gap analysis is a sales asset today, 18 months before it's a legal requirement.

That's a much better reason to do a compliance scan than fear of fines.

---

## Post 4 — Technical teardown: risk classification

I spent a weekend turning Annex III of the EU AI Act into a decision tree. Here's what surprised me.

Building a classification tool forces you to read the Act the way a compiler reads code — no skimming, every edge case matters.

Three things most summaries get wrong:

1. "High-risk" is about USE, not technology. The same résumé-parsing model is high-risk when it filters candidates and minimal-risk when it routes support tickets. You classify systems in context, not models.

2. The Annex III list is narrower than the panic suggests — but sneakier. "AI in education" isn't high-risk. AI that determines access to education, evaluates learning outcomes, or proctors exams is. The verbs matter.

3. There's an escape hatch almost nobody mentions: Art. 6(3). If your Annex III system only does narrow procedural tasks or preparatory work for human assessment, you may be out of high-risk scope — but you must document that assessment and register it. "We decided we're exempt" without paperwork is not a position you want to defend.

The uncomfortable conclusion: most companies can't answer "are we high-risk?" without doing structured analysis. Gut feeling classifies wrong in both directions — I've seen teams over-comply on minimal-risk chatbots while their hiring tool sat unexamined.

I built the decision tree into a free scanner (comments). Deterministic, cites its articles, no LLM guessing your legal status.

---

## Post 5 — Technical teardown: Article 12 logging

The most underestimated line in the EU AI Act is one sentence about logging. Here's the engineering behind it.

Art. 12: high-risk AI systems must "technically allow for the automatic recording of events" across their lifetime.

Sounds like "add a logger." It isn't. Unpacked, it means:

→ Traceability per decision: which model version, which input, which confidence, which human (if any) overrode it
→ Retention: logs kept for a period appropriate to the system's purpose — with GDPR data-minimization pulling in the opposite direction (fun tension to architect around)
→ Tamper-evidence: logs a regulator will trust, not a mutable Postgres table someone can UPDATE

If you run ML in production, your current setup probably logs infrastructure events (requests, latency, errors) but not decision provenance. Those are different systems.

The good news for people building now: this is a solved architecture problem. Event-sourced decision records, versioned model registry, append-only storage. If you design it in, it's a moderate change. If you retrofit it in Q3 2027, it touches every service in the pipeline.

This is exactly the kind of gap a compliance audit finds while it's still cheap to fix. It's also — deadline aside — just good MLOps. You want decision provenance the first time a customer disputes an AI decision, regulation or not.

---

## Post 6 — Technical teardown: human oversight (Art. 14)

"A human reviews every AI decision" — the compliance claim that falls apart fastest under audit.

Art. 14 of the EU AI Act requires effective human oversight for high-risk systems. Most teams think they have it. Here's the test I use:

Pull the last 200 AI recommendations your "human in the loop" reviewed. What % did they override?

If it's near 0%, you don't have oversight — you have a rubber stamp. Regulators know about automation bias; the Act explicitly requires oversight that lets humans "remain aware of the possible tendency of automatically relying" on AI output. A checkbox UI doesn't achieve that.

What actual Art. 14 oversight looks like in software:

→ The interface shows the AI's confidence and the case-specific factors, not just the verdict
→ Overriding is as easy as accepting (if override takes 6 clicks and accept takes 1, you engineered a rubber stamp)
→ Override rates are monitored — near-zero triggers a design review
→ The overseer has real authority and documented training (AI literacy — already mandatory since Feb 2025)

Notice these are UX and engineering decisions, not legal ones. That's the thing about the AI Act nobody tells you: after the lawyers scope it, ~80% of the work is software.

That's the gap I work in.

---

## Post 7 — Free tool announcement

I built a free EU AI Act scanner because I was tired of giving the same hour-long explanation.

Every conversation about the AI Act starts identically: "Does it even apply to us?" And the honest answer requires walking through the same questions — what does the system do, in which domain, affecting whom, with how much autonomy.

So I encoded that hour into a tool:

→ ~5 minutes of plain-language questions about your AI system
→ Output: risk tier (prohibited / high / limited / minimal), the specific obligations, and the post-Omnibus dates they bite — Dec 2, 2027 for Annex III high-risk, not the outdated August 2026 you'll still find all over Google
→ Free. No signup. No email wall. Not legal advice — a structured starting point.

Why free with no gate? Because I'm a solo consultancy nobody has heard of, and the fastest way to earn trust is to be useful before asking for anything. Some fraction of high-risk results will want implementation help. That's the whole model, transparently.

Built as a deterministic decision tree citing the Act's articles — not an LLM improvising your legal status.

Link in the first comment. If you run your system through it and disagree with the result, tell me — correcting the tree is the most useful feedback I can get.

---

## Post 8 — Solo founder honest post (save for after launches; add real numbers)

I started a compliance engineering business with zero clients, zero audience, and a name six other companies already use. Here's the honest version.

In January I registered cloudrix.io. I'm a senior engineer with a full-time job, building this on mornings and evenings from Tilburg.

What I have: a decade of production engineering, deep time in the EU AI Act's text, a free scanner people are actually using [update with real number], and a service ladder I believe in — €2,500 Quick Scan up to full implementation.

What I don't have: case studies, a team, a sales function, or any right to pretend otherwise. You'd talk to me, the person who writes the code. That's either exactly what you want or a dealbreaker — both are fine.

Why say this publicly? Because the AI compliance space is filling up with agencies claiming armies of experts and years of AI Act experience — for a law whose main obligations haven't even applied yet. Nobody has years of AI Act implementation experience. It's day one for everyone. I'd rather compete on being honest and technical than on theater.

If you're deploying AI in the EU and want an engineer's read on where you stand: the scanner is free, and the worst case is you lose five minutes.

[Scanner link in comments]

---

## Post 9 — GDPR parallel / lessons post

GDPR fined companies €5.9 billion so far. Almost none of it went to companies that started early. The AI Act will rhyme.

I watched GDPR preparation from inside engineering teams in 2017–2018. The pattern:

2016–early 2017: "Two years away, legal will handle it."
Late 2017: "We should probably map our data flows."
Q2 2018: consultancy day rates doubled; everyone shipped panic-compliance that took years to clean up.

The AI Act just got its own version of that grace period — high-risk obligations moved to December 2, 2027. Which means right now is the AI Act's "early 2017": the moment that looks safely far away and is actually the cheap window.

Three GDPR lessons that transfer directly:

1. Inventory first. Companies didn't know what personal data they held; today they don't know what AI systems they run. (Shadow AI is worse than shadow IT — every SaaS tool added an "AI feature" this year.)
2. Documentation debt compounds. The teams that documented as they built sailed through audits. The rest reverse-engineered their own systems.
3. The market rewarded early movers commercially. "GDPR-ready" won deals in 2018. "AI-Act-ready" is already appearing in RFPs.

Step one costs nothing: know your classification. Free scanner in comments.

---

## Post 10 — Engagement/discussion post

Question for people building AI products in the EU: what's actually blocking your AI Act preparation?

I've now had this conversation enough times to see patterns, and the blockers are rarely what the compliance industry advertises. Rough tally from my last 15 conversations [adjust to reality]:

1. "We don't know which of our systems are even in scope" — by far the most common. Not the requirements. Scope.
2. "Legal and engineering don't share a language" — lawyers scoped obligations, nobody translated them into tickets.
3. "Our AI vendor says they handle it" — they mostly don't; deployer obligations are yours, and if you substantially modify or white-label the system you may become the provider.
4. "Waiting for the harmonized standards" — fair, they're still in progress at CEN-CENELEC, but architecture-level prep (logging, documentation, oversight design) doesn't depend on them.
5. Honest indifference — "December 2027 is three planning cycles away."

I'm genuinely curious whether this matches what others see. If you're in an AI team in the EU: which number are you?

(And if it's #1 — that's literally a 5-minute fix. Free scanner in my featured section.)

---

## Posting notes

- Links always in the first comment, never the post body (2026 algorithm demotes external links in posts).
- Attach a simple graphic to posts 1, 4, 5, 9 (timeline chart / decision-tree snippet / log-schema diagram) — image posts get ~2× engagement, and a carousel of the revised timeline is the single most shareable asset you can make.
- Reply to every comment within 2 hours where possible; ask one follow-up question back.
- Posts 1–3 (newsjack) go out in week 1 while the Omnibus is fresh. Post 8 waits for real numbers.
