import React from "react";
import clsx from "clsx";
import { useTheme } from "../../theme/ThemeProvider";
import type { MessageColor } from "../../theme/types";

/**
 * Props for the CheckboxInput component.
 *
 * @interface CheckboxInputProps
 */
export interface CheckboxInputProps {
  /** Label text displayed next to the checkbox */
  label: string;
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Callback fired when the checkbox state changes */
  onChange: (val: boolean) => void;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Error message to display below the checkbox */
  error?: string;
  /** Helper text to display below the checkbox */
  helperText?: string;
  /** Color for the message text from theme palette */
  messageColor?: MessageColor;
}

/**
 * A checkbox input component with label, error handling, and validation states.
 *
 * Supports required state, error messages, and helper text. Uses theme colors
 * for styling, so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <CheckboxInput
 *   label="I agree to the terms"
 *   checked={agreed}
 *   onChange={setAgreed}
 *   required
 *   error={errors.agreement}
 * />
 * ```
 *
 * @param props - CheckboxInput props
 * @returns A styled checkbox input with label and message support
 */
export function CheckboxInput({
  label,
  checked,
  onChange,
  required,
  disabled = false,
  error,
  helperText,
  messageColor,
}: CheckboxInputProps) {
  const theme = useTheme();
  const showMessage = error || helperText;

  return (
    <div className="space-y-1 w-full" style={{ opacity: disabled ? 0.6 : 1 }}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          required={required}
          className="w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
          style={{ accentColor: theme.palette.primary.main }}
        />
        <label className="text-sm" style={{ color: theme.palette.text.primary }}>
          {label}
        </label>
      </div>

      {showMessage && (
        <p
          className="text-sm mt-1"
          style={{
            color: error
              ? theme.palette.error.main
              : messageColor === "primary"
              ? theme.palette.primary.main
              : messageColor === "secondary"
              ? theme.palette.secondary.main
              : messageColor === "accent"
              ? theme.palette.accent.main
              : messageColor === "destructive"
              ? theme.palette.error.main
              : messageColor === "success"
              ? theme.palette.success.main
              : messageColor === "warning"
              ? theme.palette.warning.main
              : messageColor === "info"
              ? theme.palette.info.main
              : messageColor === "muted"
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
          }}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
