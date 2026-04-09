import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4F0E8"
  },
  loadingSafe: {
    flex: 1,
    backgroundColor: "#F4F0E8"
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
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
    gap: 14
  },
  hero: {
    backgroundColor: "#20443A",
    borderRadius: 24,
    padding: 18,
    gap: 10
  },
  heroCopy: {
    gap: 6
  },
  eyebrow: {
    color: "#D5E3DC",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontSize: 12,
    fontWeight: "700"
  },
  heroTitle: {
    color: "#FAF7F1",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "700"
  },
  heroSubtitle: {
    color: "#DDE6E1",
    fontSize: 15,
    lineHeight: 21
  },
  heroModeTag: {
    alignSelf: "flex-start",
    backgroundColor: "#31594C",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#F1F5F0",
    fontSize: 12,
    fontWeight: "700"
  },
  banner: {
    backgroundColor: "#F6E5C6",
    borderRadius: 18,
    padding: 16,
    gap: 8
  },
  bannerTitle: {
    color: "#5A3B13",
    fontSize: 18,
    fontWeight: "700"
  },
  bannerBody: {
    color: "#6E4A17",
    fontSize: 14,
    lineHeight: 20
  },
  bannerButton: {
    backgroundColor: "#6E4A17",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center"
  },
  bannerButtonText: {
    color: "#FFF8ED",
    fontWeight: "700",
    fontSize: 15
  },
  sectionCard: {
    backgroundColor: "#FCFBF7",
    borderRadius: 20,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E8E0D4"
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start"
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
  progressTrack: {
    height: 12,
    backgroundColor: "#E0D8CA",
    borderRadius: 999,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3E6E5B",
    borderRadius: 999
  },
  progressCaption: {
    color: "#5E6F66",
    fontSize: 13
  },
  rewardCard: {
    backgroundColor: "#EEE2D0",
    borderRadius: 16,
    padding: 14,
    gap: 6
  },
  rewardLabel: {
    color: "#6E4A17",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  rewardText: {
    color: "#3D3429",
    fontSize: 14,
    lineHeight: 20
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DCCFBE",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#1E362F",
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
    backgroundColor: "#F6F1E8",
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
    color: "#29453B",
    fontSize: 14,
    flex: 1
  },
  removeText: {
    color: "#9D4A34",
    fontSize: 13,
    fontWeight: "700"
  },
  emptyText: {
    color: "#7C897F",
    fontSize: 14,
    lineHeight: 19
  },
  errorText: {
    color: "#A23C2D",
    fontSize: 14
  },
  successText: {
    color: "#2C6A4A",
    fontSize: 14,
    fontWeight: "600"
  },
  primaryAction: {
    backgroundColor: "#274B3F",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center"
  },
  primaryActionCompact: {
    flex: 1,
    backgroundColor: "#274B3F",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center"
  },
  primaryActionText: {
    color: "#FDFCF9",
    fontSize: 15,
    fontWeight: "700"
  },
  secondaryAction: {
    backgroundColor: "#E8E0D4",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryActionText: {
    color: "#29453B",
    fontSize: 14,
    fontWeight: "700"
  },
  checkInRow: {
    backgroundColor: "#F7F3EB",
    borderRadius: 16,
    padding: 12,
    gap: 12
  },
  taskRow: {
    backgroundColor: "#F7F3EB",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E8E0D4"
  },
  taskRowCompleted: {
    backgroundColor: "#DDE9E3",
    borderColor: "#6C8E7F"
  },
  taskRowPartial: {
    backgroundColor: "#E9EFE8",
    borderColor: "#B2C6BB"
  },
  taskRowSkipped: {
    backgroundColor: "#F3EEE4",
    borderColor: "#D8CFC1"
  },
  taskRowCopy: {
    flex: 1,
    gap: 4
  },
  taskRowTitle: {
    color: "#1E362F",
    fontSize: 16,
    fontWeight: "700"
  },
  taskRowMeta: {
    color: "#66766E",
    fontSize: 13
  },
  taskStateBadge: {
    borderRadius: 999,
    backgroundColor: "#ECE5D8",
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  taskStateBadgeCompleted: {
    backgroundColor: "#365F51"
  },
  taskStateBadgePartial: {
    backgroundColor: "#6E8D80"
  },
  taskStateBadgeSkipped: {
    backgroundColor: "#A99C8C"
  },
  taskStateBadgeText: {
    color: "#355247",
    fontWeight: "700",
    fontSize: 12
  },
  taskStateBadgeTextActive: {
    color: "#FCFBF7"
  },
  checkInCopy: {
    gap: 4
  },
  checkInStep: {
    color: "#1E362F",
    fontSize: 16,
    fontWeight: "700"
  },
  checkInGoal: {
    color: "#66766E",
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
    backgroundColor: "#ECE5D8"
  },
  statusButtonActive: {
    backgroundColor: "#365F51"
  },
  statusButtonText: {
    color: "#355247",
    fontWeight: "700",
    fontSize: 13
  },
  statusButtonTextActive: {
    color: "#FDFCF9"
  },
  inputLabel: {
    color: "#486258",
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
    backgroundColor: "#ECE5D8",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  energyChipActive: {
    backgroundColor: "#C7D5CC"
  },
  energyChipText: {
    color: "#365247",
    fontWeight: "700"
  },
  energyChipTextActive: {
    color: "#1D362E"
  },
  noteInput: {
    minHeight: 88,
    textAlignVertical: "top"
  },
  secondaryOutline: {
    borderColor: "#C7B8A4",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center"
  },
  secondaryOutlineCompact: {
    flex: 1,
    borderColor: "#C7B8A4",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center"
  },
  secondaryOutlineText: {
    color: "#5B5144",
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
    backgroundColor: "#EFE8DD",
    alignItems: "center"
  },
  toggleButtonActive: {
    backgroundColor: "#D7E2DB"
  },
  toggleButtonText: {
    color: "#55675F",
    fontWeight: "700"
  },
  toggleButtonTextActive: {
    color: "#1F392F"
  },
  reflectionInput: {
    minHeight: 110,
    textAlignVertical: "top"
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(24, 31, 27, 0.35)",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  modalWrap: {
    width: "100%"
  },
  modalCard: {
    backgroundColor: "#FCFBF7",
    borderRadius: 24,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E8E0D4"
  },
  modalTitle: {
    color: "#1E362F",
    fontSize: 22,
    fontWeight: "700"
  },
  modalBody: {
    color: "#5E6F66",
    fontSize: 14,
    lineHeight: 20
  },
  modalActions: {
    flexDirection: "row",
    gap: 10
  },
  goalCard: {
    backgroundColor: "#F6F1E8",
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
    color: "#5B5144",
    fontSize: 12,
    fontWeight: "700"
  },
  goalCardActionDangerText: {
    color: "#9D4A34",
    fontSize: 12,
    fontWeight: "700"
  },
  goalCardTitle: {
    color: "#1E362F",
    fontWeight: "700",
    fontSize: 17
  },
  goalCardWhy: {
    color: "#5E6F66",
    fontSize: 14,
    lineHeight: 20
  },
  goalCardReward: {
    color: "#7A5319",
    fontSize: 13,
    fontWeight: "700"
  },
  goalCardSteps: {
    gap: 4
  },
  goalCardStepText: {
    color: "#365247",
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
    borderColor: "#D6CAB8",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center"
  },
  devButtonText: {
    color: "#6B6257",
    fontSize: 13,
    fontWeight: "700"
  },
  textDangerButton: {
    alignItems: "center",
    paddingVertical: 8
  },
  textDangerButtonText: {
    color: "#9D4A34",
    fontSize: 14,
    fontWeight: "700"
  }
});
