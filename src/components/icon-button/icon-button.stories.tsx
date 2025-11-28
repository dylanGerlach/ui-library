import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { IconButton } from "./icon-button";
import { Heart } from "lucide-react";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    active: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

/**
 * Static example — default inactive state
 */
export const Default: Story = {
  args: {
    children: <Heart size={18} />,
    label: "Favorite",
    disabled: false,
    active: false,
    onClick: () => {},
  },
};

/**
 * Static example — active state
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
 */
export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    return (
      <IconButton
        label="Click to toggle"
        active={active}
        onClick={() => setActive((prev) => !prev)}
      >
        <Heart size={18} />
      </IconButton>
    );
  },
};
