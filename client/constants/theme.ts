import { Platform } from "react-native";

export const QuranColors = {
  primary: "#2C5F4F",
  accent: "#D4AF37",
  background: "#FAFAF8",
  surface: "#FFFFFF",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  success: "#059669",
  makkah: "#8B4513",
  madinah: "#2C5F4F",
};

const tintColorLight = QuranColors.primary;
const tintColorDark = "#4A9B7F";

export const Colors = {
  light: {
    text: QuranColors.textPrimary,
    textSecondary: QuranColors.textSecondary,
    buttonText: "#FFFFFF",
    tabIconDefault: QuranColors.textSecondary,
    tabIconSelected: tintColorLight,
    link: QuranColors.primary,
    accent: QuranColors.accent,
    backgroundRoot: QuranColors.background,
    backgroundDefault: QuranColors.surface,
    backgroundSecondary: "#F5F5F3",
    backgroundTertiary: "#EBEBEB",
    border: QuranColors.border,
    success: QuranColors.success,
    makkah: QuranColors.makkah,
    madinah: QuranColors.madinah,
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#9BA1A6",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    link: tintColorDark,
    accent: "#E5C158",
    backgroundRoot: "#1A1D1C",
    backgroundDefault: "#252928",
    backgroundSecondary: "#303534",
    backgroundTertiary: "#3B403F",
    border: "#404544",
    success: "#10B981",
    makkah: "#CD853F",
    madinah: "#4A9B7F",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
  audioPlayerHeight: 80,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  arabic: {
    fontSize: 24,
    lineHeight: 42,
    fontWeight: "400" as const,
  },
  arabicLarge: {
    fontSize: 28,
    lineHeight: 48,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};
