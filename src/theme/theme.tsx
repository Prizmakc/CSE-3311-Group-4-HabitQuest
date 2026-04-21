import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

const THEME_STORAGE_KEY = "habitquest.appearance-mode.v1";

export type AppearanceMode = "light" | "dark" | "system";
export type EffectiveThemeName = "light" | "dark";

export type HabitQuestTheme = {
  name: EffectiveThemeName;
  colors: {
    background: string;
    surface: string;
    surfaceSecondary: string;
    card: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentSoft: string;
    accentText: string;
    success: string;
    successSoft: string;
    warning: string;
    warningSoft: string;
    error: string;
    inputBackground: string;
    inputBorder: string;
    placeholder: string;
    tabBarBackground: string;
    tabIconDefault: string;
    tabIconSelected: string;
    buttonPrimaryBackground: string;
    buttonPrimaryText: string;
    buttonSecondaryBackground: string;
    buttonSecondaryText: string;
    disabledBackground: string;
    disabledText: string;
    overlay: string;
    shadow: string;
    hero: string;
    heroSurface: string;
    heroText: string;
    heroTextSecondary: string;
    gentleSurface: string;
    gentleSurfaceActive: string;
    gentleBorder: string;
    gentleBorderActive: string;
    gentleText: string;
    gentleTextSecondary: string;
    completedSurface: string;
    completedBorder: string;
    partialSurface: string;
    partialBorder: string;
    skippedSurface: string;
    skippedBorder: string;
    destructive: string;
  };
};

export const lightTheme: HabitQuestTheme = {
  name: "light",
  colors: {
    background: "#F4F0E8",
    surface: "#FCFBF7",
    surfaceSecondary: "#F6F1E8",
    card: "#FCFBF7",
    border: "#E8E0D4",
    textPrimary: "#1E362F",
    textSecondary: "#5E6F66",
    textMuted: "#7C897F",
    accent: "#20443A",
    accentSoft: "#DDE9E3",
    accentText: "#FAF7F1",
    success: "#2C6A4A",
    successSoft: "#DDE9E3",
    warning: "#7A5319",
    warningSoft: "#F6E5C6",
    error: "#A23C2D",
    inputBackground: "#FFFFFF",
    inputBorder: "#DCCFBE",
    placeholder: "#6E7E76",
    tabBarBackground: "#FCFBF7",
    tabIconDefault: "#7A7B76",
    tabIconSelected: "#1E362F",
    buttonPrimaryBackground: "#274B3F",
    buttonPrimaryText: "#FDFCF9",
    buttonSecondaryBackground: "#E8E0D4",
    buttonSecondaryText: "#29453B",
    disabledBackground: "#E0D8CA",
    disabledText: "#7C897F",
    overlay: "rgba(24, 31, 27, 0.35)",
    shadow: "rgba(24, 31, 27, 0.18)",
    hero: "#20443A",
    heroSurface: "#2D5649",
    heroText: "#FAF7F1",
    heroTextSecondary: "#DDE6E1",
    gentleSurface: "#F6E5C6",
    gentleSurfaceActive: "#E7F0E5",
    gentleBorder: "#EACF98",
    gentleBorderActive: "#8FAE9E",
    gentleText: "#5A3B13",
    gentleTextSecondary: "#6E4A17",
    completedSurface: "#DDE9E3",
    completedBorder: "#6C8E7F",
    partialSurface: "#E9EFE8",
    partialBorder: "#B2C6BB",
    skippedSurface: "#F3EEE4",
    skippedBorder: "#D8CFC1",
    destructive: "#9D4A34"
  }
};

export const darkTheme: HabitQuestTheme = {
  name: "dark",
  colors: {
    background: "#111815",
    surface: "#18231F",
    surfaceSecondary: "#202D28",
    card: "#1A2722",
    border: "#33443D",
    textPrimary: "#EFF5F1",
    textSecondary: "#B8C7BF",
    textMuted: "#8EA198",
    accent: "#8FB9A7",
    accentSoft: "#263B34",
    accentText: "#0F1A16",
    success: "#8BC9A7",
    successSoft: "#203A2F",
    warning: "#D7B06A",
    warningSoft: "#3B3020",
    error: "#E18B78",
    inputBackground: "#121D19",
    inputBorder: "#3A4C44",
    placeholder: "#82958C",
    tabBarBackground: "#16211D",
    tabIconDefault: "#809188",
    tabIconSelected: "#DCEBE3",
    buttonPrimaryBackground: "#B8D7C8",
    buttonPrimaryText: "#102019",
    buttonSecondaryBackground: "#293A33",
    buttonSecondaryText: "#DDE9E3",
    disabledBackground: "#27332E",
    disabledText: "#72827A",
    overlay: "rgba(4, 8, 6, 0.62)",
    shadow: "rgba(0, 0, 0, 0.32)",
    hero: "#1B332B",
    heroSurface: "#25463B",
    heroText: "#F5FAF7",
    heroTextSecondary: "#C4D8CE",
    gentleSurface: "#342D1D",
    gentleSurfaceActive: "#20372E",
    gentleBorder: "#766239",
    gentleBorderActive: "#6F9A83",
    gentleText: "#F0D79C",
    gentleTextSecondary: "#D8C695",
    completedSurface: "#203A2F",
    completedBorder: "#6EA284",
    partialSurface: "#273B35",
    partialBorder: "#789084",
    skippedSurface: "#332F29",
    skippedBorder: "#746B5E",
    destructive: "#E18B78"
  }
};

type ThemeContextValue = {
  appearanceMode: AppearanceMode;
  effectiveThemeName: EffectiveThemeName;
  theme: HabitQuestTheme;
  setAppearanceMode: (mode: AppearanceMode) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function resolveThemeName(mode: AppearanceMode, scheme: ColorSchemeName): EffectiveThemeName {
  if (mode === "system") {
    return scheme === "dark" ? "dark" : "light";
  }

  return mode;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const [appearanceMode, setAppearanceModeState] = useState<AppearanceMode>("system");

  useEffect(() => {
    let mounted = true;

    AsyncStorage.getItem(THEME_STORAGE_KEY).then((storedMode) => {
      if (!mounted) {
        return;
      }

      if (storedMode === "light" || storedMode === "dark" || storedMode === "system") {
        setAppearanceModeState(storedMode);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  async function setAppearanceMode(mode: AppearanceMode) {
    setAppearanceModeState(mode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
  }

  const effectiveThemeName = resolveThemeName(appearanceMode, colorScheme);
  const theme = effectiveThemeName === "dark" ? darkTheme : lightTheme;

  const value = useMemo(
    () => ({
      appearanceMode,
      effectiveThemeName,
      theme,
      setAppearanceMode
    }),
    [appearanceMode, effectiveThemeName, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
