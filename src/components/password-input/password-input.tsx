import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { TextInput, TextInputProps } from "../text-input/text-input";

/**
 * Props for the PasswordInput component.
 * 
 * @interface PasswordInputProps
 * @extends Omit<TextInputProps, "type" | "onChange">
 */
export interface PasswordInputProps
  extends Omit<TextInputProps, "type" | "onChange"> {
  /** Current password value */
  value: string;
  /** Callback fired when the password value changes */
  onChange: (val: string) => void;
  /** Autocomplete attribute value */
  autoComplete?: string;
  /** Whether to show password strength indicator */
  showStrength?: boolean;
  /** Key to reset the component state (useful for form resets) */
  resetKey?: string;
}

/**
 * A password input component with visibility toggle and optional strength indicator.
 * 
 * Extends TextInput with password-specific features: show/hide toggle and
 * optional password strength calculation. Uses theme colors for styling, so
 * ensure ThemeProvider is set up in your app.
 * 
 * @example
 * ```tsx
 * <PasswordInput
 *   label="Password"
 *   value={password}
 *   onChange={setPassword}
 *   showStrength
 * />
 * ```
 * 
 * @param props - PasswordInput props
 * @returns A styled password input with visibility toggle
 */
export function PasswordInput({
  value,
  onChange,
  autoComplete = "new-password",
  showStrength = false,
  resetKey,
  error,
  helperText,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const [strength, setStrength] = useState("Weak");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value)) {
      setStrength("Strong");
    } else if (value.length >= 6) {
      setStrength("Medium");
    } else {
      setStrength("Weak");
    }
  }, [value]);

  useEffect(() => {
    setTouched(false);
  }, [resetKey]);

  const getStrengthColor = () => {
    if (strength === "Strong") return "text-success";
    if (strength === "Medium") return "text-warning";
    return "text-destructive";
  };

  return (
    <TextInput
      {...props}
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      error={error}
      helperText={
        showStrength && touched && !error ? `Strength: ${strength}` : helperText
      }
      messageColor={
        showStrength && touched && !error ? getStrengthColor() : undefined
      }
      endIcon={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="focus:outline-none"
          tabIndex={-1}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      onFocus={() => setTouched(true)}
    />
  );
}
