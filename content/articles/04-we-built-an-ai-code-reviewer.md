---
title: "We Built an AI Code Reviewer — Here's How It Works"
published: true
description: "A technical deep-dive into building an AI-powered code review tool: architecture decisions, prompt engineering, handling 7 languages, and what AI catches that linters miss."
tags: ai, programming, architecture, webdev
canonical_url: https://www.cloudrix.io/products/ai-code-reviewer/demo
cover_image:
series:
---

# We Built an AI Code Reviewer -- Here's How It Works

Our AI Code Reviewer (CodeScan AI) is the most-used tool in our free product suite. Developers paste code, select a language, and get a detailed review covering security vulnerabilities, performance bottlenecks, and architectural anti-patterns in seconds.

It supports JavaScript, TypeScript, Python, Go, Java, PHP, and Rust. It processes up to 10,000 characters per review. It's free with no signup.

Here's how we built it.

## The Architecture

The system is deceptively simple. Three components:

```
[Browser] --> [Next.js API Route] --> [Claude API]
                    |
              [Rate Limiter]
```

The frontend is a Next.js page with a code editor (Monaco-based), a language selector, and a results panel. The API route handles validation, rate limiting, and LLM communication. Claude does the actual analysis.

There's no database for the core flow. No user accounts. No persistent storage of submitted code. Code goes in, review comes out, nothing is saved.

### Why No Database?

Two reasons. First, privacy. Developers are submitting proprietary code. Storing it creates liability. By processing everything in-memory and discarding it after the response, we eliminated an entire category of security concerns.

Second, simplicity. A stateless architecture means zero database maintenance, no migrations, no backup strategy, no GDPR data deletion requests. The entire tool runs on Vercel's serverless infrastructure with no external dependencies beyond the Claude API.

## The Prompt Engineering

The quality of an AI code reviewer lives and dies in the prompt. Here's our approach (simplified):

### System Prompt Structure

We use a structured system prompt with four sections:

**1. Role definition:** The AI acts as a senior engineer with expertise in the specific language being reviewed. This isn't fluff — it measurably improves output quality. Telling Claude "you are a senior Go engineer" produces different (and better) Go reviews than a generic "review this code" prompt.

**2. Analysis framework:** We define exactly what to look for, in priority order:

- Critical security vulnerabilities (injection, auth bypass, data exposure)
- Performance issues (N+1 queries, memory leaks, unnecessary allocations)
- Architectural concerns (tight coupling, missing abstractions, SOLID violations)
- Code quality (naming, complexity, error handling, edge cases)
- Language-specific idioms (Pythonic patterns, Go conventions, Rust ownership)

**3. Output format:** We specify the exact structure of the response — severity levels, categories, line references, code suggestions. This ensures consistent, parseable output across different code submissions.

**4. Calibration instructions:** We explicitly tell the model to avoid false positives. "Only flag issues you are confident about. If something might be a problem depending on context you cannot see, note it as a suggestion rather than a warning." This was critical for user trust.

### Language-Specific Prompts

Each of the seven supported languages gets a tailored prompt addendum. For example:

- **Python:** Check for mutable default arguments, missing type hints in function signatures, bare except clauses, f-string injection risks
- **Go:** Check for unchecked errors, goroutine leaks, race conditions, missing context propagation
- **Rust:** Check for unsafe blocks, unnecessary clones, lifetime issues, missing error propagation with `?`
- **TypeScript:** Check for `any` types, missing null checks, improper async/await, type assertion abuse

These language-specific rules catch issues that a generic "review this code" prompt would miss entirely.

## What AI Catches That Linters Miss

A fair question: why not just use ESLint, pylint, or `go vet`?

Linters are great at enforcing style rules and catching syntax-level issues. AI code review catches a different class of problems:

### 1. Logic Errors

```python
def calculate_discount(price, discount_percent):
    if discount_percent > 1:
        discount_percent = discount_percent / 100
    return price * discount_percent  # Bug: should be price * (1 - discount_percent)
```

