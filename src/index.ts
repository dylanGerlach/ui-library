/**
 * @packageDocumentation
 * 
 * # UI Library
 * 
 * A React component library built with Tailwind CSS and MUI-style theming.
 * 
 * ## Getting Started
 * 
 * **IMPORTANT**: This library requires MUI-style theming. You must wrap your app
 * with `ThemeProvider` and define a palette using `createTheme()`.
 * 
 * ```tsx
 * import { ThemeProvider, createTheme } from "dylangerlach-ui-library";
 * 
 * const theme = createTheme({
 *   palette: {
 *     primary: {
 *       main: "#1976d2",
 *       contrastText: "#fff",
 *     },
 *   },
 * });
 * 
 * function App() {
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 * 
 * ## Components
 * 
 * ### Form Inputs
 * - {@link TextInput} - Single-line text input with label, error handling, and icons
 * - {@link TextBoxInput} - Multi-line text input (textarea) with validation
 * - {@link EmailInput} - Email input with built-in validation
 * - {@link PasswordInput} - Password input with visibility toggle and strength indicator
 * - {@link DateInput} - Date picker with single date or range selection
 * - {@link CheckboxInput} - Checkbox with label and validation
 * - {@link DropdownInput} - Single-select dropdown
 * - {@link PaginatedDropdownInput} - Async dropdown with pagination support
 * - {@link JsonInput} - JSON textarea with syntax validation
 * - {@link ColorSelector} - Color picker with popover interface
 * 
 * ### Buttons & Actions
 * - {@link Button} - Versatile button with variants, sizes, and loading states
 * - {@link IconButton} - Button designed for displaying icons
 * - {@link ToggleIcon} - Toggleable icon button
 * 
 * ### Menus & Navigation
 * - {@link DropdownMenu} - Dropdown menu with nested submenu support
 * 
 * ### Loading Indicators
 * - {@link Spinner} - Simple spinning loader icon
 * - {@link ThreeDotLoader} - Three-dot loading animation
 * 
 * ## Theming
 * 
 * This library uses MUI-style theming. All components use theme colors via CSS variables.
 * 
 * ### Required Setup
 * 
 * 1. Import the CSS file: `import "dylangerlach-ui-library/dist/index.css"`
 * 2. Create a theme using `createTheme()` with your palette
 * 3. Wrap your app with `ThemeProvider`
 * 
 * ### Theme Structure
 * 
 * The theme follows Material-UI's palette structure:
 * - `primary`, `secondary`, `accent` - Brand colors
 * - `success`, `warning`, `error`, `info` - Semantic colors
 * - `background.default`, `background.paper` - Background colors
 * - `text.primary`, `text.secondary`, `text.disabled` - Text colors
 * - `divider`, `border` - Border colors
 * 
 * See {@link Palette} and {@link PaletteOptions} for full structure.
 * 
 * @module
 */

// Import CSS - users should import this CSS file in their app
import "./index.css";

// Form Input Components
export { Button } from "./components/button/button";
export { CheckboxInput } from "./components/checkbox-input/checkbox-input";
export { ColorSelector } from "./components/color-selector/color-selector";
export { DateInput } from "./components/date-input/date-input";
export { DropdownInput } from "./components/dropdown-input/dropdown-input";
export { DropdownMenu } from "./components/dropdown-menu/dropdown-menu";
export type {
  DropdownMenuItem,
  DropdownMenuProps,
} from "./components/dropdown-menu/dropdown-menu";
export { EmailInput } from "./components/email-input/email-input";
export { PaginatedDropdownInput } from "./components/paginated-dropdown-input/paginated-dropdown-input";
export { PasswordInput } from "./components/password-input/password-input";
export { Spinner } from "./components/spinner/spinner";
export { TextInput } from "./components/text-input/text-input";
export { TextBoxInput } from "./components/text-box-input/text-box-input";
export { ThreeDotLoader } from "./components/three-dot-loader/three-dot-loader";
export { IconButton } from "./components/icon-button/icon-button";
export { ToggleIcon } from "./components/toggle-icon/toggle-icon";
export { JsonInput } from "./components/json-input/json-input";

// Theme System (MUI-style)
export { ThemeProvider, useTheme, useThemeMode } from "./theme/ThemeProvider";
export { createTheme } from "./theme/createTheme";
export type {
  Theme,
  ThemeOptions,
  ThemeMode,
  Palette,
  PaletteOptions,
  PaletteColor,
  MessageColor,
} from "./theme/types";
