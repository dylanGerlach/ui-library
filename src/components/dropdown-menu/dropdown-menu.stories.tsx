import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DropdownMenu } from "./dropdown-menu";
import { Button } from "../button/button";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Side of the trigger where the menu appears",
      defaultValue: "bottom",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of the menu relative to the trigger",
      defaultValue: "start",
    },
    sideOffset: {
      control: "number",
      description: "Distance in pixels from the trigger",
      defaultValue: 5,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

// Wrapper component to handle state
function DropdownMenuWrapper(props: Partial<typeof DropdownMenu>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-64">
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={[
          {
            id: "1",
            label: "Edit",
            onClick: () => {
              console.log("Edit clicked");
              setOpen(false);
            },
          },
          {
            id: "2",
            label: "Duplicate",
            onClick: () => {
              console.log("Duplicate clicked");
              setOpen(false);
            },
          },
          {
            id: "3",
            label: "Archive",
            onClick: () => {
              console.log("Archive clicked");
              setOpen(false);
            },
            separator: true,
          },
          {
            id: "4",
            label: "Delete",
            variant: "danger",
            onClick: () => {
              console.log("Delete clicked");
              setOpen(false);
            },
          },
        ]}
        open={open}
        onOpenChange={setOpen}
        {...props}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DropdownMenuWrapper />,
};

export const WithIcons: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex justify-center items-center h-64">
        <DropdownMenu
          trigger={<Button>Actions</Button>}
          items={[
            {
              id: "1",
              label: "Edit",
              icon: <span>✏️</span>,
              onClick: () => {
                console.log("Edit clicked");
                setOpen(false);
              },
            },
            {
              id: "2",
              label: "Copy",
              icon: <span>📋</span>,
              onClick: () => {
                console.log("Copy clicked");
                setOpen(false);
              },
            },
            {
              id: "3",
              label: "Share",
              icon: <span>🔗</span>,
              onClick: () => {
                console.log("Share clicked");
                setOpen(false);
              },
              separator: true,
            },
            {
              id: "4",
              label: "Delete",
              icon: <span>🗑️</span>,
              variant: "danger",
              onClick: () => {
                console.log("Delete clicked");
                setOpen(false);
              },
            },
          ]}
          open={open}
          onOpenChange={setOpen}
          side="bottom"
          align="start"
        />
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex justify-center items-center h-64">
        <DropdownMenu
          trigger={<Button>Options</Button>}
          items={[
            {
              id: "1",
              label: "Edit",
              onClick: () => {
                console.log("Edit clicked");
                setOpen(false);
              },
            },
            {
              id: "2",
              label: "Download",
              onClick: () => {
                console.log("Download clicked");
                setOpen(false);
              },
              disabled: true,
            },
            {
              id: "3",
              label: "Share",
              onClick: () => {
                console.log("Share clicked");
                setOpen(false);
              },
              disabled: true,
            },
            {
              id: "4",
              label: "Delete",
              variant: "danger",
              onClick: () => {
                console.log("Delete clicked");
                setOpen(false);
              },
            },
          ]}
          open={open}
          onOpenChange={setOpen}
          side="bottom"
        />
      </div>
    );
  },
};

export const WithActiveItem: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("grid");

    return (
      <div className="flex justify-center items-center h-64">
        <DropdownMenu
          trigger={<Button>View: {selected}</Button>}
          items={[
            {
              id: "1",
              label: "Grid View",
              variant: selected === "grid" ? "active" : "default",
              onClick: () => {
                setSelected("grid");
                setOpen(false);
              },
            },
            {
              id: "2",
              label: "List View",
              variant: selected === "list" ? "active" : "default",
              onClick: () => {
                setSelected("list");
                setOpen(false);
              },
            },
            {
              id: "3",
              label: "Compact View",
              variant: selected === "compact" ? "active" : "default",
              onClick: () => {
                setSelected("compact");
                setOpen(false);
              },
            },
          ]}
          open={open}
          onOpenChange={setOpen}
          side="bottom"
        />
      </div>
    );
  },
};

