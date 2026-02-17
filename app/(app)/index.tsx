import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { supabase } from "../../src/lib/supabase";

export default function HomeScreen() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function onSignOut() {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to HabitQuest</Text>
        <Text style={styles.subtitle}>Auth scaffold is complete. Next: goals, steps, and daily check-ins.</Text>

        <Pressable onPress={onSignOut} disabled={isSigningOut} style={({ pressed }) => [styles.button, (pressed || isSigningOut) && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{isSigningOut ? "Signing out..." : "Sign Out"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F9FAFB" },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    gap: 16
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827"
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563"
  },
  button: {
    marginTop: 6,
    backgroundColor: "#111827",
    minHeight: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonDisabled: {
    opacity: 0.7
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16
  }
});
