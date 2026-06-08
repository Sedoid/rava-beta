"use client";

import type { Tab } from "@/lib/types";
import type { StepResponse } from "@/lib/types";

interface SidebarProps {
  tabs: Tab[];
  activeTabIndex: number;
  responses: Record<string, StepResponse>;
  onTabChange: (index: number) => void;
  showAbout: boolean;
  onAboutClick: () => void;
}

const STEP_RANGES: Record<string, string> = {
  setup: "1–3",
  configure: "4",
  explore: "5–6",
  organise: "7–9",
  advanced: "10–13",
};

export default function Sidebar({
  tabs,
  activeTabIndex,
  responses,
  onTabChange,
  showAbout,
  onAboutClick,
}: SidebarProps) {
  return (
    <aside
      className="hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0"
      style={{
        width: 240,
        background: "linear-gradient(180deg, #070B1A 0%, #0B1023 45%, #050816 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo — centered icon only */}
      <div className="flex justify-center px-5 py-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="RAVA"
          width={56}
          height={56}
          style={{ borderRadius: 14 }}
        />
      </div>

      {/* Nav label */}
      <p
        className="px-5 mb-3"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        Testing Flow
      </p>

      {/* Nav items */}
      <nav className="flex-1 px-3 overflow-y-auto">
        {tabs.map((tab, i) => {
          const isActive = i === activeTabIndex;
          const doneCount = tab.stepIds.filter(
            (id) => responses[id]?.status != null
          ).length;
          const totalCount = tab.stepIds.length;
          const allDone = doneCount === totalCount;

          return (
            <div key={tab.id}>
              <button
                onClick={() => onTabChange(i)}
                className="w-full text-left rounded-xl py-3 transition-all duration-200"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: isActive ? "rgba(140,82,255,0.14)" : "transparent",
                  paddingLeft: 20,
                  paddingRight: 12,
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                }}
              >
                {/* Left gradient accent bar */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 6,
                      bottom: 6,
                      width: 3,
                      borderRadius: 2,
                      background: "linear-gradient(180deg, #8C52FF 0%, #F34F9A 100%)",
                    }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <TabIcon name={tab.icon} active={isActive} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 600,
                          fontSize: 13,
                          color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                        }}
                      >
                        {tab.label}
                      </span>
                      <span
                        className="rounded-full px-1.5 py-0.5"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 9,
                          fontWeight: 600,
                          color: isActive
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(255,255,255,0.4)",
                          background: isActive
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(255,255,255,0.08)",
                        }}
                      >
                        {STEP_RANGES[tab.id]}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: 11,
                        color: isActive
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(255,255,255,0.35)",
                        marginTop: 1,
                      }}
                    >
                      {doneCount} / {totalCount} done
                    </p>
                  </div>

                  {/* Circle completion indicator */}
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: allDone ? "#22C55E" : "transparent",
                      border: allDone ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {allDone && (
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                        <path
                          d="M1.5 4.5l2 2 4-4"
                          stroke="#fff"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </button>

              {/* Divider between items */}
              {i < tabs.length - 1 && (
                <div
                  style={{
                    height: 1,
                    background: "rgba(255,255,255,0.06)",
                    margin: "2px 12px",
                  }}
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* About button */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 12px 8px" }} />
      <div className="px-3 pb-2">
        <button
          onClick={onAboutClick}
          className="w-full text-left rounded-xl py-3 transition-all duration-200"
          style={{
            position: "relative",
            overflow: "hidden",
            background: showAbout ? "rgba(140,82,255,0.14)" : "transparent",
            paddingLeft: 20,
            paddingRight: 12,
          }}
          onMouseEnter={(e) => {
            if (!showAbout)
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
          }}
          onMouseLeave={(e) => {
            if (!showAbout)
              (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          {showAbout && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 6,
                bottom: 6,
                width: 3,
                borderRadius: 2,
                background: "linear-gradient(180deg, #8C52FF 0%, #F34F9A 100%)",
              }}
            />
          )}
          <div className="flex items-center gap-3">
            <AboutIcon active={showAbout} />
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 13,
                color: showAbout ? "#FFFFFF" : "rgba(255,255,255,0.75)",
              }}
            >
              About RAVA
            </span>
          </div>
        </button>
      </div>

      {/* Help card */}
      <div className="px-3 py-4">
        <div
          className="rounded-xl px-4 py-4"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 13,
              color: "#FFFFFF",
              marginBottom: 4,
            }}
          >
            Need help?
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.5,
              marginBottom: 10,
            }}
          >
            Join our community to ask questions and get updates.
          </p>

          {/* WhatsApp community link */}
          <a
            href="https://chat.whatsapp.com/GDWarbOfEiw22NrwoGy1tp?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-lg py-2 flex items-center justify-center gap-2 transition-opacity hover:opacity-85 mb-2"
            style={{
              background: "rgba(37,211,102,0.15)",
              border: "1px solid rgba(37,211,102,0.35)",
              color: "#25D366",
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 12,
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join Community
          </a>

          <button
            className="w-full rounded-lg py-2 text-center transition-opacity hover:opacity-80"
            style={{
              background: "rgba(140,82,255,0.15)",
              border: "1px solid rgba(140,82,255,0.3)",
              color: "#8C52FF",
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            Report Issue
          </button>
        </div>
      </div>
    </aside>
  );
}

type TabIconName = "setup" | "configure" | "explore" | "organise" | "advanced";

function TabIcon({ name, active }: { name: TabIconName; active: boolean }) {
  const color = active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)";
  const size = 16;

  switch (name) {
    case "setup":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M8 2v9M5 8l3 3 3-3M3 13h10"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "configure":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M2 5h12M2 8h8M2 11h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="8" r="2" stroke={color} strokeWidth="1.5" />
          <circle cx="9" cy="11" r="2" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case "explore":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="5.5" stroke={color} strokeWidth="1.5" />
          <path
            d="M10 6l-2.5 1.5L6 10l2.5-1.5L10 6z"
            stroke={color}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "organise":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="2" y="3" width="12" height="3" rx="1" stroke={color} strokeWidth="1.5" />
          <rect x="2" y="8" width="8" height="3" rx="1" stroke={color} strokeWidth="1.5" />
          <circle cx="13" cy="9.5" r="1.5" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case "advanced":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M8 2l1.2 3.5H13l-3 2 1.2 3.5L8 9l-3.2 2L6 7.5l-3-2h3.8L8 2z"
            stroke={color}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function AboutIcon({ active }: { active: boolean }) {
  const color = active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
      <path d="M8 7v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5.25" r="0.75" fill={color} />
    </svg>
  );
}
