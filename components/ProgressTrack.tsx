import type { Step } from "@/lib/types";

interface ProgressTrackProps {
  steps: Step[];
  currentIndex: number;
  completedIds: Set<string>;
}

export default function ProgressTrack({
  steps,
  currentIndex,
  completedIds,
}: ProgressTrackProps) {
  return (
    <div className="flex items-start overflow-x-auto py-1">
      {steps.map((step, i) => {
        const isDone = completedIds.has(step.id);
        const isActive = i === currentIndex && !isDone;

        return (
          <div key={step.id} className="flex items-start flex-shrink-0">
            {/* Dot + label */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all duration-300"
                style={{
                  background: isDone
                    ? "linear-gradient(135deg, #8C52FF, #F34F9A)"
                    : isActive
                    ? "rgba(10,16,36,0.92)"
                    : "#1A2247",
                  border: isDone
                    ? "none"
                    : isActive
                    ? "2px solid #8C52FF"
                    : "1px solid rgba(255,255,255,0.10)",
                  color: isDone
                    ? "#ffffff"
                    : isActive
                    ? "#8C52FF"
                    : "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-inter)",
                  boxShadow: isActive ? "0 0 0 4px rgba(140,82,255,0.2)" : "none",
                }}
              >
                {isDone ? "✓" : i + 1}
              </div>
              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: isDone || isActive ? 600 : 400,
                  fontSize: 11,
                  color: isDone || isActive ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                  textAlign: "center",
                  maxWidth: 72,
                  lineHeight: 1.35,
                }}
              >
                {step.title.split(" ").slice(0, 3).join(" ")}
              </span>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div
                className="h-px flex-1 mx-1 mt-4 transition-all duration-300"
                style={{
                  minWidth: 32,
                  maxWidth: 80,
                  background: isDone
                    ? "linear-gradient(90deg, #8C52FF, #F34F9A)"
                    : "#1A2247",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
