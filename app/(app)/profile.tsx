import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { homeStyles } from "../../src/components/home/styles";
import { useAuth } from "../../src/providers/AuthProvider";
import { supabase } from "../../src/lib/supabase";
import { useState } from "react";

export default function ProfileScreen() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { session, isLoading } = useAuth();
  const firstName =
    (session?.user.user_metadata?.first_name as string | undefined) ??
    (session?.user.user_metadata?.firstName as string | undefined) ??
    "";

  async function onSignOut() {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  }

  if (isLoading) {
    return (
      <SafeAreaView style={homeStyles.loadingSafe}>
        <View style={homeStyles.loadingWrap}>
          <ActivityIndicator size="large" color="#20443A" />
          <Text style={homeStyles.loadingText}>Loading your profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={homeStyles.safe}>
      <View style={homeStyles.container}>
        <View style={homeStyles.sectionCard}>
          <Text style={homeStyles.sectionTitle}>Profile</Text>
          <Text style={homeStyles.sectionBody}>
            Account actions live here so Today can stay focused on the check-in flow.
          </Text>
          <Text style={homeStyles.inputLabel}>First name</Text>
          <View style={homeStyles.input}>
            <Text style={homeStyles.taskRowTitle}>{firstName || "No first name saved"}</Text>
          </View>
          <Text style={homeStyles.inputLabel}>Email</Text>
          <View style={homeStyles.input}>
            <Text style={homeStyles.taskRowTitle}>{session?.user.email ?? "Unknown account"}</Text>
          </View>
          <Pressable
            onPress={() => {
              void onSignOut();
            }}
            disabled={isSigningOut}
            style={({ pressed }) => [
              homeStyles.primaryAction,
              isSigningOut && homeStyles.buttonDisabled,
              pressed && homeStyles.buttonPressed
            ]}
          >
            <Text style={homeStyles.primaryActionText}>
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
