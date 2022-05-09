import * as R from "ramda";
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const { style = {}, styles = {}, cornerRadius, rectangleCornerRadii } = item;

  if (Array.isArray(rectangleCornerRadii)) {
    const keys = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];

    rectangleCornerRadii.forEach((v, i) => {
      const key = `border${keys[i]}Radius`;
      styles[key] = v;
    });
  } else if (!R.isNil(cornerRadius)) {
    styles["borderRadius"] = cornerRadius;
  }

  return styles;
};
