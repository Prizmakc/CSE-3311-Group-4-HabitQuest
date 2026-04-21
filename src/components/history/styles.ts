import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { HabitQuestTheme, lightTheme, useTheme } from "../../theme/theme";

export function createHistoryStyles(theme: HabitQuestTheme) {
  const c = theme.colors;

  return StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.background
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
    color: c.textSecondary,
    fontSize: 16
  },
  headerCard: {
    backgroundColor: c.hero,
    borderRadius: 24,
    padding: 18,
    gap: 12
  },
  eyebrow: {
    color: c.heroTextSecondary,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontSize: 12,
    fontWeight: "700"
  },
  title: {
    color: c.heroText,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "700"
  },
  subtitle: {
    color: c.heroTextSecondary,
    fontSize: 15,
    lineHeight: 21
  },
  statsRow: {
    flexDirection: "row",
    gap: 10
  },
  statCard: {
    flex: 1,
    backgroundColor: c.heroSurface,
    borderRadius: 18,
    padding: 12,
    gap: 4
  },
  statLabel: {
    color: c.heroTextSecondary,
    fontSize: 12
  },
  statValue: {
    color: c.heroText,
    fontSize: 16,
    fontWeight: "700"
  },
  sectionCard: {
    backgroundColor: c.card,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: c.border
  },
  sectionTitle: {
    color: c.textPrimary,
    fontSize: 22,
    fontWeight: "700"
  },
  sectionBody: {
    color: c.textSecondary,
    fontSize: 14,
    lineHeight: 20
  },
  trendRow: {
    flexDirection: "row",
    gap: 10
  },
  trendCard: {
    flex: 1,
    backgroundColor: c.surfaceSecondary,
    borderRadius: 16,
    padding: 14,
    gap: 6
  },
  trendLabel: {
    color: c.textMuted,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: "700"
  },
  trendValue: {
    color: c.textPrimary,
    fontSize: 20,
    fontWeight: "700"
  },
  trendCopy: {
    color: c.textSecondary,
    fontSize: 13,
    lineHeight: 18
  },
  historyItem: {
    backgroundColor: c.surfaceSecondary,
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
    color: c.textPrimary,
    fontWeight: "700",
    fontSize: 16
  },
  historyEnergy: {
    color: c.textMuted,
    fontSize: 13
  },
  statusRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap"
  },
  statusPill: {
    backgroundColor: c.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  statusPillText: {
    color: c.buttonSecondaryText,
    fontWeight: "700",
    fontSize: 12
  },
  gentleBadge: {
    backgroundColor: c.successSoft,
    color: c.buttonSecondaryText,
    borderRadius: 999,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: "700"
  },
  noteText: {
    color: c.textSecondary,
    fontSize: 14,
    lineHeight: 20
  },
  reflectionMeta: {
    color: c.warning,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  reflectionText: {
    color: c.textPrimary,
    fontSize: 14,
    lineHeight: 20
  },
  editAction: {
    color: c.textSecondary,
    fontSize: 13,
    fontWeight: "700"
  },
  emptyText: {
    color: c.textMuted,
    fontSize: 14,
    lineHeight: 19
  }
  });
}

export function useHistoryStyles() {
  const { theme } = useTheme();
  return useMemo(() => createHistoryStyles(theme), [theme]);
}

export const historyStyles = createHistoryStyles(lightTheme);
