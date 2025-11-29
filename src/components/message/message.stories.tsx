import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "./message";

const meta: Meta<typeof Message> = {
  title: "Components/Message",
  component: Message,
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "The message text to display",
    },
    type: {
      control: "select",
      options: ["success", "error", "info"],
      description: "The type of message",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Success: Story = {
  args: {
    message: "Operation completed successfully!",
    type: "success",
  },
};

export const Error: Story = {
  args: {
    message: "An error occurred. Please try again.",
    type: "error",
  },
};

export const Info: Story = {
  args: {
    message: "Processing your request...",
    type: "info",
  },
};

export const Default: Story = {
  args: {
    message: "This message defaults to success type",
  },
};

export const EmptyMessage: Story = {
  args: {
    message: "",
  },
};

export const AbsolutePositioned: Story = {
  render: () => (
    <div className="relative w-full h-32 bg-card border border-border rounded-md">
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-1.5">
        <Message message="This message is absolutely positioned and centered" />
      </div>
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <div className="space-y-4">
      <Message message="This is a success message displayed inline" />
      <Message
        message="This is an error message displayed inline"
        type="error"
      />
      <Message message="This is an info message displayed inline" type="info" />
    </div>
  ),
};
