import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Search, Mail, Eye, EyeOff } from "lucide-react";
import { TextInput } from "./text-input";
import { Button } from "../button/button";
import { useTheme } from "../../theme/ThemeProvider";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    backgroundColor: { control: "text" },
    borderColor: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "error",
        "success",
        "warning",
        "info",
        "text.secondary",
        "border",
      ],
    },
    showBorderOnHover: { control: "boolean" },
    startIcon: { control: false },
    endIcon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "Invalid email address",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Phone Number",
    placeholder: "Enter your phone number",
    helperText: "Format: (123) 456-7890",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    value: "Can’t edit me",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    required: true,
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    placeholder: "Search here...",
    startIcon: <Search className="w-4 h-4" />,
    endIcon: <Mail className="w-4 h-4" />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <TextInput
        label="Small"
        placeholder="Small input"
        inputSize="sm"
        startIcon={<Search className="w-4 h-4" />}
        endIcon={<Mail className="w-4 h-4" />}
      />
      <TextInput
        label="Medium"
        placeholder="Medium input"
        inputSize="md"
        startIcon={<Search className="w-5 h-5" />}
        endIcon={<Mail className="w-5 h-5" />}
      />
      <TextInput
        label="Large"
        placeholder="Large input"
        inputSize="lg"
        startIcon={<Search className="w-6 h-6" />}
        endIcon={<Mail className="w-6 h-6" />}
      />
      <TextInput
        placeholder="Small input (no label)"
        inputSize="sm"
        startIcon={<Search className="w-4 h-4" />}
        endIcon={<Mail className="w-4 h-4" />}
      />
      <TextInput
        placeholder="Medium input (no label)"
        inputSize="md"
        startIcon={<Search className="w-5 h-5" />}
        endIcon={<Mail className="w-5 h-5" />}
      />
      <TextInput
        placeholder="Large input (no label)"
        inputSize="lg"
        startIcon={<Search className="w-6 h-6" />}
        endIcon={<Mail className="w-6 h-6" />}
      />
      <TextInput
        label="Small (no icons)"
        placeholder="Small input"
        inputSize="sm"
      />
      <TextInput
        label="Medium (no icons)"
        placeholder="Medium input"
        inputSize="md"
      />
      <TextInput
        label="Large (no icons)"
        placeholder="Large input"
        inputSize="lg"
      />
      <TextInput
        placeholder="Small input (no label, no icons)"
        inputSize="sm"
      />
      <TextInput
        placeholder="Medium input (no label, no icons)"
        inputSize="md"
      />
      <TextInput
        placeholder="Large input (no label, no icons)"
        inputSize="lg"
      />
    </div>
  ),
};

