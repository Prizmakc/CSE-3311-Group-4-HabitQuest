import { StyleSheet } from "react-native";

export const historyStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4F0E8"
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
    gap: 14
  },
  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12
  },
  loadingText: {
    color: "#365247",
    fontSize: 16
  },
  headerCard: {
    backgroundColor: "#20443A",
    borderRadius: 24,
    padding: 18,
    gap: 12
  },
  eyebrow: {
    color: "#D5E3DC",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontSize: 12,
    fontWeight: "700"
  },
  title: {
    color: "#FAF7F1",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "700"
  },
  subtitle: {
    color: "#DDE6E1",
    fontSize: 15,
    lineHeight: 21
  },
  statsRow: {
    flexDirection: "row",
    gap: 10
  },
  statCard: {
    flex: 1,
    backgroundColor: "#2D5649",
    borderRadius: 18,
    padding: 12,
    gap: 4
  },
  statLabel: {
    color: "#C8D8D0",
    fontSize: 12
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  sectionCard: {
    backgroundColor: "#FCFBF7",
    borderRadius: 20,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E8E0D4"
  },
  sectionTitle: {
    color: "#1E362F",
    fontSize: 22,
    fontWeight: "700"
  },
  sectionBody: {
    color: "#5E6F66",
    fontSize: 14,
    lineHeight: 20
  },
  trendRow: {
    flexDirection: "row",
    gap: 10
  },
  trendCard: {
    flex: 1,
    backgroundColor: "#F6F1E8",
    borderRadius: 16,
    padding: 14,
    gap: 6
  },
  trendLabel: {
    color: "#6B6257",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: "700"
  },
  trendValue: {
    color: "#1E362F",
    fontSize: 20,
    fontWeight: "700"
  },
  trendCopy: {
    color: "#5E6F66",
    fontSize: 13,
    lineHeight: 18
  },
  historyItem: {
    backgroundColor: "#F6F1E8",
    borderRadius: 16,
    padding: 14,
    gap: 8
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center"
  },
  historyDate: {
    color: "#1E362F",
    fontWeight: "700",
    fontSize: 16
  },
  historyEnergy: {
    color: "#6C766A",
    fontSize: 13
  },
  statusRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap"
  },
  statusPill: {
    backgroundColor: "#E8E0D4",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  statusPillText: {
    color: "#355247",
    fontWeight: "700",
    fontSize: 12
  },
  noteText: {
    color: "#4F6058",
    fontSize: 14,
    lineHeight: 20
  },
  reflectionMeta: {
    color: "#7A5319",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  reflectionText: {
    color: "#2E4038",
    fontSize: 14,
    lineHeight: 20
  },
  emptyText: {
    color: "#7C897F",
    fontSize: 14,
    lineHeight: 19
  }
});
