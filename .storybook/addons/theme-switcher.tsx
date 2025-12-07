import React from "react";
import { ThemeProvider, useTheme } from "../../src/theme/ThemeProvider";
import { createTheme } from "../../src/theme/createTheme";
import type { ThemeOptions } from "../../src/theme/types";

// Define complete theme palettes
const themeOptions: Record<string, ThemeOptions> = {
  default: {
    mode: "light",
    palette: {
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
    },
  },
  ocean: {
    mode: "light",
    palette: {
      primary: {
        main: "rgb(14 165 233)",
        light: "rgb(56 189 248)",
        dark: "rgb(2 132 199)",
        contrastText: "rgb(255 255 255)",
      },
      secondary: {
        main: "rgb(20 184 166)",
        light: "rgb(94 234 212)",
        dark: "rgb(15 118 110)",
        contrastText: "rgb(255 255 255)",
      },
      accent: {
        main: "rgb(59 130 246)",
        light: "rgb(96 165 250)",
        dark: "rgb(37 99 235)",
        contrastText: "rgb(255 255 255)",
      },
      // Use standard colors for semantic colors - they work well in both modes
      background: {
        default: "rgb(240 253 250)",
        paper: "rgb(204 251 241)",
      },
      text: {
        primary: "rgb(15 23 42)",
        secondary: "rgb(51 65 85)",
        disabled: "rgb(148 163 184)",
      },
      divider: "rgb(203 213 225)",
      border: "rgb(203 213 225)",
    },
  },
  forest: {
    mode: "light",
    palette: {
      primary: {
        main: "rgb(22 163 74)",
        light: "rgb(74 222 128)",
        dark: "rgb(21 128 61)",
        contrastText: "rgb(255 255 255)",
      },
      secondary: {
        main: "rgb(34 197 94)",
        light: "rgb(134 239 172)",
        dark: "rgb(22 163 74)",
        contrastText: "rgb(255 255 255)",
      },
      accent: {
        main: "rgb(101 163 13)",
        light: "rgb(132 204 22)",
        dark: "rgb(77 124 15)",
        contrastText: "rgb(255 255 255)",
      },
      // Use standard colors for semantic colors - they work well in both modes
      background: {
        default: "rgb(247 254 231)",
        paper: "rgb(236 252 203)",
      },
      text: {
        primary: "rgb(20 83 45)",
        secondary: "rgb(34 197 94)",
        disabled: "rgb(134 239 172)",
      },
      divider: "rgb(187 247 208)",
      border: "rgb(187 247 208)",
    },
  },
  sunset: {
    mode: "light",
    palette: {
      primary: {
        main: "rgb(249 115 22)",
        light: "rgb(251 146 60)",
        dark: "rgb(234 88 12)",
        contrastText: "rgb(255 255 255)",
      },
      secondary: {
        main: "rgb(239 68 68)",
        light: "rgb(248 113 113)",
        dark: "rgb(220 38 38)",
        contrastText: "rgb(255 255 255)",
      },
      accent: {
        main: "rgb(251 146 60)",
        light: "rgb(253 186 116)",
        dark: "rgb(234 88 12)",
        contrastText: "rgb(255 255 255)",
      },
      // Use standard colors for semantic colors - they work well in both modes
      background: {
        default: "rgb(255 247 237)",
        paper: "rgb(254 243 199)",
      },
      text: {
        primary: "rgb(154 52 18)",
        secondary: "rgb(194 65 12)",
        disabled: "rgb(251 146 60)",
      },
      divider: "rgb(254 215 170)",
      border: "rgb(254 215 170)",
    },
  },
  royal: {
    mode: "light",
    palette: {
      primary: {
        main: "rgb(168 85 247)",
        light: "rgb(192 132 252)",
        dark: "rgb(147 51 234)",
        contrastText: "rgb(255 255 255)",
      },
      secondary: {
        main: "rgb(139 92 246)",
        light: "rgb(167 139 250)",
        dark: "rgb(124 58 237)",
        contrastText: "rgb(255 255 255)",
      },
      accent: {
        main: "rgb(236 72 153)",
        light: "rgb(244 114 182)",
        dark: "rgb(219 39 119)",
        contrastText: "rgb(255 255 255)",
      },
      // Use standard colors for semantic colors - they work well in both modes
      background: {
        default: "rgb(250 245 255)",
        paper: "rgb(243 232 255)",
      },
      text: {
        primary: "rgb(88 28 135)",
        secondary: "rgb(126 34 206)",
        disabled: "rgb(192 132 252)",
      },
      divider: "rgb(221 214 254)",
      border: "rgb(221 214 254)",
    },
  },
  minimal: {
    mode: "light",
    palette: {
      primary: {
        main: "rgb(55 65 81)",
        light: "rgb(107 114 128)",
        dark: "rgb(31 41 55)",
        contrastText: "rgb(255 255 255)",
      },
      secondary: {
        main: "rgb(107 114 128)",
        light: "rgb(156 163 175)",
        dark: "rgb(75 85 99)",
        contrastText: "rgb(255 255 255)",
      },
      accent: {
        main: "rgb(156 163 175)",
        light: "rgb(209 213 219)",
        dark: "rgb(107 114 128)",
        contrastText: "rgb(255 255 255)",
      },
      // Use standard colors for semantic colors - they work well in both modes
      background: {
        default: "rgb(249 250 251)",
        paper: "rgb(255 255 255)",
      },
      text: {
        primary: "rgb(17 24 39)",
        secondary: "rgb(75 85 99)",
        disabled: "rgb(156 163 175)",
      },
      divider: "rgb(229 231 235)",
      border: "rgb(229 231 235)",
    },
  },
};

export type ThemeName = keyof typeof themeOptions;

// Wrapper component that uses ThemeProvider's theme
const StoryWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  React.useEffect(() => {
    // Apply background to body to eliminate white border from Storybook padding
    const body = document.body;
    const originalBg = body.style.backgroundColor;
    body.style.backgroundColor = theme.palette.background.default;
    return () => {
      body.style.backgroundColor = originalBg;
    };
  }, [theme.palette.background.default]);

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export const withTheme = (Story: any, context: any) => {
  const selectedTheme = (context.globals?.theme as ThemeName) || "default";
  const colorMode = context.globals?.colorMode || "light";
  const isDark = colorMode === "dark";
  const baseThemeOptions = themeOptions[selectedTheme];

  // In dark mode, only pass accent colors - createTheme will use dark defaults for background/text/semantic colors
  // In light mode, use all theme options
  const themeOptionsToUse: ThemeOptions = isDark
    ? {
        mode: "dark",
        palette: baseThemeOptions.palette
          ? {
              primary: baseThemeOptions.palette.primary,
              secondary: baseThemeOptions.palette.secondary,
              accent: baseThemeOptions.palette.accent,
              // Don't pass success, warning, error, info, background, text, divider, border
              // createTheme will use dark defaults for these
            }
          : undefined,
      }
    : {
        ...baseThemeOptions,
        mode: "light",
      };

  // Create the theme upfront to ensure it's valid
  const theme = createTheme(themeOptionsToUse);

  return (
    <ThemeProvider theme={theme} defaultMode={isDark ? "dark" : "light"}>
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    </ThemeProvider>
  );
};
