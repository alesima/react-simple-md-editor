import { render, fireEvent, screen } from "@testing-library/react";
import Editor from "./Editor";

describe("Editor Component", () => {
  const mockOnChange = jest.fn();
  const mockOnSelect = jest.fn();

  test("renders the textarea with correct initial value and rows", () => {
    render(
      <Editor
        value='Test value'
        rows={5}
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    const textarea = screen.getByRole("textbox");

    // Check initial value
    expect(textarea).toHaveValue("Test value");

    // Check rows attribute
    expect(textarea).toHaveAttribute("rows", "5");
  });

  test("calls onChange when the value is changed", () => {
    render(
      <Editor
        value=''
        rows={5}
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    const textarea = screen.getByRole("textbox");

    // Simulate user typing
    fireEvent.change(textarea, { target: { value: "New value" } });

    // Verify onChange callback is called with the new value
    expect(mockOnChange).toHaveBeenCalledWith("New value");
  });

  test("calls onSelect with correct start and end positions", () => {
    render(
      <Editor
        value='Test value'
        rows={5}
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    const textarea = screen.getByRole("textbox");

    // Simulate selecting text
    fireEvent.select(textarea, {
      target: { selectionStart: 0, selectionEnd: 4 },
    });

    // Verify onSelect callback is called with the correct selection range
    expect(mockOnSelect).toHaveBeenCalledWith(0, 4);
  });

  test("applies the correct styles to the textarea", () => {
    render(
      <Editor
        value='Test value'
        rows={5}
        onChange={mockOnChange}
        onSelect={mockOnSelect}
      />
    );

    const textarea = screen.getByRole("textbox");

    // Verify the className is applied
    expect(textarea).toHaveClass("editor");
  });
});
