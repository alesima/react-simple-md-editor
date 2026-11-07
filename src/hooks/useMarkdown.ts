import { useState } from "react";
import { insertMarkdown } from "../utils/markdownUtils";

export const useMarkdown = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const handleInsertMarkdown = (prefix: string, suffix = "") => {
    const { newValue, newSelectionStart, newSelectionEnd } = insertMarkdown(
      value,
      selectionStart,
      selectionEnd,
      prefix,
      suffix
    );
    setValue(newValue);
    setSelectionStart(newSelectionStart);
    setSelectionEnd(newSelectionEnd);
    return newValue;
  };

  return {
    value,
    setValue,
    selectionStart,
    selectionEnd,
    handleInsertMarkdown,
    setSelectionStart,
    setSelectionEnd,
  };
};
