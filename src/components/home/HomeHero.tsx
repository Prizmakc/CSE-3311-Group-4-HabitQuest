import { Pressable, Text, View } from "react-native";

import { homeStyles } from "./styles";

export function HomeHero({
  completedCount,
  stepCount,
  streak,
  gentleModeEnabled,
  isSigningOut,
  onSignOut
}: {
  completedCount: number;
  stepCount: number;
  streak: number;
  gentleModeEnabled: boolean;
  isSigningOut: boolean;
  onSignOut: () => void;
}) {
  return (
    <View style={homeStyles.hero}>
      <View style={homeStyles.heroTopRow}>
        <View style={homeStyles.heroCopy}>
          <Text style={homeStyles.eyebrow}>HabitQuest</Text>
          <Text style={homeStyles.heroTitle}>Structure for messy weeks.</Text>
          <Text style={homeStyles.heroSubtitle}>
            Focus on one clear win, check in fast, and recover without feeling punished.
          </Text>
        </View>
        <Pressable
          onPress={onSignOut}
          disabled={isSigningOut}
          style={({ pressed }) => [
            homeStyles.signOutButton,
            pressed && homeStyles.buttonPressed,
            isSigningOut && homeStyles.buttonDisabled
          ]}
        >
          <Text style={homeStyles.signOutButtonText}>
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Text>
        </Pressable>
      </View>

      <View style={homeStyles.heroMetricsRow}>
        <View style={homeStyles.metricPill}>
          <Text style={homeStyles.metricLabel}>Today</Text>
          <Text style={homeStyles.metricValue}>
            {completedCount}/{Math.max(stepCount, 1)}
          </Text>
        </View>
        <View style={homeStyles.metricPill}>
          <Text style={homeStyles.metricLabel}>Streak</Text>
          <Text style={homeStyles.metricValue}>{streak} days</Text>
        </View>
        <View style={homeStyles.metricPill}>
          <Text style={homeStyles.metricLabel}>Mode</Text>
          <Text numberOfLines={1} adjustsFontSizeToFit style={homeStyles.metricValueCompact}>
            {gentleModeEnabled ? "Gentle" : "Standard"}
          </Text>
        </View>
      </View>
    </View>
  );
}
