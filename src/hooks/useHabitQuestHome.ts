import { useEffect, useState } from "react";

import {
  createDemoHabitQuestData,
  loadHabitQuestData,
  resetHabitQuestData,
  saveHabitQuestData,
  seedHabitQuestData
} from "../lib/habitQuestStore";
import {
  DailyCheckIn,
  Goal,
  GoalStep,
  HabitQuestData,
  Reflection,
  StepStatus
} from "../types/habitquest";
import { getHistorySnapshot } from "../domain/habitQuestProgress";
import { getTodayCheckIn, todayDateKey } from "../domain/habitQuestSelectors";

export function useHabitQuestHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [saveState, setSaveState] = useState<"idle" | "saving">("idle");
  const [data, setData] = useState<HabitQuestData | null>(null);

  const [goalTitle, setGoalTitle] = useState("");
  const [goalWhy, setGoalWhy] = useState("");
  const [goalReward, setGoalReward] = useState("");
  const [stepDraft, setStepDraft] = useState("");
  const [draftSteps, setDraftSteps] = useState<GoalStep[]>([]);
  const [goalError, setGoalError] = useState("");
  const [goalSuccess, setGoalSuccess] = useState("");

  const [dailyNote, setDailyNote] = useState("");
  const [energy, setEnergy] = useState<DailyCheckIn["energy"]>("");
  const [reflectionText, setReflectionText] = useState("");
  const [reflectionPeriod, setReflectionPeriod] = useState<Reflection["period"]>("daily");
  const [reflectionMessage, setReflectionMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    loadHabitQuestData().then((nextData) => {
      if (!mounted) {
        return;
      }

      setData(nextData);

      const todayCheckIn = getTodayCheckIn(nextData.checkIns);
      if (todayCheckIn) {
        setDailyNote(todayCheckIn.note);
        setEnergy(todayCheckIn.energy);
      }

      setIsLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  async function persist(nextData: HabitQuestData) {
    setData(nextData);
    setSaveState("saving");
    await saveHabitQuestData(nextData);
    setSaveState("idle");
  }

  function addDraftStep() {
    const trimmed = stepDraft.trim();

    if (!trimmed) {
      return;
    }

    setDraftSteps((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        title: trimmed,
        createdAt: new Date().toISOString()
      }
    ]);
    setStepDraft("");
    setGoalError("");
  }

  function removeDraftStep(id: string) {
    setDraftSteps((current) => current.filter((step) => step.id !== id));
  }

  async function saveGoal() {
    if (!data) {
      return;
    }

    setGoalError("");
    setGoalSuccess("");

    const missing: string[] = [];
    if (!goalTitle.trim()) {
      missing.push("a goal title");
    }
    if (draftSteps.length === 0) {
      missing.push("at least one step");
    }

    if (missing.length > 0) {
      setGoalError(`Cannot save yet. Add ${missing.join(" and ")}.`);
      return;
    }

    const nextGoal: Goal = {
      id: `${Date.now()}`,
      title: goalTitle.trim(),
      why: goalWhy.trim(),
      reward: goalReward.trim(),
      createdAt: new Date().toISOString(),
      steps: draftSteps
    };

    await persist({
      ...data,
      goals: [nextGoal, ...data.goals]
    });

    setGoalTitle("");
    setGoalWhy("");
    setGoalReward("");
    setDraftSteps([]);
    setGoalSuccess("Goal saved. Small progress still counts.");
  }

  async function setStepStatus(stepId: string, status: StepStatus) {
    if (!data) {
      return;
    }

    const today = todayDateKey();
    const existing = getTodayCheckIn(data.checkIns);
    const nextCheckIn: DailyCheckIn = existing
      ? {
          ...existing,
          statuses: {
            ...existing.statuses,
            [stepId]: status
          },
          note: dailyNote,
          energy
        }
      : {
          date: today,
          statuses: {
            [stepId]: status
          },
          note: dailyNote,
          energy
        };

    const remaining = data.checkIns.filter((checkIn) => checkIn.date !== today);
    await persist({
      ...data,
      checkIns: [nextCheckIn, ...remaining]
    });
  }

  async function saveDailyNote() {
    if (!data) {
      return;
    }

    const today = todayDateKey();
    const existing = getTodayCheckIn(data.checkIns);
    const nextCheckIn: DailyCheckIn = existing
      ? {
          ...existing,
          note: dailyNote,
          energy
        }
      : {
          date: today,
          statuses: {},
          note: dailyNote,
          energy
        };

    const remaining = data.checkIns.filter((checkIn) => checkIn.date !== today);
    await persist({
      ...data,
      checkIns: [nextCheckIn, ...remaining]
    });
  }

  async function saveReflection() {
    if (!data || !reflectionText.trim()) {
      return;
    }

    const nextReflection: Reflection = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      period: reflectionPeriod,
      text: reflectionText.trim()
    };

    await persist({
      ...data,
      reflections: [nextReflection, ...data.reflections]
    });

    setReflectionText("");
    setReflectionMessage("Reflection saved. You are not starting over.");
  }

  async function enableGentleMode() {
    if (!data) {
      return;
    }

    await persist({
      ...data,
      gentleModeEnabled: true
    });
  }

  async function disableGentleMode() {
    if (!data) {
      return;
    }

    await persist({
      ...data,
      gentleModeEnabled: false
    });
  }

  async function seedDemoData() {
    const seeded = createDemoHabitQuestData();
    await seedHabitQuestData(seeded);
    setData(seeded);
    setGoalTitle("");
    setGoalWhy("");
    setGoalReward("");
    setStepDraft("");
    setDraftSteps([]);
    setGoalError("");
    setGoalSuccess("");
    setReflectionText("");
    setReflectionMessage("");
    const todayCheckIn = getTodayCheckIn(seeded.checkIns);
    setDailyNote(todayCheckIn?.note ?? "");
    setEnergy(todayCheckIn?.energy ?? "");
    setIsLoading(false);
  }

  async function resetLocalData() {
    await resetHabitQuestData();
    setData({
      goals: [],
      checkIns: [],
      reflections: [],
      gentleModeEnabled: false
    });
    setGoalTitle("");
    setGoalWhy("");
    setGoalReward("");
    setStepDraft("");
    setDraftSteps([]);
    setGoalError("");
    setGoalSuccess("");
    setDailyNote("");
    setEnergy("");
    setReflectionText("");
    setReflectionMessage("");
    setReflectionPeriod("daily");
    setIsLoading(false);
  }

  const history = data ? getHistorySnapshot(data) : null;

  return {
    isLoading,
    saveState,
    data,
    history,
    goalForm: {
      goalTitle,
      setGoalTitle,
      goalWhy,
      setGoalWhy,
      goalReward,
      setGoalReward,
      stepDraft,
      setStepDraft,
      draftSteps,
      goalError,
      goalSuccess,
      addDraftStep,
      removeDraftStep,
      saveGoal
    },
    checkInForm: {
      dailyNote,
      setDailyNote,
      energy,
      setEnergy,
      saveDailyNote,
      setStepStatus
    },
    reflectionForm: {
      reflectionText,
      setReflectionText,
      reflectionPeriod,
      setReflectionPeriod,
      reflectionMessage,
      setReflectionMessage,
      saveReflection
    },
    gentleMode: {
      enableGentleMode,
      disableGentleMode
    },
    developerTools: {
      seedDemoData,
      resetLocalData
    }
  };
}

