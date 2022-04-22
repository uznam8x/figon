import * as parser from "../parser";
import type { NodeType } from "../types";
export default (item: NodeType) => {
  const { id, name, type, children } = item;
  return {
    key: id,
    type,
    tagName: "div",
    style: parser.getStyles(item),
    children,
    ...parser.getAttributes(name),
  };
};
