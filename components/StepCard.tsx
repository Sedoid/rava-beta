"use client";

import { useState } from "react";
import ActionBlock from "@/components/ActionBlock";
import WarningBlock from "@/components/WarningBlock";
import VideoSlot from "@/components/VideoSlot";
import FeedbackSection from "@/components/FeedbackSection";
import type { Step, StepResponse } from "@/lib/types";

interface StepCardProps {
  step: Step;
  response: StepResponse;
  testerName?: string;
  deviceModel?: string;
  totalStepsInTab: number;
  stepIndexInTab: number;
  onResponseChange: (update: Partial<StepResponse>) => void;
  onTesterChange?: (field: "name" | "device", value: string) => void;
  onContinue: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
  isSubmitting?: boolean;
}

export default function StepCard({
  step,
  response,
  testerName,
  deviceModel,
  totalStepsInTab,
  stepIndexInTab,
  onResponseChange,
  onTesterChange,
  onContinue,
  onBack,
  isFirst,
  isLast,
  isSubmitting = false,
}: StepCardProps) {
  const canContinue = response.status !== null && !isSubmitting;

  return (
    <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6 lg:items-start">
      {/* ── LEFT: instructions ── */}
      <div
        className="rounded-2xl px-4 py-4 md:px-7 md:py-8 mb-3 lg:mb-0"
        style={{
          background: "rgba(20,28,60,0.96)",
          border: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {/* Step label row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(140,82,255,0.15)",
              color: "#8C52FF",
              fontFamily: "var(--font-inter)",
            }}
          >
            {step.label}
          </span>

          {/* Bordered "Step X of Y" pill */}
          <span
            className="rounded-lg px-2.5 py-1 text-[11px] font-medium"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Step {stepIndexInTab + 1} of {totalStepsInTab}
          </span>
        </div>

        {/* Title */}
        <h2
          className="mb-2"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 28,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {step.title}
        </h2>

        {/* Description */}
        {step.description && (
          <p
            className="mb-3 md:mb-6"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.6,
            }}
          >
            {step.description}
          </p>
        )}

        {/* Action block */}
        <ActionBlock items={step.actionItems} />

        {/* Play Store download button */}
        {step.downloadUrl && (
          <a
            href={step.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full mb-3 md:mb-5 py-3.5 rounded-xl transition-all"
            style={{
              background: "linear-gradient(90deg, #8C52FF 0%, #F34F9A 100%)",
              boxShadow: "0 0 24px rgba(140,82,255,0.35)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {/* Play Store icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 3.5C3 2.67 3.9 2.15 4.6 2.58L21 12 4.6 21.42C3.9 21.85 3 21.33 3 20.5V3.5Z"
                fill="#FFFFFF"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.01em",
              }}
            >
              Download on Google Play
            </span>
          </a>
        )}

        {/* Warning */}
        {step.warning && <WarningBlock text={step.warning} color={step.warningColor} />}

        {/* Identity fields — Step 1 only, lives in the left panel */}
        {step.capturesIdentity && (
          <IdentityFields
            testerName={testerName ?? ""}
            deviceModel={deviceModel ?? ""}
            onTesterChange={onTesterChange}
          />
        )}
      </div>

      {/* ── RIGHT: video + feedback + nav ── */}
      <div
        className="rounded-2xl px-4 py-4 md:px-7 md:py-8"
        style={{
          background: "rgba(20,28,60,0.96)",
          border: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {/* Video section */}
        <p
          className="text-[10px] uppercase tracking-widest font-semibold mb-2"
          style={{ fontFamily: "var(--font-inter)", color: "#8C52FF" }}
        >
          Walkthrough Video
        </p>
        <VideoSlot url={step.videoUrl} />

        {/* Feedback section */}
        <FeedbackSection
          hasStars={step.hasStars}
          notesPlaceholder={step.notesPlaceholder}
          response={response}
          onResponseChange={onResponseChange}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4">
          {!isFirst ? (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={canContinue ? onContinue : undefined}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold ml-auto transition-all"
            style={{
              background: canContinue
                ? "linear-gradient(90deg, #8C52FF 0%, #F34F9A 100%)"
                : "rgba(140,82,255,0.2)",
              color: "#FFFFFF",
              fontFamily: "var(--font-inter)",
              opacity: canContinue ? 1 : 0.45,
              cursor: canContinue ? "pointer" : "not-allowed",
              boxShadow: canContinue ? "0 0 18px rgba(140,82,255,0.3)" : "none",
            }}
          >
            {isLast
              ? isSubmitting ? "Submitting…" : "Submit Feedback"
              : `Continue to Step ${step.globalNumber + 1} →`}
          </button>
        </div>

        {/* Privacy note */}
        <div className="flex items-center gap-2 mt-3 justify-center">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" aria-hidden>
            <path
              d="M6 1L1.5 3v3.5C1.5 9.36 3.48 11.97 6 12.5c2.52-.53 4.5-3.14 4.5-6V3L6 1z"
              fill="rgba(255,255,255,0.2)"
            />
          </svg>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Your feedback is private and helps us improve RAVA.
          </p>
        </div>
      </div>
    </div>
  );
}

function IdentityFields({
  testerName,
  deviceModel,
  onTesterChange,
}: {
  testerName: string;
  deviceModel: string;
  onTesterChange?: (field: "name" | "device", value: string) => void;
}) {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <IconInput
          label="Your Name"
          sublabel="for testing purposes"
          placeholder="Enter your name"
          value={testerName}
          onChange={(v) => onTesterChange?.("name", v)}
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="7" cy="5" r="2.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              <path
                d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <IconInput
          label="Device Model"
          sublabel=""
          placeholder="e.g. Samsung Galaxy S23"
          value={deviceModel}
          onChange={(v) => onTesterChange?.("device", v)}
          icon={
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
              <rect
                x="1.5"
                y="0.5"
                width="9"
                height="13"
                rx="1.5"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
              />
              <circle cx="6" cy="11" r="0.75" fill="rgba(255,255,255,0.4)" />
            </svg>
          }
        />
      </div>
      <p
        className="text-center mt-3 text-[11px]"
        style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.3)" }}
      >
        This helps us debug install issues on specific devices.
      </p>
    </div>
  );
}

function IconInput({
  label,
  sublabel,
  placeholder,
  value,
  onChange,
  icon,
}: {
  label: string;
  sublabel: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <p
        className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest"
        style={{ fontFamily: "var(--font-inter)", color: "rgba(255,255,255,0.5)" }}
      >
        {label}{" "}
        {sublabel && (
          <span
            className="normal-case tracking-normal"
            style={{ fontWeight: 400, color: "rgba(255,255,255,0.3)" }}
          >
            ({sublabel})
          </span>
        )}
      </p>
      <div className="relative">
        <span
          className="absolute flex items-center justify-center"
          style={{ left: 12, top: 0, bottom: 0, pointerEvents: "none" }}
        >
          {icon}
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-2.5 pr-3 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            paddingLeft: 36,
            background: "rgba(10,16,36,0.92)",
            border: `1px solid ${focused ? "#8C52FF" : "rgba(140,82,255,0.16)"}`,
            boxShadow: focused ? "0 0 12px rgba(140,82,255,0.28)" : "none",
            color: "#FFFFFF",
            fontFamily: "var(--font-inter)",
            fontSize: 14,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
}
