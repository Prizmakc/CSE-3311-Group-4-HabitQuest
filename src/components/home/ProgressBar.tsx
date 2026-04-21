import { View } from "react-native";

import { useHomeStyles } from "./styles";

export function ProgressBar({ value }: { value: number }) {
  const homeStyles = useHomeStyles();
  return (
    <View style={homeStyles.progressTrack}>
      <View
        style={[homeStyles.progressFill, { width: `${Math.max(0, Math.min(100, value))}%` }]}
      />
    </View>
  );
}

