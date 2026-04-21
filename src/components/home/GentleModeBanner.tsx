import { Pressable, Text, View } from "react-native";

import { homeStyles } from "./styles";

export function GentleModeBanner({
  isActive,
  canDisable,
  onEnable,
  onDisable
}: {
  isActive: boolean;
  canDisable: boolean;
  onEnable: () => void;
  onDisable: () => void;
}) {
  return (
    <View style={[homeStyles.banner, isActive && homeStyles.bannerActive]}>
      <Text style={homeStyles.bannerTitle}>
        {isActive ? "Gentle Mode is on for today" : "Need a lighter day?"}
      </Text>
      {isActive ? (
        <Text style={homeStyles.gentleTargetText}>Today&apos;s target: 1 completed step</Text>
      ) : null}
      <Text style={homeStyles.bannerBody}>
        {isActive
          ? "One meaningful completed step is enough today. This applies only to today."
          : "If today is low-capacity, Gentle Mode lets one completed step count as enough."}
      </Text>
      {isActive ? (
        canDisable ? (
          <Pressable onPress={onDisable} style={homeStyles.bannerButton}>
            <Text style={homeStyles.bannerButtonText}>Turn off Gentle Mode</Text>
          </Pressable>
        ) : null
      ) : (
        <Pressable onPress={onEnable} style={homeStyles.bannerButton}>
          <Text style={homeStyles.bannerButtonText}>Use Gentle Mode today</Text>
        </Pressable>
      )}
    </View>
  );
}
