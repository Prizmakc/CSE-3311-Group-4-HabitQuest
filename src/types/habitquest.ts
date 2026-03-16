export type StepStatus = "completed" | "partial" | "skipped";

export type GoalStep = {
  id: string;
  title: string;
  createdAt: string;
};

export type Goal = {
  id: string;
  title: string;
  why: string;
  reward: string;
  createdAt: string;
  steps: GoalStep[];
};

export type DailyCheckIn = {
  date: string;
  statuses: Record<string, StepStatus>;
  note: string;
  energy: "low" | "steady" | "good" | "";
};

export type Reflection = {
  id: string;
  createdAt: string;
  period: "daily" | "weekly";
  text: string;
};

export type HabitQuestData = {
  goals: Goal[];
  checkIns: DailyCheckIn[];
  reflections: Reflection[];
  gentleModeEnabled: boolean;
};

