import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "./message";
import { useTheme } from "../../theme/ThemeProvider";

const meta: Meta<typeof Message> = {
  title: "Components/Message",
  component: Message,
  tags: ["autodocs"],
  argTypes: {
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
  render: () => (
    <Message type="success">Operation completed successfully!</Message>
  ),
};

export const Error: Story = {
  render: () => (
    <Message type="error">An error occurred. Please try again.</Message>
  ),
};

export const Info: Story = {
  render: () => <Message type="info">Processing your request...</Message>,
};

export const Default: Story = {
  render: () => <Message>This message defaults to success type</Message>,
};

export const EmptyMessage: Story = {
  render: () => <Message>{""}</Message>,
};

export const AbsolutePositioned: Story = {
  render: () => {
    const theme = useTheme();
    return (
      <div
        className="relative w-full h-32 border rounded-md"
        style={{
          backgroundColor: theme.palette.background.paper,
          borderColor: theme.palette.border,
        }}
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-1.5">
          <Message>This message is absolutely positioned and centered</Message>
        </div>
      </div>
    );
  },
};

export const Inline: Story = {
  render: () => (
    <div className="space-y-4">
      <Message>This is a success message displayed inline</Message>
      <Message type="error">This is an error message displayed inline</Message>
      <Message type="info">This is an info message displayed inline</Message>
    </div>
  ),
};
