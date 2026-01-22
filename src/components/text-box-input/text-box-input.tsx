import React, {
  useState,
  forwardRef,
  TextareaHTMLAttributes,
  useRef,
  useEffect,
} from "react";
import clsx from "clsx";
import type { MessageColor, BorderColor, BackgroundColor } from "../../theme/types";
import { useTheme } from "../../theme/ThemeProvider";
import { getBorderColor, getBackgroundColor } from "../../theme/utils";

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
  /** Background color for the textarea */
  backgroundColor?: BackgroundColor;
  /** Border color from theme palette */
  borderColor?: BorderColor;
  /** When true, border is transparent by default and only shows on hover/focus */
  showBorderOnHover?: boolean;
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
      rows = 3,
      id: providedId,
      backgroundColor,
      borderColor,
      showBorderOnHover,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const showMessage = error || helperText;

    // Use a callback ref to handle both function refs and ref objects
    const textareaRef = (node: HTMLTextAreaElement | null) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          node;
      }
      internalRef.current = node;
    };

    // Check focus state using the actual DOM element - more reliable than just blur events
    useEffect(() => {
      const checkFocus = () => {
        const element = internalRef.current;
        setIsFocused(document.activeElement === element);
      };

      // Check on mount and when focus/blur events occur
      checkFocus();
      document.addEventListener("focusin", checkFocus);
      document.addEventListener("focusout", checkFocus);

      return () => {
        document.removeEventListener("focusin", checkFocus);
        document.removeEventListener("focusout", checkFocus);
      };
    }, []);

    // Generate a stable id if not provided
    const id =
      providedId ?? `textbox-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <>
        <style>{`
          textarea[data-text-box-input]::placeholder,
          textarea[data-text-box-input]::-webkit-input-placeholder,
          textarea[data-text-box-input]::-moz-placeholder {
            color: ${theme.palette.text.disabled} !important;
            opacity: 1;
          }
          textarea[data-text-box-input]:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            -webkit-text-fill-color: ${theme.palette.text.primary} !important;
            transition: background-color 5000s ease-in-out 0s;
          }
          textarea[data-text-box-input]:autofill {
            box-shadow: 0 0 0 1000px transparent inset !important;
            -webkit-text-fill-color: ${theme.palette.text.primary} !important;
          }
        `}</style>
        <div
          className="space-y-1 w-full"
          style={{ opacity: disabled ? 0.6 : 1 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <div className="relative w-full">
              {/* Fieldset creates border, legend creates notch for label */}
              <fieldset
                className="absolute inset-0 pointer-events-none rounded-md border m-0 p-0 overflow-hidden transition-colors"
                style={{
                  borderColor: (() => {
                    if (error) return theme.palette.error.main;
                    if (isFocused) return theme.palette.primary.main;
                    if (showBorderOnHover) {
                      if (isHovered) {
                        return getBorderColor(borderColor, theme);
                      }
                      return "transparent";
                    }
                    return getBorderColor(borderColor, theme);
                  })(),
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
                          : theme.palette.text.secondary,
                      }}
                    >
                      {label}
                    </span>
                  </legend>
                )}
              </fieldset>

              <div
                className={clsx(
                  "relative w-full",
                  label
                    ? inputSize === "sm"
                      ? "pt-3"
                      : inputSize === "md"
                      ? "pt-4"
                      : "pt-5"
                    : ""
                )}
              >
                <textarea
                  id={id}
                  ref={textareaRef}
                  data-text-box-input
                  rows={rows}
                  onChange={(e) => onChange?.(e.target.value)}
                  onFocus={(e) => {
                    props.onFocus?.(e);
                  }}
                  onBlur={(e) => {
                    props.onBlur?.(e);
                  }}
                  disabled={disabled}
                  className={clsx(
                    "w-full resize-y focus:outline-none transition-all",
                    backgroundColor ? "" : "bg-transparent",
                    disabled && "cursor-not-allowed opacity-70",
                    sizeClasses[inputSize].input,
                    label
                      ? inputSize === "sm"
                        ? "pt-1 pb-1.5"
                        : inputSize === "md"
                        ? "pt-1 pb-2"
                        : "pt-1 pb-3"
                      : inputSize === "sm"
                      ? "py-1.5"
                      : inputSize === "md"
                      ? "py-3"
                      : "py-4"
                  )}
                  style={{
                    border: "none",
                    outline: "none",
                    margin: 0,
                    color: theme.palette.text.primary,
                    backgroundColor: backgroundColor
                      ? getBackgroundColor(backgroundColor, theme)
                      : undefined,
                  }}
                  {...props}
                />
              </div>
            </div>
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
      </>
    );
  }
);

TextBoxInput.displayName = "TextBoxInput";
