import { Pressable, Text, TextInput, View } from "react-native";

import { Reflection } from "../../types/habitquest";
import { homeStyles } from "./styles";

export function ReflectionCard({
  reflectionPeriod,
  setReflectionPeriod,
  reflectionText,
  setReflectionText,
  reflectionMessage,
  onSaveReflection
}: {
  reflectionPeriod: Reflection["period"];
  setReflectionPeriod: (period: Reflection["period"]) => void;
  reflectionText: string;
  setReflectionText: (text: string) => void;
  reflectionMessage: string;
  onSaveReflection: () => void;
}) {
  return (
    <View style={homeStyles.sectionCard}>
      <Text style={homeStyles.sectionTitle}>Reflection</Text>
      <Text style={homeStyles.sectionBody}>
        Keep it short. Reflection should feel like re-entry, not homework.
      </Text>
      <View style={homeStyles.toggleRow}>
        <Pressable
          onPress={() => setReflectionPeriod("daily")}
          style={[
            homeStyles.toggleButton,
            reflectionPeriod === "daily" && homeStyles.toggleButtonActive
          ]}
        >
          <Text
            style={[
              homeStyles.toggleButtonText,
              reflectionPeriod === "daily" && homeStyles.toggleButtonTextActive
            ]}
          >
            Daily
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setReflectionPeriod("weekly")}
          style={[
            homeStyles.toggleButton,
            reflectionPeriod === "weekly" && homeStyles.toggleButtonActive
          ]}
        >
          <Text
            style={[
              homeStyles.toggleButtonText,
              reflectionPeriod === "weekly" && homeStyles.toggleButtonTextActive
            ]}
          >
            Weekly
          </Text>
        </Pressable>
      </View>
      <TextInput
        placeholder="What worked? What felt hard? What is one smaller next step?"
        placeholderTextColor="#6E7E76"
        style={[homeStyles.input, homeStyles.reflectionInput]}
        multiline
        value={reflectionText}
        onChangeText={setReflectionText}
      />
      {reflectionMessage ? <Text style={homeStyles.successText}>{reflectionMessage}</Text> : null}
      <Pressable onPress={onSaveReflection} style={homeStyles.primaryAction}>
        <Text style={homeStyles.primaryActionText}>Save reflection</Text>
      </Pressable>
    </View>
  );
}

