import { useCallback, useEffect, useState } from "react";
import { insertMarkdown } from "../utils/markdownUtils";

export const useMarkdown = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  // Stay in sync when the parent passes a new value (controlled usage).
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleInsertMarkdown = useCallback(
    (prefix: string, suffix = "") => {
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
    },
    [value, selectionStart, selectionEnd]
  );

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
