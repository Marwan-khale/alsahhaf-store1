/**
 * Theme configuration.
 * Mirrors the centralized Design Tokens (see tailwind.config.ts).
 * No component-level styling decisions belong here.
 */
export const themeConfig = {
  colors: {
    ink: "#1B2A4A",
    inkLight: "#3D5A8A",
    amber: "#E8A33D",
    paper: "#FAF9F6",
    night: "#0F1826",
    muted: "#5C6B84",
    success: "#3F8557",
    warning: "#C9662B",
    danger: "#B23A3A",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
  },
} as const;
