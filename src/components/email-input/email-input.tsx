import React, { useState } from "react";
import TextInput, { TextInputProps } from "../text-input/text-input";

export interface EmailInputProps
  extends Omit<TextInputProps, "type" | "onChange"> {
  value: string;
  onChange: (v: string) => void;
  validate?: boolean;
}

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
