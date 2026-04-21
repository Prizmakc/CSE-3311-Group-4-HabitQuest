import { Text, View } from "react-native";

import { useHomeStyles } from "./styles";

export function HomeHero({
  gentleModeEnabled,
  daySuccessful
}: {
  gentleModeEnabled: boolean;
  daySuccessful: boolean;
}) {
  const homeStyles = useHomeStyles();
  return (
    <View style={homeStyles.hero}>
      <View style={homeStyles.heroCopy}>
        <Text style={homeStyles.eyebrow}>Today</Text>
        {gentleModeEnabled ? (
          <Text style={homeStyles.heroModeTag}>Gentle Mode Active</Text>
        ) : null}
        <Text style={homeStyles.heroTitle}>
          {gentleModeEnabled ? "One meaningful step is enough today." : "Keep today light."}
        </Text>
        <Text style={homeStyles.heroSubtitle}>
          {gentleModeEnabled
            ? daySuccessful
              ? "That is enough for today."
              : "Keep momentum, not pressure."
            : "Check in quickly, keep your footing, and move on with clarity."}
        </Text>
      </View>
    </View>
  );
}
