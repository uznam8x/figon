import * as R from "ramda";
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const { style = {}, styles = {} } = item;

  const { fontWeight, fontSize, lineHeightPx, textAlignHorizontal } = style;
  if (!R.isNil(fontWeight)) styles["fontWeight"] = fontWeight;
  if (!R.isNil(fontSize)) styles["fontSize"] = fontSize;
  if (!R.isNil(lineHeightPx))
    styles["lineHeight"] = Math.round(lineHeightPx) + "px";
  if (!R.isNil(textAlignHorizontal))
    styles["textAlign"] = textAlignHorizontal.toLowerCase();

  return styles;
};
