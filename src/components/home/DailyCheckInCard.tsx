import { Pressable, Text, View } from "react-native";

import { GoalStepWithGoal } from "../../domain/habitQuestSelectors";
import { StepStatus } from "../../types/habitquest";
import { homeStyles } from "./styles";

function getStatusLabel(status: StepStatus | null) {
  if (status === "completed") {
    return "Done";
  }

  if (status === "partial") {
    return "Partial";
  }

  if (status === "skipped") {
    return "Skip";
  }

  return "Tap to check in";
}

export function DailyCheckInCard({
  allSteps,
  draftStatuses,
  saveState,
  gentleModeEnabled,
  onToggleTaskStatus,
  onCompleteCheckIn
}: {
  allSteps: GoalStepWithGoal[];
  draftStatuses: Record<string, StepStatus>;
  saveState: "idle" | "saving";
  gentleModeEnabled: boolean;
  onToggleTaskStatus: (stepId: string) => void;
  onCompleteCheckIn: () => void;
}) {
  const hasTasks = allSteps.length > 0;
  const completedCount = Object.values(draftStatuses).filter(
    (status) => status === "completed"
  ).length;
  const gentleTargetMet = gentleModeEnabled && completedCount >= 1;

  return (
    <View style={[homeStyles.sectionCard, gentleModeEnabled && homeStyles.gentleCheckInCard]}>
      <Text style={homeStyles.sectionTitle}>
        {gentleModeEnabled ? "Today's check-in · Gentle Mode" : "Today's check-in"}
      </Text>
      <Text style={homeStyles.sectionBody}>
        {gentleModeEnabled
          ? "Focus on one meaningful step today. Small progress still counts."
          : "Tap each step until it matches what happened today, then finish the check-in."}
      </Text>
      {gentleModeEnabled ? (
        <View style={homeStyles.gentleTargetChip}>
          <Text style={homeStyles.gentleTargetChipText}>
            {gentleTargetMet ? "Gentle target met" : `${completedCount} / 1 completed`}
          </Text>
        </View>
      ) : null}
      {hasTasks ? (
        <>
          {gentleModeEnabled ? (
            <Text style={homeStyles.gentlePrompt}>Choose one meaningful step to focus on.</Text>
          ) : null}
          {allSteps.map((step) => {
            const status = draftStatuses[step.id] ?? null;

            return (
              <Pressable
                key={step.id}
                onPress={() => onToggleTaskStatus(step.id)}
                style={({ pressed }) => [
                  homeStyles.taskRow,
                  status === "completed" && homeStyles.taskRowCompleted,
                  status === "partial" && homeStyles.taskRowPartial,
                  status === "skipped" && homeStyles.taskRowSkipped,
                  pressed && homeStyles.buttonPressed
                ]}
              >
                <View style={homeStyles.taskRowCopy}>
                  <Text style={homeStyles.taskRowTitle}>{step.title}</Text>
                  <Text style={homeStyles.taskRowMeta}>{step.goalTitle}</Text>
                </View>
                <View
                  style={[
                  homeStyles.taskStateBadge,
                  status === "completed" && homeStyles.taskStateBadgeCompleted,
                  status === "partial" && homeStyles.taskStateBadgePartial,
                  status === "skipped" && homeStyles.taskStateBadgeSkipped
                ]}
                >
                  <Text
                    style={[
                    homeStyles.taskStateBadgeText,
                    status !== null && homeStyles.taskStateBadgeTextActive
                  ]}
                  >
                    {getStatusLabel(status)}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </>
      ) : (
        <Text style={homeStyles.emptyText}>Create a goal first to unlock daily check-ins.</Text>
      )}
      <Pressable
        onPress={onCompleteCheckIn}
        disabled={!hasTasks || saveState === "saving"}
        style={({ pressed }) => [
          homeStyles.primaryAction,
          (!hasTasks || saveState === "saving") && homeStyles.buttonDisabled,
          pressed && homeStyles.buttonPressed
        ]}
      >
        <Text style={homeStyles.primaryActionText}>
          {saveState === "saving"
            ? "Saving..."
            : gentleModeEnabled
              ? "Finish Gentle Check-in"
              : "Complete Check-in"}
        </Text>
      </Pressable>
    </View>
  );
}
