import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const PAGES_TO_AUDIT = [
  { path: "/", name: "home" },
  { path: "/services", name: "services" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/case-studies", name: "case-studies" },
  { path: "/how-we-work", name: "how-we-work" },
];

interface AuditResult {
  page: string;
  url: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  status: "pass" | "warning" | "fail";
}

async function runLighthouseAudit(url: string, name: string): Promise<AuditResult | null> {
  const outputPath = path.join(process.cwd(), "seo-reports", `${name}.json`);

  try {
    console.log(`  Auditing ${url}...`);

    await execAsync(
      `npx lighthouse ${url} --output json --output-path ${outputPath} --only-categories=seo,performance,accessibility,best-practices --chrome-flags="--headless --no-sandbox" --quiet`,
      { timeout: 120000 }
    );

    const report = JSON.parse(fs.readFileSync(outputPath, "utf-8"));

    const scores = {
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100),
      bestPractices: Math.round(report.categories["best-practices"].score * 100),
      seo: Math.round(report.categories.seo.score * 100),
    };

    const avgScore = (scores.performance + scores.accessibility + scores.bestPractices + scores.seo) / 4;

    return {
      page: name,
      url,
      scores,
      status: avgScore >= 90 ? "pass" : avgScore >= 70 ? "warning" : "fail",
    };
  } catch (error) {
    console.error(`  Error auditing ${name}:`, error);
    return null;
  }
}

function printScoreBar(score: number, label: string): string {
  const filled = Math.round(score / 5);
  const empty = 20 - filled;
  const color = score >= 90 ? "\x1b[32m" : score >= 70 ? "\x1b[33m" : "\x1b[31m";
  const reset = "\x1b[0m";
  return `  ${label.padEnd(15)} ${color}${"█".repeat(filled)}${"░".repeat(empty)}${reset} ${score}%`;
}

async function main() {
  console.log("\n🔍 CLOUDRIX SEO AUDIT");
  console.log("=".repeat(50));
  console.log(`\nBase URL: ${BASE_URL}`);
  console.log(`Pages to audit: ${PAGES_TO_AUDIT.length}\n`);

  // Create reports directory
  const reportsDir = path.join(process.cwd(), "seo-reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const results: AuditResult[] = [];

  for (const page of PAGES_TO_AUDIT) {
    const result = await runLighthouseAudit(`${BASE_URL}${page.path}`, page.name);
    if (result) {
      results.push(result);
    }
  }

  // Print Results
  console.log("\n" + "=".repeat(50));
  console.log("📊 AUDIT RESULTS");
  console.log("=".repeat(50) + "\n");

  let totalSeo = 0;
  let totalPerf = 0;
  let totalA11y = 0;
  let totalBp = 0;

  for (const result of results) {
    const statusIcon = result.status === "pass" ? "✅" : result.status === "warning" ? "⚠️" : "❌";
    console.log(`\n${statusIcon} ${result.page.toUpperCase()} (${result.url})`);
    console.log("-".repeat(40));
    console.log(printScoreBar(result.scores.seo, "SEO"));
    console.log(printScoreBar(result.scores.performance, "Performance"));
    console.log(printScoreBar(result.scores.accessibility, "Accessibility"));
    console.log(printScoreBar(result.scores.bestPractices, "Best Practices"));

    totalSeo += result.scores.seo;
    totalPerf += result.scores.performance;
    totalA11y += result.scores.accessibility;
    totalBp += result.scores.bestPractices;
  }

  // Summary
  const count = results.length;
  console.log("\n" + "=".repeat(50));
  console.log("📈 OVERALL AVERAGES");
  console.log("=".repeat(50));
  console.log(printScoreBar(Math.round(totalSeo / count), "SEO"));
  console.log(printScoreBar(Math.round(totalPerf / count), "Performance"));
  console.log(printScoreBar(Math.round(totalA11y / count), "Accessibility"));
  console.log(printScoreBar(Math.round(totalBp / count), "Best Practices"));

  // Recommendations
  console.log("\n" + "=".repeat(50));
  console.log("💡 QUICK WINS");
  console.log("=".repeat(50));

  const avgSeo = totalSeo / count;
  if (avgSeo < 90) {
    console.log("\n🔍 SEO Improvements:");
    console.log("   • Add meta descriptions to all pages (done ✓)");
    console.log("   • Ensure all images have alt text");
    console.log("   • Add structured data (JSON-LD) (done ✓)");
    console.log("   • Submit sitemap to Google Search Console");
  }

  const avgPerf = totalPerf / count;
  if (avgPerf < 90) {
    console.log("\n⚡ Performance Improvements:");
    console.log("   • Optimize images (use next/image)");
    console.log("   • Enable compression (gzip/brotli)");
    console.log("   • Minimize JavaScript bundles");
    console.log("   • Use CDN for static assets");
  }

  console.log("\n📁 Detailed reports saved to: ./seo-reports/");
  console.log("\n");
}

main().catch(console.error);
