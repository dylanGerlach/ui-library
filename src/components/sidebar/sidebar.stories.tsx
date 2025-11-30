import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Button } from "../button/button";
import { Typography } from "../typography/typography";
import { Plus, Library, MoreHorizontal, PanelLeft } from "lucide-react";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { Navbar1 } from "../navbar1/navbar1";
import { IconButton } from "../icon-button/icon-button";
import { Badge } from "../badge/badge";
import { UserCircle, ShoppingCart } from "lucide-react";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    children: {
      control: false,
      description: "Content to render inside the sidebar",
    },
    width: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Width preset or custom Tailwind class",
    },
    border: {
      control: "select",
      options: ["left", "right", "none"],
      description: "Which side to show border on",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Padding size",
    },
    isOpen: {
      control: "boolean",
      description:
        "Controlled open state (if provided with onOpenChange, enables collapsible behavior)",
    },
    onOpenChange: {
      control: false,
      description: "Callback fired when open state changes",
    },
    overlay: {
      control: "boolean",
      description:
        "Whether the sidebar overlays content (fixed) or pushes content (normal flow)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <div className="mb-4">
          <Typography variant="h5">Sidebar Content</Typography>
        </div>
        <div className="mb-2">
          <Typography variant="p">
            This is a simple sidebar that renders its children.
          </Typography>
        </div>
        <div className="mb-4">
          <Button variant="primary">Action Button</Button>
        </div>
        <Typography variant="p">
          You can compose any content you want inside the sidebar.
        </Typography>
      </>
    ),
  },
};

export const DifferentWidths: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar width="sm" border="right">
        <div className="mb-2">
          <Typography variant="h6">Small (w-48)</Typography>
        </div>
        <div className="text-sm">
          <Typography variant="p">This sidebar has a small width.</Typography>
        </div>
      </Sidebar>
      <Sidebar width="md" border="right">
        <div className="mb-2">
          <Typography variant="h6">Medium (w-64)</Typography>
        </div>
        <div className="text-sm">
          <Typography variant="p">
            This sidebar has a medium width (default).
          </Typography>
        </div>
      </Sidebar>
      <Sidebar width="lg" border="right">
        <div className="mb-2">
          <Typography variant="h6">Large (w-80)</Typography>
        </div>
        <div className="text-sm">
          <Typography variant="p">This sidebar has a large width.</Typography>
        </div>
      </Sidebar>
      <Sidebar width="xl" border="right">
        <div className="mb-2">
          <Typography variant="h6">Extra Large (w-96)</Typography>
        </div>
        <div className="text-sm">
          <Typography variant="p">
            This sidebar has an extra large width.
          </Typography>
        </div>
      </Sidebar>
    </div>
  ),
};

export const BorderPositions: Story = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar width="md" border="left">
        <div className="mb-2">
          <Typography variant="h6">Left Border</Typography>
        </div>
        <div className="text-sm">
          <Typography variant="p">Border on the left side.</Typography>
        </div>
      </Sidebar>
      <Sidebar width="md" border="right">
        <div className="mb-2">
          <Typography variant="h6">Right Border</Typography>
        </div>
        <div className="text-sm">
          <Typography variant="p">
            Border on the right side (default).
          </Typography>
        </div>
      </Sidebar>
      <Sidebar width="md" border="none">
        <div className="mb-2">
          <Typography variant="h6">No Border</Typography>
        </div>
        <div className="text-sm">
          <Typography variant="p">No border at all.</Typography>
        </div>
      </Sidebar>
    </div>
  ),
};

