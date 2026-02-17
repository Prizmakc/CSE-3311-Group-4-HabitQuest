import { TextInput, TextInputProps, StyleSheet } from "react-native";

type AuthInputProps = TextInputProps;

export function AuthInput(props: AuthInputProps) {
  return (
    <TextInput
      placeholderTextColor="#6B7280"
      style={styles.input}
      autoCapitalize="none"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#FFFFFF"
  }
});
