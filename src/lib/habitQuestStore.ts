import AsyncStorage from "@react-native-async-storage/async-storage";

import { CompletionMode, HabitQuestData } from "../types/habitquest";

const STORAGE_KEY = "habitquest.local-data.v1";

export const initialHabitQuestData: HabitQuestData = {
  goals: [],
  checkIns: [],
  gentleModeEnabled: false,
  gentleModeDate: undefined
};

export async function loadHabitQuestData() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return initialHabitQuestData;
  }

  try {
    const parsed = JSON.parse(raw) as {
      goals?: HabitQuestData["goals"];
      checkIns?: Array<{
        date: string;
        statuses?: Record<string, "completed" | "partial" | "skipped">;
        note?: string;
        reflection?: string;
        completionMode?: CompletionMode;
      }>;
      reflections?: Array<{ createdAt: string; text: string }>;
      gentleModeEnabled?: boolean;
      gentleModeDate?: string;
    };
    const migratedCheckIns = (parsed.checkIns ?? []).map((checkIn) => ({
      date: checkIn.date,
      statuses: checkIn.statuses ?? {},
      reflection: checkIn.reflection ?? checkIn.note ?? undefined,
      completionMode: checkIn.completionMode ?? "normal"
    }));

    for (const legacyReflection of parsed.reflections ?? []) {
      const dateKey = legacyReflection.createdAt.slice(0, 10);
      const existing = migratedCheckIns.find((checkIn) => checkIn.date === dateKey);

      if (existing) {
        existing.reflection = existing.reflection
          ? `${existing.reflection}\n\n${legacyReflection.text}`
          : legacyReflection.text;
      } else {
        migratedCheckIns.push({
          date: dateKey,
          statuses: {},
          reflection: legacyReflection.text,
          completionMode: "normal"
        });
      }
    }

    return {
      goals: parsed.goals ?? [],
      checkIns: migratedCheckIns,
      gentleModeEnabled: false,
      gentleModeDate: undefined
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
        reflection: "A lighter day still helped.",
        completionMode: "gentle"
      },
      {
        date: yesterdayKey,
        statuses: {
          "step-demo-1": "completed"
        },
        completionMode: "normal"
      }
    ],
    gentleModeEnabled: false,
    gentleModeDate: undefined
  };
}
