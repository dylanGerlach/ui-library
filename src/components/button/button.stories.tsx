import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "destructive"],
      description: "Visual style of the button",
      defaultValue: "primary",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the button",
      defaultValue: "md",
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "Border radius of the button (rounded corners). 'full' creates a pill-shaped button.",
      defaultValue: "md",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    isLoading: {
      control: "boolean",
      description: "Show loading state (3-dot loader replaces content)",
    },
    fullWidth: {
      control: "boolean",
      description: "Make the button span full container width",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the optional icon",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Accent: Story = {
  args: {
    children: "Accent Button",
    variant: "accent",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "primary",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    variant: "primary",
    isLoading: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    variant: "secondary",
    fullWidth: true,
  },
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Button variant="primary" rounded="none">None</Button>
        <Button variant="primary" rounded="sm">Small</Button>
        <Button variant="primary" rounded="md">Medium</Button>
        <Button variant="primary" rounded="lg">Large</Button>
        <Button variant="primary" rounded="full">Pill (Full)</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="secondary" rounded="none">None</Button>
        <Button variant="secondary" rounded="sm">Small</Button>
        <Button variant="secondary" rounded="md">Medium</Button>
        <Button variant="secondary" rounded="lg">Large</Button>
        <Button variant="secondary" rounded="full">Pill (Full)</Button>
      </div>
    </div>
  ),
};

// Enhanced story showcasing all variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" rounded="none">None</Button>
        <Button variant="primary" rounded="md">Medium</Button>
        <Button variant="primary" rounded="full">Pill</Button>
      </div>
    </div>
  ),
};
