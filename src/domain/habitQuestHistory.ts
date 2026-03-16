import { DailyCheckIn, HabitQuestData, Reflection, StepStatus } from "../types/habitquest";
import { sortReflectionsDescending } from "./habitQuestSelectors";
import { getHistorySnapshot } from "./habitQuestProgress";

function countStatuses(statuses: Record<string, StepStatus>, target: StepStatus) {
  return Object.values(statuses).filter((status) => status === target).length;
}

function getLastSevenDateKeys() {
  const dates: string[] = [];

  for (let index = 0; index < 7; index += 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);
    dates.push(date.toISOString().slice(0, 10));
  }

  return dates;
}

function formatEnergyTrend(checkIns: DailyCheckIn[]) {
  const energeticDays = checkIns.filter((checkIn) => checkIn.energy === "good").length;

  if (energeticDays >= 3) {
    return "Energy has been mostly steady or better.";
  }

  if (energeticDays === 0) {
    return "Energy has been mixed. Gentle pacing may help.";
  }

  return "Energy is uneven, but there are some steadier days to build on.";
}

export function getHistoryViewModel(data: HabitQuestData) {
  const snapshot = getHistorySnapshot(data);
  const lastSevenDates = getLastSevenDateKeys();
  const lastSevenCheckIns = snapshot.checkIns.filter((checkIn) => lastSevenDates.includes(checkIn.date));
  const recentReflections = sortReflectionsDescending(data.reflections).slice(0, 5);
  const totalCompleted = lastSevenCheckIns.reduce(
    (sum, checkIn) => sum + countStatuses(checkIn.statuses, "completed"),
    0
  );
  const totalPartial = lastSevenCheckIns.reduce(
    (sum, checkIn) => sum + countStatuses(checkIn.statuses, "partial"),
    0
  );
  const totalSkipped = lastSevenCheckIns.reduce(
    (sum, checkIn) => sum + countStatuses(checkIn.statuses, "skipped"),
    0
  );

  return {
    ...snapshot,
    checkInsThisWeek: lastSevenCheckIns.length,
    totalCompleted,
    totalPartial,
    totalSkipped,
    recentCheckIns: snapshot.checkIns.slice(0, 7),
    recentReflections,
    energyTrendCopy: formatEnergyTrend(lastSevenCheckIns),
    reflectionCount: data.reflections.length
  };
}

export function formatReflectionDate(reflection: Reflection) {
  return new Date(reflection.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });
}

