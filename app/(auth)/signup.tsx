import { Link, router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthInput } from "../../src/components/AuthInput";
import { useAuthStyles } from "../../src/components/authStyles";
import { useTheme } from "../../src/theme/theme";
import { supabase } from "../../src/lib/supabase";

export default function SignupScreen() {
  const styles = useAuthStyles();
  const { theme } = useTheme();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSignup() {
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          first_name: firstName.trim(),
          firstName: firstName.trim()
        }
      }
    });

    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess("Account created. You can now log in.");
    router.replace("/(auth)/login");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titleCompact}>Create account</Text>
        <Text style={styles.subtitle}>Start building consistent progress</Text>

        <View style={styles.form}>
          <AuthInput
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
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
          <AuthInput
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}

          <Pressable
            disabled={
              isSubmitting ||
              !firstName.trim() ||
              !email ||
              password.length < 6 ||
              confirmPassword.length < 6
            }
            onPress={onSignup}
            style={({ pressed }) => [
              styles.primaryButton,
              (pressed ||
                isSubmitting ||
                !firstName.trim() ||
                !email ||
                password.length < 6 ||
                confirmPassword.length < 6) &&
                styles.primaryButtonDisabled
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.buttonPrimaryText} />
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
