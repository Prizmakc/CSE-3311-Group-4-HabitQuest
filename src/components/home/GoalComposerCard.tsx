import { Pressable, Text, TextInput, View } from "react-native";

import { GoalStep } from "../../types/habitquest";
import { useHomeStyles } from "./styles";
import { useTheme } from "../../theme/theme";

export function GoalComposerCard({
  goalTitle,
  setGoalTitle,
  goalWhy,
  setGoalWhy,
  goalReward,
  setGoalReward,
  stepDraft,
  setStepDraft,
  draftSteps,
  goalError,
  goalSuccess,
  onAddDraftStep,
  onRemoveDraftStep,
  onSaveGoal
}: {
  goalTitle: string;
  setGoalTitle: (value: string) => void;
  goalWhy: string;
  setGoalWhy: (value: string) => void;
  goalReward: string;
  setGoalReward: (value: string) => void;
  stepDraft: string;
  setStepDraft: (value: string) => void;
  draftSteps: GoalStep[];
  goalError: string;
  goalSuccess: string;
  onAddDraftStep: () => void;
  onRemoveDraftStep: (id: string) => void;
  onSaveGoal: () => void;
}) {
  const homeStyles = useHomeStyles();
  const { theme } = useTheme();
  return (
    <View style={homeStyles.sectionCard}>
      <Text style={homeStyles.sectionTitle}>Create a goal</Text>
      <Text style={homeStyles.sectionBody}>
        Keep setup short. A goal title and at least one step are required.
      </Text>
      <TextInput
        placeholder="Goal title"
        placeholderTextColor={theme.colors.placeholder}
        style={homeStyles.input}
        value={goalTitle}
        onChangeText={setGoalTitle}
      />
      <TextInput
        placeholder="Why this matters"
        placeholderTextColor={theme.colors.placeholder}
        style={homeStyles.input}
        value={goalWhy}
        onChangeText={setGoalWhy}
      />
      <TextInput
        placeholder="Reward or milestone"
        placeholderTextColor={theme.colors.placeholder}
        style={homeStyles.input}
        value={goalReward}
        onChangeText={setGoalReward}
      />
      <View style={homeStyles.stepComposer}>
        <TextInput
          placeholder="Add one small step"
          placeholderTextColor={theme.colors.placeholder}
          style={[homeStyles.input, homeStyles.stepComposerInput]}
          value={stepDraft}
          onChangeText={setStepDraft}
        />
        <Pressable onPress={onAddDraftStep} style={homeStyles.secondaryAction}>
          <Text style={homeStyles.secondaryActionText}>Add</Text>
        </Pressable>
      </View>
      <View style={homeStyles.stepList}>
        {draftSteps.length === 0 ? (
          <Text style={homeStyles.emptyText}>No steps yet. Add one small win to get started.</Text>
        ) : (
          draftSteps.map((step) => (
            <View key={step.id} style={homeStyles.stepListRow}>
              <Text style={homeStyles.stepListText}>{step.title}</Text>
              <Pressable onPress={() => onRemoveDraftStep(step.id)}>
                <Text style={homeStyles.removeText}>Remove</Text>
              </Pressable>
            </View>
          ))
        )}
      </View>
      {goalError ? <Text style={homeStyles.errorText}>{goalError}</Text> : null}
      {goalSuccess ? <Text style={homeStyles.successText}>{goalSuccess}</Text> : null}
      <Pressable onPress={onSaveGoal} style={homeStyles.primaryAction}>
        <Text style={homeStyles.primaryActionText}>Save goal</Text>
      </Pressable>
    </View>
  );
}

