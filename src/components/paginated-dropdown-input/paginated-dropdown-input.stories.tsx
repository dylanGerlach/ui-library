import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PaginatedDropdownInput } from "./paginated-dropdown-input";
import { DropdownInput } from "../dropdown-input/dropdown-input";

const meta: Meta<typeof PaginatedDropdownInput> = {
  title: "Components/PaginatedDropdownInput",
  component: PaginatedDropdownInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof PaginatedDropdownInput>;

// Simulated async loader
const fruits = Array.from({ length: 50 }, (_, i) => ({
  id: `fruit-${i}`,
  name: `Fruit ${i + 1}`,
}));

async function loadOptions(
  search: string,
  _loadedOptions: readonly any[],
  additional: any
) {
  const { page } = additional as { page: number };
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const filtered = fruits.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const options = filtered.slice(start, end);

  // simulate network delay
  await new Promise((res) => setTimeout(res, 500));

  return {
    options: options.map((f) => ({ value: f.id, label: f.name })),
    hasMore: end < filtered.length,
    additional: { page: page + 1 },
  };
}

// Helper for interactive stories
const withControls = (args: any) => ({
  args,
  render: (storyArgs: any) => {
    const [value, setValue] = React.useState(storyArgs.value);

    return (
      <PaginatedDropdownInput
        {...storyArgs}
        value={value}
        onChange={(opt) => {
          setValue(opt ? (opt as any).value : null);
          storyArgs.onChange?.(opt);
        }}
      />
    );
  },
});

export const Default: Story = withControls({
  label: "Fruits",
  value: null,
  loadOptions,
  additional: { page: 1 },
  placeholder: "Select a fruit...",
});

export const WithError: Story = withControls({
  label: "Fruits",
  value: null,
  loadOptions,
  additional: { page: 1 },
  error: "Please select a fruit",
});

export const WithHelperText: Story = withControls({
  label: "Fruits",
  value: null,
  loadOptions,
  additional: { page: 1 },
  helperText: "Scroll to load more fruits",
});

export const Disabled: Story = withControls({
  label: "Disabled Dropdown",
  value: null,
  loadOptions,
  additional: { page: 1 },
  disabled: true,
});

export const Required: Story = withControls({
  label: "Required Fruit",
  value: null,
  loadOptions,
  additional: { page: 1 },
  required: true,
});

export const ComparisonWithDropdownInput: Story = {
  render: () => {
    const [paginatedValue, setPaginatedValue] = React.useState<any>(null);
    const [dropdownValue, setDropdownValue] = React.useState<
      string | number | null
    >(null);

    const sampleOptions = [
      { id: "apple", name: "Apple" },
      { id: "banana", name: "Banana" },
      { id: "cherry", name: "Cherry" },
    ];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">
              Paginated Dropdown Input
            </h3>
            <PaginatedDropdownInput
              label="Select Option"
              value={paginatedValue}
              onChange={setPaginatedValue}
              loadOptions={loadOptions}
              additional={{ page: 1 }}
              placeholder="Choose an option..."
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Dropdown Input</h3>
            <DropdownInput
              label="Select Option"
              value={dropdownValue}
              onChange={setDropdownValue}
              options={sampleOptions}
              placeholder="Choose an option..."
            />
          </div>
        </div>
      </div>
    );
  },
};
