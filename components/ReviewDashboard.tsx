"use client";

import { useEffect, useState } from "react";
import { getAllSessions } from "@/lib/storage";
import { STEPS } from "@/lib/steps";
import { TABS } from "@/lib/tabs";
import type { Session, StepStatus } from "@/lib/types";

const STATUS_LABEL: Record<NonNullable<StepStatus>, string> = {
  Worked: "✓ Worked",
  Partially: "◑ Partially",
  No: "✗ Didn't work",
};

const STATUS_COLOR: Record<NonNullable<StepStatus>, string> = {
  Worked: "#0f7a4f",
  Partially: "#b8690a",
  No: "#c0392b",
};

function extractKeywords(notes: string[]): string[] {
  const raw = notes.join(" ").toLowerCase();
  const words = raw.match(/\b[a-z]{4,}\b/g) ?? [];
  const stopwords = new Set([
    "that", "this", "with", "from", "have", "were", "they", "just", "also",
    "more", "some", "when", "what", "where", "about", "after", "could", "would",
    "should", "there", "which", "their", "then", "than", "very", "been",
  ]);
  const freq: Record<string, number> = {};
  for (const w of words) {
    if (!stopwords.has(w)) freq[w] = (freq[w] ?? 0) + 1;
  }
  return Object.entries(freq)
    .filter(([, c]) => c > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([w]) => w);
}

