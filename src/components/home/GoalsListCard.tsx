import { Pressable, Text, View } from "react-native";

import { Goal } from "../../types/habitquest";
import { homeStyles } from "./styles";

export function GoalsListCard({
  goals,
  gentleModeEnabled,
  onDisableGentleMode
}: {
  goals: Goal[];
  gentleModeEnabled: boolean;
  onDisableGentleMode: () => void;
}) {
  return (
    <View style={homeStyles.sectionCard}>
      <View style={homeStyles.sectionHeaderRow}>
        <View>
          <Text style={homeStyles.sectionTitle}>Your goals</Text>
          <Text style={homeStyles.sectionBody}>Meaningful goals, not endless habit clutter.</Text>
        </View>
        {gentleModeEnabled ? (
          <Pressable onPress={onDisableGentleMode} style={homeStyles.secondaryAction}>
            <Text style={homeStyles.secondaryActionText}>Exit Gentle</Text>
          </Pressable>
        ) : null}
      </View>
      {goals.length === 0 ? (
        <Text style={homeStyles.emptyText}>No saved goals yet.</Text>
      ) : (
        goals.map((goal) => (
          <View key={goal.id} style={homeStyles.goalCard}>
            <Text style={homeStyles.goalCardTitle}>{goal.title}</Text>
            {goal.why ? <Text style={homeStyles.goalCardWhy}>{goal.why}</Text> : null}
            {goal.reward ? <Text style={homeStyles.goalCardReward}>Reward: {goal.reward}</Text> : null}
            <View style={homeStyles.goalCardSteps}>
              {goal.steps.map((step) => (
                <Text key={step.id} style={homeStyles.goalCardStepText}>
                  • {step.title}
                </Text>
              ))}
            </View>
          </View>
        ))
      )}
    </View>
  );
}

