import React, {
  useState,
  forwardRef,
  InputHTMLAttributes,
  useRef,
  useEffect,
} from "react";
import clsx from "clsx";
import { useTheme } from "../../theme/ThemeProvider";
import type { MessageColor, BorderColor, BackgroundColor } from "../../theme/types";
import { getBorderColor, getBackgroundColor } from "../../theme/utils";

/**
 * Props for the TextInput component.
 *
 * @interface TextInputProps
 * @extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size">
 */
export interface TextInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "size" | "className" | "style"
  > {
  /** Optional label text displayed above the input */
  label?: string;
  /** Error message to display below the input */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Size of the input field */
  inputSize?: "sm" | "md" | "lg";
  /** Icon to display at the start (left) of the input */
  startIcon?: React.ReactNode;
  /** Icon to display at the end (right) of the input */
  endIcon?: React.ReactNode;
  /** Callback fired when the input value changes */
  onChange?: (v: string) => void;
  /** Color for the message text (error/helper) from theme palette */
  messageColor?: MessageColor;
  /** Enable password mode (sets type="password") */
  password?: boolean;
  /** Background color for the input */
  backgroundColor?: BackgroundColor;
  /** Border color from theme palette */
  borderColor?: BorderColor;
  /** When true, border is transparent by default and only shows on hover/focus */
  showBorderOnHover?: boolean;
}

const sizeClasses: Record<
  NonNullable<TextInputProps["inputSize"]>,
  { input: string; icon: string }
> = {
  sm: { input: "px-2 text-sm", icon: "w-4 h-4" },
  md: { input: "px-3 text-base", icon: "w-5 h-5" },
  lg: { input: "px-4 text-lg", icon: "w-6 h-6" },
};

/**
 * A text input component with label, error handling, icons, and validation states.
 *
 * Supports start/end icons, error states, helper text, and multiple sizes.
 * Uses theme colors for styling, so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <TextInput
 *   label="Email"
 *   value={email}
 *   onChange={setEmail}
 *   error={errors.email}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <TextInput
 *   label="Search"
 *   startIcon={<SearchIcon />}
 *   placeholder="Search..."
 *   onChange={handleSearch}
 * />
 * ```
 *
 * @param props - TextInput props
 * @param ref - Forwarded ref to the underlying input element
 * @returns A styled text input with label and message support
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
      messageColor,
      password,
      backgroundColor,
      borderColor,
      showBorderOnHover,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const internalRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const showMessage = error || helperText;

    // Use a callback ref to handle both function refs and ref objects
    const inputRef = (node: HTMLInputElement | null) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
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

    return (
      <>
        <style>{`
          input[data-text-input]::placeholder,
          input[data-text-input]::-webkit-input-placeholder,
          input[data-text-input]::-moz-placeholder {
            color: ${theme.palette.text.disabled} !important;
            opacity: 1;
          }
          input[data-text-input]:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            -webkit-text-fill-color: ${theme.palette.text.primary} !important;
            transition: background-color 5000s ease-in-out 0s;
          }
          input[data-text-input]:autofill {
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

              <div className="relative flex items-center">
                {startIcon && (
                  <span
                    className={clsx(
                      "absolute left-3 flex items-center justify-center z-10",
                      sizeClasses[inputSize].icon,
                      label
                        ? inputSize === "sm"
                          ? "top-[1.25rem]"
                          : inputSize === "md"
                          ? "top-[1.4rem]"
                          : "top-[1.625rem]"
                        : "top-1/2 -translate-y-1/2"
                    )}
                    style={{ color: theme.palette.text.primary }}
                  >
                    {startIcon}
                  </span>
                )}

                <input
                  ref={inputRef}
                  data-text-input
                  type={password ? "password" : props.type}
                  onChange={(e) => onChange?.(e.target.value)}
                  onFocus={(e) => {
                    props.onFocus?.(e);
                  }}
                  onBlur={(e) => {
                    props.onBlur?.(e);
                  }}
                  disabled={disabled}
                  className={clsx(
                    "w-full rounded-md",
                    backgroundColor ? "" : "bg-transparent",
                    "focus:outline-none transition-all",
                    disabled && "cursor-not-allowed opacity-70",
                    sizeClasses[inputSize].input,
                    startIcon && "pl-10",
                    endIcon && "pr-10",
                    label
                      ? inputSize === "sm"
                        ? "pt-4 pb-1.5"
                        : inputSize === "md"
                        ? "pt-5 pb-2.5"
                        : "pt-6 pb-3.5"
                      : inputSize === "sm"
                      ? "py-1"
                      : inputSize === "md"
                      ? "py-2"
                      : "py-3"
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

                {endIcon && (
                  <span
                    className={clsx(
                      "absolute right-3 flex items-center justify-center z-10",
                      sizeClasses[inputSize].icon,
                      label
                        ? inputSize === "sm"
                          ? "top-[1.25rem]"
                          : inputSize === "md"
                          ? "top-[1.4rem]"
                          : "top-[1.625rem]"
                        : "top-1/2 -translate-y-1/2"
                    )}
                    style={{ color: theme.palette.text.primary }}
                  >
                    {endIcon}
                  </span>
                )}
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

TextInput.displayName = "TextInput";
