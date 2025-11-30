import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Navbar1 } from "./navbar1";
import { Button } from "../button/button";
import { IconButton } from "../icon-button/icon-button";
import { Badge } from "../badge/badge";
import { Typography } from "../typography/typography";
import { TextInput } from "../text-input/text-input";
import { UserCircle, ShoppingCart, Search } from "lucide-react";
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
      <IconButton key="user" label="Account">
        <UserCircle size={28} strokeWidth={1.4} className="text-primary" />
      </IconButton>,
      <Badge key="cart" count={3} absolute position="top-right">
        <IconButton label="Cart">
          <ShoppingCart size={26} strokeWidth={1.4} className="text-primary" />
        </IconButton>
      </Badge>,
    ],
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
  args: {
    logo: (
      <div className="h-12 md:h-16 w-auto flex items-center justify-center bg-primary text-primary-foreground px-4 rounded font-bold text-xl">
        AA
      </div>
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
      <IconButton key="user" label="Account">
        <UserCircle size={28} strokeWidth={1.4} className="text-primary" />
      </IconButton>,
      <Badge key="cart" count={3} absolute position="top-right">
        <IconButton label="Cart">
          <ShoppingCart size={26} strokeWidth={1.4} className="text-primary" />
        </IconButton>
      </Badge>,
    ],
  },
};

export const NoLeftElements: Story = {
  args: {
    logo: (
      <img src={logoImage} alt="Company Logo" className="h-12 md:h-16 w-auto" />
    ),
    alwaysRightElements: [
      <IconButton key="user" label="Account">
        <UserCircle size={28} strokeWidth={1.4} className="text-primary" />
      </IconButton>,
      <Badge key="cart" count={3} absolute position="top-right">
        <IconButton label="Cart">
          <ShoppingCart size={26} strokeWidth={1.4} className="text-primary" />
        </IconButton>
      </Badge>,
    ],
  },
};

export const WithSearchBar: Story = {
  render: () => {
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
            <UserCircle size={28} strokeWidth={1.4} className="text-primary" />
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
    );
  },
};

export const Ecommerce: Story = {
  render: () => {
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
            <UserCircle size={28} strokeWidth={1.4} className="text-primary" />
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
    );
  },
};
