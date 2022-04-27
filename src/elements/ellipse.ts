import * as parser from "../parser";
import type { NodeType } from "../types";

export default (item: NodeType) => {
  const { id, name, absoluteBoundingBox } = item;

  const { width, height } = absoluteBoundingBox;
  return {
    key: id,
    tagName: "div",
    style: {
      ...parser.getStyles(item),
      borderRadius: "50%",
      overflow: "hidden",
      width,
      height,
      minWidth: width,
      minHeight: height,
    },
    ...parser.getAttributes(name),
  };
};
