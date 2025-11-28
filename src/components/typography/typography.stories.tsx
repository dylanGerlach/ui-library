import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "label", "caption"],
      description: "Typography variant",
      defaultValue: "p",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "accent", "destructive", "success", "warning", "error", "info", "foreground", "muted"],
      description: "Text color from theme palette",
    },
    href: {
      control: "text",
      description: "Optional href to render as a link",
    },
    active: {
      control: "boolean",
      description: "Whether the text is in an active state",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
  },
};

export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "Heading 3",
  },
};

export const Paragraph: Story = {
  args: {
    variant: "p",
    children: "This is a paragraph of text that demonstrates the typography component.",
  },
};

export const AsLink: Story = {
  args: {
    variant: "p",
    href: "#",
    children: "Link Text",
  },
};

export const ActiveLink: Story = {
  args: {
    variant: "p",
    href: "#",
    active: true,
    children: "Active Link",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="p">Paragraph text</Typography>
      <Typography variant="label">Label text</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="p" href="#">Link text</Typography>
      <Typography variant="p" href="#" active>
        Active link text
      </Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="primary">Primary color</Typography>
      <Typography color="secondary">Secondary color</Typography>
      <Typography color="accent">Accent color</Typography>
      <Typography color="destructive">Destructive color</Typography>
      <Typography color="success">Success color</Typography>
      <Typography color="warning">Warning color</Typography>
      <Typography color="error">Error color</Typography>
      <Typography color="info">Info color</Typography>
      <Typography color="foreground">Foreground color</Typography>
      <Typography color="muted">Muted color</Typography>
    </div>
  ),
};

