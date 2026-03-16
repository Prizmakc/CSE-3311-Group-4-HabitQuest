import { View } from "react-native";

import { homeStyles } from "./styles";

export function ProgressBar({ value }: { value: number }) {
  return (
    <View style={homeStyles.progressTrack}>
      <View
        style={[homeStyles.progressFill, { width: `${Math.max(0, Math.min(100, value))}%` }]}
      />
    </View>
  );
}

