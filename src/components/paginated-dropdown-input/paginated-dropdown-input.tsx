import React, { useState, forwardRef } from "react";
import type { ReactElement } from "react";
import type { GroupBase } from "react-select";
import Select from "react-select";
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
  /** Whether to reserve space for messages even when none are shown */
  reserveMessageSpace?: boolean;
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
      reserveMessageSpace = true,
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
        {label && (
          <label className="text-sm font-medium text-foreground block">
            {label}
            {!required && <span className="text-muted"> (optional)</span>}
          </label>
        )}

        <div
          className={clsx(
            "rounded-md  transition-all",
            disabled && "cursor-not-allowed opacity-70",
            className
          )}
        >
          <Select
            {...rest}
            {...asyncPaginateProps}
            components={{
              ...processedComponents,
              LoadingIndicator: () => (
                <ThreeDotLoader size="h-3 w-3" pace="medium" />
              ),
            }}
            classNamePrefix="rs"
            styles={{
              indicatorsContainer: (base) => ({
                ...base,
                color: theme.palette.text.secondary,
              }),
              control: (base, state) => ({
                ...base,
                backgroundColor: theme.palette.background.paper,
                borderRadius: "0.375rem",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: error
                  ? theme.palette.error.main
                  : theme.palette.border,
                boxShadow: error
                  ? `0 0 0 2px ${theme.palette.error.main}`
                  : state.isFocused
                  ? `0 0 0 2px ${theme.palette.primary.main}`
                  : "none",
                "&:hover": {
                  borderColor: error
                    ? theme.palette.error.main
                    : theme.palette.border,
                },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: theme.palette.background.paper,
                border: `2px solid ${theme.palette.border}`,
                borderRadius: "0.375rem",
                marginTop: "0.25rem",
                boxShadow:
                  "0px 4px 6px rgba(0,0,0,0.1), 0px 2px 4px rgba(0,0,0,0.06)",
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
              }),
              placeholder: (base) => ({
                ...base,
                color: theme.palette.text.secondary,
              }),
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
  }
);

PaginatedDropdownInput.displayName = "PaginatedDropdownInput";
