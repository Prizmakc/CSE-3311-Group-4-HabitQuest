import { Pressable, Text, View } from "react-native";

import { homeStyles } from "./styles";
import { ProgressBar } from "./ProgressBar";

export function ProgressSnapshotCard({
  goalCount,
  requiredStepsToday,
  completionPercent,
  rewardText,
  onViewHistory
}: {
  goalCount: number;
  requiredStepsToday: number;
  completionPercent: number;
  rewardText: string;
  onViewHistory: () => void;
}) {
  return (
    <View style={homeStyles.sectionCard}>
      <View style={homeStyles.sectionHeaderRow}>
        <View style={homeStyles.sectionHeaderCopy}>
          <Text style={homeStyles.sectionTitle}>Progress snapshot</Text>
          <Text style={homeStyles.sectionBody}>
            {goalCount === 0
              ? "Start with one meaningful goal and one manageable step."
              : `You currently need ${requiredStepsToday} meaningful step${requiredStepsToday === 1 ? "" : "s"} today.`}
          </Text>
        </View>
        <Pressable onPress={onViewHistory} style={homeStyles.historyLinkButton}>
          <Text style={homeStyles.historyLinkText}>View history</Text>
        </Pressable>
      </View>
      <ProgressBar value={completionPercent} />
      <Text style={homeStyles.progressCaption}>
        Completion today: {Math.round(completionPercent)}%
      </Text>
      <View style={homeStyles.rewardCard}>
        <Text style={homeStyles.rewardLabel}>Milestone card</Text>
        <Text style={homeStyles.rewardText}>{rewardText}</Text>
      </View>
    </View>
  );
}
