import React, { useState, forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

/**
 * Props for the TextBoxInput component.
 * 
 * @interface TextBoxInputProps
 * @extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "size">
 */
export interface TextBoxInputProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "size"
  > {
  /** Optional label text displayed above the textarea */
  label?: string;
  /** Error message to display below the textarea */
  error?: string;
  /** Helper text to display below the textarea */
  helperText?: string;
  /** Size of the textarea field */
  inputSize?: "sm" | "md" | "lg";
  /** Callback fired when the textarea value changes */
  onChange?: (v: string) => void;
  /** Custom color for the message text (error/helper) */
  messageColor?: string;
  /** Whether to reserve space for messages even when none are shown */
  reserveMessageSpace?: boolean;
}

const sizeClasses: Record<
  NonNullable<TextBoxInputProps["inputSize"]>,
  { input: string }
> = {
  sm: { input: "px-2 py-1 text-sm" },
  md: { input: "px-3 py-2 text-base" },
  lg: { input: "px-4 py-3 text-lg" },
};

/**
 * A multi-line text input component (textarea) with label, error handling, and validation states.
 * 
 * Supports error states, helper text, and multiple sizes. Similar to TextInput but for
 * multi-line text. Uses theme colors for styling, so ensure ThemeProvider is set up in your app.
 * 
 * @example
 * ```tsx
 * <TextBoxInput
 *   label="Description"
 *   value={description}
 *   onChange={setDescription}
 *   rows={5}
 *   error={errors.description}
 * />
 * ```
 * 
 * @param props - TextBoxInput props
 * @param ref - Forwarded ref to the underlying textarea element
 * @returns A styled textarea with label and message support
 */
export const TextBoxInput = forwardRef<HTMLTextAreaElement, TextBoxInputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      disabled,
      onChange,
      inputSize = "md",
      className,
      messageColor,
      reserveMessageSpace = true,
      rows = 3,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const showMessage = error || helperText;

    // Generate a stable id if not provided
    const id =
      providedId ?? `textbox-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="space-y-1 w-full" style={{ opacity: disabled ? 0.6 : 1 }}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground block"
          >
            {label}
            {!required && <span className="text-muted"> (optional)</span>}
          </label>
        )}

        <textarea
          id={id}
          ref={ref}
          rows={rows}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          disabled={disabled}
          className={clsx(
            "w-full rounded-md border bg-card text-foreground placeholder-muted resize-y",
            "focus:outline-none transition-all",
            disabled && "cursor-not-allowed opacity-70",
            sizeClasses[inputSize].input,
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
);

TextBoxInput.displayName = "TextBoxInput";
