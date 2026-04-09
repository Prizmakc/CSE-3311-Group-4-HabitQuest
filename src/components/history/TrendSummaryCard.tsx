import { Text, View } from "react-native";

import { historyStyles } from "./styles";

export function TrendSummaryCard({
  totalCompleted,
  totalPartial,
  totalSkipped
}: {
  totalCompleted: number;
  totalPartial: number;
  totalSkipped: number;
}) {
  return (
    <View style={historyStyles.sectionCard}>
      <Text style={historyStyles.sectionTitle}>Trend summary</Text>
      <View style={historyStyles.trendRow}>
        <View style={historyStyles.trendCard}>
          <Text style={historyStyles.trendLabel}>Completed</Text>
          <Text style={historyStyles.trendValue}>{totalCompleted}</Text>
        </View>
        <View style={historyStyles.trendCard}>
          <Text style={historyStyles.trendLabel}>Partial</Text>
          <Text style={historyStyles.trendValue}>{totalPartial}</Text>
        </View>
      </View>
      <View style={historyStyles.trendCard}>
        <Text style={historyStyles.trendLabel}>Skipped</Text>
        <Text style={historyStyles.trendValue}>{totalSkipped} skipped</Text>
      </View>
    </View>
  );
}
