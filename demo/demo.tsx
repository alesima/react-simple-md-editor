import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { MarkdownEditor } from "../src/index";

const SAMPLE = `# react-simple-markdown-editor

Write **bold**, *italic* and ~~strikethrough~~ text, with live preview.

## Lists

- Bullet item
- [ ] Task item

## Table

| Column 1 | Column 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

## Code

\`\`\`js
const hello = "world";
\`\`\`

## Diagram

\`\`\`mermaid
graph TD;
  A-->B;
  B-->C;
\`\`\`
`;

function Demo() {
  const [value, setValue] = useState(SAMPLE);
  const theme =
    new URLSearchParams(window.location.search).get("theme") || "light";
  const preview =
    new URLSearchParams(window.location.search).get("preview") === "1";
  return (
    <div style={{ maxWidth: 960, margin: "24px auto", padding: "0 16px" }}>
      <MarkdownEditor
        value={value}
        onChange={setValue}
        rows={14}
        previewMode={preview}
        config={{
          toolbarConfig: "default",
          theme: theme as "light" | "dark" | "minimal" | "dracula",
        }}
      />
    </div>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<Demo />);
}
