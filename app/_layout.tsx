import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import { AuthProvider } from "../src/providers/AuthProvider";
import { ThemeProvider, useTheme } from "../src/theme/theme";

function ThemedRootStack() {
  const { effectiveThemeName, theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={effectiveThemeName === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.background}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemedRootStack />
      </AuthProvider>
    </ThemeProvider>
  );
}
