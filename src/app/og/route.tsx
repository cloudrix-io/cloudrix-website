import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Cloud & Software Engineering";
  const subtitle = searchParams.get("subtitle") || "Senior engineering teams for European companies";
  const type = searchParams.get("type") || "default";

  // Color schemes based on page type
  const colorSchemes: Record<string, { bg: string; accent: string; text: string }> = {
    default: { bg: "#1e3a5f", accent: "#3b82f6", text: "#ffffff" },
    services: { bg: "#1e3a5f", accent: "#10b981", text: "#ffffff" },
    about: { bg: "#1e293b", accent: "#8b5cf6", text: "#ffffff" },
    contact: { bg: "#1e3a5f", accent: "#f59e0b", text: "#ffffff" },
    "case-studies": { bg: "#0f172a", accent: "#06b6d4", text: "#ffffff" },
    "how-we-work": { bg: "#1e3a5f", accent: "#ec4899", text: "#ffffff" },
  };

  const colors = colorSchemes[type] || colorSchemes.default;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.bg,
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.accent}20 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${colors.accent}15 0%, transparent 50%)`,
          }}
        />

        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              backgroundColor: colors.accent,
              borderRadius: "12px",
              marginRight: "16px",
            }}
          >
            <span style={{ fontSize: "32px", fontWeight: "bold", color: "#ffffff" }}>C</span>
          </div>
          <span style={{ fontSize: "28px", fontWeight: "600", color: colors.text }}>
            Cloudrix
          </span>

          {/* Badge */}
          <div
            style={{
              marginLeft: "auto",
              padding: "8px 20px",
              backgroundColor: `${colors.accent}30`,
              borderRadius: "20px",
              border: `1px solid ${colors.accent}50`,
            }}
          >
            <span style={{ fontSize: "16px", color: colors.accent, fontWeight: "500" }}>
              cloudrix.io
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 40 ? "52px" : "64px",
              fontWeight: "bold",
              color: colors.text,
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "24px",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: `${colors.text}cc`,
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "800px",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom Stats */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "40px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", color: colors.accent }}>
              47+
            </span>
            <span style={{ fontSize: "16px", color: `${colors.text}99` }}>Projects Delivered</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", color: colors.accent }}>
              94%
            </span>
            <span style={{ fontSize: "16px", color: `${colors.text}99` }}>Client Retention</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", color: colors.accent }}>
              99.9%
            </span>
            <span style={{ fontSize: "16px", color: `${colors.text}99` }}>Uptime Achieved</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
