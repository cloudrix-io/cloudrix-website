"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, ArrowLeft, Loader2, Copy, Check, Sparkles } from "lucide-react";

const SAMPLE_CODE = `async function fetchUserOrders(userId: string, options?: {
  status?: 'pending' | 'completed' | 'cancelled';
  limit?: number;
  offset?: number;
}) {
  const params = new URLSearchParams({ userId });
  if (options?.status) params.set('status', options.status);
  if (options?.limit) params.set('limit', String(options.limit));
  if (options?.offset) params.set('offset', String(options.offset));

  const response = await fetch(\`/api/orders?\${params}\`);
  if (!response.ok) throw new Error(\`Failed to fetch orders: \${response.status}\`);
  return response.json();
}`;

const DEMO_DOCS: Record<string, string> = {
  jsdoc: `/**
 * Fetches orders for a specific user with optional filtering and pagination.
 *
 * @async
 * @function fetchUserOrders
 * @param {string} userId - The unique identifier of the user whose orders to fetch.
 * @param {Object} [options] - Optional configuration for filtering and pagination.
 * @param {'pending'|'completed'|'cancelled'} [options.status] - Filter orders by status.
 * @param {number} [options.limit] - Maximum number of orders to return.
 * @param {number} [options.offset] - Number of orders to skip for pagination.
 * @returns {Promise<Object>} The parsed JSON response containing the user's orders.
 * @throws {Error} Throws if the API request fails (non-2xx status code).
 *
 * @example
 * // Fetch all orders for a user
 * const orders = await fetchUserOrders('user-123');
 *
 * @example
 * // Fetch completed orders with pagination
 * const completed = await fetchUserOrders('user-123', {
 *   status: 'completed',
 *   limit: 10,
 *   offset: 20
 * });
 */`,
  python: `"""Fetch orders for a specific user with optional filtering and pagination.

Args:
    user_id (str): The unique identifier of the user whose orders to fetch.
    options (dict, optional): Configuration for filtering and pagination.
        - status (str): Filter by 'pending', 'completed', or 'cancelled'.
        - limit (int): Maximum number of orders to return.
        - offset (int): Number of orders to skip for pagination.

Returns:
    dict: Parsed JSON response containing the user's orders.

Raises:
    HTTPError: If the API request fails with a non-2xx status code.

Examples:
    >>> orders = await fetch_user_orders('user-123')
    >>> completed = await fetch_user_orders('user-123', {
    ...     'status': 'completed',
    ...     'limit': 10
    ... })
"""`,
  openapi: `paths:
  /api/orders:
    get:
      summary: Fetch user orders
      description: Retrieves orders for a specific user with optional filtering and pagination.
      parameters:
        - name: userId
          in: query
          required: true
          schema:
            type: string
          description: The unique identifier of the user.
        - name: status
          in: query
          required: false
          schema:
            type: string
            enum: [pending, completed, cancelled]
          description: Filter orders by status.
        - name: limit
          in: query
          required: false
          schema:
            type: integer
          description: Maximum number of orders to return.
        - name: offset
          in: query
          required: false
          schema:
            type: integer
          description: Number of orders to skip for pagination.
      responses:
        '200':
          description: Successful response with user orders.
        '400':
          description: Invalid parameters.
        '500':
          description: Internal server error.`,
  markdown: `## \`fetchUserOrders(userId, options?)\`

Fetches orders for a specific user with optional filtering and pagination.

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`userId\` | \`string\` | Yes | The unique identifier of the user |
| \`options.status\` | \`'pending' \\| 'completed' \\| 'cancelled'\` | No | Filter orders by status |
| \`options.limit\` | \`number\` | No | Maximum number of orders to return |
| \`options.offset\` | \`number\` | No | Number of orders to skip (pagination) |

### Returns

\`Promise<Object>\` — Parsed JSON response containing the user's orders.

### Throws

\`Error\` — If the API returns a non-2xx status code.

### Example

\`\`\`typescript
const orders = await fetchUserOrders('user-123');
const page2 = await fetchUserOrders('user-123', { limit: 10, offset: 10 });
\`\`\``,
};

const STYLES = [
  { value: "jsdoc", label: "JSDoc" },
  { value: "python", label: "Python Docstring" },
  { value: "openapi", label: "OpenAPI (YAML)" },
  { value: "markdown", label: "Markdown" },
];

export default function AIDocGeneratorDemo() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [style, setStyle] = useState("jsdoc");
  const [documentation, setDocumentation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [error, setError] = useState("");

  const generateDocs = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setError("");
    setDocumentation("");

    try {
      const response = await fetch("/api/products/doc-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, style }),
      });

      if (response.status === 429) {
        setError("Rate limit reached. Please try again later.");
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.demo) {
        setIsDemoMode(true);
        setDocumentation(DEMO_DOCS[style] || DEMO_DOCS.markdown);
      } else if (data.documentation) {
        setDocumentation(data.documentation);
      } else if (data.error) {
        setError(data.error);
      }
    } catch {
      setIsDemoMode(true);
      setDocumentation(DEMO_DOCS[style] || DEMO_DOCS.markdown);
    }

    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(documentation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products/ai-doc-generator"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Doc Generator</h1>
              <p className="text-sm text-muted-foreground">
                Paste code, get instant documentation
                {isDemoMode && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    <Sparkles className="h-3 w-3" /> Demo Mode
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Your Code
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={16}
                placeholder="Paste your function, class, or code snippet here..."
                className="w-full rounded-xl border border-card-border bg-card-bg p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 resize-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Documentation Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStyle(s.value)}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      style === s.value
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                        : "border-card-border bg-card-bg text-muted-foreground hover:border-emerald-300 hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateDocs}
              disabled={!code.trim() || isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-medium text-white hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Generate Documentation
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">
                Generated Documentation
              </label>
              {documentation && (
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-card-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-green-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="min-h-[400px] rounded-xl border border-card-border bg-slate-900 p-4 font-mono text-sm text-green-400 overflow-auto whitespace-pre-wrap">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                </div>
              ) : error ? (
                <p className="text-red-400">{error}</p>
              ) : documentation ? (
                documentation
              ) : (
                <p className="text-slate-500">
                  Documentation will appear here after generation...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-xl border border-card-border bg-card-bg p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Want full codebase documentation?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            We can generate comprehensive documentation for your entire codebase with our enterprise solution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
