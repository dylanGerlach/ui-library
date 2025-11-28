import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { JsonInput } from "./json-input";

describe("JsonInput", () => {
  test("renders with initial JSON value", () => {
    render(<JsonInput value={{ foo: "bar" }} label="Config" />);
    const textbox = screen.getByLabelText(/config/i);
    expect(textbox).toHaveValue('{\n  "foo": "bar"\n}');
  });

  test("calls onChange with parsed JSON when input is valid", () => {
    const handleChange = vi.fn();
    render(<JsonInput onChange={handleChange} label="Config" />);
    const textbox = screen.getByLabelText(/config/i);

    fireEvent.change(textbox, { target: { value: '{"foo":"bar"}' } });

    expect(handleChange).toHaveBeenCalledWith({ foo: "bar" });
  });

  test("shows error when JSON is invalid", () => {
    render(<JsonInput label="Config" />);
    const textbox = screen.getByLabelText(/config/i);

    fireEvent.change(textbox, { target: { value: "{foo:bar}" } });

    const errorMessage = screen.getByText(/invalid json/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("clears error when JSON becomes valid", () => {
    render(<JsonInput label="Config" />);
    const textbox = screen.getByLabelText(/config/i);

    // enter invalid
    fireEvent.change(textbox, { target: { value: "{foo:bar}" } });
    expect(screen.getByText(/invalid json/i)).toBeInTheDocument();

    // fix to valid
    fireEvent.change(textbox, { target: { value: '{"foo":"bar"}' } });
    expect(screen.queryByText(/invalid json/i)).not.toBeInTheDocument();
  });

  test("uses external error prop if provided", () => {
    render(<JsonInput label="Config" error="External error" />);
    expect(screen.getByText(/external error/i)).toBeInTheDocument();
  });

  test("optional and empty input sends {}", async () => {
    const handleChange = vi.fn();
    render(
      <JsonInput label="Config" onChange={handleChange} required={false} />
    );
    const textbox = screen.getByLabelText(/config/i);

    // type something first, then clear
    fireEvent.change(textbox, { target: { value: "x" } });
    fireEvent.change(textbox, { target: { value: "" } });

    await waitFor(() => expect(handleChange).toHaveBeenCalledWith({}));
    expect(screen.queryByText(/json is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/invalid json/i)).not.toBeInTheDocument();
  });

  test("required and empty input shows required error", async () => {
    const handleChange = vi.fn();
    render(<JsonInput label="Config" onChange={handleChange} required />);
    const textbox = screen.getByLabelText(/config/i);

    fireEvent.change(textbox, { target: { value: "x" } });
    fireEvent.change(textbox, { target: { value: "" } });

    expect(handleChange).toHaveBeenCalledWith(undefined);
    expect(await screen.findByText(/json is required/i)).toBeInTheDocument();
  });
});
