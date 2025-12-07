import React from "react";
import clsx from "clsx";
import { ThreeDotLoader } from "../three-dot-loader/three-dot-loader";

/**
 * Size configuration for the Button component.
 * Can be a simple size string or an object with responsive breakpoints.
 */
type ButtonSize =
  | "sm"
  | "md"
  | "lg"
  | {
      base?: "sm" | "md" | "lg";
      sm?: "sm" | "md" | "lg";
      md?: "sm" | "md" | "lg";
      lg?: "sm" | "md" | "lg";
      xl?: "sm" | "md" | "lg";
    };

/**
 * Props for the Button component.
 *
 * @interface ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 */
type ButtonProps = {
  /** The content to display inside the button */
  children: React.ReactNode;
  /** Visual style variant of the button */
  variant?: "primary" | "secondary" | "accent" | "destructive";
  /** Size of the button. Can be a simple size string or an object with responsive breakpoints. */
  size?: ButtonSize;
  /** Border radius of the button (rounded corners) */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state (shows ThreeDotLoader) */
  isLoading?: boolean;
  /** Whether the button should span the full width of its container */
  fullWidth?: boolean;
  /** Whether the button should have a CTA pop effect (enhanced shadow and hover scale) */
  pop?: boolean;
  /** Optional icon to display in the button */
  icon?: React.ReactNode;
  /** Position of the icon relative to the button text */
  iconPosition?: "left" | "right";
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style">;

/**
 * A versatile button component with multiple variants, sizes, and states.
 *
 * Supports loading states, icons, and full-width layouts. Uses theme colors
 * for styling, so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * ```
 *
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   icon={<Icon />}
 *   iconPosition="left"
 *   isLoading={isLoading}
 * >
 *   Submit
 * </Button>
 * ```
 *
 * @example
 * ```tsx
 * // Pill-shaped button (fully rounded)
 * <Button variant="primary" rounded="full">Pill Button</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Rectangular button (no rounding)
 * <Button variant="primary" rounded="none">Rectangular Button</Button>
 * ```
 *
 * @example
 * ```tsx
 * // CTA button with pop effect
 * <Button variant="primary" pop>Get Started</Button>
 * ```
 *
 * @example
 * ```tsx
 * // Responsive size - small on mobile, medium on tablet, large on desktop
 * <Button
 *   variant="primary"
 *   size={{
 *     base: "sm",
 *     md: "md",
 *     lg: "lg"
 *   }}
 * >
 *   Responsive Button
 * </Button>
 * ```
 *
 * @param props - Button props including all standard HTML button attributes
 * @returns A styled button element
 */

/**
 * Size class mappings for button padding and text size.
 */
const SIZE_CLASSES = {
  sm: { padding: "px-2 py-1", text: "text-sm" },
  md: { padding: "px-4 py-2", text: "text-base" },
  lg: { padding: "px-6 py-3", text: "text-lg" },
} as const;

/**
 * Generates responsive size classes for the button.
 * @param size - Size configuration (string or responsive object)
 * @returns Tailwind classes for button sizing
 */
function getSizeClasses(size: ButtonSize): string {
  // Simple string size - return classes directly
  if (typeof size === "string") {
    const classes = SIZE_CLASSES[size] || SIZE_CLASSES.md;
    return `${classes.padding} ${classes.text}`;
  }

  // Responsive object - build classes for each breakpoint
  const classes: string[] = [];
  const baseSize = size.base || size.md || "md";
  const baseClasses = SIZE_CLASSES[baseSize];
  classes.push(baseClasses.padding, baseClasses.text);

  // Add responsive breakpoint classes
  if (size.sm) {
    const smClasses = SIZE_CLASSES[size.sm];
    classes.push(`sm:${smClasses.padding}`, `sm:${smClasses.text}`);
  }
  if (size.md) {
    const mdClasses = SIZE_CLASSES[size.md];
    classes.push(`md:${mdClasses.padding}`, `md:${mdClasses.text}`);
  }
  if (size.lg) {
    const lgClasses = SIZE_CLASSES[size.lg];
    classes.push(`lg:${lgClasses.padding}`, `lg:${lgClasses.text}`);
  }
  if (size.xl) {
    const xlClasses = SIZE_CLASSES[size.xl];
    classes.push(`xl:${xlClasses.padding}`, `xl:${xlClasses.text}`);
  }

  return classes.join(" ");
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  rounded = "md",
  disabled = false,
  isLoading = false,
  fullWidth = false,
  pop = false,
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium border-0 focus:outline-none transition-all disabled:opacity-50";

  const roundedStyles: Record<string, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const variants: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
    accent: "bg-accent text-accent-foreground hover:opacity-90",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
  };

  const popStyles = pop
    ? "shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
    : "";

  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        base,
        getSizeClasses(size),
        roundedStyles[rounded],
        variants[variant],
        fullWidth && "w-full",
        popStyles
      )}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          {/* Hidden children to preserve button size */}
          <span className="invisible flex items-center">
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </span>
          {/* Loader on top, absolutely centered */}
          <span className="absolute">
            <ThreeDotLoader />
          </span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </button>
  );
}
