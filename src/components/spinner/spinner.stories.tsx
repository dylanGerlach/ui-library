import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "text",
      description: "Size classes (e.g., 'h-6 w-6')",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "h-6 w-6",
  },
};

export const Small: Story = {
  args: {
    size: "h-4 w-4",
  },
};

export const Large: Story = {
  args: {
    size: "h-10 w-10",
  },
};
