import { Modal, Pressable, Text, TextInput, View } from "react-native";

import { GoalStep } from "../../types/habitquest";
import { useHomeStyles } from "./styles";
import { useTheme } from "../../theme/theme";

export function GoalEditModal({
  visible,
  title,
  setTitle,
  why,
  setWhy,
  reward,
  setReward,
  stepDraft,
  setStepDraft,
  steps,
  onAddStep,
  onRenameStep,
  onDeleteStep,
  onCancel,
  onDeleteGoal,
  onSave
}: {
  visible: boolean;
  title: string;
  setTitle: (value: string) => void;
  why: string;
  setWhy: (value: string) => void;
  reward: string;
  setReward: (value: string) => void;
  stepDraft: string;
  setStepDraft: (value: string) => void;
  steps: GoalStep[];
  onAddStep: () => void;
  onRenameStep: (id: string, value: string) => void;
  onDeleteStep: (id: string) => void;
  onCancel: () => void;
  onDeleteGoal: () => void;
  onSave: () => void;
}) {
  const homeStyles = useHomeStyles();
  const { theme } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={homeStyles.modalBackdrop}>
        <View style={homeStyles.modalCard}>
          <Text style={homeStyles.modalTitle}>Edit goal</Text>
          <TextInput
            placeholder="Goal title"
            placeholderTextColor={theme.colors.placeholder}
            style={homeStyles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Why this matters"
            placeholderTextColor={theme.colors.placeholder}
            style={homeStyles.input}
            value={why}
            onChangeText={setWhy}
          />
          <TextInput
            placeholder="Reward or milestone"
            placeholderTextColor={theme.colors.placeholder}
            style={homeStyles.input}
            value={reward}
            onChangeText={setReward}
          />
          <View style={homeStyles.stepComposer}>
            <TextInput
              placeholder="Add another step"
              placeholderTextColor={theme.colors.placeholder}
              style={[homeStyles.input, homeStyles.stepComposerInput]}
              value={stepDraft}
              onChangeText={setStepDraft}
            />
            <Pressable onPress={onAddStep} style={homeStyles.secondaryAction}>
              <Text style={homeStyles.secondaryActionText}>Add</Text>
            </Pressable>
          </View>
          <View style={homeStyles.stepList}>
            {steps.map((step) => (
              <View key={step.id} style={homeStyles.editStepRow}>
                <TextInput
                  placeholder="Step name"
                  placeholderTextColor={theme.colors.placeholder}
                  style={[homeStyles.input, homeStyles.editStepInput]}
                  value={step.title}
                  onChangeText={(value) => onRenameStep(step.id, value)}
                />
                <Pressable onPress={() => onDeleteStep(step.id)}>
                  <Text style={homeStyles.removeText}>Delete</Text>
                </Pressable>
              </View>
            ))}
          </View>
          <View style={homeStyles.modalActions}>
            <Pressable onPress={onCancel} style={homeStyles.secondaryOutlineCompact}>
              <Text style={homeStyles.secondaryOutlineText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={onSave} style={homeStyles.primaryActionCompact}>
              <Text style={homeStyles.primaryActionText}>Save</Text>
            </Pressable>
          </View>
          <Pressable onPress={onDeleteGoal} style={homeStyles.textDangerButton}>
            <Text style={homeStyles.textDangerButtonText}>Delete goal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
