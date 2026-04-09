import { DailyCheckIn, HabitQuestData, StepStatus } from "../types/habitquest";
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

export function getHistoryViewModel(data: HabitQuestData) {
  const snapshot = getHistorySnapshot(data);
  const lastSevenDates = getLastSevenDateKeys();
  const lastSevenCheckIns = snapshot.checkIns.filter((checkIn) => lastSevenDates.includes(checkIn.date));
  const recentReflections = snapshot.checkIns
    .filter((checkIn) => checkIn.reflection)
    .slice(0, 5)
    .map((checkIn) => ({
      date: checkIn.date,
      text: checkIn.reflection ?? ""
    }));
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
    reflectionCount: recentReflections.length
  };
}

export function formatHistoryDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
