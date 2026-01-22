import React from "react";
import clsx from "clsx";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Props for the Sidebar component.
 *
 * @interface SidebarProps
 */
export interface SidebarProps {
  /** Content to render inside the sidebar */
  children: React.ReactNode;
  /** Width preset or custom Tailwind class */
  width?: "sm" | "md" | "lg" | "xl" | string;
  /** Custom Tailwind width class or arbitrary value (e.g., "w-64", "w-[400px]") for when sidebar is open. If provided, overrides the `width` prop when open. */
  openWidth?: string;
  /** Custom Tailwind width class or arbitrary value (e.g., "w-12", "w-[50px]") for when sidebar is closed in normal flow mode. If not provided, defaults to "w-0". */
  closedWidth?: string;
  /** Which side to show border on */
  border?: "left" | "right" | "none";
  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg";
  /** Whether the sidebar overlays content (absolute) or pushes content (normal flow) */
  overlay?: boolean;
  /** Controlled open state (if provided with onOpenChange, enables collapsible behavior) */
  isOpen?: boolean;
  /** Callback fired when open state changes (if provided with isOpen, enables collapsible behavior) */
  onOpenChange?: (open: boolean) => void;
}

/**
 * A simple, flexible sidebar component that acts as a styled container.
 *
 * Renders its children with configurable layout options. Always takes up 100%
 * of page height. Children handle their own scrolling. Optionally supports mobile collapse
 * with slide-in/out animation.
 *
 * Uses theme colors for styling, so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <Button>New Item</Button>
 *   <Typography variant="h6">Section</Typography>
 *   <div>List items...</div>
 * </Sidebar>
 * ```
 *
 * @example
 * ```tsx
 * <Sidebar width="lg" border="right" padding="md">
 *   {items.map(item => <Item key={item.id} {...item} />)}
 * </Sidebar>
 * ```
 *
 * @example
 * ```tsx
 * // With mobile collapse - parent controls when to show/hide
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Sidebar
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 * >
 *   <Button>New Item</Button>
 * </Sidebar>
 * ```
 *
 * @example
 * ```tsx
 * // With custom open/closed widths - parent controls collapsed width
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Sidebar
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   closedWidth="w-[50px]"
 *   openWidth="w-[400px]"
 * >
 *   {/* Parent controls what content shows in each state *\/}
 * </Sidebar>
 * ```
 *
 * @param props - Sidebar props
 * @returns A styled sidebar container with optional mobile collapse
 */
export function Sidebar({
  children,
  width = "md",
  openWidth,
  closedWidth,
  border = "right",
  padding = "md",
  overlay = false,
  isOpen,
  onOpenChange,
}: SidebarProps) {
  const theme = useTheme();

  // Width presets
  const widthClasses: Record<"sm" | "md" | "lg" | "xl", string> = {
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
    xl: "w-96",
  };

  // Get width class - use preset or custom string
  const widthClass =
    width in widthClasses
      ? widthClasses[width as keyof typeof widthClasses]
      : width;

  // Determine the actual width to use based on open/closed state and custom props
  const getWidthClass = () => {
    if (overlay) {
      // Overlay mode: always use openWidth or widthClass (width stays consistent, transform handles visibility)
      return openWidth ?? widthClass;
    } else {
      // Normal flow: use openWidth/widthClass when open, closedWidth or w-0 when closed
      return isOpen ? openWidth ?? widthClass : closedWidth ?? "w-0";
    }
  };

  // Border classes (we'll use inline styles for border color)
  const borderClasses: Record<"left" | "right" | "none", string> = {
    left: "border-l",
    right: "border-r",
    none: "",
  };

  // Padding classes
  const paddingClasses: Record<"none" | "sm" | "md" | "lg", string> = {
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  const sidebarContent = (
    <div
      className={clsx(
        "flex flex-col h-full",
        // Width: use custom widths if provided, otherwise fall back to default behavior
        getWidthClass(),
        // Border: show when overlay or open, or when closedWidth is provided (collapsed but visible)
        overlay || isOpen || closedWidth ? borderClasses[border] : "",
        // Padding: use minimal padding when closed with closedWidth, otherwise use normal padding
        overlay || isOpen ? paddingClasses[padding] : closedWidth ? "p-1" : "",
        // Overlay mode: absolute positioning (relative to container)
        overlay && ["absolute top-0 left-0 h-full z-40", "shadow-lg"],
        // Collapsible animation
        overlay
          ? // Overlay mode: use transform to slide
            "transform transition-transform duration-300 ease-in-out"
          : // Normal flow: use width transition to push content
            "transition-all duration-300 ease-in-out",
        overlay ? (isOpen ? "translate-x-0" : "-translate-x-full") : "",
        // Hide content when collapsed in normal flow to prevent text resizing (unless closedWidth is provided)
        !overlay && !isOpen && !closedWidth && "overflow-hidden"
      )}
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderColor:
          (overlay || isOpen || closedWidth) && border !== "none"
            ? theme.palette.border
            : undefined,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={clsx(
          // Hide content when collapsed in normal flow (unless closedWidth is provided)
          !overlay &&
            !isOpen &&
            !closedWidth &&
            "opacity-0 pointer-events-none",
          // Add h-full here so children can properly size themselves
          "h-full flex flex-col"
        )}
      >
        {children}
      </div>
    </div>
  );

  // If not overlay, return simple sidebar
  if (!overlay) {
    return sidebarContent;
  }

  // Overlay backdrop - only show if overlay is true and sidebar is open
  const showOverlay = overlay && isOpen;

  return (
    <>
      {/* Overlay backdrop - dims background when sidebar overlays content */}
      {showOverlay && (
        <div
          className="fixed inset-0 top-0 z-30"
          onClick={() => onOpenChange?.(false)}
        />
      )}

      {/* Sidebar */}
      {sidebarContent}
    </>
  );
}
