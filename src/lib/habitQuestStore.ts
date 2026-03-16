import AsyncStorage from "@react-native-async-storage/async-storage";

import { HabitQuestData } from "../types/habitquest";

const STORAGE_KEY = "habitquest.local-data.v1";

export const initialHabitQuestData: HabitQuestData = {
  goals: [],
  checkIns: [],
  reflections: [],
  gentleModeEnabled: false
};

export async function loadHabitQuestData() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return initialHabitQuestData;
  }

  try {
    const parsed = JSON.parse(raw) as HabitQuestData;

    return {
      goals: parsed.goals ?? [],
      checkIns: parsed.checkIns ?? [],
      reflections: parsed.reflections ?? [],
      gentleModeEnabled: parsed.gentleModeEnabled ?? false
    };
  } catch {
    return initialHabitQuestData;
  }
}

export async function saveHabitQuestData(data: HabitQuestData) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function resetHabitQuestData() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function seedHabitQuestData(data: HabitQuestData) {
  await saveHabitQuestData(data);
}

export function createDemoHabitQuestData(): HabitQuestData {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  return {
    goals: [
      {
        id: "goal-demo-1",
        title: "Feel more grounded this semester",
        why: "I want a routine that helps me show up with more energy.",
        reward: "Get sushi after a strong week.",
        createdAt: now.toISOString(),
        steps: [
          {
            id: "step-demo-1",
            title: "Walk for 20 minutes",
            createdAt: now.toISOString()
          },
          {
            id: "step-demo-2",
            title: "Review class notes for 15 minutes",
            createdAt: now.toISOString()
          }
        ]
      }
    ],
    checkIns: [
      {
        date: today,
        statuses: {
          "step-demo-1": "completed",
          "step-demo-2": "partial"
        },
        note: "A lighter day still helped.",
        energy: "steady"
      },
      {
        date: yesterdayKey,
        statuses: {
          "step-demo-1": "completed"
        },
        note: "",
        energy: "good"
      }
    ],
    reflections: [
      {
        id: "reflection-demo-1",
        createdAt: now.toISOString(),
        period: "weekly",
        text: "Shorter routines work better when class gets busy."
      }
    ],
    gentleModeEnabled: false
  };
}
