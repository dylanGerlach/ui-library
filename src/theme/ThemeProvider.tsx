import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";
import type { Theme, ThemeMode } from "./types";
import { createTheme } from "./createTheme";
import type { ThemeOptions } from "./types";

const ThemeContext = createContext<Theme | null>(null);
const ThemeModeContext = createContext<{
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
} | null>(null);

// Helper function to apply theme mode class to document root
function applyThemeMode(mode: ThemeMode) {
  if (typeof document === "undefined") return; // SSR guard

  const root = document.documentElement;

  // Set or remove dark class for any CSS that relies on it
  if (mode === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
  }
}

/**
 * Props for the ThemeProvider component.
 *
 * @interface ThemeProviderProps
 */
export interface ThemeProviderProps {
  /** Theme object or theme options. If ThemeOptions, will be merged with defaults. */
  theme?: Theme | ThemeOptions;
  /** Initial theme mode (light or dark) */
  defaultMode?: ThemeMode;
  /** Child components that will have access to the theme */
  children: React.ReactNode;
}

/**
 * Theme provider component that supplies theme context to all child components.
 *
 * **REQUIRED**: Wrap your app with ThemeProvider to enable theming. This component:
 * - Manages light/dark mode switching (applies dark/light class to document root)
 * - Provides theme context via useTheme() and useThemeMode() hooks
 * - All components use useTheme() hook to access theme colors directly
 *
 * Uses MUI-style theming - pass a theme created with createTheme() or ThemeOptions
 * to customize the palette.
 *
 * @example
 * ```tsx
 * // Basic usage with default theme
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example
 * ```tsx
 * // With custom theme
 * const theme = createTheme({
 *   palette: {
 *     primary: { main: "#1976d2", contrastText: "#fff" },
 *   },
 * });
 *
 * <ThemeProvider theme={theme} defaultMode="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @param props - ThemeProvider props
 * @returns A theme context provider
 */
export function ThemeProvider({
  theme,
  defaultMode = "light",
  children,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const themeValue = useMemo(() => {
    if (!theme) {
      return createTheme({ mode });
    }
    // If theme is already a Theme object, use it directly but respect mode
    if (
      "palette" in theme &&
      typeof theme.palette === "object" &&
      "primary" in theme.palette
    ) {
      const existingTheme = theme as Theme;
      // If mode changed, recreate theme with new mode
      if (existingTheme.mode !== mode) {
        return createTheme({
          palette: {
            primary: existingTheme.palette.primary,
            secondary: existingTheme.palette.secondary,
            accent: existingTheme.palette.accent,
            success: existingTheme.palette.success,
            warning: existingTheme.palette.warning,
            error: existingTheme.palette.error,
            info: existingTheme.palette.info,
            background: existingTheme.palette.background,
            text: existingTheme.palette.text,
            divider: existingTheme.palette.divider,
            border: existingTheme.palette.border,
          },
          mode,
        });
      }
      return existingTheme;
    }
    // Otherwise, treat it as ThemeOptions and create a theme
    return createTheme({ ...(theme as ThemeOptions), mode });
  }, [theme, mode]);

  // Apply theme mode class immediately on mount (synchronously)
  if (typeof document !== "undefined") {
    applyThemeMode(mode);
  }

  // Also use useLayoutEffect to handle mode changes
  useLayoutEffect(() => {
    applyThemeMode(mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <ThemeModeContext.Provider value={{ mode, setMode, toggleMode }}>
        {children}
      </ThemeModeContext.Provider>
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current theme object.
 *
 * Returns the complete theme with palette and mode. If used outside
 * ThemeProvider, returns a default theme.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const theme = useTheme();
 *   const primaryColor = theme.palette.primary.main;
 *   return <div style={{ color: primaryColor }}>Hello</div>;
 * }
 * ```
 *
 * @returns The current theme object
 */
export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default theme if no provider
    return createTheme();
  }
  return context;
}

/**
 * Hook to access and control the theme mode (light/dark).
 *
 * Provides the current mode and functions to change it. Must be used
 * within a ThemeProvider.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { mode, toggleMode } = useThemeMode();
 *   return (
 *     <button onClick={toggleMode}>
 *       Switch to {mode === "light" ? "dark" : "light"} mode
 *     </button>
 *   );
 * }
 * ```
 *
 * @returns Object with mode, setMode, and toggleMode
 * @throws Error if used outside ThemeProvider
 */
export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
}
