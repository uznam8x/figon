import type { NodeType } from "../types";
import * as parser from "../parser";
export default (item: NodeType) => {
  const { id,name, type, children } = item;

  return {
    key: id,
    type,
    tagName: "div",
    children,
    ...parser.getAttributes(name),
  };
};
