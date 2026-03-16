import { useEffect, useState } from "react";

import { getHistoryViewModel } from "../domain/habitQuestHistory";
import { loadHabitQuestData } from "../lib/habitQuestStore";
import { HabitQuestData } from "../types/habitquest";

export function useHabitQuestHistory() {
  const [isLoading, setIsLoading] = useState(true);
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

  return {
    isLoading,
    data,
    history: data ? getHistoryViewModel(data) : null
  };
}

