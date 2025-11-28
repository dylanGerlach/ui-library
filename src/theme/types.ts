/**
 * Color configuration for a theme color (MUI-style).
 * 
 * @interface PaletteColor
 */
export interface PaletteColor {
  /** Main color value */
  main: string;
  /** Lighter variant of the main color */
  light?: string;
  /** Darker variant of the main color */
  dark?: string;
  /** Text color that contrasts with the main color */
  contrastText: string;
}

/**
 * Complete color palette for a theme (MUI-style).
 * 
 * Follows Material-UI's palette structure for consistency.
 * 
 * @interface Palette
 */
export interface Palette {
  /** Primary brand color */
  primary: PaletteColor;
  /** Secondary brand color */
  secondary: PaletteColor;
  /** Accent color */
  accent: PaletteColor;
  /** Success/positive action color */
  success: PaletteColor;
  /** Warning/caution color */
  warning: PaletteColor;
  /** Error/destructive action color */
  error: PaletteColor;
  /** Informational color */
  info: PaletteColor;
  /** Background colors */
  background: {
    /** Default page background */
    default: string;
    /** Card/paper background */
    paper: string;
  };
  /** Text colors */
  text: {
    /** Primary text color */
    primary: string;
    /** Secondary text color */
    secondary: string;
    /** Disabled text color */
    disabled: string;
  };
  /** Divider line color */
  divider: string;
  /** Border color */
  border: string;
}

/**
 * Partial palette configuration for customizing themes.
 * 
 * All properties are optional - only override what you need.
 * 
 * @interface PaletteOptions
 */
export interface PaletteOptions {
  /** Override primary color */
  primary?: Partial<PaletteColor>;
  /** Override secondary color */
  secondary?: Partial<PaletteColor>;
  /** Override accent color */
  accent?: Partial<PaletteColor>;
  /** Override success color */
  success?: Partial<PaletteColor>;
  /** Override warning color */
  warning?: Partial<PaletteColor>;
  /** Override error color */
  error?: Partial<PaletteColor>;
  /** Override info color */
  info?: Partial<PaletteColor>;
  /** Override background colors */
  background?: {
    default?: string;
    paper?: string;
  };
  /** Override text colors */
  text?: {
    primary?: string;
    secondary?: string;
    disabled?: string;
  };
  /** Override divider color */
  divider?: string;
  /** Override border color */
  border?: string;
}

/**
 * Theme mode - light or dark.
 * 
 * @typedef ThemeMode
 */
export type ThemeMode = "light" | "dark";

/**
 * Complete theme object with palette and mode.
 * 
 * @interface Theme
 */
export interface Theme {
  /** Color palette */
  palette: Palette;
  /** Current theme mode */
  mode: ThemeMode;
}

/**
 * Options for creating a custom theme.
 * 
 * @interface ThemeOptions
 */
export interface ThemeOptions {
  /** Partial palette overrides */
  palette?: PaletteOptions;
  /** Initial theme mode */
  mode?: ThemeMode;
}

/**
 * Type-safe color options for message text (error, helper text, etc.)
 * 
 * Uses semantic colors from the theme palette.
 */
export type MessageColor =
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "foreground"
  | "muted";
