"use client";

interface AboutViewProps {
  onBack: () => void;
}

const FEATURES = [
  {
    title: "Auto Transaction Import",
    subtitle: "MoMo & Orange Money",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M2 8a6 6 0 0 1 6-6 6 6 0 0 1 4.24 1.76" stroke="#8C52FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 8a6 6 0 0 1-6 6 6 6 0 0 1-4.24-1.76" stroke="#8C52FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 5.5l1.5-1.74L14.24 5" stroke="#8C52FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10.5l-1.5 1.74L1.76 11" stroke="#8C52FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Dashboard & Cashflow",
    subtitle: "Visual spending overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="1" y="9" width="3" height="5" rx="1" stroke="#8C52FF" strokeWidth="1.5" />
        <rect x="6" y="6" width="3" height="8" rx="1" stroke="#8C52FF" strokeWidth="1.5" />
        <rect x="11" y="3" width="3" height="11" rx="1" stroke="#8C52FF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Monthly & Annual Analytics",
    subtitle: "Track spending trends",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="#8C52FF" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1" stroke="#8C52FF" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1" stroke="#8C52FF" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="#8C52FF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Smart Budgeting",
    subtitle: "Category spending limits",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="1" y="4" width="14" height="9" rx="2" stroke="#8C52FF" strokeWidth="1.5" />
        <path d="M1 7h14" stroke="#8C52FF" strokeWidth="1.5" />
        <circle cx="4.5" cy="10" r="1" stroke="#8C52FF" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "AI Financial Insights",
    subtitle: "Powered by AI chat",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M2 2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5L2 13V3a1 1 0 0 1 1-1z" stroke="#8C52FF" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M13 5h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1" stroke="#8C52FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Goals & Planning",
    subtitle: "Set and track goals",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="6" stroke="#8C52FF" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="2.5" stroke="#8C52FF" strokeWidth="1.5" />
        <path d="M8 2V1M8 15v-1M2 8H1M15 8h-1" stroke="#8C52FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const cardStyle: React.CSSProperties = {
  background: "rgba(20,28,60,0.96)",
  border: "1px solid rgba(255,255,255,0.05)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 16,
  padding: "28px 28px",
  marginBottom: 16,
};

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter)",
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#8C52FF",
  marginBottom: 4,
};

export default function AboutView({ onBack }: AboutViewProps) {
  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 rounded-xl mb-5 transition-all duration-150"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.6)",
          fontFamily: "var(--font-inter)",
          fontSize: 13,
          fontWeight: 500,
          padding: "8px 14px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#FFFFFF";
          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Testing
      </button>

      {/* Hero card */}
      <div style={cardStyle}>
        {/* Logo + name row */}
        <div className="flex items-center gap-4 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="RAVA"
            width={64}
            height={64}
            style={{ borderRadius: 16, flexShrink: 0 }}
          />
          <div>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 36,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              RAVA
            </h1>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                color: "rgba(255,255,255,0.55)",
                marginTop: 4,
              }}
            >
              Automatic MoMo &amp; Orange Money finance tracker
            </p>
          </div>
        </div>

        {/* Android badge */}
        <div style={{ display: "inline-block", marginBottom: 20 }}>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #8C52FF, #F34F9A)",
              borderRadius: 999,
              padding: "4px 12px",
              display: "inline-block",
            }}
          >
            Android App
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />

        {/* What is RAVA */}
        <p style={sectionLabelStyle}>What is RAVA?</p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 15,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7,
          }}
        >
          RAVA automatically reads and imports your MoMo (MTN) and Orange Money transaction
          history — no manual entry needed. It turns your SMS transaction records into a full
          financial picture: cashflow dashboards, monthly and annual analytics, smart budgeting,
          category management, and AI-powered insights, all in one place.
        </p>
      </div>

      {/* Features card */}
      <div style={cardStyle}>
        <p style={sectionLabelStyle}>Features</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                borderRadius: 12,
                padding: "14px 16px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")
              }
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(140,82,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#FFFFFF",
                  marginTop: 10,
                  marginBottom: 2,
                }}
              >
                {f.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {f.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why beta test card */}
      <div
        style={{
          ...cardStyle,
          position: "relative",
          overflow: "hidden",
          paddingLeft: 28,
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: "linear-gradient(180deg, #8C52FF 0%, #F34F9A 100%)",
          }}
        />
        <p style={sectionLabelStyle}>Why Beta Test?</p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 15,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7,
            marginTop: 4,
          }}
        >
          RAVA is built for people like you — and your feedback directly shapes what gets built
          next. By testing each feature and sharing what works (and what doesn&apos;t), you help
          us ship something you&apos;ll actually love using every day.
        </p>
      </div>
    </div>
  );
}