export const ChatSidebarExample: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<number | null>(1);
    const [menuOpen, setMenuOpen] = useState<number | null>(null);

    // Mock chat sessions
    const sessions = [
      { id: 1, title: "React Component Design" },
      { id: 2, title: "TypeScript Best Practices" },
      { id: 3, title: "UI Library Architecture" },
      { id: 4, title: "Storybook Configuration" },
      { id: 5, title: "Theme System Implementation" },
      { id: 6, title: "Component Composition Patterns" },
      { id: 7, title: "Accessibility Guidelines" },
      { id: 8, title: "Performance Optimization" },
    ];

    return (
      <div className="flex h-screen">
        <Sidebar width="md" border="right" padding="md">
          <button
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-2 w-full text-left py-1.5 px-2 mb-2 rounded transition-colors hover:bg-muted/10 text-foreground"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>

          <button
            onClick={() => {}}
            className="flex items-center gap-2 w-full text-left py-1.5 px-2 mb-3 rounded transition-colors hover:bg-muted/10 text-foreground"
          >
            <Library className="w-4 h-4" />
            Library
          </button>

          <div className="text-sm font-semibold mb-2 uppercase tracking-wide text-muted">
            Previous Chats
          </div>

          {sessions.map((session) => {
            const isSelected = selectedId === session.id;
            return (
              <div
                key={session.id}
                className={`group flex items-center justify-between gap-1 mb-1 rounded transition-colors ${
                  isSelected ? "" : "hover:bg-muted/10"
                }`}
                style={{
                  backgroundColor: isSelected
                    ? "var(--color-primary)"
                    : "transparent",
                  color: isSelected
                    ? "var(--color-primary-foreground, white)"
                    : "var(--color-foreground)",
                }}
              >
                <button
                  onClick={() => setSelectedId(session.id)}
                  className="flex-1 text-left py-1 px-2 text-xs truncate"
                  style={{
                    color: "inherit",
                  }}
                >
                  {session.title}
                </button>
                <DropdownMenu
                  trigger={
                    <button
                      className={`p-1.5 mr-1 rounded transition-all opacity-0 group-hover:opacity-100 ${
                        isSelected ? "hover:bg-white/10" : "hover:bg-muted/10"
                      }`}
                      style={{
                        color: isSelected
                          ? "var(--color-primary-foreground, white)"
                          : "var(--color-muted)",
                      }}
                      aria-label="Session actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  }
                  items={[
                    {
                      id: "edit",
                      label: "Edit",
                      onClick: () => {
                        setMenuOpen(null);
                        console.log("Edit", session.id);
                      },
                    },
                    {
                      id: "delete",
                      label: "Delete",
                      variant: "danger",
                      onClick: () => {
                        setMenuOpen(null);
                        console.log("Delete", session.id);
                      },
                    },
                  ]}
                  open={menuOpen === session.id}
                  onOpenChange={(open) => setMenuOpen(open ? session.id : null)}
                  side="bottom"
                  align="end"
                />
              </div>
            );
          })}
        </Sidebar>
        <div className="flex-1 p-8">
          <div className="mb-4">
            <Typography variant="h3">Main Content Area</Typography>
          </div>
          <Typography variant="p">
            This demonstrates how the Sidebar component can be used to create a
            chat interface. The sidebar always takes up 100% height and scrolls
            when content overflows.
          </Typography>
        </div>
      </div>
    );
  },
};

export const ScrollingContent: Story = {
  render: () => {
    const items = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
    }));

    return (
      <div className="flex h-screen">
        <Sidebar width="md" border="right" padding="md">
          <div className="mb-4">
            <Typography variant="h6">Scrollable List</Typography>
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              className="py-2 px-2 mb-1 rounded hover:bg-muted/10 transition-colors cursor-pointer"
            >
              <div className="text-sm">
                <Typography variant="p">{item.title}</Typography>
              </div>
            </div>
          ))}
        </Sidebar>
        <div className="flex-1 p-8">
          <div className="mb-4">
            <Typography variant="h3">Scrollable Content</Typography>
          </div>
          <Typography variant="p">
            The sidebar automatically scrolls when content exceeds the viewport
            height. Try scrolling the sidebar on the left.
          </Typography>
        </div>
      </div>
    );
  },
};

export const Collapsible: Story = {
  render: () => {
    return (
      <div className="flex h-screen relative">
        <Sidebar
          width="md"
          border="right"
          padding="md"
          isOpen={true}
          onOpenChange={() => {}}
        >
          <div className="mb-4">
            <Typography variant="h6">Collapsible Sidebar</Typography>
          </div>
          <div className="mb-2">
            <Typography variant="p">
              This sidebar collapses on mobile (below md breakpoint).
            </Typography>
          </div>
          <div className="mb-2">
            <Typography variant="p">
              Resize the browser window to see it in action.
            </Typography>
          </div>
          <div className="mt-4">
            <Button variant="primary">Action Button</Button>
          </div>
        </Sidebar>
        <div className="flex-1 p-8">
          <div className="mb-4">
            <Typography variant="h3">Main Content</Typography>
          </div>
          <Typography variant="p">
            On mobile (below md breakpoint), click the toggle button in the top
            left to open/close the sidebar. On desktop, the sidebar is always
            visible.
          </Typography>
        </div>
      </div>
    );
  },
};

export const CollapsibleControlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex h-screen relative">
        <Sidebar
          width="md"
          border="right"
          padding="md"
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="mb-4">
            <Typography variant="h6">Controlled State</Typography>
          </div>
          <div className="mb-2">
            <Typography variant="p">
              This sidebar uses controlled state. The parent component manages
              the open/close state.
            </Typography>
          </div>
          <div className="mt-4">
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Close Sidebar
            </Button>
          </div>
        </Sidebar>
        <div className="flex-1 p-8">
          <div className="mb-4">
            <Typography variant="h3">Main Content</Typography>
          </div>
          <div className="mb-4">
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              Open Sidebar
            </Button>
          </div>
          <Typography variant="p">
            Sidebar is {isOpen ? "open" : "closed"}
          </Typography>
        </div>
      </div>
    );
  },
};

