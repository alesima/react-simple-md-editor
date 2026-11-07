import { render, screen, fireEvent } from "@testing-library/react";
import MarkdownEditor from "./MarkdownEditor";

describe("MarkdownEditor", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders the editor with the provided value", () => {
    render(<MarkdownEditor value='Initial content' onChange={mockOnChange} />);

    // Check if the editor textarea is rendered
    const editor = screen.getByRole("textbox");
    expect(editor).toBeInTheDocument();

    // Check the initial content
    expect(editor).toHaveValue("Initial content");
  });

  test("updates value on change", () => {
    render(<MarkdownEditor value='Initial content' onChange={mockOnChange} />);

    // Simulate typing in the editor
    const editor = screen.getByRole("textbox");
    fireEvent.change(editor, { target: { value: "Updated content" } });

    // Ensure onChange was called with the updated value
    expect(mockOnChange).toHaveBeenCalledWith("Updated content");
  });

  test("toggles preview mode", () => {
    render(<MarkdownEditor value='Initial content' onChange={mockOnChange} />);

    // Click the preview button
    const previewButton = screen.getByTitle("Switch to Preview Mode"); // Assuming Toolbar buttons have a title attribute
    fireEvent.click(previewButton);

    // Ensure the editor is replaced with the Preview component
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByText("Initial content")).toBeInTheDocument(); // Assuming Preview renders raw text
  });

  test("toggles fullscreen mode", () => {
    render(<MarkdownEditor value='Initial content' onChange={mockOnChange} />);

    // Click the fullscreen button
    const fullscreenButton = screen.getByTitle("Enter Fullscreen");
    fireEvent.click(fullscreenButton);

    // Check that the editor container has fullscreen styling
    const editorContainer = document.querySelector(".markdown-editor");
    expect(editorContainer).toHaveClass("fullscreen");
  });

  test("inserts Markdown syntax using toolbar buttons", () => {
    render(<MarkdownEditor value='' onChange={mockOnChange} />);

    // Click the bold button
    const boldButton = screen.getByTitle("Bold");
    fireEvent.click(boldButton);

    // Ensure onChange was called with bold Markdown syntax
    expect(mockOnChange).toHaveBeenNthCalledWith(1, "****");

    // Click the heading button (applies to the current editor content)
    const headingButton = screen.getByTitle("Heading 1");
    fireEvent.click(headingButton);

    // Ensure onChange was called with heading Markdown syntax
    expect(mockOnChange).toHaveBeenNthCalledWith(2, "**# **");
  });

  test("handles text selection for Markdown insertion", () => {
    const value = "Some selected text";
    render(<MarkdownEditor value={value} onChange={mockOnChange} />);

    // Simulate text selection
    const editor = screen.getByRole("textbox");
    fireEvent.select(editor, {
      target: { selectionStart: 5, selectionEnd: 13 },
    }); // Select "selected"

    // Click the italic button
    const italicButton = screen.getByTitle("Italic");
    fireEvent.click(italicButton);

    // Ensure the selected text is wrapped in Markdown syntax
    expect(mockOnChange).toHaveBeenCalledWith("Some *selected* text");
  });

  test("renders the Preview component when preview mode is enabled", () => {
    render(
      <MarkdownEditor
        value='Markdown content'
        onChange={mockOnChange}
        previewMode={true}
      />
    );

    // Check that the Preview component is rendered
    expect(screen.getByText("Markdown content")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  test("syncs when the parent passes a new value", () => {
    const { rerender } = render(
      <MarkdownEditor value='First' onChange={mockOnChange} />
    );
    expect(screen.getByRole("textbox")).toHaveValue("First");

    rerender(<MarkdownEditor value='Second' onChange={mockOnChange} />);
    expect(screen.getByRole("textbox")).toHaveValue("Second");
  });

  test("applies the configured theme", () => {
    const { container, rerender } = render(
      <MarkdownEditor value='x' onChange={mockOnChange} />
    );
    expect(container.firstChild).toHaveAttribute("data-theme", "light");

    rerender(
      <MarkdownEditor
        value='x'
        onChange={mockOnChange}
        config={{ toolbarConfig: "default", theme: "dracula" }}
      />
    );
    expect(container.firstChild).toHaveAttribute("data-theme", "dracula");
  });

  test("applies custom colors as CSS variables", () => {
    const { container } = render(
      <MarkdownEditor
        value='x'
        onChange={mockOnChange}
        config={{
          toolbarConfig: "default",
          theme: "custom",
          colors: { accent: "#ff0000" },
        }}
      />
    );
    const editor = container.firstChild as HTMLElement;
    expect(editor).toHaveAttribute("data-theme", "custom");
    expect(editor.style.getPropertyValue("--me-accent")).toBe("#ff0000");
  });
});
