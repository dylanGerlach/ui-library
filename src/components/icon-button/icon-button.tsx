import { forwardRef } from "react";
import clsx from "clsx";

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
      onClick,
    },
    ref
  ) => {
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
          "bg-card text-foreground hover:bg-muted/10",
          disabled && "opacity-50 cursor-not-allowed",
          active ? "border-2" : "border"
        )}
        style={{ borderColor: active ? "var(--color-primary)" : "transparent" }}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
