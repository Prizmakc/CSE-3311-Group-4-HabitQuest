import { Text, View } from "react-native";

import { formatReflectionDate } from "../../domain/habitQuestHistory";
import { Reflection } from "../../types/habitquest";
import { historyStyles } from "./styles";

export function ReflectionHistoryCard({ reflections }: { reflections: Reflection[] }) {
  return (
    <View style={historyStyles.sectionCard}>
      <Text style={historyStyles.sectionTitle}>Recent reflections</Text>
      <Text style={historyStyles.sectionBody}>
        Use these to notice what supports momentum and what needs to feel smaller.
      </Text>
      {reflections.length === 0 ? (
        <Text style={historyStyles.emptyText}>
          No reflections yet. A short note after a difficult day is enough.
        </Text>
      ) : (
        reflections.map((reflection) => (
          <View key={reflection.id} style={historyStyles.historyItem}>
            <Text style={historyStyles.reflectionMeta}>
              {reflection.period} • {formatReflectionDate(reflection)}
            </Text>
            <Text style={historyStyles.reflectionText}>{reflection.text}</Text>
          </View>
        ))
      )}
    </View>
  );
}

