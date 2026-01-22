import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Accordion } from "./accordion";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import { useTheme } from "../../theme/ThemeProvider";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: false,
      description: "Array of accordion items to display",
    },
    allowMultiple: {
      control: "boolean",
      description: "Whether multiple items can be expanded at once",
    },
    bordered: {
      control: "boolean",
      description: "Whether to show borders between items",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  args: {
    items: [
      {
        header: "What is this component?",
        children:
          "This is an accordion component that allows you to display collapsible content sections. It's perfect for FAQs, settings panels, and organized content.",
      },
      {
        header: "How do I use it?",
        children:
          "Simply provide an array of items, each with a header and children. The accordion handles the expand/collapse behavior automatically.",
      },
      {
        header: "Can I customize it?",
        children:
          "Yes! You can control individual items, allow multiple items to be open at once, customize borders, and adjust the size.",
      },
    ],
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <Accordion
      items={[
        {
          header: (
            <Typography variant="h6" className="font-semibold">
              Getting Started
            </Typography>
          ),
          children: (
            <div className="space-y-2">
              <Typography variant="p">
                Follow these steps to get started with the UI library:
              </Typography>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>Install the package</li>
                <li>Set up ThemeProvider</li>
                <li>Import components</li>
                <li>Start building!</li>
              </ol>
            </div>
          ),
        },
        {
          header: (
            <Typography variant="h6" className="font-semibold">
              Advanced Usage
            </Typography>
          ),
          children: (
            <div className="space-y-3">
              <Typography variant="p">
                For advanced usage, you can control the accordion state
                programmatically.
              </Typography>
              <Button variant="primary" size="sm">
                Learn More
              </Button>
            </div>
          ),
        },
        {
          header: (
            <Typography variant="h6" className="font-semibold">
              Examples
            </Typography>
          ),
          children: (
            <div className="space-y-2">
              <Typography variant="p">
                Check out the Storybook stories for more examples of how to use
                this component.
              </Typography>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    items: [
      {
        header: "Section 1",
        children: "You can expand multiple sections at once when allowMultiple is enabled.",
      },
      {
        header: "Section 2",
        children: "This section can be open while Section 1 is also open.",
      },
      {
        header: "Section 3",
        children: "All three sections can be expanded simultaneously.",
      },
    ],
  },
};

export const SingleItemOnly: Story = {
  args: {
    allowMultiple: false,
    items: [
      {
        header: "Section 1",
        children: "When allowMultiple is false, only one section can be open at a time.",
      },
      {
        header: "Section 2",
        children: "Opening this section will close Section 1.",
      },
      {
        header: "Section 3",
        children: "Opening this section will close any other open section.",
      },
    ],
  },
};

export const NoBorders: Story = {
  args: {
    bordered: false,
    items: [
      {
        header: "Borderless Accordion",
        children: "This accordion has no borders for a cleaner look.",
      },
      {
        header: "Section 2",
        children: "The items are still visually separated by spacing.",
      },
      {
        header: "Section 3",
        children: "Perfect for minimal designs.",
      },
    ],
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const items = [
      {
        header: "Small Size",
        children: "This accordion uses the small size variant.",
      },
      {
        header: "Medium Size",
        children: "This accordion uses the medium size variant (default).",
      },
      {
        header: "Large Size",
        children: "This accordion uses the large size variant.",
      },
    ];

    return (
      <div className="space-y-4">
        <div>
          <Typography variant="h6" className="mb-2">
            Small
          </Typography>
          <Accordion items={items} size="sm" />
        </div>
        <div>
          <Typography variant="h6" className="mb-2">
            Medium (Default)
          </Typography>
          <Accordion items={items} size="md" />
        </div>
        <div>
          <Typography variant="h6" className="mb-2">
            Large
          </Typography>
          <Accordion items={items} size="lg" />
        </div>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [expandedItems, setExpandedItems] = React.useState<Set<number>>(
      new Set([0])
    );

    const items = [
      {
        header: "Controlled Item 1",
        children: "This item's state is controlled externally.",
        expanded: expandedItems.has(0),
        onExpandedChange: (expanded) => {
          const newSet = new Set(expandedItems);
          if (expanded) {
            newSet.add(0);
          } else {
            newSet.delete(0);
          }
          setExpandedItems(newSet);
        },
      },
      {
        header: "Controlled Item 2",
        children: "You can programmatically control which items are expanded.",
        expanded: expandedItems.has(1),
        onExpandedChange: (expanded) => {
          const newSet = new Set(expandedItems);
          if (expanded) {
            newSet.add(1);
          } else {
            newSet.delete(1);
          }
          setExpandedItems(newSet);
        },
      },
      {
        header: "Controlled Item 3",
        children: "Use the buttons below to control the accordion state.",
        expanded: expandedItems.has(2),
        onExpandedChange: (expanded) => {
          const newSet = new Set(expandedItems);
          if (expanded) {
            newSet.add(2);
          } else {
            newSet.delete(2);
          }
          setExpandedItems(newSet);
        },
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setExpandedItems(new Set([0, 1, 2]))}
          >
            Expand All
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExpandedItems(new Set())}
          >
            Collapse All
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={() => setExpandedItems(new Set([0]))}
          >
            Expand First Only
          </Button>
        </div>
        <Accordion items={items} allowMultiple />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    items: [
      {
        header: "Enabled Item",
        children: "This item can be expanded and collapsed normally.",
      },
      {
        header: "Disabled Item",
        children: "This item is disabled and cannot be interacted with.",
        disabled: true,
      },
      {
        header: "Another Enabled Item",
        children: "This item works normally.",
      },
    ],
  },
};

export const FAQ: Story = {
  render: () => (
    <Accordion
      items={[
        {
          header: "How do I install this library?",
          children:
            "You can install it via npm: npm install dylangerlach-ui-library",
        },
        {
          header: "Do I need to set up a theme?",
          children:
            "Yes, you must wrap your app with ThemeProvider and define a palette using createTheme().",
        },
        {
          header: "Are the components accessible?",
          children:
            "Yes, all components follow accessibility best practices and include proper ARIA attributes.",
        },
        {
          header: "Can I customize the colors?",
          children:
            "Yes! You can customize the theme palette to match your brand colors.",
        },
        {
          header: "Is TypeScript supported?",
          children:
            "Yes, the library is fully typed with TypeScript and exports all types.",
        },
      ]}
    />
  ),
};
