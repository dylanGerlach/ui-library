import React from "react";
import clsx from "clsx";
import { useTheme } from "../../theme/ThemeProvider";
import type { PaletteColorName } from "../../theme/types";
import { getPaletteColor, getContrastText } from "../../theme/utils";

/**
 * Props for the Badge component.
 *
 * @interface BadgeProps
 */
export interface BadgeProps {
  /** The count/number to display in the badge */
  count: number;
  /** Visual variant of the badge */
  variant?: PaletteColorName;
  /** Maximum count before showing "max+" (e.g., 99+ for max=99) */
  max?: number;
  /** Whether the badge should be positioned absolutely (for overlays) */
  absolute?: boolean;
  /** Position for absolute positioning */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** Optional child element to wrap with relative positioning (for easier overlay usage) */
  children?: React.ReactNode;
}

/**
 * A small badge component for displaying counts, notifications, or indicators.
 *
 * Commonly used to overlay on icons or buttons (like cart count). Supports
 * max value for showing "99+" style overflow. Uses theme colors for styling,
 * so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge count={5} />
 * ```
 *
 * @example
 * ```tsx
 * // Badge with max (shows "99+" for counts over 99)
 * <Badge count={150} max={99} />
 * ```
 *
 * @example
 * ```tsx
 * // Overlay badge on an icon (easier API)
 * <Badge count={3} absolute position="top-right">
 *   <ShoppingCartIcon />
 * </Badge>
 * ```
 *
 * @example
 * ```tsx
 * // Traditional approach still works
 * <div className="relative">
 *   <ShoppingCartIcon />
 *   <Badge count={3} absolute position="top-right" />
 * </div>
 * ```
 *
 * @param props - Badge props
 * @returns A styled badge element, or wrapper with badge if children provided
 */
export function Badge({
  count,
  variant = "primary",
  max,
  absolute = false,
  position = "top-right",
  children,
}: BadgeProps) {
  const theme = useTheme();

  // Format the count display
  const displayCount = max && count > max ? `${max}+` : count.toString();

  // Determine padding based on content length
  const isSingleDigit = displayCount.length === 1;
  const paddingClass = isSingleDigit ? "px-1.5" : "px-2";

  const baseStyles = clsx(
    "inline-flex items-center justify-center rounded-full text-[10px] font-semibold leading-none",
    paddingClass,
    isSingleDigit ? "h-4 w-4" : "h-5 min-w-[1.25rem]"
  );

  // Get colors from theme palette
  const getVariantStyles = () => {
    const colorName = variant || "primary";
    return {
      backgroundColor: getPaletteColor(colorName, theme),
      color: getContrastText(colorName, theme),
    };
  };

  const positionStyles = absolute
    ? {
        "top-right": "absolute top-0 right-0",
        "top-left": "absolute top-0 left-0",
        "bottom-right": "absolute bottom-0 right-0",
        "bottom-left": "absolute bottom-0 left-0",
      }[position]
    : "";

  const variantStyle = getVariantStyles();

  // If children provided and absolute positioning, wrap in relative container
  if (children && absolute) {
    return (
      <span className="relative inline-block">
        {children}
        {count > 0 && (
          <span
            className={clsx(baseStyles, positionStyles)}
            style={variantStyle}
          >
            {displayCount}
          </span>
        )}
      </span>
    );
  }

  // If no children, only render badge if count > 0
  if (count <= 0) return null;

  return (
    <span className={clsx(baseStyles, positionStyles)} style={variantStyle}>
      {displayCount}
    </span>
  );
}
