import React, { useState, forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  inputSize?: "sm" | "md" | "lg";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onChange?: (v: string) => void;
  messageColor?: string;
  reserveMessageSpace?: boolean;
}

const sizeClasses: Record<
  NonNullable<TextInputProps["inputSize"]>,
  { input: string; icon: string }
> = {
  sm: { input: "px-2 py-1 text-sm", icon: "w-4 h-4" },
  md: { input: "px-3 py-2 text-base", icon: "w-5 h-5" },
  lg: { input: "px-4 py-3 text-lg", icon: "w-6 h-6" },
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      disabled,
      onChange,
      inputSize = "md",
      startIcon,
      endIcon,
      className,
      messageColor,
      reserveMessageSpace = true,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const showMessage = error || helperText;

    return (
      <div className="space-y-1 w-full" style={{ opacity: disabled ? 0.6 : 1 }}>
        {label && (
          <label className="text-sm font-medium text-foreground block">
            {label}
            {!required && <span className="text-muted"> (optional)</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {startIcon && (
            <span
              className={clsx(
                "absolute left-3 text-muted-foreground flex items-center justify-center",
                sizeClasses[inputSize].icon
              )}
            >
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={clsx(
              "w-full rounded-md border bg-card text-foreground placeholder-muted",
              "focus:outline-none transition-all",
              disabled && "cursor-not-allowed opacity-70",
              sizeClasses[inputSize].input,
              startIcon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            style={{
              borderColor: error
                ? "var(--color-destructive)"
                : "var(--color-border)",
              boxShadow: error
                ? "0 0 0 2px var(--color-destructive)"
                : isFocused
                ? "0 0 0 2px var(--color-primary)"
                : "none",
            }}
            {...props}
          />

          {endIcon && (
            <span
              className={clsx(
                "absolute right-3 text-muted-foreground flex items-center justify-center",
                sizeClasses[inputSize].icon
              )}
            >
              {endIcon}
            </span>
          )}
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
);

TextInput.displayName = "TextInput";
export default TextInput;
