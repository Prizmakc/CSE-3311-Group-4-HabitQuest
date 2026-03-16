import { Pressable, Text, TextInput, View } from "react-native";

import { GoalStepWithGoal } from "../../domain/habitQuestSelectors";
import { DailyCheckIn, StepStatus } from "../../types/habitquest";
import { StatusButton } from "./StatusButton";
import { homeStyles } from "./styles";

export function DailyCheckInCard({
  allSteps,
  todayCheckIn,
  energy,
  setEnergy,
  dailyNote,
  setDailyNote,
  saveState,
  onSetStepStatus,
  onSaveDailyNote
}: {
  allSteps: GoalStepWithGoal[];
  todayCheckIn: DailyCheckIn | null;
  energy: DailyCheckIn["energy"];
  setEnergy: (value: DailyCheckIn["energy"]) => void;
  dailyNote: string;
  setDailyNote: (value: string) => void;
  saveState: "idle" | "saving";
  onSetStepStatus: (stepId: string, status: StepStatus) => void;
  onSaveDailyNote: () => void;
}) {
  return (
    <View style={homeStyles.sectionCard}>
      <Text style={homeStyles.sectionTitle}>Today&apos;s check-in</Text>
      <Text style={homeStyles.sectionBody}>
        Open the app, mark what happened, and move on with clarity.
      </Text>
      {allSteps.length === 0 ? (
        <Text style={homeStyles.emptyText}>Create a goal first to unlock daily check-ins.</Text>
      ) : (
        allSteps.map((step) => {
          const activeStatus = todayCheckIn?.statuses[step.id];

          return (
            <View key={step.id} style={homeStyles.checkInRow}>
              <View style={homeStyles.checkInCopy}>
                <Text style={homeStyles.checkInStep}>{step.title}</Text>
                <Text style={homeStyles.checkInGoal}>{step.goalTitle}</Text>
              </View>
              <View style={homeStyles.statusButtonRow}>
                <StatusButton
                  label="Done"
                  active={activeStatus === "completed"}
                  onPress={() => onSetStepStatus(step.id, "completed")}
                />
                <StatusButton
                  label="Partial"
                  active={activeStatus === "partial"}
                  onPress={() => onSetStepStatus(step.id, "partial")}
                />
                <StatusButton
                  label="Skip"
                  active={activeStatus === "skipped"}
                  onPress={() => onSetStepStatus(step.id, "skipped")}
                />
              </View>
            </View>
          );
        })
      )}
      <Text style={homeStyles.inputLabel}>Energy</Text>
      <View style={homeStyles.energyRow}>
        {(["low", "steady", "good"] as const).map((option) => (
          <Pressable
            key={option}
            onPress={() => setEnergy(option)}
            style={({ pressed }) => [
              homeStyles.energyChip,
              energy === option && homeStyles.energyChipActive,
              pressed && homeStyles.buttonPressed
            ]}
          >
            <Text
              style={[homeStyles.energyChipText, energy === option && homeStyles.energyChipTextActive]}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
      <TextInput
        placeholder="Optional note about what helped or got in the way"
        placeholderTextColor="#6E7E76"
        style={[homeStyles.input, homeStyles.noteInput]}
        multiline
        value={dailyNote}
        onChangeText={setDailyNote}
      />
      <Pressable onPress={onSaveDailyNote} style={homeStyles.secondaryOutline}>
        <Text style={homeStyles.secondaryOutlineText}>
          {saveState === "saving" ? "Saving..." : "Save check-in note"}
        </Text>
      </Pressable>
    </View>
  );
}

