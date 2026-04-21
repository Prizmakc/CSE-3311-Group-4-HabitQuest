export type StepStatus = "completed" | "partial" | "skipped";
export type CompletionMode = "normal" | "gentle";

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
  completionMode?: CompletionMode;
};

export type HabitQuestData = {
  goals: Goal[];
  checkIns: DailyCheckIn[];
  gentleModeEnabled: boolean;
  gentleModeDate?: string;
};
