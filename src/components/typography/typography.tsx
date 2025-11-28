import React from "react";
import clsx from "clsx";

/**
 * Typography variants for different text styles.
 */
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "caption";

/**
 * Theme color options for typography.
 */
export type TypographyColor =
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "foreground"
  | "muted";

/**
 * HTML element types that can be rendered.
 */
export type ElementType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "a";

/**
 * Props for the Typography component.
 *
 * @interface TypographyProps
 */
export interface TypographyProps {
  /** Typography variant (determines default element and styling) */
  variant?: TypographyVariant;
  /** Custom element to render (overrides variant's default element) */
  as?: ElementType;
  /** Text color from theme palette */
  color?: TypographyColor;
  /** Optional href - when provided, renders as a link */
  href?: string;
  /** Callback fired when clicked (for links or clickable text) */
  onClick?: (e: React.MouseEvent) => void;
  /** Whether the text is in an active state (useful for navigation links) */
  active?: boolean;
  /** Text content */
  children: React.ReactNode;
}

/**
 * A general-purpose typography component with optional link support.
 *
 * Can render as various text elements (h1-h6, p, span, label) and optionally
 * as a link when href is provided. Supports active state for navigation use cases.
 * Uses theme colors for styling, so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Heading</Typography>
 * <Typography variant="p">Paragraph text</Typography>
 * ```
 *
 * @example
 * ```tsx
 * // As a link
 * <Typography variant="p" href="/about" active={isActive}>
 *   About
 * </Typography>
 * ```
 *
 * @param props - Typography props
 * @returns A styled text element or link
 */
export function Typography({
  variant = "p",
  as,
  color,
  href,
  onClick,
  active = false,
  children,
}: TypographyProps) {
  // Determine the element to render
  const getElement = (): ElementType => {
    if (as) return as;
    if (href) return "a";

    const variantMap: Record<TypographyVariant, ElementType> = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      p: "p",
      span: "span",
      label: "label",
      caption: "span",
    };

    return variantMap[variant];
  };

  const elementType = getElement();

  // Base styles for all variants
  const baseStyles = "transition-colors";

  // Variant-specific styles (font size and weight only, color handled separately)
  const variantStyles: Record<TypographyVariant, string> = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-semibold",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
    p: "text-base",
    span: "text-base",
    label: "text-sm font-medium",
    caption: "text-sm",
  };

  // Color styles from theme palette
  const colorStyles: Record<TypographyColor, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    destructive: "text-destructive",
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive", // error maps to destructive
    info: "text-info",
    foreground: "text-foreground",
    muted: "text-muted",
  };

  // Default color: foreground for most, muted for caption, accent for links
  const defaultColor = href
    ? "accent"
    : variant === "caption"
    ? "muted"
    : "foreground";
  const selectedColor = color || (active ? "primary" : defaultColor);

  // Link-specific styles
  const linkStyles = href ? "hover:opacity-80 cursor-pointer" : "";

  // Active state styles (adds font weight if not already bold)
  const activeStyles = active && !color ? "font-semibold" : "";

  const combinedClassName = clsx(
    baseStyles,
    variantStyles[variant],
    colorStyles[selectedColor],
    linkStyles,
    activeStyles
  );

  const elementProps = {
    className: combinedClassName,
    ...(href && { href }),
    ...(onClick && { onClick }),
  };

  return React.createElement(elementType, elementProps, children);
}
