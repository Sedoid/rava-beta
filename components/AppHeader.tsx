export default function AppHeader() {
  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
      style={{
        background: "rgba(9,13,31,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        RAVA Beta Testing Guide
      </span>

      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(140,82,255,0.1)",
          border: "1px solid rgba(140,82,255,0.3)",
        }}
      >
        {/* Shield icon */}
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden>
          <path
            d="M6 1L1.5 3v3.5C1.5 9.36 3.48 11.97 6 12.5c2.52-.53 4.5-3.14 4.5-6V3L6 1z"
            fill="url(#shield-grad)"
          />
          <defs>
            <linearGradient id="shield-grad" x1="1.5" y1="1" x2="10.5" y2="12.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8C52FF" />
              <stop offset="1" stopColor="#F34F9A" />
            </linearGradient>
          </defs>
        </svg>
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 11,
            fontWeight: 600,
            color: "#8C52FF",
            letterSpacing: "0.04em",
          }}
        >
          BETA TESTER
        </span>
      </div>
    </div>
  );
}
