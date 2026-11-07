import React, { useCallback } from "react";
import Toolbar from "../components/Toolbar/Toolbar";
import Editor from "../components/Editor/Editor";
import Preview from "../components/Preview/Preview";
import { defaultConfig, MarkdownEditorConfig } from "../config";
import "./MarkdownEditor.css";
import { useMarkdown, useEditorState, useToolbar } from "../hooks";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  previewMode?: boolean;
  config?: MarkdownEditorConfig;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  rows = 5,
  previewMode = false,
  config = defaultConfig,
}) => {
  const { isPreview, isFullscreen, togglePreview, toggleFullscreen } =
    useEditorState(previewMode);

  const {
    value: markdownValue,
    setValue,
    handleInsertMarkdown: insertMarkdown,
    setSelectionStart,
    setSelectionEnd,
  } = useMarkdown(value);

  const handleInsertMarkdown = useCallback(
    (prefix: string, suffix = "") => {
      onChange(insertMarkdown(prefix, suffix));
    },
    [onChange, insertMarkdown]
  );

  const toolbarButtons = useToolbar(config, handleInsertMarkdown);

  const themeStyle = {
    "--toolbar-bg": config.colors?.toolbarBg,
    "--toolbar-btn-bg": config.colors?.toolbarBtnBg,
    "--toolbar-btn-fg": config.colors?.toolbarBtnFg,
    "--toolbar-btn-hover-bg": config.colors?.toolbarBtnHoverBg,
    "--editor-bg": config.colors?.editorBg,
    "--editor-fg": config.colors?.editorFg,
    "--preview-bg": config.colors?.previewBg,
    "--preview-fg": config.colors?.previewFg,
    "--me-accent": config.colors?.accent,
  } as React.CSSProperties;

  return (
    <div
      className={`markdown-editor ${isFullscreen ? "fullscreen" : ""}`}
      data-theme={config.theme ?? "light"}
      style={themeStyle}
    >
      <Toolbar
        buttons={toolbarButtons}
        onTogglePreview={togglePreview}
        onToggleFullscreen={toggleFullscreen}
        isPreview={isPreview}
        isFullscreen={isFullscreen}
      />
      {isPreview ? (
        <Preview value={markdownValue} />
      ) : (
        <Editor
          value={markdownValue}
          rows={rows}
          onChange={newValue => {
            setValue(newValue);
            onChange(newValue);
          }}
          onSelect={(start, end) => {
            setSelectionStart(start);
            setSelectionEnd(end);
          }}
        />
      )}
    </div>
  );
};

export default MarkdownEditor;
