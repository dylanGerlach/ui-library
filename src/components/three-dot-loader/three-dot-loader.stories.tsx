import type { Meta, StoryObj } from "@storybook/react"
import { ThreeDotLoader } from "./three-dot-loader"

const meta: Meta<typeof ThreeDotLoader> = {
  title: "Components/ThreeDotLoader",
  component: ThreeDotLoader,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Tailwind/utility classes for size or color overrides",
    },
    pace: {
      control: { type: "radio" },
      options: ["slow", "medium", "fast"],
      description: "Animation pacing of the dots",
      defaultValue: "medium",
    },
  },
}

export default meta
type Story = StoryObj<typeof ThreeDotLoader>

export const Default: Story = {
  args: {
    className: "text-primary",
    pace: "medium",
  },
}

export const Secondary: Story = {
  args: {
    className: "text-secondary",
    pace: "medium",
  },
}

export const Large: Story = {
  args: {
    className: "text-accent text-lg",
    pace: "medium",
  },
}

export const Small: Story = {
  args: {
    className: "text-destructive text-sm",
    pace: "medium",
  },
}

export const Slow: Story = {
  args: {
    className: "text-primary",
    pace: "slow",
  },
}

export const Fast: Story = {
  args: {
    className: "text-primary",
    pace: "fast",
  },
}
