import React from "react";
import clsx from "clsx";

export interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  inputStyle?: React.CSSProperties;
  messageColor?: string;
  reserveMessageSpace?: boolean;
}

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
              : "text-muted-foreground"
          )}
        >
          {showMessage ? error || helperText : ""}
        </p>
      )}
    </div>
  );
}
