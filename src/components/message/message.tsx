import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Props for the Message component.
 *
 * @interface MessageProps
 */
export interface MessageProps {
  /** The message content to display (can be text or React nodes) */
  children: React.ReactNode;
  /** The type of message. Defaults to "success". */
  type?: "success" | "error" | "info";
}

/**
 * A message component for displaying success, error, or info messages.
 *
 * Uses theme colors for styling. Ensure ThemeProvider is set up in your app.
 * Positioning should be handled by the parent component.
 *
 * @example
 * ```tsx
 * // Basic message (defaults to success)
 * <Message>Operation completed successfully!</Message>
 * ```
 *
 * @example
 * ```tsx
 * // Error message
 * <Message type="error">Something went wrong</Message>
 * ```
 *
 * @example
 * ```tsx
 * // Info message
 * <Message type="info">Processing your request...</Message>
 * ```
 *
 * @example
 * ```tsx
 * // Message with custom content
 * <Message type="success">
 *   <strong>Success!</strong> Your changes have been saved.
 * </Message>
 * ```
 *
 * @example
 * ```tsx
 * // Absolutely positioned message (parent handles positioning)
 * <div className="relative">
 *   <div className="absolute left-1/2 transform -translate-x-1/2 mt-1.5">
 *     <Message>Saved!</Message>
 *   </div>
 * </div>
 * ```
 *
 * @param props - Message component props
 * @returns A styled message element, or null if children is empty
 */
export function Message({ children, type = "success" }: MessageProps) {
  const theme = useTheme();

  if (!children) return null;

  const baseStyle =
    "px-4 py-2 rounded shadow-md text-sm font-medium z-50 border";

  const getColorStyle = () => {
    if (type === "success") {
      return {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        borderColor: theme.palette.success.main,
      };
    }
    if (type === "error") {
      return {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        borderColor: theme.palette.error.main,
      };
    }
    if (type === "info") {
      return {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
        borderColor: theme.palette.info.main,
      };
    }
    return {};
  };

  return (
    <div className={baseStyle} style={getColorStyle()}>
      {children}
    </div>
  );
}
