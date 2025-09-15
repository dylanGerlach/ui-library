import React from "react"
import clsx from "clsx"
import { ThreeDotLoader } from "../three-dot-loader/three-dot-loader"

type ButtonProps = {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "accent" | "destructive"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  isLoading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

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
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50"

  const sizes: Record<string, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  const variants: Record<string, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
    accent: "bg-accent text-accent-foreground hover:opacity-90",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
  }

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
            {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
            {children}
            {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
          </span>
          {/* Loader on top, absolutely centered */}
          <span className="absolute">
            <ThreeDotLoader />
          </span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  )
}
