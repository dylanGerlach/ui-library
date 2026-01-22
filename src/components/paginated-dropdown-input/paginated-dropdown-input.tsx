import React, { useState, forwardRef } from "react";
import type { ReactElement } from "react";
import type { GroupBase } from "react-select";
import Select from "react-select";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "../../theme/ThemeProvider";
import type { MessageColor } from "../../theme/types";

import { useComponents } from "./components/useComponents";
import type { AsyncPaginateProps, UseAsyncPaginateResult } from "./utils/types";
import { useAsyncPaginate } from "./utils/useAsyncPaginate";
import { ThreeDotLoader } from "../three-dot-loader/three-dot-loader";

const defaultCacheUniqs: unknown[] = [];
const defaultComponents = {};

/**
 * Props for the PaginatedDropdownInput component.
 *
 * @interface PaginatedDropdownInputProps
 * @template OptionType - The type of option objects
 * @template Group - The type of option groups
 * @template Additional - Additional props type
 * @template IsMulti - Whether multiple selection is enabled
 * @extends AsyncPaginateProps
 */
export interface PaginatedDropdownInputProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean = false
> extends AsyncPaginateProps<OptionType, Group, Additional, IsMulti> {
  /** Optional label text displayed above the dropdown */
  label?: string;
  /** Error message to display below the dropdown */
  error?: string;
  /** Helper text to display below the dropdown */
  helperText?: string;
  /** Whether the dropdown is required */
  required?: boolean;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Color for the message text from theme palette */
  messageColor?: MessageColor;
}

/**
 * A paginated dropdown input component with async loading support.
 *
 * Built on react-select with async pagination capabilities. Supports loading
 * options from an API with pagination, caching, and search. Uses theme colors
 * for styling, so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <PaginatedDropdownInput
 *   label="User"
 *   loadOptions={async (search, loadedOptions) => {
 *     const response = await fetch(`/api/users?q=${search}&page=${loadedOptions.length / 20}`);
 *     const data = await response.json();
 *     return { options: data.users, hasMore: data.hasMore };
 *   }}
 *   value={selectedUser}
 *   onChange={setSelectedUser}
 * />
 * ```
 *
 * @template OptionType - The type of option objects
 * @template Group - The type of option groups
 * @template Additional - Additional props type
 * @template IsMulti - Whether multiple selection is enabled
 * @param props - PaginatedDropdownInput props
 * @param ref - Forwarded ref to the underlying select component
 * @returns A paginated async dropdown select component
 */
export const PaginatedDropdownInput = forwardRef(
  <
    OptionType,
    Group extends GroupBase<OptionType>,
    Additional,
    IsMulti extends boolean = false
  >(
    {
      label,
      error,
      helperText,
      required,
      disabled,
      components = defaultComponents,
      selectRef,
      isLoading: isLoadingProp,
      cacheUniqs = defaultCacheUniqs,
      menuPlacement,
      menuShouldScrollIntoView,
      messageColor,
      className,
      ...rest
    }: PaginatedDropdownInputProps<OptionType, Group, Additional, IsMulti>,
    ref: React.ForwardedRef<any>
  ): ReactElement => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const asyncPaginateProps: UseAsyncPaginateResult<OptionType, Group> =
      useAsyncPaginate(rest, cacheUniqs);

    const processedComponents = useComponents<OptionType, Group, IsMulti>(
      components
    );

    const isLoading =
      typeof isLoadingProp === "boolean"
        ? isLoadingProp
        : asyncPaginateProps.isLoading;

    const showMessage = error || helperText;

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
                {...rest}
                {...asyncPaginateProps}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                menuPortalTarget={document.body}
                menuPosition="absolute"
                components={{
                  ...processedComponents,
                  LoadingIndicator: () => (
                    <ThreeDotLoader size="h-3 w-3" pace="medium" />
                  ),
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
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (base) => ({
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
  }
);

PaginatedDropdownInput.displayName = "PaginatedDropdownInput";
