import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthInput } from "../../src/components/AuthInput";
import { supabase } from "../../src/lib/supabase";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onResetPassword() {
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim());

    setIsSubmitting(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSuccess("Reset link sent. Check your email inbox.");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>We&apos;ll send a reset link to your email</Text>

        <View style={styles.form}>
          <AuthInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}

          <Pressable
            disabled={isSubmitting || !email}
            onPress={onResetPassword}
            style={({ pressed }) => [styles.primaryButton, (pressed || isSubmitting || !email) && styles.primaryButtonDisabled]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Send Reset Link</Text>
            )}
          </Pressable>

          <Link href="/(auth)/login" style={styles.link}>
            Back to login
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
    fontSize: 32,
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
  success: {
    color: "#166534",
    fontSize: 14
  },
  link: {
    color: "#111827",
    fontSize: 14,
    textDecorationLine: "underline"
  }
});
