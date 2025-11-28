import type { Meta, StoryObj } from "@storybook/react";
import { TextBoxInput } from "./text-box-input";

const meta: Meta<typeof TextBoxInput> = {
  title: "Components/TextBoxInput",
  component: TextBoxInput,
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
    rows: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof TextBoxInput>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your text...",
    inputSize: "md",
  },
};

export const WithError: Story = {
  args: {
    label: "Feedback",
    placeholder: "Write feedback...",
    error: "Feedback is required",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Notes",
    placeholder: "Write your notes here...",
    helperText: "You can resize the box if needed",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Notes",
    value: "This text box is disabled",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Comment",
    placeholder: "Enter comment",
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <TextBoxInput label="Small" placeholder="Small text box" inputSize="sm" />
      <TextBoxInput
        label="Medium"
        placeholder="Medium text box"
        inputSize="md"
      />
      <TextBoxInput label="Large" placeholder="Large text box" inputSize="lg" />
    </div>
  ),
};
