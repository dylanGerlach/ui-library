import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { DropdownMenu } from "./dropdown-menu";
import { Button } from "../button/button";

describe("DropdownMenu", () => {
  const mockItems = [
    {
      id: "1",
      label: "Edit",
      onClick: vi.fn(),
    },
    {
      id: "2",
      label: "Delete",
      variant: "danger" as const,
      separator: true, // This will show a separator after Delete
      onClick: vi.fn(),
    },
    {
      id: "3",
      label: "Archive",
      onClick: vi.fn(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders trigger button", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={mockItems}
        open={false}
        onOpenChange={handleOpenChange}
      />
    );

    expect(
      screen.getByRole("button", { name: /open menu/i })
    ).toBeInTheDocument();
  });

  test("shows menu items when open", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={mockItems}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Archive")).toBeInTheDocument();
  });

  test("hides menu items when closed", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={mockItems}
        open={false}
        onOpenChange={handleOpenChange}
      />
    );

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.queryByText("Archive")).not.toBeInTheDocument();
  });

  test("calls onClick when menu item is clicked", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={mockItems}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    fireEvent.click(screen.getByText("Edit"));
    expect(mockItems[0].onClick).toHaveBeenCalledTimes(1);
  });

  test("disables menu items when disabled prop is true", () => {
    const disabledItems = [
      {
        id: "1",
        label: "Disabled Item",
        disabled: true,
        onClick: vi.fn(),
      },
    ];

    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={disabledItems}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    const disabledButton = screen.getByText("Disabled Item");
    expect(disabledButton).toBeDisabled();

    fireEvent.click(disabledButton);
    expect(disabledItems[0].onClick).not.toHaveBeenCalled();
  });

  test("renders icons when provided", () => {
    const itemsWithIcons = [
      {
        id: "1",
        label: "Edit",
        icon: <span data-testid="edit-icon">✏️</span>,
        onClick: vi.fn(),
      },
    ];

    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={itemsWithIcons}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });

  test("renders separators when separator prop is true", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={mockItems}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    // Check that there's a separator hr element in the menu
    // The separator appears between items, not after the last item
    const separators = document.querySelectorAll("hr");
    expect(separators.length).toBeGreaterThan(0);
  });

  test("applies correct variant styles", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={mockItems}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    const dangerButton = screen.getByText("Delete");
    expect(dangerButton).toHaveClass("text-[var(--color-destructive)]");
  });

  test("calls onOpenChange when trigger is clicked", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={mockItems}
        open={false}
        onOpenChange={handleOpenChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });
});

describe("DropdownMenu with Submenus", () => {
  const itemsWithSubmenu = [
    {
      id: "1",
      label: "File",
      children: [
        {
          id: "1-1",
          label: "New",
          onClick: vi.fn(),
        },
        {
          id: "1-2",
          label: "Open",
          onClick: vi.fn(),
        },
      ],
    },
    {
      id: "2",
      label: "Edit",
      onClick: vi.fn(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders submenu items on hover", async () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={itemsWithSubmenu}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    const fileButton = screen.getByText("File");

    // Hover over the parent item to open submenu
    fireEvent.mouseEnter(fileButton);

    await waitFor(() => {
      expect(screen.getByText("New")).toBeInTheDocument();
      expect(screen.getByText("Open")).toBeInTheDocument();
    });
  });

  test("hides submenu items when mouse leaves", async () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={itemsWithSubmenu}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    const fileButton = screen.getByText("File");

    // Hover to open submenu
    fireEvent.mouseEnter(fileButton);
    await waitFor(() => {
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    // Mouse leave to close submenu
    fireEvent.mouseLeave(fileButton);
    await waitFor(() => {
      expect(screen.queryByText("New")).not.toBeInTheDocument();
    });
  });

  test("calls onClick on submenu items", async () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={itemsWithSubmenu}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    const fileButton = screen.getByText("File");
    fireEvent.mouseEnter(fileButton);

    await waitFor(() => {
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("New"));
    expect(itemsWithSubmenu[0].children![0].onClick).toHaveBeenCalledTimes(1);
  });

  test("renders chevron for items with children", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={itemsWithSubmenu}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    // Look for the chevron character anywhere in the button
    const chevron = screen.getByText("›");
    expect(chevron).toBeInTheDocument();
  });

  test("supports nested submenus", async () => {
    const deeplyNestedItems = [
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
                label: "Document",
                onClick: vi.fn(),
              },
            ],
          },
        ],
      },
    ];

    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={deeplyNestedItems}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    // Open first submenu
    fireEvent.mouseEnter(screen.getByText("File"));
    await waitFor(() => {
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    // Open second submenu
    fireEvent.mouseEnter(screen.getByText("New"));
    await waitFor(() => {
      expect(screen.getByText("Document")).toBeInTheDocument();
    });

    // Click the deepest item
    fireEvent.click(screen.getByText("Document"));
    expect(
      deeplyNestedItems[0].children![0].children![0].onClick
    ).toHaveBeenCalledTimes(1);
  });
});

describe("DropdownMenu positioning", () => {
  const mockItems = [
    {
      id: "1",
      label: "Edit",
      onClick: vi.fn(),
    },
  ];

  test("applies custom className", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={mockItems}
        open={true}
        onOpenChange={handleOpenChange}
        className="custom-menu-class"
      />
    );

    // The className is applied to the Popover.Content element
    const menuContent = document.querySelector('[data-side="top"]');
    expect(menuContent).toHaveClass("custom-menu-class");
  });

  test("uses default positioning props", () => {
    const handleOpenChange = vi.fn();
    render(
      <DropdownMenu
        trigger={<Button>Open Menu</Button>}
        items={mockItems}
        open={true}
        onOpenChange={handleOpenChange}
      />
    );

    // Menu should be rendered with default props
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});
