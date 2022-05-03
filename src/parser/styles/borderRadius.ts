import * as R from "ramda";
import type { NodeType } from "../../types";
export default (item: NodeType) => {
  const { style = {}, cornerRadius, rectangleCornerRadii } = item;

  if (Array.isArray(rectangleCornerRadii)) {
    const keys = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];

    rectangleCornerRadii.forEach((v, i) => {
      const key = `border${keys[i]}Radius`;
      style[key] = v;
    });
  } else if (!R.isNil(cornerRadius)) {
    style["borderRadius"] = cornerRadius;
  }

  return Object.assign(item, {style});
};
