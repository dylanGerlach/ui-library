import type { Meta, StoryObj } from "@storybook/react";
import { ThreeDotLoader } from "./three-dot-loader";

const meta: Meta<typeof ThreeDotLoader> = {
  title: "Components/ThreeDotLoader",
  component: ThreeDotLoader,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "text",
      description: "Size classes (e.g., 'h-4 w-4')",
    },
    pace: {
      control: { type: "radio" },
      options: ["slow", "medium", "fast"],
      description: "Animation pacing of the dots",
      defaultValue: "medium",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThreeDotLoader>;

export const Default: Story = {
  args: {
    size: "h-4 w-4",
    pace: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "h-6 w-6",
    pace: "medium",
  },
};

export const Small: Story = {
  args: {
    size: "h-3 w-3",
    pace: "medium",
  },
};

export const Slow: Story = {
  args: {
    size: "h-4 w-4",
    pace: "slow",
  },
};

export const Fast: Story = {
  args: {
    size: "h-4 w-4",
    pace: "fast",
  },
};
