import { Text, View } from "react-native";

import { historyStyles } from "./styles";

export function TrendSummaryCard({
  totalCompleted,
  totalPartial,
  totalSkipped,
  energyTrendCopy
}: {
  totalCompleted: number;
  totalPartial: number;
  totalSkipped: number;
  energyTrendCopy: string;
}) {
  return (
    <View style={historyStyles.sectionCard}>
      <Text style={historyStyles.sectionTitle}>Trend summary</Text>
      <Text style={historyStyles.sectionBody}>
        Keep this simple. The goal is clarity, not pressure.
      </Text>
      <View style={historyStyles.trendRow}>
        <View style={historyStyles.trendCard}>
          <Text style={historyStyles.trendLabel}>Completed</Text>
          <Text style={historyStyles.trendValue}>{totalCompleted}</Text>
          <Text style={historyStyles.trendCopy}>Steps fully completed over the last week.</Text>
        </View>
        <View style={historyStyles.trendCard}>
          <Text style={historyStyles.trendLabel}>Partial</Text>
          <Text style={historyStyles.trendValue}>{totalPartial}</Text>
          <Text style={historyStyles.trendCopy}>Progress still counts, even when it is lighter.</Text>
        </View>
      </View>
      <View style={historyStyles.trendCard}>
        <Text style={historyStyles.trendLabel}>Skipped and energy</Text>
        <Text style={historyStyles.trendValue}>{totalSkipped} skipped</Text>
        <Text style={historyStyles.trendCopy}>{energyTrendCopy}</Text>
      </View>
    </View>
  );
}

