import React from "react";
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

  const handleInsertMarkdown = (prefix: string, suffix = "") => {
    onChange(insertMarkdown(prefix, suffix));
  };

  const toolbarButtons = useToolbar(config, handleInsertMarkdown);

  return (
    <div className={`markdown-editor ${isFullscreen ? "fullscreen" : ""}`}>
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
