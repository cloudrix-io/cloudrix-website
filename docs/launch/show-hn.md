# Show HN Post

## Prerequisites (do not skip)

- Post from your **personal** account, not a fresh "cloudrix" account. Zero-karma accounts get Show HN posts auto-flagged (documented cases in 2026). Build ~2 weeks of genuine commenting first.
- Timing: Tuesday–Thursday, 9:00–12:00 ET (15:00–18:00 CET). Stay at the keyboard for 3 hours after posting.
- The scanner must work with **no signup and no email wall** — HN will test it within minutes and an email gate is the #1 flag/complaint trigger for compliance tools.
- If it dies (most do), you may repost once after ~a week with a tweaked title; HN tolerates one thoughtful retry.

## Title

```
Show HN: EU AI Act risk classifier, updated for the new Dec 2027 deadline
```

Alternates:
- `Show HN: A free EU AI Act self-assessment tool (post-Digital-Omnibus)`
- `Show HN: I mapped the EU AI Act's risk rules into a decision tree`

No adjectives, no "revolutionary," no emoji. The Dec 2027 hook works because most of HN heard the deadline moved but doesn't know the details — the title itself is informative.

## Post text

```
I'm a software engineer in the Netherlands. Earlier this year I started doing
EU AI Act implementation work, and the first hour of every conversation was
identical: walking someone through whether the Act applies to them at all,
and at which risk tier. So I turned that hour into a tool.

You describe your AI system (what it does, what domain, who it affects,
how much autonomy it has) and it maps your answers against the Act's risk
categories — prohibited practices (Art. 5), the Annex III high-risk list,
limited-risk transparency cases (Art. 50), or minimal risk. You get the
classification, the specific obligations, and the dates they apply.

The dates part matters more than it sounds. In June the EU finalized the
"Digital Omnibus," which moved the high-risk deadline from August 2026 to
December 2, 2027 (August 2028 for AI embedded in already-regulated products
like medical devices). But prohibitions have applied since February 2025,
GPAI rules since August 2025, and most transparency obligations still start
this August. Almost every article and tool I found — including the
Commission's own beta checker in some places — still shows the old timeline.
Keeping the dates right is half the tool's value.

How it works: it's deliberately not an LLM wrapper. Classification is a
hand-built decision tree derived from the Act's text, because I wanted
deterministic, explainable output — the same inputs always give the same
answer, and each result cites the articles it's based on. An LLM
hallucinating a risk tier would be worse than no tool.

Limitations, honestly: it's a structured self-assessment, not legal advice.
It handles the common cases (SaaS using AI for hiring, scoring, biometrics,
customer-facing chatbots) well; Annex I embedded systems and GPAI provider
obligations are covered only at a "you need a specialist" level. And the
questionnaire is only as honest as the person filling it in.

The business model, since HN will ask: the scanner is free, no signup.
I'm a solo consultancy and I sell the implementation engineering
(documentation, logging, human-oversight tooling) to the minority who turn
out to be high-risk and want help. The tool is the top of that funnel, but
it's useful on its own and I intend to keep it free.

I'd appreciate being told where the classification logic is wrong — that's
the feedback that actually improves it.

https://cloudrix.io/eu-ai-act (no signup required)
```

## Comment-handling notes

- Expect: "this is legal advice liability," "why not just read the Act," "EU regulation is strangling innovation" (don't take the political bait — one neutral reply, move on), and detailed corrections from actual compliance lawyers (goldmine — engage deeply, update the tool, say so in-thread).
- Never argue. "You're right, that's a gap — fixed/added to the list" earns more than any defense.
- If someone finds a wrong classification, fix it same-day if possible and reply that you did. HN loves watching a tool improve mid-thread.
```
