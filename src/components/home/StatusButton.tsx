import { Pressable, Text } from "react-native";

import { homeStyles } from "./styles";

export function StatusButton({
  label,
  active,
  onPress
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        homeStyles.statusButton,
        active && homeStyles.statusButtonActive,
        pressed && homeStyles.buttonPressed
      ]}
    >
      <Text style={[homeStyles.statusButtonText, active && homeStyles.statusButtonTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

