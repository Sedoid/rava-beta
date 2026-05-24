interface VideoSlotProps {
  url?: string;
  label?: string;
}

export default function VideoSlot({ url, label = "Walkthrough video" }: VideoSlotProps) {
  if (url) {
    return (
      <div
        className="rounded-xl overflow-hidden mb-4"
        style={{ aspectRatio: "16/9", background: "rgba(10,16,36,0.92)" }}
      >
        <iframe
          src={url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-6 text-center mb-4 flex flex-col items-center gap-3"
      style={{
        background: "rgba(10,16,36,0.92)",
        border: "1.5px dashed rgba(140,82,255,0.3)",
      }}
    >
      {/* Rounded-rect video player icon with gradient border */}
      <div
        className="flex items-center justify-center rounded-xl p-0.5"
        style={{
          background: "linear-gradient(135deg, #8C52FF, #F34F9A)",
        }}
      >
        <div
          className="flex items-center justify-center rounded-[10px]"
          style={{
            width: 56,
            height: 44,
            background: "rgba(10,16,36,0.96)",
          }}
        >
          {/* Play triangle */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M4 3l10 5-10 5V3z" fill="url(#play-grad)" />
            <defs>
              <linearGradient id="play-grad" x1="4" y1="3" x2="14" y2="13" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8C52FF" />
                <stop offset="1" stopColor="#F34F9A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 600,
            fontSize: 15,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {label}
        </p>
        <p
          className="mt-0.5"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Coming soon
        </p>
      </div>
    </div>
  );
}
