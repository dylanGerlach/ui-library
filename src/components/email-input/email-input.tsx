import { useState } from "react";
import { TextInput, TextInputProps } from "../text-input/text-input";

/**
 * Props for the EmailInput component.
 * 
 * @interface EmailInputProps
 * @extends Omit<TextInputProps, "type" | "onChange">
 */
export interface EmailInputProps
  extends Omit<TextInputProps, "type" | "onChange"> {
  /** Current email value */
  value: string;
  /** Callback fired when the email value changes */
  onChange: (v: string) => void;
  /** Whether to validate email format on blur */
  validate?: boolean;
}

/**
 * An email input component with built-in validation.
 * 
 * Extends TextInput with email-specific validation. Validates email format
 * on blur if validate is true. Uses theme colors for styling, so ensure
 * ThemeProvider is set up in your app.
 * 
 * @example
 * ```tsx
 * <EmailInput
 *   label="Email"
 *   value={email}
 *   onChange={setEmail}
 *   validate
 * />
 * ```
 * 
 * @param props - EmailInput props
 * @returns A styled email input with validation
 */
export function EmailInput({
  value,
  onChange,
  validate = true,
  error,
  ...props
}: EmailInputProps) {
  const [internalError, setInternalError] = useState<string | undefined>(error);

  const handleBlur = () => {
    if (validate) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setInternalError("Invalid email address");
        return;
      }
    }
    setInternalError(undefined);
  };

  return (
    <TextInput
      {...props}
      type="email"
      autoComplete="email"
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      error={internalError || error}
    />
  );
}
