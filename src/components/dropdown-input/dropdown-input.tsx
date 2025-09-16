import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";

export interface DropdownOption {
  id: string | number;
  name: string;
}

export interface DropdownInputProps {
  label?: string;
  value: string | number | null;
  onChange: (val: string | number | null) => void;
  options: DropdownOption[];
  required?: boolean;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  messageColor?: string;
  reserveMessageSpace?: boolean;
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
  helperText,
  disabled = false,
  placeholder = "Select...",
  className,
  messageColor,
  reserveMessageSpace = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const showMessage = error || helperText;

  return (
    <div
      className={clsx("space-y-1 w-full", className)}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      {label && (
        <label className="text-sm font-medium text-foreground block">
          {label}
          {!required && <span className="text-muted"> (optional)</span>}
        </label>
      )}

      <Select.Root
        value={value?.toString() ?? ""}
        onValueChange={(val) => onChange(val === "" ? null : val)}
        disabled={disabled}
      >
        <Select.Trigger
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx(
            "flex items-center justify-between w-full rounded-md border px-3 py-2 text-foreground bg-card",
            "focus:outline-none transition-all",
            disabled && "cursor-not-allowed opacity-70"
          )}
          style={{
            borderColor: error
              ? "var(--color-destructive)"
              : "var(--color-border)",
            // ✅ Removed blue box-shadow completely
            boxShadow: error ? "0 0 0 2px var(--color-destructive)" : "none",
          }}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="z-50 rounded-md border shadow-md bg-card text-foreground"
            sideOffset={4}
            style={{ borderColor: "var(--color-border)" }}
          >
            <Select.ScrollUpButton className="flex items-center justify-center py-1 text-muted-foreground">
              <ChevronUp className="w-4 h-4" />
            </Select.ScrollUpButton>

            <Select.Viewport className="p-1">
              {options.map((opt) => (
                <Select.Item
                  key={opt.id}
                  value={opt.id.toString()}
                  className={clsx(
                    "flex items-center justify-between rounded px-2 py-1 cursor-pointer",
                    "focus:bg-card/70 focus:text-foreground"
                  )}
                >
                  <Select.ItemText>{opt.name}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="w-4 h-4 text-muted-foreground" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center py-1 text-muted-foreground">
              <ChevronDown className="w-4 h-4" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {(showMessage || reserveMessageSpace) && (
        <p
          className={clsx(
            "text-sm mt-1 min-h-[1.25rem]",
            error
              ? "text-destructive"
              : messageColor
              ? messageColor
              : "text-muted-foreground"
          )}
        >
          {showMessage ? error || helperText : ""}
        </p>
      )}
    </div>
  );
};
