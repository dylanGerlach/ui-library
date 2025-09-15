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
