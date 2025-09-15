import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "./spinner"

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Tailwind classes to adjust size and color",
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {
    className: "h-6 w-6 text-primary",
  },
}

export const Small: Story = {
  args: {
    className: "h-4 w-4 text-secondary",
  },
}

export const Large: Story = {
  args: {
    className: "h-10 w-10 text-accent",
  },
}

export const Destructive: Story = {
  args: {
    className: "h-6 w-6 text-destructive",
  },
}
