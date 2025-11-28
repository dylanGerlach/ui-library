import Select, { SingleValue } from "react-select";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";
import type { MessageColor } from "../../theme/types";

/**
 * Configuration for a dropdown option.
 * 
 * @interface DropdownOption
 */
export interface DropdownOption {
  /** Unique identifier for the option */
  id: string | number;
  /** Display name for the option */
  name: string;
}

/**
 * Props for the DropdownInput component.
 * 
 * @interface DropdownInputProps
 */
export interface DropdownInputProps {
  /** Optional label text displayed above the dropdown */
  label?: string;
  /** Currently selected value (must match an option's id) */
  value: string | number | null;
  /** Callback fired when the selection changes */
  onChange: (val: string | number | null) => void;
  /** Array of options to display in the dropdown */
  options: DropdownOption[];
  /** Whether the dropdown is required */
  required?: boolean;
  /** Error message to display below the dropdown */
  error?: string;
  /** Helper text to display below the dropdown */
  helperText?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Color for the message text from theme palette */
  messageColor?: MessageColor;
  /** Whether to reserve space for messages even when none are shown */
  reserveMessageSpace?: boolean;
}

/**
 * A single-select dropdown input component.
 * 
 * Built on react-select with theme integration. Supports error states,
 * helper text, and validation. Uses theme colors for styling, so ensure
 * ThemeProvider is set up in your app.
 * 
 * @example
 * ```tsx
 * <DropdownInput
 *   label="Country"
 *   value={selectedCountry}
 *   onChange={setSelectedCountry}
 *   options={[
 *     { id: "us", name: "United States" },
 *     { id: "uk", name: "United Kingdom" },
 *   ]}
 * />
 * ```
 * 
 * @param props - DropdownInput props
 * @returns A styled dropdown select component
 */
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
  messageColor,
  reserveMessageSpace = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const showMessage = error || helperText;

  const reactSelectOptions = options.map((opt) => ({
    value: opt.id,
    label: opt.name,
  }));

  const selectedOption =
    reactSelectOptions.find((opt) => opt.value === value) || null;

  return (
    <div
      className="space-y-1 w-full"
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      {label && (
        <label className="text-sm font-medium text-foreground block">
          {label}
          {!required && <span className="text-muted"> (optional)</span>}
        </label>
      )}

      <div
        className={clsx(
          "rounded-md transition-all",
          disabled && "cursor-not-allowed opacity-70"
        )}
      >
        <Select
          value={selectedOption}
          onChange={(
            newValue: SingleValue<{ value: string | number; label: string }>
          ) => onChange(newValue ? newValue.value : null)}
          options={reactSelectOptions}
          isDisabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          classNamePrefix="rs"
          styles={{
            indicatorsContainer: (base) => ({
              ...base,
              color: "var(--color-muted)",
            }),
            control: (base, state) => ({
              ...base,
              backgroundColor: "var(--color-card)",
              borderRadius: "0.375rem",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: error
                ? "var(--color-destructive)"
                : "var(--color-border)",
              boxShadow: error
                ? "0 0 0 2px var(--color-destructive)"
                : state.isFocused
                ? "0 0 0 2px var(--color-primary)"
                : "none",
              "&:hover": {
                borderColor: error
                  ? "var(--color-destructive)"
                  : "var(--color-border)",
              },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "var(--color-card)",
              border: "2px solid var(--color-border)",
              borderRadius: "0.375rem",
              marginTop: "0.25rem",
              boxShadow:
                "0px 4px 6px rgba(0,0,0,0.1), 0px 2px 4px rgba(0,0,0,0.06)",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected
                ? "var(--color-card)"
                : state.isFocused
                ? "var(--color-border)"
                : "var(--color-card)",
              color: "var(--color-foreground)",
              cursor: "pointer",
            }),
            singleValue: (base) => ({
              ...base,
              color: "var(--color-foreground)",
            }),
            placeholder: (base) => ({
              ...base,
              color: "var(--color-muted)",
            }),
          }}
          components={{
            DropdownIndicator: () => (
              <ChevronDown className="w-4 h-4 text-foreground mr-2" />
            ),
            IndicatorSeparator: () => null,
          }}
        />
      </div>

      {(showMessage || reserveMessageSpace) && (
        <p
          className={clsx(
            "text-sm mt-1 min-h-[1.25rem]",
            error
              ? "text-destructive"
              : messageColor
              ? `text-${messageColor}`
              : "text-foreground"
          )}
        >
          {showMessage ? error || helperText : ""}
        </p>
      )}
    </div>
  );
};
