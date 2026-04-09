import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DailyCheckInCard } from "../../src/components/home/DailyCheckInCard";
import { GentleModeBanner } from "../../src/components/home/GentleModeBanner";
import { HomeHero } from "../../src/components/home/HomeHero";
import { ReflectionCard } from "../../src/components/home/ReflectionCard";
import { homeStyles } from "../../src/components/home/styles";
import { useHabitQuestToday } from "../../src/hooks/useHabitQuestToday";

export default function HomeScreen() {
  const {
    isLoading,
    saveState,
    data,
    history,
    draftStatuses,
    reflectionText,
    setReflectionText,
    isReflectionModalOpen,
    toggleTaskStatus,
    completeCheckIn,
    skipReflection,
    saveReflection,
    enableGentleMode
  } = useHabitQuestToday();

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
          gentleModeEnabled={data.gentleModeEnabled}
          daySuccessful={history.daySuccessful}
        />

        {history.gentleModeSuggestion ? (
          <GentleModeBanner
            onEnable={() => {
              void enableGentleMode();
            }}
          />
        ) : null}

        <DailyCheckInCard
          allSteps={history.allSteps}
          draftStatuses={draftStatuses}
          saveState={saveState}
          onToggleTaskStatus={toggleTaskStatus}
          onCompleteCheckIn={() => {
            void completeCheckIn();
          }}
        />
      </ScrollView>

      <ReflectionCard
        visible={isReflectionModalOpen}
        gentleModeEnabled={data.gentleModeEnabled}
        reflectionText={reflectionText}
        setReflectionText={setReflectionText}
        onCancel={() => {
          void skipReflection();
        }}
        onSaveReflection={() => {
          void saveReflection();
        }}
      />
    </SafeAreaView>
  );
}
