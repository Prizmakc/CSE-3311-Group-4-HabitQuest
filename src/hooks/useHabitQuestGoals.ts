import { Alert } from "react-native";
import { useState } from "react";

import { useHabitQuestData } from "../providers/HabitQuestDataProvider";
import { Goal, GoalStep } from "../types/habitquest";

export function useHabitQuestGoals() {
  const {
    isLoading,
    data,
    createGoal,
    updateGoal,
    deleteGoal,
    disableGentleMode,
    seedDemoData,
    resetLocalData
  } = useHabitQuestData();
  const [goalTitle, setGoalTitle] = useState("");
  const [goalWhy, setGoalWhy] = useState("");
  const [goalReward, setGoalReward] = useState("");
  const [stepDraft, setStepDraft] = useState("");
  const [draftSteps, setDraftSteps] = useState<GoalStep[]>([]);
  const [goalError, setGoalError] = useState("");
  const [goalSuccess, setGoalSuccess] = useState("");
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editGoalTitle, setEditGoalTitle] = useState("");
  const [editGoalWhy, setEditGoalWhy] = useState("");
  const [editGoalReward, setEditGoalReward] = useState("");
  const [editStepDraft, setEditStepDraft] = useState("");
  const [editSteps, setEditSteps] = useState<GoalStep[]>([]);

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

    await createGoal({
      title: goalTitle,
      why: goalWhy,
      reward: goalReward,
      steps: draftSteps
    });

    setGoalTitle("");
    setGoalWhy("");
    setGoalReward("");
    setStepDraft("");
    setDraftSteps([]);
    setGoalSuccess("Goal saved. Small progress still counts.");
  }

  function openGoalEditor(goalId: string) {
    const goal = data?.goals.find((item) => item.id === goalId);

    if (!goal) {
      return;
    }

    setEditingGoalId(goal.id);
    setEditGoalTitle(goal.title);
    setEditGoalWhy(goal.why);
    setEditGoalReward(goal.reward);
    setEditSteps(goal.steps);
    setEditStepDraft("");
  }

  function closeGoalEditor() {
    setEditingGoalId(null);
    setEditGoalTitle("");
    setEditGoalWhy("");
    setEditGoalReward("");
    setEditStepDraft("");
    setEditSteps([]);
  }

  function addEditStep() {
    const trimmed = editStepDraft.trim();

    if (!trimmed) {
      return;
    }

    setEditSteps((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        title: trimmed,
        createdAt: new Date().toISOString()
      }
    ]);
    setEditStepDraft("");
  }

  function renameEditStep(id: string, value: string) {
    setEditSteps((current) =>
      current.map((step) => (step.id === id ? { ...step, title: value } : step))
    );
  }

  function deleteEditStep(id: string) {
    setEditSteps((current) => current.filter((step) => step.id !== id));
  }

  async function saveEditedGoal() {
    if (!editingGoalId) {
      return;
    }

    if (!editGoalTitle.trim() || editSteps.length === 0) {
      return;
    }

    await updateGoal({
      id: editingGoalId,
      title: editGoalTitle,
      why: editGoalWhy,
      reward: editGoalReward,
      steps: editSteps.map((step) => ({
        ...step,
        title: step.title.trim()
      }))
    });

    closeGoalEditor();
  }

  function requestDeleteGoal(goalId: string) {
    Alert.alert("Delete goal?", "This removes the goal and all of its steps.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          void deleteGoal(goalId);
          if (editingGoalId === goalId) {
            closeGoalEditor();
          }
        }
      }
    ]);
  }

  const editingGoal: Goal | null =
    editingGoalId && data ? data.goals.find((goal) => goal.id === editingGoalId) ?? null : null;

  return {
    isLoading,
    data,
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
    saveGoal,
    editingGoal,
    editGoalTitle,
    setEditGoalTitle,
    editGoalWhy,
    setEditGoalWhy,
    editGoalReward,
    setEditGoalReward,
    editStepDraft,
    setEditStepDraft,
    editSteps,
    openGoalEditor,
    closeGoalEditor,
    addEditStep,
    renameEditStep,
    deleteEditStep,
    saveEditedGoal,
    requestDeleteGoal,
    disableGentleMode,
    seedDemoData,
    resetLocalData
  };
}