export const WithButton: Story = {
  render: () => {
    const [smValue, setSmValue] = useState("");
    const [mdValue, setMdValue] = useState("");
    const [lgValue, setLgValue] = useState("");
    const [smNoLabelValue, setSmNoLabelValue] = useState("");
    const [mdNoLabelValue, setMdNoLabelValue] = useState("");
    const [lgNoLabelValue, setLgNoLabelValue] = useState("");

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">With Labels</h3>
          <div className="space-y-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <TextInput
                  label="Small Input"
                  placeholder="Enter text..."
                  value={smValue}
                  onChange={setSmValue}
                  inputSize="sm"
                />
              </div>
              <Button variant="primary" size="sm">
                Small
              </Button>
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <TextInput
                  label="Medium Input"
                  placeholder="Enter text..."
                  value={mdValue}
                  onChange={setMdValue}
                  inputSize="md"
                />
              </div>
              <Button variant="primary" size="md">
                Medium
              </Button>
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <TextInput
                  label="Large Input"
                  placeholder="Enter text..."
                  value={lgValue}
                  onChange={setLgValue}
                  inputSize="lg"
                />
              </div>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-3">Without Labels</h3>
          <div className="space-y-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <TextInput
                  placeholder="Enter text..."
                  value={smNoLabelValue}
                  onChange={setSmNoLabelValue}
                  inputSize="sm"
                />
              </div>
              <Button variant="primary" size="sm">
                Small
              </Button>
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <TextInput
                  placeholder="Enter text..."
                  value={mdNoLabelValue}
                  onChange={setMdNoLabelValue}
                  inputSize="md"
                />
              </div>
              <Button variant="primary" size="md">
                Medium
              </Button>
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <TextInput
                  placeholder="Enter text..."
                  value={lgNoLabelValue}
                  onChange={setLgNoLabelValue}
                  inputSize="lg"
                />
              </div>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => (
    <div className="space-y-4">
      <TextInput placeholder="No label - balanced padding" />
      <TextInput
        placeholder="No label with icon"
        startIcon={<Search className="w-4 h-4" />}
      />
      <TextInput
        label="With label - extra top padding for legend"
        placeholder="Has label for comparison"
      />
      <TextInput
        placeholder="Search reports..."
        inputSize="md"
        startIcon={<Search className="w-4 h-4" />}
      />
    </div>
  ),
};

export const Password: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [visible, setVisible] = useState(false);
    const iconSize = "w-5 h-5";

    return (
      <TextInput
        label="Password"
        placeholder="Enter your password"
        value={value}
        onChange={setValue}
        password={!visible}
        endIcon={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="focus:outline-none cursor-pointer"
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? (
              <EyeOff className={iconSize} />
            ) : (
              <Eye className={iconSize} />
            )}
          </button>
        }
      />
    );
  },
};

export const Autofill: Story = {
  render: () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    return (
      <div className="space-y-4 max-w-md">
        <div>
          <p
            className="text-sm mb-2"
            style={{ color: theme.palette.text.secondary }}
          >
            Fill these fields and let your browser autofill them, then check
            that the styling remains consistent (no yellow/blue backgrounds).
          </p>
        </div>
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="test@example.com"
          autoComplete="email"
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter password"
          autoComplete="current-password"
        />
        <TextInput
          label="Full Name"
          type="text"
          value={name}
          onChange={setName}
          placeholder="John Doe"
          autoComplete="name"
        />
      </div>
    );
  },
};

export const Minimal: Story = {
  render: () => {
    const theme = useTheme();
    const [title1, setTitle1] = useState("");
    const [title2, setTitle2] = useState("");
    const [title3, setTitle3] = useState("");

    return (
      <div className="space-y-8 max-w-2xl">
        <div>
          <p
            className="text-sm mb-4"
            style={{ color: theme.palette.text.secondary }}
          >
            Minimal inputs that blend with the background. Border only appears
            on hover or focus.
          </p>
        </div>
        <div className="space-y-4">
          <TextInput
            label="Title"
            placeholder="Enter title..."
            value={title1}
            onChange={setTitle1}
            backgroundColor="transparent"
            showBorderOnHover={true}
          />
          <TextInput
            placeholder="No label - minimal style"
            value={title2}
            onChange={setTitle2}
            backgroundColor="transparent"
            showBorderOnHover={true}
          />
          <TextInput
            label="Primary Border Color"
            placeholder="Hover to see primary border..."
            value={title3}
            onChange={setTitle3}
            backgroundColor="transparent"
            borderColor="primary"
            showBorderOnHover={true}
          />
          <TextInput
            label="Accent Border Color"
            placeholder="Hover to see accent border..."
            backgroundColor="transparent"
            borderColor="accent"
            showBorderOnHover={true}
          />
        </div>
        <div className="p-4 rounded-md" style={{ backgroundColor: theme.palette.background.paper }}>
          <p className="text-sm mb-4" style={{ color: theme.palette.text.secondary }}>
            Minimal input on a colored background:
          </p>
          <TextInput
            placeholder="Blends with background..."
            backgroundColor="transparent"
            showBorderOnHover={true}
          />
        </div>
      </div>
    );
  },
};
