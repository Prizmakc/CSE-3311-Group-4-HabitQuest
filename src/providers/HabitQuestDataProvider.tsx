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
  StepStatus
} from "../types/habitquest";
import { getTodayCheckIn, todayDateKey } from "../domain/habitQuestSelectors";
import { isGentleModeActiveForDate } from "../domain/habitQuestProgress";

type CreateGoalInput = {
  title: string;
  why: string;
  reward: string;
  steps: GoalStep[];
};

type UpdateGoalInput = {
  id: string;
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
  updateGoal: (input: UpdateGoalInput) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  saveCheckIn: (statuses: Record<string, StepStatus>) => Promise<void>;
  saveReflection: (text: string) => Promise<void>;
  updateReflectionForDate: (date: string, text: string) => Promise<void>;
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
    gentleModeEnabled: false,
    gentleModeDate: undefined
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

  async function updateGoal(input: UpdateGoalInput) {
    if (!data) {
      return;
    }

    await persist({
      ...data,
      goals: data.goals.map((goal) =>
        goal.id === input.id
          ? {
              ...goal,
              title: input.title.trim(),
              why: input.why.trim(),
              reward: input.reward.trim(),
              steps: input.steps
            }
          : goal
      )
    });
  }

  async function deleteGoal(goalId: string) {
    if (!data) {
      return;
    }

    const goalToDelete = data.goals.find((goal) => goal.id === goalId);
    const stepIds = new Set(goalToDelete?.steps.map((step) => step.id) ?? []);

    await persist({
      ...data,
      goals: data.goals.filter((goal) => goal.id !== goalId),
      checkIns: data.checkIns.map((checkIn) => ({
        ...checkIn,
        statuses: Object.fromEntries(
          Object.entries(checkIn.statuses).filter(([stepId]) => !stepIds.has(stepId))
        )
      }))
    });
  }

  async function saveCheckIn(statuses: Record<string, StepStatus>) {
    if (!data) {
      return;
    }

    const today = todayDateKey();
    const existing = getTodayCheckIn(data.checkIns);
    const completionMode = isGentleModeActiveForDate(data, today) ? "gentle" : "normal";
    const nextCheckIn: DailyCheckIn = existing
      ? {
          ...existing,
          statuses,
          completionMode
        }
      : {
          date: today,
          statuses,
          completionMode
        };

    const remaining = data.checkIns.filter((checkIn) => checkIn.date !== today);
    await persist({
      ...data,
      checkIns: [nextCheckIn, ...remaining]
    });
  }

  async function saveReflection(text: string) {
    if (!data) {
      return;
    }

    const today = todayDateKey();
    const existing = getTodayCheckIn(data.checkIns);
    const nextCheckIn: DailyCheckIn = existing
      ? {
          ...existing,
          reflection: text.trim() || undefined
        }
      : {
          date: today,
          statuses: {},
          reflection: text.trim() || undefined
        };

    const remaining = data.checkIns.filter((checkIn) => checkIn.date !== today);
    await persist({
      ...data,
      checkIns: [nextCheckIn, ...remaining]
    });
  }

  async function updateReflectionForDate(date: string, text: string) {
    if (!data) {
      return;
    }

    await persist({
      ...data,
      checkIns: data.checkIns.map((checkIn) =>
        checkIn.date === date
          ? {
              ...checkIn,
              reflection: text.trim() || undefined
            }
          : checkIn
      )
    });
  }

  async function enableGentleMode() {
    if (!data) {
      return;
    }

    await persist({
      ...data,
      gentleModeEnabled: true,
      gentleModeDate: todayDateKey()
    });
  }

  async function disableGentleMode() {
    if (!data) {
      return;
    }

    await persist({
      ...data,
      gentleModeEnabled: false,
      gentleModeDate: undefined
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
      updateGoal,
      deleteGoal,
      saveCheckIn,
      saveReflection,
      updateReflectionForDate,
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
