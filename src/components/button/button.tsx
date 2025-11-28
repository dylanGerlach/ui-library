import React from "react";
import clsx from "clsx";
import { ThreeDotLoader } from "../three-dot-loader/three-dot-loader";

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
  /** Size of the button */
  size?: "sm" | "md" | "lg";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state (shows ThreeDotLoader) */
  isLoading?: boolean;
  /** Whether the button should span the full width of its container */
  fullWidth?: boolean;
  /** Optional icon to display in the button */
  icon?: React.ReactNode;
  /** Position of the icon relative to the button text */
  iconPosition?: "left" | "right";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
 * @param props - Button props including all standard HTML button attributes
 * @returns A styled button element
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-colors disabled:opacity-50";

  const sizes: Record<string, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
    accent: "bg-accent text-accent-foreground hover:opacity-90",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        fullWidth && "w-full",
        className
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
