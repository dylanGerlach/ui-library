import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Palette } from "lucide-react"; // example trigger icon
import { ColorSelector } from "./color-selector";

const meta: Meta<typeof ColorSelector> = {
  title: "Components/ColorSelector",
  component: ColorSelector,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "color" }, // Storybook color picker control
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ColorSelector>;

// Controlled wrapper template
const ControlledTemplate = (args: any) => {
  const [color, setColor] = useState(args.value || "#000000");
  return <ColorSelector {...args} value={color} onChange={setColor} />;
};

export const Default: Story = {
  render: ControlledTemplate,
  args: {
    label: "Choose a color",
    value: "#000000",
  },
};

export const WithIconTrigger: Story = {
  render: ControlledTemplate,
  args: {
    label: "Pick theme color",
    trigger: <Palette size={18} />,
    value: "#FF0000",
  },
};

export const WithTextTrigger: Story = {
  render: ControlledTemplate,
  args: {
    label: "Background",
    trigger: <span className="text-sm">Pick Color</span>,
    value: "#00FF00",
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    label: "Disabled Selector",
    value: "#888888",
    disabled: true,
  },
};
