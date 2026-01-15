import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "36px",
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          fill="none"
        >
          {/* Cloud shape */}
          <path
            d="M35 110C22.85 110 13 100.15 13 88C13 77.5 20.75 68.75 31 66C30.15 63.95 29.5 61.65 29.5 59C29.5 46.85 39.35 37 51.5 37C60.2 37 67.75 42 71.5 49.5C75.1 45.15 80.55 42.5 86.5 42.5C97.82 42.5 107 51.68 107 63C107 64.5 106.85 65.95 106.6 67.35C118.6 70.75 127 81.7 127 94.5C127 110.24 114.24 123 98.5 123H35"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.2)"
          />
          {/* C letter */}
          <text
            x="70"
            y="95"
            fill="white"
            fontSize="55"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          >
            C
          </text>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
