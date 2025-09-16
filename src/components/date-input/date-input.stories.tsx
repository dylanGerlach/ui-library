import type { Meta, StoryObj } from "@storybook/react";
import { DateInput } from "./date-input";

const meta: Meta<typeof DateInput> = {
  title: "Components/DateInput",
  component: DateInput,
  tags: ["autodocs"],
  render: (args) => (
    <div style={{ height: "350px", padding: "2rem" }}>
      <DateInput {...args} />
    </div>
  ),
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    preventFuture: { control: "boolean" },
    mode: {
      control: "select",
      options: ["single", "range"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Single: Story = {
  args: {
    label: "Select a Date",
    mode: "single",
    value: "",
    onChange: (val) => console.log("Single date:", val),
  },
};

export const Range: Story = {
  args: {
    label: "Select a Date Range",
    mode: "range",
    value: ["", ""],
    onChange: (val) => console.log("Range:", val),
  },
};

export const WithError: Story = {
  args: {
    label: "Birthdate",
    mode: "single",
    value: "",
    error: "Invalid date selected",
    onChange: (val) => console.log("Error example:", val),
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Event Date",
    mode: "single",
    value: "",
    helperText: "Pick a date for your event",
    onChange: (val) => console.log("Helper example:", val),
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Date Picker",
    mode: "single",
    value: "",
    disabled: true,
    onChange: (val) => console.log("Disabled example:", val),
  },
};

export const PreventFuture: Story = {
  args: {
    label: "Past Date Only",
    mode: "single",
    value: "",
    preventFuture: true,
    onChange: (val) => console.log("Prevent future example:", val),
  },
};

export const ModesShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <DateInput
        label="Single Date"
        mode="single"
        value=""
        onChange={(val) => console.log("Single showcase:", val)}
      />
      <DateInput
        label="Date Range"
        mode="range"
        value={["", ""]}
        onChange={(val) => console.log("Range showcase:", val)}
      />
    </div>
  ),
};
