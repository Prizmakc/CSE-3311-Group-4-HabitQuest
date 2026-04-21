import { TextInput, TextInputProps } from "react-native";

import { useHomeStyles } from "./home/styles";
import { useTheme } from "../theme/theme";

type AuthInputProps = TextInputProps;

export function AuthInput(props: AuthInputProps) {
  const homeStyles = useHomeStyles();
  const { theme } = useTheme();

  return (
    <TextInput
      placeholderTextColor={theme.colors.placeholder}
      style={homeStyles.input}
      autoCapitalize="none"
      {...props}
    />
  );
}
