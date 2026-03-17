import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckInHistoryCard } from "../../src/components/history/CheckInHistoryCard";
import { HistoryHeader } from "../../src/components/history/HistoryHeader";
import { ReflectionHistoryCard } from "../../src/components/history/ReflectionHistoryCard";
import { TrendSummaryCard } from "../../src/components/history/TrendSummaryCard";
import { historyStyles } from "../../src/components/history/styles";
import { useHabitQuestHistory } from "../../src/hooks/useHabitQuestHistory";

export default function HistoryScreen() {
  const { isLoading, history } = useHabitQuestHistory();

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
          streak={history.streak}
          checkInsThisWeek={history.checkInsThisWeek}
          reflectionCount={history.reflectionCount}
        />
        <TrendSummaryCard
          totalCompleted={history.totalCompleted}
          totalPartial={history.totalPartial}
          totalSkipped={history.totalSkipped}
          energyTrendCopy={history.energyTrendCopy}
        />
        <CheckInHistoryCard checkIns={history.recentCheckIns} />
        <ReflectionHistoryCard reflections={history.recentReflections} />
      </ScrollView>
    </SafeAreaView>
  );
}
