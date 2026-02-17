import { Link, router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthInput } from "../../src/components/AuthInput";
import { supabase } from "../../src/lib/supabase";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSignup() {
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess("Account created. Check your email to verify your account.");
    router.replace("/(auth)/login");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Start building consistent progress</Text>

        <View style={styles.form}>
          <AuthInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            placeholder="Password (min 6 chars)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}

          <Pressable
            disabled={isSubmitting || !email || password.length < 6}
            onPress={onSignup}
            style={({ pressed }) => [
              styles.primaryButton,
              (pressed || isSubmitting || !email || password.length < 6) && styles.primaryButtonDisabled
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/(auth)/login" style={styles.linkInline}>
            Log in
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
