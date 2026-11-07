# react-simple-md-editor

A React component to edit and preview Markdown, with toolbar presets and Mermaid diagram support.

![Editor](https://raw.githubusercontent.com/alesima/react-simple-md-editor/master/assets/screenshots/editor.png)
*Editing with the default toolbar (light theme)*

![Preview](https://raw.githubusercontent.com/alesima/react-simple-md-editor/master/assets/screenshots/preview.png)
*Live preview with rendered Mermaid diagram*

## Themes

Built-in themes via `config.theme`: `light` (default), `dark`, `dracula`, `minimal` — or `custom` with your own colors:

![Dark preview](https://raw.githubusercontent.com/alesima/react-simple-md-editor/master/assets/screenshots/preview-dark.png)
*Dark theme preview*

![Dracula editor](https://raw.githubusercontent.com/alesima/react-simple-md-editor/master/assets/screenshots/editor-dracula.png)
*Dracula theme editor*

```tsx
<MarkdownEditor value={value} onChange={setValue} config={{ theme: "dark" }} />

<MarkdownEditor
  value={value}
  onChange={setValue}
  config={{
    theme: "custom",
    colors: {
      toolbarBg: "#111111",
      editorBg: "#000000",
      editorFg: "#ffffff",
      accent: "#d4ff5f",
    },
  }}
/>
```

## Installation

```bash
npm install react-simple-md-editor
```

Requires `react >= 18` and `react-dom >= 18` (peer dependencies). Markdown
rendering dependencies (`react-markdown`, `remark-gfm`, `rehype-raw`,
`mdx-mermaid`) are also peer dependencies — install the ones you use:

```bash
npm install react-markdown remark-gfm rehype-raw mdx-mermaid
```

Styles are injected automatically; no CSS import needed.

## Usage

```tsx
import { useState } from "react";
import { MarkdownEditor } from "react-simple-md-editor";

export function App() {
  const [value, setValue] = useState("# Hello\n\nEdit me!");

  return <MarkdownEditor value={value} onChange={setValue} rows={10} />;
}
```

### Props

| Prop           | Type      | Default | Description                                   |
| -------------- | --------- | ------- | --------------------------------------------- |
| `value`        | `string`  | —       | Current Markdown content                      |
| `onChange`     | `(v) => void` | —   | Called with the new content on every change, including toolbar insertions |
| `rows`         | `number`  | `5`     | Visible textarea rows                         |
| `previewMode`  | `boolean` | `false` | Start with the preview open                   |
| `config`       | `MarkdownEditorConfig` | default preset | Toolbar preset, theme and custom colors |

### Toolbar presets

```tsx
// compact | default | full presets, or pick your own buttons:
<MarkdownEditor
  value={value}
  onChange={setValue}
  config={{ toolbarConfig: "full" }}
/>

<MarkdownEditor
  value={value}
  onChange={setValue}
  config={{ toolbarConfig: "custom", customToolbarButtons: ["Bold", "Italic", "Link"] }}
/>
```

Available buttons: Bold, Italic, Strikethrough, Underline, Heading 1–6,
Bullet/Numbered/Task lists, Blockquote, Horizontal Rule, Link, Image, Table,
Inline Code, Code Block, Mermaid Diagram, Superscript, Subscript,
Center Align, HTML Block.

### Mermaid diagrams

Fenced `mermaid` code blocks render as diagrams via `mdx-mermaid`:

````markdown
```mermaid
graph TD;
  A-->B;
```
````

## Development

```bash
npm install
npm test        # jest
npm run lint    # eslint
npm run build   # rollup -> dist/
```

## License

ISC
