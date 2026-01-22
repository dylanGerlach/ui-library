import { forwardRef } from "react";
import clsx from "clsx";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Props for the IconButton component.
 *
 * @interface IconButtonProps
 */
export interface IconButtonProps {
  /** The icon to display inside the button */
  children: React.ReactNode;
  /** Accessible label for the button (used for aria-label and title) */
  label?: string;
  /** Whether the button is in an active/pressed state */
  active?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Background variant - 'transparent' uses transparent background (default), 'card' uses card background */
  variant?: "card" | "transparent";
  /** Callback fired when the button is clicked */
  onClick?: () => void;
}

/**
 * A button component designed for displaying icons.
 *
 * Shows a border highlight when active. Uses theme colors for styling,
 * so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <IconButton
 *   label="Settings"
 *   active={isSettingsOpen}
 *   onClick={toggleSettings}
 * >
 *   <SettingsIcon />
 * </IconButton>
 * ```
 *
 * @param props - IconButton props
 * @param ref - Forwarded ref to the underlying button element
 * @returns A styled icon button
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      label,
      active = false,
      disabled = false,
      variant = "transparent",
      onClick,
    },
    ref
  ) => {
    const theme = useTheme();
    const backgroundColor =
      variant === "transparent" ? "transparent" : theme.palette.background.paper;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={active}
        aria-label={label}
        disabled={disabled}
        onClick={onClick}
        title={label}
        className={clsx(
          "flex items-center justify-center rounded-md p-2 transition-colors border",
          disabled && "opacity-50 cursor-not-allowed",
          active ? "border-2" : "border"
        )}
        style={{
          backgroundColor,
          color: theme.palette.text.primary,
          borderColor: active ? theme.palette.primary.main : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!disabled && variant === "transparent") {
            e.currentTarget.style.backgroundColor = `${theme.palette.text.secondary}1a`;
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && variant === "transparent") {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
