import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Configuration for a single dropdown menu item.
 * 
 * @interface DropdownMenuItem
 */
export interface DropdownMenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Text label to display for the menu item */
  label: string;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
  /** Callback function called when the item is clicked (not needed if item has children) */
  onClick?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Visual variant of the item */
  variant?: "default" | "danger" | "active";
  /** Whether to show a separator after this item */
  separator?: boolean;
  /** Nested submenu items (creates a submenu) */
  children?: DropdownMenuItem[];
}

/**
 * Props for the DropdownMenu component.
 * 
 * @interface DropdownMenuProps
 */
export interface DropdownMenuProps {
  /** The element that triggers the dropdown menu (typically a Button) */
  trigger: React.ReactNode;
  /** Array of menu items to display */
  items: DropdownMenuItem[];
  /** Whether the menu is currently open */
  open: boolean;
  /** Callback fired when the open state changes */
  onOpenChange: (open: boolean) => void;
  /** Side of the trigger where the menu appears */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment of the menu relative to the trigger */
  align?: "start" | "center" | "end";
  /** Distance in pixels from the trigger */
  sideOffset?: number;
}

// Submenu item component
function SubmenuItem({
  item,
  getItemStyles,
  getItemStyle,
}: {
  item: DropdownMenuItem;
  getItemStyles: (variant?: "default" | "danger" | "active") => string;
  getItemStyle: (variant?: "default" | "danger" | "active") => React.CSSProperties;
}) {
  const theme = useTheme();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <Popover.Root open={submenuOpen} onOpenChange={setSubmenuOpen}>
      <Popover.Trigger asChild>
        <button
          className={`${getItemStyles(item.variant)} ${
            item.disabled
              ? "disabled:opacity-50 disabled:cursor-not-allowed"
              : ""
          } focus:outline-none focus:ring-0 justify-between hover:bg-muted/10`}
          style={getItemStyle(item.variant)}
          disabled={item.disabled}
          onMouseEnter={() => !item.disabled && setSubmenuOpen(true)}
          onMouseLeave={() => setSubmenuOpen(false)}
        >
          <span className="flex items-center gap-2">
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
          </span>
          <span className="text-xs ml-2 opacity-60">›</span>
        </button>
      </Popover.Trigger>

      <Popover.Content
        side="right"
        align="start"
        sideOffset={-6}
        alignOffset={0}
        className="z-[10000] py-1 px-1 border rounded-md shadow-xl min-w-[160px]"
        onMouseEnter={() => !item.disabled && setSubmenuOpen(true)}
        onMouseLeave={() => setSubmenuOpen(false)}
        style={{
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.border,
        }}
      >
        {item.children?.map((child, childIndex) => (
          <React.Fragment key={child.id}>
            {child.children ? (
              <SubmenuItem item={child} getItemStyles={getItemStyles} getItemStyle={getItemStyle} />
            ) : (
              <button
                className={`${getItemStyles(child.variant)} ${
                  child.disabled
                    ? "disabled:opacity-50 disabled:cursor-not-allowed"
                    : ""
                } focus:outline-none focus:ring-0 hover:bg-muted/10`}
                style={getItemStyle(child.variant)}
                onClick={child.onClick}
                disabled={child.disabled}
              >
                {child.icon && <span className="w-4 h-4">{child.icon}</span>}
                {child.label}
              </button>
            )}

            {child.separator && childIndex < item.children!.length - 1 && (
              <hr className="my-1" style={{ borderColor: theme.palette.border }} />
            )}
          </React.Fragment>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}

/**
 * A dropdown menu component with support for nested submenus, icons, and variants.
 * 
 * Uses a props-based API (not compound components). Requires controlled open state.
 * Supports multi-level nested submenus, separators, and disabled items.
 * Uses theme colors for styling, so ensure ThemeProvider is set up in your app.
 * 
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * 
 * <DropdownMenu
 *   trigger={<Button>Actions</Button>}
 *   items={[
 *     { id: "1", label: "Edit", onClick: () => console.log("Edit") },
 *     { id: "2", label: "Delete", variant: "danger", onClick: () => console.log("Delete") },
 *   ]}
 *   open={open}
 *   onOpenChange={setOpen}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With nested submenu
 * <DropdownMenu
 *   trigger={<Button>File</Button>}
 *   items={[
 *     {
 *       id: "1",
 *       label: "New",
 *       children: [
 *         { id: "1-1", label: "Document", onClick: () => {} },
 *         { id: "1-2", label: "Spreadsheet", onClick: () => {} },
 *       ],
 *     },
 *   ]}
 *   open={open}
 *   onOpenChange={setOpen}
 * />
 * ```
 * 
 * @param props - DropdownMenu props
 * @returns A dropdown menu component
 */
export function DropdownMenu({
  trigger,
  items,
  open,
  onOpenChange,
  side = "top",
  align = "start",
  sideOffset = 5,
}: DropdownMenuProps) {
  const theme = useTheme();
  
  const getItemStyles = (
    variant: "default" | "danger" | "active" = "default"
  ) => {
    const baseStyles =
      "w-full px-3 py-2 text-left text-sm flex items-center gap-2 rounded transition-colors";

    if (variant === "danger") {
      return baseStyles;
    }

    if (variant === "active") {
      return baseStyles;
    }

    return baseStyles;
  };

  const getItemStyle = (
    variant: "default" | "danger" | "active" = "default"
  ) => {
    if (variant === "danger") {
      return { color: theme.palette.error.main };
    }

    if (variant === "active") {
      return {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      };
    }

    return { color: theme.palette.text.primary };
  };

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-[9999] py-1 px-1 border rounded-md shadow-xl min-w-[160px]"
        style={{
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.border,
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {item.children ? (
              <SubmenuItem item={item} getItemStyles={getItemStyles} getItemStyle={getItemStyle} />
            ) : (
              <button
                className={`${getItemStyles(item.variant)} ${
                  item.disabled
                    ? "disabled:opacity-50 disabled:cursor-not-allowed"
                    : ""
                } focus:outline-none focus:ring-0 hover:bg-muted/10`}
                style={getItemStyle(item.variant)}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </button>
            )}

            {item.separator && index < items.length - 1 && (
              <hr className="my-1" style={{ borderColor: theme.palette.border }} />
            )}
          </React.Fragment>
        ))}
      </Popover.Content>
    </Popover.Root>
  );
}
