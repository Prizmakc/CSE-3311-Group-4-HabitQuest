import { useState } from "react";

import { useHabitQuestData } from "../providers/HabitQuestDataProvider";
import { GoalStep } from "../types/habitquest";

export function useHabitQuestGoals() {
  const { isLoading, data, createGoal, disableGentleMode, seedDemoData, resetLocalData } =
    useHabitQuestData();
  const [goalTitle, setGoalTitle] = useState("");
  const [goalWhy, setGoalWhy] = useState("");
  const [goalReward, setGoalReward] = useState("");
  const [stepDraft, setStepDraft] = useState("");
  const [draftSteps, setDraftSteps] = useState<GoalStep[]>([]);
  const [goalError, setGoalError] = useState("");
  const [goalSuccess, setGoalSuccess] = useState("");

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
    disableGentleMode,
    seedDemoData,
    resetLocalData
  };
}