export const DifferentPositions: Story = {
  render: () => {
    const [openTop, setOpenTop] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);
    const [openRight, setOpenRight] = useState(false);

    const items = [
      {
        id: "1",
        label: "Option 1",
        onClick: () => console.log("Option 1"),
      },
      {
        id: "2",
        label: "Option 2",
        onClick: () => console.log("Option 2"),
      },
      {
        id: "3",
        label: "Option 3",
        onClick: () => console.log("Option 3"),
      },
    ];

    return (
      <div className="flex justify-center items-center h-96 gap-8">
        <DropdownMenu
          trigger={<Button>Top</Button>}
          items={items}
          open={openTop}
          onOpenChange={setOpenTop}
          side="top"
        />
        <DropdownMenu
          trigger={<Button>Bottom</Button>}
          items={items}
          open={openBottom}
          onOpenChange={setOpenBottom}
          side="bottom"
        />
        <DropdownMenu
          trigger={<Button>Left</Button>}
          items={items}
          open={openLeft}
          onOpenChange={setOpenLeft}
          side="left"
        />
        <DropdownMenu
          trigger={<Button>Right</Button>}
          items={items}
          open={openRight}
          onOpenChange={setOpenRight}
          side="right"
        />
      </div>
    );
  },
};

export const WithSubmenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex justify-center items-center h-96">
        <DropdownMenu
          trigger={<Button>File Menu</Button>}
          items={[
            {
              id: "1",
              label: "New",
              icon: <span>📄</span>,
              children: [
                {
                  id: "1-1",
                  label: "Document",
                  onClick: () => {
                    console.log("New Document");
                    setOpen(false);
                  },
                },
                {
                  id: "1-2",
                  label: "Spreadsheet",
                  onClick: () => {
                    console.log("New Spreadsheet");
                    setOpen(false);
                  },
                },
                {
                  id: "1-3",
                  label: "Presentation",
                  onClick: () => {
                    console.log("New Presentation");
                    setOpen(false);
                  },
                },
              ],
            },
            {
              id: "2",
              label: "Open",
              icon: <span>📂</span>,
              onClick: () => {
                console.log("Open");
                setOpen(false);
              },
            },
            {
              id: "3",
              label: "Save",
              icon: <span>💾</span>,
              onClick: () => {
                console.log("Save");
                setOpen(false);
              },
              separator: true,
            },
            {
              id: "4",
              label: "Export",
              icon: <span>📤</span>,
              children: [
                {
                  id: "4-1",
                  label: "PDF",
                  onClick: () => {
                    console.log("Export as PDF");
                    setOpen(false);
                  },
                },
                {
                  id: "4-2",
                  label: "PNG",
                  onClick: () => {
                    console.log("Export as PNG");
                    setOpen(false);
                  },
                },
                {
                  id: "4-3",
                  label: "SVG",
                  onClick: () => {
                    console.log("Export as SVG");
                    setOpen(false);
                  },
                },
              ],
            },
          ]}
          open={open}
          onOpenChange={setOpen}
          side="bottom"
        />
      </div>
    );
  },
};

