import { DailyCheckIn, Goal } from "../types/habitquest";

export type GoalStepWithGoal = Goal["steps"][number] & {
  goalId: string;
  goalTitle: string;
};

export function todayDateKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getTodayCheckIn(checkIns: DailyCheckIn[]) {
  const today = todayDateKey();
  return checkIns.find((checkIn) => checkIn.date === today) ?? null;
}

export function flattenGoalSteps(goals: Goal[]): GoalStepWithGoal[] {
  return goals.flatMap((goal) =>
    goal.steps.map((step) => ({
      ...step,
      goalId: goal.id,
      goalTitle: goal.title
    }))
  );
}

export function sortCheckInsDescending(checkIns: DailyCheckIn[]) {
  return [...checkIns].sort((left, right) => right.date.localeCompare(left.date));
}

export function sortReflectionsDescending<T extends { createdAt: string }>(items: T[]) {
  return [...items].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

