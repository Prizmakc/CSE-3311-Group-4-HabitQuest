import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthInput } from "../../src/components/AuthInput";
import { useAuthStyles } from "../../src/components/authStyles";
import { useTheme } from "../../src/theme/theme";
import { supabase } from "../../src/lib/supabase";

export default function ForgotPasswordScreen() {
  const styles = useAuthStyles();
  const { theme } = useTheme();
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
        <Text style={styles.titleCompact}>Reset password</Text>
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
              <ActivityIndicator color={theme.colors.buttonPrimaryText} />
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
