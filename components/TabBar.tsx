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
    <div className="lg:hidden px-3 py-3">
      <div className="grid grid-cols-5 gap-1.5">
        {tabs.map((tab, i) => {
          const isActive = i === activeTabIndex;
          const doneCount = tab.stepIds.filter(
            (id) => responses[id]?.status != null
          ).length;
          const totalCount = tab.stepIds.length;

          // Gradient-border wrapper trick: outer div carries the gradient, inner button has dark fill
          const cardInner = (
            <button
              onClick={() => onTabChange(i)}
              className="flex flex-col items-center w-full py-2.5 px-1.5 transition-all duration-200"
              style={{
                background: "rgba(12,17,40,0.96)",
                borderRadius: isActive ? 11 : 13,
                border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <TabIconSvg name={tab.icon} active={isActive} />
              <span
                className="mt-1.5 leading-tight text-center"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 11,
                  color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                }}
              >
                {tab.label}
              </span>
              <span
                className="rounded-full px-1 mt-1"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 8,
                  fontWeight: 600,
                  color: isActive ? "#C084FC" : "rgba(255,255,255,0.3)",
                  background: isActive ? "rgba(140,82,255,0.18)" : "rgba(255,255,255,0.06)",
                  border: isActive ? "1px solid rgba(140,82,255,0.4)" : "1px solid transparent",
                }}
              >
                {STEP_RANGES[tab.id]}
              </span>
              <span
                className="mt-0.5"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 9,
                  color: isActive ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.25)",
                }}
              >
                {doneCount}/{totalCount} done
              </span>
            </button>
          );

          return (
            <div
              key={tab.id}
              style={
                isActive
                  ? {
                      background: "linear-gradient(135deg, #8C52FF, #F34F9A)",
                      padding: 1.5,
                      borderRadius: 13,
                    }
                  : { borderRadius: 13 }
              }
            >
              {cardInner}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ICON_GRAD_ID = "tab-icon-grad";

function GradDefs() {
  return (
    <defs>
      <linearGradient id={ICON_GRAD_ID} x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8C52FF" />
        <stop offset="1" stopColor="#F34F9A" />
      </linearGradient>
    </defs>
  );
}

function TabIconSvg({
  name,
  active,
}: {
  name: TabIconName;
  active: boolean;
}) {
  const color = active ? `url(#${ICON_GRAD_ID})` : "rgba(255,255,255,0.45)";
  const size = 14;

  switch (name) {
    case "setup":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
          {active && <GradDefs />}
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
          {active && <GradDefs />}
          <path d="M2 5h12M2 8h8M2 11h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="8" r="2" stroke={color} strokeWidth="1.5" />
          <circle cx="9" cy="11" r="2" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case "explore":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
          {active && <GradDefs />}
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
          {active && <GradDefs />}
          <rect x="2" y="3" width="12" height="3" rx="1" stroke={color} strokeWidth="1.5" />
          <rect x="2" y="8" width="8" height="3" rx="1" stroke={color} strokeWidth="1.5" />
          <circle cx="13" cy="9.5" r="1.5" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case "advanced":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
          {active && <GradDefs />}
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
