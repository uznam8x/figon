import * as R from "ramda";
import color from "../parser/getRgba";
import type { NodeType, StyleType } from "../types";
import * as parser from "../parser";
export default (item: NodeType) => {
  const { name, type, characters = "", style, fills = [] } = item;
  const styles: StyleType = {};

  //* font
  if (!R.isNil(style)) {
    styles["fontWeight"] = style["fontWeight"];
    styles["fontSize"] = style["fontSize"];
    styles["lineHeight"] = Math.round(style["lineHeightPx"]) + "px";
    styles["textAlign"] = style["textAlignHorizontal"].toLowerCase();
  }

  if (!!fills.length) {
    styles["color"] = color(fills[0].color);
  }

  return {
    type,
    tagName: "span",
    textContent: characters,
    style: styles,
    ...parser.getAttributes(name),
  };
};
