import { Text, View } from "react-native";

import { formatHistoryDate } from "../../domain/habitQuestHistory";
import { getCompletionModeLabel } from "../../domain/habitQuestProgress";
import { DailyCheckIn } from "../../types/habitquest";
import { historyStyles } from "./styles";

function count(statuses: DailyCheckIn["statuses"], target: "completed" | "partial" | "skipped") {
  return Object.values(statuses).filter((status) => status === target).length;
}

export function CheckInHistoryCard({ checkIns }: { checkIns: DailyCheckIn[] }) {
  return (
    <View style={historyStyles.sectionCard}>
      <Text style={historyStyles.sectionTitle}>Recent check-ins</Text>
      {checkIns.length === 0 ? (
        <Text style={historyStyles.emptyText}>No check-ins yet. Your first one will appear here.</Text>
      ) : (
        checkIns.map((checkIn) => (
          <View key={checkIn.date} style={historyStyles.historyItem}>
            <View style={historyStyles.historyHeader}>
              <Text style={historyStyles.historyDate}>{formatHistoryDate(checkIn.date)}</Text>
              {checkIn.completionMode === "gentle" ? (
                <Text style={historyStyles.gentleBadge}>{getCompletionModeLabel(checkIn)}</Text>
              ) : null}
            </View>
            <View style={historyStyles.statusRow}>
              <View style={historyStyles.statusPill}>
                <Text style={historyStyles.statusPillText}>
                  Done {count(checkIn.statuses, "completed")}
                </Text>
              </View>
              <View style={historyStyles.statusPill}>
                <Text style={historyStyles.statusPillText}>
                  Partial {count(checkIn.statuses, "partial")}
                </Text>
              </View>
              <View style={historyStyles.statusPill}>
                <Text style={historyStyles.statusPillText}>
                  Skip {count(checkIn.statuses, "skipped")}
                </Text>
              </View>
            </View>
            {checkIn.reflection ? <Text style={historyStyles.noteText}>{checkIn.reflection}</Text> : null}
          </View>
        ))
      )}
    </View>
  );
}
