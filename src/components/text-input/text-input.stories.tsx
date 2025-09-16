import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail } from "lucide-react";
import { TextInput } from "./text-input";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
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
    startIcon: { control: false },
    endIcon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    inputSize: "md",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "Invalid email address",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Phone Number",
    placeholder: "Enter your phone number",
    helperText: "Format: (123) 456-7890",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    value: "Can’t edit me",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    required: true,
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    placeholder: "Search here...",
    startIcon: <Search className="w-4 h-4" />,
    endIcon: <Mail className="w-4 h-4" />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <TextInput label="Small" placeholder="Small input" inputSize="sm" />
      <TextInput label="Medium" placeholder="Medium input" inputSize="md" />
      <TextInput label="Large" placeholder="Large input" inputSize="lg" />
    </div>
  ),
};
