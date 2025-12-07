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
      description:
        "Border radius of the button (rounded corners). 'full' creates a pill-shaped button.",
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
    pop: {
      control: "boolean",
      description: "Add CTA pop effect (enhanced shadow and hover scale)",
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
        <Button variant="primary" rounded="none">
          None
        </Button>
        <Button variant="primary" rounded="sm">
          Small
        </Button>
        <Button variant="primary" rounded="md">
          Medium
        </Button>
        <Button variant="primary" rounded="lg">
          Large
        </Button>
        <Button variant="primary" rounded="full">
          Pill (Full)
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="secondary" rounded="none">
          None
        </Button>
        <Button variant="secondary" rounded="sm">
          Small
        </Button>
        <Button variant="secondary" rounded="md">
          Medium
        </Button>
        <Button variant="secondary" rounded="lg">
          Large
        </Button>
        <Button variant="secondary" rounded="full">
          Pill (Full)
        </Button>
      </div>
    </div>
  ),
};

// Enhanced story showcasing all variants
export const PopEffect: Story = {
  args: {
    children: "CTA Button with Pop",
    variant: "primary",
    pop: true,
  },
};

export const PopComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted mb-2">Regular Button</p>
        <Button variant="primary">Regular Button</Button>
      </div>
      <div>
        <p className="text-sm text-muted mb-2">Button with Pop Effect</p>
        <Button variant="primary" pop>
          CTA Button with Pop
        </Button>
      </div>
      <div>
        <p className="text-sm text-muted mb-2">All Variants with Pop</p>
        <div className="flex gap-4">
          <Button variant="primary" pop>
            Primary Pop
          </Button>
          <Button variant="secondary" pop>
            Secondary Pop
          </Button>
          <Button variant="accent" pop>
            Accent Pop
          </Button>
          <Button variant="destructive" pop>
            Destructive Pop
          </Button>
        </div>
      </div>
    </div>
  ),
};

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
        <Button variant="primary" rounded="none">
          None
        </Button>
        <Button variant="primary" rounded="md">
          Medium
        </Button>
        <Button variant="primary" rounded="full">
          Pill
        </Button>
      </div>
    </div>
  ),
};

export const ResponsiveSize: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted mb-2">
          Responsive button - resizes at different breakpoints
        </p>
        <Button
          variant="primary"
          size={{
            base: "sm",
            md: "md",
            lg: "lg",
          }}
        >
          Responsive Button (sm → md → lg)
        </Button>
      </div>
      <div>
        <p className="text-sm text-muted mb-2">
          Another example - starts large, gets smaller on mobile
        </p>
        <Button
          variant="secondary"
          size={{
            base: "lg",
            md: "md",
            xl: "sm",
          }}
        >
          Responsive Button (lg → md → sm)
        </Button>
      </div>
      <div>
        <p className="text-sm text-muted mb-2">
          Simple string size (backward compatible)
        </p>
        <Button variant="accent" size="md">
          Standard Size Button
        </Button>
      </div>
    </div>
  ),
};
