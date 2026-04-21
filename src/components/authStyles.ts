import { useMemo } from "react";
import { StyleSheet } from "react-native";

import { HabitQuestTheme, useTheme } from "../theme/theme";

function createAuthStyles(theme: HabitQuestTheme) {
  const c = theme.colors;

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.background },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 36,
      gap: 18
    },
    title: {
      fontSize: 34,
      fontWeight: "700",
      color: c.textPrimary
    },
    titleCompact: {
      fontSize: 32,
      fontWeight: "700",
      color: c.textPrimary
    },
    subtitle: {
      fontSize: 16,
      color: c.textSecondary
    },
    form: {
      marginTop: 8,
      gap: 12
    },
    primaryButton: {
      marginTop: 6,
      backgroundColor: c.buttonPrimaryBackground,
      minHeight: 48,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    primaryButtonDisabled: {
      opacity: 0.6
    },
    primaryButtonText: {
      color: c.buttonPrimaryText,
      fontSize: 16,
      fontWeight: "600"
    },
    error: {
      color: c.error,
      fontSize: 14
    },
    success: {
      color: c.success,
      fontSize: 14
    },
    link: {
      color: c.textPrimary,
      fontSize: 14,
      textDecorationLine: "underline"
    },
    footerRow: {
      marginTop: "auto",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingBottom: 20
    },
    footerText: {
      color: c.textSecondary,
      fontSize: 14
    },
    linkInline: {
      color: c.textPrimary,
      fontWeight: "600",
      textDecorationLine: "underline"
    }
  });
}

export function useAuthStyles() {
  const { theme } = useTheme();
  return useMemo(() => createAuthStyles(theme), [theme]);
}
