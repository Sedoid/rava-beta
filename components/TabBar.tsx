import type { Tab, TabIconName } from "@/lib/types";
import type { StepResponse } from "@/lib/types";

interface TabBarProps {
  tabs: Tab[];
  activeTabIndex: number;
  completedTabs: Set<string>;
  responses: Record<string, StepResponse>;
  onTabChange: (index: number) => void;
}

const STEP_RANGES: Record<string, string> = {
  setup: "1–3",
  configure: "4",
  explore: "5–6",
  organise: "7–9",
  advanced: "10–13",
};

export default function TabBar({
  tabs,
  activeTabIndex,
  responses,
  onTabChange,
}: TabBarProps) {
  return (
    /* Mobile-only: hidden on lg+ (sidebar handles navigation there) */
    <div className="lg:hidden overflow-x-auto px-4 py-3">
      <div className="flex gap-2.5 min-w-max">
        {tabs.map((tab, i) => {
          const isActive = i === activeTabIndex;
          const doneCount = tab.stepIds.filter(
            (id) => responses[id]?.status != null
          ).length;
          const totalCount = tab.stepIds.length;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(i)}
              className="flex flex-col items-start rounded-xl px-4 py-3 transition-all duration-200 flex-shrink-0"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, #8C52FF 0%, #F34F9A 100%)"
                  : "rgba(255,255,255,0.04)",
                border: isActive
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: isActive
                  ? "0px 0px 18px rgba(140,82,255,0.3)"
                  : "none",
                minWidth: 110,
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <TabIconSvg name={tab.icon} active={isActive} />
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    fontSize: 13,
                    color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {tab.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="rounded-full px-1.5 py-0.5"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 9,
                    fontWeight: 600,
                    color: isActive
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.35)",
                    background: isActive
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.08)",
                  }}
                >
                  {STEP_RANGES[tab.id]}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 11,
                    color: isActive
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.35)",
                  }}
                >
                  {doneCount}/{totalCount} done
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TabIconSvg({
  name,
  active,
}: {
  name: TabIconName;
  active: boolean;
}) {
  const color = active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)";
  const size = 14;

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
