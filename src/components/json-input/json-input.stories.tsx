import type { Meta, StoryObj } from "@storybook/react";
import { JsonInput } from "./json-input";

const meta: Meta<typeof JsonInput> = {
  title: "Components/JsonInput",
  component: JsonInput,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "object" },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof JsonInput>;

export const Default: Story = {
  args: {
    label: "Configuration",
    value: { foo: "bar" },
    helperText: "Enter valid JSON",
    inputSize: "md",
  },
};

export const InvalidJson: Story = {
  render: () => (
    <JsonInput
      label="Invalid Example"
      value={"{foo: bar}" as any}
      helperText="Try fixing this JSON"
    />
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled JSON",
    value: { key: "value" },
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Required JSON",
    placeholder: "Enter JSON here",
    required: true,
  },
};

export const LargeObject: Story = {
  args: {
    label: "Large JSON",
    value: {
      user: { id: 1, name: "Alice" },
      roles: ["admin", "editor"],
      settings: { theme: "dark", notifications: true },
    },
  },
};
