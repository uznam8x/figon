import * as parser from "../parser";
import type { NodeType } from "../types";

export default (item: NodeType) => {
  const { id, name, type } = item;

  return {
    key: id,
    type,
    tagName: "div",
    style: parser.getStyles(item),
    ...parser.getAttributes(name),
  };
};
