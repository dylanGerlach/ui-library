import { useState, useEffect, forwardRef, useRef } from "react";
import DatePicker from "react-datepicker";
import { TextInput, TextInputProps } from "../text-input/text-input";
import "react-datepicker/dist/react-datepicker.css";

// Override react-datepicker wrapper styles to ensure proper border sizing
const datePickerWrapperStyle = `
  .react-datepicker-wrapper {
    width: 100% !important;
    display: block !important;
    position: relative !important;
  }
  .react-datepicker__input-container {
    width: 100% !important;
    display: block !important;
    position: relative !important;
  }
  .react-datepicker__input-container input {
    width: 100% !important;
    padding-top: 1.25rem !important;
    padding-bottom: 0.625rem !important;
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
    font-size: 1rem !important;
    line-height: 1.5rem !important;
    border-radius: 0.375rem !important;
    background-color: transparent !important;
  }
`;

/**
 * Mode for the date picker - single date or date range.
 */
export type DatePickerMode = "single" | "range";

/**
 * Props for the DateInput component.
 *
 * @interface DateInputProps
 * @extends Omit<TextInputProps, "onChange" | "value">
 */
export interface DateInputProps
  extends Omit<TextInputProps, "onChange" | "value"> {
  /** Whether to select a single date or a date range */
  mode?: DatePickerMode;
  /** Current date value (ISO format string for single, tuple for range) */
  value: string | [string, string];
  /** Callback fired when the date changes */
  onChange: (val: string | [string, string]) => void;
  /** Whether to prevent selecting future dates */
  preventFuture?: boolean;
}

