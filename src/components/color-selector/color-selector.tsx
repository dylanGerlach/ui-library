import * as Popover from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import clsx from "clsx";
import { Palette } from "lucide-react";
import { useTheme } from "../../theme/ThemeProvider";

const COLORS = [
  // Grayscale
  "#000000",
  "#444444",
  "#888888",
  "#CCCCCC",
  "#FFFFFF",

  // Reds
  "#FF0000",
  "#CC0000",
  "#990000",
  "#FF6666",
  "#FF9999",

  // Oranges
  "#FF9900",
  "#CC7A00",
  "#994D00",
  "#FFB84D",
  "#FFD699",

  // Yellows
  "#FFFF00",
  "#CCCC00",
  "#999900",
  "#FFFF66",
  "#FFFF99",

  // Greens
  "#00FF00",
  "#00CC00",
  "#009900",
  "#66FF66",
  "#99FF99",

  // Cyans / Teals
  "#00FFFF",
  "#00CCCC",
  "#009999",
  "#66FFFF",
  "#99FFFF",

  // Blues
  "#0000FF",
  "#0000CC",
  "#000099",
  "#6666FF",
  "#9999FF",
];

/**
 * Props for the ColorSelector component.
 * 
 * @interface ColorSelectorProps
 */
export interface ColorSelectorProps {
  /** Custom trigger element (defaults to a color swatch button) */
  trigger?: React.ReactNode;
  /** Current color value (hex format) */
  value?: string;
  /** Callback fired when the color changes */
  onChange: (color: string) => void;
  /** Optional label text */
  label?: string;
  /** Default color value if value is not provided */
  defaultValue?: string;
  /** Whether the selector is disabled */
  disabled?: boolean;
}

/**
 * A color picker component with a popover interface.
 * 
 * Provides both a simple color picker and an advanced mode with hex/RGB input.
 * Uses theme colors for styling, so ensure ThemeProvider is set up in your app.
 * 
 * @example
 * ```tsx
 * <ColorSelector
 *   value={color}
 *   onChange={setColor}
 *   label="Background Color"
 * />
 * ```
 * 
 * @param props - ColorSelector props
 * @returns A color picker component
 */
export function ColorSelector({
  trigger,
  value,
  onChange,
  label,
  defaultValue,
  disabled = false,
}: ColorSelectorProps) {
  const [open, setOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const theme = useTheme();

  const effectiveValue = value || defaultValue;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          title={label}
          disabled={disabled}
          className={clsx(
            "relative flex items-center justify-center rounded-md p-2 border transition-colors",
            "focus:outline-none focus:ring-2",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderColor: theme.palette.border,
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = `${theme.palette.text.secondary}1a`;
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.backgroundColor = theme.palette.background.paper;
            }
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = `2px solid ${theme.palette.primary.main}`;
            e.currentTarget.style.outlineOffset = "2px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = "none";
          }}
        >
          {trigger || <Palette size={18} />}
          {effectiveValue && (
            <span
              className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-sm"
              style={{ backgroundColor: effectiveValue }}
            />
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={6}
        align="start"
        className={clsx(
          "z-[9999] p-3 rounded-md shadow-md border space-y-2 w-52"
        )}
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderColor: theme.palette.border,
        }}
      >
        {/* fixed height wrapper to stabilize switching */}
        <div className="relative h-52 w-full">
          {/* Swatches */}
          <div
            className={clsx(
              "absolute inset-0 grid grid-cols-5 gap-2 overflow-auto",
              showAdvanced && "hidden"
            )}
          >
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                className="w-7 h-7 rounded-md border hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color);
                  setOpen(false);
                }}
              />
            ))}
          </div>

          {/* Advanced Picker */}
          <div
            className={clsx(
              "absolute inset-0 flex items-center justify-center",
              !showAdvanced && "hidden"
            )}
          >
            <HexColorPicker
              color={effectiveValue || "#000000"}
              onChange={(color) => onChange(color)}
              className="max-w-[180px]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={clsx(
            "w-full text-sm px-2 py-1 rounded-md border transition-colors",
            "bg-background hover:bg-muted/10"
          )}
        >
          {showAdvanced ? "Show preset colors" : "Choose custom color"}
        </button>
      </Popover.Content>
    </Popover.Root>
  );
}
