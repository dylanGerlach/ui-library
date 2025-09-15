import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import EmailInput from "./email-input";

const meta: Meta<typeof EmailInput> = {
  title: "Components/EmailInput",
  component: EmailInput,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    validate: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof EmailInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <EmailInput
        label="Email"
        placeholder="you@example.com"
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("not-an-email");
    return (
      <EmailInput
        label="Email"
        placeholder="you@example.com"
        value={value}
        onChange={setValue}
        error="This is an externally set error"
      />
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <EmailInput
        label="Email"
        placeholder="you@example.com"
        value={value}
        onChange={setValue}
        validate
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    value: "disabled@example.com",
    disabled: true,
  },
};
