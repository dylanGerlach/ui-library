import React, { useState, forwardRef, TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import type { MessageColor } from "../../theme/types";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Props for the TextBoxInput component.
 * 
 * @interface TextBoxInputProps
 * @extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "size">
 */
export interface TextBoxInputProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "size" | "className" | "style"
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
  /** Color for the message text from theme palette */
  messageColor?: MessageColor;
  /** Whether to reserve space for messages even when none are shown */
  reserveMessageSpace?: boolean;
}

const sizeClasses: Record<
  NonNullable<TextBoxInputProps["inputSize"]>,
  { input: string }
> = {
  sm: { input: "px-2 py-1.5 text-sm" },
  md: { input: "px-3 py-3 text-base" },
  lg: { input: "px-4 py-4 text-lg" },
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
      messageColor,
      reserveMessageSpace = true,
      rows = 3,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const showMessage = error || helperText;

    // Generate a stable id if not provided
    const id =
      providedId ?? `textbox-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="space-y-1 w-full" style={{ opacity: disabled ? 0.6 : 1 }}>
        <div className="relative">
          <div className="relative w-full">
            {/* Fieldset creates border, legend creates notch for label */}
            <fieldset
              className="absolute inset-0 pointer-events-none rounded-md border m-0 p-0 overflow-hidden transition-colors"
              style={{
                borderColor: error
                  ? theme.palette.error.main
                  : isFocused
                  ? theme.palette.primary.main
                  : theme.palette.border,
                borderWidth: error || isFocused ? "2px" : "1px",
              }}
            >
              {label && (
                <legend className="ml-2 px-1 pb-1">
                  <span
                    className={clsx(
                      "whitespace-pre",
                      inputSize === "sm"
                        ? "text-xs"
                        : inputSize === "md"
                        ? "text-sm"
                        : "text-base"
                    )}
                    style={{
                      color: error
                        ? theme.palette.error.main
                        : isFocused
                        ? theme.palette.primary.main
                        : theme.palette.border,
                    }}
                  >
                    {label}
                  </span>
                </legend>
              )}
            </fieldset>

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
                "w-full rounded-md bg-transparent text-foreground placeholder-muted resize-y focus:outline-none transition-all",
                disabled && "cursor-not-allowed opacity-70",
                sizeClasses[inputSize].input,
                inputSize === "sm"
                  ? "pt-4 pb-1.5"
                  : inputSize === "md"
                  ? "pt-5 pb-2"
                  : "pt-6 pb-3"
              )}
              style={{
                border: "none",
                outline: "none",
                boxShadow: "none",
                margin: 0,
              }}
              {...props}
            />
          </div>
        </div>

        {showMessage && (
          <p
            className={clsx(
              "text-sm mt-1",
              error
                ? "text-destructive"
                : messageColor
                ? `text-${messageColor}`
                : "text-foreground"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextBoxInput.displayName = "TextBoxInput";
