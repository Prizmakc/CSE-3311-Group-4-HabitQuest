import { Redirect, Tabs } from "expo-router";

import { HabitQuestDataProvider } from "../../src/providers/HabitQuestDataProvider";
import { useAuth } from "../../src/providers/AuthProvider";

export default function AppLayout() {
  const { session, isLoading } = useAuth();

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
          tabBarActiveTintColor: "#1E362F",
          tabBarInactiveTintColor: "#7A7B76",
          tabBarStyle: {
            backgroundColor: "#FCFBF7",
            borderTopColor: "#E8E0D4",
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
      </Tabs>
    </HabitQuestDataProvider>
  );
}
