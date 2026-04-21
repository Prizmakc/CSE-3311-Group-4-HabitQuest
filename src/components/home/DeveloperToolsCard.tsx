import { Pressable, Text, View } from "react-native";

import { useHomeStyles } from "./styles";

export function DeveloperToolsCard({
  onSeedDemoData,
  onResetLocalData
}: {
  onSeedDemoData: () => void;
  onResetLocalData: () => void;
}) {
  const homeStyles = useHomeStyles();
  return (
    <View style={homeStyles.sectionCard}>
      <Text style={homeStyles.sectionTitle}>Developer utilities</Text>
      <Text style={homeStyles.sectionBody}>
        Local-only helpers for testing states quickly. Keep these out of user-facing flows later.
      </Text>
      <View style={homeStyles.devRow}>
        <Pressable onPress={onSeedDemoData} style={homeStyles.devButton}>
          <Text style={homeStyles.devButtonText}>Seed demo data</Text>
        </Pressable>
        <Pressable onPress={onResetLocalData} style={homeStyles.devButton}>
          <Text style={homeStyles.devButtonText}>Reset local data</Text>
        </Pressable>
      </View>
    </View>
  );
}

