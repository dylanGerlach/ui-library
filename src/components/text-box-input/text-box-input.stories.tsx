import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextBoxInput } from "./text-box-input";
import { useTheme } from "../../theme/ThemeProvider";

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
    backgroundColor: { control: "text" },
    borderColor: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "error",
        "success",
        "warning",
        "info",
        "text.secondary",
        "border",
      ],
    },
    showBorderOnHover: { control: "boolean" },
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

export const Minimal: Story = {
  render: () => {
    const theme = useTheme();
    const [description1, setDescription1] = useState("");
    const [description2, setDescription2] = useState("");
    const [description3, setDescription3] = useState("");

    return (
      <div className="space-y-8 max-w-2xl">
        <div>
          <p
            className="text-sm mb-4"
            style={{ color: theme.palette.text.secondary }}
          >
            Minimal textarea inputs that blend with the background. Border only
            appears on hover or focus.
          </p>
        </div>
        <div className="space-y-4">
          <TextBoxInput
            label="Description"
            placeholder="Enter description..."
            value={description1}
            onChange={setDescription1}
            backgroundColor="transparent"
            showBorderOnHover={true}
            rows={4}
          />
          <TextBoxInput
            placeholder="No label - minimal style"
            value={description2}
            onChange={setDescription2}
            backgroundColor="transparent"
            showBorderOnHover={true}
            rows={3}
          />
          <TextBoxInput
            label="Primary Border Color"
            placeholder="Hover to see primary border..."
            value={description3}
            onChange={setDescription3}
            backgroundColor="transparent"
            borderColor="primary"
            showBorderOnHover={true}
            rows={4}
          />
          <TextBoxInput
            label="Accent Border Color"
            placeholder="Hover to see accent border..."
            backgroundColor="transparent"
            borderColor="accent"
            showBorderOnHover={true}
            rows={4}
          />
        </div>
        <div className="p-4 rounded-md" style={{ backgroundColor: theme.palette.background.paper }}>
          <p className="text-sm mb-4" style={{ color: theme.palette.text.secondary }}>
            Minimal textarea on a colored background:
          </p>
          <TextBoxInput
            placeholder="Blends with background..."
            backgroundColor="transparent"
            showBorderOnHover={true}
            rows={3}
          />
        </div>
      </div>
    );
  },
};
