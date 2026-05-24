import type { Tab } from "./types";

export const TABS: Tab[] = [
  {
    id: "setup",
    label: "Setup",
    icon: "setup",
    stepIds: ["step-1", "step-2", "step-3"],
  },
  {
    id: "configure",
    label: "Configure",
    icon: "configure",
    stepIds: ["step-4"],
  },
  {
    id: "explore",
    label: "Explore",
    icon: "explore",
    stepIds: ["step-5", "step-6"],
  },
  {
    id: "organise",
    label: "Organise",
    icon: "organise",
    stepIds: ["step-7", "step-8", "step-9"],
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: "advanced",
    stepIds: ["step-10", "step-11", "step-12", "step-13"],
  },
];
