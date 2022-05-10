import * as R from "ramda";
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const {
    styles = {},
    layoutMode,
    itemSpacing,
    counterAxisSizingMode,
    primaryAxisSizingMode,
    counterAxisAlignItems,
    primaryAxisAlignItems,
    layoutGrow,
    layoutAlign,
    absoluteBoundingBox,
  } = item;

  if (!R.isNil(layoutMode)) {
    const flex: any = {
      display: "flex",
      flexDirection: layoutMode.toUpperCase() === "VERTICAL" ? "column" : "row",
      gap: itemSpacing || 0,
      alignItems:
        (
          {
            CENTER: "center",
            MAX: "flex-end",
          } as any
        )[counterAxisAlignItems || ""] || "flex-start",
      justifyContent:
        (
          {
            SPACE_BETWEEN: "space-between",
            CENTER: "center",
            MAX: "flex-end",
          } as any
        )[primaryAxisAlignItems || ""] || "flex-start",
    };

    for (let key in flex) {
      if (key === "gap" && flex[key] === 0) continue;
      if (key === "alignItems" && flex[key] === "flex-start") continue;
      if (key === "justifyContent" && flex[key] === "flex-start") continue;
      if (key === "flexDirection" && flex[key] === "row") continue;
      styles[key] = flex[key];
    }
  }

  if (!R.isNil(primaryAxisSizingMode) && primaryAxisSizingMode === "FIXED") {
    styles["height"] = absoluteBoundingBox.height;
  }

  if (!R.isNil(counterAxisSizingMode) && counterAxisSizingMode === "FIXED") {
    styles["width"] = absoluteBoundingBox.width;
  }

  if (!R.isNil(layoutAlign) && layoutAlign === "STRETCH") {
    styles["width"] = "100%";
  }
  if (!!layoutGrow) {
    styles["flexGrow"] = layoutGrow;
    styles["width"] = "100%";
  }

  return styles;
};
