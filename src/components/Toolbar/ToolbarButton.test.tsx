import { render, fireEvent, screen } from "@testing-library/react";
import ToolbarButton from "./ToolbarButton";

describe("ToolbarButton", () => {
  const mockOnClick = jest.fn();

  test("renders with the correct title and icon", () => {
    const testIcon = <span>B</span>;
    const testTitle = "Bold";

    render(
      <ToolbarButton icon={testIcon} title={testTitle} onClick={mockOnClick} />
    );

    // Check that the button is rendered with the correct title
    const button = screen.getByTitle(testTitle);
    expect(button).toBeInTheDocument();

    // Check that the icon is rendered
    expect(button).toHaveTextContent("B");
  });

  test("calls the onClick function when clicked", () => {
    render(
      <ToolbarButton
        icon={<span>I</span>}
        title='Italic'
        onClick={mockOnClick}
      />
    );

    // Simulate a click event
    const button = screen.getByTitle("Italic");
    fireEvent.click(button);

    // Check that the onClick function was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("applies the correct styles", () => {
    render(
      <ToolbarButton
        icon={<span>Underline</span>}
        title='Underline'
        onClick={mockOnClick}
      />
    );

    // Check that the button has the correct class
    const button = screen.getByTitle("Underline");
    expect(button).toHaveClass("toolbar-button");
  });
});
