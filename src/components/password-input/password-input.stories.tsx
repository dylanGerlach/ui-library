import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import PasswordInput from "./password-input";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showStrength: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("123");
    return (
      <PasswordInput
        label="Password"
        value={value}
        onChange={setValue}
        error="Password is too short"
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <PasswordInput
        label="Password"
        placeholder="Enter a strong password"
        helperText="Must be at least 8 characters with a number"
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithStrengthMeter: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={value}
        onChange={setValue}
        showStrength
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Password",
    value: "password123",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="space-y-4">
        <PasswordInput
          label="Small"
          placeholder="Small password input"
          value={value}
          onChange={setValue}
          inputSize="sm"
        />
        <PasswordInput
          label="Medium"
          placeholder="Medium password input"
          value={value}
          onChange={setValue}
          inputSize="md"
        />
        <PasswordInput
          label="Large"
          placeholder="Large password input"
          value={value}
          onChange={setValue}
          inputSize="lg"
        />
      </div>
    );
  },
};
