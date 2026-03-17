import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

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
import { getTodayCheckIn, todayDateKey } from "../domain/habitQuestSelectors";

type CreateGoalInput = {
  title: string;
  why: string;
  reward: string;
  steps: GoalStep[];
};

type HabitQuestDataContextValue = {
  isLoading: boolean;
  saveState: "idle" | "saving";
  data: HabitQuestData | null;
  createGoal: (input: CreateGoalInput) => Promise<void>;
  setStepStatus: (
    stepId: string,
    status: StepStatus,
    note: string,
    energy: DailyCheckIn["energy"]
  ) => Promise<void>;
  saveDailyNote: (note: string, energy: DailyCheckIn["energy"]) => Promise<void>;
  saveReflection: (period: Reflection["period"], text: string) => Promise<void>;
  enableGentleMode: () => Promise<void>;
  disableGentleMode: () => Promise<void>;
  seedDemoData: () => Promise<void>;
  resetLocalData: () => Promise<void>;
};

const HabitQuestDataContext = createContext<HabitQuestDataContextValue | undefined>(undefined);

function emptyData(): HabitQuestData {
  return {
    goals: [],
    checkIns: [],
    reflections: [],
    gentleModeEnabled: false
  };
}

export function HabitQuestDataProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [saveState, setSaveState] = useState<"idle" | "saving">("idle");
  const [data, setData] = useState<HabitQuestData | null>(null);

  useEffect(() => {
    let mounted = true;

    loadHabitQuestData().then((nextData) => {
      if (!mounted) {
        return;
      }

      setData(nextData);
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

  async function createGoal(input: CreateGoalInput) {
    if (!data) {
      return;
    }

    const nextGoal: Goal = {
      id: `${Date.now()}`,
      title: input.title.trim(),
      why: input.why.trim(),
      reward: input.reward.trim(),
      createdAt: new Date().toISOString(),
      steps: input.steps
    };

    await persist({
      ...data,
      goals: [nextGoal, ...data.goals]
    });
  }

  async function setStepStatus(
    stepId: string,
    status: StepStatus,
    note: string,
    energy: DailyCheckIn["energy"]
  ) {
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
          note,
          energy
        }
      : {
          date: today,
          statuses: {
            [stepId]: status
          },
          note,
          energy
        };

    const remaining = data.checkIns.filter((checkIn) => checkIn.date !== today);
    await persist({
      ...data,
      checkIns: [nextCheckIn, ...remaining]
    });
  }

  async function saveDailyNote(note: string, energy: DailyCheckIn["energy"]) {
    if (!data) {
      return;
    }

    const today = todayDateKey();
    const existing = getTodayCheckIn(data.checkIns);
    const nextCheckIn: DailyCheckIn = existing
      ? {
          ...existing,
          note,
          energy
        }
      : {
          date: today,
          statuses: {},
          note,
          energy
        };

    const remaining = data.checkIns.filter((checkIn) => checkIn.date !== today);
    await persist({
      ...data,
      checkIns: [nextCheckIn, ...remaining]
    });
  }

  async function saveReflection(period: Reflection["period"], text: string) {
    if (!data || !text.trim()) {
      return;
    }

    const nextReflection: Reflection = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      period,
      text: text.trim()
    };

    await persist({
      ...data,
      reflections: [nextReflection, ...data.reflections]
    });
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
    setIsLoading(false);
  }

  async function resetLocalData() {
    await resetHabitQuestData();
    setData(emptyData());
    setIsLoading(false);
  }

  const value = useMemo(
    () => ({
      isLoading,
      saveState,
      data,
      createGoal,
      setStepStatus,
      saveDailyNote,
      saveReflection,
      enableGentleMode,
      disableGentleMode,
      seedDemoData,
      resetLocalData
    }),
    [data, isLoading, saveState]
  );

  return <HabitQuestDataContext.Provider value={value}>{children}</HabitQuestDataContext.Provider>;
}

export function useHabitQuestData() {
  const context = useContext(HabitQuestDataContext);

  if (!context) {
    throw new Error("useHabitQuestData must be used within HabitQuestDataProvider");
  }

  return context;
}

