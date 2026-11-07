import { render, screen } from "@testing-library/react";
import Preview from "./Preview";

// Mock Mermaid component
jest.mock("mdx-mermaid/lib/Mermaid", () => ({
  Mermaid: ({ chart }: { chart: string }) => <div>{chart}</div>,
}));

describe("Preview Component", () => {
  test("renders Markdown content", () => {
    const markdownContent = `# Heading 1\n\nThis is a **bold** text.`;

    render(<Preview value={markdownContent} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Heading 1"
    );
    expect(screen.getByText("bold")).toBeInTheDocument();
  });

  test("renders inline code", () => {
    const markdownContent = "`inline code`";

    render(<Preview value={markdownContent} />);

    const inlineCode = screen.getByText("inline code");
    expect(inlineCode.tagName).toBe("CODE");
  });

  test("renders code blocks", () => {
    const markdownContent = "```javascript\nconst x = 42;\n```";

    render(<Preview value={markdownContent} />);

    expect(screen.getByText("const x = 42;")).toBeInTheDocument();
  });

  test("renders Mermaid diagrams", () => {
    const mermaidMarkdown = "```mermaid\ngraph TD;\nA-->B;\n```";

    render(<Preview value={mermaidMarkdown} />);

    const mermaidElement = screen.getByText((content, element) => {
      const normalizedText = content.replace(/\s+/g, " ").trim();
      return (
        normalizedText === "graph TD; A-->B;" &&
        element?.tagName.toLowerCase() === "div"
      );
    });

    expect(mermaidElement).toBeInTheDocument();
  });

  test("renders raw HTML content", () => {
    const rawHtml = '<div class="custom-class">Raw HTML</div>';

    render(<Preview value={rawHtml} />);

    const element = screen.getByText("Raw HTML");
    expect(element).toBeInTheDocument();

    const parent = element.closest(".custom-class");
    expect(parent).not.toBeNull();
  });

  test("applies correct styling to the container", () => {
    const markdownContent = `# Heading`;

    render(<Preview value={markdownContent} />);

    const container = screen.getByText("Heading").closest("div");

    expect(container).toHaveClass("preview");
  });
});
