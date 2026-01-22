import type { Theme, PaletteColorName, BorderColor, BackgroundColor } from "./types";

/**
 * Get the main color value from a palette color name
 */
export function getPaletteColor(color: PaletteColorName, theme: Theme): string {
  switch (color) {
    case "primary":
      return theme.palette.primary.main;
    case "secondary":
      return theme.palette.secondary.main;
    case "accent":
      return theme.palette.accent.main;
    case "error":
      return theme.palette.error.main;
    case "success":
      return theme.palette.success.main;
    case "warning":
      return theme.palette.warning.main;
    case "info":
      return theme.palette.info.main;
    default:
      return theme.palette.primary.main;
  }
}

/**
 * Get the contrast text color for a palette color name
 */
export function getContrastText(color: PaletteColorName, theme: Theme): string {
  switch (color) {
    case "primary":
      return theme.palette.primary.contrastText;
    case "secondary":
      return theme.palette.secondary.contrastText;
    case "accent":
      return theme.palette.accent.contrastText;
    case "error":
      return theme.palette.error.contrastText;
    case "success":
      return theme.palette.success.contrastText;
    case "warning":
      return theme.palette.warning.contrastText;
    case "info":
      return theme.palette.info.contrastText;
    default:
      return theme.palette.primary.contrastText;
  }
}

/**
 * Get border color from theme based on BorderColor type
 * Falls back to theme.palette.text.secondary if not provided
 */
export function getBorderColor(
  color: BorderColor | undefined,
  theme: Theme
): string {
  if (!color) return theme.palette.text.secondary;

  // Check if it's a palette color name
  if (
    color === "primary" ||
    color === "secondary" ||
    color === "accent" ||
    color === "error" ||
    color === "success" ||
    color === "warning" ||
    color === "info"
  ) {
    return getPaletteColor(color, theme);
  }

  // Handle special border color options
  switch (color) {
    case "text.secondary":
      return theme.palette.text.secondary;
    case "border":
      return theme.palette.border;
    default:
      return theme.palette.text.secondary;
  }
}

/**
 * Get background color from theme based on BackgroundColor type
 * Falls back to transparent if not provided
 */
export function getBackgroundColor(
  color: BackgroundColor | undefined,
  theme: Theme
): string {
  if (!color) return "transparent";

  // Check if it's a palette color name
  if (
    color === "primary" ||
    color === "secondary" ||
    color === "accent" ||
    color === "error" ||
    color === "success" ||
    color === "warning" ||
    color === "info"
  ) {
    return getPaletteColor(color, theme);
  }

  // Handle special background color options
  switch (color) {
    case "transparent":
      return "transparent";
    case "background.default":
      return theme.palette.background.default;
    case "background.paper":
      return theme.palette.background.paper;
    default:
      return "transparent";
  }
}
