import { Redirect, Stack } from "expo-router";

import { useAuth } from "../../src/providers/AuthProvider";

export default function AuthLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (session) {
    return <Redirect href="/(app)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
