"use client";

import { useState } from "react";

const BULLETS = [
  "Auto-imports MoMo & Orange Money transactions from your SMS history",
  "Dashboard with today's cashflow and your recent transaction feed",
  "Monthly and annual analytics to track where your money goes",
  "Smart budgeting with per-category spending limits",
  "AI chat for personalised financial insights and advice",
];

export default function AboutAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden mb-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between rounded-xl px-4 py-3"
        style={{
          background: "rgba(140,82,255,0.08)",
          border: "1px solid rgba(140,82,255,0.18)",
          fontFamily: "var(--font-inter)",
        }}
      >
        <div className="flex items-center gap-2">
          {/* Info icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="6" stroke="#8C52FF" strokeWidth="1.5" />
            <path d="M8 7v4" stroke="#8C52FF" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="5.25" r="0.75" fill="#8C52FF" />
          </svg>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#8C52FF",
            }}
          >
            About RAVA
          </span>
        </div>
        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="mt-2 rounded-xl px-4 py-4"
          style={{
            background: "rgba(10,16,36,0.7)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <ul className="flex flex-col gap-2.5">
            {BULLETS.map((text) => (
              <li key={text} className="flex items-start gap-2.5">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8C52FF, #F34F9A)",
                    flexShrink: 0,
                    marginTop: 6,
                    display: "block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.6,
                  }}
                >
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
