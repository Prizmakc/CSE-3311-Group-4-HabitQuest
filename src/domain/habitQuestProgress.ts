import { DailyCheckIn, HabitQuestData, StepStatus } from "../types/habitquest";
import {
  flattenGoalSteps,
  getTodayCheckIn,
  GoalStepWithGoal,
  sortCheckInsDescending,
  sortReflectionsDescending,
  todayDateKey
} from "./habitQuestSelectors";

function getRelativeDates(days: number) {
  const dates: string[] = [];

  for (let index = 0; index < days; index += 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);
    dates.push(date.toISOString().slice(0, 10));
  }

  return dates;
}

function isPositiveStatus(status: StepStatus) {
  return status === "completed" || status === "partial";
}

export function getMissedDays(checkIns: DailyCheckIn[]) {
  const recentDates = getRelativeDates(3);

  return recentDates.filter((date) => {
    if (date === todayDateKey()) {
      return false;
    }

    return !checkIns.some((checkIn) => checkIn.date === date);
  }).length;
}

export function getStreak(checkIns: DailyCheckIn[]) {
  const sorted = sortCheckInsDescending(checkIns);
  let streak = 0;
  let cursor = new Date();

  for (const checkIn of sorted) {
    const cursorKey = cursor.toISOString().slice(0, 10);
    const isToday = checkIn.date === todayDateKey();

    if (checkIn.date === cursorKey || (streak === 0 && isToday)) {
      const completedSteps = Object.values(checkIn.statuses).filter(isPositiveStatus);

      if (completedSteps.length === 0) {
        break;
      }

      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    break;
  }

  return streak;
}

export function getCompletionPercent(allSteps: GoalStepWithGoal[], checkIns: DailyCheckIn[]) {
  const todayCheckIn = getTodayCheckIn(checkIns);
  const completedCount = Object.values(todayCheckIn?.statuses ?? {}).filter(isPositiveStatus).length;

  return allSteps.length === 0 ? 0 : (completedCount / allSteps.length) * 100;
}

export function getCompletedCount(checkIns: DailyCheckIn[]) {
  const todayCheckIn = getTodayCheckIn(checkIns);
  return Object.values(todayCheckIn?.statuses ?? {}).filter(isPositiveStatus).length;
}

export function getRequiredStepsToday(allSteps: GoalStepWithGoal[], gentleModeEnabled: boolean) {
  return gentleModeEnabled ? 1 : Math.min(3, Math.max(1, allSteps.length));
}

export function shouldSuggestGentleMode(checkIns: DailyCheckIn[], gentleModeEnabled: boolean) {
  return getMissedDays(checkIns) >= 2 && !gentleModeEnabled;
}

export function getHistorySnapshot(data: HabitQuestData) {
  return {
    allSteps: flattenGoalSteps(data.goals),
    checkIns: sortCheckInsDescending(data.checkIns),
    reflections: sortReflectionsDescending(data.reflections),
    todayCheckIn: getTodayCheckIn(data.checkIns),
    completedCount: getCompletedCount(data.checkIns),
    completionPercent: getCompletionPercent(flattenGoalSteps(data.goals), data.checkIns),
    streak: getStreak(data.checkIns),
    missedDays: getMissedDays(data.checkIns),
    requiredStepsToday: getRequiredStepsToday(
      flattenGoalSteps(data.goals),
      data.gentleModeEnabled
    ),
    gentleModeSuggestion: shouldSuggestGentleMode(data.checkIns, data.gentleModeEnabled)
  };
}

