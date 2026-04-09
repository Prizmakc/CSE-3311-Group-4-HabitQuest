import { useEffect, useState } from "react";

import { getHistorySnapshot } from "../domain/habitQuestProgress";
import { getTodayCheckIn } from "../domain/habitQuestSelectors";
import { useHabitQuestData } from "../providers/HabitQuestDataProvider";
import { StepStatus } from "../types/habitquest";

function cycleStatus(status: StepStatus | null) {
  if (status === null) {
    return "completed";
  }

  if (status === "completed") {
    return "partial";
  }

  if (status === "partial") {
    return "skipped";
  }

  return null;
}

export function useHabitQuestToday() {
  const {
    isLoading,
    saveState,
    data,
    saveCheckIn,
    saveReflection,
    enableGentleMode
  } = useHabitQuestData();
  const [draftStatuses, setDraftStatuses] = useState<Record<string, StepStatus>>({});
  const [reflectionText, setReflectionText] = useState("");
  const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);

  useEffect(() => {
    if (!data) {
      return;
    }

    const todayCheckIn = getTodayCheckIn(data.checkIns);
    setDraftStatuses(todayCheckIn?.statuses ?? {});
  }, [data]);

  const history = data ? getHistorySnapshot(data) : null;

  function toggleTaskStatus(stepId: string) {
    setDraftStatuses((current) => {
      const nextStatus = cycleStatus(current[stepId] ?? null);

      if (nextStatus === null) {
        const next = { ...current };
        delete next[stepId];
        return next;
      }

      return {
        ...current,
        [stepId]: nextStatus
      };
    });
  }

  async function completeCheckIn() {
    await saveCheckIn(draftStatuses);
    setIsReflectionModalOpen(true);
  }

  async function skipReflection() {
    setReflectionText("");
    setIsReflectionModalOpen(false);
  }

  return {
    isLoading,
    saveState,
    data,
    history,
    draftStatuses,
    reflectionText,
    setReflectionText,
    isReflectionModalOpen,
    toggleTaskStatus,
    completeCheckIn,
    skipReflection,
    saveReflection: async () => {
      if (reflectionText.trim()) {
        await saveReflection(reflectionText);
      }
      setReflectionText("");
      setIsReflectionModalOpen(false);
    },
    enableGentleMode
  };
}
