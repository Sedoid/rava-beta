interface WarningBlockProps {
  text: string;
}

export default function WarningBlock({ text }: WarningBlockProps) {
  return (
    <div
      className="rounded-r-xl mb-5 px-5 py-4 flex gap-3"
      style={{
        borderLeft: "3px solid rgba(255,159,67,0.8)",
        background: "rgba(255, 159, 67, 0.08)",
      }}
    >
      <span
        className="shrink-0 text-sm mt-0.5"
        style={{ color: "#FF9F43" }}
        aria-hidden
      >
        ⚠
      </span>
      <div>
        <p
          className="text-[10px] uppercase tracking-widest font-semibold mb-1"
          style={{ fontFamily: "var(--font-inter)", color: "#FF9F43" }}
        >
          Important
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,159,67,0.85)", fontFamily: "var(--font-inter)" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
