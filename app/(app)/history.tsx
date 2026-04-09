import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckInHistoryCard } from "../../src/components/history/CheckInHistoryCard";
import { HistoryHeader } from "../../src/components/history/HistoryHeader";
import { ReflectionHistoryCard } from "../../src/components/history/ReflectionHistoryCard";
import { TrendSummaryCard } from "../../src/components/history/TrendSummaryCard";
import { ReflectionCard } from "../../src/components/home/ReflectionCard";
import { historyStyles } from "../../src/components/history/styles";
import { useHabitQuestHistory } from "../../src/hooks/useHabitQuestHistory";

export default function HistoryScreen() {
  const {
    isLoading,
    history,
    editingReflectionDate,
    editingReflectionText,
    setEditingReflectionText,
    openReflectionEditor,
    closeReflectionEditor,
    saveEditedReflection
  } = useHabitQuestHistory();

  if (isLoading || !history) {
    return (
      <SafeAreaView style={historyStyles.safe}>
        <View style={historyStyles.loadingWrap}>
          <ActivityIndicator size="large" color="#20443A" />
          <Text style={historyStyles.loadingText}>Loading recent patterns...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={historyStyles.safe}>
      <ScrollView contentContainerStyle={historyStyles.container}>
        <HistoryHeader
          checkInsThisWeek={history.checkInsThisWeek}
          reflectionCount={history.reflectionCount}
        />
        <TrendSummaryCard
          totalCompleted={history.totalCompleted}
          totalPartial={history.totalPartial}
          totalSkipped={history.totalSkipped}
        />
        <CheckInHistoryCard checkIns={history.recentCheckIns} />
        <ReflectionHistoryCard
          reflections={history.recentReflections}
          onEditReflection={openReflectionEditor}
        />
      </ScrollView>

      <ReflectionCard
        visible={Boolean(editingReflectionDate)}
        gentleModeEnabled={false}
        reflectionText={editingReflectionText}
        setReflectionText={setEditingReflectionText}
        title="Edit reflection"
        bodyText="Update what you want to keep from this day."
        cancelLabel="Cancel"
        saveLabel="Save"
        onCancel={closeReflectionEditor}
        onSaveReflection={() => {
          void saveEditedReflection();
        }}
      />
    </SafeAreaView>
  );
}
