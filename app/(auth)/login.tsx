import { Link, router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthInput } from "../../src/components/AuthInput";
import { useAuthStyles } from "../../src/components/authStyles";
import { useTheme } from "../../src/theme/theme";
import { supabase } from "../../src/lib/supabase";

export default function LoginScreen() {
  const styles = useAuthStyles();
  const { theme } = useTheme();
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
              <ActivityIndicator color={theme.colors.buttonPrimaryText} />
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
