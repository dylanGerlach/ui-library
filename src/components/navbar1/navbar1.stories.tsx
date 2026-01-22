import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Navbar1 } from "./navbar1";
import { Button } from "../button/button";
import { IconButton } from "../icon-button/icon-button";
import { Badge } from "../badge/badge";
import { Typography } from "../typography/typography";
import { TextInput } from "../text-input/text-input";
import { UserCircle, ShoppingCart, Search } from "lucide-react";
import { ThemeProvider, useTheme } from "../../theme/ThemeProvider";
import { createTheme } from "../../theme/createTheme";
import logoImage from "./logo-black.png";

const meta: Meta<typeof Navbar1> = {
  title: "Components/Navbar1",
  component: Navbar1,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    logo: {
      control: false,
      description: "Logo configuration or custom ReactNode",
    },
    leftElements: {
      control: false,
      description:
        "Elements displayed on the left (next to logo, hidden on mobile, shown in menu)",
    },
    rightElements: {
      control: false,
      description:
        "Elements displayed on the right (hidden on mobile, shown in menu)",
    },
    alwaysRightElements: {
      control: false,
      description: "Elements always visible on the right (even on mobile)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar1>;

export const Basic: Story = {
  args: {
    logo: (
      <img src={logoImage} alt="Company Logo" className="h-12 md:h-16 w-auto" />
    ),
    leftElements: [
      <Typography key="shop" color="primary">
        Shop
      </Typography>,
      <Typography key="support" color="primary">
        Support
      </Typography>,
    ],
  },
};

export const WithRightElements: Story = {
  render: () => {
    const theme = useTheme();
    return (
      <Navbar1
        logo={
          <img src={logoImage} alt="Company Logo" className="h-12 md:h-16 w-auto" />
        }
        leftElements={[
          <Typography key="shop" color="primary">
            Shop
          </Typography>,
          <Typography key="support" color="primary">
            Support
          </Typography>,
        ]}
        rightElements={[
          <IconButton key="user" label="Account">
            <UserCircle size={28} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
          </IconButton>,
          <Badge key="cart" count={3} absolute position="top-right">
            <IconButton label="Cart">
              <ShoppingCart size={26} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Badge>,
        ]}
      />
    );
  },
};

export const WithAlwaysRightElements: Story = {
  args: {
    logo: (
      <img src={logoImage} alt="Company Logo" className="h-12 md:h-16 w-auto" />
    ),
    leftElements: [
      <Typography key="shop" color="primary">
        Shop
      </Typography>,
      <Typography key="support" color="primary">
        Support
      </Typography>,
    ],
    rightElements: [
      <Button key="login" variant="secondary" size="sm">
        Login
      </Button>,
    ],
    alwaysRightElements: [
      <IconButton key="user" label="Account">
        <UserCircle size={28} strokeWidth={1.4} className="text-primary" />
      </IconButton>,
      <Badge key="cart" count={5} absolute position="top-right">
        <IconButton label="Cart">
          <ShoppingCart size={26} strokeWidth={1.4} className="text-primary" />
        </IconButton>
      </Badge>,
    ],
  },
};

export const WithActiveLink: Story = {
  args: {
    logo: (
      <img src={logoImage} alt="Company Logo" className="h-12 md:h-16 w-auto" />
    ),
    leftElements: [
      <Typography key="shop" color="primary" active>
        Shop
      </Typography>,
      <Typography key="support" color="primary">
        Support
      </Typography>,
    ],
    rightElements: [
      <IconButton key="user" label="Account">
        <UserCircle size={28} strokeWidth={1.4} className="text-primary" />
      </IconButton>,
    ],
  },
};

export const CustomLogo: Story = {
  render: () => {
    const theme = useTheme();
    return (
      <Navbar1
        logo={
          <div
            className="h-12 md:h-16 w-auto flex items-center justify-center px-4 rounded font-bold text-xl"
            style={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            AA
          </div>
        }
        leftElements={[
          <Typography key="shop" color="primary">
            Shop
          </Typography>,
          <Typography key="support" color="primary">
            Support
          </Typography>,
        ]}
        rightElements={[
          <IconButton key="user" label="Account">
            <UserCircle size={28} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
          </IconButton>,
          <Badge key="cart" count={3} absolute position="top-right">
            <IconButton label="Cart">
              <ShoppingCart size={26} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Badge>,
        ]}
      />
    );
  },
};

export const NoLeftElements: Story = {
  render: () => {
    const theme = useTheme();
    return (
      <Navbar1
        logo={
          <img src={logoImage} alt="Company Logo" className="h-12 md:h-16 w-auto" />
        }
        alwaysRightElements={[
          <IconButton key="user" label="Account">
            <UserCircle size={28} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
          </IconButton>,
          <Badge key="cart" count={3} absolute position="top-right">
            <IconButton label="Cart">
              <ShoppingCart size={26} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Badge>,
        ]}
      />
    );
  },
};

export const WithSearchBar: Story = {
  render: () => {
    const theme = useTheme();
    const [searchValue, setSearchValue] = useState("");
    return (
      <Navbar1
        logo={
          <img
            src={logoImage}
            alt="Company Logo"
            className="h-12 md:h-16 w-auto"
          />
        }
        leftElements={[
          <div key="search" className="w-80">
            <div className="[&>div]:space-y-0 [&>div>p]:hidden">
              <TextInput
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search..."
                startIcon={<Search size={18} />}
                inputSize="md"
              />
            </div>
          </div>,
        ]}
        rightElements={[
          <Typography key="shop" color="primary">
            Shop
          </Typography>,
          <Typography key="contact" color="primary">
            Contact
          </Typography>,
        ]}
        alwaysRightElements={[
          <IconButton key="user" label="Account">
            <UserCircle size={28} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
          </IconButton>,
          <Badge key="cart" count={3} absolute position="top-right">
            <IconButton label="Cart">
              <ShoppingCart
                size={26}
                strokeWidth={1.4}
                style={{ color: theme.palette.primary.main }}
              />
            </IconButton>
          </Badge>,
        ]}
      />
    );
  },
};

export const Ecommerce: Story = {
  render: () => {
    const theme = useTheme();
    const [searchValue, setSearchValue] = useState("");
    return (
      <Navbar1
        logo={
          <img
            src={logoImage}
            alt="Company Logo"
            className="h-12 md:h-16 w-auto"
          />
        }
        leftElements={[
          <div key="search" className="w-80">
            <div className="[&>div]:space-y-0 [&>div>p]:hidden">
              <TextInput
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search..."
                startIcon={<Search size={18} />}
                inputSize="md"
              />
            </div>
          </div>,
        ]}
        rightElements={[
          <Typography key="shop" color="primary">
            Shop
          </Typography>,
          <Typography key="contact" color="primary">
            Contact
          </Typography>,
        ]}
        alwaysRightElements={[
          <IconButton key="user" label="Account">
            <UserCircle size={28} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
          </IconButton>,
          <Badge key="cart" count={3} absolute position="top-right">
            <IconButton label="Cart">
              <ShoppingCart
                size={26}
                strokeWidth={1.4}
                style={{ color: theme.palette.primary.main }}
              />
            </IconButton>
          </Badge>,
        ]}
      />
    );
  },
};

export const StickyWithScrollableContent: Story = {
  render: () => {
    const theme = useTheme();
    return (
      <div className="h-screen overflow-auto">
        <Navbar1
          logo={
            <img
              src={logoImage}
              alt="Company Logo"
              className="h-12 md:h-16 w-auto"
            />
          }
          leftElements={[
            <Typography key="home" color="primary">
              Home
            </Typography>,
            <Typography key="shop" color="primary">
              Shop
            </Typography>,
            <Typography key="about" color="primary">
              About
            </Typography>,
            <Typography key="contact" color="primary">
              Contact
            </Typography>,
          ]}
          rightElements={[
            <IconButton key="user" label="Account">
              <UserCircle size={28} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
            </IconButton>,
            <Badge key="cart" count={3} absolute position="top-right">
              <IconButton label="Cart">
                <ShoppingCart
                  size={26}
                  strokeWidth={1.4}
                  style={{ color: theme.palette.primary.main }}
                />
              </IconButton>
            </Badge>,
          ]}
        />
        <div className="p-8 space-y-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Scroll to see sticky navbar</h1>
            <p className="text-lg mb-8">
              The navbar stays fixed at the top when you scroll down. Notice how it
              remains visible and accessible.
            </p>
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="mb-8 p-6 border rounded-lg"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.border,
                }}
              >
                <h2 className="text-2xl font-semibold mb-2">Section {i + 1}</h2>
                <p style={{ color: theme.palette.text.secondary }}>
                  This is section {i + 1} of the scrollable content. Keep scrolling
                  to see the navbar remain sticky at the top. The navbar uses the
                  ThemeProvider to get its background color from the theme palette.
                </p>
                <p className="mt-2" style={{ color: theme.palette.text.secondary }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const WithCustomTheme: Story = {
  render: () => {
    const customTheme = createTheme({
      mode: "light",
      palette: {
        primary: {
          main: "rgb(168 85 247)",
          contrastText: "rgb(255 255 255)",
        },
        background: {
          default: "rgb(250 245 255)",
          paper: "rgb(243 232 255)",
        },
        border: "rgb(221 214 254)",
      },
    });

    return (
      <ThemeProvider theme={customTheme}>
        <div className="min-h-screen bg-background">
          <Navbar1
            logo={
              <img
                src={logoImage}
                alt="Company Logo"
                className="h-12 md:h-16 w-auto"
              />
            }
            leftElements={[
              <Typography key="shop" color="primary">
                Shop
              </Typography>,
              <Typography key="support" color="primary">
                Support
              </Typography>,
            ]}
            rightElements={[
              <IconButton key="user" label="Account">
                <UserCircle size={28} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
              </IconButton>,
              <Badge key="cart" count={3} absolute position="top-right">
                <IconButton label="Cart">
                  <ShoppingCart
                    size={26}
                    strokeWidth={1.4}
                    style={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Badge>,
            ]}
          />
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">
                Navbar with Custom Theme
              </h1>
              <p className="text-lg mb-4">
                This navbar uses a custom theme with a purple color scheme. The
                background color comes from{" "}
                <code
                  className="px-2 py-1 rounded"
                  style={{ backgroundColor: theme.palette.background.paper }}
                >
                  theme.palette.background.default
                </code>{" "}
                via the ThemeProvider.
              </p>
              <p className="text-muted">
                The navbar is sticky and will stay at the top when scrolling. Try
                scrolling to see it in action!
              </p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const DarkMode: Story = {
  render: () => {
    const darkTheme = createTheme({
      mode: "dark",
    });

    return (
      <ThemeProvider theme={darkTheme}>
        <div className="min-h-screen bg-background">
          <Navbar1
            logo={
              <img
                src={logoImage}
                alt="Company Logo"
                className="h-12 md:h-16 w-auto"
              />
            }
            leftElements={[
              <Typography key="shop" color="primary">
                Shop
              </Typography>,
              <Typography key="support" color="primary">
                Support
              </Typography>,
              <Typography key="about" color="primary">
                About
              </Typography>,
            ]}
            rightElements={[
              <IconButton key="user" label="Account">
                <UserCircle size={28} strokeWidth={1.4} style={{ color: theme.palette.primary.main }} />
              </IconButton>,
              <Badge key="cart" count={5} absolute position="top-right">
                <IconButton label="Cart">
                  <ShoppingCart
                    size={26}
                    strokeWidth={1.4}
                    style={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Badge>,
            ]}
          />
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <h1
                className="text-3xl font-bold mb-4"
                style={{ color: theme.palette.text.primary }}
              >
                Navbar in Dark Mode
              </h1>
              <p
                className="text-lg mb-4"
                style={{ color: theme.palette.text.primary }}
              >
                This navbar uses dark mode theme. The background color is{" "}
                <code
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                >
                  rgb(17 24 39)
                </code>{" "}
                (dark gray) from the dark theme palette.
              </p>
              <p style={{ color: theme.palette.text.secondary }}>
                The navbar uses the ThemeProvider hook to access theme colors
                directly, ensuring it always matches the current theme mode.
              </p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};
