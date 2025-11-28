import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { ShoppingCart } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: "number",
      description: "The count to display",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "destructive"],
      description: "Visual variant",
      defaultValue: "primary",
    },
    max: {
      control: "number",
      description: "Maximum count before showing 'max+'",
    },
    absolute: {
      control: "boolean",
      description: "Whether to position absolutely (for overlays)",
    },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      description: "Position for absolute positioning",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    count: 5,
  },
};

export const WithMax: Story = {
  args: {
    count: 150,
    max: 99,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Badge count={5} variant="primary" />
      <Badge count={3} variant="secondary" />
      <Badge count={7} variant="accent" />
      <Badge count={2} variant="destructive" />
    </div>
  ),
};

export const OverlayOnIcon: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      {/* Easier API - Badge wraps the icon */}
      <Badge count={3} absolute position="top-right">
        <ShoppingCart size={28} className="text-accent" />
      </Badge>
      <Badge count={99} max={99} absolute position="top-right">
        <ShoppingCart size={28} className="text-accent" />
      </Badge>
      <Badge count={150} max={99} absolute position="top-right">
        <ShoppingCart size={28} className="text-accent" />
      </Badge>
      {/* Traditional approach still works */}
      <div className="relative">
        <ShoppingCart size={28} className="text-accent" />
        <Badge count={3} absolute position="top-right" />
      </div>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex gap-8">
        <div className="relative w-16 h-16 bg-card border border-border rounded-md flex items-center justify-center">
          <span className="text-sm">Box</span>
          <Badge count={5} absolute position="top-right" />
        </div>
        <div className="relative w-16 h-16 bg-card border border-border rounded-md flex items-center justify-center">
          <span className="text-sm">Box</span>
          <Badge count={5} absolute position="top-left" />
        </div>
        <div className="relative w-16 h-16 bg-card border border-border rounded-md flex items-center justify-center">
          <span className="text-sm">Box</span>
          <Badge count={5} absolute position="bottom-right" />
        </div>
        <div className="relative w-16 h-16 bg-card border border-border rounded-md flex items-center justify-center">
          <span className="text-sm">Box</span>
          <Badge count={5} absolute position="bottom-left" />
        </div>
      </div>
    </div>
  ),
};