export const MultiLevelSubmenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex justify-center items-center h-96">
        <DropdownMenu
          trigger={<Button>Nested Menus</Button>}
          items={[
            {
              id: "1",
              label: "File",
              children: [
                {
                  id: "1-1",
                  label: "New",
                  children: [
                    {
                      id: "1-1-1",
                      label: "From Template",
                      children: [
                        {
                          id: "1-1-1-1",
                          label: "Blank",
                          onClick: () => {
                            console.log("New from Blank Template");
                            setOpen(false);
                          },
                        },
                        {
                          id: "1-1-1-2",
                          label: "Resume",
                          onClick: () => {
                            console.log("New from Resume Template");
                            setOpen(false);
                          },
                        },
                        {
                          id: "1-1-1-3",
                          label: "Letter",
                          onClick: () => {
                            console.log("New from Letter Template");
                            setOpen(false);
                          },
                        },
                      ],
                    },
                    {
                      id: "1-1-2",
                      label: "From Scratch",
                      onClick: () => {
                        console.log("New from Scratch");
                        setOpen(false);
                      },
                    },
                  ],
                },
                {
                  id: "1-2",
                  label: "Open",
                  onClick: () => {
                    console.log("Open");
                    setOpen(false);
                  },
                },
              ],
            },
            {
              id: "2",
              label: "Edit",
              children: [
                {
                  id: "2-1",
                  label: "Copy",
                  onClick: () => {
                    console.log("Copy");
                    setOpen(false);
                  },
                },
                {
                  id: "2-2",
                  label: "Paste",
                  onClick: () => {
                    console.log("Paste");
                    setOpen(false);
                  },
                },
              ],
            },
            {
              id: "3",
              label: "View",
              children: [
                {
                  id: "3-1",
                  label: "Zoom",
                  children: [
                    {
                      id: "3-1-1",
                      label: "Zoom In",
                      onClick: () => {
                        console.log("Zoom In");
                        setOpen(false);
                      },
                    },
                    {
                      id: "3-1-2",
                      label: "Zoom Out",
                      onClick: () => {
                        console.log("Zoom Out");
                        setOpen(false);
                      },
                    },
                    {
                      id: "3-1-3",
                      label: "Reset",
                      onClick: () => {
                        console.log("Reset Zoom");
                        setOpen(false);
                      },
                    },
                  ],
                },
                {
                  id: "3-2",
                  label: "Full Screen",
                  onClick: () => {
                    console.log("Full Screen");
                    setOpen(false);
                  },
                },
              ],
            },
          ]}
          open={open}
          onOpenChange={setOpen}
          side="bottom"
        />
      </div>
    );
  },
};

export const SubmenuWithVariants: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex justify-center items-center h-96">
        <DropdownMenu
          trigger={<Button>Admin Actions</Button>}
          items={[
            {
              id: "1",
              label: "User Management",
              icon: <span>👥</span>,
              children: [
                {
                  id: "1-1",
                  label: "Add User",
                  icon: <span>➕</span>,
                  onClick: () => {
                    console.log("Add User");
                    setOpen(false);
                  },
                },
                {
                  id: "1-2",
                  label: "Edit User",
                  icon: <span>✏️</span>,
                  onClick: () => {
                    console.log("Edit User");
                    setOpen(false);
                  },
                },
                {
                  id: "1-3",
                  label: "Remove User",
                  icon: <span>➖</span>,
                  variant: "danger",
                  onClick: () => {
                    console.log("Remove User");
                    setOpen(false);
                  },
                },
              ],
            },
            {
              id: "2",
              label: "Settings",
              icon: <span>⚙️</span>,
              onClick: () => {
                console.log("Settings");
                setOpen(false);
              },
            },
            {
              id: "3",
              label: "Database",
              icon: <span>🗄️</span>,
              children: [
                {
                  id: "3-1",
                  label: "Backup",
                  onClick: () => {
                    console.log("Backup Database");
                    setOpen(false);
                  },
                },
                {
                  id: "3-2",
                  label: "Restore",
                  onClick: () => {
                    console.log("Restore Database");
                    setOpen(false);
                  },
                  separator: true,
                },
                {
                  id: "3-3",
                  label: "Clear Cache",
                  variant: "danger",
                  onClick: () => {
                    console.log("Clear Cache");
                    setOpen(false);
                  },
                },
              ],
            },
            {
              id: "4",
              label: "Dangerous Actions",
              icon: <span>⚠️</span>,
              children: [
                {
                  id: "4-1",
                  label: "Reset All Data",
                  variant: "danger",
                  onClick: () => {
                    console.log("Reset All Data");
                    setOpen(false);
                  },
                },
                {
                  id: "4-2",
                  label: "Delete Everything",
                  variant: "danger",
                  onClick: () => {
                    console.log("Delete Everything");
                    setOpen(false);
                  },
                },
              ],
            },
          ]}
          open={open}
          onOpenChange={setOpen}
          side="bottom"
        />
      </div>
    );
  },
};
