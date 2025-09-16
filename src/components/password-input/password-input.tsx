import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { TextInput, TextInputProps } from "../text-input/text-input";

export interface PasswordInputProps
  extends Omit<TextInputProps, "type" | "onChange"> {
  value: string;
  onChange: (val: string) => void;
  autoComplete?: string;
  showStrength?: boolean;
  resetKey?: string;
}

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
