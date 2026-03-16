import { Pressable, Text, View } from "react-native";

import { homeStyles } from "./styles";

export function GentleModeBanner({ onEnable }: { onEnable: () => void }) {
  return (
    <View style={homeStyles.banner}>
      <Text style={homeStyles.bannerTitle}>Rough week?</Text>
      <Text style={homeStyles.bannerBody}>
        You missed a couple of days. Let&apos;s make today lighter and protect momentum.
      </Text>
      <Pressable onPress={onEnable} style={homeStyles.bannerButton}>
        <Text style={homeStyles.bannerButtonText}>Enable Gentle Mode</Text>
      </Pressable>
    </View>
  );
}

