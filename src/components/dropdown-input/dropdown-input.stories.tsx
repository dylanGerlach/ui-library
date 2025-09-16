import type { Meta, StoryObj } from "@storybook/react";
import { DropdownInput } from "./dropdown-input";
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
