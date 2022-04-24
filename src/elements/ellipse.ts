import * as parser from "../parser";
import type { NodeType } from "../types";

export default (item: NodeType) => {
  const { id, name } = item;

  return {
    key: id,
    tagName: "div",
    style: { ...parser.getStyles(item), borderRadius: "50%", overflow: 'hidden' },
    ...parser.getAttributes(name),
  };
};
