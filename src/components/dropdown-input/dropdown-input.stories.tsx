import type { Meta, StoryObj } from "@storybook/react";
import { DropdownInput } from "./dropdown-input";
import { TextInput } from "../text-input/text-input";
import React from "react";

const meta: Meta<typeof DropdownInput> = {
  title: "Components/DropdownInput",
  component: DropdownInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownInput>;

const sampleOptions = [
  { id: "apple", name: "Apple" },
  { id: "banana", name: "Banana" },
  { id: "cherry", name: "Cherry" },
];

const zipOptions = [
  { id: "90210", name: "90210" },
  { id: "10001", name: "10001" },
  { id: "60601", name: "60601" },
  { id: "75201", name: "75201" },
  { id: "98101", name: "98101" },
];

// Helper to make stories interactive
const withControls = (args: any) => ({
  args,
  render: (storyArgs: any) => {
    const [value, setValue] = React.useState(storyArgs.value);

    return (
      <DropdownInput
        {...storyArgs}
        value={value}
        onChange={(val) => {
          setValue(val);
          storyArgs.onChange?.(val);
        }}
      />
    );
  },
});

export const Default: Story = withControls({
  label: "Fruit",
  value: "",
  options: sampleOptions,
});

export const WithError: Story = withControls({
  label: "Fruit",
  value: "",
  options: sampleOptions,
  error: "Please select a fruit",
});

export const WithHelperText: Story = withControls({
  label: "Fruit",
  value: "",
  options: sampleOptions,
  helperText: "Pick your favorite fruit",
});

export const Disabled: Story = withControls({
  label: "Disabled Dropdown",
  value: "",
  options: sampleOptions,
  disabled: true,
});

export const Required: Story = withControls({
  label: "Required Fruit",
  value: "",
  options: sampleOptions,
  required: true,
});

export const ComparisonWithTextInput: Story = {
  render: () => {
    const [dropdownValue, setDropdownValue] = React.useState<
      string | number | null
    >(null);
    const [textValue, setTextValue] = React.useState("");

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Dropdown Input</h3>
            <DropdownInput
              label="Select Option"
              value={dropdownValue}
              onChange={setDropdownValue}
              options={sampleOptions}
              placeholder="Choose an option..."
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Text Input</h3>
            <TextInput
              label="Enter Text"
              value={textValue}
              onChange={setTextValue}
              placeholder="Type something..."
            />
          </div>
        </div>
      </div>
    );
  },
};

const overflowPanelStyles = {
  outer: { backgroundColor: "rgb(31, 41, 55)" as const },
  card: { backgroundColor: "rgb(17, 24, 39)" as const },
  label: { color: "rgb(249, 250, 251)" as const },
  button: {
    backgroundColor: "rgb(31, 41, 55)" as const,
    borderColor: "rgb(75, 85, 99)" as const,
    color: "rgb(249, 250, 251)" as const,
  },
};

function OverflowPanel() {
  const [zip, setZip] = React.useState<string | number | null>(null);
  return (
    <div
      className="max-h-52 w-[320px] overflow-hidden rounded-lg border border-gray-600"
      style={overflowPanelStyles.outer}
    >
      <div className="p-2 space-y-1" style={overflowPanelStyles.outer}>
        <div className="p-3 rounded" style={overflowPanelStyles.card}>
          <label
            className="transition-colors text-sm font-medium block mb-2"
            style={overflowPanelStyles.label}
          >
            Customer Type
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded border transition-opacity hover:opacity-80"
              style={overflowPanelStyles.button}
            >
              Residential
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded border transition-opacity hover:opacity-80"
              style={overflowPanelStyles.button}
            >
              Commercial
            </button>
          </div>
        </div>
        <div className="p-3 rounded" style={overflowPanelStyles.card}>
          <label
            className="transition-colors text-sm font-medium block mb-2"
            style={overflowPanelStyles.label}
          >
            Customer Zip Code
          </label>
          <DropdownInput
            value={zip}
            onChange={setZip}
            options={zipOptions}
            placeholder="Select zip code"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Dropdown inside an overflow container. The menu is portaled to document.body
 * with absolute positioning and high z-index, so it escapes the overflow panel.
 */
export const InsideOverflowContainer: Story = {
  render: () => (
    <div className="p-4">
      <p className="text-sm mb-3 text-gray-600">
        Menu is portaled to document.body with absolute positioning. Open
        &quot;Select zip code&quot; – menu should appear above the panel, not
        clipped.
      </p>
      <OverflowPanel />
    </div>
  ),
};
