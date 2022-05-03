import * as R from "ramda";
import type { NodeType } from "../../types";
export default (item: NodeType) => {
  const { style = {} } = item;

  if (!R.isNil(style["lineHeightPx"])) {
    style["lineHeight"] = style["lineHeightPx"] + "px";
    delete style["lineHeightPx"];
  }
  if (!R.isNil(style["textAlignHorizontal"])) {
    style["textAlign"] = style["textAlignHorizontal"].toLowerCase();
    delete style["textAlignHorizontal"];
  }

  [
    "fontPostScriptName",
    "textAutoResize",
    "textAlignHorizontal",
    "textAlignVertical",
    "fontFamily",
    "lineHeightPx",
    "lineHeightPercent",
    "lineHeightUnit",
  ].forEach((attr) => {
    delete style[attr];
  });

  return Object.assign(item, { style });
};
