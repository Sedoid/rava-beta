"use client";

import { useState } from "react";
import type { StepResponse, StepStatus } from "@/lib/types";

interface FeedbackSectionProps {
  hasStars?: boolean;
  notesPlaceholder: string;
  response: StepResponse;
  onResponseChange: (update: Partial<StepResponse>) => void;
}

const MAX_NOTES = 500;

export default function FeedbackSection({
  hasStars,
  notesPlaceholder,
  response,
  onResponseChange,
}: FeedbackSectionProps) {
  const [hoverStar, setHoverStar] = useState(0);
  const [notesActive, setNotesActive] = useState(false);

  const notesLen = response.notes?.length ?? 0;

  return (
    <div className="mt-2 md:mt-4">
      {/* "SHARE YOUR FEEDBACK" header row */}
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{ width: 24, height: 24, background: "rgba(140,82,255,0.15)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <rect x="1" y="1" width="4" height="4" rx="0.8" fill="#8C52FF" />
            <rect x="7" y="1" width="4" height="4" rx="0.8" fill="#8C52FF" />
            <rect x="1" y="7" width="4" height="4" rx="0.8" fill="#8C52FF" />
            <rect x="7" y="7" width="4" height="4" rx="0.8" fill="#8C52FF" />
          </svg>
        </div>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: "#8C52FF",
          }}
        >
          Share your feedback
        </p>
      </div>

      <p
        className="mb-2 md:mb-4 text-sm"
        style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.55)" }}
      >
        How was this step for you?
      </p>

      {/* Status pills — 3-column equal-width grid */}
      <div className="grid grid-cols-3 gap-2 mb-3 md:mb-5">
        <StatusPill
          label="✓ Worked as expected"
          value="Worked"
          current={response.status}
          activeColor="#22C55E"
          onClick={() => onResponseChange({ status: "Worked" })}
        />
        <StatusPill
          label="◑ Partial / Some issues"
          value="Partially"
          current={response.status}
          activeColor="#FF9F43"
          onClick={() => onResponseChange({ status: "Partially" })}
        />
        <StatusPill
          label="✗ Didn't work"
          value="No"
          current={response.status}
          activeColor="#EF4444"
          onClick={() => onResponseChange({ status: "No" })}
        />
      </div>

      {/* Star rating */}
      {hasStars && (
        <div className="mb-3 md:mb-5">
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onMouseEnter={() => setHoverStar(n)}
                onMouseLeave={() => setHoverStar(0)}
                onClick={() => onResponseChange({ ease: n })}
                className="text-2xl transition-colors focus:outline-none"
                aria-label={`${n} star`}
                style={{
                  color:
                    (hoverStar || response.ease || 0) >= n ? "#f4b942" : "#1A2247",
                  fontFamily: "var(--font-inter)",
                }}
              >
                ★
              </button>
            ))}
          </div>
          {response.ease != null && (
            <p
              className="text-[11px]"
              style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.45)" }}
            >
              {["", "Very hard", "Hard", "OK", "Easy", "Very easy"][response.ease]}
            </p>
          )}
        </div>
      )}

      {/* Notes label + textarea */}
      <div>
        <p
          className="mb-2 text-sm"
          style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.6)" }}
        >
          {notesPlaceholder}{" "}
          <span style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span>
        </p>
        <div className="relative">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              opacity: 0.35,
              pointerEvents: "none",
            }}
          >
            <path
              d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H4L1 13V3a1 1 0 011-1z"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.2"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <textarea
            placeholder="Tell us what happened..."
            value={response.notes ?? ""}
            onChange={(e) => {
              if (e.target.value.length <= MAX_NOTES)
                onResponseChange({ notes: e.target.value });
            }}
            onFocus={() => setNotesActive(true)}
            onBlur={() => setNotesActive(false)}
            className="w-full rounded-lg text-sm outline-none transition-all duration-200"
            style={{
              paddingTop: 10,
              paddingBottom: 28,
              paddingLeft: 34,
              paddingRight: 12,
              background: "rgba(10,16,36,0.92)",
              border: `1px solid ${notesActive ? "#8C52FF" : "rgba(140,82,255,0.16)"}`,
              boxShadow: notesActive ? "0 0 12px rgba(140,82,255,0.28)" : "none",
              color: "#FFFFFF",
              fontFamily: "var(--font-inter)",
              resize: "none",
              height: 88,
            }}
            rows={3}
          />
          {/* Counter inside the box, bottom-right */}
          <span
            style={{
              position: "absolute",
              bottom: 8,
              right: 10,
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: notesLen >= MAX_NOTES ? "#EF4444" : "rgba(255,255,255,0.3)",
              pointerEvents: "none",
            }}
          >
            {notesLen} / {MAX_NOTES}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatusPill({
  label,
  value,
  current,
  activeColor,
  onClick,
}: {
  label: string;
  value: StepStatus;
  current: StepStatus;
  activeColor: string;
  onClick: () => void;
}) {
  const active = current === value;
  return (
    <button
      onClick={onClick}
      className="w-full py-3 px-2 rounded-xl text-xs font-medium transition-all duration-150 select-none text-center leading-snug"
      style={{
        background: active ? activeColor + "30" : activeColor + "18",
        border: `1px solid ${active ? activeColor + "BB" : activeColor + "44"}`,
        color: active ? activeColor : activeColor + "BB",
        fontFamily: "var(--font-inter)",
        transform: "scale(1)",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.97)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {label}
    </button>
  );
}
