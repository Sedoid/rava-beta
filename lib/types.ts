export type StepStatus = "Worked" | "Partially" | "No" | null;

export interface StepResponse {
  status: StepStatus;
  ease?: number; // 1–5, only on starred steps
  notes?: string;
}

export interface TesterInfo {
  name: string;
  device: string;
}

export interface Session {
  session: string;
  ts: string;
  tester: TesterInfo;
  steps: Record<string, StepResponse>;
}

export type TabIconName =
  | "setup"
  | "configure"
  | "explore"
  | "organise"
  | "advanced";

export interface Tab {
  id: string;
  label: string;
  icon: TabIconName;
  stepIds: string[];
}

export interface Step {
  id: string;
  globalNumber: number; // 1–13
  tabId: string;
  label: string; // e.g. "01 / Setup"
  title: string;
  description?: string; // one-line subtitle shown below title
  actionItems: string[];
  warning?: string;
  videoUrl?: string;
  hasStars?: boolean; // steps 5, 6, 8, 9, 11, 13
  notesPlaceholder: string;
  capturesIdentity?: boolean; // Step 1 only
  trackLabel?: string;
}
