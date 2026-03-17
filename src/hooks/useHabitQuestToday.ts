import { useEffect, useState } from "react";

import { getHistorySnapshot } from "../domain/habitQuestProgress";
import { getTodayCheckIn } from "../domain/habitQuestSelectors";
import { useHabitQuestData } from "../providers/HabitQuestDataProvider";
import { DailyCheckIn, Reflection } from "../types/habitquest";

export function useHabitQuestToday() {
  const {
    isLoading,
    saveState,
    data,
    setStepStatus,
    saveDailyNote,
    saveReflection,
    enableGentleMode
  } = useHabitQuestData();
  const [dailyNote, setDailyNote] = useState("");
  const [energy, setEnergy] = useState<DailyCheckIn["energy"]>("");
  const [reflectionText, setReflectionText] = useState("");
  const [reflectionPeriod, setReflectionPeriod] = useState<Reflection["period"]>("daily");
  const [reflectionMessage, setReflectionMessage] = useState("");

  useEffect(() => {
    if (!data) {
      return;
    }

    const todayCheckIn = getTodayCheckIn(data.checkIns);
    setDailyNote(todayCheckIn?.note ?? "");
    setEnergy(todayCheckIn?.energy ?? "");
  }, [data]);

  const history = data ? getHistorySnapshot(data) : null;

  return {
    isLoading,
    saveState,
    data,
    history,
    dailyNote,
    setDailyNote,
    energy,
    setEnergy,
    reflectionText,
    setReflectionText,
    reflectionPeriod,
    setReflectionPeriod,
    reflectionMessage,
    setReflectionMessage,
    saveDailyNote: async () => saveDailyNote(dailyNote, energy),
    setStepStatus: async (stepId: string, status: "completed" | "partial" | "skipped") =>
      setStepStatus(stepId, status, dailyNote, energy),
    saveReflection: async () => {
      await saveReflection(reflectionPeriod, reflectionText);
      setReflectionText("");
      setReflectionMessage("Reflection saved. You are not starting over.");
    },
    enableGentleMode
  };
}

