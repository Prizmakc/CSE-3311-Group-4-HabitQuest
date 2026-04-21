import { Text, View } from "react-native";

import { useHomeStyles } from "./styles";
import { ProgressBar } from "./ProgressBar";

export function ProgressSnapshotCard({
  goalCount,
  requiredStepsToday,
  completionPercent,
  rewardText
}: {
  goalCount: number;
  requiredStepsToday: number;
  completionPercent: number;
  rewardText: string;
}) {
  const homeStyles = useHomeStyles();
  return (
    <View style={homeStyles.sectionCard}>
      <Text style={homeStyles.sectionTitle}>Progress snapshot</Text>
      <Text style={homeStyles.sectionBody}>
        {goalCount === 0
          ? "Start with one meaningful goal and one manageable step."
          : `You currently need ${requiredStepsToday} meaningful step${requiredStepsToday === 1 ? "" : "s"} today.`}
      </Text>
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
