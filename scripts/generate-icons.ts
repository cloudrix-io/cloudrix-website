import sharp from "sharp";
import { writeFileSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = join(__dirname, "../public");

function iconSvg(size: number, maskable = false): string {
  const bgRadius = maskable ? 0 : size * 0.18;
  const fontSize = maskable ? size * 0.42 : size * 0.5;
  const bg = maskable
    ? `<rect width="${size}" height="${size}" fill="#2563eb"/>`
    : `<rect width="${size}" height="${size}" rx="${bgRadius}" fill="#2563eb"/>`;

  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    ${bg}
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial,Helvetica,sans-serif" font-weight="bold"
      font-size="${fontSize}" fill="white">C</text>
  </svg>`;
}

function logoSvg(): string {
  return `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="40" width="432" height="432" rx="60" fill="#2563eb"/>
    <text x="256" y="280" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial,Helvetica,sans-serif" font-weight="bold"
      font-size="280" fill="white">C</text>
  </svg>`;
}

function ogImageSvg(): string {
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1e40af"/>
        <stop offset="100%" stop-color="#2563eb"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <!-- Grid pattern -->
    <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
      ${Array.from({ length: 30 }, (_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="630"/>`).join("")}
      ${Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="${i * 40}" x2="1200" y2="${i * 40}"/>`).join("")}
    </g>
    <!-- Logo icon -->
    <rect x="80" y="80" width="80" height="80" rx="16" fill="rgba(255,255,255,0.15)"/>
    <text x="120" y="125" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial,Helvetica,sans-serif" font-weight="bold"
      font-size="48" fill="white">C</text>
    <!-- Company name -->
    <text x="80" y="240" font-family="Arial,Helvetica,sans-serif" font-weight="bold"
      font-size="72" fill="white">Cloudrix</text>
    <!-- Tagline -->
    <text x="80" y="300" font-family="Arial,Helvetica,sans-serif"
      font-size="32" fill="rgba(255,255,255,0.8)">AI &amp; Cloud Engineering for EU Companies</text>
    <!-- Bottom bar -->
    <rect y="510" width="1200" height="120" fill="rgba(255,255,255,0.08)"/>
    <text x="150" y="575" text-anchor="middle" font-family="Arial,Helvetica,sans-serif"
      font-size="22" fill="rgba(255,255,255,0.7)">50+ Projects</text>
    <text x="400" y="575" text-anchor="middle" font-family="Arial,Helvetica,sans-serif"
      font-size="22" fill="rgba(255,255,255,0.7)">AI &amp; Cloud</text>
    <text x="650" y="575" text-anchor="middle" font-family="Arial,Helvetica,sans-serif"
      font-size="22" fill="rgba(255,255,255,0.7)">EU-Based</text>
    <text x="900" y="575" text-anchor="middle" font-family="Arial,Helvetica,sans-serif"
      font-size="22" fill="rgba(255,255,255,0.7)">Senior Engineers</text>
    <text x="1100" y="575" text-anchor="middle" font-family="Arial,Helvetica,sans-serif"
      font-size="22" fill="rgba(255,255,255,0.7)">GDPR Ready</text>
  </svg>`;
}

function shortcutSvg(letter: string): string {
  return `<svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
    <circle cx="48" cy="48" r="48" fill="#2563eb"/>
    <text x="48" y="52" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial,Helvetica,sans-serif" font-weight="bold"
      font-size="48" fill="white">${letter}</text>
  </svg>`;
}

async function generate() {
  console.log("Generating icons with sharp...\n");

  // PWA icons
  await sharp(Buffer.from(iconSvg(192))).png().toFile(join(PUBLIC_DIR, "icon-192.png"));
  await sharp(Buffer.from(iconSvg(512))).png().toFile(join(PUBLIC_DIR, "icon-512.png"));
  await sharp(Buffer.from(iconSvg(192, true))).png().toFile(join(PUBLIC_DIR, "icon-maskable-192.png"));
  await sharp(Buffer.from(iconSvg(512, true))).png().toFile(join(PUBLIC_DIR, "icon-maskable-512.png"));
  console.log("  PWA icons (192, 512, maskable): done");

  // Logo
  await sharp(Buffer.from(logoSvg())).png().toFile(join(PUBLIC_DIR, "logo.png"));
  console.log("  logo.png (512x512): done");

  // OG fallback image
  await sharp(Buffer.from(ogImageSvg())).png().toFile(join(PUBLIC_DIR, "og-image.png"));
  console.log("  og-image.png (1200x630): done");

  // Shortcut icons
  await sharp(Buffer.from(shortcutSvg("C"))).png().toFile(join(PUBLIC_DIR, "icon-contact.png"));
  await sharp(Buffer.from(shortcutSvg("S"))).png().toFile(join(PUBLIC_DIR, "icon-services.png"));
  await sharp(Buffer.from(shortcutSvg("W"))).png().toFile(join(PUBLIC_DIR, "icon-cases.png"));
  console.log("  Shortcut icons (96x96): done");

  // Apple touch icon (180x180)
  await sharp(Buffer.from(iconSvg(180))).png().toFile(join(PUBLIC_DIR, "apple-touch-icon.png"));
  console.log("  apple-touch-icon.png (180x180): done");

  // Favicon as PNG (for browsers that prefer it)
  await sharp(Buffer.from(iconSvg(32))).png().toFile(join(PUBLIC_DIR, "favicon-32x32.png"));
  console.log("  favicon-32x32.png: done");

  console.log("\nAll icons generated successfully!");
}

generate().catch(console.error);
