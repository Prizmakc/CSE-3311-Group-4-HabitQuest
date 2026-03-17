import { getHistoryViewModel } from "../domain/habitQuestHistory";
import { useHabitQuestData } from "../providers/HabitQuestDataProvider";

export function useHabitQuestHistory() {
  const { isLoading, data } = useHabitQuestData();

  return {
    isLoading,
    data,
    history: data ? getHistoryViewModel(data) : null
  };
}
