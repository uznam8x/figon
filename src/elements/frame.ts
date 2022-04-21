import * as R from "ramda";
import * as parser from "../parser";
import type { NodeType, StyleType } from "../types";
export default (item: NodeType) => {
  const {
    name,
    type,
    children,
    layoutMode = "",
    itemSpacing,
    counterAxisSizingMode,
    primaryAxisSizingMode,
    counterAxisAlignItems,
    primaryAxisAlignItems,
  } = item;

  const styles: StyleType = {
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

  if (!R.isNil(primaryAxisSizingMode) && primaryAxisSizingMode === "FIXED") {
    styles["flexGrow"] = 1;
  }
  console.log(name, counterAxisSizingMode, primaryAxisSizingMode);

  return {
    name,
    type,
    tagName: "div",
    style: styles,
    children,
    ...parser.getAttributes(name),
  };
};
