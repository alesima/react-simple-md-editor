import { useMemo } from "react";
import { createToolbarButtons } from "../config/toolbarButtons";
import { toolbarPresets } from "../config/toolbarPresets";
import { ToolbarButtonConfig } from "../config";

export const useToolbar = (
  config: {
    toolbarConfig?: "compact" | "default" | "full" | "custom";
    customToolbarButtons?: string[];
  },
  handleInsertMarkdown: (prefix: string, suffix?: string) => void
) => {
  const toolbarButtons = useMemo(() => {
    const defaultButtons = createToolbarButtons(handleInsertMarkdown);

    if (config.toolbarConfig === "custom" && config.customToolbarButtons) {
      return config.customToolbarButtons
        .map(title => defaultButtons.find(btn => btn.title === title))
        .filter((btn): btn is ToolbarButtonConfig => Boolean(btn));
    }

    const preset = toolbarPresets[config.toolbarConfig || "default"];
    return preset
      .map(title => defaultButtons.find(btn => btn.title === title))
      .filter((btn): btn is ToolbarButtonConfig => Boolean(btn));
  }, [config, handleInsertMarkdown]);

  return toolbarButtons;
};
