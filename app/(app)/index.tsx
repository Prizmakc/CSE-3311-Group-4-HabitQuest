import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "../../src/lib/supabase";

type HabitStep = {
  id: string;
  title: string;
};

function ProgressBar({ value }: { value: number }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, value))}%` }]} />
    </View>
  );
}

export default function HomeScreen() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const [goalTitle, setGoalTitle] = useState("");
  const [goalWhy, setGoalWhy] = useState("");
  const [stepDraft, setStepDraft] = useState("");
  const [steps, setSteps] = useState<HabitStep[]>([]);
  const [goalSaveError, setGoalSaveError] = useState("");
  const [goalSaveSuccess, setGoalSaveSuccess] = useState("");

  const [dailyCheckedIn, setDailyCheckedIn] = useState(false);
  const [reflectionText, setReflectionText] = useState("");

  const [missedDays, setMissedDays] = useState(0);
  const [gentleMode, setGentleMode] = useState(false);

  const requiredDailySteps = gentleMode ? 1 : 3;
  const streakDays = gentleMode ? 2 : 5;

  const completionPercent = useMemo(() => {
    if (steps.length === 0) {
      return 0;
    }

    const doneCount = Math.min(requiredDailySteps, steps.length);
    return (doneCount / steps.length) * 100;
  }, [requiredDailySteps, steps.length]);

  function addStep() {
    const trimmed = stepDraft.trim();
    if (!trimmed) {
      return;
    }

    setSteps((current) => [...current, { id: `${Date.now()}-${current.length}`, title: trimmed }]);
    setStepDraft("");
    setGoalSaveError("");
  }

  function removeStep(id: string) {
    setSteps((current) => current.filter((step) => step.id !== id));
  }

  function saveGoal() {
    setGoalSaveError("");
    setGoalSaveSuccess("");

    const missing: string[] = [];
    if (!goalTitle.trim()) {
      missing.push("goal title");
    }
    if (steps.length === 0) {
      missing.push("at least one step/habit");
    }

    if (missing.length > 0) {
      setGoalSaveError(`Cannot save yet. Add ${missing.join(" and ")}.`);
      return;
    }

    setGoalSaveSuccess("Goal card scaffold saved (demo state).");
  }

  function simulateMissedDays() {
    setMissedDays(3);
  }

  function applyGentleMode() {
    setGentleMode(true);
  }

  async function onSignOut() {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>HabitQuest</Text>
            <Text style={styles.subtitle}>Turn goals into daily actions.</Text>
          </View>
          <Pressable
            onPress={onSignOut}
            disabled={isSigningOut}
            style={({ pressed }) => [styles.ghostButton, (pressed || isSigningOut) && styles.buttonDisabled]}
          >
            <Text style={styles.ghostButtonText}>{isSigningOut ? "Signing out..." : "Sign out"}</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Goal Card Preview</Text>
          <Text style={styles.cardBody}>Reward: Buy your favorite coffee after a 7-day streak.</Text>
          <Text style={styles.metricLabel}>Streak</Text>
          <Text style={styles.metricValue}>{streakDays} days</Text>
          <Text style={styles.metricLabel}>Completion Progress</Text>
          <ProgressBar value={completionPercent} />
          <Text style={styles.cardHint}>Goal cards can be tied to rewards in later iterations.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Goal + Steps</Text>
          <Text style={styles.cardBody}>
            Special case supported: save is blocked when title or steps are missing.
          </Text>

          <TextInput
            placeholder="Goal title (required)"
            placeholderTextColor="#6B7280"
            style={styles.input}
            value={goalTitle}
            onChangeText={setGoalTitle}
          />
          <TextInput
            placeholder="Why this goal matters (optional)"
            placeholderTextColor="#6B7280"
            style={styles.input}
            value={goalWhy}
            onChangeText={setGoalWhy}
          />

          <View style={styles.stepComposerRow}>
            <TextInput
              placeholder="Add step/habit"
              placeholderTextColor="#6B7280"
              style={[styles.input, styles.stepInput]}
              value={stepDraft}
              onChangeText={setStepDraft}
            />
            <Pressable onPress={addStep} style={styles.smallButton}>
              <Text style={styles.smallButtonText}>Add</Text>
            </Pressable>
          </View>

          <View style={styles.stepList}>
            {steps.length === 0 ? (
              <Text style={styles.emptyText}>No steps yet. Add at least one habit step.</Text>
            ) : (
              steps.map((step) => (
                <View key={step.id} style={styles.stepRow}>
                  <Text style={styles.stepText}>• {step.title}</Text>
                  <Pressable onPress={() => removeStep(step.id)}>
                    <Text style={styles.removeText}>Remove</Text>
                  </Pressable>
                </View>
              ))
            )}
          </View>

          {goalSaveError ? <Text style={styles.error}>{goalSaveError}</Text> : null}
          {goalSaveSuccess ? <Text style={styles.success}>{goalSaveSuccess}</Text> : null}

          <Pressable onPress={saveGoal} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Save Goal</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Check-in + Reflection</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.cardBody}>Mark today&apos;s actions complete</Text>
            <Switch value={dailyCheckedIn} onValueChange={setDailyCheckedIn} />
          </View>
          <TextInput
            placeholder="Daily/weekly reflection note"
            placeholderTextColor="#6B7280"
            style={[styles.input, styles.multilineInput]}
            multiline
            value={reflectionText}
            onChangeText={setReflectionText}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Burnout Protection: Gentle Mode</Text>
          <Text style={styles.cardBody}>Missed days tracked: {missedDays}</Text>

          <Pressable onPress={simulateMissedDays} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Simulate 3 missed days</Text>
          </Pressable>

          {missedDays >= 3 && !gentleMode ? (
            <View style={styles.warningBox}>
              <Text style={styles.warningTitle}>Gentle Mode Suggested</Text>
              <Text style={styles.warningBody}>
                You&apos;ve missed multiple days. Reduce required steps from 3 to 1 temporarily.
              </Text>
              <Pressable onPress={applyGentleMode} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Enable Gentle Mode</Text>
              </Pressable>
            </View>
          ) : null}

          {gentleMode ? (
            <Text style={styles.success}>
              Gentle Mode enabled. Required daily steps now: {requiredDailySteps}.
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 12
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827"
  },
  subtitle: {
    fontSize: 15,
    color: "#4B5563"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827"
  },
  cardBody: {
    fontSize: 14,
    color: "#4B5563"
  },
  metricLabel: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280"
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827"
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#111827"
  },
  cardHint: {
    fontSize: 12,
    color: "#6B7280"
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#111827"
  },
  multilineInput: {
    minHeight: 84,
    textAlignVertical: "top"
  },
  stepComposerRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  stepInput: {
    flex: 1
  },
  smallButton: {
    minHeight: 42,
    borderRadius: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#374151"
  },
  smallButtonText: {
    color: "#FFFFFF",
    fontWeight: "600"
  },
  stepList: {
    gap: 8
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 13
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2
  },
  stepText: {
    color: "#111827",
    fontSize: 14,
    flex: 1,
    paddingRight: 12
  },
  removeText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "600"
  },
  error: {
    color: "#B91C1C",
    fontSize: 14
  },
  success: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600"
  },
  primaryButton: {
    minHeight: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600"
  },
  secondaryButton: {
    minHeight: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E7EB"
  },
  secondaryButtonText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "600"
  },
  warningBox: {
    borderWidth: 1,
    borderColor: "#F59E0B",
    backgroundColor: "#FFFBEB",
    borderRadius: 10,
    padding: 10,
    gap: 8
  },
  warningTitle: {
    fontWeight: "700",
    color: "#92400E"
  },
  warningBody: {
    color: "#78350F",
    fontSize: 13
  },
  ghostButton: {
    minHeight: 34,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E7EB"
  },
  ghostButtonText: {
    color: "#111827",
    fontWeight: "600",
    fontSize: 13
  },
  buttonDisabled: {
    opacity: 0.7
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
