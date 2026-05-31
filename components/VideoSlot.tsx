"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface VideoSlotProps {
  url?: string;
  label?: string;
}

export default function VideoSlot({ url, label = "Walkthrough video" }: VideoSlotProps) {
  const [open, setOpen] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const isLocal = url?.startsWith("/");

  useEffect(() => {
    const check = () => setPortrait(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const modal = open ? createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(5,8,22,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        padding: "5vh 5vw",
      }}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          width: portrait ? "auto" : "80vw",
          height: portrait ? "85vh" : "auto",
          maxWidth: portrait ? "95vw" : undefined,
          background: "rgba(14,20,48,0.98)",
          border: "1px solid rgba(140,82,255,0.2)",
          boxShadow: "0 0 80px rgba(140,82,255,0.18), 0 0 0 1px rgba(255,255,255,0.04)",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8C52FF, #F34F9A)",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {label}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-lg w-8 h-8 text-sm transition-all duration-150"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-inter)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
            }}
            aria-label="Close video"
          >
            ✕
          </button>
        </div>

        {/* Video */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            aspectRatio: portrait ? "9/16" : "16/9",
            background: "#000",
          }}
        >
          {isLocal ? (
            <video
              className="w-full h-full"
              controls
              playsInline
              preload="metadata"
              style={{ display: "block" }}
            >
              <source src={url} type="video/webm" />
              Your browser does not support this video format.
            </video>
          ) : (
            <iframe
              src={url}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Footer hint */}
        <p
          className="text-center py-2.5 text-[11px] flex-shrink-0"
          style={{
            fontFamily: "var(--font-inter)",
            color: "rgba(255,255,255,0.2)",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          Click outside to close
        </p>
      </div>
    </div>,
    document.body
  ) : null;

  if (url) {
    return (
      <>
        {/* Clickable preview card */}
        <button
          onClick={() => setOpen(true)}
          className="w-full rounded-xl mb-4 flex flex-col items-center gap-3 p-6 text-center transition-all duration-200"
          style={{
            background: "rgba(10,16,36,0.92)",
            border: "1.5px solid rgba(140,82,255,0.3)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(140,82,255,0.65)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(140,82,255,0.3)")}
        >
          <div
            className="flex items-center justify-center rounded-xl p-0.5"
            style={{ background: "linear-gradient(135deg, #8C52FF, #F34F9A)" }}
          >
            <div
              className="flex items-center justify-center rounded-[10px]"
              style={{ width: 56, height: 44, background: "rgba(10,16,36,0.96)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M4 3l10 5-10 5V3z" fill="url(#play-grad-slot)" />
                <defs>
                  <linearGradient id="play-grad-slot" x1="4" y1="3" x2="14" y2="13" gradientUnits="userSpaceOnUse">
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
                color: "#8C52FF",
              }}
            >
              ▶ Watch walkthrough
            </p>
          </div>
        </button>

        {modal}
      </>
    );
  }

  // No URL — Coming Soon placeholder
  return (
    <>
      <div
        className="rounded-xl p-6 text-center mb-4 flex flex-col items-center gap-3"
        style={{
          background: "rgba(10,16,36,0.92)",
          border: "1.5px dashed rgba(140,82,255,0.3)",
        }}
      >
        <div
          className="flex items-center justify-center rounded-xl p-0.5"
          style={{ background: "linear-gradient(135deg, #8C52FF, #F34F9A)" }}
        >
          <div
            className="flex items-center justify-center rounded-[10px]"
            style={{ width: 56, height: 44, background: "rgba(10,16,36,0.96)" }}
          >
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
      {modal}
    </>
  );
}
