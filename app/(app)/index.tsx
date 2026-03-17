import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DailyCheckInCard } from "../../src/components/home/DailyCheckInCard";
import { GentleModeBanner } from "../../src/components/home/GentleModeBanner";
import { HomeHero } from "../../src/components/home/HomeHero";
import { ProgressSnapshotCard } from "../../src/components/home/ProgressSnapshotCard";
import { ReflectionCard } from "../../src/components/home/ReflectionCard";
import { homeStyles } from "../../src/components/home/styles";
import { useHabitQuestToday } from "../../src/hooks/useHabitQuestToday";
import { supabase } from "../../src/lib/supabase";

export default function HomeScreen() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const {
    isLoading,
    saveState,
    data,
    history,
    dailyNote,
    setDailyNote,
    energy,
    setEnergy,
    reflectionText,
    setReflectionText,
    reflectionPeriod,
    setReflectionPeriod,
    reflectionMessage,
    setReflectionMessage,
    saveDailyNote,
    setStepStatus,
    saveReflection,
    enableGentleMode
  } = useHabitQuestToday();

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

        <ProgressSnapshotCard
          goalCount={data.goals.length}
          requiredStepsToday={history.requiredStepsToday}
          completionPercent={history.completionPercent}
          rewardText={
            data.goals[0]?.reward ||
            "Pick a simple reward after a strong week of follow-through."
          }
        />

        <DailyCheckInCard
          allSteps={history.allSteps}
          todayCheckIn={history.todayCheckIn}
          energy={energy}
          setEnergy={setEnergy}
          dailyNote={dailyNote}
          setDailyNote={setDailyNote}
          saveState={saveState}
          onSetStepStatus={(stepId, status) => {
            void setStepStatus(stepId, status);
          }}
          onSaveDailyNote={() => {
            void saveDailyNote();
          }}
        />

        <ReflectionCard
          reflectionPeriod={reflectionPeriod}
          setReflectionPeriod={setReflectionPeriod}
          reflectionText={reflectionText}
          setReflectionText={(text) => {
            setReflectionText(text);
            if (reflectionMessage) {
              setReflectionMessage("");
            }
          }}
          reflectionMessage={reflectionMessage}
          onSaveReflection={() => {
            void saveReflection();
          }}
        />

        {history.gentleModeSuggestion ? (
          <GentleModeBanner
            onEnable={() => {
              void enableGentleMode();
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
