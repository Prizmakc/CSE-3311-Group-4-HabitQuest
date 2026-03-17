import { Text, View } from "react-native";

import { historyStyles } from "./styles";

export function HistoryHeader({
  streak,
  checkInsThisWeek,
  reflectionCount
}: {
  streak: number;
  checkInsThisWeek: number;
  reflectionCount: number;
}) {
  return (
    <View style={historyStyles.headerCard}>
      <Text style={historyStyles.eyebrow}>History</Text>
      <Text style={historyStyles.title}>A gentler view of progress.</Text>
      <Text style={historyStyles.subtitle}>
        Look for patterns, not proof that you are falling behind.
      </Text>
      <View style={historyStyles.statsRow}>
        <View style={historyStyles.statCard}>
          <Text style={historyStyles.statLabel}>Streak</Text>
          <Text style={historyStyles.statValue}>{streak} days</Text>
        </View>
        <View style={historyStyles.statCard}>
          <Text style={historyStyles.statLabel}>This week</Text>
          <Text style={historyStyles.statValue}>{checkInsThisWeek} check-ins</Text>
        </View>
        <View style={historyStyles.statCard}>
          <Text style={historyStyles.statLabel}>Reflections</Text>
          <Text style={historyStyles.statValue}>{reflectionCount}</Text>
        </View>
      </View>
    </View>
  );
}
