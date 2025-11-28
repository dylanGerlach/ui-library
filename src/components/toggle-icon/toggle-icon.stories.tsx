import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ToggleIcon } from "./toggle-icon";
import { Heart } from "lucide-react";

const meta: Meta<typeof ToggleIcon> = {
  title: "Components/ToggleIcon",
  component: ToggleIcon,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleIcon>;

/**
 * Static example — always inactive
 */
export const Default: Story = {
  args: {
    icon: <Heart size={18} />,
    active: false,
    label: "Toggle favorite",
    disabled: false,
    onToggle: () => {},
  },
};

/**
 * Static example — always active
 */
export const Active: Story = {
  args: {
    ...Default.args,
    active: true,
  },
};

/**
 * Static example — disabled state
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

/**
 * Interactive example — click to toggle border on/off
 * Uses local state (not args) so it works reliably
 */
export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    return (
      <ToggleIcon
        icon={<Heart size={18} />}
        label="Click to toggle"
        active={active}
        onToggle={() => setActive((prev) => !prev)}
      />
    );
  },
};
