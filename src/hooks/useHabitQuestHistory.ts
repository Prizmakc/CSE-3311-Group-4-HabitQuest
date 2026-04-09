import { useState } from "react";

import { getHistoryViewModel } from "../domain/habitQuestHistory";
import { useHabitQuestData } from "../providers/HabitQuestDataProvider";

export function useHabitQuestHistory() {
  const { isLoading, data, updateReflectionForDate } = useHabitQuestData();
  const [editingReflectionDate, setEditingReflectionDate] = useState<string | null>(null);
  const [editingReflectionText, setEditingReflectionText] = useState("");

  function openReflectionEditor(date: string, text: string) {
    setEditingReflectionDate(date);
    setEditingReflectionText(text);
  }

  function closeReflectionEditor() {
    setEditingReflectionDate(null);
    setEditingReflectionText("");
  }

  async function saveEditedReflection() {
    if (!editingReflectionDate) {
      return;
    }

    await updateReflectionForDate(editingReflectionDate, editingReflectionText);
    closeReflectionEditor();
  }

  return {
    isLoading,
    data,
    history: data ? getHistoryViewModel(data) : null,
    editingReflectionDate,
    editingReflectionText,
    setEditingReflectionText,
    openReflectionEditor,
    closeReflectionEditor,
    saveEditedReflection
  };
}
