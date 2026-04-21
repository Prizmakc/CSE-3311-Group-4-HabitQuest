import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { HabitQuestTheme, lightTheme, useTheme } from "../../theme/theme";

export function createHomeStyles(theme: HabitQuestTheme) {
  const c = theme.colors;

  return StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.background
  },
  loadingSafe: {
    flex: 1,
    backgroundColor: c.background
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
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
    gap: 14
  },
  hero: {
    backgroundColor: c.hero,
    borderRadius: 24,
    padding: 18,
    gap: 10
  },
  heroCopy: {
    gap: 6
  },
  eyebrow: {
    color: c.heroTextSecondary,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontSize: 12,
    fontWeight: "700"
  },
  heroTitle: {
    color: c.heroText,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "700"
  },
  heroSubtitle: {
    color: c.heroTextSecondary,
    fontSize: 15,
    lineHeight: 21
  },
  heroModeTag: {
    alignSelf: "flex-start",
    backgroundColor: c.successSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: c.buttonSecondaryText,
    fontSize: 12,
    fontWeight: "700"
  },
  banner: {
    backgroundColor: c.gentleSurface,
    borderRadius: 18,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: c.gentleBorder
  },
  bannerActive: {
    backgroundColor: c.gentleSurfaceActive,
    borderColor: c.gentleBorderActive,
    borderWidth: 2
  },
  bannerTitle: {
    color: c.gentleText,
    fontSize: 18,
    fontWeight: "700"
  },
  bannerBody: {
    color: c.gentleTextSecondary,
    fontSize: 14,
    lineHeight: 20
  },
  bannerButton: {
    backgroundColor: c.gentleTextSecondary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center"
  },
  bannerButtonText: {
    color: c.buttonPrimaryText,
    fontWeight: "700",
    fontSize: 15
  },
  gentleTargetText: {
    alignSelf: "flex-start",
    backgroundColor: c.successSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: c.buttonSecondaryText,
    fontSize: 13,
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
  gentleCheckInCard: {
    backgroundColor: c.gentleSurfaceActive,
    borderColor: c.gentleBorderActive,
    borderWidth: 2
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start"
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
  progressTrack: {
    height: 12,
    backgroundColor: c.disabledBackground,
    borderRadius: 999,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: c.accent,
    borderRadius: 999
  },
  progressCaption: {
    color: c.textSecondary,
    fontSize: 13
  },
  rewardCard: {
    backgroundColor: c.surfaceSecondary,
    borderRadius: 16,
    padding: 14,
    gap: 6
  },
  rewardLabel: {
    color: c.gentleTextSecondary,
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  rewardText: {
    color: c.textPrimary,
    fontSize: 14,
    lineHeight: 20
  },
  input: {
    backgroundColor: c.inputBackground,
    borderColor: c.inputBorder,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: c.textPrimary,
    fontSize: 15
  },
  stepComposer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  stepComposerInput: {
    flex: 1
  },
  stepList: {
    gap: 8
  },
  stepListRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: c.surfaceSecondary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10
  },
  editStepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  editStepInput: {
    flex: 1
  },
  stepListText: {
    color: c.buttonSecondaryText,
    fontSize: 14,
    flex: 1
  },
  removeText: {
    color: c.destructive,
    fontSize: 13,
    fontWeight: "700"
  },
  emptyText: {
    color: c.textMuted,
    fontSize: 14,
    lineHeight: 19
  },
  errorText: {
    color: c.error,
    fontSize: 14
  },
  successText: {
    color: c.success,
    fontSize: 14,
    fontWeight: "600"
  },
  primaryAction: {
    backgroundColor: c.buttonPrimaryBackground,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center"
  },
  primaryActionCompact: {
    flex: 1,
    backgroundColor: c.buttonPrimaryBackground,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center"
  },
  primaryActionText: {
    color: c.buttonPrimaryText,
    fontSize: 15,
    fontWeight: "700"
  },
  secondaryAction: {
    backgroundColor: c.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryActionText: {
    color: c.buttonSecondaryText,
    fontSize: 14,
    fontWeight: "700"
  },
  checkInRow: {
    backgroundColor: c.surfaceSecondary,
    borderRadius: 16,
    padding: 12,
    gap: 12
  },
  taskRow: {
    backgroundColor: c.surfaceSecondary,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderWidth: 1,
    borderColor: c.border
  },
  gentleTargetChip: {
    alignSelf: "flex-start",
    backgroundColor: c.successSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  gentleTargetChipText: {
    color: c.buttonSecondaryText,
    fontSize: 13,
    fontWeight: "700"
  },
  gentlePrompt: {
    color: c.textSecondary,
    fontSize: 14,
    fontWeight: "700"
  },
  taskRowCompleted: {
    backgroundColor: c.completedSurface,
    borderColor: c.completedBorder
  },
  taskRowPartial: {
    backgroundColor: c.partialSurface,
    borderColor: c.partialBorder
  },
  taskRowSkipped: {
    backgroundColor: c.skippedSurface,
    borderColor: c.skippedBorder
  },
  taskRowCopy: {
    flex: 1,
    gap: 4
  },
  taskRowTitle: {
    color: c.textPrimary,
    fontSize: 16,
    fontWeight: "700"
  },
  taskRowMeta: {
    color: c.textMuted,
    fontSize: 13
  },
  taskStateBadge: {
    borderRadius: 999,
    backgroundColor: c.buttonSecondaryBackground,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  taskStateBadgeCompleted: {
    backgroundColor: c.accent
  },
  taskStateBadgePartial: {
    backgroundColor: c.partialBorder
  },
  taskStateBadgeSkipped: {
    backgroundColor: c.skippedBorder
  },
  taskStateBadgeText: {
    color: c.buttonSecondaryText,
    fontWeight: "700",
    fontSize: 12
  },
  taskStateBadgeTextActive: {
    color: c.card
  },
  checkInCopy: {
    gap: 4
  },
  checkInStep: {
    color: c.textPrimary,
    fontSize: 16,
    fontWeight: "700"
  },
  checkInGoal: {
    color: c.textMuted,
    fontSize: 13
  },
  statusButtonRow: {
    flexDirection: "row",
    gap: 8
  },
  statusButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: c.buttonSecondaryBackground
  },
  statusButtonActive: {
    backgroundColor: c.accent
  },
  statusButtonText: {
    color: c.buttonSecondaryText,
    fontWeight: "700",
    fontSize: 13
  },
  statusButtonTextActive: {
    color: c.buttonPrimaryText
  },
  inputLabel: {
    color: c.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  energyRow: {
    flexDirection: "row",
    gap: 8
  },
  energyChip: {
    backgroundColor: c.buttonSecondaryBackground,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  energyChipActive: {
    backgroundColor: c.accentSoft
  },
  energyChipText: {
    color: c.textSecondary,
    fontWeight: "700"
  },
  energyChipTextActive: {
    color: c.textPrimary
  },
  noteInput: {
    minHeight: 88,
    textAlignVertical: "top"
  },
  secondaryOutline: {
    borderColor: c.inputBorder,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center"
  },
  secondaryOutlineCompact: {
    flex: 1,
    borderColor: c.inputBorder,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center"
  },
  secondaryOutlineText: {
    color: c.textMuted,
    fontWeight: "700",
    fontSize: 14
  },
  toggleRow: {
    flexDirection: "row",
    gap: 10
  },
  toggleButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: c.buttonSecondaryBackground,
    alignItems: "center"
  },
  toggleButtonActive: {
    backgroundColor: c.accentSoft
  },
  toggleButtonText: {
    color: c.textSecondary,
    fontWeight: "700"
  },
  toggleButtonTextActive: {
    color: c.textPrimary
  },
  reflectionInput: {
    minHeight: 110,
    textAlignVertical: "top"
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: c.overlay,
    justifyContent: "center",
    paddingHorizontal: 18
  },
  modalWrap: {
    width: "100%"
  },
  modalCard: {
    backgroundColor: c.card,
    borderRadius: 24,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: c.border
  },
  modalTitle: {
    color: c.textPrimary,
    fontSize: 22,
    fontWeight: "700"
  },
  modalBody: {
    color: c.textSecondary,
    fontSize: 14,
    lineHeight: 20
  },
  modalActions: {
    flexDirection: "row",
    gap: 10
  },
  goalCard: {
    backgroundColor: c.surfaceSecondary,
    borderRadius: 16,
    padding: 14,
    gap: 8
  },
  goalCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center"
  },
  goalCardActions: {
    flexDirection: "row",
    gap: 12
  },
  goalCardActionText: {
    color: c.textMuted,
    fontSize: 12,
    fontWeight: "700"
  },
  goalCardActionDangerText: {
    color: c.destructive,
    fontSize: 12,
    fontWeight: "700"
  },
  goalCardTitle: {
    color: c.textPrimary,
    fontWeight: "700",
    fontSize: 17
  },
  goalCardWhy: {
    color: c.textSecondary,
    fontSize: 14,
    lineHeight: 20
  },
  goalCardReward: {
    color: c.warning,
    fontSize: 13,
    fontWeight: "700"
  },
  goalCardSteps: {
    gap: 4
  },
  goalCardStepText: {
    color: c.textSecondary,
    fontSize: 14
  },
  buttonPressed: {
    opacity: 0.85
  },
  buttonDisabled: {
    opacity: 0.65
  },
  devRow: {
    flexDirection: "row",
    gap: 10
  },
  devButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.inputBorder,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center"
  },
  devButtonText: {
    color: c.textMuted,
    fontSize: 13,
    fontWeight: "700"
  },
  textDangerButton: {
    alignItems: "center",
    paddingVertical: 8
  },
  textDangerButtonText: {
    color: c.destructive,
    fontSize: 14,
    fontWeight: "700"
  }
  });
}

export function useHomeStyles() {
  const { theme } = useTheme();
  return useMemo(() => createHomeStyles(theme), [theme]);
}

export const homeStyles = createHomeStyles(lightTheme);
