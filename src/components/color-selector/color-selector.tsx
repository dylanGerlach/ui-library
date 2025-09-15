import * as Popover from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import clsx from "clsx";
import { Palette } from "lucide-react";

const COLORS = [
  // Grayscale
  "#000000", "#444444", "#888888", "#CCCCCC", "#FFFFFF",

  // Reds
  "#FF0000", "#CC0000", "#990000", "#FF6666", "#FF9999",

  // Oranges
  "#FF9900", "#CC7A00", "#994D00", "#FFB84D", "#FFD699",

  // Yellows
  "#FFFF00", "#CCCC00", "#999900", "#FFFF66", "#FFFF99",

  // Greens
  "#00FF00", "#00CC00", "#009900", "#66FF66", "#99FF99",

  // Cyans / Teals
  "#00FFFF", "#00CCCC", "#009999", "#66FFFF", "#99FFFF",

  // Blues
  "#0000FF", "#0000CC", "#000099", "#6666FF", "#9999FF",
];

export interface ColorSelectorProps {
  trigger?: React.ReactNode;
  value?: string;
  onChange: (color: string) => void;
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
}

export default function ColorSelector({
  trigger,
  value,
  onChange,
  label,
  defaultValue,
  disabled = false,
}: ColorSelectorProps) {
  const [open, setOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
            "bg-card text-muted-foreground",
            "hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary",
            disabled && "opacity-50 cursor-not-allowed"
          )}
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
          "z-[9999] p-3 rounded-md shadow-md border",
          "bg-card text-foreground space-y-2 w-52"
        )}
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
