interface WarningBlockProps {
  text: string;
  color?: string;
}

export default function WarningBlock({ text, color = "#FF9F43" }: WarningBlockProps) {
  const isWarning = color === "#FF9F43";
  return (
    <div
      className="rounded-r-xl mb-3 px-3 py-3 md:mb-5 md:px-5 md:py-4 flex gap-2"
      style={{
        borderLeft: `3px solid ${color}cc`,
        background: `${color}14`,
      }}
    >
      <span
        className="shrink-0 text-sm mt-0.5"
        style={{ color }}
        aria-hidden
      >
        {isWarning ? "⚠" : "ℹ"}
      </span>
      <div>
        <p
          className="text-[10px] uppercase tracking-widest font-semibold mb-1"
          style={{ fontFamily: "var(--font-inter)", color }}
        >
          {isWarning ? "Important" : "Note"}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: `${color}dd`, fontFamily: "var(--font-inter)" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
