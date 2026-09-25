// ============================================
// TEMA OSCURO (GitHub Dark) — por defecto
// ============================================
export const COLORS = {
  background: "#0d1117",
  surface: "#161b22",
  surfaceAlt: "#21262d",

  border: "#30363d",
  borderLight: "#21262d",

  textPrimary: "#e6edf3",
  textSecondary: "#8b949e",
  textMuted: "#6e7681",

  accent: "#61DAFB",
  accentDim: "#61DAFB33",

  success: "#3fb950",
  warning: "#f0883e",
  error: "#f85149",
  info: "#58a6ff",
} as const;

// ============================================
// TEMA CLARO (GitHub Light)
// ============================================
export const LIGHT_COLORS = {
  background: "#f6f8fa",
  surface: "#ffffff",
  surfaceAlt: "#f0f2f5",

  border: "#d0d7de",
  borderLight: "#eaeef2",

  textPrimary: "#1f2328",
  textSecondary: "#656d76",
  textMuted: "#8c959f",

  accent: "#0969da",
  accentDim: "#0969da33",

  success: "#1a7f37",
  warning: "#9a6700",
  error: "#cf222e",
  info: "#0969da",
} as const;

export type AppColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderLight: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentDim: string;
  success: string;
  warning: string;
  error: string;
  info: string;
};

/** Devuelve la paleta según modo oscuro/claro */
export const getColors = (darkMode: boolean): AppColors =>
  darkMode ? COLORS : LIGHT_COLORS;

export const TYPOGRAPHY = {
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
  },
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  full: 9999,
} as const;
