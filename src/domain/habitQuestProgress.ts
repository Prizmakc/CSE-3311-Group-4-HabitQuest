import { DailyCheckIn, HabitQuestData, StepStatus } from "../types/habitquest";
import {
  flattenGoalSteps,
  getTodayCheckIn,
  GoalStepWithGoal,
  sortCheckInsDescending,
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

export function isGentleModeActiveForDate(data: HabitQuestData, date = todayDateKey()) {
  return Boolean(data.gentleModeEnabled && data.gentleModeDate === date);
}

export function hasCompletedAtLeastOneStep(statuses: Record<string, StepStatus>) {
  return Object.values(statuses).some((status) => status === "completed");
}

function hasAnyPositiveProgress(statuses: Record<string, StepStatus>) {
  return Object.values(statuses).some(isPositiveStatus);
}

export function isDailyCheckInSuccessful(checkIn: DailyCheckIn | null) {
  if (!checkIn) {
    return false;
  }

  if (checkIn.completionMode === "gentle") {
    return hasCompletedAtLeastOneStep(checkIn.statuses);
  }

  return hasAnyPositiveProgress(checkIn.statuses);
}

export function getCompletionModeLabel(checkIn: DailyCheckIn) {
  return checkIn.completionMode === "gentle" ? "Gentle Day" : "Normal";
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
      if (!isDailyCheckInSuccessful(checkIn)) {
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

export function isDaySuccessful(checkIn: DailyCheckIn | null, gentleModeActiveToday: boolean) {
  if (!checkIn) {
    return false;
  }

  if (checkIn.completionMode) {
    return isDailyCheckInSuccessful(checkIn);
  }

  return gentleModeActiveToday
    ? hasCompletedAtLeastOneStep(checkIn.statuses)
    : hasAnyPositiveProgress(checkIn.statuses);
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

export function getHistorySnapshot(data: HabitQuestData) {
  const gentleModeActiveToday = isGentleModeActiveForDate(data);

  return {
    allSteps: flattenGoalSteps(data.goals),
    checkIns: sortCheckInsDescending(data.checkIns),
    todayCheckIn: getTodayCheckIn(data.checkIns),
    completedCount: getCompletedCount(data.checkIns),
    completionPercent: getCompletionPercent(flattenGoalSteps(data.goals), data.checkIns),
    streak: getStreak(data.checkIns),
    missedDays: getMissedDays(data.checkIns),
    gentleModeActiveToday,
    daySuccessful: isDaySuccessful(getTodayCheckIn(data.checkIns), gentleModeActiveToday),
    requiredStepsToday: getRequiredStepsToday(
      flattenGoalSteps(data.goals),
      gentleModeActiveToday
    )
  };
}
