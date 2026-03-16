import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DailyCheckInCard } from "../../src/components/home/DailyCheckInCard";
import { DeveloperToolsCard } from "../../src/components/home/DeveloperToolsCard";
import { GentleModeBanner } from "../../src/components/home/GentleModeBanner";
import { GoalComposerCard } from "../../src/components/home/GoalComposerCard";
import { GoalsListCard } from "../../src/components/home/GoalsListCard";
import { HomeHero } from "../../src/components/home/HomeHero";
import { ProgressSnapshotCard } from "../../src/components/home/ProgressSnapshotCard";
import { ReflectionCard } from "../../src/components/home/ReflectionCard";
import { homeStyles } from "../../src/components/home/styles";
import { useHabitQuestHome } from "../../src/hooks/useHabitQuestHome";
import { supabase } from "../../src/lib/supabase";

export default function HomeScreen() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const {
    isLoading,
    saveState,
    data,
    history,
    goalForm,
    checkInForm,
    reflectionForm,
    gentleMode,
    developerTools
  } = useHabitQuestHome();

  async function onSignOut() {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  }

  if (isLoading || !data || !history) {
    return (
      <SafeAreaView style={homeStyles.loadingSafe}>
        <View style={homeStyles.loadingWrap}>
          <ActivityIndicator size="large" color="#20443A" />
          <Text style={homeStyles.loadingText}>Loading your quiet momentum...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={homeStyles.safe}>
      <ScrollView contentContainerStyle={homeStyles.container}>
        <HomeHero
          completedCount={history.completedCount}
          stepCount={history.allSteps.length}
          streak={history.streak}
          gentleModeEnabled={data.gentleModeEnabled}
          isSigningOut={isSigningOut}
          onSignOut={() => {
            void onSignOut();
          }}
        />

        {history.gentleModeSuggestion ? (
          <GentleModeBanner
            onEnable={() => {
              void gentleMode.enableGentleMode();
            }}
          />
        ) : null}

        <ProgressSnapshotCard
          goalCount={data.goals.length}
          requiredStepsToday={history.requiredStepsToday}
          completionPercent={history.completionPercent}
          rewardText={
            data.goals[0]?.reward ||
            "Pick a simple reward after a strong week of follow-through."
          }
          onViewHistory={() => {
            void router.push("./history");
          }}
        />

        <DailyCheckInCard
          allSteps={history.allSteps}
          todayCheckIn={history.todayCheckIn}
          energy={checkInForm.energy}
          setEnergy={checkInForm.setEnergy}
          dailyNote={checkInForm.dailyNote}
          setDailyNote={checkInForm.setDailyNote}
          saveState={saveState}
          onSetStepStatus={(stepId, status) => {
            void checkInForm.setStepStatus(stepId, status);
          }}
          onSaveDailyNote={() => {
            void checkInForm.saveDailyNote();
          }}
        />

        <ReflectionCard
          reflectionPeriod={reflectionForm.reflectionPeriod}
          setReflectionPeriod={reflectionForm.setReflectionPeriod}
          reflectionText={reflectionForm.reflectionText}
          setReflectionText={(text) => {
            reflectionForm.setReflectionText(text);
            if (reflectionForm.reflectionMessage) {
              reflectionForm.setReflectionMessage("");
            }
          }}
          reflectionMessage={reflectionForm.reflectionMessage}
          onSaveReflection={() => {
            void reflectionForm.saveReflection();
          }}
        />

        <GoalsListCard
          goals={data.goals}
          gentleModeEnabled={data.gentleModeEnabled}
          onDisableGentleMode={() => {
            void gentleMode.disableGentleMode();
          }}
        />

        <GoalComposerCard
          goalTitle={goalForm.goalTitle}
          setGoalTitle={goalForm.setGoalTitle}
          goalWhy={goalForm.goalWhy}
          setGoalWhy={goalForm.setGoalWhy}
          goalReward={goalForm.goalReward}
          setGoalReward={goalForm.setGoalReward}
          stepDraft={goalForm.stepDraft}
          setStepDraft={goalForm.setStepDraft}
          draftSteps={goalForm.draftSteps}
          goalError={goalForm.goalError}
          goalSuccess={goalForm.goalSuccess}
          onAddDraftStep={goalForm.addDraftStep}
          onRemoveDraftStep={goalForm.removeDraftStep}
          onSaveGoal={() => {
            void goalForm.saveGoal();
          }}
        />

        {__DEV__ ? (
          <DeveloperToolsCard
            onSeedDemoData={() => {
              void developerTools.seedDemoData();
            }}
            onResetLocalData={() => {
              void developerTools.resetLocalData();
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
