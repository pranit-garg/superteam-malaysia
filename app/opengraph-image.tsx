import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Superteam Malaysia - Solana's Community Hub in Malaysia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(20,241,149,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(153,69,255,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Botanical line accent */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            width: "120px",
            height: "3px",
            background: "#14F195",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
            width: "3px",
            height: "80px",
            background: "#14F195",
            display: "flex",
          }}
        />

        {/* Bottom-right accent */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "120px",
            height: "3px",
            background: "#9945FF",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "40px",
            width: "3px",
            height: "80px",
            background: "#9945FF",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(20,241,149,0.1)",
              border: "1px solid rgba(20,241,149,0.3)",
              borderRadius: "9999px",
              padding: "8px 20px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#14F195",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#14F195",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              POWERED BY SOLANA
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>Superteam</span>
            <span style={{ color: "#14F195" }}>Malaysia</span>
          </div>

          {/* Subtitle */}
          <span
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            Where Solana builders in Malaysia connect, build, and grow together
          </span>
        </div>

        {/* Gold accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "4px",
            background:
              "linear-gradient(90deg, #14F195, #9945FF, #d4a246)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
