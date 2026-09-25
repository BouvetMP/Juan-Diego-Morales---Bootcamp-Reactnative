// src/theme/index.ts
export const COLORS = {
  primary: "#0969da",
  background: "#0d1117",
  card: "#161b22",
  cardBg: "#161b22",
  surface: "#161b22",
  surfaceAlt: "#21262d",
  text: "#c9d1d9",
  subtext: "#8b949e",
  textMuted: "#8b949e",
  textPrimary: "#c9d1d9",
  textSecondary: "#8b949e",
  border: "#30363d",
  danger: "#f85149",
  error: "#f85149",
  warning: "#d29922",
  success: "#238636",
  accent: "#0969da",
  accentDim: "rgba(9, 105, 218, 0.15)",

  PRIMARY: "#0969da",
  BACKGROUND: "#0d1117",
  CARD_BG: "#161b22",
  TEXT: "#c9d1d9",
  SUBTEXT: "#8b949e",
  BORDER: "#30363d",
  DANGER: "#f85149",
  SUCCESS: "#238636",
};

export const LIGHT_COLORS = {
  primary: "#0969da",
  background: "#ffffff",
  card: "#f6f8fa",
  cardBg: "#f6f8fa",
  surface: "#f6f8fa",
  surfaceAlt: "#f0f2f5",
  text: "#24292f",
  subtext: "#57606a",
  textMuted: "#57606a",
  textPrimary: "#24292f",
  textSecondary: "#57606a",
  border: "#d0d7de",
  danger: "#cf222e",
  error: "#cf222e",
  warning: "#9a6700",
  success: "#1a7f37",
  accent: "#0969da",
  accentDim: "rgba(9, 105, 218, 0.12)",

  PRIMARY: "#0969da",
  BACKGROUND: "#ffffff",
  CARD_BG: "#f6f8fa",
  TEXT: "#24292f",
  SUBTEXT: "#57606a",
  BORDER: "#d0d7de",
  DANGER: "#cf222e",
  SUCCESS: "#1a7f37",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  base: 16,
  xxl: 40,
};

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
};

export const TYPOGRAPHY = {
  h1: { fontSize: 24, fontWeight: "bold" as const },
  h2: { fontSize: 20, fontWeight: "bold" as const },
  body: { fontSize: 14 },
  caption: { fontSize: 12 },
  size: {
    xs: 12,
    sm: 14,
    base: 16, // ← agregar si falta
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24, // ← agregar si falta
    title: 24,
    subtitle: 16,
    body: 14,
    caption: 12,
  },

  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "bold" as const,
  },
};

export type AppColors = typeof COLORS;

export const getColors = (isDark: boolean): AppColors => {
  return isDark ? COLORS : LIGHT_COLORS;
};
