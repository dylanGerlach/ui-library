import { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { TextInput, TextInputProps } from "../text-input/text-input";
import "react-datepicker/dist/react-datepicker.css";

export type DatePickerMode = "single" | "range";

export interface DateInputProps
  extends Omit<TextInputProps, "onChange" | "value"> {
  mode?: DatePickerMode;
  value: string | [string, string];
  onChange: (val: string | [string, string]) => void;
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

// Bridge between react-datepicker and our TextInput
const DateInputText = forwardRef<
  HTMLInputElement,
  TextInputProps & {
    value?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
  }
>(({ value, onClick, ...props }, ref) => (
  <TextInput {...props} ref={ref} value={value} onClick={onClick} readOnly />
));

DateInputText.displayName = "DateInputText";

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
  className,
  messageColor,
  reserveMessageSpace = true,
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

  // sync external values
  useEffect(() => {
    if (mode === "single" && typeof value === "string") {
      setSelected(value ? parseISODateToLocal(value) : null);
    }
    if (mode === "range" && Array.isArray(value)) {
      setRange([
        value[0] ? parseISODateToLocal(value[0]) : null,
        value[1] ? parseISODateToLocal(value[1]) : null,
      ]);
    }
  }, [value, mode]);

  return mode === "single" ? (
    <DatePicker
      selected={selected}
      onChange={(date: Date | null) => {
        if (date && preventFuture && date > today) return;
        setSelected(date);
        onChange(date ? formatDateToISO(date) : "");
      }}
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
          reserveMessageSpace={reserveMessageSpace}
          className={className}
          value={selected ? formatDisplay(selected) : ""}
        />
      }
    />
  ) : (
    <DatePicker
      selectsRange
      startDate={range[0]}
      endDate={range[1]}
      onChange={(update: [Date | null, Date | null]) => {
        if (update[1] && preventFuture && update[1] > today) return;
        setRange(update);
        onChange([
          update[0] ? formatDateToISO(update[0]) : "",
          update[1] ? formatDateToISO(update[1]) : "",
        ]);
      }}
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
          reserveMessageSpace={reserveMessageSpace}
          className={className}
          value={
            range[0] && range[1]
              ? `${formatDisplay(range[0])} – ${formatDisplay(range[1])}`
              : ""
          }
        />
      }
    />
  );
};