No linter catches this. The code is syntactically correct. The types are fine. But the business logic is wrong — it returns the discount amount instead of the discounted price. Claude catches it every time.

### 2. Security Issues in Context

```javascript
app.get('/api/user/:id', async (req, res) => {
  const user = await db.users.findById(req.params.id);
  res.json(user);
});
```

A linter sees nothing wrong. An AI reviewer flags: no authentication check, no authorization (any user can access any other user's data), no input validation on the ID parameter, and the response might include sensitive fields (password hash, email, etc.) that should be filtered.

### 3. Performance Anti-Patterns

```python
results = []
for item in items:
    result = expensive_api_call(item)
    results.append(result)
```

Syntactically fine. But the AI flags: this should use `asyncio.gather()` or `concurrent.futures` for parallel execution. With 100 items and a 200ms API call each, sequential execution takes 20 seconds versus 200ms concurrent.

### 4. Architectural Concerns

The AI can identify when a function is doing too many things, when a class has too many responsibilities, or when a module has circular dependencies — judgments that require understanding intent rather than matching patterns.

## Handling Edge Cases

### Code That's Too Short

Users sometimes paste a single function. Without surrounding context, many issues aren't detectable. We handle this by adjusting the prompt: "You're reviewing a code snippet. Note where additional context would change your assessment." This produces honest reviews that acknowledge their limitations.

### Code That's Too Long

The 10,000-character limit exists for two reasons: Claude API costs and response quality. Beyond 10K characters, the review quality degrades — the model tries to address everything and ends up being superficial about each issue. Shorter, focused reviews are more useful.

### Adversarial Input

People submit intentionally broken code, obfuscated code, and code in languages we don't support. We handle this gracefully — the model identifies what it can and explicitly states when it can't provide a reliable review. No hallucinated feedback.

### Mixed Languages

A JavaScript file with embedded SQL, HTML templates with inline CSS and JS, Python with shell commands. Real code is messy. We don't try to force single-language analysis. The prompt instructs Claude to review all code present, noting which language each finding applies to.

## Rate Limiting Strategy

Free tools attract abuse. Our rate limiting uses three layers:

1. **IP-based:** Maximum 10 reviews per hour per IP address
2. **Payload-based:** Maximum 10,000 characters per submission
3. **Cost ceiling:** Daily API spend cap that gracefully degrades to a "service busy" message

We haven't had to implement account-based limits because the IP rate limit is sufficient for legitimate use while preventing automated abuse.

## Performance

Typical request lifecycle:

- Client to server: ~50ms
- Input validation and rate check: ~5ms
- Claude API call: 3-8 seconds (depending on code length and complexity)
- Response formatting: ~10ms
- Server to client: ~50ms
- **Total: 3-9 seconds**

The Claude API call dominates. We experimented with streaming the response (showing results as they generate), but found users prefer a complete, formatted report over a streaming wall of text for this use case.

## What We'd Build Next

If we were to rebuild CodeScan AI from scratch:

**Repository integration.** Instead of pasting snippets, connect a GitHub repo and review PRs automatically. This is the number one feature request.

**Historical tracking.** Show developers how their code quality changes over time. This requires user accounts, which we've intentionally avoided, but the value proposition is strong.

**Custom rule sets.** Let teams define their own conventions and have the AI enforce them alongside its built-in analysis. "In our codebase, all API handlers must validate input with Zod" — that kind of project-specific knowledge.

**CI/CD integration.** Run CodeScan AI as a GitHub Action that comments on pull requests. The infrastructure for this is straightforward; the challenge is managing API costs at scale.

## Try It

The tool is live at [cloudrix.io/products/ai-code-reviewer/demo](https://www.cloudrix.io/products/ai-code-reviewer/demo). Paste any code snippet, pick your language, and see what it finds. No signup, no email, no cost.

If it finds something useful in your code that your linter missed, that's the point.

---

*Cloudrix is a cloud and AI engineering consultancy based in the Netherlands. We build AI-powered tools, cloud infrastructure, and full-stack applications for companies worldwide. Explore all 24 free tools at [cloudrix.io/products](https://www.cloudrix.io/products).*
