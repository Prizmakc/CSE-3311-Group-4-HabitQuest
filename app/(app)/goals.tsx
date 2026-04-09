import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DeveloperToolsCard } from "../../src/components/home/DeveloperToolsCard";
import { GoalComposerCard } from "../../src/components/home/GoalComposerCard";
import { GoalEditModal } from "../../src/components/home/GoalEditModal";
import { GoalsListCard } from "../../src/components/home/GoalsListCard";
import { homeStyles } from "../../src/components/home/styles";
import { useHabitQuestGoals } from "../../src/hooks/useHabitQuestGoals";

export default function GoalsScreen() {
  const {
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
  } = useHabitQuestGoals();

  if (isLoading || !data) {
    return (
      <SafeAreaView style={homeStyles.loadingSafe}>
        <View style={homeStyles.loadingWrap}>
          <ActivityIndicator size="large" color="#20443A" />
          <Text style={homeStyles.loadingText}>Loading your goals...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={homeStyles.safe}>
      <ScrollView contentContainerStyle={homeStyles.container}>
        <GoalsListCard
          goals={data.goals}
          gentleModeEnabled={data.gentleModeEnabled}
          onDisableGentleMode={() => {
            void disableGentleMode();
          }}
          onEditGoal={openGoalEditor}
          onDeleteGoal={requestDeleteGoal}
        />

        <GoalComposerCard
          goalTitle={goalTitle}
          setGoalTitle={setGoalTitle}
          goalWhy={goalWhy}
          setGoalWhy={setGoalWhy}
          goalReward={goalReward}
          setGoalReward={setGoalReward}
          stepDraft={stepDraft}
          setStepDraft={setStepDraft}
          draftSteps={draftSteps}
          goalError={goalError}
          goalSuccess={goalSuccess}
          onAddDraftStep={addDraftStep}
          onRemoveDraftStep={removeDraftStep}
          onSaveGoal={() => {
            void saveGoal();
          }}
        />

        {__DEV__ ? (
          <DeveloperToolsCard
            onSeedDemoData={() => {
              void seedDemoData();
            }}
            onResetLocalData={() => {
              void resetLocalData();
            }}
          />
        ) : null}
      </ScrollView>

      <GoalEditModal
        visible={Boolean(editingGoal)}
        title={editGoalTitle}
        setTitle={setEditGoalTitle}
        why={editGoalWhy}
        setWhy={setEditGoalWhy}
        reward={editGoalReward}
        setReward={setEditGoalReward}
        stepDraft={editStepDraft}
        setStepDraft={setEditStepDraft}
        steps={editSteps}
        onAddStep={addEditStep}
        onRenameStep={renameEditStep}
        onDeleteStep={deleteEditStep}
        onCancel={closeGoalEditor}
        onDeleteGoal={() => {
          if (editingGoal) {
            requestDeleteGoal(editingGoal.id);
          }
        }}
        onSave={() => {
          void saveEditedGoal();
        }}
      />
    </SafeAreaView>
  );
}
