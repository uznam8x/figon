import type { NodeType } from "../types";
import * as parser from "../parser";
export default (item: NodeType) => {
  const { name, type, children } = item;

  return {
    name,
    type,
    tagName: "div",
    children,
    ...parser.getAttributes(name),
  };
};
