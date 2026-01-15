import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
        }}
      >
        {/* Cloud shape with C */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ display: "flex" }}
        >
          {/* Cloud outline */}
          <path
            d="M6.5 19C4.01 19 2 16.99 2 14.5C2 12.5 3.35 10.77 5.2 10.2C5.07 9.83 5 9.42 5 9C5 6.79 6.79 5 9 5C10.54 5 11.88 5.84 12.56 7.08C13.19 6.42 14.07 6 15 6C16.87 6 18.43 7.43 18.67 9.27C20.59 9.82 22 11.6 22 13.69C22 16.27 19.91 18.36 17.33 18.36"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(255,255,255,0.15)"
          />
          {/* C letter */}
          <text
            x="12"
            y="15"
            fill="white"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
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
