import { Pressable, Text, View } from "react-native";

import { formatHistoryDate } from "../../domain/habitQuestHistory";
import { useHistoryStyles } from "./styles";

export function ReflectionHistoryCard({
  reflections,
  onEditReflection
}: {
  reflections: Array<{ date: string; text: string }>;
  onEditReflection: (date: string, text: string) => void;
}) {
  const historyStyles = useHistoryStyles();
  return (
    <View style={historyStyles.sectionCard}>
      <Text style={historyStyles.sectionTitle}>Recent reflections</Text>
      {reflections.length === 0 ? (
        <Text style={historyStyles.emptyText}>
          No reflections yet. A short note after a difficult day is enough.
        </Text>
      ) : (
        reflections.map((reflection) => (
          <View key={`${reflection.date}-${reflection.text}`} style={historyStyles.historyItem}>
            <View style={historyStyles.historyHeader}>
              <Text style={historyStyles.reflectionMeta}>{formatHistoryDate(reflection.date)}</Text>
              <Pressable
                onPress={() => onEditReflection(reflection.date, reflection.text)}
                hitSlop={8}
              >
                <Text style={historyStyles.editAction}>Edit</Text>
              </Pressable>
            </View>
            <Text style={historyStyles.reflectionText}>{reflection.text}</Text>
          </View>
        ))
      )}
    </View>
  );
}
