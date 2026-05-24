interface OverallProgressProps {
  completedCount: number;
  totalCount: number;
}

export default function OverallProgress({
  completedCount,
  totalCount,
}: OverallProgressProps) {
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div
      className="rounded-2xl px-5 py-4"
      style={{
        background: "rgba(20,28,60,0.96)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        minWidth: 220,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 13,
              color: "#FFFFFF",
            }}
          >
            Overall Progress
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              marginTop: 1,
            }}
          >
            Across all tabs
          </p>
        </div>
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 18,
            background: "linear-gradient(90deg, #8C52FF, #F34F9A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {pct}%
        </span>
      </div>

      {/* Track */}
      <div
        className="rounded-full overflow-hidden mb-2"
        style={{ height: 6, background: "#1A2247" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #8C52FF 0%, #F34F9A 100%)",
          }}
        />
      </div>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 11,
          color: "rgba(255,255,255,0.45)",
        }}
      >
        {completedCount} / {totalCount} steps completed
      </p>
    </div>
  );
}
