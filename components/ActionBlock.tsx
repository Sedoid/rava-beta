interface ActionBlockProps {
  items: string[];
}

export default function ActionBlock({ items }: ActionBlockProps) {
  return (
    <div
      className="rounded-xl mb-5 px-5 py-4"
      style={{
        borderLeft: "3px solid #8C52FF",
        background: "rgba(140, 82, 255, 0.08)",
      }}
    >
      {/* Header row: icon badge + "WHAT TO DO" label */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="flex items-center justify-center rounded-md flex-shrink-0"
          style={{ width: 22, height: 22, background: "rgba(140,82,255,0.2)" }}
        >
          {/* Checklist/list icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M1 2.5h2M1 6h2M1 9.5h2" stroke="#8C52FF" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M5 2.5h6M5 6h6M5 9.5h6" stroke="#8C52FF" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <p
          className="text-[10px] uppercase tracking-widest font-semibold"
          style={{ fontFamily: "var(--font-inter)", color: "#8C52FF" }}
        >
          What to do
        </p>
      </div>

      <ol className="space-y-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-[15px] leading-[1.7]"
            style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-inter)" }}
          >
            <span
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold mt-0.5"
              style={{
                background: "linear-gradient(135deg, #8C52FF, #F34F9A)",
                color: "#FFFFFF",
                fontFamily: "var(--font-inter)",
              }}
            >
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
