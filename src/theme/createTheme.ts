import type { Theme, ThemeOptions, Palette, PaletteOptions, PaletteColor, ThemeMode } from "./types";

// Default light palette colors
const defaultLightPalette: Palette = {
  primary: {
    main: "rgb(37 99 235)",
    light: "rgb(96 165 250)",
    dark: "rgb(29 78 216)",
    contrastText: "rgb(255 255 255)",
  },
  secondary: {
    main: "rgb(107 114 128)",
    light: "rgb(156 163 175)",
    dark: "rgb(75 85 99)",
    contrastText: "rgb(255 255 255)",
  },
  accent: {
    main: "rgb(249 115 22)",
    light: "rgb(251 146 60)",
    dark: "rgb(234 88 12)",
    contrastText: "rgb(255 255 255)",
  },
  success: {
    main: "rgb(22 163 74)",
    light: "rgb(74 222 128)",
    dark: "rgb(21 128 61)",
    contrastText: "rgb(255 255 255)",
  },
  warning: {
    main: "rgb(250 204 21)",
    light: "rgb(253 224 71)",
    dark: "rgb(202 138 4)",
    contrastText: "rgb(0 0 0)",
  },
  error: {
    main: "rgb(220 38 38)",
    light: "rgb(248 113 113)",
    dark: "rgb(153 27 27)",
    contrastText: "rgb(255 255 255)",
  },
  info: {
    main: "rgb(14 165 233)",
    light: "rgb(56 189 248)",
    dark: "rgb(3 105 161)",
    contrastText: "rgb(255 255 255)",
  },
  background: {
    default: "rgb(255 255 255)",
    paper: "rgb(243 244 246)",
  },
  text: {
    primary: "rgb(17 24 39)",
    secondary: "rgb(107 114 128)",
    disabled: "rgb(156 163 175)",
  },
  divider: "rgb(229 231 235)",
  border: "rgb(229 231 235)",
};

// Default dark palette colors
const defaultDarkPalette: Palette = {
  primary: {
    main: "rgb(96 165 250)",
    light: "rgb(147 197 253)",
    dark: "rgb(29 78 216)",
    contrastText: "rgb(255 255 255)",
  },
  secondary: {
    main: "rgb(156 163 175)",
    light: "rgb(209 213 219)",
    dark: "rgb(75 85 99)",
    contrastText: "rgb(255 255 255)",
  },
  accent: {
    main: "rgb(251 146 60)",
    light: "rgb(253 186 116)",
    dark: "rgb(234 88 12)",
    contrastText: "rgb(255 255 255)",
  },
  success: {
    main: "rgb(74 222 128)",
    light: "rgb(134 239 172)",
    dark: "rgb(21 128 61)",
    contrastText: "rgb(0 0 0)",
  },
  warning: {
    main: "rgb(251 191 36)",
    light: "rgb(253 224 71)",
    dark: "rgb(202 138 4)",
    contrastText: "rgb(0 0 0)",
  },
  error: {
    main: "rgb(248 113 113)",
    light: "rgb(252 165 165)",
    dark: "rgb(153 27 27)",
    contrastText: "rgb(255 255 255)",
  },
  info: {
    main: "rgb(56 189 248)",
    light: "rgb(125 211 252)",
    dark: "rgb(3 105 161)",
    contrastText: "rgb(0 0 0)",
  },
  background: {
    default: "rgb(17 24 39)",
    paper: "rgb(31 41 55)",
  },
  text: {
    primary: "rgb(255 255 255)",
    secondary: "rgb(156 163 175)",
    disabled: "rgb(107 114 128)",
  },
  divider: "rgb(55 65 81)",
  border: "rgb(55 65 81)",
};

function mergePaletteColor(
  defaultColor: PaletteColor,
  override?: Partial<PaletteColor>
): PaletteColor {
  if (!override) return defaultColor;
  return {
    main: override.main ?? defaultColor.main,
    light: override.light ?? defaultColor.light,
    dark: override.dark ?? defaultColor.dark,
    contrastText: override.contrastText ?? defaultColor.contrastText,
  };
}

function mergePalette(defaultPalette: Palette, options?: PaletteOptions): Palette {
  if (!options) return defaultPalette;

  return {
    primary: mergePaletteColor(defaultPalette.primary, options.primary),
    secondary: mergePaletteColor(defaultPalette.secondary, options.secondary),
    accent: mergePaletteColor(defaultPalette.accent, options.accent),
    success: mergePaletteColor(defaultPalette.success, options.success),
    warning: mergePaletteColor(defaultPalette.warning, options.warning),
    error: mergePaletteColor(defaultPalette.error, options.error),
    info: mergePaletteColor(defaultPalette.info, options.info),
    background: {
      default: options.background?.default ?? defaultPalette.background.default,
      paper: options.background?.paper ?? defaultPalette.background.paper,
    },
    text: {
      primary: options.text?.primary ?? defaultPalette.text.primary,
      secondary: options.text?.secondary ?? defaultPalette.text.secondary,
      disabled: options.text?.disabled ?? defaultPalette.text.disabled,
    },
    divider: options.divider ?? defaultPalette.divider,
    border: options.border ?? defaultPalette.border,
  };
}

/**
 * Creates a theme object with the specified options (MUI-style API).
 * 
 * Merges user-provided palette options with default light/dark palettes.
 * Follows Material-UI's createTheme pattern for familiarity.
 * 
 * @example
 * ```tsx
 * // Use default theme
 * const theme = createTheme();
 * ```
 * 
 * @example
 * ```tsx
 * // Custom theme with palette overrides
 * const theme = createTheme({
 *   palette: {
 *     primary: {
 *       main: "#1976d2",
 *       contrastText: "#fff",
 *     },
 *   },
 *   mode: "dark",
 * });
 * ```
 * 
 * @param options - Optional theme configuration
 * @returns A complete theme object with palette and mode
 */
export function createTheme(options?: ThemeOptions): Theme {
  const mode: ThemeMode = options?.mode ?? "light";
  const basePalette = mode === "dark" ? defaultDarkPalette : defaultLightPalette;
  
  return {
    palette: mergePalette(basePalette, options?.palette),
    mode,
  };
}

