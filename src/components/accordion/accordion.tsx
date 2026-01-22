import React, { useState } from "react";
import clsx from "clsx";
import { useTheme } from "../../theme/ThemeProvider";
import { ChevronDown } from "lucide-react";

/**
 * Props for a single accordion item.
 *
 * @interface AccordionItemProps
 */
export interface AccordionItemProps {
  /** The header content (can be text or React nodes) */
  header: React.ReactNode;
  /** The content to display when expanded (can be text or React nodes) */
  children: React.ReactNode;
  /** Whether this item is initially expanded */
  defaultExpanded?: boolean;
  /** Whether this item is controlled externally */
  expanded?: boolean;
  /** Callback fired when the item's expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Whether to disable this accordion item */
  disabled?: boolean;
}

/**
 * Props for the Accordion component.
 *
 * @interface AccordionProps
 */
export interface AccordionProps {
  /** Array of accordion items to display */
  items: AccordionItemProps[];
  /** Whether multiple items can be expanded at once */
  allowMultiple?: boolean;
  /** Whether to show borders between items */
  bordered?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

/**
 * A single accordion item component.
 *
 * @param props - AccordionItem props
 * @returns A styled accordion item
 */
function AccordionItem({
  header,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  disabled = false,
}: AccordionItemProps) {
  const theme = useTheme();
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (disabled) return;

    const newExpanded = !expanded;
    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }
    onExpandedChange?.(newExpanded);
  };

  return (
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: theme.palette.border }}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={clsx(
          "w-full flex items-center justify-between py-3 px-4 text-left transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "hover:bg-opacity-5"
        )}
        style={{
          color: theme.palette.text.primary,
          backgroundColor: expanded
            ? `${theme.palette.primary.main}0a`
            : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!disabled && !expanded) {
            e.currentTarget.style.backgroundColor = `${theme.palette.text.secondary}1a`;
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !expanded) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
        aria-expanded={expanded}
        aria-disabled={disabled}
      >
        <div className="flex-1 pr-4">{header}</div>
        <ChevronDown
          className={clsx(
            "w-5 h-5 flex-shrink-0 transition-transform duration-200",
            expanded && "transform rotate-180"
          )}
          style={{ color: theme.palette.text.secondary }}
        />
      </button>
      <div
        className={clsx(
          "overflow-hidden transition-all duration-200 ease-in-out",
          expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div
          className="py-3 px-4"
          style={{
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * An accordion component for displaying collapsible content sections.
 *
 * Uses theme colors for styling. Ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     {
 *       header: "Section 1",
 *       children: "Content for section 1",
 *     },
 *     {
 *       header: "Section 2",
 *       children: <div>Custom content</div>,
 *     },
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled accordion with multiple items expanded
 * <Accordion
 *   allowMultiple
 *   items={items.map(item => ({
 *     ...item,
 *     expanded: expandedItems.includes(item.id),
 *     onExpandedChange: (expanded) => handleToggle(item.id, expanded),
 *   }))}
 * />
 * ```
 *
 * @param props - Accordion props
 * @returns A styled accordion component
 */
export function Accordion({
  items,
  allowMultiple = false,
  bordered = true,
  size = "md",
}: AccordionProps) {
  const theme = useTheme();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const handleItemToggle = (index: number, expanded: boolean) => {
    if (!allowMultiple) {
      // If only one item can be open, close all others
      setExpandedItems(expanded ? new Set([index]) : new Set());
    } else {
      // Allow multiple items to be open
      const newSet = new Set(expandedItems);
      if (expanded) {
        newSet.add(index);
      } else {
        newSet.delete(index);
      }
      setExpandedItems(newSet);
    }
  };

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div
      className={clsx(
        "rounded-md overflow-hidden",
        bordered && "border",
        sizeClasses[size]
      )}
      style={{
        backgroundColor: theme.palette.background.paper,
        borderColor: bordered ? theme.palette.border : "transparent",
      }}
    >
      {items.map((item, index) => {
        const isControlled = item.expanded !== undefined;
        const isExpanded = isControlled
          ? item.expanded
          : expandedItems.has(index);

        return (
          <AccordionItem
            key={index}
            {...item}
            expanded={isControlled ? item.expanded : isExpanded}
            onExpandedChange={(expanded) => {
              if (!isControlled) {
                handleItemToggle(index, expanded);
              }
              item.onExpandedChange?.(expanded);
            }}
          />
        );
      })}
    </div>
  );
}
