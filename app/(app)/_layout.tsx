import { Redirect, Tabs } from "expo-router";

import { HabitQuestDataProvider } from "../../src/providers/HabitQuestDataProvider";
import { useAuth } from "../../src/providers/AuthProvider";
import { useTheme } from "../../src/theme/theme";

export default function AppLayout() {
  const { session, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <HabitQuestDataProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.tabIconSelected,
          tabBarInactiveTintColor: theme.colors.tabIconDefault,
          tabBarStyle: {
            backgroundColor: theme.colors.tabBarBackground,
            borderTopColor: theme.colors.border,
            height: 72,
            paddingTop: 8,
            paddingBottom: 12
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700"
          }
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Today" }} />
        <Tabs.Screen name="history" options={{ title: "History" }} />
        <Tabs.Screen name="goals" options={{ title: "Goals" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </HabitQuestDataProvider>
  );
}
