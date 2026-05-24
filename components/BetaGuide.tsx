"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TABS } from "@/lib/tabs";
import { STEPS, getStepsForTab } from "@/lib/steps";
import {
  getOrCreateSessionId,
  saveSession,
  saveProgress,
  loadProgress,
  clearProgress,
} from "@/lib/storage";
import Sidebar from "@/components/Sidebar";
import AppHeader from "@/components/AppHeader";
import OverallProgress from "@/components/OverallProgress";
import TabBar from "@/components/TabBar";
import ProgressTrack from "@/components/ProgressTrack";
import StepCard from "@/components/StepCard";
import CompletionScreen from "@/components/CompletionScreen";
import type { StepResponse, TesterInfo } from "@/lib/types";

const DEFAULT_RESPONSE: StepResponse = { status: null };

export default function BetaGuide() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [stepInTab, setStepInTab] = useState(0);
  const [responses, setResponses] = useState<Record<string, StepResponse>>(
    () => Object.fromEntries(STEPS.map((s) => [s.id, { ...DEFAULT_RESPONSE }]))
  );
  const [tester, setTester] = useState<TesterInfo>({ name: "", device: "" });
  const [submitted, setSubmitted] = useState(false);
  const direction = useRef<1 | -1>(1);
  const hydrated = useRef(false);

  // Restore progress on mount
  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setResponses((prev) => ({ ...prev, ...saved.responses }));
      setActiveTabIndex(saved.activeTab);
      setStepInTab(saved.stepInTab);
    }
    hydrated.current = true;
  }, []);

  // Persist progress on every change (after hydration)
  useEffect(() => {
    if (!hydrated.current) return;
    saveProgress({ responses, activeTab: activeTabIndex, stepInTab });
  }, [responses, activeTabIndex, stepInTab]);

  const currentTab = TABS[activeTabIndex];
  const tabSteps = getStepsForTab(currentTab.id);
  const currentStep = tabSteps[stepInTab];

  const completedTabs = new Set(
    TABS.filter((tab) =>
      tab.stepIds.every((id) => responses[id]?.status != null)
    ).map((t) => t.id)
  );

  const completedStepIds = new Set(
    STEPS.filter((s) => responses[s.id]?.status != null).map((s) => s.id)
  );

  const completedCount = completedStepIds.size;

  function handleResponseChange(update: Partial<StepResponse>) {
    setResponses((prev) => ({
      ...prev,
      [currentStep.id]: { ...prev[currentStep.id], ...update },
    }));
  }

  function handleTesterChange(field: "name" | "device", value: string) {
    setTester((prev) => ({ ...prev, [field]: value }));
  }

  function handleTabChange(index: number) {
    direction.current = index > activeTabIndex ? 1 : -1;
    setActiveTabIndex(index);
    setStepInTab(0);
  }

  function handleContinue() {
    if (stepInTab < tabSteps.length - 1) {
      direction.current = 1;
      setStepInTab((i) => i + 1);
    } else {
      const nextTabIndex = activeTabIndex + 1;
      if (nextTabIndex < TABS.length) {
        direction.current = 1;
        setActiveTabIndex(nextTabIndex);
        setStepInTab(0);
      } else {
        handleSubmit();
      }
    }
  }

  function handleBack() {
    if (stepInTab > 0) {
      direction.current = -1;
      setStepInTab((i) => i - 1);
    } else if (activeTabIndex > 0) {
      direction.current = -1;
      const prevTab = TABS[activeTabIndex - 1];
      const prevTabSteps = getStepsForTab(prevTab.id);
      setActiveTabIndex(activeTabIndex - 1);
      setStepInTab(prevTabSteps.length - 1);
    }
  }

  function handleSubmit() {
    const sessionId = getOrCreateSessionId();
    saveSession({
      session: sessionId,
      ts: new Date().toISOString(),
      tester,
      steps: responses,
    });
    clearProgress();
    setSubmitted(true);
  }

  const isVeryFirst = activeTabIndex === 0 && stepInTab === 0;
  const isVeryLast =
    activeTabIndex === TABS.length - 1 &&
    stepInTab === getStepsForTab(TABS[TABS.length - 1].id).length - 1;

  if (submitted) {
    return (
      <div
        className="min-h-screen"
        style={{
          background: "radial-gradient(circle at top center, #11183A 0%, #090D1F 45%, #050816 100%)",
        }}
      >
        <CompletionScreen />
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "radial-gradient(circle at top center, #11183A 0%, #090D1F 45%, #050816 100%)",
      }}
    >
      {/* Desktop sidebar */}
      <Sidebar
        tabs={TABS}
        activeTabIndex={activeTabIndex}
        responses={responses}
        onTabChange={handleTabChange}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Sticky header */}
        <AppHeader />

        {/* Mobile tab bar (hidden on desktop) */}
        <TabBar
          tabs={TABS}
          activeTabIndex={activeTabIndex}
          completedTabs={completedTabs}
          responses={responses}
          onTabChange={handleTabChange}
        />

        <div className="flex-1 px-4 md:px-6 lg:px-8 py-6 md:py-8">
          {/* Hero section */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <p
                className="text-[10px] uppercase tracking-widest font-semibold mb-2"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                RAVA Beta Testing Guide
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Help us build a better RAVA
              </h1>
              <p
                className="mt-3 max-w-md"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                }}
              >
                Follow these steps and share your feedback at each stage.
                Your input helps us build something you&apos;ll love.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <OverallProgress
                completedCount={completedCount}
                totalCount={STEPS.length}
              />
            </div>
          </div>

          {/* Tab section header */}
          <div
            className="rounded-2xl px-5 py-6 mb-6"
            style={{
              background: "rgba(20,28,60,0.7)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex flex-col md:grid md:grid-cols-[auto_1fr_auto] md:items-center gap-6">
              {/* Left: tab info */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 11,
                    color: "#8C52FF",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  Tab {activeTabIndex + 1} of {TABS.length}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#FFFFFF",
                  }}
                >
                  {currentTab.label}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.4)",
                    marginTop: 2,
                  }}
                >
                  Complete all {tabSteps.length} step{tabSteps.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Center: step dots */}
              <div className="flex justify-center">
                <ProgressTrack
                  steps={tabSteps}
                  currentIndex={stepInTab}
                  completedIds={completedStepIds}
                />
              </div>

              {/* Right: circular % indicator */}
              <TabCircularProgress steps={tabSteps} completedIds={completedStepIds} />
            </div>
          </div>

          {/* Animated step card */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep.id}
              initial={{ x: direction.current * 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction.current * -40, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepCard
                step={currentStep}
                response={responses[currentStep.id]}
                testerName={tester.name}
                deviceModel={tester.device}
                totalStepsInTab={tabSteps.length}
                stepIndexInTab={stepInTab}
                onResponseChange={handleResponseChange}
                onTesterChange={handleTesterChange}
                onContinue={handleContinue}
                onBack={handleBack}
                isFirst={isVeryFirst}
                isLast={isVeryLast}
              />
            </motion.div>
          </AnimatePresence>

          {/* Global step counter */}
          <p
            className="text-center mt-6 text-[11px]"
            style={{
              fontFamily: "var(--font-inter)",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            Step {currentStep.globalNumber} of {STEPS.length} total
          </p>
        </div>
      </main>
    </div>
  );
}

function TabCircularProgress({
  steps,
  completedIds,
}: {
  steps: import("@/lib/types").Step[];
  completedIds: Set<string>;
}) {
  const done = steps.filter((s) => completedIds.has(s.id)).length;
  const pct = steps.length > 0 ? Math.round((done / steps.length) * 100) : 0;
  const R = 26;
  const CIRCUMFERENCE = 2 * Math.PI * R;
  const dashOffset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  return (
    <div className="flex-shrink-0 flex items-center justify-center">
      <svg width="68" height="68" viewBox="0 0 68 68">
        <defs>
          <linearGradient id="tab-circ-grad" x1="0" y1="0" x2="68" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8C52FF" />
            <stop offset="1" stopColor="#F34F9A" />
          </linearGradient>
        </defs>
        <circle cx="34" cy="34" r={R} fill="none" stroke="#1A2247" strokeWidth="3.5" />
        <circle
          cx="34" cy="34" r={R}
          fill="none"
          stroke="url(#tab-circ-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 34 34)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text x="34" y="31" textAnchor="middle" style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11, fill: "#FFFFFF" }}>
          {pct}%
        </text>
        <text x="34" y="42" textAnchor="middle" style={{ fontFamily: "var(--font-inter)", fontSize: 8, fill: "rgba(255,255,255,0.45)" }}>
          Completed
        </text>
      </svg>
    </div>
  );
}
