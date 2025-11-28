import { useState } from "react";
import {
  TextBoxInput,
  TextBoxInputProps,
} from "../text-box-input/text-box-input";

/**
 * Props for the JsonInput component.
 * 
 * @interface JsonInputProps
 * @extends Omit<TextBoxInputProps, "onChange" | "value">
 */
export interface JsonInputProps
  extends Omit<TextBoxInputProps, "onChange" | "value"> {
  /** Current JSON value (object/array) */
  value?: any;
  /** Callback fired when the JSON value changes (parsed object/array) */
  onChange?: (v: any) => void;
}

/**
 * A JSON input component with syntax validation and formatting.
 * 
 * Extends TextBoxInput with JSON parsing and validation. Automatically formats
 * JSON with 2-space indentation. Validates JSON syntax and shows errors.
 * Uses theme colors for styling, so ensure ThemeProvider is set up in your app.
 * 
 * @example
 * ```tsx
 * <JsonInput
 *   label="Configuration"
 *   value={config}
 *   onChange={setConfig}
 * />
 * ```
 * 
 * @param props - JsonInput props
 * @returns A JSON textarea with validation
 */
export function JsonInput({
  value,
  onChange,
  required,
  ...props
}: JsonInputProps) {
  const [text, setText] = useState(value ? JSON.stringify(value, null, 2) : "");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = (raw: string) => {
    setText(raw);

    // Empty is okay if not required → {}
    if (raw.trim() === "") {
      if (required) {
        setError("JSON is required");
        onChange?.(undefined); // don’t send anything when required but empty
      } else {
        setError(undefined);
        onChange?.({});
      }
      return;
    }

    // Otherwise validate JSON
    try {
      const parsed = JSON.parse(raw);
      setError(undefined);
      onChange?.(parsed);
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <TextBoxInput
      {...props}
      id={props.id ?? "json-input"}
      value={text}
      error={error ?? props.error}
      onChange={handleChange}
      inputSize={props.inputSize ?? "md"}
      required={required}
    />
  );
}
