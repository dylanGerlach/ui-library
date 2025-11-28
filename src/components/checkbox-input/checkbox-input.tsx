import React from "react";
import clsx from "clsx";

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
  /** Custom inline styles for the input container */
  inputStyle?: React.CSSProperties;
  /** Custom color for the message text */
  messageColor?: string;
  /** Whether to reserve space for messages even when none are shown */
  reserveMessageSpace?: boolean;
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
  inputStyle = {},
  messageColor,
  reserveMessageSpace = true,
}: CheckboxInputProps) {
  const showMessage = error || helperText;

  return (
    <div className="space-y-1 w-full" style={{ opacity: disabled ? 0.6 : 1 }}>
      <div className="flex items-center gap-2" style={inputStyle}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          required={required}
          className="w-4 h-4 accent-[var(--color-primary)] cursor-pointer disabled:cursor-not-allowed"
        />
        <label className="text-sm text-foreground">{label}</label>
      </div>

      {(showMessage || reserveMessageSpace) && (
        <p
          className={clsx(
            "text-sm mt-1 min-h-[1.25rem]",
            error
              ? "text-destructive"
              : messageColor
              ? messageColor
              : "text-foreground"
          )}
        >
          {showMessage ? error || helperText : ""}
        </p>
      )}
    </div>
  );
}