export const ResponsiveDesktopMobile: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    React.useEffect(() => {
      const checkMobile = () => {
        const mobile = window.innerWidth < 768;
        const wasMobile = isMobile;
        setIsMobile(mobile);

        // On desktop, open sidebar if switching from mobile
        if (!mobile && wasMobile) {
          setIsOpen(true);
        } else if (mobile) {
          // On mobile, always close sidebar (smooth transition when switching from desktop)
          setIsOpen(false);
        }
        // On desktop, keep current state (user can toggle)
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, [isMobile]);

    return (
      <div className="flex h-screen">
        {/* Sidebar: normal flow on desktop, overlay on mobile */}
        <Sidebar
          width="md"
          border="right"
          padding="md"
          overlay={isMobile}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="mb-4">
            <Typography variant="h6">Responsive Sidebar</Typography>
          </div>
          <div className="mb-2">
            <Typography variant="p">
              {isMobile
                ? "Mobile: Overlay mode with toggle button"
                : "Desktop: Normal flow, always visible"}
            </Typography>
          </div>
          <div className="mb-2">
            <Typography variant="p">
              Resize the window to see it switch between desktop and mobile
              modes.
            </Typography>
          </div>
        </Sidebar>

        {/* Toggle button - to the right of the sidebar */}
        <div className="flex items-start p-4">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 rounded transition-colors hover:bg-muted/10 border bg-card text-foreground"
            style={{ borderColor: "var(--color-border)" }}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            <PanelLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-8">
          <div className="mb-4">
            <Typography variant="h3">Main Content</Typography>
          </div>
          <div className="mb-2">
            <Typography variant="p">
              On desktop (≥768px): Sidebar is in normal flow and always visible.
            </Typography>
          </div>
          <div className="mb-2">
            <Typography variant="p">
              On mobile (&lt;768px): Sidebar uses overlay mode and can be
              toggled with the button.
            </Typography>
          </div>
          <Typography variant="p">
            Current mode: {isMobile ? "Mobile (Overlay)" : "Desktop (Normal)"}
          </Typography>
        </div>
      </div>
    );
  },
};

export const WithNavbar: Story = {
  render: () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
    const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 768);

    React.useEffect(() => {
      const checkMobile = () => {
        const mobile = window.innerWidth < 768;
        const wasMobile = isMobile;
        setIsMobile(mobile);

        if (!mobile && wasMobile) {
          setIsOpen(true);
        } else if (mobile) {
          setIsOpen(false);
        }
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, [isMobile]);

    return (
      <div className="flex flex-col h-screen">
        {/* Navbar at the top */}
        <Navbar1
          logo={
            <Typography variant="h5" color="primary">
              Logo
            </Typography>
          }
          leftElements={[
            <Typography key="shop" color="primary" href="#">
              Shop
            </Typography>,
            <Typography key="about" color="primary" href="#">
              About
            </Typography>,
          ]}
          rightElements={[
            <Typography key="contact" color="primary" href="#">
              Contact
            </Typography>,
          ]}
          alwaysRightElements={[
            <IconButton key="user" label="Account">
              <UserCircle
                size={28}
                strokeWidth={1.4}
                className="text-primary"
              />
            </IconButton>,
            <Badge key="cart" count={3} absolute position="top-right">
              <IconButton label="Cart">
                <ShoppingCart
                  size={26}
                  strokeWidth={1.4}
                  className="text-primary"
                />
              </IconButton>
            </Badge>,
          ]}
        />

        {/* Main content area with sidebar */}
        <div className="flex flex-1 min-h-0 overflow-hidden items-stretch relative">
          <Sidebar
            width="md"
            border="right"
            padding="md"
            overlay={isMobile}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
          >
            <div className="mb-4">
              <Typography variant="h6">Sidebar Navigation</Typography>
            </div>
            <div className="mb-2">
              <Typography variant="p">
                This sidebar is used alongside the navbar at the top.
              </Typography>
            </div>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => {}}
                className="flex items-center gap-2 w-full text-left py-1.5 px-2 rounded transition-colors hover:bg-muted/10 text-foreground"
              >
                <Plus className="w-4 h-4" />
                New Item
              </button>
              <button
                onClick={() => {}}
                className="flex items-center gap-2 w-full text-left py-1.5 px-2 rounded transition-colors hover:bg-muted/10 text-foreground"
              >
                <Library className="w-4 h-4" />
                Library
              </button>
            </div>
          </Sidebar>

          {/* Toggle button */}
          <div className="flex items-start p-4">
            <IconButton onClick={() => setIsOpen((prev) => !prev)}>
              <PanelLeft className="w-6 h-6" />
            </IconButton>
          </div>

          {/* Main content */}
          <div className="flex-1 min-h-0 flex flex-col w-full relative">
            <div className="flex-1 min-h-0 overflow-y-auto w-full p-8">
              <div className="mb-4">
                <Typography variant="h3">Main Content Area</Typography>
              </div>
              <div className="mb-2">
                <Typography variant="p">
                  This story demonstrates the sidebar and navbar working together
                  with responsive behavior.
                </Typography>
              </div>
              <div className="mb-2">
                <Typography variant="p">
                  On desktop (≥768px): Sidebar is in normal flow and always
                  visible. Toggle button opens/closes it.
                </Typography>
              </div>
              <div className="mb-2">
                <Typography variant="p">
                  On mobile (&lt;768px): Sidebar uses overlay mode and can be
                  toggled with the button.
                </Typography>
              </div>
              <Typography variant="p">
                Current mode:{" "}
                {isMobile ? "Mobile (Overlay)" : "Desktop (Normal)"}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
