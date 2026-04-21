import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";

import { useHomeStyles } from "./styles";
import { useTheme } from "../../theme/theme";

export function ReflectionCard({
  visible,
  gentleModeEnabled,
  reflectionText,
  setReflectionText,
  title = "Quick reflection (optional)",
  bodyText,
  cancelLabel = "Skip",
  saveLabel = "Save reflection",
  onCancel,
  onSaveReflection
}: {
  visible: boolean;
  gentleModeEnabled: boolean;
  reflectionText: string;
  setReflectionText: (text: string) => void;
  title?: string;
  bodyText?: string;
  cancelLabel?: string;
  saveLabel?: string;
  onCancel: () => void;
  onSaveReflection: () => void;
}) {
  const homeStyles = useHomeStyles();
  const { theme } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={homeStyles.modalBackdrop} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={homeStyles.modalWrap}
        >
          <Pressable onPress={() => {}} style={homeStyles.modalCard}>
            <Text style={homeStyles.modalTitle}>{title}</Text>
            <Text style={homeStyles.modalBody}>
              {bodyText ??
                (gentleModeEnabled
                  ? "Anything worth noting?"
                  : "What worked? What felt hard? What&apos;s one small next step?")}
            </Text>
            <TextInput
              placeholder="Only if you want to."
              placeholderTextColor={theme.colors.placeholder}
              style={[homeStyles.input, homeStyles.reflectionInput]}
              multiline
              value={reflectionText}
              onChangeText={setReflectionText}
              returnKeyType="done"
              blurOnSubmit
              onSubmitEditing={Keyboard.dismiss}
            />
            <View style={homeStyles.modalActions}>
              <Pressable onPress={onCancel} style={homeStyles.secondaryOutlineCompact}>
                <Text style={homeStyles.secondaryOutlineText}>{cancelLabel}</Text>
              </Pressable>
              <Pressable onPress={onSaveReflection} style={homeStyles.primaryActionCompact}>
                <Text style={homeStyles.primaryActionText}>{saveLabel}</Text>
              </Pressable>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}