export default function ReviewDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSessions(getAllSessions());
  }, []);

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filteredSteps =
    activeTab === "all" ? STEPS : STEPS.filter((s) => s.tabId === activeTab);

  // Stat: install rate (≥1 step answered)
  const totalTesters = sessions.length;
  const completedAll = sessions.filter(
    (s) => STEPS.every((st) => s.steps[st.id]?.status != null)
  ).length;

  // Most failures
  const failCounts = STEPS.map((step) => ({
    step,
    count: sessions.filter((s) => s.steps[step.id]?.status === "No").length,
  }));
  const mostFailed = failCounts.sort((a, b) => b.count - a.count)[0];

  // Highest avg rating
  const ratingSteps = STEPS.filter((s) => s.hasStars);
  const avgRatings = ratingSteps.map((step) => {
    const scores = sessions
      .map((s) => s.steps[step.id]?.ease)
      .filter((n): n is number => n != null);
    return {
      step,
      avg: scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
    };
  });
  const topRated = avgRatings.sort((a, b) => b.avg - a.avg)[0];

  // Most common keyword
  const allNotes = sessions.flatMap((s) =>
    Object.values(s.steps)
      .map((r) => r.notes ?? "")
      .filter(Boolean)
  );
  const keywords = extractKeywords(allNotes);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0D1117", color: "#F0F4F8" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{
          background: "#0D1117",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div>
          <p
            className="text-[10px] uppercase tracking-widest mb-0.5"
            style={{ fontFamily: "var(--font-dm-mono)", color: "#8896A8" }}
          >
            Private
          </p>
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Beta Review Dashboard
          </h1>
        </div>
        <span
          className="text-[11px] px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(124,33,135,0.15)",
            border: "1px solid rgba(124,33,135,0.3)",
            color: "#C83C6C",
            fontFamily: "var(--font-dm-mono)",
          }}
        >
          {totalTesters} tester{totalTesters !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard label="Total Testers" value={String(totalTesters)} />
          <StatCard label="Completed All" value={String(completedAll)} />
          <StatCard
            label="Most Failed"
            value={mostFailed?.count > 0 ? `Step ${mostFailed.step.globalNumber}` : "—"}
            sub={mostFailed?.count > 0 ? `${mostFailed.count}× failed` : undefined}
          />
          <StatCard
            label="Top Rated"
            value={topRated?.avg > 0 ? `Step ${topRated.step.globalNumber}` : "—"}
            sub={topRated?.avg > 0 ? `${topRated.avg.toFixed(1)} / 5` : undefined}
          />
        </div>

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="mb-8">
            <p
              className="text-[10px] uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-dm-mono)", color: "#8896A8" }}
            >
              Common keywords in notes
            </p>
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: "#1E2635",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#8896A8",
                    fontFamily: "var(--font-dm-mono)",
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          <FilterPill
            label="All steps"
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          />
          {TABS.map((t) => (
            <FilterPill
              key={t.id}
              label={t.label}
              active={activeTab === t.id}
              onClick={() => setActiveTab(t.id)}
            />
          ))}
        </div>

        {sessions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <TesterCard
                key={session.session}
                session={session}
                filteredSteps={filteredSteps}
                expanded={expanded.has(session.session)}
                onToggle={() => toggle(session.session)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      className="rounded-xl px-4 py-4"
      style={{
        background: "#161C27",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <p
        className="text-[9px] uppercase tracking-widest mb-1.5"
        style={{ fontFamily: "var(--font-dm-mono)", color: "#8896A8" }}
      >
        {label}
      </p>
      <p
        className="text-2xl font-bold"
        style={{ fontFamily: "var(--font-syne)", color: "#F0F4F8" }}
      >
        {value}
      </p>
      {sub && (
        <p
          className="text-[10px] mt-0.5"
          style={{ fontFamily: "var(--font-dm-mono)", color: "#8896A8" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
      style={{
        background: active
          ? "linear-gradient(135deg, #7C2187, #C83C6C)"
          : "#1E2635",
        border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.08)"}`,
        color: active ? "#ffffff" : "#8896A8",
        fontFamily: "var(--font-syne)",
      }}
    >
      {label}
    </button>
  );
}

function TesterCard({
  session,
  filteredSteps,
  expanded,
  onToggle,
}: {
  session: Session;
  filteredSteps: typeof STEPS;
  expanded: boolean;
  onToggle: () => void;
}) {
  const completedCount = STEPS.filter(
    (s) => session.steps[s.id]?.status != null
  ).length;

  const date = new Date(session.ts).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "#161C27",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #7C2187, #C83C6C)",
              fontFamily: "var(--font-syne)",
            }}
          >
            {(session.tester.name || "?")[0].toUpperCase()}
          </div>
          <div>
            <p
              className="font-semibold text-sm"
              style={{ fontFamily: "var(--font-syne)", color: "#F0F4F8" }}
            >
              {session.tester.name || "Anonymous"}
            </p>
            <p
              className="text-[11px]"
              style={{ fontFamily: "var(--font-dm-mono)", color: "#8896A8" }}
            >
              {session.tester.device || "Unknown device"} · {date}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-[11px]"
            style={{ fontFamily: "var(--font-dm-mono)", color: "#8896A8" }}
          >
            {completedCount}/{STEPS.length} steps
          </span>
          <span
            className="text-lg"
            style={{ color: "#8896A8", transform: expanded ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.2s" }}
          >
            ↓
          </span>
        </div>
      </button>

      {expanded && (
        <div
          className="px-5 pb-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="pt-4 space-y-2">
            {filteredSteps.map((step) => {
              const r = session.steps[step.id];
              if (!r) return null;
              const status = r.status;
              return (
                <div
                  key={step.id}
                  className="rounded-lg px-4 py-3"
                  style={{ background: "#1E2635" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[10px] uppercase tracking-widest mb-0.5"
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          color: "#8896A8",
                        }}
                      >
                        {step.label}
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{
                          fontFamily: "var(--font-syne)",
                          color: "#F0F4F8",
                        }}
                      >
                        {step.title}
                      </p>
                      {r.notes && (
                        <p
                          className="text-xs mt-1.5 leading-relaxed"
                          style={{
                            fontFamily: "var(--font-dm-sans)",
                            color: "#8896A8",
                          }}
                        >
                          "{r.notes}"
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      {status && (
                        <span
                          className="text-[11px] px-2.5 py-1 rounded-md font-medium"
                          style={{
                            background: STATUS_COLOR[status] + "22",
                            color: STATUS_COLOR[status],
                            border: `1px solid ${STATUS_COLOR[status]}44`,
                            fontFamily: "var(--font-dm-sans)",
                          }}
                        >
                          {STATUS_LABEL[status]}
                        </span>
                      )}
                      {r.ease != null && (
                        <span
                          className="text-[10px]"
                          style={{
                            fontFamily: "var(--font-dm-mono)",
                            color: "#f4b942",
                          }}
                        >
                          {"★".repeat(r.ease)}
                          <span style={{ color: "#2A3547" }}>
                            {"★".repeat(5 - r.ease)}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "#161C27", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span style={{ fontSize: 24 }}>📊</span>
      </div>
      <p
        className="text-lg font-semibold mb-2"
        style={{ fontFamily: "var(--font-syne)", color: "#F0F4F8" }}
      >
        No sessions yet
      </p>
      <p
        className="text-sm max-w-xs"
        style={{ fontFamily: "var(--font-dm-sans)", color: "#8896A8" }}
      >
        Feedback will appear here once testers complete the guide.
      </p>
    </div>
  );
}
