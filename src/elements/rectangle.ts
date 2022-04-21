import * as R from "ramda";
import * as parser from "../parser";

import type { NodeType } from "../types";
export default (item: NodeType) => {
  const {
    id,
    name,
    type,
    cornerRadius,
    rectangleCornerRadii,
    fills = [],
  } = item;
  const styles: { [key: string]: any } = {};
  if (!!fills.length) {
    styles["backgroundColor"] = parser.getRgba(fills[0].color);
  }

  if (!R.isNil(cornerRadius)) {
    const radius: any = parser.getBorderRadius(
      rectangleCornerRadii || cornerRadius
    );
    for (let key in radius) {
      styles[key] = radius[key];
    }
  }

  return {
    key: id,
    name,
    type,
    tagName: "div",
    style: styles,
    ...parser.getAttributes(name),
  };
};
