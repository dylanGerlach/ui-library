import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckboxInput } from "./checkbox-input";

const meta: Meta<typeof CheckboxInput> = {
  title: "Components/CheckboxInput",
  component: CheckboxInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
    helperText: { control: "text" },
    messageColor: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "destructive",
        "success",
        "warning",
        "error",
        "info",
        "foreground",
        "muted",
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof CheckboxInput>;

// Controlled template for toggling
const ControlledTemplate = (args: any) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  return <CheckboxInput {...args} checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
  render: ControlledTemplate,
  args: {
    label: "Accept terms and conditions",
    checked: false,
  },
};

export const Checked: Story = {
  render: ControlledTemplate,
  args: {
    label: "Subscribe to newsletter",
    checked: true,
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    label: "Disabled option",
    checked: false,
    disabled: true,
  },
};

export const WithError: Story = {
  render: ControlledTemplate,
  args: {
    label: "You must agree",
    checked: false,
    required: true,
    error: "This field is required",
  },
};

export const WithHelperText: Story = {
  render: ControlledTemplate,
  args: {
    label: "Enable notifications",
    helperText: "You can change this later in settings",
  },
};
