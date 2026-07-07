export const colors = {
  black: "#000000",
  bgDark: "#0A0A0A",
  bgDeep: "#050505",
  surface: "#121212",
  surfaceAlt: "#1A1A1A",
  neon: "#39FF14",
  neonBright: "#5CFF3D",
  neonSoft: "rgba(57, 255, 20, 0.15)",
  neonBorder: "rgba(57, 255, 20, 0.35)",
  glass: "rgba(255, 255, 255, 0.06)",
  glassStrong: "rgba(255, 255, 255, 0.10)",
  glassBorder: "rgba(255, 255, 255, 0.12)",
  textPrimary: "#FFFFFF",
  textSecondary: "#9A9A9A",
  textMuted: "#6B6B6B",
  danger: "#FF4757",
  gold: "#FFD54A",
};

export const radii = {
  sm: 12,
  md: 18,
  lg: 26,
  xl: 32,
  pill: 999,
};

export const shadows = {
  neonGlow: {
    shadowColor: colors.neon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
  },
};
