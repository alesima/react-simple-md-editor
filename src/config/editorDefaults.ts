export interface ToolbarButtonConfig {
  icon: React.ReactNode;
  action: () => void;
  title: string;
}

export type MarkdownEditorTheme =
  | "light"
  | "dark"
  | "minimal"
  | "dracula"
  | "custom";

export interface MarkdownEditorConfig {
  toolbarConfig?: "compact" | "default" | "full" | "custom";
  customToolbarButtons?: string[];
  theme?: MarkdownEditorTheme;
  colors?: {
    toolbarBg?: string;
    toolbarBtnBg?: string;
    toolbarBtnFg?: string;
    toolbarBtnHoverBg?: string;
    editorBg?: string;
    editorFg?: string;
    previewBg?: string;
    previewFg?: string;
    accent?: string;
  };
}

export const defaultConfig: MarkdownEditorConfig = {
  toolbarConfig: "default",
  theme: "light",
};
