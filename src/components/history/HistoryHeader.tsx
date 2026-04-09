import { Text, View } from "react-native";

import { historyStyles } from "./styles";

export function HistoryHeader({
  checkInsThisWeek,
  reflectionCount
}: {
  checkInsThisWeek: number;
  reflectionCount: number;
}) {
  return (
    <View style={historyStyles.headerCard}>
      <Text style={historyStyles.eyebrow}>History</Text>
      <Text style={historyStyles.title}>A gentler view of progress.</Text>
      <View style={historyStyles.statsRow}>
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
