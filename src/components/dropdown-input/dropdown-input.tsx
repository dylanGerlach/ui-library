import Select, { SingleValue } from "react-select";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";
import { useTheme } from "../../theme/ThemeProvider";
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
  /**
   * When true, the menu renders in-place (can be clipped by overflow).
   * Use only for stories or when portaling is not desired.
   * @default false
   */
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
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const showMessage = error || helperText;

  const reactSelectOptions = options.map((opt) => ({
    value: opt.id,
    label: opt.name,
  }));

  const selectedOption =
    reactSelectOptions.find((opt) => opt.value === value) || null;

  return (
    <div className="space-y-1 w-full" style={{ opacity: disabled ? 0.6 : 1 }}>
      <div className="relative">
        <div className="relative w-full">
          {/* Fieldset creates border, legend creates notch for label */}
          <fieldset
            className="absolute inset-0 pointer-events-none rounded-md border m-0 p-0 overflow-hidden transition-colors"
            style={{
              borderColor: error
                ? theme.palette.error.main
                : isFocused
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
              borderWidth: error || isFocused ? "2px" : "1px",
            }}
          >
            {label && (
              <legend className="ml-2 px-1 pb-1">
                <span
                  className="text-sm whitespace-pre"
                  style={{
                    color: error
                      ? theme.palette.error.main
                      : isFocused
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  }}
                >
                  {label}
                </span>
              </legend>
            )}
          </fieldset>

          <div className="relative">
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
              menuPortalTarget={document.body}
              menuPosition="absolute"
              classNamePrefix="rs"
              styles={{
                indicatorsContainer: (base) => ({
                  ...base,
                  color: theme.palette.text.secondary,
                  paddingRight: "0.25rem",
                  paddingTop: label ? "1.25rem" : "0.5rem",
                  paddingBottom: label ? "0.625rem" : "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }),
                control: (base, state) => ({
                  ...base,
                  backgroundColor: "transparent",
                  borderRadius: "0.375rem",
                  borderWidth: 0,
                  borderStyle: "none",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "transparent",
                  },
                }),
                valueContainer: (base) => ({
                  ...base,
                  paddingTop: label ? "1.25rem" : "0.5rem",
                  paddingBottom: label ? "0.625rem" : "0.5rem",
                  paddingLeft: "0.75rem",
                  paddingRight: "0.75rem",
                  minHeight: "auto",
                }),
                input: (base) => ({
                  ...base,
                  margin: 0,
                  padding: 0,
                  color: theme.palette.text.primary,
                }),
                menuPortal: (base: object) => ({ ...base, zIndex: 9999 }),
                menu: (base: object) => ({
                  ...base,
                  backgroundColor: theme.palette.background.paper,
                  border: `2px solid ${theme.palette.border}`,
                  borderRadius: "0.375rem",
                  marginTop: "0.25rem",
                  boxShadow:
                    "0px 4px 6px rgba(0,0,0,0.1), 0px 2px 4px rgba(0,0,0,0.06)",
                  zIndex: 9999,
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? theme.palette.background.paper
                    : state.isFocused
                    ? theme.palette.border
                    : theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  cursor: "pointer",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: theme.palette.text.primary,
                  lineHeight: "1.5",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: theme.palette.text.secondary,
                }),
              }}
              components={{
                DropdownIndicator: () => {
                  const iconColor = error
                    ? theme.palette.error.main
                    : isFocused
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary;
                  return (
                    <ChevronDown
                      className="w-4 h-4 mr-2"
                      style={{ color: iconColor }}
                    />
                  );
                },
                IndicatorSeparator: () => null,
              }}
            />
          </div>
        </div>
      </div>

      {showMessage && (
        <p
          className="text-sm mt-1"
          style={{
            color: error
              ? theme.palette.error.main
              : messageColor === "primary"
              ? theme.palette.primary.main
              : messageColor === "secondary"
              ? theme.palette.secondary.main
              : messageColor === "accent"
              ? theme.palette.accent.main
              : messageColor === "destructive"
              ? theme.palette.error.main
              : messageColor === "success"
              ? theme.palette.success.main
              : messageColor === "warning"
              ? theme.palette.warning.main
              : messageColor === "info"
              ? theme.palette.info.main
              : messageColor === "muted"
              ? theme.palette.text.secondary
              : theme.palette.text.primary,
          }}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};
