import { Link, router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthInput } from "../../src/components/AuthInput";
import { supabase } from "../../src/lib/supabase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onLogin() {
    setError("");
    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace("/(app)");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>HabitQuest</Text>
        <Text style={styles.subtitle}>Log in to continue your accountability loop</Text>

        <View style={styles.form}>
          <AuthInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            disabled={isSubmitting || !email || !password}
            onPress={onLogin}
            style={({ pressed }) => [
              styles.primaryButton,
              (pressed || isSubmitting || !email || !password) && styles.primaryButtonDisabled
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Log In</Text>
            )}
          </Pressable>

          <Link href="/(auth)/forgot-password" style={styles.link}>
            Forgot password?
          </Link>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="/(auth)/signup" style={styles.linkInline}>
            Sign up
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 36,
    gap: 18
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111827"
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563"
  },
  form: {
    marginTop: 8,
    gap: 12
  },
  primaryButton: {
    marginTop: 6,
    backgroundColor: "#111827",
    minHeight: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButtonDisabled: {
    opacity: 0.6
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },
  error: {
    color: "#B91C1C",
    fontSize: 14
  },
  link: {
    color: "#1F2937",
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
    color: "#4B5563",
    fontSize: 14
  },
  linkInline: {
    color: "#111827",
    fontWeight: "600",
    textDecorationLine: "underline"
  }
});
