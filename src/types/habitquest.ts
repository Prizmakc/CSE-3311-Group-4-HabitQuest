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
  reflection?: string;
};

export type HabitQuestData = {
  goals: Goal[];
  checkIns: DailyCheckIn[];
  gentleModeEnabled: boolean;
};