// ✅ Local-safe formatting for backend
function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ✅ Human-friendly display
function formatDisplay(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ✅ Parse YYYY-MM-DD → Date
function parseISODateToLocal(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// ✅ Parse 8-digit string (MMDDYYYY) → Date
function parseDateFromDigits(digits: string): Date | null {
  if (digits.length !== 8) return null;
  const month = parseInt(digits.slice(0, 2), 10);
  const day = parseInt(digits.slice(2, 4), 10);
  const year = parseInt(digits.slice(4, 8), 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
}

// ✅ Extract digits from formatted input
function extractDigits(input: string): string {
  return input.replace(/\D/g, "");
}

function formatDateInput(
  input: string,
  isRange: boolean = false,
  isDeleting: boolean = false
): string {
  const formatSingleDate = (digits: string): string => {
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  if (!isRange) {
    // Single date mode: Extract digits, limit to 8, format with /
    const digits = input.replace(/\D/g, "").slice(0, 8);
    return formatSingleDate(digits);
  }

  // Range mode: Extract all digits (up to 16 for two dates)
  const allDigits = input.replace(/\D/g, "").slice(0, 16);
  const firstDateDigits = allDigits.slice(0, 8);
  const secondDateDigits = allDigits.slice(8, 16);

  const first = formatSingleDate(firstDateDigits);
  const second = formatSingleDate(secondDateDigits);

  const hasSeparator = /[\s\-–—]/.test(input);

  if (secondDateDigits.length > 0) {
    return `${first} – ${second}`;
  }

  if (isDeleting && !secondDateDigits.length) {
    return first;
  }

  if (firstDateDigits.length === 8 && !isDeleting) {
    return `${first} – `;
  }

  if (hasSeparator && firstDateDigits.length > 0) {
    return `${first} – `;
  }

  return first;
}

const DateInputText = forwardRef<
  HTMLInputElement,
  TextInputProps & {
    value?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    isRange?: boolean;
    onDateComplete?: (date: Date, dateIndex?: number) => void;
    onDateDeleted?: (dateIndex?: number) => void;
    onDeletionDetected?: () => void;
  }
>(
  (
    {
      value,
      onClick,
      isRange = false,
      label,
      inputSize = "md",
      onDateComplete,
      onDateDeleted,
      onDeletionDetected,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || "");
    const previousValuePropRef = useRef(value);
    const previousFormattedInputRef = useRef(inputValue);

    // Update internal state when external value changes (from calendar selection)
    useEffect(() => {
      if (value !== previousValuePropRef.current) {
        previousValuePropRef.current = value;
        setInputValue(value || "");
        previousFormattedInputRef.current = value || "";
      }
    }, [value]);

    const handleChange = (val: string) => {
      const previousFormatted = previousFormattedInputRef.current;
      const isDeleting = val.length < previousFormatted.length;

      // Format the input value
      const formatted = formatDateInput(val, isRange, isDeleting);

      // Notify about deletion if detected
      if (isDeleting && onDeletionDetected) {
        onDeletionDetected();
      }

      // Extract digits from current and previous values
      const currentDigits = extractDigits(val);
      const previousDigits = extractDigits(previousFormatted);

      if (!isRange) {
        // Single date mode
        const wasComplete = previousDigits.length === 8;
        const isComplete = currentDigits.length === 8;
        const isDeleted = wasComplete && currentDigits.length === 0;

        if (isDeleted && onDateDeleted) {
          onDateDeleted();
        }

        if (isComplete && !wasComplete) {
          const parsedDate = parseDateFromDigits(currentDigits);
          if (parsedDate && onDateComplete) {
            onDateComplete(parsedDate);
          }
        }
      } else {
        // Range mode: split into first and second date digits
        const firstDigits = currentDigits.slice(0, 8);
        const secondDigits = currentDigits.slice(8, 16);
        const prevFirstDigits = previousDigits.slice(0, 8);
        const prevSecondDigits = previousDigits.slice(8, 16);

        const hadFirstDate = prevFirstDigits.length === 8;
        const hadSecondDate = prevSecondDigits.length === 8;
        const isCompletelyEmpty = currentDigits.length === 0;

        // Handle complete range deletion
        if (isCompletelyEmpty && (hadFirstDate || hadSecondDate)) {
          if (onDateDeleted) {
            onDateDeleted(undefined);
          }
        } else {
          // Check first date deletion (was 8 digits, now 0)
          if (hadFirstDate && firstDigits.length === 0) {
            if (onDateDeleted) {
              onDateDeleted(0);
            }
          }

          // Check second date deletion (was 8 digits, now 0)
          if (hadSecondDate && secondDigits.length === 0) {
            if (onDateDeleted) {
              onDateDeleted(1);
            }
          }
        }

        // Check first date completion (was < 8 digits, now 8)
        if (firstDigits.length === 8 && prevFirstDigits.length < 8) {
          const parsedDate = parseDateFromDigits(firstDigits);
          if (parsedDate && onDateComplete) {
            onDateComplete(parsedDate, 0);
          }
        }

        // Check second date completion (was < 8 digits, now 8)
        if (secondDigits.length === 8 && prevSecondDigits.length < 8) {
          const parsedDate = parseDateFromDigits(secondDigits);
          if (parsedDate && onDateComplete) {
            onDateComplete(parsedDate, 1);
          }
        }
      }

      // Update state
      setInputValue(formatted);
      previousFormattedInputRef.current = formatted;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Prevent form submission and date picker default behavior on Enter
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();

        const allDigits = extractDigits(inputValue);

        if (isRange) {
          // Range mode: ensure both dates are saved if complete
          const firstDateDigits = allDigits.slice(0, 8);
          const secondDateDigits = allDigits.slice(8, 16);

          if (firstDateDigits.length === 8 && secondDateDigits.length === 8) {
            const firstDate = parseDateFromDigits(firstDateDigits);
            const secondDate = parseDateFromDigits(secondDateDigits);

            if (firstDate && secondDate && onDateComplete) {
              onDateComplete(firstDate, 0);
              onDateComplete(secondDate, 1);
            }
          }
        } else {
          // Single date mode: ensure date is saved if complete
          if (allDigits.length === 8) {
            const parsedDate = parseDateFromDigits(allDigits);
            if (parsedDate && onDateComplete) {
              onDateComplete(parsedDate);
            }
          }
        }

        return; // Don't call original onKeyDown to prevent date picker from handling it
      }
      // Call original onKeyDown if provided
      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    return (
      <TextInput
        {...props}
        ref={ref}
        label={label}
        inputSize={inputSize}
        value={inputValue}
        onClick={onClick}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

DateInputText.displayName = "DateInputText";

/**
 * A date input component with a calendar picker interface.
 *
 * Supports single date selection or date ranges. Formats dates in ISO format
 * for backend compatibility while displaying in a human-friendly format.
 * Uses theme colors for styling, so ensure ThemeProvider is set up in your app.
 *
 * @example
 * ```tsx
 * <DateInput
 *   label="Start Date"
 *   value={startDate}
 *   onChange={setStartDate}
 *   preventFuture
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Date range
 * <DateInput
 *   mode="range"
 *   value={[startDate, endDate]}
 *   onChange={([start, end]) => {
 *     setStartDate(start);
 *     setEndDate(end);
 *   }}
 * />
 * ```
 *
 * @param props - DateInput props
 * @returns A date picker component
 */
export const DateInput = ({
  label,
  mode = "single",
  value,
  onChange,
  preventFuture = false,
  disabled,
  error,
  required,
  helperText,
  messageColor,
  ...props
}: DateInputProps) => {
  const today = new Date();

  const [selected, setSelected] = useState<Date | null>(
    mode === "single" && typeof value === "string" && value
      ? parseISODateToLocal(value)
      : null
  );

  const [range, setRange] = useState<[Date | null, Date | null]>(
    mode === "range" && Array.isArray(value)
      ? [
          value[0] ? parseISODateToLocal(value[0]) : null,
          value[1] ? parseISODateToLocal(value[1]) : null,
        ]
      : [null, null]
  );

  // State to control which month is displayed in the calendar
  const [displayMonth, setDisplayMonth] = useState<Date>(
    mode === "single" && selected
      ? selected
      : mode === "range" && range[0]
      ? range[0]
      : today
  );

  // State to control if the calendar is open
  const [isOpen, setIsOpen] = useState(false);

  // Effect to update displayMonth when selected/range changes from typing
  useEffect(() => {
    if (mode === "single" && selected) {
      setDisplayMonth(selected);
    } else if (mode === "range" && range[0]) {
      setDisplayMonth(range[0]);
    }
  }, [selected, range, mode]);

  return (
    <>
      <style>{datePickerWrapperStyle}</style>
      {mode === "single" ? (
        <DatePicker
          selected={selected}
          open={isOpen}
          onCalendarOpen={() => setIsOpen(true)}
          onCalendarClose={() => setIsOpen(false)}
          onKeyDown={(e) => {
            // Prevent date picker from handling Enter key
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onChange={(date: Date | null) => {
            if (date && preventFuture && date > today) return;
            setSelected(date);
            if (date) {
              setDisplayMonth(date); // Update displayed month when calendar date is selected
              setIsOpen(false); // Close calendar when date is selected
            }
            onChange(date ? formatDateToISO(date) : "");
          }}
          onMonthChange={(date: Date) => {
            setDisplayMonth(date); // Keep display month in sync with user navigation
          }}
          onYearChange={(date: Date) => {
            setDisplayMonth(date); // Keep display month in sync with user navigation
          }}
          openToDate={displayMonth}
          maxDate={preventFuture ? today : undefined}
          disabled={disabled}
          customInput={
            <DateInputText
              {...props}
              label={label}
              error={error}
              helperText={helperText}
              required={required}
              disabled={disabled}
              messageColor={messageColor}
              value={selected ? formatDisplay(selected) : ""}
              isRange={false}
              onDateComplete={(date) => {
                if (preventFuture && date > today) {
                  return;
                }
                setSelected(date);
                setDisplayMonth(date); // Navigate calendar to the typed date's month
                setIsOpen(false); // Close calendar when date is typed
                onChange(formatDateToISO(date));
              }}
              onDateDeleted={() => {
                setSelected(null);
                onChange("");
              }}
              onDeletionDetected={() => {
                // Reopen calendar if it's closed when any character is deleted
                if (!isOpen) {
                  setIsOpen(true);
                }
              }}
            />
          }
        />
      ) : (
        <DatePicker
          selectsRange
          startDate={range[0]}
          endDate={range[1]}
          open={isOpen}
          onCalendarOpen={() => setIsOpen(true)}
          onCalendarClose={() => setIsOpen(false)}
          shouldCloseOnSelect={false}
          onChange={(update: [Date | null, Date | null]) => {
            if (update[1] && preventFuture && update[1] > today) return;
            setRange(update);
            // Update displayed month to the most recently selected date
            if (update[1]) {
              setDisplayMonth(update[1]);
              setIsOpen(false); // Close calendar when second date is selected
            } else if (update[0]) {
              setDisplayMonth(update[0]);
              // Keep calendar open after first date selection
            }
            onChange([
              update[0] ? formatDateToISO(update[0]) : "",
              update[1] ? formatDateToISO(update[1]) : "",
            ]);
          }}
          onMonthChange={(date: Date) => {
            setDisplayMonth(date); // Keep display month in sync with user navigation
          }}
          onYearChange={(date: Date) => {
            setDisplayMonth(date); // Keep display month in sync with user navigation
          }}
          openToDate={displayMonth}
          maxDate={preventFuture ? today : undefined}
          disabled={disabled}
          customInput={
            <DateInputText
              {...props}
              label={label}
              error={error}
              helperText={helperText}
              required={required}
              disabled={disabled}
              messageColor={messageColor}
              value={
                range[0] && range[1]
                  ? `${formatDisplay(range[0])} – ${formatDisplay(range[1])}`
                  : ""
              }
              isRange={true}
              onDateComplete={(date, dateIndex) => {
                if (preventFuture && date > today) {
                  return;
                }

                if (dateIndex === 0) {
                  // First date completed
                  const newRange: [Date | null, Date | null] = [date, range[1]];
                  setRange(newRange);
                  setDisplayMonth(date); // Navigate calendar to the typed date's month
                  // Keep calendar open after first date (for range mode)
                  onChange([
                    formatDateToISO(date),
                    range[1] ? formatDateToISO(range[1]) : "",
                  ]);
                } else if (dateIndex === 1) {
                  // Second date completed
                  const newRange: [Date | null, Date | null] = [range[0], date];
                  setRange(newRange);
                  setDisplayMonth(date); // Navigate calendar to the typed date's month
                  setIsOpen(false); // Close calendar when second date is typed
                  onChange([
                    range[0] ? formatDateToISO(range[0]) : "",
                    formatDateToISO(date),
                  ]);
                }
              }}
              onDateDeleted={(dateIndex) => {
                if (dateIndex === undefined) {
                  // Both dates deleted (entire range cleared)
                  const newRange: [Date | null, Date | null] = [null, null];
                  setRange(newRange);
                  onChange(["", ""]);
                } else if (dateIndex === 0) {
                  // First date deleted
                  const newRange: [Date | null, Date | null] = [null, range[1]];
                  setRange(newRange);
                  onChange(["", range[1] ? formatDateToISO(range[1]) : ""]);
                } else if (dateIndex === 1) {
                  // Second date deleted
                  const newRange: [Date | null, Date | null] = [range[0], null];
                  setRange(newRange);
                  onChange([range[0] ? formatDateToISO(range[0]) : "", ""]);
                }
              }}
              onDeletionDetected={() => {
                // Reopen calendar if it's closed when any character is deleted
                if (!isOpen) {
                  setIsOpen(true);
                }
              }}
            />
          }
        />
      )}
    </>
  );
};
