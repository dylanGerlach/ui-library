# UI Library

A React component library built with Tailwind CSS and MUI-style theming. Includes form inputs, buttons, menus, and more with full TypeScript support.

## Installation

```bash
npm install dylangerlach-ui-library
```

## Quick Start

### 1. Import the CSS

```tsx
import "dylangerlach-ui-library/dist/index.css";
```

### 2. Set Up Theming (REQUIRED)

**This library requires MUI-style theming.** You must wrap your app with `ThemeProvider` and define a palette.

```tsx
import { ThemeProvider, createTheme } from "dylangerlach-ui-library";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
      contrastText: "#fff",
    },
    // ... other palette colors
  },
  mode: "light", // or "dark"
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Theme System

This library uses **MUI-style theming** (Material-UI pattern). All components use theme colors via CSS variables.

### Theme Structure

The theme follows Material-UI's palette structure:

```tsx
interface Palette {
  primary: PaletteColor;      // Brand primary color
  secondary: PaletteColor;     // Brand secondary color
  accent: PaletteColor;        // Accent color
  success: PaletteColor;       // Success/positive actions
  warning: PaletteColor;       // Warning/caution
  error: PaletteColor;         // Error/destructive actions
  info: PaletteColor;          // Informational
  background: {
    default: string;           // Page background
    paper: string;             // Card/paper background
  };
  text: {
    primary: string;           // Primary text
    secondary: string;         // Secondary text
    disabled: string;          // Disabled text
  };
  divider: string;             // Divider lines
  border: string;              // Borders
}
```

### Creating Custom Themes

```tsx
import { createTheme } from "dylangerlach-ui-library";

// Minimal theme (uses defaults for unspecified colors)
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "#fff",
    },
  },
});

// Full custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#bdbdbd",
    },
  },
  mode: "light",
});
```

### Light/Dark Mode

```tsx
import { ThemeProvider, useThemeMode } from "dylangerlach-ui-library";

function App() {
  const { mode, toggleMode } = useThemeMode();
  
  return (
    <ThemeProvider defaultMode="dark">
      <button onClick={toggleMode}>
        Switch to {mode === "light" ? "dark" : "light"} mode
      </button>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Components

### Form Inputs

#### TextInput

Single-line text input with label, error handling, and icons.

```tsx
import { TextInput } from "dylangerlach-ui-library";

<TextInput
  label="Email"
  value={email}
  onChange={setEmail}
  error={errors.email}
  helperText="Enter your email address"
  startIcon={<MailIcon />}
/>
```

#### TextBoxInput

Multi-line text input (textarea) with validation.

```tsx
import { TextBoxInput } from "dylangerlach-ui-library";

<TextBoxInput
  label="Description"
  value={description}
  onChange={setDescription}
  rows={5}
  error={errors.description}
/>
```

#### EmailInput

Email input with built-in validation.

```tsx
import { EmailInput } from "dylangerlach-ui-library";

<EmailInput
  label="Email"
  value={email}
  onChange={setEmail}
  validate
/>
```

#### PasswordInput

Password input with visibility toggle and optional strength indicator.

```tsx
import { PasswordInput } from "dylangerlach-ui-library";

<PasswordInput
  label="Password"
  value={password}
  onChange={setPassword}
  showStrength
/>
```

#### DateInput

Date picker with single date or range selection.

```tsx
import { DateInput } from "dylangerlach-ui-library";

// Single date
<DateInput
  label="Start Date"
  value={startDate}
  onChange={setStartDate}
  preventFuture
/>

// Date range
<DateInput
  mode="range"
  value={[startDate, endDate]}
  onChange={([start, end]) => {
    setStartDate(start);
    setEndDate(end);
  }}
/>
```

#### CheckboxInput

Checkbox with label and validation.

```tsx
import { CheckboxInput } from "dylangerlach-ui-library";

<CheckboxInput
  label="I agree to the terms"
  checked={agreed}
  onChange={setAgreed}
  required
  error={errors.agreement}
/>
```

#### DropdownInput

Single-select dropdown.

```tsx
import { DropdownInput } from "dylangerlach-ui-library";

<DropdownInput
  label="Country"
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={[
    { id: "us", name: "United States" },
    { id: "uk", name: "United Kingdom" },
  ]}
/>
```

#### PaginatedDropdownInput

Async dropdown with pagination support.

```tsx
import { PaginatedDropdownInput } from "dylangerlach-ui-library";

<PaginatedDropdownInput
  label="User"
  loadOptions={async (search, loadedOptions) => {
    const response = await fetch(
      `/api/users?q=${search}&page=${loadedOptions.length / 20}`
    );
    const data = await response.json();
    return { options: data.users, hasMore: data.hasMore };
  }}
  value={selectedUser}
  onChange={setSelectedUser}
/>
```

#### JsonInput

JSON textarea with syntax validation and formatting.

```tsx
import { JsonInput } from "dylangerlach-ui-library";

<JsonInput
  label="Configuration"
  value={config}
  onChange={setConfig}
/>
```

#### ColorSelector

Color picker with popover interface.

```tsx
import { ColorSelector } from "dylangerlach-ui-library";

<ColorSelector
  value={color}
  onChange={setColor}
  label="Background Color"
/>
```

### Buttons & Actions

#### Button

Versatile button with variants, sizes, and loading states.

```tsx
import { Button } from "dylangerlach-ui-library";

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

<Button
  variant="primary"
  icon={<Icon />}
  iconPosition="left"
  isLoading={isLoading}
>
  Submit
</Button>
```

#### IconButton

Button designed for displaying icons.

```tsx
import { IconButton } from "dylangerlach-ui-library";

<IconButton
  label="Settings"
  active={isSettingsOpen}
  onClick={toggleSettings}
>
  <SettingsIcon />
</IconButton>
```

#### ToggleIcon

Toggleable icon button.

```tsx
import { ToggleIcon } from "dylangerlach-ui-library";

<ToggleIcon
  icon={<HeartIcon />}
  active={isFavorited}
  onToggle={() => setIsFavorited(!isFavorited)}
  label="Favorite"
/>
```

### Menus & Navigation

#### DropdownMenu

Dropdown menu with nested submenu support.

```tsx
import { DropdownMenu } from "dylangerlach-ui-library";

const [open, setOpen] = useState(false);

<DropdownMenu
  trigger={<Button>Actions</Button>}
  items={[
    { id: "1", label: "Edit", onClick: () => console.log("Edit") },
    { id: "2", label: "Delete", variant: "danger", onClick: () => console.log("Delete") },
    {
      id: "3",
      label: "More",
      children: [
        { id: "3-1", label: "Option 1", onClick: () => {} },
        { id: "3-2", label: "Option 2", onClick: () => {} },
      ],
    },
  ]}
  open={open}
  onOpenChange={setOpen}
/>
```

### Loading Indicators

#### Spinner

Simple spinning loader icon.

```tsx
import { Spinner } from "dylangerlach-ui-library";

<Spinner className="h-6 w-6" />
```

#### ThreeDotLoader

Three-dot loading animation.

```tsx
import { ThreeDotLoader } from "dylangerlach-ui-library";

<ThreeDotLoader pace="fast" className="h-4 w-4" />
```

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type {
  Theme,
  ThemeOptions,
  ThemeMode,
  Palette,
  PaletteOptions,
  PaletteColor,
  DropdownMenuItem,
  DropdownMenuProps,
} from "dylangerlach-ui-library";
```

## API Reference

See the [package documentation](https://github.com/dylangerlach/ui-library) for detailed API reference.

## License

MIT

